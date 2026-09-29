import { heroes } from "@/content/characters/heroes";
import { caseBank as incidents } from "@/content/incidents/caseBank";
import { postShiftScenes } from "@/content/dialogues/post-shift";
import { outingScenes } from "@/content/narrative/outings";

function duplicateIds(values: string[]) {
  const seen = new Set<string>();
  return [...new Set(values.filter((id) => seen.has(id) || !seen.add(id)))];
}

/** Validação leve para erros editoriais comuns. Roda apenas em desenvolvimento. */
export function validateEditableContent() {
  const errors: string[] = [];
  const heroIds = new Set(heroes.map((hero) => hero.id));
  const dupHeroes = duplicateIds(heroes.map((hero) => hero.id));
  const dupIncidents = duplicateIds(incidents.map((incident) => incident.id));
  const dupScenes = duplicateIds(postShiftScenes.map((scene) => scene.id));
  const dupOutings = duplicateIds(outingScenes.map((scene) => scene.id));
  if (dupHeroes.length) errors.push(`Heróis com ID duplicado: ${dupHeroes.join(", ")}`);
  if (dupIncidents.length) errors.push(`Ocorrências com ID duplicado: ${dupIncidents.join(", ")}`);
  if (dupScenes.length) errors.push(`Cenas com ID duplicado: ${dupScenes.join(", ")}`);
  if (dupOutings.length) errors.push(`Saidas com ID duplicado: ${dupOutings.join(", ")}`);
  for (const outing of outingScenes) if (!heroIds.has(outing.characterId)) errors.push(`Saida ${outing.id} usa characterId inexistente: ${outing.characterId}`);
  for (const scene of postShiftScenes) {
    if (!heroIds.has(scene.characterId)) errors.push(`Cena ${scene.id} usa characterId inexistente: ${scene.characterId}`);
    const turns = [{ id: `${scene.id}:opening`, choices: scene.choices }, ...(scene.followUps ?? [])];
    const turnIds = turns.map((turn) => turn.id);
    const dupTurns = duplicateIds(turnIds);
    if (dupTurns.length) errors.push(`Cena ${scene.id} tem turnos duplicados: ${dupTurns.join(", ")}`);
    for (const turn of turns) {
      if (turn.choices.length !== 3) errors.push(`Cena ${scene.id}, turno ${turn.id}, deve ter exatamente 3 respostas.`);
      for (const choice of turn.choices) {
        if (choice.romanceAffinity != null && ![100, 50, 30].includes(choice.romanceAffinity)) errors.push(`Escolha ${choice.flag} usa romanceAffinity inválido.`);
      }
    }
  }
  for (const incident of incidents) {
    if (incident.deadlineMinutes <= 0 || incident.missionDurationMinutes <= 0) errors.push(`Ocorrência ${incident.id} tem tempo inválido.`);
    if ((incident.minDay ?? 1) < 1) errors.push(`Ocorrência ${incident.id} tem minDay inválido.`);
    if ((incident.weight ?? 1) <= 0) errors.push(`Ocorrência ${incident.id} tem weight inválido.`);
    for (const heroId of incident.powerAffinityHeroIds ?? []) if (!heroIds.has(heroId)) errors.push(`Ocorrência ${incident.id} usa afinidade de poder com herói inexistente: ${heroId}`);
  }
  if (errors.length) throw new Error(`Conteúdo de Ressonância inválido:\n- ${errors.join("\n- ")}`);
}
