"use client";

import { publicPath } from "@/lib/publicPath";
import { DEFAULT_SETTINGS, loadSettings, type RessonanciaSettings } from "@/lib/settings";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type MusicTrack = { src: string; title: string } | null;

function trackForPath(pathname: string): MusicTrack {
  if (pathname.startsWith("/agencia")) return { src: "/audio/aphex-twin-tha.mp3", title: "Aphex Twin - Tha" };
  if (pathname.startsWith("/conversa")) return { src: "/audio/aphex-twin-delphium.mp3", title: "Aphex Twin - Delphium" };
  return null;
}

export default function BackgroundMusic() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [settings, setSettings] = useState<RessonanciaSettings>(DEFAULT_SETTINGS);
  const track = useMemo(() => trackForPath(pathname), [pathname]);
  const lastTrackRef = useRef<string | null>(null);

  useEffect(() => {
    setSettings(loadSettings());
    const onSettings = (event: Event) => {
      const detail = (event as CustomEvent<RessonanciaSettings>).detail;
      setSettings(detail ?? loadSettings());
    };
    window.addEventListener("ressonancia:settings", onSettings);
    return () => window.removeEventListener("ressonancia:settings", onSettings);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = settings.musicVolume;
  }, [settings.musicVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!track) {
      audio.pause();
      lastTrackRef.current = null;
      return;
    }

    const resolvedSrc = publicPath(track.src);
    if (lastTrackRef.current !== resolvedSrc) {
      audio.src = resolvedSrc;
      audio.load();
      lastTrackRef.current = resolvedSrc;
    }
    audio.loop = true;
    audio.volume = settings.musicVolume;

    const tryPlay = () => {
      if (!track) return;
      void audio.play().catch(() => undefined);
    };

    // Tenta imediatamente; se o navegador bloquear autoplay, a primeira interação
    // do usuário na própria tela libera a reprodução sem exibir erro.
    tryPlay();
    window.addEventListener("pointerdown", tryPlay);
    window.addEventListener("keydown", tryPlay);
    return () => {
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };
  }, [track, settings.musicVolume]);

  return <audio ref={audioRef} aria-hidden="true" preload="metadata" data-background-music={track?.title ?? ""} />;
}
