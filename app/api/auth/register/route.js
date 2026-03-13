import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback_insecure_secret_for_development_only_12345'
);

// Lazy-load Prisma
let _prisma;
function getPrisma() {
    if (!_prisma) {
        const { PrismaClient } = require('@prisma/client');
        _prisma = new PrismaClient();
    }
    return _prisma;
}

// Import vertical templates
const { ALL_VERTICALS } = require('../../../../lib/verticals');

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40);
}

export async function POST(request) {
    try {
        const { companyName, email, password, verticals: selectedVerticals } = await request.json();

        if (!companyName || !email || !password) {
            return NextResponse.json({ error: 'Company name, email, and password are required' }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }

        const prisma = getPrisma();

        // Check if email already exists
        const existing = await prisma.tenantUser.findUnique({ where: { email: email.toLowerCase() } });
        if (existing) {
            return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
        }

        // Create tenant
        const slug = slugify(companyName);
        const existingTenant = await prisma.tenant.findUnique({ where: { slug } });
        const finalSlug = existingTenant ? `${slug}-${Date.now().toString(36)}` : slug;

        const tenant = await prisma.tenant.create({
            data: {
                slug: finalSlug,
                name: companyName,
                plan: 'trial',
                subscriptionStatus: 'trialing',
                trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7-day trial
            },
        });

        // Create user
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.tenantUser.create({
            data: {
                tenantId: tenant.id,
                email: email.toLowerCase(),
                passwordHash,
                name: companyName,
                role: 'admin',
            },
        });

        // Seed selected verticals (or default to first 3)
        const verticalSlugs = selectedVerticals?.length > 0
            ? selectedVerticals
            : ['weddings', 'corporate', 'social-media'];

        for (const vSlug of verticalSlugs) {
            const template = ALL_VERTICALS[vSlug];
            if (!template) continue;

            const vertical = await prisma.vertical.create({
                data: {
                    tenantId: tenant.id,
                    slug: template.slug,
                    name: template.name,
                    icon: template.icon,
                    halfDayRate: template.coverage?.halfDay || 850,
                    fullDayRate: template.coverage?.fullDay || 1600,
                    overtimeRate: template.coverage?.overtime || 300,
                    turnaroundExpedited: template.turnaround?.expedited || 20,
                    turnaroundRush: template.turnaround?.rush || 35,
                    turnaroundNextDay: template.turnaround?.nextDay || 60,
                    turnaroundSameDay: template.turnaround?.sameDay || 100,
                    parkingFee: template.logistics?.parking || 75,
                    coiFee: template.logistics?.coi || 50,
                    travelFee: template.logistics?.travel || 150,
                },
            });

            // Seed services
            if (template.services) {
                for (let i = 0; i < template.services.length; i++) {
                    const svc = template.services[i];
                    await prisma.serviceItem.create({
                        data: {
                            verticalId: vertical.id,
                            slug: svc.slug,
                            name: svc.name,
                            description: svc.description || null,
                            category: svc.category || 'deliverable',
                            standardPrice: svc.standard,
                            seniorPrice: svc.senior,
                            mode: svc.mode || 'boolean',
                            sortOrder: i,
                        },
                    });
                }
            }

            // Seed add-ons
            if (template.addOns) {
                for (let i = 0; i < template.addOns.length; i++) {
                    const addon = template.addOns[i];
                    await prisma.addOnItem.create({
                        data: {
                            verticalId: vertical.id,
                            slug: addon.slug,
                            name: addon.name,
                            description: addon.description || null,
                            pricePerUnit: addon.pricePerUnit || addon.price,
                            unitType: addon.unitType || addon.unit || 'day',
                            sortOrder: i,
                        },
                    });
                }
            }
        }

        // Generate JWT
        const token = await new SignJWT({
            userId: user.id,
            tenantId: tenant.id,
            role: user.role,
            email: user.email,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('30d')
            .sign(JWT_SECRET);

        const response = NextResponse.json({
            success: true,
            tenant: { id: tenant.id, slug: tenant.slug, name: tenant.name },
            token,
        });

        // Set auth cookie
        response.cookies.set('vq_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
        });

        return response;
    } catch (err) {
        console.error('[Register] Error:', err);
        return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
    }
}
