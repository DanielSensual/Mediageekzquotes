const { calculateQuote } = require('../engine');
const { validateQuoteRequest } = require('../validate');

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const request = req.body;
        const { valid, errors } = validateQuoteRequest(request);

        if (!valid) {
            return res.status(400).json({
                error: 'Validation failed.',
                details: errors,
            });
        }

        const quote = calculateQuote(request);
        res.json(quote);
    } catch (err) {
        console.error('Quote calculation error:', err);
        res.status(500).json({ error: 'Internal server error during quote calculation.' });
    }
};
