import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Map frontend fields to backend schema
        const farmerData = {
            user_id: body.user_id,
            province: body.province,
            district: body.district,
            crop: body.crop,
            phone: body.phone,
            stage: body.cropStage,
            area: body.farmSize || "Not specified"
        };

        const response = await fetch(`${BACKEND_URL}/farmer-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(farmerData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.detail || 'Failed to save farmer info' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error in farmer API route:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
