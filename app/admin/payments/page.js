'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const fmt = (n) => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 });
const STATUS_COLORS = {
    COMPLETED: { bg: 'rgba(45, 212, 191, 0.12)', color: '#2dd4bf', label: '✓ Completed' },
    PENDING: { bg: 'rgba(251, 191, 36, 0.12)', color: '#fbbf24', label: '⏳ Pending' },
    FAILED: { bg: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', label: '✕ Failed' },
    CANCELED: { bg: 'rgba(148, 163, 184, 0.12)', color: '#94a3b8', label: '— Canceled' },
};
export default function PaymentsDashboard() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const router = useRouter();
    useEffect(() => {
        fetch('/api/admin/payments?limit=50')
            .then(res => { if (res.status === 401) { router.push('/admin/login'); return null; } return res.json(); })
            .then(data => { if (data?.payments) setPayments(data.payments); else if (data?.error) setError(data.error); setLoading(false); })
            .catch(err => { setError(err.message); setLoading(false); });
    }, [router]);
    const filtered = payments.filter(p => {
        if (filter !== 'all' && p.status !== filter) return false;
        if (search) { const q = search.toLowerCase(); return (p.note || '').toLowerCase().includes(q) || (p.cardLast4 || '').includes(q) || (p.cardBrand || '').toLowerCase().includes(q); }
        return true;
    });
    const totalRevenue = filtered.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0);
    const totalFees = filtered.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + p.processingFee, 0);
    const totalNet = totalRevenue - totalFees;
    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
                :root { --shadow: #060a14; --navy: #0f1729; --panel: rgba(15, 23, 42, 0.88); --border: rgba(232, 98, 44, 0.16); --orange: #e8622c; --teal: #2dd4bf; --cream: #e2e8f0; --white: #f1f5f9; --muted: #94a3b8; --muted-2: #64748b; --muted-3: #475569; }
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Inter', sans-serif !important; color: var(--cream) !important; background: linear-gradient(180deg, #0d1220 0%, #080c16 50%, #060a14 100%) !important; }
                ::selection { background: rgba(232, 98, 44, 0.3); }
                ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: var(--shadow); } ::-webkit-scrollbar-thumb { background: rgba(232, 98, 44, 0.4); border-radius: 999px; }
            `}</style>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>Admin · Payments</div>
                        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--white)' }}>Payment Tracker</h1>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => router.push('/admin')} style={{ padding: '10px 18px', border: '1px solid rgba(100,116,139,0.2)', borderRadius: 10, background: 'var(--panel)', color: 'var(--muted)', cursor: 'pointer', fontSize: 13 }}>← Rate Cards</button>
                        <button onClick={() => { document.cookie = 'admin_session=; Max-Age=0; path=/;'; router.push('/admin/login'); }} style={{ padding: '10px 18px', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, background: 'rgba(239,68,68,0.06)', color: '#ef4444', cursor: 'pointer', fontSize: 13 }}>Logout</button>
                    </div>
                </div>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
                    <div style={{ padding: '24px 20px', border: '1px solid rgba(45, 212, 191, 0.15)', borderRadius: 16, background: 'var(--panel)' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 10 }}>Total Revenue</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--white)' }}>{fmt(totalRevenue)}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 4 }}>{filtered.filter(p => p.status === 'COMPLETED').length} completed payments</div>
                    </div>
                    <div style={{ padding: '24px 20px', border: '1px solid rgba(232, 98, 44, 0.15)', borderRadius: 16, background: 'var(--panel)' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>Processing Fees</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--orange)' }}>{fmt(totalFees)}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 4 }}>{totalRevenue > 0 ? ((totalFees / totalRevenue) * 100).toFixed(1) : 0}% of revenue</div>
                    </div>
                    <div style={{ padding: '24px 20px', border: '1px solid rgba(45, 212, 191, 0.25)', borderRadius: 16, background: 'radial-gradient(circle at top left, rgba(45, 212, 191, 0.06), transparent 50%), var(--panel)' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 10 }}>Net Revenue</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--teal)' }}>{fmt(totalNet)}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 4 }}>After Square fees</div>
                    </div>
                </div>
                {/* Filters */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
                    <input type="text" placeholder="Search by description, card..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200, padding: '12px 16px', border: '1px solid rgba(100,116,139,0.2)', borderRadius: 12, background: 'var(--panel)', color: 'var(--white)', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
                    {['all', 'COMPLETED', 'PENDING', 'FAILED'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{ padding: '10px 16px', border: filter === f ? '1px solid var(--orange)' : '1px solid rgba(100,116,139,0.15)', borderRadius: 10, background: filter === f ? 'rgba(232, 98, 44, 0.12)' : 'var(--panel)', color: filter === f ? 'var(--orange)' : 'var(--muted)', cursor: 'pointer', fontSize: 12, fontWeight: 600, textTransform: 'capitalize', transition: 'all 0.2s' }}>
                            {f === 'all' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
                {loading && <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>Loading payments from Square...</div>}
                {error && <div style={{ textAlign: 'center', padding: 60, color: '#ef4444' }}>Error: {error}</div>}
                {!loading && !error && (
                    <div style={{ border: '1px solid rgba(100,116,139,0.12)', borderRadius: 16, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(100,116,139,0.12)' }}>
                                    {['Date', 'Description', 'Amount', 'Net', 'Card', 'Status', 'Risk', ''].map(h => (
                                        <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-3)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((p) => {
                                    const st = STATUS_COLORS[p.status] || STATUS_COLORS.PENDING;
                                    return (
                                        <tr key={p.id} style={{ borderBottom: '1px solid rgba(100,116,139,0.06)', transition: 'background 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(232, 98, 44, 0.03)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                            <td style={{ padding: '16px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                                                {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                <div style={{ fontSize: 10, color: 'var(--muted-3)', marginTop: 2 }}>{new Date(p.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' })}</div>
                                            </td>
                                            <td style={{ padding: '16px', color: 'var(--white)', fontWeight: 500, maxWidth: 250 }}>
                                                {p.note || <span style={{ color: 'var(--muted-3)', fontStyle: 'italic' }}>No description</span>}
                                            </td>
                                            <td style={{ padding: '16px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: 'var(--white)', fontSize: 15 }}>{fmt(p.amount)}</td>
                                            <td style={{ padding: '16px', fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: 'var(--teal)', fontSize: 13 }}>{fmt(p.netAmount)}</td>
                                            <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                                                <span style={{ color: 'var(--cream)', fontSize: 12 }}>{p.cardBrand || '—'}</span>
                                                <span style={{ color: 'var(--muted-2)', fontSize: 11, marginLeft: 6 }}>****{p.cardLast4 || '—'}</span>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 8, background: st.bg, color: st.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>{st.label}</span>
                                            </td>
                                            <td style={{ padding: '16px', fontSize: 10, color: p.riskLevel === 'NORMAL' ? 'var(--muted-3)' : '#ef4444', fontWeight: 600 }}>
                                                {p.riskLevel === 'NORMAL' ? '●' : '⚠ ' + p.riskLevel}
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                {p.receiptUrl && <a href={p.receiptUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)', fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>Receipt →</a>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted-2)' }}>No payments match your filters</div>}
                    </div>
                )}
                <div style={{ textAlign: 'center', padding: '40px 0 20px', fontSize: 11, color: 'var(--muted-3)' }}>Powered by Square · Data refreshes on each page load</div>
            </div>
        </>
    );
}
