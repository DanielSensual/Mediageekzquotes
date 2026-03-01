/**
 * POST /api/[tenant]/quote/pdf — Generate a branded PDF quote
 */

import { prisma } from '@/lib/prisma';
import { calculateQuote, verticalToRateCard } from '@/lib/engine';
import { generatePDF } from '@/lib/pdf-generator';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    const { tenant: tenantSlug } = await params;

    try {
        const body = await request.json();
        const verticalSlug = body.vertical;

        if (!verticalSlug) {
            return NextResponse.json({ error: '"vertical" is required.' }, { status: 400 });
        }

        const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
        if (!tenant) {
            return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
        }

        const vertical = await prisma.vertical.findUnique({
            where: { tenantId_slug: { tenantId: tenant.id, slug: verticalSlug } },
            include: {
                services: { where: { enabled: true }, orderBy: { sortOrder: 'asc' } },
                addOns: { where: { enabled: true }, orderBy: { sortOrder: 'asc' } },
            },
        });

        if (!vertical || !vertical.enabled) {
            return NextResponse.json({ error: `Vertical "${verticalSlug}" not found.` }, { status: 404 });
        }

        const rateCard = verticalToRateCard(vertical);
        const quote = calculateQuote(body, rateCard);
        quote.tenantSlug = tenantSlug;
        quote.vertical = verticalSlug;

        // Generate PDF with tenant branding
        const branding = {
            companyName: tenant.name,
            colorPrimary: tenant.colorPrimary,
            city: tenant.city,
            state: tenant.state,
            verticalName: vertical.name,
        };

        const pdfBuffer = await generatePDF(quote, branding);

        const filename = `${tenant.name.replace(/\s+/g, '-')}-Quote-${quote.quoteId}.pdf`;

        return new Response(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': pdfBuffer.length.toString(),
            },
        });
    } catch (err) {
        console.error('PDF generation error:', err);
        return NextResponse.json({ error: 'Failed to generate PDF.' }, { status: 500 });
    }
}
