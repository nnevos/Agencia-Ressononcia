# ROADMAP — baseline v0.1.0

## Fundação jogável — IMPLEMENTADO

- [x] Central de despacho
- [x] 7 heróis
- [x] ocorrências simultâneas
- [x] despacho 1–3
- [x] missões assíncronas
- [x] Vida/Energia
- [x] chance probabilística
- [x] resultados explicáveis
- [x] XP/nível/técnicas
- [x] Ressonância
- [x] NEXO operacional
- [x] pós-expediente opcional com múltiplos contatos
- [x] conteúdo separado do motor
- [x] introdução/tutorial inicial data-driven

## Conteúdo/campanha — PRÓXIMO

- [ ] arquivos de ocorrência por dia/capítulo
- [ ] modificadores ocultos e informação incorreta
- [ ] cidade/reputação e consequências persistentes
- [ ] mensagens NEXO condicionais por flags/relações
- [ ] cenas presenciais especiais data-driven
- [ ] introdução definitiva da Agência/chefia
- [ ] 2–3 dias completos de vertical slice

## Infraestrutura — FUTURO

- [ ] múltiplos slots de save
- [ ] configurações completas (áudio, acessibilidade, velocidade, texto)
- [ ] Supabase Auth/save cloud
- [ ] histórico de conversas/resultados
- [ ] ferramentas/editor de conteúdo

## Polimento — FUTURO

- [ ] arte final
- [ ] música/SFX
- [ ] acessibilidade
- [ ] QA e balanceamento
- [ ] publicação

## v0.1.3 — alvo CONTENT-READY

O roadmap detalhado para chegar ao ponto em que a campanha fecha apenas substituindo arquivos de dialogo/texto/mensagens/opcoes esta em:

`docs/design/CONTENT_COMPLETE_ROADMAP.md`

A prioridade estrutural seguinte e o pipeline de ocorrencias D1-D6 data-driven.

## v0.2.8 — fase de conteúdo autorado

- [x] banco de 48 ocorrências data-driven
- [x] campanha social por rota individual, sem depender do dia global
- [x] cena presencial genérica consumindo dados de `content/`
- [x] NEXO privado com imagens autoradas e lightbox
- [x] mensagens fixas antes/depois das escolhas, sem hardcode narrativo em React
- [x] primeira rota final: Yuki, etapas 1–6 + dois encontros
- [ ] playtest completo da rota Yuki (incluindo caminhos 50/30 para evitar hardlock)
- [ ] substituir placeholders dos outros seis personagens por autoria final
- [ ] conteúdo final de grupo/canal operacional
- [ ] backgrounds finais dos encontros


## v0.2.9 — UX social sem hardlock
- Entrega sequencial de bolhas no NEXO.
- Percentual romântico preservado como feedback, sem bloquear dates.
- Próximo foco continua autoria das demais rotas + QA de conteúdo real.
