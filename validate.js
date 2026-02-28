/**
 * MediaGeekz Quote Request Validator
 * ===================================
 * Lightweight validation — zero dependencies.
 */

const VALID_EDITOR_TIERS = ['standard', 'senior'];
const VALID_TURNAROUNDS = ['standard', 'expedited', 'rush', 'nextDay', 'sameDay'];
const VALID_BOOL_DELIVERABLES = [
    'socialTeaser', 'basicRecapReel', 'premiumRecapReel',
    'basicHighlight', 'premiumHighlight', 'rawFootage',
];
const VALID_QTY_DELIVERABLES = ['sessionRecording', 'secondCameraEdit'];
const VALID_ADDONS = ['droneHours', 'livestreaming', 'photoCoverage', 'teleprompterOp', 'onSiteDirector'];

function validateQuoteRequest(body) {
    const errors = [];

    if (!body || typeof body !== 'object') {
        return { valid: false, errors: ['Request body must be a JSON object.'] };
    }

    // ── Days (required) ──
    if (!body.days || !Array.isArray(body.days) || body.days.length === 0) {
        errors.push('"days" must be a non-empty array.');
    } else {
        body.days.forEach((day, i) => {
            if (typeof day !== 'object' || day === null) {
                errors.push(`days[${i}] must be an object.`);
                return;
            }
            const hours = day.hours;
            if (hours !== undefined) {
                const h = Number(hours);
                if (isNaN(h) || h < 1 || h > 16) {
                    errors.push(`days[${i}].hours must be 1-16 (got ${hours}).`);
                }
            }
            const ops = day.operators;
            if (ops !== undefined) {
                const o = Number(ops);
                if (isNaN(o) || o < 1 || o > 10) {
                    errors.push(`days[${i}].operators must be 1-10 (got ${ops}).`);
                }
            }
        });
    }

    // ── Editor Tier ──
    if (body.editorTier && !VALID_EDITOR_TIERS.includes(body.editorTier)) {
        errors.push(`"editorTier" must be one of: ${VALID_EDITOR_TIERS.join(', ')} (got "${body.editorTier}").`);
    }

    // ── Turnaround ──
    if (body.turnaround && !VALID_TURNAROUNDS.includes(body.turnaround)) {
        errors.push(`"turnaround" must be one of: ${VALID_TURNAROUNDS.join(', ')} (got "${body.turnaround}").`);
    }

    // ── Deliverables ──
    if (body.deliverables && typeof body.deliverables === 'object') {
        const del = body.deliverables;
        for (const key of Object.keys(del)) {
            if (!VALID_BOOL_DELIVERABLES.includes(key) && !VALID_QTY_DELIVERABLES.includes(key)) {
                errors.push(`Unknown deliverable: "${key}".`);
                continue;
            }

            const val = del[key];

            // Bool deliverables: accept true, false, or { enabled, turnaround }
            if (VALID_BOOL_DELIVERABLES.includes(key)) {
                if (typeof val === 'object' && val !== null) {
                    if (val.turnaround && !VALID_TURNAROUNDS.includes(val.turnaround)) {
                        errors.push(`deliverables.${key}.turnaround must be valid (got "${val.turnaround}").`);
                    }
                } else if (typeof val !== 'boolean') {
                    errors.push(`deliverables.${key} must be boolean or {enabled, turnaround} (got ${typeof val}).`);
                }
            }

            // Qty deliverables: accept number, or { count, turnaround }
            if (VALID_QTY_DELIVERABLES.includes(key)) {
                if (typeof val === 'object' && val !== null) {
                    const count = Number(val.count || val.qty || 0);
                    if (isNaN(count) || count < 0) {
                        errors.push(`deliverables.${key}.count must be a non-negative number.`);
                    }
                    if (val.turnaround && !VALID_TURNAROUNDS.includes(val.turnaround)) {
                        errors.push(`deliverables.${key}.turnaround must be valid (got "${val.turnaround}").`);
                    }
                } else if (typeof val !== 'number' && typeof val !== 'string') {
                    errors.push(`deliverables.${key} must be a number or {count, turnaround}.`);
                }
            }
        }
    }

    // ── Add-Ons ──
    if (body.addOns && typeof body.addOns === 'object') {
        for (const key of Object.keys(body.addOns)) {
            if (!VALID_ADDONS.includes(key)) {
                errors.push(`Unknown add-on: "${key}".`);
            }
        }
    }

    return { valid: errors.length === 0, errors };
}

module.exports = { validateQuoteRequest };
