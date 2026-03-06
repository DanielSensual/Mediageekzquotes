/**
 * ADTV Invoice PDF Generator
 * ==========================
 * Generates Net 30 invoices for American Dream TV shoots.
 * Reusable module — accepts shoot details, returns a PDF buffer.
 */

const PDFDocument = require('pdfkit');

/**
 * @param {Object} opts
 * @param {string} opts.host         — Host/segment name (e.g. "Bent Danholm")
 * @param {string} opts.location     — Shoot location (e.g. "Winter Park")
 * @param {string} opts.date         — Shoot date string (e.g. "March 4, 2026")
 * @param {string} [opts.time]       — Time range (e.g. "8:30 AM – 12:30 PM")
 * @param {number} [opts.amount]     — Total amount (default 400)
 * @param {string} [opts.invoiceNum] — Invoice number (default auto-generated)
 * @returns {Promise<Buffer>}
 */
function generateADTVInvoice(opts) {
    const {
        host,
        location,
        date,
        time = '8:30 AM – 12:30 PM',
        amount = 400,
        invoiceNum,
    } = opts;

    // Auto-generate invoice number from date if not provided
    const autoNum = invoiceNum || `ADTV-2026-${date.replace(/\D/g, '').slice(-4)}`;

    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'LETTER',
            margins: { top: 50, bottom: 50, left: 55, right: 55 },
            info: {
                Title: 'Invoice – American Dream TV',
                Author: 'Jose Daniel Castillo',
                Subject: `ADTV ${host} ${location}`,
            },
        });

        const chunks = [];
        doc.on('data', c => chunks.push(c));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        const W = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        const LEFT = doc.page.margins.left;
        const C = {
            orange: '#FF6A00',
            white: '#ffffff',
            offWhite: '#F8F9FA',
            lightGray: '#E2E8F0',
            midGray: '#64748B',
            dark: '#1E293B',
            charcoal: '#0F172A',
        };

        let y = 50;

        // ═══ HEADER ═══
        doc.fontSize(32).font('Helvetica-Bold')
            .fillColor(C.charcoal).text('INVOICE', LEFT, y);
        y += 45;

        // Invoice metadata
        const metaFields = [
            ['Invoice #:', autoNum],
            ['Invoice Date:', date],
            ['Payment Terms:', 'Net 30'],
        ];
        metaFields.forEach(([label, value]) => {
            doc.fontSize(10).font('Helvetica-Bold').fillColor(C.dark).text(label, LEFT, y);
            doc.font('Helvetica').fillColor(C.midGray).text(value, LEFT + 100, y);
            y += 18;
        });
        y += 20;

        // ═══ CONTRACTOR INFO ═══
        doc.rect(LEFT, y, W, 1.5).fill(C.orange);
        y += 10;
        doc.fontSize(12).font('Helvetica-Bold').fillColor(C.orange)
            .text('Contractor Information', LEFT, y);
        y += 22;

        const contractorFields = [
            ['Name:', 'Jose Daniel Castillo'],
            ['Address:', '520 E Church St, Orlando, FL 32801'],
            ['Phone:', '321-666-5228'],
            ['Email:', 'danielcastillo@mediageekz.com'],
        ];
        contractorFields.forEach(([label, value]) => {
            doc.fontSize(10).font('Helvetica-Bold').fillColor(C.dark).text(label, LEFT, y);
            doc.font('Helvetica').fillColor(C.midGray).text(value, LEFT + 80, y);
            y += 18;
        });
        y += 15;

        // ═══ CLIENT / SHOW INFO ═══
        doc.rect(LEFT, y, W, 1.5).fill(C.orange);
        y += 10;
        doc.fontSize(12).font('Helvetica-Bold').fillColor(C.orange)
            .text('Client / Show Information', LEFT, y);
        y += 22;

        const clientFields = [
            ['Client:', 'American Dream TV'],
            ['Host / Segment:', `${host} – ${location}`],
            ['Date of Shoot:', date],
            ['Time:', time],
        ];
        clientFields.forEach(([label, value]) => {
            doc.fontSize(10).font('Helvetica-Bold').fillColor(C.dark).text(label, LEFT, y);
            doc.font('Helvetica').fillColor(C.midGray).text(value, LEFT + 110, y);
            y += 18;
        });
        y += 20;

        // ═══ SERVICES TABLE ═══
        doc.rect(LEFT, y, W, 1.5).fill(C.orange);
        y += 10;
        doc.fontSize(12).font('Helvetica-Bold').fillColor(C.orange)
            .text('Services Rendered', LEFT, y);
        y += 25;

        // Header row
        doc.rect(LEFT, y, W, 26).fill(C.charcoal);
        doc.fontSize(9).font('Helvetica-Bold').fillColor(C.white);
        doc.text('Description', LEFT + 12, y + 8);
        doc.text('Amount', LEFT + W - 90, y + 8, { width: 78, align: 'right' });
        y += 26;

        // Service row
        doc.rect(LEFT, y, W, 36).fill(C.offWhite);
        doc.fontSize(9.5).font('Helvetica').fillColor(C.dark)
            .text(`Filming services for American Dream TV segment featuring\n${host} (${location})`, LEFT + 12, y + 8, { width: W - 120 });
        doc.fontSize(10).font('Helvetica-Bold').fillColor(C.dark)
            .text(`$${amount.toFixed(2)}`, LEFT + W - 90, y + 12, { width: 78, align: 'right' });
        y += 36;

        // Total
        y += 8;
        doc.roundedRect(LEFT + W - 220, y, 220, 36, 4).fill(C.orange);
        doc.fontSize(11).font('Helvetica-Bold').fillColor(C.white)
            .text('Total Due:', LEFT + W - 210, y + 11, { width: 100, align: 'left' });
        doc.fontSize(13).font('Helvetica-Bold').fillColor(C.white)
            .text(`$${amount.toFixed(2)} USD`, LEFT + W - 100, y + 10, { width: 90, align: 'right' });

        // ═══ FOOTER ═══
        const footerY = doc.page.height - 36;
        doc.rect(0, footerY - 6, doc.page.width, 2).fill(C.orange);
        doc.fontSize(7.5).font('Helvetica').fillColor(C.midGray)
            .text('MediaGeekz  •  Orlando, FL  •  danielcastillo@mediageekz.com', LEFT, footerY, {
                width: W, align: 'center',
            });

        doc.end();
    });
}

module.exports = { generateADTVInvoice };
