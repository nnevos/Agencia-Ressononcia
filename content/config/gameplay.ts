/**
 * CONFIGURAÇÃO GERAL DE GAMEPLAY
 * Edite este arquivo para alterar duração do expediente, tamanho de equipe e limites globais.
 */
export const GAMEPLAY_CONFIG = {
  shiftStartHour: 8,
  shiftEndHour: 18,
  shiftRealDurationMinutes: 15,
  minTeamSize: 1,
  maxTeamSize: 3,
  maxVisibleOperationalMessages: 18,
} as const;
