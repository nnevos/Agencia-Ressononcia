import type { PlayerPronouns, PlayerState } from "@/game/types";

export const PLAYER_PRONOUN_OPTIONS: ReadonlyArray<{ value: PlayerPronouns; label: string }> = [
  { value: "ele-dele", label: "Ele / dele" },
  { value: "ela-dela", label: "Ela / dela" },
  { value: "elu-delu", label: "Elu / delu" },
];

type PronounForms = { subject: string; possessive: string; formIndex: 0 | 1 | 2 };

const PRONOUN_FORMS: Record<PlayerPronouns, PronounForms> = {
  "ele-dele": { subject: "ele", possessive: "dele", formIndex: 0 },
  "ela-dela": { subject: "ela", possessive: "dela", formIndex: 1 },
  "elu-delu": { subject: "elu", possessive: "delu", formIndex: 2 },
};

export function isPlayerPronouns(value: unknown): value is PlayerPronouns {
  return value === "ele-dele" || value === "ela-dela" || value === "elu-delu";
}

function upperFirst(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

/**
 * Interpolação autoral do protagonista. Regra editorial: preferir texto neutro;
 * tokens de pronome/flexão ficam reservados a trechos em que a voz original pede isso.
 *
 * Tokens suportados:
 * - {{playerName}}
 * - {{playerSubject}} / {{playerSubjectCap}}
 * - {{playerPossessive}} / {{playerPossessiveCap}}
 * - {{playerForm:masculino|feminino|neutro}}
 */
export function formatPlayerText(text: string, player: Pick<PlayerState, "name" | "pronouns">) {
  const forms = PRONOUN_FORMS[player.pronouns] ?? PRONOUN_FORMS["ele-dele"];
  return text
    .replaceAll("{{playerName}}", player.name)
    .replaceAll("{{playerSubjectCap}}", upperFirst(forms.subject))
    .replaceAll("{{playerSubject}}", forms.subject)
    .replaceAll("{{playerPossessiveCap}}", upperFirst(forms.possessive))
    .replaceAll("{{playerPossessive}}", forms.possessive)
    .replace(/\{\{playerForm:([^|{}]*)\|([^|{}]*)\|([^{}]*)\}\}/g, (_match, masc: string, fem: string, neutral: string) => [masc, fem, neutral][forms.formIndex] ?? masc);
}
