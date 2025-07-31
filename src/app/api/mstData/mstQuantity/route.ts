import { getMstQuantity } from "../../../../services/mst"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const mstTimeZone = await getMstQuantity();
    return NextResponse.json(mstTimeZone);
}
