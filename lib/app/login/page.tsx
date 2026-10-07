"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function LoginPage(){ const router=useRouter(); useEffect(()=>{ router.replace("/?panel=account"); },[router]); return <main className="centerPage"><p>Abrindo acesso...</p></main>; }
