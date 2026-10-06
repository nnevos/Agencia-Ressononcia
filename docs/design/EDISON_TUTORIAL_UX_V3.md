# Edison Tutorial UX v3

## Objetivo

Transformar o tutorial progressivo em orientação integrada à interface, com Edison como presença consistente e sem alterar regras de gameplay. O jogador aprende fazendo: flags de aprendizado devem representar uma ação demonstrada sempre que houver uma ação concreta disponível.

## Componente único

`components/EdisonCoach.tsx` é a apresentação canônica de Edison para orientação de interface.

Modos:
- `floating`: orientação contextual sobre a tela;
- `inline`: orientação inserida dentro de um briefing/modal.

Estados visuais:
- `orientation`: instrução normal;
- `attention`: risco, condição ou alerta;
- `discovery`: combo, convite ou descoberta;
- `success`: confirmação/conclusão.

O retrato oficial é sempre `/edison.jpg`.

## Spotlight e alvo

Quando uma etapa exige uma ação concreta:
- o restante da interface recebe escurecimento leve;
- o elemento relevante usa `.tutorialTarget`;
- o coach mostra uma pista curta com seta (`targetLabel`).

O spotlight não intercepta cliques. O jogador continua operando a interface real.

## Avanço por ação

### Desenvolvimento
- `tutorial:development:seen`: ao selecionar um agente com `UP`;
- `tutorial:development:technique:seen`: ao escolher a primeira técnica/especialização/evolução;
- `tutorial:development:attribute:seen`: ao confirmar o primeiro +1 de atributo;
- `tutorial:development:mastery:seen`: confirmação informativa quando Maestria existir, pois não há ação de escolha para Maestria.

### Dispatch
- Ressonância/Combo/Condição aparecem apenas depois que a composição real já tornou o conceito relevante.
- O coach explica o que acabou de ser demonstrado e aponta para briefing/cobertura antes do despacho.

### NEXO
- `tutorial:nexo:post-shift:seen`: registrado ao abrir uma conversa no primeiro pós-expediente;
- `tutorial:nexo:date:seen`: registrado ao usar explicitamente `IR PARA ENCONTRO`, junto do gate `?launch=1` já existente.

## Manual da Agência

`components/AgencyManual.tsx` e `content/narrative/agencyManual.ts` formam o registro consultável das orientações.

O Manual aparece na Central, Desenvolvimento e NEXO. Entradas contextuais permanecem bloqueadas até a flag correspondente ser descoberta. A seção básica de Ocorrências fica disponível desde o início.

Seções:
- Operações;
- Agentes;
- NEXO.

O Manual é referência, não uma nova mecânica e não altera save schema.

## Responsividade

Desktop:
- coach flutuante no canto superior direito;
- manual no canto inferior direito;
- modal do manual com navegação lateral.

Mobile:
- coach vira cartão inferior acima das ações principais;
- manual permanece acessível por botão compacto;
- navegação do manual vira faixa horizontal;
- entradas passam para uma coluna.

## Regra de autoria

Tutoriais devem ser curtos. Edison explica uma decisão por vez. Não repetir o GDD em uma caixa. Quando a interface pode ensinar por ação, prefira instrução como “Selecione”, “Confira”, “Aplique” ou “Abra” em vez de “Entendi”.
