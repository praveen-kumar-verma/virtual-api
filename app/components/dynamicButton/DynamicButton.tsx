"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../button/Button";

export default function DynamicButton() {
    const { data: session } = useSession();
    const router = useRouter();


  return (

    <div>
         {session ? (
                <Button onClick={() => router.push("/project")}>Get started</Button>
            ) : (
                <Button onClick={() => signIn()}>Sign in</Button>
            )}

    </div>


  );
}