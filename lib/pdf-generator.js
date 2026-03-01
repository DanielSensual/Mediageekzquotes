/**
 * VideoQuoter — PDF Generator (Multi-Tenant)
 * =============================================
 * Professional client-ready PDF with per-tenant branding.
 */

const PDFDocument = require('pdfkit');

const TURNAROUND_LABELS = {
    standard: 'Standard (2 weeks)', expedited: 'Expedited (1 week)',
    rush: 'Rush (48 hours)', nextDay: 'Next-Day (24 hours)', sameDay: 'Same-Day',
};

const EDITOR_LABELS = { standard: 'Standard Editor', senior: 'Senior Editor' };

/**
 * Generate a PDF buffer from a calculated quote response.
 * @param {Object} quote — output from calculateQuote()
 * @param {Object} branding — { companyName, colorPrimary, city, state, verticalName }
 * @returns {Promise<Buffer>}
 */
function generatePDF(quote, branding = {}) {
    return new Promise((resolve, reject) => {
        const brandColor = branding.colorPrimary || '#FF6A00';
        const companyName = branding.companyName || 'VideoQuoter';
        const location = [branding.city, branding.state].filter(Boolean).join(', ');
        const verticalName = branding.verticalName || '';

        const C = {
            white: '#ffffff',
            offWhite: '#f8f8f8',
            lightGray: '#e8e8e8',
            midGray: '#999999',
            darkGray: '#444444',
            charcoal: '#222222',
            primary: brandColor,
            accent: '#8b5cf6',
            teal: '#2AABB3',
        };

        const doc = new PDFDocument({
            size: 'LETTER',
            margins: { top: 50, bottom: 50, left: 55, right: 55 },
            bufferPages: true,
            info: {
                Title: `${companyName} Quote — ${quote.quoteId}`,
                Author: companyName,
                Subject: `Quote for ${quote.clientName || 'Client'}`,
            },
        });

        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        const W = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        const LEFT = doc.page.margins.left;

        // ═══ HEADER BAR ═══
        doc.rect(0, 0, doc.page.width, 90).fill(C.primary);

        doc.fontSize(28).font('Helvetica-Bold')
            .fillColor(C.white).text(companyName.toUpperCase(), LEFT, 24);

        const tagline = [verticalName, location].filter(Boolean).join('  •  ');
        doc.fontSize(8.5).font('Helvetica')
            .fillColor('rgba(255,255,255,0.75)').text(tagline, LEFT, 56);

        // Quote ID & Date
        doc.fontSize(9).font('Helvetica-Bold')
            .fillColor(C.white)
            .text(quote.quoteId || '', LEFT, 26, { width: W, align: 'right' });

        const dateStr = new Date(quote.generatedAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
        doc.fontSize(8).font('Helvetica')
            .fillColor('rgba(255,255,255,0.8)')
            .text(dateStr, LEFT, 42, { width: W, align: 'right' });

        const editorLabel = EDITOR_LABELS[quote.editorTier] || 'Standard Editor';
        const turnaroundLabel = TURNAROUND_LABELS[quote.turnaround] || 'Standard (2 weeks)';
        doc.fontSize(7.5).font('Helvetica')
            .fillColor('rgba(255,255,255,0.65)')
            .text(`${editorLabel}  •  ${turnaroundLabel}`, LEFT, 56, { width: W, align: 'right' });

        let y = 108;

        // ═══ CLIENT DETAILS ═══
        doc.roundedRect(LEFT, y, W, 65, 4).lineWidth(1)
            .fillAndStroke('#FFF3EB', C.lightGray);

        y += 12;
        doc.fontSize(7).font('Helvetica-Bold').fillColor(C.midGray)
            .text('PREPARED FOR', LEFT + 16, y);
        y += 13;
        doc.fontSize(13).font('Helvetica-Bold').fillColor(C.charcoal)
            .text(quote.clientName || 'Client', LEFT + 16, y);
        y += 18;

        const clientMeta = [quote.eventName, quote.location].filter(Boolean).join('  •  ');
        if (clientMeta) {
            doc.fontSize(9).font('Helvetica').fillColor(C.darkGray)
                .text(clientMeta, LEFT + 16, y);
        }

        y += 32;

        // ═══ LINE ITEMS TABLE ═══
        doc.rect(LEFT, y, W, 22).fill(C.primary);
        doc.fontSize(7).font('Helvetica-Bold').fillColor(C.white);
        doc.text('ITEM', LEFT + 10, y + 7);
        doc.text('QTY', LEFT + W - 185, y + 7, { width: 40, align: 'center' });
        doc.text('UNIT PRICE', LEFT + W - 135, y + 7, { width: 65, align: 'right' });
        doc.text('TOTAL', LEFT + W - 60, y + 7, { width: 50, align: 'right' });

        y += 22;

        const catColors = {
            'Coverage': C.primary, 'Deliverable': C.accent, 'Editing': C.accent,
            'Turnaround': C.darkGray, 'Add-On': C.teal, 'Logistics': C.midGray,
        };

        let currentCategory = '';
        (quote.lineItems || []).forEach((item, i) => {
            if (y > 660) { doc.addPage(); y = doc.page.margins.top; }

            const isNewCategory = item.category !== currentCategory;
            currentCategory = item.category;

            if (i % 2 === 0) {
                doc.rect(LEFT, y, W, isNewCategory ? 30 : 24).fill(C.offWhite);
            }

            if (isNewCategory) {
                doc.fontSize(6.5).font('Helvetica-Bold').fillColor(catColors[item.category] || C.midGray)
                    .text(item.category.toUpperCase(), LEFT + 12, y + 4);
            }

            const textY = y + (isNewCategory ? 15 : 6);

            doc.fontSize(8.5).font('Helvetica').fillColor(C.charcoal)
                .text(item.description, LEFT + 12, textY, { width: W - 210, lineBreak: true });
            doc.fontSize(8.5).font('Helvetica').fillColor(C.midGray)
                .text(String(item.qty), LEFT + W - 185, textY, { width: 40, align: 'center' });
            doc.fontSize(8.5).font('Helvetica').fillColor(C.midGray)
                .text(fmt(item.unitPrice), LEFT + W - 135, textY, { width: 65, align: 'right' });
            doc.fontSize(8.5).font('Helvetica-Bold').fillColor(C.charcoal)
                .text(fmt(item.total), LEFT + W - 60, textY, { width: 50, align: 'right' });

            y += isNewCategory ? 32 : 26;
        });

        // Divider
        y += 4;
        doc.rect(LEFT, y, W, 1).fill(C.lightGray);
        y += 12;

        // ═══ TOTALS ═══
        const labelX = LEFT + W - 210;
        const valX = LEFT + W - 60;
        const valW = 50;

        function totalRow(label, amount, color, bold) {
            if (y > 700) { doc.addPage(); y = doc.page.margins.top; }
            doc.fontSize(9).font(bold ? 'Helvetica-Bold' : 'Helvetica')
                .fillColor(color || C.midGray)
                .text(label, labelX, y, { width: 140, align: 'left' });
            doc.fontSize(9).font(bold ? 'Helvetica-Bold' : 'Helvetica')
                .fillColor(bold ? C.charcoal : C.darkGray)
                .text(fmt(amount), valX, y, { width: valW, align: 'right' });
            y += 18;
        }

        totalRow('Coverage', quote.coverageTotal, C.midGray, false);
        totalRow('Editing', quote.deliverablesTotal, C.midGray, false);
        if (quote.turnaroundFee > 0) totalRow('Turnaround', quote.turnaroundFee, C.darkGray, false);
        if (quote.addOnsTotal > 0) totalRow('Add-Ons', quote.addOnsTotal, C.teal, false);
        totalRow('Logistics', quote.logisticsTotal, C.midGray, false);

        // Grand total
        y += 4;
        doc.roundedRect(LEFT + W - 220, y, 220, 40, 4).fill(C.primary);
        doc.fontSize(12).font('Helvetica-Bold').fillColor(C.white)
            .text('TOTAL', LEFT + W - 210, y + 13, { width: 90, align: 'left' });
        doc.fontSize(14).font('Helvetica-Bold').fillColor(C.white)
            .text(fmt(quote.total), LEFT + W - 70, y + 12, { width: 60, align: 'right' });

        y += 56;

        // ═══ TERMS ═══
        if (y > 600) { doc.addPage(); y = doc.page.margins.top; }
        doc.rect(LEFT, y, W, 1).fill(C.lightGray);
        y += 14;
        doc.fontSize(7.5).font('Helvetica-Bold').fillColor(C.primary)
            .text('TERMS & CONDITIONS', LEFT, y);
        y += 14;

        const terms = [
            'This quote is valid for 30 days from the date of issue.',
            'A 50% deposit is required to secure the production date(s). The remaining balance is due within 7 days of final delivery.',
            'Standard delivery timeline is 2 weeks from event date unless a faster turnaround is selected.',
            'Cancellations within 48 hours of the event are subject to a 25% cancellation fee.',
            'All footage and deliverables remain the intellectual property of the Production Company until full payment is received.',
            'Travel fees apply for locations outside the metro area (30+ miles from downtown).',
        ];

        terms.forEach(term => {
            doc.fontSize(7.5).font('Helvetica').fillColor(C.darkGray)
                .text(`•  ${term}`, LEFT + 4, y, { width: W - 8, lineGap: 1 });
            y += doc.heightOfString(`•  ${term}`, { width: W - 8, fontSize: 7.5 }) + 5;
        });

        // ═══ FOOTER ═══
        const footerY = doc.page.height - 36;
        doc.rect(0, footerY - 6, doc.page.width, 2).fill(C.primary);
        doc.fontSize(7.5).font('Helvetica').fillColor(C.midGray)
            .text(`${companyName}  •  ${location || 'Professional Video Production'}`, LEFT, footerY, {
                width: W, align: 'center',
            });

        doc.end();
    });
}

function fmt(n) {
    return '$' + (n || 0).toLocaleString('en-US');
}

module.exports = { generatePDF };
