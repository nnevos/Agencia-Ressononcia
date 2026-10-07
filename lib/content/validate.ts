import { heroes } from "@/content/characters/heroes";
import { caseBank as incidents } from "@/content/incidents/caseBank";
import { postShiftScenes } from "@/content/dialogues/post-shift";
import { outingScenes } from "@/content/narrative/outings";
import { SOCIAL_OUTING_STAGES, SOCIAL_ROUTE_MANIFEST, SOCIAL_ROUTE_STAGES } from "@/content/social/routeManifest";
import type { DialogueMessage } from "@/game/types";

function duplicateIds(values: string[]) {
  const seen = new Set<string>();
  return [...new Set(values.filter((id) => seen.has(id) || !seen.add(id)))];
}

function validateMessageMedia(messages: DialogueMessage[] | undefined, label: string, errors: string[]) {
  for (const [index, message] of (messages ?? []).entries()) {
    if (message.image && !message.imageAlt?.trim()) errors.push(`${label}, mensagem ${index + 1}, tem imagem sem imageAlt.`);
    if (!message.text?.trim() && !message.image) errors.push(`${label}, mensagem ${index + 1}, está vazia.`);
  }
}

/** Validação editorial/social para erros que costumam quebrar progresso, Dates ou mídia. Roda apenas em desenvolvimento. */
export function validateEditableContent() {
  const errors: string[] = [];
  const heroIds = new Set(heroes.map((hero) => hero.id));
  const outingById = new Map(outingScenes.map((scene) => [scene.id, scene]));
  const routeByCharacter = new Map(SOCIAL_ROUTE_MANIFEST.map((route) => [route.characterId, route]));
  const dupHeroes = duplicateIds(heroes.map((hero) => hero.id));
  const dupIncidents = duplicateIds(incidents.map((incident) => incident.id));
  const dupScenes = duplicateIds(postShiftScenes.map((scene) => scene.id));
  const dupOutings = duplicateIds(outingScenes.map((scene) => scene.id));
  const completionFlags = [...postShiftScenes.map((scene) => scene.completionFlag).filter(Boolean), ...outingScenes.map((scene) => scene.completionFlag)] as string[];
  const duplicateCompletionFlags = duplicateIds(completionFlags);
  const allChoiceFlags = postShiftScenes.flatMap((scene) => [{ sceneId: scene.id, choices: scene.choices }, ...(scene.followUps ?? []).map((turn) => ({ sceneId: scene.id, choices: turn.choices }))]).flatMap((entry) => entry.choices.map((choice) => choice.flag));
  const duplicateChoiceFlags = duplicateIds(allChoiceFlags);

  if (dupHeroes.length) errors.push(`Heróis com ID duplicado: ${dupHeroes.join(", ")}`);
  if (dupIncidents.length) errors.push(`Ocorrências com ID duplicado: ${dupIncidents.join(", ")}`);
  if (dupScenes.length) errors.push(`Cenas com ID duplicado: ${dupScenes.join(", ")}`);
  if (dupOutings.length) errors.push(`Saídas com ID duplicado: ${dupOutings.join(", ")}`);
  if (duplicateCompletionFlags.length) errors.push(`completionFlags duplicadas: ${duplicateCompletionFlags.join(", ")}`);
  if (duplicateChoiceFlags.length) errors.push(`Flags de escolha duplicadas: ${duplicateChoiceFlags.join(", ")}`);

  for (const outing of outingScenes) {
    if (!heroIds.has(outing.characterId)) errors.push(`Saída ${outing.id} usa characterId inexistente: ${outing.characterId}`);
    if (!outing.completionFlag?.trim()) errors.push(`Saída ${outing.id} não possui completionFlag.`);
    if (!outing.paragraphs.length) errors.push(`Saída ${outing.id} não possui parágrafos.`);
    if (outing.beats?.some((beat) => !beat.paragraphs.length)) errors.push(`Saída ${outing.id} possui beat sem parágrafos.`);
  }

  for (const route of SOCIAL_ROUTE_MANIFEST) {
    for (const stage of SOCIAL_ROUTE_STAGES) {
      const matches = postShiftScenes.filter((scene) => scene.characterId === route.characterId && (scene.day ?? scene.availability?.minDay ?? 1) === stage);
      if (matches.length !== 1) errors.push(`Rota ${route.characterId} deve ter exatamente uma cena principal D${stage}; encontrou ${matches.length}.`);
      if (route.authored && matches.some((scene) => scene.placeholder)) errors.push(`Rota autorada ${route.characterId} ainda usa placeholder em D${stage}.`);
    }
    for (const stage of SOCIAL_OUTING_STAGES) {
      const matches = outingScenes.filter((scene) => scene.characterId === route.characterId && scene.day === stage);
      if (matches.length !== 1) errors.push(`Rota ${route.characterId} deve ter exatamente um Date no marco ${stage}; encontrou ${matches.length}.`);
      if (route.authored && matches.some((scene) => scene.paragraphs.some((paragraph) => paragraph.includes("[PLACEHOLDER")))) errors.push(`Rota autorada ${route.characterId} ainda usa Date placeholder no marco ${stage}.`);
    }
  }

  for (const scene of postShiftScenes) {
    if (!heroIds.has(scene.characterId)) errors.push(`Cena ${scene.id} usa characterId inexistente: ${scene.characterId}`);
    if (!scene.completionFlag?.trim()) errors.push(`Cena ${scene.id} não possui completionFlag.`);
    if (scene.openingImage && !scene.openingImageAlt?.trim()) errors.push(`Cena ${scene.id} possui openingImage sem openingImageAlt.`);
    validateMessageMedia(scene.openingAfterIncoming, `Cena ${scene.id} openingAfterIncoming`, errors);

    const turns = [{ id: `${scene.id}:opening`, choices: scene.choices, incomingImage: scene.openingImage, incomingImageAlt: scene.openingImageAlt, afterIncoming: scene.openingAfterIncoming }, ...(scene.followUps ?? [])];
    const turnIds = turns.map((turn) => turn.id);
    const dupTurns = duplicateIds(turnIds);
    if (dupTurns.length) errors.push(`Cena ${scene.id} tem turnos duplicados: ${dupTurns.join(", ")}`);

    for (const turn of turns) {
      if (turn.choices.length !== 3) errors.push(`Cena ${scene.id}, turno ${turn.id}, deve ter exatamente 3 respostas.`);
      if (turn.incomingImage && !turn.incomingImageAlt?.trim()) errors.push(`Cena ${scene.id}, turno ${turn.id}, tem incomingImage sem alt.`);
      validateMessageMedia(turn.afterIncoming, `Cena ${scene.id}, turno ${turn.id} afterIncoming`, errors);

      const duplicateChoiceIds = duplicateIds(turn.choices.map((choice) => choice.id));
      if (duplicateChoiceIds.length) errors.push(`Cena ${scene.id}, turno ${turn.id}, tem IDs de escolha duplicados: ${duplicateChoiceIds.join(", ")}`);
      for (const choice of turn.choices) {
        if (!choice.flag?.trim()) errors.push(`Cena ${scene.id}, turno ${turn.id}, possui escolha sem flag.`);
        if (choice.romanceAffinity != null && ![100, 50, 30].includes(choice.romanceAffinity)) errors.push(`Escolha ${choice.flag} usa romanceAffinity inválido.`);
        validateMessageMedia(choice.afterResponse, `Escolha ${choice.flag} afterResponse`, errors);
        if (choice.exclusiveOutingDay && !choice.vnSceneId) errors.push(`Escolha ${choice.flag} oferece Date sem vnSceneId.`);
        if (choice.vnSceneId) {
          const outing = outingById.get(choice.vnSceneId);
          if (!outing) errors.push(`Escolha ${choice.flag} referencia Date inexistente: ${choice.vnSceneId}.`);
          else {
            if (outing.characterId !== scene.characterId) errors.push(`Escolha ${choice.flag} aponta para Date de outro personagem (${outing.characterId}).`);
            if (choice.exclusiveOutingDay && outing.day !== choice.exclusiveOutingDay) errors.push(`Escolha ${choice.flag} usa marco ${choice.exclusiveOutingDay}, mas ${outing.id} é marco ${outing.day}.`);
          }
        }
      }
    }

    const route = routeByCharacter.get(scene.characterId as (typeof SOCIAL_ROUTE_MANIFEST)[number]["characterId"]);
    const stage = scene.day ?? scene.availability?.minDay ?? 1;
    if (route?.authored && SOCIAL_OUTING_STAGES.includes(stage as 3 | 6)) {
      const finalChoices = turns[turns.length - 1]?.choices ?? [];
      for (const choice of finalChoices) {
        if (choice.exclusiveOutingDay !== stage || !choice.vnSceneId) errors.push(`Rota autorada ${scene.characterId} D${stage}: toda resposta final deve preservar o convite para o Date.`);
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
