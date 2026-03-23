// ─────────────────────────────────────────────────────────────────────────────
//  data/engSoftware.js — Engenharia de Software (100 cards)
// ─────────────────────────────────────────────────────────────────────────────

export default [
  // ── Metodologias Ágeis ────────────────────────────────────────────────────
  { id:'es_001', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Manifesto Ágil — 4 Valores',
    verso:'1. Indivíduos e interações > processos e ferramentas.\n2. Software funcionando > documentação abrangente.\n3. Colaboração com o cliente > negociação de contratos.\n4. Responder a mudanças > seguir um plano.\nOs itens à direita têm valor, mas os à esquerda são mais valorizados. 12 princípios complementam os valores.' },

  { id:'es_002', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Scrum — Papéis e Cerimônias',
    verso:'Papéis: Product Owner (PO), Scrum Master (SM), Development Team.\nCerimônias: Sprint Planning, Daily Scrum (15 min), Sprint Review, Sprint Retrospective.\nArtefatos: Product Backlog (PO), Sprint Backlog (Time), Incremento.\nSprint: 1-4 semanas, time-boxed. Definition of Done garante qualidade do incremento.' },

  { id:'es_003', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Kanban — Princípios e Métricas',
    verso:'Princípios: visualize o fluxo, limite WIP (Work in Progress), gerencie o fluxo, torne as políticas explícitas, melhore colaborativamente.\nMétricas: Lead Time (da solicitação à entrega), Cycle Time (do início ao trabalho à entrega), Throughput (itens entregues/período), CFD (Cumulative Flow Diagram).' },

  { id:'es_004', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'XP — Extreme Programming',
    verso:'Práticas técnicas: TDD, pair programming, refactoring, continuous integration, small releases, simple design, coding standards, collective code ownership.\nValores: comunicação, simplicidade, feedback, coragem, respeito. Iterações curtas (1-2 semanas), cliente presente no time. Complementa Scrum em maturidade técnica.' },

  { id:'es_005', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'SAFe — Scaled Agile Framework',
    verso:'Framework para escalar agilidade em grandes organizações. Níveis: Team (times Scrum/Kanban), Program (ART — Agile Release Train com PI Planning), Large Solution, Portfolio. PI (Program Increment): ~10 semanas com 4 sprints + 1 IP sprint. Synchroniza múltiplos times em cadência com backlog de Features e Epics.' },

  { id:'es_006', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'User Story — Boas Práticas (INVEST)',
    verso:'Critério INVEST para boas User Stories:\nI — Independent (independente)\nN — Negotiable (negociável)\nV — Valuable (com valor)\nE — Estimable (estimável)\nS — Small (pequena, cabe no sprint)\nT — Testable (testável)\nFormato: "Como [persona], quero [ação] para [benefício]". Critérios de Aceite definem o "feito".' },

  { id:'es_007', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Planning Poker — Estimativa',
    verso:'Técnica ágil de estimativa relativa em grupo. Cada membro escolhe carta com valor Fibonacci (1, 2, 3, 5, 8, 13, 21, ?) sem revelar. Todos revelam simultaneamente. Divergências geram discussão. Baseia-se em story points (esforço relativo), não horas. Reduz âncora e favorece consenso do time.' },

  { id:'es_008', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Burndown Chart',
    verso:'Gráfico do Scrum que mostra trabalho restante vs. tempo no sprint. Eixo Y: story points ou tarefas restantes. Eixo X: dias do sprint. Linha ideal: descida linear do total ao zero. Linha real acima: sprint em atraso. Abaixo: adiantado. Burnup chart mostra trabalho concluído + escopo total (visualiza scope creep).' },

  // ── Design Patterns ───────────────────────────────────────────────────────
  { id:'es_009', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrões GoF — Categorias',
    verso:'Gang of Four (Gamma, Helm, Johnson, Vlissides) categorizaram 23 padrões:\nCriacionais (5): como objetos são criados — Singleton, Factory Method, Abstract Factory, Builder, Prototype.\nEstruturais (7): composição de classes/objetos — Adapter, Decorator, Facade, Composite, Proxy, Bridge, Flyweight.\nComportamentais (11): comunicação — Strategy, Observer, Command, Iterator, Template Method, State...' },

  { id:'es_010', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão Singleton',
    verso:'Garante que uma classe tenha somente uma instância e fornece ponto de acesso global. Implementação: construtor privado + método estático getInstance() que cria a instância na primeira chamada e retorna a mesma nas seguintes. Problemas: dificulta testes (estado global), concorrência (double-checked locking necessário).' },

  { id:'es_011', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão Observer',
    verso:'Define dependência um-para-muitos: quando o Subject muda de estado, todos os Observers registrados são notificados automaticamente. Usado em interfaces gráficas (eventos), sistemas reativos, pub/sub. Java: java.util.Observable (deprecated) e java.util.EventListener. Permite baixo acoplamento entre publicador e assinante.' },

  { id:'es_012', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão Strategy',
    verso:'Define família de algoritmos, encapsula cada um e os torna intercambiáveis. O contexto usa a estratégia através de uma interface comum, sem conhecer a implementação concreta. Elimina condicionais extensas. Exemplo: diferentes algoritmos de ordenação ou formas de pagamento trocados em tempo de execução.' },

  { id:'es_013', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão Factory Method',
    verso:'Define interface para criar objeto, mas deixa subclasses decidirem qual classe instanciar. O criador usa um método abstrato (factory method) que é implementado pelos filhos. Diferente da Abstract Factory (cria família de objetos relacionados). Builder: cria objeto complexo passo a passo.' },

  { id:'es_014', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão Decorator',
    verso:'Adiciona responsabilidades a objetos dinamicamente, sem alterar a classe. Alternativa flexível à herança. Decoradores envolvem o componente de forma transparente (mesma interface). Exemplo: java.io.BufferedReader wrapping FileReader. Múltiplos decoradores podem ser encadeados: logging + compressão + criptografia.' },

  { id:'es_015', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Padrão MVC — Model-View-Controller',
    verso:'Separa a aplicação em 3 camadas:\nModel: lógica de negócio e dados\nView: interface com o usuário\nController: recebe entrada do usuário, invoca o Model e retorna a View\nVantagem: separação de concerns, facilita testes e manutenção. Variantes: MVP (Presenter testável), MVVM (ViewModel com data binding para React/Angular).' },

  // ── SOLID ─────────────────────────────────────────────────────────────────
  { id:'es_016', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Princípios SOLID',
    verso:'S — Single Responsibility: classe tem um único motivo para mudar.\nO — Open/Closed: aberto para extensão, fechado para modificação.\nL — Liskov Substitution: subtype deve poder substituir o tipo base.\nI — Interface Segregation: interfaces específicas são melhores que uma geral.\nD — Dependency Inversion: dependa de abstrações, não de implementações.' },

  { id:'es_017', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Princípio da Inversão de Dependência (DIP)',
    verso:'Módulos de alto nível não devem depender de baixo nível; ambos devem depender de abstrações. Abstrações não devem depender de detalhes; detalhes devem depender de abstrações. Implementado via Injeção de Dependência (DI): dependências são injetadas de fora (construtor, setter, framework IoC). Base para testabilidade.' },

  { id:'es_018', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Princípio de Substituição de Liskov (LSP)',
    verso:'Se S é subtipo de T, objetos de T podem ser substituídos por objetos de S sem alterar a correção do programa. Violação clássica: Quadrado herda Retângulo mas quebra o invariante (setar largura não deve alterar altura). Regras: pré-condições só podem ser SUAVIZADAS na subclasse (exigir menos); pós-condições só podem ser FORTALECIDAS (garantir pelo menos o que a classe base garantia).' },

  // ── TDD e Qualidade ───────────────────────────────────────────────────────
  { id:'es_019', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'TDD — Test-Driven Development',
    verso:'Ciclo Red-Green-Refactor:\n1. Red: escreva teste que falha (requisito não implementado).\n2. Green: implemente o mínimo para o teste passar.\n3. Refactor: melhore o código mantendo testes verdes.\nBenefícios: design emergente, alta cobertura, código mais testável. Relacionado a BDD (Behavior-Driven Development) com linguagem Gherkin (Given/When/Then).' },

  { id:'es_020', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Pirâmide de Testes',
    verso:'Do mais numeroso e barato (base) ao menos frequente e caro (topo):\n1. Unit Tests: testam unidades isoladas, rápidos, sem I/O. Grande volume.\n2. Integration Tests: testam integração entre módulos/serviços.\n3. E2E / UI Tests: testam fluxo completo pelo sistema; lentos e frágeis. Poucos.\nAnti-padrão: sorvete (muitos E2E, poucos unitários).' },

  { id:'es_021', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Code Coverage — Tipos de Cobertura',
    verso:'Statement coverage: % de linhas executadas.\nBranch coverage (decision): % de branches if/else cobertos.\nCondition coverage: cada sub-condição booleana avaliada como T e F.\nPath coverage: todos os caminhos possíveis (combinatório).\nMutation testing: insere mutações no código e checa se testes falham. Cobertura alta não garante qualidade dos testes.' },

  { id:'es_022', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Refactoring — Técnicas Comuns',
    verso:'Reestruturação do código sem alterar comportamento externo.\nTécnicas: Extract Method, Rename, Move Method/Field, Replace Conditional with Polymorphism, Introduce Parameter Object, Replace Magic Number with Constant, Remove Dead Code.\nCode smells que indicam necessidade: Long Method, Large Class, Feature Envy, Duplicate Code, God Class.' },

  // ── Git & CI/CD ───────────────────────────────────────────────────────────
  { id:'es_023', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Git — Comandos Essenciais',
    verso:'git init/clone: inicializa/clona repositório.\ngit add/commit/push/pull: ciclo básico.\ngit branch/checkout/merge/rebase: gerenciamento de branches.\ngit stash: guarda modificações temporariamente.\ngit log --oneline: histórico compacto.\ngit diff: diferenças entre commits/arquivos.\ngit reset/revert: desfaz commits (reset local, revert seguro para remoto).' },

  { id:'es_024', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Git Flow vs. Trunk-Based Development',
    verso:'Git Flow: branches main, develop, feature/*, release/*, hotfix/*. Estruturado, bom para releases versionadas, mas branches de longa duração causam merge hell.\nTrunk-Based Development (TBD): todos os desenvolvedores integram no trunk frequentemente (1/dia). Feature flags controlam funcionalidades. Pré-requisito para CI/CD eficiente.' },

  { id:'es_025', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'CI/CD — Integração e Entrega Contínua',
    verso:'CI (Continuous Integration): integração frequente de código com testes automatizados. Evita "integration hell".\nCD Delivery: qualquer commit pode ser implantado após aprovação manual.\nCD Deployment: implantação automática em produção sem intervenção humana.\nPipeline típico: build → test → lint → security scan → deploy staging → smoke tests → prod.' },

  { id:'es_026', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Code Review — Boas Práticas',
    verso:'Benefícios: encontra bugs antes do merge, compartilha conhecimento, mantém padrões. Práticas: pull requests pequenos (< 400 linhas), descrever o "porquê", não o "o que"; separar concerns estéticos de funcionais; usar linters para automação; reviewer deve entender o contexto, não apenas "LGTM". Pair programming é alternativa em tempo real.' },

  // ── UML ───────────────────────────────────────────────────────────────────
  { id:'es_027', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'UML — Diagramas Estruturais vs. Comportamentais',
    verso:'Estruturais (estáticos): Classe, Objeto, Componente, Deployment, Pacote, Perfil, Estrutura Composta.\nComportamentais (dinâmicos): Caso de Uso, Atividade, Estado (Máquina de Estados), Sequência, Comunicação, Interação, Timing.\nMais cobrados em concursos: Classe, Caso de Uso, Sequência e Atividade.' },

  { id:'es_028', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Diagrama de Classes UML',
    verso:'Relações:\n• Associação: —— (genérica, pode ter multiplicidade)\n• Agregação: ◇—— (todo-parte fraca; parte existe sem o todo)\n• Composição: ◆—— (todo-parte forte; parte é destruída com o todo)\n• Herança: ——▷ (generalização)\n• Realização: - - -▷ (implementa interface)\n• Dependência: - - -> (usa temporariamente)' },

  { id:'es_029', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Diagrama de Casos de Uso UML',
    verso:'Atores: externos ao sistema (usuários, outros sistemas). Casos de uso: elipses com verbos (funcionalidades).\nRelações: include (<<include>> — sempre executa), extend (<<extend>> — executa condicionalmente), generalização.\nNão descreve implementação, apenas comportamento visível externamente. Útil para levantamento de requisitos.' },

  { id:'es_030', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Diagrama de Sequência UML',
    verso:'Mostra interações entre objetos ao longo do tempo (eixo vertical). Linhas de vida verticais representam objetos. Setas horizontais representam mensagens (síncrona → reta, assíncrona → ponta aberta). Fragmentos: alt (if/else), opt (if), loop, par (paralelo), ref (referência). Mostra a ordem temporal das chamadas.' },

  // ── Qualidade de Software ─────────────────────────────────────────────────
  { id:'es_031', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'ISO/IEC 25010 — Qualidade de Software',
    verso:'Substitui ISO 9126. Características de qualidade do produto:\n• Adequação funcional\n• Eficiência de desempenho\n• Compatibilidade\n• Usabilidade\n• Confiabilidade (disponibilidade, maturidade, tolerância a falhas)\n• Segurança\n• Manutenibilidade (modularidade, testabilidade, modificabilidade)\n• Portabilidade' },

  { id:'es_032', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'CMMI — Capability Maturity Model Integration',
    verso:'Framework para melhoria de processos de desenvolvimento. Níveis de maturidade:\n1. Inicial: processos imprevisíveis e reativos\n2. Gerenciado: projetos planejados, rastreados\n3. Definido: processos padronizados na organização\n4. Quantitativamente gerenciado: métricas e controle estatístico\n5. Em otimização: melhoria contínua e inovação' },

  { id:'es_033', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'MPS.BR — Melhoria de Processo do Software Brasileiro',
    verso:'Modelo nacional de referência para qualidade de processo, compatível com CMMI e ISO 15504. Sete níveis: G, F, E, D, C, B, A (do menor para o maior). Nível G (básico): Gerência de Projetos + Gerência de Requisitos. Criado pela Softex para facilitar adoção por pequenas e médias empresas brasileiras.' },

  // ── Arquitetura de Software ───────────────────────────────────────────────
  { id:'es_034', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Arquitetura de Microsserviços',
    verso:'Estilo arquitetural que decompõe a aplicação em serviços pequenos, independentes, deployáveis individualmente, comunicando-se via APIs (REST, gRPC) ou mensageria (Kafka, RabbitMQ). Vantagens: escalabilidade granular, escolha de tecnologia por serviço, falhas isoladas. Desafios: latência de rede, consistência eventual, observabilidade.' },

  { id:'es_035', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'API REST — Princípios',
    verso:'REST (Representational State Transfer): arquitetura para APIs web. Princípios:\n• Stateless: servidor não mantém estado da sessão\n• Uniform Interface: recursos (URL) + verbos HTTP (GET/POST/PUT/DELETE/PATCH)\n• Cacheable: respostas podem ser cacheadas\n• Layered System: cliente não sabe se fala com proxy\nHTTP Status codes: 2xx sucesso, 3xx redirect, 4xx erro cliente, 5xx erro servidor.' },

  { id:'es_036', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Event-Driven Architecture (EDA)',
    verso:'Arquitetura onde componentes se comunicam através de eventos assíncronos. Produtor publica evento no broker (Kafka, RabbitMQ, SNS); consumidores assinaram e reagem. Desacoplamento temporal e espacial. Padrões: Event Sourcing (estado = sequência de eventos), CQRS (Command Query Responsibility Segregation).' },

  { id:'es_037', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Arquitetura Clean (Uncle Bob)',
    verso:'Separação em camadas concêntricas. De dentro para fora:\n1. Entities (regras de negócio da empresa)\n2. Use Cases (regras de negócio da aplicação)\n3. Interface Adapters (controllers, presenters, gateways)\n4. Frameworks & Drivers (web, banco, UI)\nDependência sempre aponta para dentro. Núcleo independente de frameworks e banco.' },

  { id:'es_038', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Domain-Driven Design (DDD) — Conceitos Básicos',
    verso:'Foco no domínio do negócio e sua lógica. Conceitos:\nEntity: identidade única que persiste ao longo do tempo.\nValue Object: sem identidade, definido por atributos.\nAggregate: cluster de entidades com raiz (Aggregate Root).\nRepository: abstração de persistência.\nDomain Service: lógica que não pertence a uma entidade.\nBounded Context: limite de um modelo de domínio.' },

  { id:'es_039', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Serverless — FaaS',
    verso:'Function as a Service: desenvolvedor implementa funções que são executadas em resposta a eventos. Infraestrutura gerenciada pelo cloud (AWS Lambda, Azure Functions, GCP Cloud Functions). Escala a zero (sem custos em idle). Ideal para processamento de eventos, APIs com pico irregular. Desafio: cold start, debugging, latência.' },

  { id:'es_040', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'GraphQL vs. REST',
    verso:'REST: múltiplos endpoints, over-fetching (dados desnecessários) e under-fetching (múltiplas chamadas). GraphQL: único endpoint, cliente especifica exatamente os campos desejados. Query (leitura), Mutation (escrita), Subscription (tempo real). Vantagens: flexibilidade para clientes, reduz roundtrips. Desvantagens: caching mais complexo, N+1 problem.' },

  // ── Levantamento de Requisitos ────────────────────────────────────────────
  { id:'es_041', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Requisitos Funcionais vs. Não-Funcionais',
    verso:'Funcionais: o que o sistema deve fazer. Ex: "O sistema deve permitir o cadastro de usuários".\nNão-funcionais (NFR): qualidades do sistema. Categorias: desempenho (tempo de resposta < 200ms), segurança (criptografia AES-256), disponibilidade (99,9%), portabilidade, usabilidade.\nRequisitos de domínio: restrições do domínio da aplicação (regulações, leis).' },

  { id:'es_042', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'RUP — Rational Unified Process',
    verso:'Processo de desenvolvimento iterativo e incremental baseado em UML. Fases: Inception (viabilidade), Elaboration (arquitetura), Construction (implementação iterativa), Transition (implantação). Fluxos de trabalho: Business Modeling, Requirements, Analysis & Design, Implementation, Test, Deployment. Configurável (pesado por natureza).' },

  { id:'es_043', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Prototipagem Rápida',
    verso:'Técnica de levantamento de requisitos e validação através de protótipos descartáveis ou evolucionários. Tipos: Lo-fi (papel, wireframes), Hi-fi (clickable prototype, Figma). Ciclo: construir → demonstrar → coletar feedback → refinar. Reduz mal-entendidos entre cliente e desenvolvedor antes de comprometer com código.' },

  { id:'es_044', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Débito Técnico',
    verso:'Custo implícito de retrabalho futuro causado por escolhas de implementação rápida e subótimas agora. Ward Cunningham criou o conceito. Tipos: deliberado (prazo urgente), inadvertido (falta de conhecimento), inadvertido e imprudente.\nJuros: dificuldade crescente de fazer mudanças. Gerenciado com refactoring e pagamento periódico.' },

  { id:'es_045', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Pair Programming',
    verso:'Prática XP onde dois desenvolvedores trabalham juntos num computador. Driver: digita o código. Navigator: revisa, pensa estrategicamente, sugere melhorias. Papéis trocados frequentemente. Benefícios: revisão em tempo real, disseminação de conhecimento, menos bugs. Custo aparente de 15% em horas, mas reduz bugs e retrabalho.' },

  // ── DevOps & Ferramentas ──────────────────────────────────────────────────
  { id:'es_046', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'DevOps — Cultura e Princípios',
    verso:'Combinação de práticas e ferramentas para unir Dev e Ops. Princípios CALMS:\nC — Culture (colaboração)\nA — Automation (pipeline CI/CD)\nL — Lean (eliminar desperdício)\nM — Measurement (métricas)\nS — Sharing (feedback e conhecimento)\nObjetivo: reduzir time-to-market, aumentar frequência de deploy e MTTR.' },

  { id:'es_047', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Infraestrutura como Código (IaC)',
    verso:'Gerenciar e provisionar infraestrutura através de arquivos de configuração versionados (não de processos manuais). Ferramentas:\nTerraform: multi-cloud, declarativo, HCL.\nAnsible: configuração de servidores, YAML, sem agente.\nPuppet/Chef: gestão de configuração declarativa.\nAWS CloudFormation: IaC nativo AWS.\nVantagens: consistência, auditabilidade, reprodutibilidade.' },

  { id:'es_048', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'SRE — Site Reliability Engineering',
    verso:'Função criada pelo Google: aplica engenharia de software para problemas de operações. Conceitos:\nSLI (Service Level Indicator): métrica real (latência, disponibilidade).\nSLO (Service Level Objective): meta do SLI (ex: 99,9% disponibilidade).\nSLA (Service Level Agreement): compromisso contratual com penalidades.\nError Budget: quanto de indisponibilidade é permitido antes de parar features.' },

  { id:'es_049', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Feature Toggle / Feature Flag',
    verso:'Técnica para ativar/desativar funcionalidades em produção sem novo deploy. Permite: trunk-based development (código no ar mas desabilitado), lançamento gradual (canary release), testes A/B, kill switch. Tipos: release toggles (temporários), experiment toggles (A/B), ops toggles (emergência), permission toggles (por perfil). Gerenciados por LaunchDarkly, Unleash.' },

  { id:'es_050', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Blue-Green Deployment',
    verso:'Estratégia de deploy com zero downtime. Dois ambientes idênticos: Blue (produção atual) e Green (nova versão). Deploy vai para Green; testes de smoke são executados. Ao aprovar, o load balancer troca o tráfego de Blue para Green instantaneamente. Em caso de falha, rollback instantâneo ao Blue. Requer infraestrutura duplicada.' },

  { id:'es_051', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Canary Release',
    verso:'Implanta nova versão para subconjunto pequeno de usuários (1-5%) inicialmente. Monitora métricas (erros, latência, conversão). Se saudável, incrementa gradualmente (25% → 50% → 100%). Se problemas, reverte apenas o canary. Nome vem dos canários em minas de carvão. Ferramenta: Argo Rollouts, Spinnaker, Istio traffic splitting.' },

  { id:'es_052', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Semantic Versioning (SemVer)',
    verso:'Padrão de versionamento: MAJOR.MINOR.PATCH (ex: 2.3.1).\nMAJOR: mudanças incompatíveis na API.\nMINOR: novas funcionalidades retrocompatíveis.\nPATCH: correções de bugs retrocompatíveis.\nPré-release: 1.0.0-alpha.1, 1.0.0-beta.2, 1.0.0-rc.1.\nImportante para gerenciar dependências com npm, pip, Maven.' },

  // ── Segurança no Desenvolvimento ──────────────────────────────────────────
  { id:'es_053', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'OWASP Top 10 (2021) — Visão Geral',
    verso:'1. Broken Access Control\n2. Cryptographic Failures\n3. Injection (SQL, XSS, etc.)\n4. Insecure Design\n5. Security Misconfiguration\n6. Vulnerable & Outdated Components\n7. Identification & Authentication Failures\n8. Software & Data Integrity Failures\n9. Security Logging & Monitoring Failures\n10. SSRF (Server-Side Request Forgery)' },

  { id:'es_054', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'XSS — Cross-Site Scripting',
    verso:'Injeção de scripts maliciosos em páginas web visualizadas por outros usuários. Tipos:\nStored: script persiste no banco de dados.\nReflected: parâmetro da URL é refletido sem sanitização.\nDOM-based: manipulação do DOM no cliente.\nMitigações: encoding de saída (HTML entity), Content Security Policy (CSP), HttpOnly cookies, validação de entrada.' },

  { id:'es_055', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'CSRF — Cross-Site Request Forgery',
    verso:'Ataque que força usuário autenticado a executar ação indesejada em site onde está logado. Exploita a confiança que o site tem no navegador do usuário. Mitigações: CSRF token (sincronizado), SameSite cookie attribute (Strict/Lax), verificar Origin/Referer header, double submit cookie. Diferente do XSS (que explora confiança do usuário no site).' },

  // ── Métricas e Manutenção ─────────────────────────────────────────────────
  { id:'es_056', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Métricas de Código — Complexidade Ciclomática',
    verso:'Métrica de McCabe que mede a complexidade do fluxo de controle de um módulo. V(G) = E - N + 2P (arestas - nós + 2 × componentes). Simples: conte o número de decisões (if, while, for, case, &&, ||) + 1. Valor ≤ 10: baixa complexidade. > 10: difícil testar. > 25: refatorar urgente! Indica número mínimo de casos de teste necessários.' },

  { id:'es_057', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Análise de Pontos de Função (APF)',
    verso:'Método de estimativa de tamanho funcional independente de tecnologia. Conta: entradas externas (EI), saídas externas (EO), consultas externas (EQ), arquivos lógicos internos (ILF), arquivos de interface externa (EIF). Cada tipo tem peso (simples/médio/complexo). Pontos de Função Ajustados usam Fator de Ajuste de Valor (VAF).' },

  { id:'es_058', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Gambiarra vs. Dead Code vs. Code Smell',
    verso:'Dead code: código nunca executado (condição sempre falsa, método nunca chamado). Aumenta manutenção desnecessária.\nCode smell: indício de possível problema de design (não é bug): God Class, Long Method, Duplicação, Feature Envy.\nTechnical debt: custo futuro acumulado por atalhos. Refactoring "paga" a dívida.' },

  { id:'es_059', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Log Levels — Níveis de Registro',
    verso:'Hierarquia crescente de severidade (padrão Log4j/SLF4J):\nTRACE → DEBUG → INFO → WARN → ERROR → FATAL\nDEBUG: informação diagnóstica detalhada (apenas em desenvolvimento).\nINFO: eventos normais do sistema.\nWARN: situação inesperada, mas recuperada.\nERROR: falha que necessita atenção.\nLog estruturado (JSON) facilita análise com ELK Stack.' },

  { id:'es_060', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Observabilidade — 3 Pilares',
    verso:'1. Logs: registro textual de eventos discretos. Estruturado (JSON) + centralizado (ELK, Loki).\n2. Métricas: séries temporais numéricas (CPU, latência, error rate). Prometheus + Grafana.\n3. Traces distribuídos: rastreiam uma requisição por múltiplos serviços (OpenTelemetry, Jaeger, Zipkin). Além dos 3, Events são úteis. Diferente de monitoramento: observabilidade permite perguntas não antecipadas.' },

  // ── Tópicos Adicionais ────────────────────────────────────────────────────
  { id:'es_061', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Injeção de Dependência (DI)',
    verso:'Padrão onde as dependências de um objeto são fornecidas externamente (injetadas) em vez de criadas internamente. Tipos: construtor (preferido), setter, interface. Frameworks: Spring (Java), .NET DI, Angular. Benefícios: baixo acoplamento, testabilidade (mock fácil), flexibilidade. IoC Container gerencia o ciclo de vida dos objetos.' },

  { id:'es_062', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Arquitetura em Camadas (N-tier)',
    verso:'Organiza o software em camadas com responsabilidades distintas:\n2 camadas: cliente-servidor\n3 camadas: apresentação (UI) → lógica de negócio → dados\nN camadas: adiciona camadas como serviço, integração, cache\nRegra: camada só chama a camada imediatamente abaixo. Benefício: independência de substitui uma camada sem afetar outras.' },

  { id:'es_063', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'KISS, DRY e YAGNI',
    verso:'KISS (Keep It Simple, Stupid): prefira soluções simples às complexas.\nDRY (Don\'t Repeat Yourself): "Every piece of knowledge must have a single, unambiguous... representation within a system." Evite duplicação de lógica (não apenas cópia de código).\nYAGNI (You Aren\'t Gonna Need It): não implemente funcionalidade antecipando necessidade futura não confirmada.' },

  { id:'es_064', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Acoplamento Baixo e Coesão Alta',
    verso:'Coesão: grau em que os elementos de um módulo pertencem juntos. Alta coesão = módulo focado em uma responsabilidade.\nAcoplamento: grau de dependência entre módulos. Baixo acoplamento = módulos independentes, substituíveis.\nObjeto: alta coesão + baixo acoplamento = design de qualidade. Inversões: baixa coesão (God Class), alto acoplamento (spaghetti).' },

  { id:'es_065', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Testes de Carga e Performance',
    verso:'Tipos:\nLoad test: comportamento sob carga esperada.\nStress test: além do limite — identifica ponto de ruptura.\nSpike test: picos repentinos de carga.\nSoak/Endurance test: carga constante por longo período (detecta memory leaks).\nFerramentas: JMeter, k6, Gatling, Locust, Apache Bench (ab). Métricas: throughput, p95/p99 latency, error rate.' },

  { id:'es_066', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'SOLID — Open/Closed Principle (OCP)',
    verso:'Entidades de software devem ser abertas para extensão, mas fechadas para modificação. Adicione novo comportamento sem alterar código existente. Implementado via polimorfismo, herança ou composição. Exemplo: em vez de adicionar if para novo tipo de relatório, crie nova classe que implementa interface IReport. Reduz risco de regressão.' },

  { id:'es_067', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Continuous Deployment vs. Continuous Delivery',
    verso:'Continuous Delivery: todo commit passa pelo pipeline e está pronto para produção, mas a decisão de deploy é humana. Precisa de aprovação/botão.\nContinuous Deployment: todo commit que passa pelo pipeline vai automaticamente para produção sem intervenção humana.\nCD Delivery é pré-requisito para CD Deployment.' },

  { id:'es_068', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Princípio de Pareto — 80/20 em Bugs',
    verso:'Pareto (80/20) em SW: ~80% dos erros estão concentrados em ~20% dos módulos. Identificar esses módulos hot spots direciona esforço de testes e refactoring. Análise de Pareto com dados do tracker de bugs (Jira, GitHub Issues): agrupe bugs por componente, ordene por frequência, encontre o cumulativo 80%.' },

  { id:'es_069', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Gestão de Configuração de Software (SCM)',
    verso:'Disciplina para controlar mudanças no software ao longo do tempo. Atividades: controle de versão (Git), gerenciamento de mudanças (Change Management), gerenciamento de build (Maven, Gradle), gerenciamento de release. Baseline: versão estável aprovada. Auditoria de configuração verifica conformidade com baseline.' },

  { id:'es_070', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Modelo em Cascata (Waterfall)',
    verso:'Fases sequenciais sem retorno: Requisitos → Design → Implementação → Verificação → Manutenção. Vantagem: fácil de gerenciar, documentação completa. Desvantagens: inflexível para mudanças, feedback tardio, cliente só vê o produto no fim. Adequado para projetos com requisitos estáveis e bem definidos (ex: sistemas de missão crítica com regulação rígida).' },

  { id:'es_071', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Modelo Espiral de Boehm',
    verso:'Combina prototipagem e cascata com foco em gerenciamento de riscos. Cada volta da espiral passa por 4 quadrantes: Planejamento → Análise de Riscos → Engenharia (desenvolvimento) → Avaliação. Cada ciclo refina e expande o produto. Adequado para projetos grandes e complexos com riscos substanciais. Iterativo mas guiado por riscos.' },

  { id:'es_072', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Documentação — Javadoc e Swagger',
    verso:'Javadoc: gera documentação HTML a partir de comentários /** */ no código Java. Tags: @param, @return, @throws, @author, @version.\nSwagger/OpenAPI: especificação YAML/JSON para documentar APIs REST. Swagger UI gera interface interativa para testar endpoints. OpenAPI 3.0 é o padrão atual. Code-first ou design-first.' },

  { id:'es_073', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Análise Estática de Código',
    verso:'Examina o código sem executá-lo. Detecta bugs, vulnerabilidades e violações de padrões. Ferramentas:\nSonarQube: análise de qualidade (cobertura, dívida técnica, security hotspots).\nESLint/Prettier: JS/TS.\nCheckstyle: Java.\nBandit: Python security.\nCodeCov: cobertura de testes.\nIntegrado ao pipeline CI para bloquear merges com issues críticos.' },

  { id:'es_074', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Contrato de API e Backward Compatibility',
    verso:'Contrato: interface pública que clientes dependem. Mudanças breaking (não-retrocompatíveis): remover campos, alterar tipos, mudar semântica. Versionamento de API: URI (/api/v2/), header (Accept: application/vnd.api+json;version=2). Deprecation: anunciar com antecedência, manter versão antiga por período. Consumer-Driven Contracts (Pact) testam compatibilidade automaticamente.' },

  { id:'es_075', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Mockito e Mocks em Testes Unitários',
    verso:'Mocks substituem dependências reais durante testes. Tipos: Dummy (passado mas não usado), Stub (retorna resposta predefinida), Mock (verifica chamadas), Spy (real + verificação), Fake (implementação simplificada real, ex: banco in-memory).\nMockito (Java): mock(Class), when().thenReturn(), verify(). Permite testar unidades em isolamento.' },

  { id:'es_076', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Revisão de Código Formal — Walkthrough vs. Inspeção',
    verso:'Walkthrough: apresentação informal pelo autor; revisores fazem perguntas; menos formal, sem métricas.\nInspeção Fagan: processo formal com papéis definidos (moderador, autor, leitores, escrivão). Métricas coletadas. Mais eficaz para encontrar defeitos mas mais custosa.\nPeer review (Pull Request): revisão assíncrona, mais leve, praticada em desenvolvimento ágil moderno.' },

  { id:'es_077', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Coupling — Tipos de Acoplamento',
    verso:'Do menos ao mais indesejado (Yourdon & Constantine):\nData coupling: troca parâmetros simples.\nStamp coupling: troca estruturas de dados.\nControl coupling: passa flags que controlam fluxo.\nExternal coupling: dependência de fator externo (formato arquivo).\nCommon coupling: variável global compartilhada.\nContent coupling: módulo acessa internals de outro (pior).' },

  { id:'es_078', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'REST vs. SOAP',
    verso:'SOAP: protocolo baseado em XML, envelope com Header e Body, funciona sobre HTTP/SMTP/JMS. WSDL descreve o serviço. Fortemente tipado, transacional, segurança WS-Security. Verboso.\nREST: arquitetura baseada em HTTP, JSON/XML, stateless. Mais leve e rápido. SOAP preferido em serviços bancários e corporativos (transações, segurança avançada).' },

  { id:'es_079', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão CQRS',
    verso:'Command Query Responsibility Segregation: separa operações de leitura (Query) de escrita (Command) em modelos distintos. A escrita atualiza o modelo de dados (Write Model/Command Model). A leitura usa projeções otimizadas (Read Model). Permite escalar leitura e escrita independentemente. Frequentemente combinado com Event Sourcing.' },

  { id:'es_080', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Versionamento Semântico no npm/pip',
    verso:'npm install package@^1.2.3: ^ aceita minor e patch updates (1.x.x mas não 2.x.x).\n~ aceita apenas patch updates (1.2.x).\n= aceita apenas a versão exata.\npip: package>=1.2,<2.0 ou package~=1.2.3.\npackage-lock.json / poetry.lock: congela versões exatas de todas as dependências para builds reproduzíveis.' },

  { id:'es_081', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Anti-patterns — Deus, Espaguete e Bala de Prata',
    verso:'God Object/Class: única classe que faz tudo — viola SRP e dificulta manutenção.\nSpaghetti Code: fluxo de controle desorganizado, sem estrutura, difícil rastrear.\nLava Flow: código legado que ninguém ousa remover por medo de quebrar algo.\nBala de Prata: crença de que uma tecnologia resolve todos os problemas.\nYo-yo problem: hierarquia de herança excessivamente profunda.' },

  { id:'es_082', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão Command',
    verso:'Encapsula uma solicitação como objeto, permitindo parametrizar clientes com diferentes requisições, enfileirar ou logar requisições e suportar operações reversíveis (undo). Componentes: Command (interface execute()), ConcreteCommand, Invoker (chama execute), Receiver (realiza a ação). Usado em sistemas de menu, macros, transações.' },

  { id:'es_083', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão Template Method',
    verso:'Define esqueleto de um algoritmo na classe base, delegando alguns passos para subclasses. A classe base define o template (método final) com chamadas a métodos abstratos (hooks). Subclasses sobrepõem os hooks sem alterar a estrutura geral. Exemplo: classe AbstractReport com método generate() que chama header(), body(), footer() implementados nas subclasses.' },

  { id:'es_084', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Licenças de Software Open Source',
    verso:'MIT: permissiva; uso comercial, cópia, modificação livres; apenas manter o aviso de copyright.\nApache 2.0: como MIT + proteção de patentes.\nGPL (v2/v3): copyleft forte; software derivado deve ser GPL. "Viral".\nLGPL: copyleft fraco; pode linkar em software proprietário.\nBSD 2/3-clause: permissiva, similar ao MIT.\nCC0: domínio público.' },

  { id:'es_085', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Arquitetura Hexagonal (Ports and Adapters)',
    verso:'Alistair Cockburn: núcleo da aplicação (domínio + use cases) isolado de dependências externas (UI, banco, APIs) através de portas (interfaces) e adaptadores (implementações). "Driving side" (UI, testes) usa portas primárias; "Driven side" (banco, email) usa portas secundárias. Permite trocar banco sem tocar no domínio.' },

  { id:'es_086', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Message Queue — RabbitMQ e Kafka',
    verso:'RabbitMQ: broker AMQP, roteamento complexo (exchanges: direct, fanout, topic, headers), mensagens temporárias, ideal para tarefas assíncronas (e-mail, processamento de pagamento).\nApache Kafka: log distribuído e durável, alta vazão, retenção configurável, replay. Ideal para streaming de eventos. Consumidores em grupo lêem independentemente.' },

  { id:'es_087', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Domain Events e Event Sourcing',
    verso:'Domain Event: fato que aconteceu no domínio, expresso no passado (PedidoFoiAprovado, UsuarioCadastrado). Imutável e com timestamp.\nEvent Sourcing: estado atual da entidade é derivado da sequência de eventos. Permite auditoria completa, replay de eventos, projeções diferentes do mesmo estado. Complexidade: snapshots para evitar replay longo.' },

  { id:'es_088', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Fibonacci em Estimativas Ágeis',
    verso:'Por que usar sequência de Fibonacci (1, 2, 3, 5, 8, 13, 21, 34, 55, 89) em vez de números lineares?\nA incerteza cresce com o tamanho: estimativas maiores são intrinsecamente menos precisas, portanto a granularidade maior nesses valores é honesta. Itens com valores muito diferentes são reconhecidamente distintos. Itens com valor > 13 geralmente são quebrados.' },

  { id:'es_089', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Flyweight Pattern',
    verso:'Padrão estrutural que usa compartilhamento para suportar grande número de objetos de granularidade fina de forma eficiente. Separa estado intrínseco (compartilhado, imutável) do extrínseco (contexto, passado pelo cliente). Exemplo: editores de texto — objeto Character compartilhado para cada letra; posição é extrínseca. Reduz drasticamente o uso de memória.' },

  { id:'es_090', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Proxy Pattern',
    verso:'Fornece substituto ou placeholder para outro objeto, controlando acesso a ele. Tipos:\nVirtual Proxy: criação lazy de objeto pesado.\nProtection Proxy: controle de acesso.\nRemote Proxy: representação local de objeto remoto (RMI, CORBA).\nCaching Proxy: cache de resultados caros.\nLogging Proxy: registra chamadas ao objeto real.' },

  { id:'es_091', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Fault Tolerance — Circuit Breaker',
    verso:'Padrão (Nygard) que impede chamadas a serviço com falha, permitindo recuperação. Estados:\nClosed: chamadas passam normalmente; conta falhas.\nOpen: ao atingir threshold, bloqueia chamadas por tempo de timeout; retorna erro imediatamente.\nHalf-Open: após timeout, testa algumas chamadas; se OK, fecha; se falha, reabre.\nImplementado por Hystrix, Resilience4j.' },

  { id:'es_092', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'gRPC vs. REST',
    verso:'gRPC: RPC framework do Google. Usa Protocol Buffers (binary serialization) — mais eficiente que JSON. HTTP/2: multiplexação, streaming bidirecional. Contrato forte (proto file). Geração de código cliente/servidor em múltiplas linguagens. Ideal para comunicação interna entre microservices. REST: mais simples, melhor para APIs públicas.' },

  { id:'es_093', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'README e Documentação Mínima',
    verso:'README mínimo de projeto: título, descrição do que faz, pré-requisitos, como instalar, como executar, como testar, como contribuir, licença, contato.\nBadges: CI status, code coverage, versão, licença.\nDiagramas de arquitetura: Mermaid (em Markdown), draw.io, C4 Model (Context, Container, Component, Code).' },

  { id:'es_094', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Testes de Aceitação — BDD e Gherkin',
    verso:'BDD (Behavior-Driven Development): escreve testes na linguagem do negócio. Gherkin:\nGiven [contexto pré-condição]\nWhen [ação do usuário]\nThen [resultado esperado]\nAnd/But: complementa os outros.\nFerramentas: Cucumber (Java/JS/Ruby), Behave (Python), SpecFlow (.NET). Cenários executáveis como testes automatizados.' },

  { id:'es_095', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'NoSQL vs. SQL — quando usar',
    verso:'SQL (relacional): dados estruturados, relacionamentos complexos, ACID, queries ad-hoc, consistência forte. PostgreSQL, MySQL, Oracle.\nNoSQL: escalabilidade horizontal, esquema flexível, dados não-estruturados. Tipos: documento (MongoDB), chave-valor (Redis), coluna (Cassandra), grafo (Neo4j).\nEscolha baseada em: estrutura dos dados, padrões de acesso, escalabilidade e consistência requerida.' },

  { id:'es_096', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Modelo C4 de Documentação de Arquitetura',
    verso:'4 níveis de abstração (Simon Brown):\n1. Context: sistema no mundo — atores externos e sistemas adjacentes\n2. Container: aplicações, bancos, messaging dentro do sistema\n3. Component: componentes/módulos dentro de um container\n4. Code: classes/funções dentro de um componente (opcional)\nFerramenta: Structurizr DSL. Foco em comunicação, não em ferramenta de diagramação.' },

  { id:'es_097', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Gerenciamento de Backlog — Refinamento',
    verso:'Refinamento (Backlog Refinement/Grooming): cerimônia ágil onde o time revisa, detalha, estima e prioriza itens do Product Backlog. ~10% do tempo do sprint. DEEP: Detailed appropriately (detalhado suficientemente), Estimated (itens próximos estimados), Emergent (atualizado continuamente), Prioritized (priorizado pelo negócio).' },

  { id:'es_098', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Velocity no Scrum',
    verso:'Medida da quantidade de trabalho que um time consegue concluir em um sprint (em story points). Calculada como média dos últimos 3-5 sprints. Usada para planejamento (quantos sprints para terminar o backlog). Não deve ser usada para comparar times (cada time têm métricas distintas) nem como alvo de performance (desvirtua a estimativa).' },

  { id:'es_099', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão Adapter',
    verso:'Converte a interface de uma classe em outra interface esperada pelo cliente. Permite que classes incompatíveis trabalhem juntas. Tipos: Class Adapter (herança múltipla) e Object Adapter (composição, mais flexível).\nExemplo: adaptador para usar uma biblioteca legada com interface moderna; java.io.InputStreamReader adapta InputStream para Reader.' },

  { id:'es_100', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Twelve-Factor App',
    verso:'Metodologia para construir SaaS moderno (Heroku). Fatores principais:\n1. Codebase: 1 repo, múltiplos deploys\n2. Dependencies: declaradas explicitamente\n3. Config: armazenada em variáveis de ambiente\n4. Backing Services: banco, fila como recursos externos\n5. Build/Release/Run: estágios separados\n6. Processos stateless\n12. Logs como streams de eventos' },

  // ── Questões de Concurso ──────────────────────────────────────────────────
  { id:'es_101', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'SRE — Site Reliability Engineering',
    verso:'Disciplina do Google que aplica práticas de engenharia de software à operação de sistemas. Conceitos:\n• SLI (Service Level Indicator): métrica que mede o comportamento (ex.: latência p99).\n• SLO (Service Level Objective): meta para o SLI (ex.: 99,9% de requisições < 200ms).\n• SLA: compromisso contratual com penalidades.\n• Error Budget: margem de indisponibilidade permitida (100% - SLO). Quando esgota, novos lançamentos pausam.\nToil: trabalho manual, repetitivo — SRE reduz toil com automação.' },

  { id:'es_102', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'GitOps — Infraestrutura Declarativa',
    verso:'Paradigma onde o estado desejado da infraestrutura e aplicações é declarado em repositório Git. Um agente (ex.: ArgoCD, Flux) monitora o repo e aplica automaticamente as mudanças ao cluster. Operações de infraestrutura feitas via pull request (revisão, auditoria, rollback via git revert).\nBenefícios: compliance via código, rollback auditável, infraestrutura como código viva.' },

  { id:'es_103', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Feature Flags (Feature Toggles)',
    verso:'Mecanismo para controlar a visibilidade de funcionalidades em produção sem necessidade de novo deploy. Tipos:\n• Release toggle: esconde feature incompleta em trunk-based dev.\n• Experiment toggle: A/B testing.\n• Ops toggle: kill switch para feature problemática.\n• Permission toggle: libera por usuário/grupo.\nHabilita: deploys sem downtime, canary releases, dark launches, rollback instantâneo sem revert de código.' },

  { id:'es_104', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Difícil',
    frente:'Chaos Engineering',
    verso:'Prática de intencionalmente introduzir falhas em sistemas em produção para descobrir fraquezas antes que causem incidentes. "Break things on purpose to learn how to fix them." Origem no Netflix (Chaos Monkey — encerra instâncias aleatoriamente; Chaos Kong — derruba uma AZ inteira).\nPrincípios: hipótese sobre estado estável, eventos do mundo real, minimizar blast radius, execução em produção. Ferramentas: Chaos Mesh, Gremlin, AWS Fault Injection Simulator.' },

  { id:'es_105', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão CQRS — Command Query Responsibility Segregation',
    verso:'Separa as operações de leitura (Query) das de escrita (Command) em modelos/armazenamentos distintos. Escritas atualizam o modelo de escrita; leituras consultam o modelo de leitura (eventualmente consistente). Benefícios: escalabilidade independente para leitura e escrita, otimização de cada modelo. Frequentemente combinado com Event Sourcing. Aumenta complexidade: usar apenas quando necessário.' },

  { id:'es_106', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Trunk-Based Development — Pré-requisitos',
    verso:'Todos os desenvolvedores integram no trunk/main frequentemente (pelo menos diariamente). Pré-requisitos para funcionar:\n• Feature flags para funcionalidades incompletas.\n• Cobertura de testes alta (não quebrar o trunk).\n• Pipeline CI/CD rápido (feedback em minutos).\n• Code review assíncrono leve ou pair programming.\nContraponto ao Git Flow (long-lived branches). Padrão em empresas de alta performance (Google, Meta).' },

  { id:'es_107', banca:'FCC', materia:'Engenharia de Software', dificuldade:'Difícil',
    frente:'Padrão Saga — Transações Distribuídas',
    verso:'Padrão para gerenciar transações longas em microsserviços sem 2-phase commit distribuído. Uma saga é uma sequência de transações locais; cada transação publica evento e, em caso de falha, executa transação compensatória para desfazer.\nTipos:\n• Choreography: cada serviço reage a eventos dos outros (desacoplado, difícil de rastrear).\n• Orchestration: orquestrador central coordena (mais fácil de monitorar).\nDesafio: transações compensatórias idempotentes.' },

  { id:'es_108', banca:'Cebraspe', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'API Gateway — Função e Padrões',
    verso:'Ponto de entrada único para um conjunto de microsserviços. Responsabilidades: roteamento de requests, autenticação/autorização (JWT, OAuth), rate limiting, SSL termination, logging, circuit breaker, transformação de payload.\nPatterns: Backend for Frontend (BFF — API gateway específico para cada frontend Web/Mobile). Exemplos: AWS API Gateway, Kong, nginx, Traefik, Apigee.' },

  { id:'es_109', banca:'FGV', materia:'Engenharia de Software', dificuldade:'Médio',
    frente:'Padrão Circuit Breaker',
    verso:'Previne chamadas em cascata a serviços degradados. Estados:\n• Closed (normal): requisições fluem normalmente. Conta falhas.\n• Open (falha): requisições rejeitadas imediatamente, sem chamar o serviço. Tempo de espera configurável.\n• Half-Open (testando): uma requisição de teste; se passar, volta a Closed; se falhar, volta a Open.\nImplementações: Netflix Hystrix (deprecated), Resilience4j, spring-retry. Essencial em arquiteturas de microsserviços.' },

  { id:'es_110', banca:'IBFC', materia:'Engenharia de Software', dificuldade:'Fácil',
    frente:'Testes de Contrato (Contract Testing)',
    verso:'Verifica que a comunicação entre serviços (consumidor e produtor) está de acordo com um contrato pré-definido. Tipos:\n• Consumer-Driven Contract Testing: consumidor define o contrato; produtor verifica que o atende. Ferramenta: Pact.\nBenefício: permite evoluir APIs independentemente, sem testes de integração E2E completos para cada mudança. Essencial em arquiteturas de microsserviços para evitar breaking changes.' },
];
