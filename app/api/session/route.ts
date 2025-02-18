import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path if needed

export async function GET() {
    const session = await getServerSession(authOptions); // Pass authOptions

    if (session) {
        return NextResponse.json({ status: "loggedin", session });
    } else {
        return NextResponse.json({ status: "Unauthenticated" });
    }
}
