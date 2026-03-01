/**
 * GET /api/tenants — List all tenants (public)
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const tenants = await prisma.tenant.findMany({
            include: { _count: { select: { verticals: true } } },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json({
            tenants: tenants.map(t => ({
                slug: t.slug,
                name: t.name,
                plan: t.plan,
                colorPrimary: t.colorPrimary,
                verticalCount: t._count.verticals,
            })),
        });
    } catch (err) {
        console.error('Tenants list error:', err);
        return NextResponse.json({ tenants: [] });
    }
}
