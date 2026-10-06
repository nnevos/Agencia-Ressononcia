"use client";

type EdisonCoachProps = {
  eyebrow?: string;
  title: string;
  body: string;
  targetLabel?: string;
  progressLabel?: string;
  tone?: "orientation" | "attention" | "discovery" | "success";
  mode?: "floating" | "inline";
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  showSpotlight?: boolean;
};

export function EdisonCoach({
  eyebrow = "EDISON · ORIENTAÇÃO",
  title,
  body,
  targetLabel,
  progressLabel,
  tone = "orientation",
  mode = "floating",
  actionLabel,
  onAction,
  className = "",
  showSpotlight = false,
}: EdisonCoachProps) {
  return <>
    {showSpotlight && mode === "floating" ? <div className="edisonSpotlightBackdrop" aria-hidden="true" /> : null}
    <aside className={`edisonCoach edisonCoach-${mode} tone-${tone} ${className}`.trim()} role="dialog" aria-live="polite" aria-label={title}>
      <div className="edisonCoachPortrait"><img src="/edison.jpg" alt="" /></div>
      <div className="edisonCoachCopy">
        <div className="edisonCoachMeta"><small>{eyebrow}</small>{progressLabel ? <span>{progressLabel}</span> : null}</div>
        <strong>{title}</strong>
        <p>{body}</p>
        {targetLabel ? <div className="edisonCoachTargetCue"><b>→</b><span>{targetLabel}</span></div> : null}
        {actionLabel && onAction ? <button type="button" onClick={onAction}>{actionLabel}</button> : null}
      </div>
    </aside>
  </>;
}
