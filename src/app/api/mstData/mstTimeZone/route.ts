import { getMstTimeZone } from "../../../../../lib/func/mst"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const mstTimeZone = await getMstTimeZone();
    return NextResponse.json(mstTimeZone);
}
