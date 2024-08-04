import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../db';
import EpisodeSchema from './schema';

connectDB();

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: 'Hello, World!', cc: request.cookies });
}



export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Parse the JSON body
        const { title, description }: { title: string; description: string } = body; // Destructure from body

        console.log("bodybody=>>>>", { title, description });

        // const schema = new EpisodeSchema({ title, description });
        // await schema.save();

        return NextResponse.json({ message: 'Episode saved successfully!' });
    } catch (error) {
        console.error('Error saving episode:', error);
        return NextResponse.json({ message: 'Error saving episode', error: error}, { status: 500 });
    }
}

