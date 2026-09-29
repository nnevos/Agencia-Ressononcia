# FIRST DISPATCH ONBOARDING — v0.2.3

## Fluxo
Menu → Novo jogo/nome → Edison/Agência → grupo NEXO → SDH → E-04 com Hélio → relatório → Dia 1 livre.

## Regras
- Edison é [AU-APROVADO] como supervisora do onboarding.
- O jogador pode pular o tutorial a qualquer momento da apresentação.
- O grupo NEXO é coletivo e separado das DMs privadas de relacionamento.
- As quatro mensagens iniciais têm efeitos relacionais discretos; a UI não mostra “boa/neutra/ruim”.
- E-04 é garantido como primeiro chamado do Dia 1. Durante tutorial ativo, somente Hélio pode ser despachado nesse caso.
- O resultado desse primeiro despacho é Sucesso controlado para ensinar o fluxo; custos normais de Sucesso ainda são aplicados.
- Depois de arquivar o relatório, o tutorial deixa de restringir a Central e o banco normal assume.
- Pular tutorial remove toda restrição guiada; o jogador entra no Dispatch normal.

## Objetivo de UX
Ensinar ficcionalmente: ocorrência → requisitos/afinidade → escolha → indisponibilidade → resultado → Energia. Evitar parede de texto e preservar autonomia após um único caso guiado.

## Ajuste v0.2.4 — tutorial isolado
- Enquanto `tutorial_active` estiver ativo, o turno contém somente E-04. Nenhum outro chamado pode surgir antes de o relatório do primeiro despacho ser arquivado.
- A missão guiada de Hélio dura 12 minutos diegéticos, para o jogador ver rapidamente o ciclo selecionar → despachar → aguardar → resultado.
- Ao arquivar o relatório, os demais casos do Dia 1 são injetados como `scheduled` a partir de alguns minutos depois e distribuídos pelo restante do expediente.
- A orientação de Edison aparece dentro do briefing quando E-04 está aberto; não pode ficar escondida atrás do modal.
- O painel de conclusão precisa ser responsivo e nunca cortar checklist ou CTA.
