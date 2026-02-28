const { calculateQuote } = require('../engine');

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const request = req.body;

        if (!request || !request.days || !Array.isArray(request.days) || request.days.length === 0) {
            return res.status(400).json({
                error: 'Invalid request. "days" must be a non-empty array.',
            });
        }

        const quote = calculateQuote(request);
        res.json(quote);
    } catch (err) {
        console.error('Quote calculation error:', err);
        res.status(500).json({ error: 'Internal server error during quote calculation.' });
    }
};
