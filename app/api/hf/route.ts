import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

export async function GET() {
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
    return NextResponse.json({ hfInstance: hf });
}