import type { Hero } from "@/game/types";

export const heroes: Hero[] = [
  {
    id: "yuki", name: "Yuki", powerName: "Frio", className: "Combatente", trail: "Vanguarda",
    style: ["Adaptável", "Corpo a corpo", "Controle de campo"], tags: ["controle", "resgate", "mobilidade", "frio"],
    profile: "Manipula o Frio de forma extremamente versátil. Alterna entre armas, proteção e controle do terreno, improvisando conforme a missão e transformando o campo ao seu favor.",
    strengths: ["Cria armas, escudos e ferramentas de gelo", "Congela superfícies e remodela o terreno", "Combina Frio com combate corpo a corpo", "Aproveita água disponível para ampliar opções"],
    limitations: ["Emoções extremas podem tornar o poder instável", "Controle amplo pode causar dano ambiental"],
    attributes: { strength: 2, agility: 2, charisma: 1, intelligence: 2, vigor: 2 },
    techniques: [
      { id:"yuki-l2-arsenal", name:"Arsenal Criogênico", level:2, category:"tecnica", description:"Armas e proteções de gelo se tornam uma resposta mais confiável em interceptação, defesa e combate técnico.", grantedTags:["interceptacao"] },
      { id:"yuki-l2-arquitetura", name:"Arquitetura de Gelo", level:2, category:"tecnica", description:"Yuki aprimora criação de passagens, barreiras e estruturas temporárias para contenção e resgate.", grantedTags:["contenção"] },
      { id:"yuki-l4-pista", name:"Pista Instantânea", level:4, category:"especializacao", description:"Rotas de gelo melhoram deslocamento próprio e apoio de mobilidade para a equipe.", grantedTags:["velocidade"] },
      { id:"yuki-l4-fragilizar", name:"Fratura Térmica", level:4, category:"especializacao", description:"Congelamento localizado fragiliza estruturas e alvos resistentes, abrindo novas soluções técnicas.", grantedTags:["ruptura"] },
      { id:"yuki-l6-frente", name:"Domínio da Frente Fria", level:6, category:"evolucao", description:"Evolução do Frio permite alterar uma área ampla por curto período, ampliando controle ambiental com maior risco emocional.", grantedTags:["potencia"] }
    ]
  },
  {
    id: "elysia", name: "Elysia", powerName: "Energia", className: "Arcanista", trail: "Duelista",
    style: ["Ágil", "Metamórfico", "Corpo a corpo"], tags: ["energia", "velocidade", "precisao", "mobilidade"],
    profile: "Molda Energia ao redor do corpo para assumir garras, patas, asas e outras formas. Seu combate depende de movimento constante, adaptação e mudanças rápidas de abordagem.",
    strengths: ["Molda energia em características de animais", "Alta velocidade e mobilidade angular", "Projeta criaturas energéticas para ampliar ofensivas", "Grande conhecimento teórico sobre fenômenos elementais"],
    limitations: ["Sobrecarga prolongada cobra alto custo físico", "Potência contínua pode levar à exaustão"],
    attributes: { strength: 1, agility: 3, charisma: 1, intelligence: 3, vigor: 1 },
    techniques: [
      { id:"elysia-l2-aerea", name:"Forma Aérea", level:2, category:"tecnica", description:"Manifestações energéticas semelhantes a asas ampliam acesso vertical e reposicionamento.", grantedTags:["mobilidade"] },
      { id:"elysia-l2-predadora", name:"Forma Predadora", level:2, category:"tecnica", description:"Garras e patas energéticas melhoram perseguição, interceptação e confronto rápido.", grantedTags:["interceptacao"] },
      { id:"elysia-l4-condutora", name:"Condutora", level:4, category:"especializacao", description:"Absorção e redirecionamento de energia se tornam mais seguros em incidentes elétricos.", grantedTags:["controle"] },
      { id:"elysia-l4-projecao", name:"Fauna Projetada", level:4, category:"especializacao", description:"Projeções animais podem atuar longe do corpo, ampliando alcance e reconhecimento.", grantedTags:["reconhecimento"] },
      { id:"elysia-l6-energia-pura", name:"Manifestação de Energia Pura", level:6, category:"evolucao", description:"Por instantes, Elysia alcança uma manifestação energética avançada com mobilidade extrema e custo físico muito alto.", grantedTags:["potencia"] }
    ]
  },
  {
    id: "lysandro", name: "Lysandro", powerName: "Força + Espada", className: "Combatente", trail: "Duelista",
    style: ["Espadachim", "Ágil", "Força bruta"], tags: ["interceptacao", "resistencia", "combate", "ruptura"],
    profile: "Um combatente não elemental que levou corpo, reflexos e domínio da espada a um nível capaz de rivalizar com magia. Luta quebrando o ritmo e as regras impostas pelo adversário.",
    strengths: ["Espadachim excepcional sem afinidade elemental", "Força e velocidade além dos limites comuns", "Cortes de impacto capazes de atingir além da lâmina", "Excelente em duelos e improvisação"],
    limitations: ["Depende mais de aproximação que usuários elementais", "Ferimentos físicos acumulam de forma direta"],
    attributes: { strength: 3, agility: 2, charisma: 1, intelligence: 1, vigor: 2 },
    techniques: [
      { id:"lys-l2-interceptar", name:"Intercepção Perfeita", level:2, category:"tecnica", description:"Melhora proteção de aliados e capacidade de parar ameaças que avançam sobre civis.", grantedTags:["controle"] },
      { id:"lys-l2-corte-ar", name:"Corte de Pressão", level:2, category:"tecnica", description:"Golpes de grande impacto usam o deslocamento do ar para estender o alcance da espada.", grantedTags:["potencia"] },
      { id:"lys-l4-duelo", name:"Leitura de Duelo", level:4, category:"especializacao", description:"Experiência em confronto direto melhora resposta contra ameaças singulares e imprevisíveis.", grantedTags:["precisao"] },
      { id:"lys-l4-ruptura", name:"Quebra-Limites", level:4, category:"especializacao", description:"Técnica física voltada a romper obstáculos e estruturas resistentes sem depender de elemento.", grantedTags:["ruptura"] },
      { id:"lys-l6-sem-limites", name:"Sem Limites", level:6, category:"evolucao", description:"Condicionamento e técnica chegam a um patamar capaz de enfrentar fenômenos elementais com execução física excepcional.", grantedTags:["resistencia"] }
    ]
  },
  {
    id: "helio", name: "Hélio", powerName: "Fogo", className: "Especialista", trail: "Atirador",
    style: ["Longo alcance", "Preciso", "Versátil"], tags: ["potencia", "combate", "ruptura", "fogo", "precisao"],
    profile: "Utiliza o Fogo de maneira direta e controlada, favorecendo pressão à distância. Seu fogo azul eleva drasticamente o poder destrutivo, enquanto técnicas de impulso e combate físico mantêm sua versatilidade.",
    strengths: ["Rajadas concentradas de alcance variável", "Fogo azul de potência excepcional", "Combina chamas com combate corpo a corpo", "Usa fogo para impulso, cauterização e interação ambiental"],
    limitations: ["Alto potencial de dano colateral", "Fogo azul exige cautela em áreas civis"],
    attributes: { strength: 1, agility: 2, charisma: 1, intelligence: 3, vigor: 2 },
    techniques: [
      { id:"helio-l2-rajada", name:"Rajada Focal", level:2, category:"tecnica", description:"Controle de intensidade melhora ataques precisos a distância e reduz dano fora do alvo.", grantedTags:["precisao"] },
      { id:"helio-l2-impulso", name:"Impulso Ígneo", level:2, category:"tecnica", description:"Explosões direcionadas de fogo ampliam mobilidade e acesso a posições difíceis.", grantedTags:["mobilidade"] },
      { id:"helio-l4-cauterizar", name:"Cauterização de Campo", level:4, category:"especializacao", description:"Aplicação controlada de calor pode estabilizar emergências médicas até chegada de suporte.", grantedTags:["resgate"] },
      { id:"helio-l4-zona", name:"Zona Térmica", level:4, category:"especializacao", description:"Cria perímetros de calor para negar passagem e controlar ameaças sem contato direto.", grantedTags:["controle"] },
      { id:"helio-l6-azul", name:"Fogo Azul Dominado", level:6, category:"evolucao", description:"Hélio domina melhor a manifestação azul, aumentando potência sem ampliar o risco na mesma proporção.", grantedTags:["potencia"] }
    ]
  },
  {
    id: "demetria", name: "Demétria", powerName: "Terra", className: "Combatente", trail: "Vanguarda",
    style: ["Corpo a corpo", "Resistente", "Força bruta"], tags: ["resgate", "contenção", "resistencia", "terra", "ruptura"],
    profile: "Usa a Terra como extensão da própria força. Especialista em confrontos diretos, proteção e manipulação do terreno, combinando resistência física com golpes de enorme impacto.",
    strengths: ["Manoplas de pedra para impacto e proteção", "Ergue barreiras e estabiliza estruturas", "Manipula terreno para impulsionar investidas", "Excelente resistência em confronto direto"],
    limitations: ["Depende de material mineral/terra disponível", "Ambientes sem substrato útil reduzem opções"],
    attributes: { strength: 3, agility: 1, charisma: 1, intelligence: 1, vigor: 3 },
    techniques: [
      { id:"demetria-l2-muralha", name:"Muralha de Contenção", level:2, category:"tecnica", description:"Barreiras de terra se tornam mais rápidas e adequadas para proteção de civis e estabilização.", grantedTags:["controle"] },
      { id:"demetria-l2-impacto", name:"Investida Sísmica", level:2, category:"tecnica", description:"Manipula o terreno para impulsionar o próprio corpo em ataques e remoção de obstáculos.", grantedTags:["mobilidade"] },
      { id:"demetria-l4-fundacao", name:"Leitura de Fundação", level:4, category:"especializacao", description:"Experiência estrutural melhora decisões em desabamentos, túneis e construções comprometidas.", grantedTags:["reconhecimento"] },
      { id:"demetria-l4-compressao", name:"Compressão Mineral", level:4, category:"especializacao", description:"Aprende a trabalhar materiais mais densos e resistentes quando disponíveis.", grantedTags:["resistencia"] },
      { id:"demetria-l6-crosta", name:"Domínio Mineral", level:6, category:"evolucao", description:"A manipulação evolui para materiais minerais mais resistentes, sem eliminar a dependência de substrato existente.", grantedTags:["potencia"] }
    ]
  },
  {
    id: "alexandra", name: "Alexandra", powerName: "Água", className: "Arcanista", trail: "Suporte",
    style: ["Controle fino", "Resgate", "Múltiplos vetores"], tags: ["controle", "resgate", "precisao", "agua", "suporte"],
    profile: "Manipula Água com grande precisão, alternando entre armas, contenção e suporte. Sua capacidade de operar vários vetores simultaneamente a torna especialmente valiosa em resgate e controle ambiental.",
    strengths: ["Molda água em flechas, lanças e contenções", "Controle preciso de múltiplos vetores", "Excelente suporte ambiental e combate a incêndio", "Aplicações avançadas incluem duplicatas de água"],
    limitations: ["Operações de alta precisão exigem foco", "Responsabilidade institucional pode ampliar estresse"],
    attributes: { strength: 1, agility: 1, charisma: 2, intelligence: 3, vigor: 2 },
    techniques: [
      { id:"alex-l2-fluxo", name:"Fluxo Protetor", level:2, category:"tecnica", description:"Água em movimento passa a amortecer impacto, proteger civis e criar rotas seguras.", grantedTags:["resgate"] },
      { id:"alex-l2-vetores", name:"Vetores Paralelos", level:2, category:"tecnica", description:"Controla mais de um fluxo com precisão, equilibrando contenção e resgate simultaneamente.", grantedTags:["controle"] },
      { id:"alex-l4-pressao", name:"Pressão Cirúrgica", level:4, category:"especializacao", description:"Jatos e armas de água ganham precisão para operações delicadas e neutralização não letal.", grantedTags:["precisao"] },
      { id:"alex-l4-hidraulica", name:"Leitura Hidráulica", level:4, category:"especializacao", description:"Melhora resposta em enchentes, redes de água, incêndios e ambientes inundados.", grantedTags:["reconhecimento"] },
      { id:"alex-l6-duplicatas", name:"Duplicatas de Água", level:6, category:"evolucao", description:"Alexandra alcança uma manifestação avançada capaz de operar múltiplas formas de água ao mesmo tempo.", grantedTags:["potencia"] }
    ]
  },
  {
    id: "eros", name: "Eros", powerName: "Ar", className: "Especialista", trail: "Mobilidade",
    style: ["Ágil", "Reconhecimento", "Controle de fluxo"], tags: ["mobilidade", "resgate", "reconhecimento", "ar", "evacuacao"],
    profile: "Manipula o Ar para voo, rajadas, controle de fluxo e reconhecimento. É especialmente eficiente em evacuação, resposta rápida e leitura do ambiente por vibrações.",
    strengths: ["Voo e deslocamento de alta mobilidade", "Rajadas e redemoinhos para controle de fluxo", "Evacuação e suporte de trajetória", "Percepção avançada de vibrações ambientais"],
    limitations: ["Ambientes confinados reduzem a vantagem de mobilidade", "Grandes fluxos podem deslocar destroços ou alimentar incêndios"],
    attributes: { strength: 1, agility: 3, charisma: 3, intelligence: 1, vigor: 1 },
    techniques: [
      { id:"eros-l2-corredor", name:"Corredor de Vento", level:2, category:"tecnica", description:"Cria uma corrente estável para acelerar evacuação, deslocamento e transporte leve.", grantedTags:["velocidade"] },
      { id:"eros-l2-varredura", name:"Varredura Aérea", level:2, category:"tecnica", description:"Voo e controle de fluxo melhoram reconhecimento rápido sobre grandes áreas.", grantedTags:["reconhecimento"] },
      { id:"eros-l4-ventilar", name:"Ventilação Tática", level:4, category:"especializacao", description:"Redireciona fumaça e gases, abrindo corredores respiratórios temporários.", grantedTags:["controle"] },
      { id:"eros-l4-trajetoria", name:"Correção de Trajetória", level:4, category:"especializacao", description:"Rajadas precisas desviam objetos, amortecem quedas e apoiam aliados em movimento.", grantedTags:["resgate"] },
      { id:"eros-l6-vibracao", name:"Percepção de Vibrações", level:6, category:"evolucao", description:"Eros passa a interpretar vibrações do ambiente em escala avançada, ampliando reconhecimento e resposta a ameaças ocultas.", grantedTags:["precisao"] }
    ]
  }
];
