import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';

async function verifyAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return null;
    return await verifySession(token);
}

export async function GET(request) {
    const session = await verifyAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { searchParams } = new URL(request.url);
        const verticalId = searchParams.get('verticalId');

        let whereClause = {};
        if (verticalId) {
            whereClause = { id: verticalId };
        }

        const verticals = await prisma.vertical.findMany({
            where: whereClause,
            include: {
                services: { orderBy: { sortOrder: 'asc' } },
                addOns: { orderBy: { sortOrder: 'asc' } }
            }
        });

        return NextResponse.json({ verticals });
    } catch (err) {
        console.error('Failed to get admin services', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request) {
    const session = await verifyAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // In MVP, we just accept an array of updates
    try {
        const { type, id, data } = await request.json();

        // Ensure we only update valid fields to prevent injection
        const safeData = {};
        if (data.standardPrice !== undefined) safeData.standardPrice = parseInt(data.standardPrice);
        if (data.seniorPrice !== undefined) safeData.seniorPrice = parseInt(data.seniorPrice);
        if (data.pricePerUnit !== undefined) safeData.pricePerUnit = parseInt(data.pricePerUnit);
        if (data.enabled !== undefined) safeData.enabled = Boolean(data.enabled);

        if (type === 'service') {
            await prisma.serviceItem.update({
                where: { id },
                data: safeData,
            });
        } else if (type === 'addon') {
            await prisma.addOnItem.update({
                where: { id },
                data: safeData,
            });
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Failed to update item', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
