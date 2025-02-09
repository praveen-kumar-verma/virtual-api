import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path if needed

export async function GET(req: Request) {
    const session = await getServerSession(authOptions); // Pass authOptions
    console.log("Session:", session);

    if (session) {
        return NextResponse.json({ status: "loggedin", session });
    } else {
        return NextResponse.json({ status: "Unauthenticated" });
    }
}
