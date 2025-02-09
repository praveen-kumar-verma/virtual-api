import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust import based on your project structure

export async function getSessionOrRedirect() {
  const session = await getServerSession(authOptions);

  if (session) {
    return session;
  }

  throw new Error("Unauthenticated");
}
