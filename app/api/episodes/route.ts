import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../db';
import EpisodeModel from './schema';



export async function GET(request: NextRequest) {
     connectDB();
    const result = await EpisodeModel.find();
    return NextResponse.json({ data:result });
}



export async function POST(request: NextRequest) {
    try {
        connectDB();
         const json = await request.json()
         const {title, description} = json
       
        console.log("bodybody=>>>>", json);

        const schema = new EpisodeModel(json);
        await schema.save();

        return NextResponse.json({ message: 'Episode saved successfully!' });
    } catch (error) {
        console.error('Error saving episode:', error);
        return NextResponse.json({ message: 'Error saving episode', error: error}, { status: 500 });
    }
}

