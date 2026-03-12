const { templateToRateCard } = require('./engine');
const { ALL_VERTICALS } = require('./verticals');

const FALLBACK_TENANTS = {
    mediageekz: {
        slug: 'mediageekz',
        name: 'MediaGeekz',
        plan: 'agency',
        colorPrimary: '#F97316',
        colorBg: '#05060A',
        fontFamily: 'Montserrat',
        logoUrl: null,
        email: 'info@mediageekz.com',
        city: 'Orlando',
        state: 'FL',
        verticals: Object.values(ALL_VERTICALS),
    },
};

function getFallbackTenants() {
    return Object.values(FALLBACK_TENANTS).map((tenant) => ({
        slug: tenant.slug,
        name: tenant.name,
        plan: tenant.plan,
        colorPrimary: tenant.colorPrimary,
        verticalCount: tenant.verticals.length,
    }));
}

function getFallbackTenant(tenantSlug) {
    return FALLBACK_TENANTS[tenantSlug] || null;
}

function getFallbackVertical(tenantSlug, verticalSlug) {
    const tenant = getFallbackTenant(tenantSlug);
    if (!tenant) return null;

    const vertical = tenant.verticals.find((entry) => entry.slug === verticalSlug);
    if (!vertical) return null;

    return {
        tenant,
        vertical,
        rateCard: templateToRateCard(vertical),
    };
}

function getFallbackRateCards(tenantSlug, verticalSlug) {
    const tenant = getFallbackTenant(tenantSlug);
    if (!tenant) return null;

    const selectedVerticals = verticalSlug
        ? tenant.verticals.filter((entry) => entry.slug === verticalSlug)
        : tenant.verticals;

    if (selectedVerticals.length === 0) return null;

    const rateCards = {};
    for (const vertical of selectedVerticals) {
        rateCards[vertical.slug] = {
            name: vertical.name,
            icon: vertical.icon,
            ...templateToRateCard(vertical),
        };
    }

    return { tenant, rateCards };
}

function isRecoverableDatabaseError(error) {
    const name = `${error?.name || ''}`;
    const message = `${error?.message || ''}`.toLowerCase();

    if (name.startsWith('PrismaClient')) return true;

    return [
        'authentication failed against database server',
        'provided database credentials',
        "can't reach database server",
        'environment variable not found',
        'connection refused',
        'connection timed out',
        'connect timeout',
        'database server',
    ].some((needle) => message.includes(needle));
}

module.exports = {
    getFallbackTenants,
    getFallbackTenant,
    getFallbackVertical,
    getFallbackRateCards,
    isRecoverableDatabaseError,
};
