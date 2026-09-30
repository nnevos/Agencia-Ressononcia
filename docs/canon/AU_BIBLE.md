# RESSONÂNCIA — Bíblia da AU de Elemento do Frio

## Regra de autoridade narrativa
RESSONÂNCIA é uma AU de **Elemento do Frio**. Os sete heróis não são personagens novos inspirados na obra: são versões AU de Yuki, Elysia, Lysandro, Hélio, Demétria, Alexandra e Eros.

Ao escrever conteúdo, separar sempre:
- **[CÂNONE-BASE]**: sustentado pelo material de Elemento do Frio já registrado no GDD.
- **[AU-APROVADO]**: decisão estabelecida especificamente para RESSONÂNCIA.
- **[A DEFINIR]**: o material atual não sustenta detalhe suficiente; não inventar silenciosamente.

Nunca reescrever personalidade, parentesco, poder ou limitação canônica só para facilitar romance/gameplay. Mudanças deliberadas de AU precisam ser registradas em `AU_CHANGES.md` e no failsafe.

## Premissa da AU
[AU-APROVADO] O jogador é um **Analista de Despacho** da Agência Ressonância, não um dos sete heróis.

[AU-APROVADO] **Edison** é a supervisor que recebe o Analista no primeiro dia, apresenta os Guerreiros Elementais, adiciona o jogador ao NEXO e acompanha o primeiro despacho. O jogador escolhe seu nome no início. O Analista administra crises, monta equipes, recebe relatórios e convive com os heróis entre operações.

[AU-APROVADO] O mundo é pós-transformação: magia e poderes estão mais disseminados e a ordem política está em reconstrução. A Agência começa pequena. O mistério central da AU permanece **[A DEFINIR]** e não deve virar automaticamente uma continuação literal do enredo do livro.

## Regra estrutural
Dispatch e visual novel/dating sim são um único sistema causal:
**decisão operacional → consequência → conversa → relação/flag → futura operação**.
Conversas também podem alterar confiança, informação, comunicação e comportamento futuro em missão.

## Relações com o Analista
[AU-APROVADO] Todos os sete podem desenvolver romance com o Analista: Yuki, Elysia, Lysandro, Hélio, Demétria, Alexandra e Eros. Romance é opcional; relações podem permanecer profissionais, amistosas, tensas ou íntimas sem romance.

Não usar uma barra única de amor. Modelo-base: `trust`, `professionalRespect`, `intimacy`, `tension`, `attraction`, `romanceStarted`, `relationshipStatus`, `flags`.

## Relações preexistentes importam
Os heróis já chegam com história própria. O Analista entra em uma rede que não existe apenas para orbitá-lo. Exemplos registrados: proximidade Yuki–Elysia; parentesco Yuki–Alexandra e Yuki–Eros; cooperação de Lysandro com o grupo; tensão histórica envolvendo Hélio. Essas relações devem afetar diálogos, Ressonância e dispatch.

## Arcos-base para a AU
- Yuki: liderança pública versus medo de perder o controle.
- Elysia: domínio técnico do poder versus custo pessoal da sobrecarga.
- Lysandro: liberdade individual versus responsabilidade contínua com uma equipe.
- Hélio: reconstrução de confiança e identidade após o legado de Agni.
- Demétria: ação direta versus investigação e responsabilidade institucional.
- Alexandra: dever político versus presença operacional na equipe.
- Eros: liberdade/mobilidade versus compromisso com um sistema permanente de resposta.

## Regra para futuros escritores/IA
Antes de criar cena, rota ou missão centrada em um herói: ler `CHARACTER_BIBLE.md`, verificar tags [CÂNONE-BASE]/[AU-APROVADO]/[A DEFINIR], consultar flags já existentes e registrar qualquer nova decisão durável. Não preencher lacunas do livro como se fossem cânone.

## Sistema mecânico de personagem v0.8.0
[AU-APROVADO] A adaptação usa cinco atributos pessoais universais — Força, Agilidade, Carisma, Inteligência e Vigor — em escala 1–5. Poderes e especialidades não são convertidos diretamente nesses atributos. Cada personagem começa com base 1 em tudo + quatro pontos extras distribuídos conforme sua identidade.

[AU-APROVADO] XP de campo é ganho desde o Dia 1. Ao fim de cada expediente, antes do pós-expediente, existe a tela Desenvolvimento da Equipe. Níveis 2/4/6 liberam técnicas/especialização/evolução e níveis 3/5 concedem +1 atributo escolhido pelo jogador. As melhorias ficam ativas para o dia seguinte.

## Formato social aprovado — baseline v0.1.0
[AU-APROVADO] O **NEXO** é a principal interface cotidiana de comunicação. Durante o expediente, o Analista acompanha o grupo operacional em modo somente leitura; fora do expediente, pode abrir DMs privadas e escolher respostas. O NEXO funciona como um mensageiro corporativo: grupos e canais de operação podem ser supervisionados pela Agência, enquanto DMs privadas entre o Analista e cada contato não são supervisionadas.

[AU-APROVADO] O pós-expediente não força uma única conversa. O Analista pode conversar com qualquer personagem que tenha uma cena disponível, conversar com vários na mesma noite ou não conversar com ninguém.

[AU-APROVADO] Cenas presenciais em formato VN/light novel continuam existindo como momentos especiais: introduções importantes, encontros, conflitos, convites, marcos de rota e cenas de campanha.

## Regra editorial v0.1.0
Falas, opções do jogador e condições de cena são conteúdo autoral e devem ficar em `content/`. O motor não deve inventar texto narrativo dinamicamente. Cada opção precisa ter texto explícito escrito pelo autor e efeitos explícitos em flags/relacionamentos.

## Fundamentos pessoais aprovados — v0.2.8

[AU-APROVADO] Estes fundamentos vieram diretamente da autoria e passam a orientar diálogos, rotas e cenas presenciais. Não completar nomes, parentes ou eventos não definidos aqui sem nova aprovação.

- **Yuki:** filho bastardo de dois heróis aposentados que não deveriam ter se envolvido. Adaptável, versátil e determinado, mas ainda sem saber exatamente o que quer para a própria vida. Entrou na Agência por indicação dos pais procurando seu lugar no mundo.
- **Elysia:** filha de um grande inventor e empresário de tecnologia. Rejeita servir aos interesses comerciais da família e escolhe ajudar as pessoas diretamente como heroína. Estuda obsessivamente seus poderes, busca seus limites e tenta constantemente superá-los.
- **Lysandro:** abandonado e criado no crime, cresceu dentro de uma gangue. Rompeu com ela ao se voltar contra abusos cometidos contra moradores locais e pessoas pobres. Treinou até conseguir derrubar a própria gangue e libertar a comunidade. A Agência reconheceu seu potencial e investiu em sua carreira heroica.
- **Hélio:** filho de um grande vilão do passado, atualmente preso. Ama o pai como pai, mas repudia seus atos. Tenta construir um legado diferente e ainda sofre consequências sociais dos crimes paternos. Busca na Agência redenção e a chance de provar quem é por conta própria.
- **Demétria:** vem de uma família de burocratas e se cansou desse ambiente e de suas disputas políticas. Sempre gostou de investigar casos e também de partir para o confronto físico. Entrou na Agência para se desenvolver como detetive e executora.
- **Alexandra:** filha de uma grande heroína aposentada. Tem facilidade com questões morais, pessoas e combate. É ambiciosa: quer poder, controle e ascensão profissional, mas também genuinamente quer usar isso para ajudar pessoas. Entrou na Agência para ganhar experiência e crescer na carreira heroica.
- **Eros:** filho de um grande herói aposentado. Valoriza liberdade e parece relaxado, mas cumpre suas responsabilidades; pode se atrasar ocasionalmente sem ser irresponsável. Entrou por indicação do pai procurando um caminho e acabou gostando de estar na Agência.

## Direção romântica aprovada — v0.2.8

- **Yuki — slow burn / experiências → amizade → romance.** A intimidade cresce por convivência e experiências compartilhadas. O romance demora a ficar explícito; a mudança de amizade para atração deve ter peso.
- **Elysia — tímida → confortável → desinibida.** Começa com vergonha e hesitação; com confiança, revela um lado muito mais atrevido e sexualmente provocador.
- **Lysandro — intensidade imediata.** Galanteador, atacante e provocador desde cedo. O desenvolvimento está mais em descobrir o que existe por baixo dessa intensidade do que em desbloquear o flerte.
- **Hélio — reprimido / romântico / apego rápido.** Sente muito, tenta se controlar e busca segurança. Pode se apaixonar relativamente rápido, mas tem dificuldade em lidar com o que sente.
- **Demétria — iniciativa e dominância social.** Inicia assuntos, conduz a conversa, provoca e flerta de brincadeira; parte da tensão vem de perceber quando as brincadeiras deixam de ser apenas brincadeiras.
- **Alexandra — barreira → descongelamento.** Começa seca, controlada e difícil de ler, sem hostilidade gratuita. Conforme confia, revela um lado mais doce e afetivo.
- **Eros — humor → brincadeira → intimidade quase sem perceber.** Piadas, provocações e situações cada vez mais íntimas escalam naturalmente até o momento em que fica claro que aquilo já virou romance.

### Regra de ritmo

[AU-APROVADO] Os marcos mecânicos podem ser compartilhados, mas as sete rotas não devem seguir a mesma cadência emocional. O percentual de romance desbloqueia possibilidades; a personalidade e a etapa narrativa determinam como cada personagem expressa interesse.
