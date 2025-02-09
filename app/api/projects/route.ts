import { NextResponse } from "next/server";
import { getSessionOrRedirect } from "@/app/lib/auth";
import { ProjectValidator } from "@/app/lib/validator/projectValidator";
import { prismaClient } from "@/app/lib/db";
// import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {

    try {
        const session = await getSessionOrRedirect();
        const project_list = await prismaClient.project.findMany({
            where: {
                ownerId: session.user.id,
            },
        });
        return NextResponse.json({ message: "Projects retrieved successfully", project_list });   
    } catch (error) {
        return NextResponse.json({ error: error });

    }
}

export async function POST(req: Request) {
    try {
        const session = await getSessionOrRedirect();

        const body = await req.json();
        ProjectValidator.parse(body);

        const { name, description } = body;

        const project = await prismaClient.project.create({
            data: {
                name,
                description,
                ownerId : session.user.id,
            },
        });
        return NextResponse.json({ message: "Project created successfully", project });
    } catch (error) {
        return NextResponse.json(
            { status: "error", errors: error },
            { status: 400 }
        );

    }
}


export async function DELETE(req: Request) {
    try {
        const session = await getSessionOrRedirect();
        const body = await req.json();
        const { id } = body;
        const project = await prismaClient.project.findUnique({
            where: {
                id,
                ownerId: session.user.id,
            },
        });
        if (!project) {
            return NextResponse.json({ message: "Project not found", status: 404 });
        }
        await prismaClient.project.delete({
            where: {
                id,
            },
        });
        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { status: "error", errors: error },
            { status: 400 }
        );
    }
}


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "PUT") {
//       return res.status(405).json({ message: "Method Not Allowed" });
//     }
  
//     try {
//         console.log("haha")
//       const { id } = req.query;
//       debugger
//       if (!id || typeof id !== "string") {
//         return res.status(400).json({ message: "Invalid project ID" });
//       }
  
//       // Validate input
//       const validatedData = ProjectValidator.parse(req.body);
  
//       // Update project in database
//       const updatedProject = await prismaClient.project.update({
//         where: { id },
//         data: validatedData,
//       });
  
//       res.status(200).json(updatedProject);
//     } catch (error) {
//       console.error("Error updating project:", error);
//       res.status(500).json({ message: "Internal Server Error", error });
//     }
//   }



// export async function PUT(req:Request) {
//     try {
//         console.log("hahah");
//         console.log(req)
//     } catch (error) {
//         console.log(error)
        
//     }
    
// }