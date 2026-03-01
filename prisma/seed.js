/**
 * Database Seed Script
 * =====================
 * Seeds the first tenant (MediaGeekz) with all 4 verticals.
 *
 * Run: npm run db:seed
 */

const { PrismaClient } = require('@prisma/client');
const { ALL_VERTICALS } = require('../lib/verticals');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ─── Create MediaGeekz tenant ────────────────────────────────
    const tenant = await prisma.tenant.upsert({
        where: { slug: 'mediageekz' },
        update: {},
        create: {
            slug: 'mediageekz',
            name: 'MediaGeekz',
            plan: 'agency',
            colorPrimary: '#F97316',
            colorBg: '#05060A',
            fontFamily: 'Montserrat',
            email: 'info@mediageekz.com',
            city: 'Orlando',
            state: 'FL',
        },
    });
    console.log(`  ✓ Tenant: ${tenant.name} (${tenant.id})`);

    // ─── Seed each vertical ──────────────────────────────────────
    for (const [key, template] of Object.entries(ALL_VERTICALS)) {
        const vertical = await prisma.vertical.upsert({
            where: { tenantId_slug: { tenantId: tenant.id, slug: template.slug } },
            update: {},
            create: {
                tenantId: tenant.id,
                slug: template.slug,
                name: template.name,
                icon: template.icon,
                enabled: true,

                halfDayRate: template.coverage.halfDay,
                fullDayRate: template.coverage.fullDay,
                overtimeRate: template.coverage.overtime,

                turnaroundExpedited: template.turnaround.expedited,
                turnaroundRush: template.turnaround.rush,
                turnaroundNextDay: template.turnaround.nextDay,
                turnaroundSameDay: template.turnaround.sameDay,

                parkingFee: template.logistics.parking,
                coiFee: template.logistics.coi,
                travelFee: template.logistics.travel,
            },
        });

        // Seed services
        for (const svc of template.services) {
            await prisma.serviceItem.upsert({
                where: { verticalId_slug: { verticalId: vertical.id, slug: svc.slug } },
                update: {},
                create: {
                    verticalId: vertical.id,
                    slug: svc.slug,
                    name: svc.name,
                    category: svc.category,
                    standardPrice: svc.standard,
                    seniorPrice: svc.senior,
                    mode: svc.mode,
                    sortOrder: svc.sort,
                    enabled: true,
                },
            });
        }

        // Seed add-ons
        for (const addon of template.addOns) {
            await prisma.addOnItem.upsert({
                where: { verticalId_slug: { verticalId: vertical.id, slug: addon.slug } },
                update: {},
                create: {
                    verticalId: vertical.id,
                    slug: addon.slug,
                    name: addon.name,
                    pricePerUnit: addon.price,
                    unitType: addon.unit,
                    sortOrder: addon.sort,
                    enabled: true,
                },
            });
        }

        const svcCount = template.services.length;
        const aoCount = template.addOns.length;
        console.log(`  ✓ Vertical: ${template.name} (${svcCount} services, ${aoCount} add-ons)`);
    }

    // ─── Create admin user ───────────────────────────────────────
    await prisma.tenantUser.upsert({
        where: { email: 'daniel@mediageekz.com' },
        update: {},
        create: {
            tenantId: tenant.id,
            email: 'daniel@mediageekz.com',
            name: 'Daniel Castillo',
            role: 'admin',
        },
    });
    console.log('  ✓ Admin user: daniel@mediageekz.com');

    console.log('\\n✅ Seed complete!');
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
