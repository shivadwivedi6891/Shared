import { NextResponse } from "next/server";
import { dummyCars } from "@/app/lib/data/car";

export async function GET() {
    
    return NextResponse.json(dummyCars);
}