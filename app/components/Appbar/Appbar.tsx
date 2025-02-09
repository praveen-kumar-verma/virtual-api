"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "../button/Button";

export default function Appbar() {
  const { data: session } = useSession(); 


  return (
    <nav className="md:container md:mx-auto">
      <div className="flex flex-wrap justify-between items-center mx-auto py-6">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img src="../logo-white.png" className="h-8" alt="Virtual Api" /> */}
          <img src="../newLogo.svg" className="h-[5rem]" alt="Virtual Api" />

        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse text-xl text-[#ff8433]">
        {session ? (
            <>
              <span>Hello, {session.user.name}</span>
              <Button onClick={() => signOut()}>Sign out</Button>

            </>
          ) : (
            <Button onClick={() => signIn()}>Sign in</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
