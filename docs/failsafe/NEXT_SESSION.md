# NEXT SESSION — v0.2.8

## QA imediato — rota Yuki
1. Novo save ou save em rota 1 de Yuki: confirmar que cada noite mostra somente uma etapa.
2. Dia/etapa 1: validar mensagem inicial enviada pelo Analista + duas escolhas sequenciais.
3. Etapa 2: foto do energético aparece dentro da bolha; clicar abre lightbox e fechar retorna ao mesmo ponto do histórico.
4. Etapa 3: foto pós-missão aparece, as três respostas funcionam e, com romance suficiente, a escolha abre `outing-day3-yuki`.
5. Confirmar que o date da cafeteria usa o texto autoral e volta ao NEXO avançando Yuki para rota 4.
6. Etapas 4–5: validar sequências fixas entre as escolhas sem mensagens duplicadas ou ordem invertida.
7. Etapa 6: foto em casa aparece; com romance suficiente, convite abre `outing-day6-yuki`.
8. Confirmar que o segundo date termina exatamente em “Posso entrar mesmo?” e não inventa continuação.
9. Depois do segundo date, confirmar que placeholders de recuperação 7–10 não aparecem como nova conversa/preview.
10. Testar imagens e lightbox em desktop e mobile; confirmar que somente o histórico rola.

## QA de balanceamento social
- Testar caminho majoritariamente 50 para confirmar que os thresholds 30/70 são alcançáveis no ritmo atual.
- Testar caminho 30 para observar a recuperação tardia sem hardlock; se necessário, ajustar somente depois do playtest.

## Depois
- Continuar substituindo placeholders por autoria final, personagem por personagem.
