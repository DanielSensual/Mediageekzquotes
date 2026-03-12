const test = require('node:test');
const assert = require('node:assert/strict');

const {
    getFallbackTenants,
    getFallbackRateCards,
    getFallbackVertical,
    isRecoverableDatabaseError,
} = require('../lib/fallback-data');

test('fallback tenant catalog exposes MediaGeekz', () => {
    const tenants = getFallbackTenants();
    const mediageekz = tenants.find((tenant) => tenant.slug === 'mediageekz');

    assert.ok(mediageekz);
    assert.equal(mediageekz.name, 'MediaGeekz');
    assert.equal(mediageekz.verticalCount, 12);
});

test('fallback rate cards return built-in vertical pricing', () => {
    const fallback = getFallbackRateCards('mediageekz', 'conventions');

    assert.ok(fallback);
    assert.equal(fallback.tenant.slug, 'mediageekz');
    assert.equal(fallback.rateCards.conventions.coverage.fullDay, 1600);
    assert.equal(fallback.rateCards.conventions.services[0].slug, 'keynote-multicam');
});

test('fallback vertical lookup returns null for unknown tenants', () => {
    assert.equal(getFallbackVertical('unknown-tenant', 'conventions'), null);
});

test('recoverable database errors are detected', () => {
    assert.equal(
        isRecoverableDatabaseError({
            name: 'PrismaClientInitializationError',
            message: 'Authentication failed against database server.',
        }),
        true
    );

    assert.equal(
        isRecoverableDatabaseError(new Error('Unexpected syntax issue')),
        false
    );
});
