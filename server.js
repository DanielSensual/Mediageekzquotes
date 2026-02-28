/**
 * MediaGeekz Videography Quotes — API Server
 * ============================================
 * Lightweight Express server serving the JSON API and static frontend.
 */

const express = require('express');
const path = require('path');
const { calculateQuote } = require('./engine');
const { generatePDF } = require('./pdf-generator');
const { validateQuoteRequest } = require('./validate');

const app = express();
const PORT = process.env.PORT || 3050;

// ─── Middleware ──────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── API Routes ─────────────────────────────────────────────────

/**
 * POST /api/quote
 * Accepts a QuoteRequest JSON body, returns a QuoteResponse.
 */
app.post('/api/quote', (req, res) => {
    try {
        const request = req.body;
        const { valid, errors } = validateQuoteRequest(request);

        if (!valid) {
            return res.status(400).json({
                error: 'Validation failed.',
                details: errors,
                example: {
                    clientName: 'Acme Corp',
                    eventName: 'TechConnect 2026',
                    location: 'OCCC',
                    editorTier: 'standard',
                    turnaround: 'standard',
                    days: [{ date: '2026-03-15', hours: 8, operators: 2 }],
                    deliverables: {
                        socialTeaser: true,
                        basicRecapReel: false,
                        sessionRecording: 2,
                        rawFootage: false,
                    },
                    addOns: { droneHours: 0, livestreaming: false },
                    occcParking: true,
                    coi: true,
                },
            });
        }

        const quote = calculateQuote(request);
        res.json(quote);
    } catch (err) {
        console.error('Quote calculation error:', err);
        res.status(500).json({ error: 'Internal server error during quote calculation.' });
    }
});

/**
 * POST /api/quote/pdf
 * Returns a downloadable PDF of the calculated quote.
 */
app.post('/api/quote/pdf', async (req, res) => {
    try {
        const request = req.body;
        const { valid, errors } = validateQuoteRequest(request);

        if (!valid) {
            return res.status(400).json({ error: 'Validation failed.', details: errors });
        }

        const quote = calculateQuote(request);
        const pdfBuffer = await generatePDF(quote);

        const filename = `MediaGeekz-Quote-${quote.quoteId}.pdf`;
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': pdfBuffer.length,
        });
        res.send(pdfBuffer);
    } catch (err) {
        console.error('PDF generation error:', err);
        res.status(500).json({ error: 'Failed to generate PDF.' });
    }
});

/**
 * GET /api/rates
 * Returns the current default rate table (useful for AI agents to inspect pricing).
 */
app.get('/api/rates', (_req, res) => {
    const { DEFAULT_RATES } = require('./engine');
    res.json(DEFAULT_RATES);
});

// ─── Fallback ───────────────────────────────────────────────────
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n  ⚡ MediaGeekz Quotes running at http://localhost:${PORT}\n`);
});
