/** Balanceamento social. O calendario da cidade e a rota de cada personagem sao independentes. */
export const SOCIAL_BALANCE = {
  // Pesos autorais preservados para diferenciar tom/afinidade das escolhas.
  // Eles NAO concedem pontos e NAO controlam o percentual exibido.
  romanceChoiceWeights: [100, 50, 30] as const,
  maxRomanceProgress: 100,
  outingStages: [3, 6] as const,
  completionOutingMilestones: [3, 6] as const,
} as const;
