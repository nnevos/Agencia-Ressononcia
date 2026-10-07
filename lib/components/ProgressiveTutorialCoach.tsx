"use client";

import { EdisonCoach } from "@/components/EdisonCoach";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  onDismiss?: () => void;
  className?: string;
  targetLabel?: string;
  progressLabel?: string;
  tone?: "orientation" | "attention" | "discovery" | "success";
  actionLabel?: string;
  showSpotlight?: boolean;
};

export function ProgressiveTutorialCoach({ eyebrow, title, body, onDismiss, className = "", targetLabel, progressLabel, tone, actionLabel = "CONTINUAR", showSpotlight = true }: Props) {
  return <EdisonCoach eyebrow={eyebrow} title={title} body={body} className={className} targetLabel={targetLabel} progressLabel={progressLabel} tone={tone} actionLabel={onDismiss ? actionLabel : undefined} onAction={onDismiss} showSpotlight={showSpotlight} />;
}
