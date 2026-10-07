/** Compatibilidade: o banco oficial agora vive em content/incidents/caseBank.ts. */
export { caseBank as incidents, caseById } from "@/content/incidents/caseBank";
export { getIncidentsForDay, getDayPressure } from "@/content/incidents/dailyPool";
