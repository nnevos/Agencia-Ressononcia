"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function NewGamePage(){ const router=useRouter(); useEffect(()=>{ router.replace("/?panel=new"); },[router]); return <main className="centerPage"><p>Abrindo novo jogo...</p></main>; }
