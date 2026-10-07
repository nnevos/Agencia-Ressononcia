import { outingScenes } from "@/content/narrative/outings";
import type { ReactNode } from "react";

export const dynamicParams = false;

export function generateStaticParams() {
  return outingScenes.map((scene) => ({ sceneId: scene.id }));
}

export default function OutingLayout({ children }: { children: ReactNode }) {
  return children;
}
