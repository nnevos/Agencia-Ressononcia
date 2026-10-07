export type AgencyManualEntry = {
  id: string;
  title: string;
  body: string;
  unlockFlag?: string;
};

export type AgencyManualSection = {
  id: string;
  title: string;
  entries: AgencyManualEntry[];
};

export const agencyManualSections: AgencyManualSection[] = [
  {
    id: "operations",
    title: "OPERAÇÕES",
    entries: [
      { id: "incidents", title: "Ocorrências", body: "Leia risco, tempo, requisitos e afinidades antes de montar a equipe. A chance estimada é probabilística, não uma garantia." },
      { id: "condition", title: "Vida e Energia", body: "Condição pesa no desempenho. Vida ou Energia em zero deixa o agente desmaiado até o dia seguinte.", unlockFlag: "tutorial:dispatch:condition:seen" },
      { id: "resonance", title: "Ressonância", body: "Equipes maiores não recebem bônus automático. A sintonia entre os membros pode ajudar ou atrapalhar a operação.", unlockFlag: "tutorial:dispatch:resonance:seen" },
      { id: "combos", title: "Combos", body: "Algumas duplas possuem sinergias especiais. O efeito aparece no briefing quando a combinação é descoberta.", unlockFlag: "tutorial:dispatch:combo:seen" },
    ],
  },
  {
    id: "agents",
    title: "AGENTES",
    entries: [
      { id: "xp", title: "XP e níveis", body: "XP é consolidado depois do expediente. Evoluções obrigatórias precisam ser resolvidas antes do pós-expediente.", unlockFlag: "tutorial:development:seen" },
      { id: "techniques", title: "Técnicas", body: "Níveis 2, 4 e 6 liberam técnica, especialização ou evolução. A escolha pode adicionar novas capacidades ao Dispatch.", unlockFlag: "tutorial:development:technique:seen" },
      { id: "attributes", title: "Atributos", body: "Níveis 3 e 5 concedem +1 atributo. Use a prévia do radar antes de confirmar; o limite atual é 5.", unlockFlag: "tutorial:development:attribute:seen" },
      { id: "mastery", title: "Maestria", body: "Depois do nível 6, XP continua alimentando Maestria até o rank 5 e melhora a consistência solo.", unlockFlag: "tutorial:development:mastery:seen" },
    ],
  },
  {
    id: "nexo",
    title: "NEXO",
    entries: [
      { id: "conversations", title: "Conversas", body: "No pós-expediente você pode conversar com vários contatos. Cada rota individual avança no máximo uma etapa por noite.", unlockFlag: "tutorial:nexo:post-shift:seen" },
      { id: "dates", title: "Dates", body: "Convites presenciais aparecem como uma ação separada no NEXO. O convite persiste, mas só uma saída presencial pode ser escolhida por noite.", unlockFlag: "tutorial:nexo:date:seen" },
    ],
  },
];
