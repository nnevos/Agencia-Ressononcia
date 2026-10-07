import { heroById, heroes } from "@/game/data/heroes";
import type { Hero, OperationalHero, SaveGame } from "@/game/types";

type OperationalSource = Pick<SaveGame, "heroStates" | "heroProgression">;

function materializeOperationalHero(save: OperationalSource, hero: Hero): OperationalHero | null {
  const state = save.heroStates[hero.id];
  const progression = save.heroProgression[hero.id];
  if (!state || !progression) return null;

  const unlockedTags = hero.techniques
    .filter((technique) => progression.unlockedTechniqueIds.includes(technique.id))
    .flatMap((technique) => technique.grantedTags ?? []);

  return {
    ...hero,
    ...state,
    ...progression,
    attributes: progression.attributes,
    tags: Array.from(new Set([...hero.tags, ...unlockedTags])),
  };
}

/**
 * Materializa a visão operacional dos heróis a partir do conteúdo estático +
 * estado/progressão do save. Mantido fora da UI para que Central, DEV tools e
 * futuras superfícies usem exatamente a mesma regra.
 */
export function buildOperationalHeroes(save: OperationalSource): OperationalHero[] {
  return heroes.flatMap((hero) => {
    const operational = materializeOperationalHero(save, hero);
    return operational ? [operational] : [];
  });
}

export function findOperationalHero(save: OperationalSource, heroId: string): OperationalHero | null {
  const hero = heroById[heroId];
  return hero ? materializeOperationalHero(save, hero) : null;
}
