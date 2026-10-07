import type { OutingScene } from "@/game/types";

const yukiOutings: OutingScene[] = [
  {
    id:"outing-day3-yuki",
    day:3,
    characterId:"yuki",
    speaker:"Yuki",
    title:"Cafeteria 24 horas",
    backgroundImage:"/outings/yuki/date-1-cafeteria.webp",
    backgroundPositionDesktop:"center center",
    backgroundPositionMobile:"42% center",
    paragraphs:[
      "Os dois chegam na cafeteria, nem parece que se viram durante o expediente todo. Yuki se aproxima e vocês se cumprimentam com um abraço meio vergonhoso, logo seguindo para o balcão. Sem nem perceber, os dois falam ao mesmo tempo, pedindo um café preto com açúcar. Vocês se olham por um instante e riem da coincidência, finalmente indo para a mesa.",
      "Vocês sentam um do lado do outro, bem próximos, mais próximos do que imaginavam, tal qual aquela relação que estavam criando. Após um silêncio constrangedor, os cafés finalmente chegam, salvando um pouco a situação.",
      "Os dois aproveitam aquele café quente juntos, comentando sobre como foi o dia, as coisas que aconteceram durante o expediente e como era bom finalmente ter um pouco de descanso. Depois de um dia inteiro de trabalho, poder relaxar já era bom. Com alguém próximo, melhor ainda.",
    ],
    continueLabel:"Voltar ao NEXO",
    completionFlag:"scene:outing-day3-yuki:complete",
  },
  {
    id:"outing-day6-yuki",
    day:6,
    characterId:"yuki",
    speaker:"Yuki",
    title:"Apartamento do Yuki",
    backgroundImage:"/outings/yuki/date-2-apartamento.webp",
    backgroundPositionDesktop:"center center",
    backgroundPositionMobile:"58% center",
    paragraphs:[
      "Logo depois de você interfonar, Yuki abre a porta e recebe você com um grande abraço; dá pra sentir que ele acabou de sair do banho. Vocês sobem pelo elevador rindo sobre a possibilidade da pizza ter ou não abacaxi.",
      "Quando chegam ao apartamento, Yuki começa a mostrar o lugar: a sala, a cozinha, o quarto e, por fim, o banheiro. Ele entrega uma toalha e avisa que o chuveiro esquenta rápido e bastante, então é melhor tomar cuidado, indo para a cozinha logo em seguida.",
      "Você liga o chuveiro, tira a roupa e entra no box, deixando a porta do banheiro aberta para trás.",
      "Yuki escuta o barulho do chuveiro alto demais para um lugar fechado e vai verificar o que está acontecendo. Ao perceber a porta aberta, ele bate antes de entrar.",
      "Você finge que não escuta.",
      "Yuki bate novamente.",
      "Dessa vez, você responde que pode entrar.",
      "A porta se fecha.",
      "Por alguns segundos, apenas o barulho do chuveiro pode ser ouvido. Você estranha o silêncio, mas, logo depois, a porta do box começa a se abrir.",
      "Yuki aparece do outro lado e pergunta: \"Posso entrar mesmo?\"",
    ],
    continueLabel:"Voltar ao NEXO",
    completionFlag:"scene:outing-day6-yuki:complete",
  },
];

const helioOutings: OutingScene[] = [
  {
    id:"outing-day3-helio", day:3, characterId:"helio", speaker:"Hélio", title:"Convenção",
    backgroundImage:"/outings/helio/date-1-convencao.jpg", backgroundPositionDesktop:"center center", backgroundPositionMobile:"center center",
    paragraphs:[
      "Hélio chega de carro para buscar {{playerName}} e logo abre a porta para a entrada. e diz: vamos? Rapidamente chegando no local da convenção, alguns jornalistas abordam {{playerName}} e Hélio, e Hélio os responde de maneira educada, respeitosa e eloquente, até finalmente entrarem no evento.",
      "Diante de um grande jantar, com mesas separadas e garçons a todo lugar, é possível ver pessoas famosas, políticos, banqueiros e o principal, o primeiro-ministro.",
      "{{playerName}} aponta discretamente para mostrar o sujeito que estão procurando. Os dois se levantam e andam em direção ao primeiro ministro, Hélio no caminho pega três taças de champanhe, te entregando uma, quando chega próximos a mesa do primeiro ministro, Hélio lhe entrega a taça de champagne e iniciando uma conversa informal e emendando sobre as questões de agência de heroi na qual trabalha, incentivando-o e o convencendo facilmente de uma parceria e acompanhamento do estado junto com a instituição de despacho.",
      "Agradecendo a oportunidade brindando, assim fechando o importante acordo necessário para aquela noite.",
      "No caminho de volta, os dois voltam comemorando a grande vitória do dia, {{playerName}} diz, você mandou muito, você tem um charme muito bom para conversar com as pessoas, isso me impressionou.",
      "Hélio discorda e diz, Não não, você mandou muito bem, estava tudo na sua mão e você conseguiu!",
      "Chegando à casa de {{playerName}}, Hélio diz, Hoje foi muito bom, espero que possamos aproveitar mais diz assim…",
      "{{playerName}} diz, Igualmente, dando um abraço e um beijinho na bochecha de Hélio."
    ], continueLabel:"Voltar ao NEXO", completionFlag:"scene:outing-day3-helio:complete"
  },
  {
    id:"outing-day6-helio", day:6, characterId:"helio", speaker:"Hélio", title:"Apartamento do Hélio",
    backgroundImage:"/outings/helio/date-2-apartamento.jpg", backgroundPositionDesktop:"center center", backgroundPositionMobile:"center center",
    paragraphs:[
      "Ao buscar {{playerName}}, Hélio abre a porta do carro, e os dois seguem para seu apartamento.",
      "{{playerName}} elogia Hélio, dizendo, Você se esforçou mesmo hein, está muito cheiroso… ele responde, Tomei banho sabe…",
      "Quando finalmente chegam no apartamento, Hélio diz que a janta ainda não estava pronta, só precisava finalizar algumas coisas, então lava suas mãos e se direciona a cozinha, ele estava terminando de finalizar um, segundo ele, filé mignon ao molho de vinho tinto, risoto de parmesão e legumes grelhados , {{playerName}} observava Hélio cozinhar de uma cadeira próxima à cozinha, que era aberta para a sala.",
      "Quando finalmente termina de cozinhar, ajeitar a mesa para os dois, preparando os pratos, colocando duas taças e dois vinhos na em um balde de gelo, começando a noite, os dois bebem duas taças de vinho, e comem aquela refeição muito bem preparada, e cada vez mais bebendo mais taças de vinho e mais taças de vinho, os dois riem sobre tudo, até finalizarem seus pratos.",
      "Hélio retira os pratos e os leva para a cozinha, {{playerName}} o acompanha e, com Hélio virado para a pia, o abraça por trás, Hélio pergunta, Bebeu bastante?",
      "{{playerName}} resposde: Eu beberia mais, mas tem outra coisa que eu queria mais…",
      "Virando Hélio para si, e o beijando, um beijo que lentamente espera uma resposta, em choque Hélio responde ao beijo dando outro, pegando {{playerName}} no colo enquanto o beija calorosamente, carregando {{playerName}} para o quarto, apagando as luzes em seu caminho; ao chegar na cama, {{playerName}} se vira e coloca Hélio deitado na cama, voltando e fechando a porta."
    ], continueLabel:"Voltar ao NEXO", completionFlag:"scene:outing-day6-helio:complete"
  }
];

const elysiaOutings: OutingScene[] = [
  {
    id:"outing-day3-elysia",
    day:3,
    characterId:"elysia",
    speaker:"Elysia",
    title:"Museu de História",
    backgroundImage:"/outings/elysia/date-1-museu.webp",
    backgroundPositionDesktop:"center center",
    backgroundPositionMobile:"center center",
    paragraphs:[
      "Ao chegar, os dois se cumprimentam de longe, ainda sem muita intimidade, logo entrando no museu.",
      "Passando pelos corredores iniciais, começam a apreciar as obras e ler sobre os primeiros heróis. Elysia vai ficando cada vez mais falante, comentando sobre todas as coisas possíveis e se aproximando cada vez mais de {{playerName}}.",
      "Até que um grupo estranho chega e, para se prevenir de encherem o saco dos dois, Elysia segura no braço de {{playerName}} e os dois ficam com os braços entrelaçados.",
      "É um momento meio desconfortável no começo, mas logo se torna acolhedor. Os dois seguem o passeio inteiro dessa forma.",
      "Ao finalizar o passeio, saem do museu e ficam por um tempo no estacionamento conversando, rindo e se conhecendo mais e mais.",
      "Na hora de se despedirem, se abraçam calorosamente, como se os dois soubessem que aquele era o jeito mais adequado de se despedir, considerando a tamanha intimidade que adquiriram naquele dia.",
      "E assim os dois vão embora para suas respectivas casas.",
    ],
    continueLabel:"Voltar ao NEXO",
    completionFlag:"scene:outing-day3-elysia:complete",
  },
  {
    id:"outing-day6-elysia",
    day:6,
    characterId:"elysia",
    speaker:"Elysia",
    title:"Casa da Elysia",
    backgroundImage:"/outings/elysia/date-2-casa.webp",
    backgroundPositionDesktop:"center center",
    backgroundPositionMobile:"center center",
    paragraphs:[
      "Correndo pelas ruas, rapidamente {{playerName}} chega à casa de Elysia, se atrapalhando para sair e fechar a porta do carro.",
      "Ao tocar a campainha, Elysia atende normalmente, fingindo que nada tinha acontecido.",
      "Ela mostra a casa, passando pela sala, cozinha, banheiro e, por fim, o quarto.",
      "Depois, direciona os dois novamente para a cozinha e pergunta o que vão pedir.",
      "Elysia tira um vinho da geladeira e coloca a bebida em duas taças cheias, entregando uma para {{playerName}}. Em seguida, indica o sofá para que se acomodem.",
      "Ela diz que conhece um lugar com bons pratos e mostra as opções para que escolham o que pedir. Assim, fazem o pedido.",
      "Elysia segue dizendo que, infelizmente, justamente por esse restaurante ser tão bom, a entrega demora bastante. Como queria assistir ao filme depois de comer, ainda teriam bastante tempo.",
      "Bebendo mais um pouco do vinho, Elysia se inclina para mais perto de {{playerName}}.",
      "— Acho que temos um bom tempo para matar...",
      "Ela se aproxima um pouco mais.",
      "— E sabe, ainda tem mais uma coisa que precisamos resolver antes de tudo. Tem sua recompensa, sabe?",
      "Elysia se inclina ainda mais, encaixando-se e subindo no colo de {{playerName}}.",
      "— Você não quer saber qual é a recompensa?",
    ],
    continueLabel:"Voltar ao NEXO",
    completionFlag:"scene:outing-day6-elysia:complete",
  },
];

const lysandroOutings: OutingScene[] = [
  {
    id:"outing-day3-lysandro",
    day:3,
    characterId:"lysandro",
    speaker:"Lysandro",
    title:"Bar do Becos",
    backgroundImage:"/outings/lysandro/date-1-bar.webp",
    backgroundPositionDesktop:"center center",
    backgroundPositionMobile:"center center",
    paragraphs:[
      "Após o trabalho, Lys logo te encontra na saída, com o carro por aplicativo chamado. Os dois vão no banco de trás, mostrando memes e posts engraçados um para o outro tentando não se passarem no som para não incomodar o motorista, chegando no Bar os dois chegaram para pedir as bebidas, pediram um Pink Lemonade e um Moscow Mule, que acabaram por dividir para poder experimentar as duas, pegaram uma mesa só e duas cadeira, e começaram a beber e conversar, com o tempo o bar foi enchendo cada vez mais, e tiveram que mover a mesa para perto da parede, então as cadeiras tiveram que ficar uma do lado da outra, bem encostadas.",
      "Assim a conversa ficava cada vez mais próxima, e os dois também ficavam cada vez mais perto um do outro, praticamente se encostando, Lys para ocupar menos espaço, coloca o braço atrás da cadeira de {{playerName}}, basicamente envolvendo {{playerName}} em um abraço, os dois já sob o efeito da bebida e falando meio mole ficam perto o suficiente para sentirem a respiração um do outro, naquele local apertado, um rápido acontece, interrompido por pessoas passando e esbarrando na cadeira dos dois, eles pedem desculpas e tudo passa e por um momento a responsabilidade bate na consciência e resolvem ir para sua respectivas residências, se despedindo com um abraço e cada um entrando em um carro por aplicativo."
    ],
    continueLabel:"Voltar ao NEXO",
    completionFlag:"scene:outing-day3-lysandro:complete",
  },
  {
    id:"outing-day6-lysandro",
    day:6,
    characterId:"lysandro",
    speaker:"Lysandro",
    title:"Restaurante / Casa de Lysandro",
    backgroundImage:"/outings/lysandro/date-2-restaurante.webp",
    backgroundPositionDesktop:"center center",
    backgroundPositionMobile:"center center",
    paragraphs:[
      "Ao chegar à porta, {{playerName}} entra no carro e logo recebe muitos elogios: Está exuberante você sabe né? Seguindo até um restaurante chique, encontram uma mesa reservada e vinho, as comidas realmente são muito diferenciadas, nem fazem muito sentido, mas vocês experimentam veemente todas e no final fazem uma list de todas as comidas estranhas que comeram.",
      "Voltando para casa, Lysandro pergunta se não passa mais um tempo na casa dele, e {{playerName}} aceita. Chegando na casa de Lysandro, ele abre a porta do carro e te leva para a porta da residência, procurando suas chaves em seus bolsos até finalmente encontrar, finalmente abrindo a porta de sua casa.",
      "Assim que a porta se fecha, Lysandro se vira para {{playerName}}, pressionando seu corpo contra a porta, beijando sua boca com muita vontade, pausando levemente para beijar o pescoço e o puxando para perto, passando pelos cômodos, ainda se agarrando. Lys em movimento começa a alternar entre tirar suas roupas e as roupas de {{playerName}}, finalmente chegando ao quarto e levando {{playerName}} até a cama, e fechando a porta."
    ],
    beats:[
      {
        backgroundImage:"/outings/lysandro/date-2-restaurante.webp",
        paragraphs:[
          "Ao chegar à porta, {{playerName}} entra no carro e logo recebe muitos elogios: Está exuberante você sabe né? Seguindo até um restaurante chique, encontram uma mesa reservada e vinho, as comidas realmente são muito diferenciadas, nem fazem muito sentido, mas vocês experimentam veemente todas e no final fazem uma list de todas as comidas estranhas que comeram."
        ],
        continueLabel:"Ir para a casa de Lysandro"
      },
      {
        backgroundImage:"/outings/lysandro/date-2-casa.webp",
        paragraphs:[
          "Voltando para casa, Lysandro pergunta se não passa mais um tempo na casa dele, e {{playerName}} aceita. Chegando na casa de Lysandro, ele abre a porta do carro e te leva para a porta da residência, procurando suas chaves em seus bolsos até finalmente encontrar, finalmente abrindo a porta de sua casa.",
          "Assim que a porta se fecha, Lysandro se vira para {{playerName}}, pressionando seu corpo contra a porta, beijando sua boca com muita vontade, pausando levemente para beijar o pescoço e o puxando para perto, passando pelos cômodos, ainda se agarrando. Lys em movimento começa a alternar entre tirar suas roupas e as roupas de {{playerName}}, finalmente chegando ao quarto e levando {{playerName}} até a cama, e fechando a porta."
        ]
      }
    ],
    continueLabel:"Voltar ao NEXO",
    completionFlag:"scene:outing-day6-lysandro:complete",
  },
];

const alexandraOutings: OutingScene[] = [
  {
    id:"outing-day3-alexandra", day:3, characterId:"alexandra", speaker:"Alexandra", title:"Mostra Cultural de Ballet Contemporâneo",
    backgroundImage:"/outings/alexandra/date-1-teatro.jpg", backgroundPositionDesktop:"center center", backgroundPositionMobile:"center center",
    paragraphs:[
      "Após chegar de carro para a apresentação, {{playerName}} chega ao teatro onde ocorre o evento beneficente, e Alexandra logo chama sua atenção, esperando com aquele lindo vestido branco; {{playerName}} se aproxima e a elogia de cara: — Definitivamente ficou perfeita nesse vestido.",
      "Alexandra responde: — E você veio de camisa branca para combinar? Sério? Já já vamos poder entrar.",
      "Assim, aguardando poucos minutos para que a entrada seja liberada, os dois entram e encontram seus lugares, um do lado do outro. Os sinais para o início da apresentação tocam, {{playerName}} se assusta com eles, e Alexandra pergunta: — Nunca veio em uma apresentação?",
      "{{playerName}} responde: — Pior que não é algo que eu tenha costume de vir…",
      "Então a apresentação começa. Alexandra começa a explicar o conceito por trás daquela apresentação, então traz à tona lembranças, e ela diz: — Então, quando eu era muito nova, comecei com o ballet logo cedo, então aqui é um lugar na qual eu vim muito, comecei com ballet clássico, mas no fim me encontrei mesmo no ballet contemporâneo, tem tanto técnica mas no fim não sinto que preciso me encaixar em cada movimento de uma maneira especificamente perfeita, posso deixar um movimento levar ao próximo, é bem mais fluido, mais natural, pelo menos para mim.",
      "E {{playerName}} pergunta: — Como água?",
      "Alexandra responde: — É talvez, acho que faz sentido, não é?",
      "Após terminarem de assistir a apresentação, os dois conversam com os representantes da escola, com outros patrocinadores e políticos. No fim os dois saem do teatro juntos, então {{playerName}} pergunta: — Vai no seu carro?",
      "Ela responde: — Sim, e você vai no seu.",
      "{{playerName}} diz: — Sim sim.",
      "Alexandra diz: — Espero que tenha aprendido um pouco sobre a apresentação.",
      "{{playerName}} diz: — Com uma professora dessas, é difícil prestar atenção em outra coisa, mas deu pra entender.",
      "Ela sorri, e os dois se abraçam, e se despedem."
    ], continueLabel:"Voltar ao NEXO", completionFlag:"scene:outing-day3-alexandra:complete"
  },
  {
    id:"outing-day6-alexandra", day:6, characterId:"alexandra", speaker:"Alexandra", title:"Apartamento de {{playerName}}",
    backgroundImage:"/outings/alexandra/date-2-apartamento.jpg", backgroundPositionDesktop:"center center", backgroundPositionMobile:"center center",
    paragraphs:[
      "Alexandra bate na porta e {{playerName}} a recebe usando um pijama de personagem. Alexandra ri e brinca sobre o pijama, pergunta se Alexandra já havia jantado, ela responde que sim, então os dois vão direto para a sala, selecionando o filme no aplicativo de streaming.",
      "{{playerName}} já vai se explicando: — Não tenho certeza se o filme é bom nem nada do tipo, então não me culpe se for ruim.",
      "Ela responde: — Vou culpar sim, foi você que me chamou até aqui e se for ruim o filme…",
      "{{playerName}}: — Temo pela minha vida…",
      "Ao dar play no filme e se sentar ao lado de Alexandra, o filme começa a rodar. É um filme longo; quanto mais tempo passa, menor fica a distância entre os dois, que se apoiam um no outro, quase em um abraço. Quanto mais o tempo passa, mais longo parece o filme.",
      "Os dois vão se juntando mais e mais, até se acomodarem no sofá, Alexandra com a cabeça no peito de {{playerName}}, com o cansaço aparecendo nos olhos depois de assistir ao filme.",
      "{{playerName}} começa a fazer carinho na cabeça de Alexandra, que encolhida retribui acariciando o peito de {{playerName}}. Os dois vão cada vez se esquentando mais, até olharem um nos olhos do outro e saberem o que passa na cabeça um do outro.",
      "Então se beijam lentamente, acariciando seus rostos, alternando entre beijinhos rápidos e beijos longos, cada vez mais intensos, até {{playerName}} se virar, deixando Alexandra deitada, tirando a própria camisa e o pijama e desligando a TV."
    ], continueLabel:"Voltar ao NEXO", completionFlag:"scene:outing-day6-alexandra:complete"
  }
];

const demetriaOutings: OutingScene[] = [
  {
    id:"outing-day3-demetria", day:3, characterId:"demetria", speaker:"Demétria", title:"Universidade Atlas",
    backgroundImage:"/outings/demetria/date-1-universidade.webp", backgroundPositionDesktop:"center center", backgroundPositionMobile:"center center",
    paragraphs:[
      "Ao chegar à Universidade Atlas, {{playerName}} corre para chegar a tempo da apresentação. Finalmente alcança o centro de apresentações e abre a porta bem a tempo.",
      "Demétria está à frente do palco, prestes a iniciar sua apresentação. Assim que percebe {{playerName}} chegando, ela sorri, claramente feliz com a chegada. Os dois trocam um breve olhar antes de ela se posicionar e começar.",
      "Demétria fala de forma eloquente, calma e hipnotizante. A segurança com que explica o assunto e a maneira como se porta fazem com que toda a atenção se volte para ela. Quando {{playerName}} percebe, mais de uma hora já se passou e a apresentação finalmente chega ao fim.",
      "Todos se levantam e aplaudem. Demétria cumprimenta seus professores e colegas e começa a organizar suas coisas. Pouco depois, sai do centro de apresentações e encontra {{playerName}} esperando por ela.",
      "— Fenomenal. Fiquei {{playerForm:hipnotizado|hipnotizada|hipnotizade}}.",
      "Demétria ri, um pouco desconcertada com o comentário.",
      "— Obrigada, {{playerForm:fofo|fofa|fofe}}. Por ter vindo e visto tudo.",
      "Ela se aproxima e dá um beijinho na bochecha de {{playerName}}, que sorri com o gesto. Antes que consiga dizer qualquer coisa, Demétria se lembra de algo.",
      "— Ah, esqueci um negócio. Aliás, consegue me levar pra casa? Estou cheia de coisas e não consegui vir de carro.",
      "— Claro.",
      "— Um minutinho então! Já volto, só vou pegar um papel lá dentro rapidinho.",
      "Demétria corre de volta para o prédio e retorna cerca de dois minutos depois.",
      "Os dois entram no carro e seguem para a casa dela. Ao chegarem, Demétria agradece novamente pela carona.",
      "Na hora de se despedir, ela abraça {{playerName}} e, antes de entrar, dá um selinho rápido.",
      "Logo depois, entra rapidamente em casa."
    ], continueLabel:"Voltar ao NEXO", completionFlag:"scene:outing-day3-demetria:complete"
  },
  {
    id:"outing-day6-demetria", day:6, characterId:"demetria", speaker:"Demétria", title:"Casa da Demétria",
    backgroundImage:"/outings/demetria/date-2-casa.webp", backgroundPositionDesktop:"center center", backgroundPositionMobile:"center center",
    paragraphs:[
      "Chegando o mais rápido possível, {{playerName}} finalmente alcança a casa de Demétria.",
      "Ela abre a porta e recebe {{playerName}} com um grande abraço caloroso. Está usando um terno social completo e sapatos sociais. Logo faz um convite para entrar e segue até a sala com {{playerName}}, onde um projetor já está montado.",
      "— Nossa, então realmente tem uma apresentação.", "Demétria olha para {{playerName}}.", "— Claro. Achou que era o quê?",
      "Ela indica o sofá para {{playerName}} se acomodar bem à sua frente, e se posiciona perto do projetor.",
      "— Vamos fazer o seguinte: eu vou apresentar o meu trabalho e, no fim, quero que você me explique bonitinho sobre o que ele se trata, ok?",
      "{{playerName}} acena com a cabeça, concordando.",
      "Demétria começa pela introdução, explicando que sua apresentação é sobre “A Importância da Gestão e Coordenação de Informações na Investigação Criminal” e que o trabalho está dividido em cinco tópicos.",
      "Ela começa o primeiro tópico explicando sobre Coleta e Organização das Informações. Enquanto apresenta, tira os sapatos.",
      "Então passa para o segundo tópico, sobre a importância da Comunicação entre os Profissionais. Enquanto continua explicando, lentamente desabotoa o paletó.",
      "No terceiro tópico, Demétria fala sobre Análise e Cruzamento de Informações. Sem interromper a apresentação, começa a desabotoar a camisa social, revelando um sutiã de renda preto por baixo.",
      "Logo chega ao quarto tópico. Ainda conduzindo a explicação normalmente, tira lentamente a calça social, revelando a segunda parte do conjunto de renda.",
      "Finalmente, Demétria chega ao quinto tópico.", "Mas para.",
      "Ela observa a reação de {{playerName}}, que está completamente {{playerForm:hipnotizado|hipnotizada|hipnotizade}} pela apresentação.", "Então aponta em sua direção.",
      "— Essa é a sua parte por hoje. Mas você tem que fazer a apresentação do mesmo jeito que eu.",
      "Ela explica que, como será o resumo final, {{playerName}} pode passar rapidamente pelos tópicos anteriores.",
      "— E espero que, no final, a gente esteja no mesmo nível.",
      "{{playerName}} começa a tentar resumir a apresentação tópico por tópico. A cada etapa, também retira uma peça, tentando manter a concentração enquanto Demétria acompanha cada movimento com os olhos.",
      "Finalmente, o resumo chega ao fim.", "Agora, os dois estão no mesmo nível.", "Demétria sorri.",
      "Então desliga o projetor, deixando a sala em completa escuridão."
    ], continueLabel:"Voltar ao NEXO", completionFlag:"scene:outing-day6-demetria:complete"
  }
];

const erosOutings: OutingScene[] = [
  {
    id:"outing-day3-eros", day:3, characterId:"eros", speaker:"Eros", title:"Passeio com Eros",
    backgroundImage:"/heroes/eros.jpg", backgroundPositionDesktop:"center center", backgroundPositionMobile:"center center",
    paragraphs:[
      "Eros chega de moto para buscar {{playerName}}, que coloca o capacete e sobe na moto, se assustando com a potência e com o ronco da moto.",
      "Os dois passeiam pela cidade, passando por inúmeros lugares pelos quais {{playerName}} nunca tinha passado na vida.",
      "Alguns eventos e feiras acontecem na cidade durante a noite, juntando artistas de rua e food trucks por todos os lados da cidade, até que finalmente te chegam um que Eros diz que é muito legal.",
      "Estacionando a moto na frente de um food truck, e comprando um lanche para cada.",
      "Eros e {{playerName}} conversam por muito tempo, contando várias piadas e fazendo os dois rirem muito durante aquela noite.",
      "{{playerName}} afirma que a presença de Eros é estranhamente agradável e confortável, mesmo com tão pouco contato.",
      "Os dois terminam seus lanches e sobem na moto denovo, levando {{playerName}} de volta para casa.",
      "Eros pergunta, gostou do role?",
      "{{playerName}} responde, Você quer a verdade ou a mentira?",
      "Eros responde: Os dois.",
      "{{playerName}} Diz, Então fora ordem, gostei bastante e achei estranhamente confortável.",
      "Eros ri e diz, Vou fingir que entendi, e abraça {{playerName}} na despedida."
    ], continueLabel:"Voltar ao NEXO", completionFlag:"scene:outing-day3-eros:complete"
  },
  {
    id:"outing-day6-eros", day:6, characterId:"eros", speaker:"Eros", title:"Casa de Eros",
    backgroundImage:"/heroes/eros.jpg", backgroundPositionDesktop:"center center", backgroundPositionMobile:"center center",
    paragraphs:[
      "Eros busca {{playerName}} novamente em casa. Com a jaqueta nova, {{playerName}} sobe na moto, já com familiaridade com o ronco.",
      "Os dois andam pela cidade com {{playerName}} abraçando Eros pelas costas; Eros acelera a moto para receber um abraço ainda mais apertado.",
      "Finalmente chegando na feira, Eros estaciona a moto e os dois passam pelas lojinhas e {{playerName}} compra um presentinho para Eros, que fica envergonhado ao perceber que tudo aquilo era para comprar algo para ele, até que aos poucos começam a sentir gotas de chuva.",
      "Eros fica preocupado e diz, Acho que vai chover muito, minha casa é aqui do lado, acho melhor irmos para lá, quando a chuva passa te levo de volta para sua casa.",
      "Então os dois sobem na moto e se direcionam até a casa de Eros, que ao chega já o apresenta para seus cachorros, gatos, passaros, cheio que animais pela casa.",
      "Ao chega no quarto ja com as roupas molhadas pela chuva, retiram suas jaquetas, e Eros sem camisa por baixo, recebe a aproximação de {{playerName}}, com um toque em seu peito e cada vez menos distância entre os dois, Eros deixa o clima rolar para ver o que vai acontecer, aceitando o beijo de {{playerName}}, que avança mais e se agarra em Eros, que retribui a excitação pelo contato e retira a camisa molhada de {{playerName}}.",
      "Juntando as roupas dos dois em um montinho, enquanto a chuva cai lá fora."
    ], continueLabel:"Voltar ao NEXO", completionFlag:"scene:outing-day6-eros:complete"
  }
];

export const outingScenes: OutingScene[] = [...yukiOutings, ...elysiaOutings, ...lysandroOutings, ...helioOutings, ...demetriaOutings, ...alexandraOutings, ...erosOutings];

export function getOutingScene(id: string | null | undefined) {
  return outingScenes.find((scene) => scene.id === id) ?? null;
}
