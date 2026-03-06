'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ADTVInvoicePage() {
    const router = useRouter();
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const [form, setForm] = useState({
        host: 'Bent Danholm',
        location: 'Winter Park',
        date: dateStr,
        time: '8:30 AM – 12:30 PM',
        amount: 400,
    });

    const [status, setStatus] = useState(null); // { type: 'success'|'error', message }
    const [sending, setSending] = useState(false);
    const [generating, setGenerating] = useState(false);

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleGeneratePDF = async () => {
        setGenerating(true);
        setStatus(null);
        try {
            const res = await fetch('/api/admin/adtv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'pdf', ...form }),
            });
            if (!res.ok) throw new Error('Failed to generate PDF');
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice-ADTV-${form.host.replace(/\s+/g, '-')}-${form.date.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
            setStatus({ type: 'success', message: 'PDF downloaded!' });
        } catch (err) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setGenerating(false);
        }
    };

    const handleSendEmail = async () => {
        if (!confirm(`Send invoice to AP@adtvmedia.com for ${form.host} — ${form.location} ($${form.amount})?`)) return;
        setSending(true);
        setStatus(null);
        try {
            const res = await fetch('/api/admin/adtv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'email', ...form }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send');
            setStatus({ type: 'success', message: `✅ Invoice emailed to AP@adtvmedia.com (ID: ${data.emailId})` });
        } catch (err) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setSending(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto', color: 'var(--text-main, #e2e8f0)' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0, color: '#FF6A00' }}>ADTV Invoice</h1>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)' }}>
                        American Dream TV — Net 30
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => router.push('/admin')}
                        style={{
                            padding: '8px 16px', fontSize: '0.85rem', borderRadius: '6px',
                            border: '1px solid var(--border-color, #334155)', background: 'transparent',
                            color: 'var(--text-secondary, #94a3b8)', cursor: 'pointer',
                        }}
                    >
                        ← Rate Cards
                    </button>
                    <button
                        onClick={() => { document.cookie = 'admin_session=; Max-Age=0; path=/;'; router.push('/admin/login'); }}
                        style={{
                            padding: '8px 16px', fontSize: '0.85rem', borderRadius: '6px',
                            border: '1px solid var(--border-color, #334155)', background: 'transparent',
                            color: 'var(--text-secondary, #94a3b8)', cursor: 'pointer',
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Status Alert */}
            {status && (
                <div style={{
                    padding: '14px 18px', borderRadius: '8px', marginBottom: '24px',
                    background: status.type === 'success' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                    border: `1px solid ${status.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    color: status.type === 'success' ? '#22c55e' : '#ef4444',
                    fontSize: '0.9rem',
                }}>
                    {status.message}
                </div>
            )}

            {/* Form */}
            <div style={{
                background: 'var(--bg-card, #0f172a)', border: '1px solid var(--border-color, #1e293b)',
                borderRadius: '12px', padding: '28px',
            }}>
                <div style={{ display: 'grid', gap: '20px' }}>
                    <FormField label="Host / Segment" value={form.host} onChange={v => update('host', v)} placeholder="Bent Danholm" />
                    <FormField label="Location" value={form.location} onChange={v => update('location', v)} placeholder="Winter Park" />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <FormField label="Shoot Date" value={form.date} onChange={v => update('date', v)} placeholder="March 4, 2026" />
                        <FormField label="Time" value={form.time} onChange={v => update('time', v)} placeholder="8:30 AM – 12:30 PM" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <FormField label="Amount ($)" value={form.amount} onChange={v => update('amount', Number(v))} type="number" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)', fontWeight: 600 }}>Send To</label>
                            <div style={{
                                padding: '10px 14px', borderRadius: '8px',
                                background: 'rgba(255, 106, 0, 0.08)', border: '1px solid rgba(255, 106, 0, 0.2)',
                                color: '#FF6A00', fontSize: '0.9rem', fontWeight: 500,
                            }}>
                                AP@adtvmedia.com
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div style={{
                    marginTop: '24px', padding: '16px', borderRadius: '8px',
                    background: 'rgba(255, 106, 0, 0.05)', border: '1px solid rgba(255, 106, 0, 0.15)',
                }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)', marginBottom: '8px' }}>INVOICE PREVIEW</p>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main, #e2e8f0)' }}>
                        <strong>{form.host}</strong> — {form.location}<br />
                        {form.date} • {form.time}<br />
                        <span style={{ color: '#FF6A00', fontWeight: 700, fontSize: '1.1rem' }}>${form.amount.toFixed(2)}</span> • Net 30
                    </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px' }}>
                    <button
                        onClick={handleGeneratePDF}
                        disabled={generating}
                        style={{
                            padding: '14px', borderRadius: '8px', border: '1px solid #FF6A00',
                            background: 'transparent', color: '#FF6A00', fontSize: '0.95rem',
                            fontWeight: 600, cursor: generating ? 'wait' : 'pointer',
                            opacity: generating ? 0.6 : 1, transition: 'all 0.2s',
                        }}
                    >
                        {generating ? 'Generating...' : '📄 Download PDF'}
                    </button>
                    <button
                        onClick={handleSendEmail}
                        disabled={sending}
                        style={{
                            padding: '14px', borderRadius: '8px', border: 'none',
                            background: '#FF6A00', color: 'white', fontSize: '0.95rem',
                            fontWeight: 600, cursor: sending ? 'wait' : 'pointer',
                            opacity: sending ? 0.6 : 1, transition: 'all 0.2s',
                        }}
                    >
                        {sending ? 'Sending...' : '📧 Send to ADTV'}
                    </button>
                </div>
            </div>

            {/* Quick Info */}
            <div style={{
                marginTop: '20px', padding: '16px', borderRadius: '8px',
                background: 'var(--bg-card, #0f172a)', border: '1px solid var(--border-color, #1e293b)',
                fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)',
            }}>
                <strong style={{ color: 'var(--text-main, #e2e8f0)' }}>Contract Terms:</strong>{' '}
                $400 flat / 4 hours • Net 30 from email receipt • Invoices processed every Thursday • Submit as PDF to AP@adtvmedia.com
            </div>
        </div>
    );
}

function FormField({ label, value, onChange, placeholder, type = 'text' }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)', fontWeight: 600 }}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                style={{
                    padding: '10px 14px', borderRadius: '8px', fontSize: '0.95rem',
                    border: '1px solid var(--border-color, #334155)',
                    background: 'var(--bg-main, #020617)', color: 'var(--text-main, #e2e8f0)',
                    outline: 'none', transition: 'border-color 0.2s',
                }}
            />
        </div>
    );
}
