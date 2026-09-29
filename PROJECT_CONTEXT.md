# RESSONÂNCIA — CONTEXTO MESTRE

> NOVO BASELINE: **v0.1.0 (Foundation)**. Esta versão consolida e refatora a linha funcional v0.9.14.
> NÃO confundir com o antigo snapshot `ressonancia-fase1-0.1.1`, que é obsoleto e nunca deve ser usado como base.

## Como retomar em outro chat

Leia, nesta ordem:
1. `PROJECT_CONTEXT.md`
2. `content/README.md`
3. `docs/authoring/WHERE_TO_EDIT.md`
4. `docs/canon/*`
5. `docs/design/*`
6. `docs/failsafe/CURRENT_STATE.md`
7. `docs/failsafe/NEXT_SESSION.md`

## Identidade

RESSONÂNCIA é uma AU de **Elemento do Frio**. O jogador é o **Analista de Despacho** da Agência Ressonância. Não controla combate diretamente: interpreta ocorrências, monta equipes de 1–3 agentes e lida com consequências humanas, operacionais e narrativas.

Heróis: Yuki, Elysia, Lysandro, Hélio, Demétria, Alexandra e Eros. Todos podem desenvolver amizade, relação profissional, tensão ou romance opcional com o Analista.

## Regra de autoridade narrativa

- `[CÂNONE-BASE]`: sustentado pelo livro/material fornecido.
- `[AU-APROVADO]`: decisão específica do jogo.
- `[A DEFINIR]`: não inventar silenciosamente.

Antes de escrever personagem, ler `docs/canon/AU_BIBLE.md` e `docs/canon/CHARACTER_BIBLE.md`.

## Arquitetura v0.1.0

A refatoração separa autoria de motor:

- `content/` — **fonte oficial editável**: personagens, ocorrências, mensagens, conversas, respostas do jogador, tutorial, introdução, textos de menu e balanceamento.
- `game/` — regras/simulação.
- `components/` — componentes reutilizáveis.
- `app/` — telas/rotas.
- `lib/` — save/infraestrutura.
- `docs/authoring/` — manual para o autor alterar conteúdo com segurança.

Arquivos antigos em `game/data/*` podem permanecer como re-exports de compatibilidade. Não duplicar conteúdo novo neles.

## Loop atual

**Expediente 08:00–18:00 → resultados → Desenvolvimento da Equipe → pós-expediente/NEXO → próximo dia.**

- 10 horas diegéticas = 15 minutos reais no protótipo.
- ocorrências se sobrepõem;
- equipe de 1–3 heróis;
- despacho assíncrono;
- NEXO operacional somente leitura durante o trabalho;
- missão concluída fica verde como `RESULTADO DISPONÍVEL` até ser arquivada;
- XP é processado no fim do expediente;
- pós-expediente permite conversar com qualquer personagem com cena disponível ou com ninguém.

## Atributos e condição

Atributos 1–5: **Força, Agilidade, Carisma, Inteligência, Vigor**.

Todos começam em 1/1/1/1/1 + quatro pontos distribuídos por identidade.

Condição:
- Vida máxima = `9 + Vigor`
- Energia máxima = `9 + Agilidade`
- Sucesso: 0 Vida / -1 Energia
- Sucesso com custo: -1 Vida / -2 Energia
- Sucesso parcial: -2 Vida / -3 Energia
- Falha: -5 Vida / -5 Energia
- 0 em Vida OU Energia = `DESMAIADO` até o dia seguinte.

## Progressão

- Nv1: base + quatro pontos iniciais
- Nv2: técnica
- Nv3: +1 atributo
- Nv4: técnica/especialização
- Nv5: +1 atributo
- Nv6: evolução de poder

XP é ganho desde o Dia 1 e upgrades são resolvidos no fim do próprio expediente, antes do pós-expediente.

## UI atual

Central desktop em três canais:
- esquerda: Ocorrências;
- centro: Mapa + roster;
- direita: NEXO // Operações.

Briefing mostra pontos recomendados e **chance estimada probabilística**. A chance não garante resultado.

Prioridade P1/P2/P3 existe internamente, mas não é exibida como sigla ao jogador.

## Save

- localStorage
- schema atual: v6
- saves antigos são migrados; não apagar save para resolver mudança de schema.

## Regra de desenvolvimento

1. Conteúdo editável vai para `content/`.
2. Não hardcodar falas ou ocorrências em React se puderem ser dados.
3. IDs de conteúdo são estáveis.
4. Mudança mecânica durável atualiza GDD + failsafe.
5. Mudança canônica/AU durável atualiza Bíblia da AU.
6. Atualizar `NEXT_SESSION.md` antes de cada handoff.
