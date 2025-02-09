import App from "next/app";
import Image from "next/image";
import Appbar from "./components/Appbar/Appbar";
import { useSession } from "next-auth/react";
import LandingPage from "./components/LandingPage/LandingPage";

export default function Home() {
  return (
    <LandingPage />    
  );
}
