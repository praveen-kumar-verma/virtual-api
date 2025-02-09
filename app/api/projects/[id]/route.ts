import { getSessionOrRedirect } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const project = await prisma.project.findUnique({
//       where: { id: params.id },
//     });

//     if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

//     return NextResponse.json(project, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
//   }
// }

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await getSessionOrRedirect();


    const data = await req.json()
    const {id } = await params

    const updatedProject = await prismaClient.project.update({
      where: {id},
      data: data,
    });

    return NextResponse.json({message: "Project updated successfully", updatedProject}, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await params
    await prismaClient.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({message: "project deleted successfully", id:params.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
