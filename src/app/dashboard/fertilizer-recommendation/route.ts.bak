// import { NextResponse } from 'next/server';

// const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// export async function GET(request: Request) {
//     try {
//         // You may want to get user_id or farmer_id from session or query params
//         // For now, assume user_id is passed as a query param
//         const { searchParams } = new URL(request.url);
//         const user_id = searchParams.get('user_id');
//         if (!user_id) {
//             return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
//         }
//         const response = await fetch(`${BACKEND_URL}/dashboard/fertilizer-recommendation?user_id=${user_id}`);
//         console.log(response);
//         if (!response.ok) {
//             const errorData = await response.json();
//             return NextResponse.json(
//                 { error: errorData.detail || 'Failed to fetch fertilizer recommendation' },
//                 { status: response.status }
//             );
//         }
//         const data = await response.json();

//         return NextResponse.json(data);
//     } catch (error: any) {
//         console.error('Error in fertilizer recommendation API route:', error);
//         return NextResponse.json(
//             { error: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }
