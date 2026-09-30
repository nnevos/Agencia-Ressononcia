/** Balanceamento social. O calendario da cidade e a rota de cada personagem sao independentes. */
export const SOCIAL_BALANCE = {
  romancePointsByAffinity: { 100: 7, 50: 5, 30: 3 } as Record<100 | 50 | 30, number>,
  romanceStageCap: 18,
  // Referencias de ritmo/editoriais. Nao bloqueiam encontros: chegar ao marco da rota e suficiente.
  outingThresholdByStage: { 3: 30, 6: 70 } as Partial<Record<number, number>>,
  romanceChoiceWeights: [100, 50, 30] as const,
  maxRomanceProgress: 100,
  completionOutingMilestones: [3, 6] as const,
} as const;
