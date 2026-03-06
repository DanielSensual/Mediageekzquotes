'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const [verticals, setVerticals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/admin/services')
            .then(res => res.json())
            .then(data => {
                if (data.verticals) {
                    setVerticals(data.verticals);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleUpdate = async (type, id, updates) => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/services', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, id, data: updates }),
            });
            if (!res.ok) throw new Error('Failed to update');

            // Find and update item locally to avoid full refetch if we wanted to
            // For MVP, simplistic reload or state patch. We'll do a quick state patch:
            setVerticals(prev => prev.map(v => {
                if (type === 'service') {
                    const services = v.services.map(s => s.id === id ? { ...s, ...updates } : s);
                    return { ...v, services };
                } else {
                    const addOns = v.addOns.map(a => a.id === id ? { ...a, ...updates } : a);
                    return { ...v, addOns };
                }
            }));

        } catch (err) {
            alert('Error updating. See console.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '40px', color: 'var(--text-main)', textAlign: 'center' }}>Loading Rate Cards...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-main)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2rem', margin: 0 }}>Rate Card Manager</h1>
                <button
                    onClick={() => {
                        document.cookie = 'admin_session=; Max-Age=0; path=/;';
                        router.push('/admin/login');
                    }}
                    className="btn-outline"
                    style={{ padding: '8px 16px' }}
                >
                    Logout
                </button>
            </div>

            {verticals.map(vertical => (
                <div key={vertical.id} className="card" style={{ marginBottom: '40px' }}>
                    <h2 className="card-title" style={{ color: 'var(--accent-gold)' }}>{vertical.name}</h2>
                    <p className="card-subtitle" style={{ marginBottom: '20px' }}>/{vertical.slug}</p>

                    <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>Services</h3>
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {vertical.services.map(svc => (
                            <EditableRow
                                key={svc.id}
                                item={svc}
                                type="service"
                                onSave={(updates) => handleUpdate('service', svc.id, updates)}
                                saving={saving}
                            />
                        ))}
                    </div>

                    <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px', marginTop: '32px' }}>Add-Ons</h3>
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {vertical.addOns.map(addon => (
                            <EditableRow
                                key={addon.id}
                                item={addon}
                                type="addon"
                                onSave={(updates) => handleUpdate('addon', addon.id, updates)}
                                saving={saving}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function EditableRow({ item, type, onSave, saving }) {
    const isService = type === 'service';

    // Local edits before saving
    const [enabled, setEnabled] = useState(item.enabled);
    const [stdPrice, setStdPrice] = useState(isService ? item.standardPrice : item.pricePerUnit);
    const [snrPrice, setSnrPrice] = useState(item.seniorPrice || 0);

    const isDirty = enabled !== item.enabled ||
        stdPrice !== (isService ? item.standardPrice : item.pricePerUnit) ||
        (isService && snrPrice !== item.seniorPrice);

    const handleSave = () => {
        const payload = { enabled };
        if (isService) {
            payload.standardPrice = Number(stdPrice);
            payload.seniorPrice = Number(snrPrice);
        } else {
            payload.pricePerUnit = Number(stdPrice);
        }
        onSave(payload);
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            background: 'var(--bg-main)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
        }}>
            <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '1rem', display: 'block' }}>{item.name}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.slug} {type === 'addon' ? `(${item.unitType})` : ''}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Enabled</label>
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={e => setEnabled(e.target.checked)}
                    style={{ width: '20px', height: '20px', accentColor: 'var(--accent-gold)' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '120px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{isService ? 'Standard $' : 'Price $'}</label>
                <input
                    type="number"
                    value={stdPrice}
                    onChange={e => setStdPrice(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#111', color: 'white' }}
                />
            </div>

            {isService && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '120px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Senior $</label>
                    <input
                        type="number"
                        value={snrPrice}
                        onChange={e => setSnrPrice(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#111', color: 'white' }}
                    />
                </div>
            )}

            <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-end', paddingTop: '20px' }}>
                {isDirty && (
                    <button
                        className="btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        onClick={handleSave}
                        disabled={saving}
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
}
