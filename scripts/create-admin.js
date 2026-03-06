/**
 * Helper script to create or update an Admin user with a hashed password
 * Run: node scripts/create-admin.js <email> <password>
 */

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.error('Usage: node scripts/create-admin.js <email> <password>');
        process.exit(1);
    }

    const hash = await bcrypt.hash(password, 10);

    // Grab first tenant just for convenience, assuming 1 tenant MVP
    const tenant = await prisma.tenant.findFirst();
    if (!tenant) {
        console.error('No tenant found in DB to associate user with.');
        process.exit(1);
    }

    const user = await prisma.tenantUser.upsert({
        where: { email },
        update: { passwordHash: hash },
        create: {
            email,
            passwordHash: hash,
            name: 'Admin User',
            role: 'admin',
            tenantId: tenant.id
        }
    });

    console.log(`Successfully updated/created admin user: ${user.email}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
