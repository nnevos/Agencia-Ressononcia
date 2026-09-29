import { heroes } from "@/content/characters/heroes";
import { incidents } from "@/content/incidents/day01";
import { postShiftScenes } from "@/content/dialogues/post-shift";

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
  if (dupHeroes.length) errors.push(`Heróis com ID duplicado: ${dupHeroes.join(", ")}`);
  if (dupIncidents.length) errors.push(`Ocorrências com ID duplicado: ${dupIncidents.join(", ")}`);
  if (dupScenes.length) errors.push(`Cenas com ID duplicado: ${dupScenes.join(", ")}`);
  for (const scene of postShiftScenes) if (!heroIds.has(scene.characterId)) errors.push(`Cena ${scene.id} usa characterId inexistente: ${scene.characterId}`);
  for (const incident of incidents) if (incident.deadlineMinutes <= 0 || incident.missionDurationMinutes <= 0) errors.push(`Ocorrência ${incident.id} tem tempo inválido.`);
  if (errors.length) throw new Error(`Conteúdo de Ressonância inválido:\n- ${errors.join("\n- ")}`);
}
