const { calculateQuote } = require('../engine');
const { generatePDF } = require('../pdf-generator');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const request = req.body;

        if (!request || !request.days || !Array.isArray(request.days) || request.days.length === 0) {
            return res.status(400).json({ error: 'Invalid request. "days" must be a non-empty array.' });
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
