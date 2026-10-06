"use client";

import { useEffect } from "react";
import { pushLocalSaveToCloud } from "@/lib/cloudSync";
import { LOCAL_SAVE_WRITTEN_EVENT } from "@/lib/persistence/localSaveStore";

const CLOUD_SYNC_DEBOUNCE_MS = 900;

export default function CloudSyncBridge() {
  useEffect(() => {
    let timer: number | null = null;
    let inFlight = false;
    let pending = false;
    let disposed = false;

    const schedule = (delay = CLOUD_SYNC_DEBOUNCE_MS) => {
      if (disposed) return;
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => { timer = null; void flush(); }, delay);
    };

    const flush = async () => {
      if (disposed) return;
      if (inFlight) {
        pending = true;
        return;
      }
      inFlight = true;
      try {
        await pushLocalSaveToCloud();
      } catch {
        // A persistencia local continua sendo a fonte de seguranca. Uma nova
        // escrita/reconcile posterior tentara sincronizar novamente.
      } finally {
        inFlight = false;
        if (pending && !disposed) {
          pending = false;
          schedule(0);
        }
      }
    };

    const onSave = () => schedule();
    window.addEventListener(LOCAL_SAVE_WRITTEN_EVENT, onSave);
    return () => {
      disposed = true;
      window.removeEventListener(LOCAL_SAVE_WRITTEN_EVENT, onSave);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);
  return null;
}
