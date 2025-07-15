import { getMstDishStatus } from "../../../../../lib/func/mst"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const mstTimeZone = await getMstDishStatus();
    return NextResponse.json(mstTimeZone);
}
