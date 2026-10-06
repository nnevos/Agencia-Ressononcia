"use client";

import { useEffect } from "react";
import { pushLocalSaveToCloud } from "@/lib/cloudSync";
import { LOCAL_SAVE_WRITTEN_EVENT } from "@/lib/persistence/localSaveStore";

export default function CloudSyncBridge() {
  useEffect(() => {
    let timer: number | null = null;
    const onSave = () => {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => { void pushLocalSaveToCloud().catch(() => undefined); }, 900);
    };
    window.addEventListener(LOCAL_SAVE_WRITTEN_EVENT, onSave);
    return () => {
      window.removeEventListener(LOCAL_SAVE_WRITTEN_EVENT, onSave);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);
  return null;
}
