/**
 * MediaGeekz Videography Quotes — Client-Side App v4
 * ====================================================
 * Per-deliverable turnaround, per-day add-on selection.
 */

(function () {
    'use strict';

    // ─── Rates (mirrored from engine.js) ─────────────────────────
    const RATES = {
        halfDay: 850,
        fullDay: 1600,
        overtime: 300,
        standard: {
            socialTeaser: 350,
            basicRecapReel: 600,
            premiumRecapReel: 1200,
            basicHighlight: 800,
            premiumHighlight: 1500,
            sessionRecording: 200,
            secondCameraEdit: 300,
            rawFootage: 250,
        },
        senior: {
            socialTeaser: 500,
            basicRecapReel: 900,
            premiumRecapReel: 1800,
            basicHighlight: 1200,
            premiumHighlight: 2500,
            sessionRecording: 300,
            secondCameraEdit: 400,
            rawFootage: 250,
        },
        turnaround: { standard: 0, expedited: 0.20, rush: 0.35, nextDay: 0.60, sameDay: 1.00 },
        droneCoverage: 450,
        livestreaming: 800,
        photoCoverage: 600,
        teleprompterOp: 350,
        onSiteDirector: 500,
        occcParking: 75,
        coiFee: 50,
        travelFee: 150,
    };

    const TURNAROUND_SHORT = {
        standard: '2 Weeks',
        expedited: '1 Week',
        rush: '48 Hours',
        nextDay: 'Next-Day',
        sameDay: 'Same-Day',
    };

    const LABELS = {
        socialTeaser: 'Social Media Teaser (60s)',
        basicRecapReel: 'Basic Recap Reel (1-2 min)',
        premiumRecapReel: 'Premium Recap Reel (3-5 min)',
        basicHighlight: 'Basic Highlight Reel (2-3 min)',
        premiumHighlight: 'Premium Highlight Reel (cinematic)',
        sessionRecording: 'Full Session Recording',
        secondCameraEdit: 'Second Camera Angle Edit',
        rawFootage: 'Raw Footage Handover',
    };

    // ─── State ───────────────────────────────────────────────────
    let nextDayId = 0;
    const PER_DAY_ADDONS = ['livestreaming', 'photoCoverage', 'teleprompterOp', 'onSiteDirector'];

    // ─── DOM refs ────────────────────────────────────────────────
    const $ = id => document.getElementById(id);
    const daysContainer = $('daysContainer');
    const addDayBtn = $('addDayBtn');
    const generateBtn = $('generateBtn');
    const quoteLineItems = $('quoteLineItems');

    const totalCoverage = $('totalCoverage');
    const totalDeliverables = $('totalDeliverables');
    const totalTurnaround = $('totalTurnaround');
    const turnaroundRow = $('turnaroundRow');
    const turnaroundLabel = $('turnaroundLabel');
    const totalAddOns = $('totalAddOns');
    const addOnRow = $('addOnRow');
    const totalLogistics = $('totalLogistics');
    const grandTotal = $('grandTotal');

    const quoteResult = $('quoteResult');
    const quoteId = $('quoteId');
    const quoteJson = $('quoteJson');
    const badgeEditor = $('badgeEditor');
    const badgeTurnaround = $('badgeTurnaround');
    const turnaroundSelect = $('turnaround');
    const downloadPdfBtn = $('downloadPdfBtn');

    // ─── Helpers ─────────────────────────────────────────────────
    function getLocalDateString(offset) {
        const d = new Date();
        d.setDate(d.getDate() + offset);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function fmt(n) {
        return '$' + (n || 0).toLocaleString('en-US');
    }

    function getEditorTier() {
        return document.querySelector('input[name="editorTier"]:checked')?.value || 'standard';
    }

    function getDayCount() {
        return daysContainer.querySelectorAll('.day-row').length || 1;
    }

    // ─── Dynamic Price Labels ────────────────────────────────────
    function updatePriceLabels() {
        const tier = getEditorTier();
        const r = RATES[tier];
        document.querySelectorAll('[data-price-key]').forEach(el => {
            const key = el.dataset.priceKey;
            if (r[key] !== undefined) {
                const isPerSession = ['sessionRecording', 'secondCameraEdit'].includes(key);
                el.textContent = fmt(r[key]) + (isPerSession ? ' / session' : '');
            }
        });
    }

    // ─── Day Pills Management ────────────────────────────────────
    function rebuildAllDayPills() {
        const dayCount = getDayCount();
        const dayRows = daysContainer.querySelectorAll('.day-row');

        PER_DAY_ADDONS.forEach(addonId => {
            const container = $(`dayPills_${addonId}`);
            if (!container) return;

            // Get currently active indices to preserve state
            const wasActive = new Set();
            container.querySelectorAll('.day-pill.active').forEach(pill => {
                wasActive.add(parseInt(pill.dataset.dayIndex, 10));
            });
            const hadPills = container.querySelectorAll('.day-pill').length > 0;

            container.innerHTML = '';
            for (let i = 0; i < dayCount; i++) {
                const pill = document.createElement('span');
                pill.className = 'day-pill';
                pill.dataset.dayIndex = i;

                // Get the day label from the row
                const dayRow = dayRows[i];
                const dateInput = dayRow?.querySelector('input[type="date"]');
                const dateVal = dateInput?.value || '';
                const shortDate = dateVal ? ` (${dateVal.slice(5)})` : '';
                pill.textContent = `Day ${i + 1}${shortDate}`;

                // If had pills before, preserve state; otherwise default to active
                if (hadPills) {
                    if (wasActive.has(i)) pill.classList.add('active');
                } else {
                    pill.classList.add('active'); // default all on
                }

                pill.addEventListener('click', () => {
                    pill.classList.toggle('active');
                    recalc();
                });
                container.appendChild(pill);
            }
        });
    }

    function showHideDayPills(addonId, show) {
        const container = $(`dayPills_${addonId}`);
        if (!container) return;
        if (show) {
            rebuildAllDayPills();
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    }

    function getSelectedDayIndices(addonId) {
        const container = $(`dayPills_${addonId}`);
        if (!container) return [];
        const indices = [];
        container.querySelectorAll('.day-pill.active').forEach(pill => {
            indices.push(parseInt(pill.dataset.dayIndex, 10));
        });
        return indices;
    }

    // ─── Turnaround Override Management ──────────────────────────
    const BOOL_DELIVERABLES = ['socialTeaser', 'basicRecapReel', 'premiumRecapReel', 'basicHighlight', 'premiumHighlight'];
    const QTY_DELIVERABLES = ['sessionRecording', 'secondCameraEdit'];

    function showHideTurnaroundOverride(delivId, show) {
        const el = $(`turnaroundOverride_${delivId}`);
        if (el) el.style.display = show ? 'flex' : 'none';
    }

    function getTurnaroundOverride(delivId) {
        const select = document.querySelector(`select[data-turnaround-for="${delivId}"]`);
        return select ? select.value : ''; // '' means use default
    }

    // ─── Initialize ──────────────────────────────────────────────
    addDay();
    updatePriceLabels();

    addDayBtn.addEventListener('click', addDay);
    generateBtn.addEventListener('click', submitQuote);

    // Editor tier change
    document.querySelectorAll('input[name="editorTier"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const tier = getEditorTier();
            badgeEditor.textContent = tier === 'senior' ? 'Senior Editor' : 'Standard Editor';
            badgeEditor.className = `badge badge-editor ${tier === 'senior' ? 'badge-senior' : ''}`;
            updatePriceLabels();
            recalc();
        });
    });

    // Turnaround change
    turnaroundSelect.addEventListener('change', () => {
        const key = turnaroundSelect.value;
        badgeTurnaround.textContent = TURNAROUND_SHORT[key] || '2 Weeks';
        badgeTurnaround.className = `badge badge-turnaround ${key !== 'standard' ? 'badge-active' : ''}`;
        recalc();
    });

    // Stepper buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.stepper-btn');
        if (!btn) return;
        const target = $(btn.dataset.target);
        if (!target) return;
        let val = parseInt(target.textContent, 10) || 0;
        if (btn.dataset.action === 'inc') val++;
        if (btn.dataset.action === 'dec' && val > 0) val--;
        target.textContent = val;

        // Show/hide turnaround override for qty deliverables
        if (btn.dataset.target === 'sessionCount') showHideTurnaroundOverride('sessionRecording', val > 0);
        if (btn.dataset.target === 'secondCameraCount') showHideTurnaroundOverride('secondCameraEdit', val > 0);

        recalc();
    });

    // Toggle changes — deliverables, add-ons, logistics
    document.addEventListener('change', (e) => {
        const el = e.target;

        // Deliverable toggles → show/hide turnaround override
        if (el.matches('[data-deliverable]') && el.type === 'checkbox') {
            const delivId = el.id;
            if (BOOL_DELIVERABLES.includes(delivId)) {
                showHideTurnaroundOverride(delivId, el.checked);
            }
        }

        // Per-day add-on toggles → show/hide day pills
        if (el.matches('[data-per-day]') && el.type === 'checkbox') {
            showHideDayPills(el.id, el.checked);
        }

        // Turnaround override selects
        if (el.matches('[data-turnaround-for]')) {
            recalc();
            return;
        }

        if (el.matches('[data-deliverable], [data-logistics], [data-addon]')) recalc();
    });

    // ─── Day Management ──────────────────────────────────────────
    function addDay() {
        const existing = daysContainer.querySelectorAll('.day-row').length;
        nextDayId++;
        const idx = nextDayId;
        const defaultDate = getLocalDateString(existing);

        const row = document.createElement('div');
        row.className = 'day-row';
        row.dataset.dayId = idx;
        row.innerHTML = `
      <div class="field">
        <span class="day-label">Day ${existing + 1}</span>
        <label for="dayDate${idx}">Date</label>
        <input type="date" id="dayDate${idx}" value="${defaultDate}" data-day-input>
      </div>
      <div class="field">
        <label for="dayHours${idx}">Hours</label>
        <select id="dayHours${idx}" data-day-input>
          <option value="2">2h</option>
          <option value="4">4h</option>
          <option value="6">6h</option>
          <option value="8" selected>8h</option>
          <option value="10">10h</option>
          <option value="12">12h</option>
          <option value="14">14h</option>
        </select>
      </div>
      <div class="field">
        <label for="dayOps${idx}">Operators</label>
        <select id="dayOps${idx}" data-day-input>
          <option value="1">1</option>
          <option value="2" selected>2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <button type="button" class="remove-day" title="Remove day">×</button>
    `;
        daysContainer.appendChild(row);

        row.querySelector('.remove-day').addEventListener('click', () => {
            row.remove();
            renumberDays();
            rebuildAllDayPills();
            recalc();
        });
        row.querySelectorAll('[data-day-input]').forEach(input => {
            input.addEventListener('change', () => {
                rebuildAllDayPills();
                recalc();
            });
        });

        rebuildAllDayPills();
        recalc();
    }

    function renumberDays() {
        daysContainer.querySelectorAll('.day-row').forEach((row, i) => {
            const label = row.querySelector('.day-label');
            if (label) label.textContent = `Day ${i + 1}`;
        });
    }

    // ─── Build Request ───────────────────────────────────────────
    function buildRequest() {
        const days = [];
        daysContainer.querySelectorAll('.day-row').forEach(row => {
            const id = row.dataset.dayId;
            days.push({
                date: $(`dayDate${id}`)?.value || '',
                hours: parseInt($(`dayHours${id}`)?.value, 10) || 8,
                operators: parseInt($(`dayOps${id}`)?.value, 10) || 1,
            });
        });

        const globalTurnaround = turnaroundSelect.value;

        // Build deliverables with per-item turnaround
        const deliverables = {};
        for (const key of BOOL_DELIVERABLES) {
            const checked = $(key)?.checked;
            if (checked) {
                const override = getTurnaroundOverride(key);
                deliverables[key] = override
                    ? { enabled: true, turnaround: override }
                    : true;
            } else {
                deliverables[key] = false;
            }
        }

        // Qty items with optional turnaround
        const sessionCount = parseInt($('sessionCount').textContent, 10) || 0;
        if (sessionCount > 0) {
            const override = getTurnaroundOverride('sessionRecording');
            deliverables.sessionRecording = override
                ? { count: sessionCount, turnaround: override }
                : sessionCount;
        } else {
            deliverables.sessionRecording = 0;
        }

        const secondCameraCount = parseInt($('secondCameraCount').textContent, 10) || 0;
        if (secondCameraCount > 0) {
            const override = getTurnaroundOverride('secondCameraEdit');
            deliverables.secondCameraEdit = override
                ? { count: secondCameraCount, turnaround: override }
                : secondCameraCount;
        } else {
            deliverables.secondCameraEdit = 0;
        }

        // Raw footage (no turnaround override — no editing needed)
        deliverables.rawFootage = $('rawFootage')?.checked || false;

        // Build add-ons with per-day selection
        const addOns = {
            droneHours: parseInt($('droneHours').textContent, 10) || 0,
        };

        for (const addonId of PER_DAY_ADDONS) {
            const checked = $(addonId)?.checked;
            if (checked) {
                const indices = getSelectedDayIndices(addonId);
                addOns[addonId] = indices.length > 0 ? indices : true;
            } else {
                addOns[addonId] = false;
            }
        }

        return {
            clientName: $('clientName').value,
            eventName: $('eventName').value,
            location: $('location').value,
            editorTier: getEditorTier(),
            turnaround: globalTurnaround,
            days,
            deliverables,
            addOns,
            occcParking: $('occcParking').checked,
            coi: $('coiFee').checked,
            travelFee: $('travelFee').checked,
        };
    }

    // ─── Real-time Calculation ───────────────────────────────────
    function recalc() {
        const req = buildRequest();
        const result = localCalculate(req);

        // Line items
        if (result.lineItems.length === 0) {
            quoteLineItems.innerHTML = '<p class="empty-state">Configure your project to see the breakdown.</p>';
        } else {
            quoteLineItems.innerHTML = result.lineItems.map(item => `
        <div class="line-item">
          <div class="line-desc">
            <span class="line-cat">${item.category}</span><br>
            ${item.description}
            ${item.qty > 1 ? ` <span style="opacity:0.5">×${item.qty}</span>` : ''}
          </div>
          <span class="line-amount">${fmt(item.total)}</span>
        </div>
      `).join('');
        }

        totalCoverage.textContent = fmt(result.coverageTotal);
        totalDeliverables.textContent = fmt(result.deliverablesTotal);

        if (result.turnaroundFee > 0) {
            turnaroundRow.style.display = 'flex';
            turnaroundLabel.textContent = 'Turnaround Fees';
            totalTurnaround.textContent = fmt(result.turnaroundFee);
        } else {
            turnaroundRow.style.display = 'none';
        }

        if (result.addOnsTotal > 0) {
            addOnRow.style.display = 'flex';
            totalAddOns.textContent = fmt(result.addOnsTotal);
        } else {
            addOnRow.style.display = 'none';
        }

        totalLogistics.textContent = fmt(result.logisticsTotal);
        grandTotal.textContent = fmt(result.total);
    }

    function localCalculate(req) {
        const lineItems = [];
        let coverageTotal = 0;
        let deliverablesTotal = 0;
        let turnaroundFee = 0;
        let addOnsTotal = 0;
        let logisticsTotal = 0;

        const tier = req.editorTier || 'standard';
        const editorRates = RATES[tier] || RATES.standard;
        const editorLabel = tier === 'senior' ? 'Senior' : 'Standard';
        const globalTurnaround = req.turnaround || 'standard';
        const dayCount = (req.days || []).length || 1;

        // ── Coverage ──
        (req.days || []).forEach((day, i) => {
            const hours = day.hours || 8;
            const operators = day.operators || 1;
            let unitPrice;
            if (hours <= 4) unitPrice = RATES.halfDay;
            else if (hours <= 8) unitPrice = RATES.fullDay;
            else unitPrice = RATES.fullDay + (hours - 8) * RATES.overtime;

            const total = unitPrice * operators;
            coverageTotal += total;

            let t = hours <= 4 ? 'Half-Day' : 'Full-Day';
            let desc = `Day ${i + 1}`;
            if (day.date) desc += ` (${day.date})`;
            desc += ` — ${t}, ${hours}h`;
            if (hours > 8) desc += ` (incl. ${hours - 8}h OT)`;

            lineItems.push({ category: 'Coverage', description: desc, qty: operators, unitPrice, total });
        });

        // ── Deliverables with per-deliverable turnaround ──
        const del = req.deliverables || {};

        for (const key of BOOL_DELIVERABLES) {
            const val = del[key];
            const enabled = typeof val === 'object' ? val.enabled : val;
            if (!enabled) continue;

            const price = editorRates[key];
            lineItems.push({ category: 'Editing', description: `${LABELS[key]} [${editorLabel}]`, qty: 1, unitPrice: price, total: price });
            deliverablesTotal += price;

            // Per-item turnaround
            const itemTurnaround = (typeof val === 'object' && val.turnaround) ? val.turnaround : globalTurnaround;
            const mult = RATES.turnaround[itemTurnaround] || 0;
            if (mult > 0) {
                const fee = Math.round(price * mult);
                const pct = Math.round(mult * 100);
                const shortLabel = LABELS[key].split(' (')[0];
                lineItems.push({ category: 'Turnaround', description: `${TURNAROUND_SHORT[itemTurnaround]} — ${shortLabel} (+${pct}%)`, qty: 1, unitPrice: fee, total: fee });
                turnaroundFee += fee;
            }
        }

        for (const key of QTY_DELIVERABLES) {
            const val = del[key];
            let count = 0;
            let itemTurnaround = globalTurnaround;
            if (typeof val === 'object') {
                count = parseInt(val.count || val.qty || 0, 10);
                if (val.turnaround) itemTurnaround = val.turnaround;
            } else {
                count = parseInt(val, 10) || 0;
            }

            if (count > 0) {
                const price = editorRates[key];
                const total = price * count;
                lineItems.push({ category: 'Editing', description: `${LABELS[key]} [${editorLabel}]`, qty: count, unitPrice: price, total });
                deliverablesTotal += total;

                const mult = RATES.turnaround[itemTurnaround] || 0;
                if (mult > 0) {
                    const fee = Math.round(total * mult);
                    const pct = Math.round(mult * 100);
                    const shortLabel = LABELS[key].split(' (')[0];
                    lineItems.push({ category: 'Turnaround', description: `${TURNAROUND_SHORT[itemTurnaround]} — ${shortLabel} (+${pct}%)`, qty: 1, unitPrice: fee, total: fee });
                    turnaroundFee += fee;
                }
            }
        }

        // Raw footage (no turnaround)
        if (del.rawFootage) {
            const price = editorRates.rawFootage;
            lineItems.push({ category: 'Editing', description: `${LABELS.rawFootage} [${editorLabel}]`, qty: 1, unitPrice: price, total: price });
            deliverablesTotal += price;
        }

        // ── Add-Ons (per-day) ──
        const addOns = req.addOns || {};
        const droneHrs = parseInt(addOns.droneHours, 10) || 0;
        if (droneHrs > 0) {
            const t = RATES.droneCoverage * droneHrs;
            lineItems.push({ category: 'Add-On', description: 'Drone Coverage (FAA Part 107)', qty: droneHrs, unitPrice: RATES.droneCoverage, total: t });
            addOnsTotal += t;
        }

        const PER_DAY_LABELS = {
            livestreaming: 'Multi-Platform Livestreaming',
            photoCoverage: 'Event Photo Coverage',
            teleprompterOp: 'Teleprompter Operator',
            onSiteDirector: 'On-Site Creative Director',
        };
        const PER_DAY_RATES = {
            livestreaming: RATES.livestreaming,
            photoCoverage: RATES.photoCoverage,
            teleprompterOp: RATES.teleprompterOp,
            onSiteDirector: RATES.onSiteDirector,
        };

        for (const addonKey of PER_DAY_ADDONS) {
            const val = addOns[addonKey];
            let count = 0;
            if (Array.isArray(val)) count = val.length;
            else if (val === true) count = dayCount;

            if (count > 0) {
                const rate = PER_DAY_RATES[addonKey];
                const t = rate * count;
                const dayNote = count < dayCount ? ` (${count} of ${dayCount} days)` : '';
                lineItems.push({ category: 'Add-On', description: `${PER_DAY_LABELS[addonKey]}${dayNote}`, qty: count, unitPrice: rate, total: t });
                addOnsTotal += t;
            }
        }

        // ── Logistics ──
        if (req.occcParking) { const t = RATES.occcParking * dayCount; lineItems.push({ category: 'Logistics', description: 'OCCC/Resort Parking', qty: dayCount, unitPrice: RATES.occcParking, total: t }); logisticsTotal += t; }
        if (req.coi) { lineItems.push({ category: 'Logistics', description: 'COI Admin Fee', qty: 1, unitPrice: RATES.coiFee, total: RATES.coiFee }); logisticsTotal += RATES.coiFee; }
        if (req.travelFee) { lineItems.push({ category: 'Logistics', description: 'Travel Fee', qty: 1, unitPrice: RATES.travelFee, total: RATES.travelFee }); logisticsTotal += RATES.travelFee; }

        const total = coverageTotal + deliverablesTotal + turnaroundFee + addOnsTotal + logisticsTotal;

        return { lineItems, coverageTotal, deliverablesTotal, turnaroundFee, addOnsTotal, logisticsTotal, total };
    }

    // ─── API Submit ──────────────────────────────────────────────
    async function submitQuote() {
        const req = buildRequest();
        if (!req.days || req.days.length === 0) { alert('Please add at least one day of coverage.'); return; }

        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span class="btn-icon">⏳</span> Generating...';

        try {
            const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req) });
            const data = await res.json();
            quoteId.textContent = data.quoteId || '';
            quoteJson.textContent = JSON.stringify(data, null, 2);
            quoteResult.style.display = 'block';
            downloadPdfBtn.style.display = 'flex';
            quoteResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (err) {
            console.error('Quote API error:', err);
            alert('Failed to generate quote. Is the server running?');
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<span class="btn-icon">⚡</span> Generate Quote';
        }
    }

    // ─── PDF Download ────────────────────────────────────────────
    downloadPdfBtn.addEventListener('click', downloadPDF);

    async function downloadPDF() {
        const req = buildRequest();
        if (!req.days || req.days.length === 0) return;

        downloadPdfBtn.disabled = true;
        downloadPdfBtn.innerHTML = '<span class="btn-icon">⏳</span> Generating PDF...';

        try {
            const res = await fetch('/api/quote/pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req),
            });

            if (!res.ok) throw new Error(`Server returned ${res.status}`);

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            const cd = res.headers.get('Content-Disposition') || '';
            const match = cd.match(/filename="?([^"]+)"?/);
            const filename = match ? match[1] : 'MediaGeekz-Quote.pdf';

            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('PDF download error:', err);
            alert('Failed to download PDF. Check the console for details.');
        } finally {
            downloadPdfBtn.disabled = false;
            downloadPdfBtn.innerHTML = '<span class="btn-icon">📄</span> Download PDF Quote';
        }
    }
})();
