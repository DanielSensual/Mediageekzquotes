const { calculateQuote } = require('../engine');
const { generatePDF } = require('../pdf-generator');
const { validateQuoteRequest } = require('../validate');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const request = req.body;
        const { valid, errors } = validateQuoteRequest(request);

        if (!valid) {
            return res.status(400).json({ error: 'Validation failed.', details: errors });
        }

        const quote = calculateQuote(request);
        const pdfBuffer = await generatePDF(quote);

        const filename = `MediaGeekz-Quote-${quote.quoteId}.pdf`;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        res.send(pdfBuffer);
    } catch (err) {
        console.error('PDF generation error:', err);
        res.status(500).json({ error: 'Failed to generate PDF.' });
    }
};
