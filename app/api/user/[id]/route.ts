import prisma from '@/utils/prisma/client'; // Adjust based on your project structure
import { NextRequest, NextResponse } from 'next/server';

// Define the GET handler for the dynamic API route
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {

    const { id } = params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing user ID' }, { status: 400 });
    }

   

    // Return user data
    return NextResponse.json("'");
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
