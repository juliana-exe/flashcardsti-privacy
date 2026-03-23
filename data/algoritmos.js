// ─────────────────────────────────────────────────────────────────────────────
//  data/algoritmos.js — Algoritmos, Estruturas de Dados e Programação (80 cards)
// ─────────────────────────────────────────────────────────────────────────────

export default [
  // ── Complexidade ──────────────────────────────────────────────────────────
  { id:'alg_001', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Notação Big-O — Definição',
    verso:'Descreve o comportamento assintótico do algoritmo no pior caso, em relação ao tamanho da entrada n. Hierarquia (do mais ao menos eficiente):\nO(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)\nIgnora constantes e termos de menor ordem. Big-Ω: limite inferior (melhor caso). Big-Θ: limite apertado — cresce exatamente como f(n) tanto por cima quanto por baixo (ex.: Merge Sort é Θ(n log n) em todos os casos).' },

  { id:'alg_002', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Complexidade dos Principais Algoritmos de Busca',
    verso:'Busca linear: O(n) tempo, O(1) espaço. Melhor caso O(1).\nBusca binária: O(log n) tempo, O(1) espaço iterativo / O(log n) recursivo. Requer array ordenado.\nBusca em Hash Table: O(1) amortizado (colisões podem levar a O(n) no pior caso).\nBusca em BST balanceada (AVL, Vermelho-Negro): O(log n).' },

  { id:'alg_003', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Complexidade dos Algoritmos de Ordenação',
    verso:'Quadráticos O(n²): Bubble Sort, Selection Sort, Insertion Sort.\nO(n log n): Merge Sort (estável, garantido), Heap Sort (in-place), Quick Sort (médio O(n log n), pior O(n²)).\nLinear O(n): Counting Sort, Radix Sort, Bucket Sort (sob condições específicas).\nInsertion Sort eficiente para arrays quase ordenados (O(n) no melhor caso).' },

  { id:'alg_004', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Análise de Recorrências — Master Theorem',
    verso:'Para T(n) = aT(n/b) + f(n):\n• Se f(n) = O(n^(log_b(a) - ε)): T(n) = Θ(n^log_b(a)) — dominado pela recursão\n• Se f(n) = Θ(n^log_b(a)): T(n) = Θ(n^log_b(a) · log n)\n• Se f(n) = Ω(n^(log_b(a) + ε)): T(n) = Θ(f(n)) — dominado pelo trabalho externo\nExemplo: Merge Sort T(n)=2T(n/2)+n → Θ(n log n).' },

  // ── Ordenação ──────────────────────────────────────────────────────────────
  { id:'alg_005', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Quick Sort — Funcionamento e Pivô',
    verso:'Divide o array usando um pivô: elementos menores à esquerda, maiores à direita (partição). Recursivamente ordena as partições. Pior caso O(n²) quando o pivô é sempre o menor/maior (array já ordenado + escolha de primeiro elemento). Mitigações: pivô aleatório, median-of-three. In-place, O(log n) de espaço em recursão.' },

  { id:'alg_006', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Merge Sort — Funcionamento',
    verso:'Divide o array ao meio recursivamente até arrays de 1 elemento (sempre ordenados). Mescla dois arrays ordenados em um só (merge — O(n)). A mesclagem compara elementos dos dois arrays e insere em ordem. Complexidade: O(n log n) em todos os casos. Estável (mantém ordem relativa de iguais). Requer O(n) de espaço extra.' },

  { id:'alg_007', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Bubble Sort',
    verso:'Compara pares adjacentes repetidamente, trocando se fora de ordem. Cada passagem "bola" o maior elemento para o final. n-1 passagens completas. Complexidade: O(n²) pior e médio caso; O(n) melhor (array ordenado com flag de troca). Estável. Muito ineficiente na prática, mas simples de implementar e entender.' },

  { id:'alg_008', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Heap Sort',
    verso:'Usa heap máxima binária. Fase 1: constrói a heap a partir do array (heapify O(n)). Fase 2: extrai o máximo repetidamente (cada extração é O(log n)), reconstruindo o heap após cada extração. Total: O(n log n), in-place, O(1) espaço extra. Não estável. Melhor constante que merge sort no espaço, mas pior cache behavior que quick sort.' },

  { id:'alg_009', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Counting Sort',
    verso:'Ordenação não comparativa para inteiros em faixa conhecida [0, k]. Conta a frequência de cada valor em array auxiliar de tamanho k+1. Acumula as contagens. Posiciona cada elemento na posição correta. Complexidade: O(n + k). Ideal quando k = O(n). Estável. Base do Radix Sort (aplica counting sort por dígito).' },

  // ── Estruturas de Dados Lineares ──────────────────────────────────────────
  { id:'alg_010', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Array vs. Lista Encadeada',
    verso:'Array: acesso aleatório O(1); inserção/remoção no meio O(n) (desloca); memória contígua; cache friendly.\nLista encadeada: acesso O(n); inserção/remoção O(1) dado o nó; memória não-contígua; overhead por ponteiro.\nLista duplamente encadeada adiciona ponteiro prev. Circular: último aponta para o primeiro.\nEscolha: acesso frequente → array; inserções/remoções frequentes → lista.' },

  { id:'alg_011', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Pilha (Stack)',
    verso:'Estrutura LIFO (Last In, First Out). Operações: push (empilhar), pop (desempilhar), peek/top (consultar topo). Todas O(1).\nAplicações: avaliação de expressões (notação polonesa reversa), balanceamento de parênteses, DFS iterativo, chamadas de função (call stack), undo/redo.\nImplementada com array (alocação estática) ou lista encadeada.' },

  { id:'alg_012', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Fila (Queue)',
    verso:'Estrutura FIFO (First In, First Out). Operações: enqueue (inserir no fim), dequeue (remover do início). Ambas O(1).\nVariantes: Deque (double-ended queue — insere/remove em ambas as pontas); Priority Queue (dequeue retorna o elemento de maior prioridade, implementada com heap).\nAplicações: BFS, escalonamento de processos, buffer de mensagens.' },

  // ── Árvores ───────────────────────────────────────────────────────────────
  { id:'alg_013', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Árvore Binária de Busca (BST)',
    verso:'Propriedade: para cada nó N, todos os nós na subárvore esquerda têm chave menor que N, e na direita maior. Busca, inserção e remoção: O(h) onde h é a altura. Pior caso (árvore degenerada, ex: inserção em ordem): O(n). Traversal in-order produz a sequência ordenada.' },

  { id:'alg_014', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Árvore AVL — Balanceamento',
    verso:'BST auto-balanceada: o fator de balanceamento (altura subárvore esq − dir) deve estar em {-1, 0, 1}. Rotações para rebalancear após inserção/remoção: LL (rotação simples direita), RR (esquerda), LR (dupla esq-dir), RL (dir-esq). Busca/Inserção/Remoção garantidas O(log n). Mais estritamente balanceada que Rubro-Negra.' },

  { id:'alg_015', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Árvore Rubro-Negra (Red-Black Tree)',
    verso:'BST balanceada com propriedades de coloração: raiz preta, nós externos (NIL) pretos, nó vermelho só tem filhos pretos, todo caminho raiz-folha tem mesmo número de nós pretos (black-height). Garantia: h ≤ 2 log(n+1). Menos balanceada que AVL mas inserção/remoção mais rápidas. Usada em TreeMap (Java), std::map (C++), Linux scheduler.' },

  { id:'alg_016', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Heap Binária — Min-Heap e Max-Heap',
    verso:'Árvore binária completa que satisfaz propriedade do heap:\nMax-heap: pai ≥ filhos. Raiz = máximo.\nMin-heap: pai ≤ filhos. Raiz = mínimo.\nArmazenada em array: filho esq = 2i+1, dir = 2i+2, pai = (i-1)/2.\nInserção: adiciona no fim, sobe (heapify up) — O(log n).\nExtração do máx/mín: remove raiz, sobe o último, desce (heapify down) — O(log n).\nConstrução: O(n).' },

  { id:'alg_017', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Árvore B e B+',
    verso:'Árvore B: árvore de busca balanceada com múltiplos filhos por nó (ordem m: cada nó tem no máximo 2m chaves). Usada em sistemas de arquivos e bancos de dados para minimizar acessos a disco. Todas as folhas na mesma profundidade.\nÁrvore B+: variante onde dados ficam apenas nas folhas (ligadas em lista). Consultas por faixa eficientes. Padrão em índices de SGBD.' },

  { id:'alg_018', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Traversals em Árvore Binária',
    verso:'In-order (esq → raiz → dir): produz sequência ordenada em BST.\nPre-order (raiz → esq → dir): copia a árvore, serialização.\nPost-order (esq → dir → raiz): deleta a árvore, avaliação de expressão.\nLevel-order (BFS): visita nível por nível. Usa fila.\nTodas as traversals: O(n) tempo, O(h) espaço na pilha.' },

  // ── Grafos ────────────────────────────────────────────────────────────────
  { id:'alg_019', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Representação de Grafos — Matriz vs. Lista de Adjacência',
    verso:'Matriz de adjacência: M[i][j]=1 se há aresta i→j. O(V²) espaço. Verificar aresta: O(1). Listar vizinhos: O(V). Ideal para grafos densos.\nLista de adjacência: cada vértice tem lista de seus vizinhos. O(V+E) espaço. Listar vizinhos: O(grau). Ideal para grafos esparsos (maioria das aplicações).' },

  { id:'alg_020', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'BFS — Busca em Largura',
    verso:'Explora vértices por nível (camadas). Usa fila. Visita todos os vizinhos do vértice atual antes de avançar. Complexidade: O(V+E). Encontra o caminho mais curto (em número de arestas) em grafos não ponderados. Aplicações: menor caminho não ponderado, componentes conexos, bipartição, web crawler.' },

  { id:'alg_021', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'DFS — Busca em Profundidade',
    verso:'Explora o mais fundo possível antes de retroceder (backtrack). Usa pilha (recursão) ou pilha explícita. Complexidade: O(V+E). Classifica arestas em: tree, back (ciclo), forward, cross.\nAplicações: detecção de ciclos, ordenação topológica, componentes fortemente conectados (Tarjan, Kosaraju), resolução de labirintos.' },

  { id:'alg_022', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Algoritmo de Dijkstra',
    verso:'Menor caminho de um vértice fonte a todos os demais em grafos com pesos não-negativos. Usa fila de prioridade (min-heap). Relaxa arestas: se dist[u] + w(u,v) < dist[v], atualiza.\nComplexidade: O((V+E) log V) com heap binária; O(V²) com matriz.\nNão funciona com pesos negativos. Use Bellman-Ford para pesos negativos.' },

  { id:'alg_023', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Difícil',
    frente:'Bellman-Ford vs. Floyd-Warshall',
    verso:'Bellman-Ford: menor caminho de uma fonte a todos. Funciona com pesos negativos. Detecta ciclos negativos. O(VE).\nFloyd-Warshall: menor caminho entre todos os pares. Programação dinâmica, O(V³). Detecta ciclo negativo se d[i][i] < 0.\nDijkstra é mais eficiente (O(E log V)) mas exige pesos positivos.' },

  { id:'alg_024', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Árvore Geradora Mínima — Kruskal e Prim',
    verso:'Kruskal: ordena arestas por peso crescente; adiciona aresta se não cria ciclo (Union-Find). O(E log E). Eficiente para grafos esparsos.\nPrim: cresce a árvore a partir de um vértice; sempre adiciona a aresta mais barata que conecta a MST a um novo vértice. O(E log V) com heap.\nAmbos encontram a MST de um grafo conectado e ponderado.' },

  { id:'alg_025', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Union-Find (Disjoint Set Union)',
    verso:'Estrutura para gerenciar conjuntos disjuntos. Operações: find(x) — raiz do conjunto de x; union(x, y) — une os conjuntos.\nOtimizações: Union by rank (árvore menor sob maior) + Path compression (aplana caminho no find).\nComplexidade amortizada: quase O(1) por operação — O(α(n)), onde α é a função inversa de Ackermann.' },

  { id:'alg_026', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Ordenação Topológica',
    verso:'Ordem linear dos vértices de um DAG (grafo acíclico dirigido) tal que para toda aresta u→v, u aparece antes de v. Algoritmos:\n1. Kahn: BFS + grau de entrada. Remove vértices com grau=0 iterativamente.\n2. DFS: executar DFS e inserir vértices em pilha ao finalizar (post-order). Reverter a pilha.\nAplicações: compilação de dependências, makefiles, pipelines.' },

  // ── Tabelas Hash ──────────────────────────────────────────────────────────
  { id:'alg_027', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Tabela Hash — Colisões',
    verso:'Colisão: duas chaves mapeiam para o mesmo índice. Tratamento:\nChainning (encadeamento): cada bucket é uma lista encadeada. Pior caso O(n).\nOpen addressing: busca próximo slot livre. Variantes: linear probing (clustering!), quadratic probing, double hashing.\nFator de carga λ = n/m. Para bom desempenho: λ < 0,7. Rehashing duplica a tabela quando λ excede o limiar.' },

  { id:'alg_028', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Função de Hash — Propriedades',
    verso:'Boa função de hash distribui chaves uniformemente. Métodos para inteiros: divisão (k mod m — m primo), multiplicação (fração de k*A mod 1).\nPara strings: polynomial rolling hash. Propriedades desejadas: determinismo, uniformidade, efeito avalanche (pequena mudança → mudança grande no hash), rápida de computar. SHA-256 não é hash de tabela.' },

  // ── Programação Dinâmica ──────────────────────────────────────────────────
  { id:'alg_029', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Difícil',
    frente:'Programação Dinâmica — Princípio',
    verso:'Técnica para resolver problemas com subestrutura ótima e subproblemas sobrepostos. Abordagens:\nTop-down (memoização): recursão + cache de resultados.\nBottom-up (tabulação): preenche tabela da solução menor para a maior (iterativo).\nProblemas clássicos: Fibonacci, Mochila 0/1, LCS (Longest Common Subsequence), LIS, Edit Distance, Coin Change.' },

  { id:'alg_030', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Difícil',
    frente:'Problema da Mochila 0/1',
    verso:'N itens com peso wᵢ e valor vᵢ; mochila com capacidade W. Maximizar valor sem exceder W. DP: dp[i][w] = max valor usando os primeiros i itens com capacidade w.\ndp[i][w] = max(dp[i-1][w], dp[i-1][w-wᵢ] + vᵢ) se wᵢ ≤ w.\nComplexidade: O(nW) tempo e espaço (pseudo-polinomial). NP-hard na prática pois W pode ser exponencial.' },

  { id:'alg_031', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Difícil',
    frente:'LCS — Longest Common Subsequence',
    verso:'Subsequência comum mais longa de duas strings X e Y. DP:\nSe X[i]=Y[j]: LCS[i][j] = LCS[i-1][j-1] + 1\nSenão: LCS[i][j] = max(LCS[i-1][j], LCS[i][j-1])\nO(mn) tempo e espaço. Diferente de Longest Common Substring (contígua). Aplicações: diff de arquivos, bioinformática (alinhamento de DNA), controle de versão.' },

  { id:'alg_032', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Algoritmo Guloso (Greedy)',
    verso:'Faz a escolha localmente ótima a cada passo esperando chegar ao ótimo global. Funciona quando há propriedade da escolha gulosa e subestrutura ótima. Exemplos que funcionam: Problema do Troco (moedas), MST (Kruskal/Prim), Dijkstra, Huffman Coding, Activity Selection.\nNem sempre ótimo: Mochila 0/1, Caixeiro Viajante (usa heurística).' },

  { id:'alg_033', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Algoritmo de Huffman',
    verso:'Compressão lossless: atribui códigos de tamanho variável às símbolos, com códigos mais curtos para símbolos mais frequentes. Constrói árvore de Huffman bottom-up usando min-heap: combina os dois nós de menor frequência repetidamente. Prefixo livre (nenhum código é prefixo de outro). O(n log n). Base do gzip, JPEG.' },

  // ── Recursão e Backtracking ───────────────────────────────────────────────
  { id:'alg_034', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Recursão — Tail Recursion',
    verso:'Recursão de cauda: a chamada recursiva é a última operação (sem operação pendente após o retorno da chamada). Compiladores podem otimizar como loop (TCO — Tail Call Optimization), evitando crescimento da pilha. Ex: fat_acc(n, acum) = se n=0 retorna acum, senão fat_acc(n-1, n*acum). Linguagens funcionais dependem de TCO.' },

  { id:'alg_035', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Backtracking — N-Rainhas',
    verso:'Técnica que explora todas as possibilidades e retrocede ao encontrar beco sem saída. N-rainhas: posiciona N rainhas em tabuleiro NxN sem ataques. Coloca rainha coluna a coluna; se conflito, remove e tenta próxima linha. Complexidade exponencial no pior caso. Podas (constraint propagation) melhoram desempenho.' },

  { id:'alg_036', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Divisão e Conquista',
    verso:'Divide o problema em subproblemas menores, resolve recursivamente e combina. Exemplos: Merge Sort, Quick Sort, Busca Binária, Algoritmo de Strassen (multiplicação de matrizes O(n^2.81)), Karatsuba (multiplicação de inteiros O(n^1.58)), FFT.\nA recorrência T(n) = aT(n/b) + f(n) é analisada pelo Master Theorem.' },

  // ── Estruturas Avançadas ──────────────────────────────────────────────────
  { id:'alg_037', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Difícil',
    frente:'Segment Tree e Fenwick Tree',
    verso:'Segment Tree: árvore binária sobre intervalos de um array. Cada nó armazena resultado de uma função no intervalo (soma, min, max). Consulta de intervalo: O(log n). Atualização pontual: O(log n).\nFenwick Tree (Binary Indexed Tree): mais simples, menor constante. Soma de prefixos e atualização: O(log n). Menos versátil que Segment Tree.' },

  { id:'alg_038', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Trie (Árvore de Prefixos)',
    verso:'Árvore onde cada nó é um caractere. Caminhos da raiz às folhas formam palavras. Inserção/busca de palavra de comprimento L: O(L). Uso de memória: O(ALPHABET_SIZE * L * N). Aplicações: autocomplete, verificação ortográfica, roteamento IP (Patricia Trie), compressão. Prefix search eficiente que hash tables não oferecem.' },

  { id:'alg_039', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Skip List',
    verso:'Lista encadeada com múltiplos níveis de "atalhos". Cada nível pula aproximadamente metade dos elementos. Busca, inserção e remoção: O(log n) esperado com probabilidade 1/2 para subir de nível. Alternativa às árvores balanceadas, mais simples de implementar com bom desempenho. Usada no Redis para sorted sets.' },

  // ── Linguagens e Paradigmas ───────────────────────────────────────────────
  { id:'alg_040', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Paradigmas de Programação',
    verso:'Imperativo: sequência de comandos que mudam o estado. Sub-paradigmas:\n• Procedural: funções/procedimentos (C, Pascal)\n• OO: objetos contêm dados e comportamentos (Java, Python, C++)\nDeclarativo: descreve o quê, não o como.\n• Funcional: funções como cidadãos de 1ª classe, imutabilidade (Haskell, Erlang; features em Java, Python)\n• Lógico: regras e fatos (Prolog)' },

  { id:'alg_041', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Programação Funcional — Conceitos',
    verso:'Funções puras: mesmo input → mesmo output, sem efeitos colaterais.\nImutabilidade: valores não mudam após criação.\nFunções de primeira classe: passadas como parâmetros, retornadas de funções.\nHigher-order functions: map, filter, reduce.\nCurrying: f(a, b) → f(a)(b).\nComposição: g(f(x)).\nLaziness (avaliação preguiçosa): calcula sob demanda. Benefícios: testabilidade, concorrência segura.' },

  { id:'alg_042', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Tipos de Linguagem — Compilada vs. Interpretada',
    verso:'Compilada: código-fonte traduzido para linguagem de máquina antecipadamente. Executável nativo, mais rápido. Ex: C, C++, Rust, Go.\nInterpretada: traduzida linha a linha em tempo de execução. Mais portável, mais lenta. Ex: Python (CPython), Ruby, PHP.\nHíbrida (bytecode + JVM/JIT): compilada para bytecode, depois JIT (Just-In-Time) para código nativo. Ex: Java, C#, Kotlin, Python (PyPy).' },

  { id:'alg_043', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Tipagem — Estática e Dinâmica, Forte e Fraca',
    verso:'Estática: tipos verificados em tempo de compilação (Java, C++, Rust, TypeScript). Erros de tipo detectados cedo.\nDinâmica: tipos verificados em tempo de execução (Python, JavaScript, Ruby). Mais flexível.\nForte: operações implícitas entre tipos incompatíveis geram erro (Python: "1" + 1 → TypeError).\nFraca: conversão implícita (JavaScript: "1" + 1 → "11").' },

  { id:'alg_044', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Garbage Collection — Algoritmos',
    verso:'GC automático libera memória não alcançável das raízes (variáveis ativas).\nRef counting: conta referências; coleta quando = 0. Problema: ciclos. (PHP, Python + cyclic detector).\nMark-and-Sweep: marca objetos alcançáveis, varre e libera os não marcados. Pausa (stop-the-world).\nGenerational GC (JVM, V8): objetos jovens coletados frequentemente, velhos raramente. Hipótese geracional.' },

  { id:'alg_045', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Concorrência — Thread Safety e Lock',
    verso:'Thread-safe: código funciona corretamente quando executado por múltiplas threads. Técnicas:\n• Imutabilidade: objetos sem estado mutável\n• Sincronização: locks, synchronized (Java), mutex\n• Atomic operations: CAS (Compare-And-Swap), sem lock\n• Thread-local storage: cada thread tem sua cópia\nProblemas: deadlock, livelock, starvation, false sharing em cache.' },

  // ── Conceitos de Compiladores ─────────────────────────────────────────────
  { id:'alg_046', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Fases de um Compilador',
    verso:'Front-end:\n1. Análise léxica (lexer/tokenizer): código → tokens\n2. Análise sintática (parser): tokens → AST\n3. Análise semântica: verificação de tipos/escopo\nBack-end:\n4. Geração de código intermediário (IR)\n5. Otimizações (eliminação de código morto, inlining)\n6. Geração de código final (bytecode/assembly)' },

  { id:'alg_047', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Expressões Regulares — Meta-caracteres',
    verso:'. (qualquer char), * (0+), + (1+), ? (0 ou 1), ^ (início), $ (fim), [] (classe), [^] (negação), | (ou), () (grupo), \\ (escape).\nQuantificadores gulosos vs. preguiçosos: .* versus .*?\nGrupos nomeados: (?P<nome>...)\nAplicação: lexer, validação, busca/substitução. Complexidade O(n) para FA determinístico; pode ser exponencial para backtracking NFA sem cuidado.' },

  { id:'alg_048', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'NP, NP-Hard, NP-Completo',
    verso:'P: problemas resolvíveis em tempo polinomial.\nNP: soluções verificáveis em tempo polinomial.\nNP-completo: NP + NP-hard (todo problema NP reduz a ele em tempo polinomial). Exemplos: SAT, Clique, Vertex Cover, Mochila, Caixeiro Viajante.\nNP-hard: pelo menos tão difícil quanto NP-completo (mas pode não estar em NP).\nP=NP? Questão em aberto (Millenium Prize).' },

  { id:'alg_049', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Ponteiros e Aritmética de Ponteiros (C/C++)',
    verso:'Ponteiro: variável que armazena endereço de memória. int *p = &x; *p (dereference) acessa o valor. p++ avança sizeof(int) bytes.\nPonteiro nulo: NULL / nullptr. Ponteiro dangling: aponta para memória já liberada. Buffer overflow: escrita além do final do array. Smart pointers (C++11): unique_ptr, shared_ptr (ref counting), weak_ptr.' },

  // ── Algoritmos Específicos ─────────────────────────────────────────────────
  { id:'alg_050', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Busca Binária — Implementação',
    verso:'Array ordenado. Compara elemento do meio com target: igual → encontrou; menor → busca na metade direita; maior → esquerda. Iterativo é preferido (sem overhead de pilha).\nImplementação com cuidado: mid = low + (high-low)/2 (evita overflow em int). Variantes: first occurrence, last occurrence, lower_bound, upper_bound (busca pela 1ª posição ≥ target).' },

  { id:'alg_051', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Problema dos Dois Ponteiros',
    verso:'Técnica eficiente para arrays/listas ordenados. Dois ponteiros (início e fim, ou lento e rápido) movem-se de acordo com condições:\nTwo sum em array ordenado: O(n) vs O(n log n) com busca binária.\nDetecção de ciclo em lista (Floyd): lento avança 1, rápido avança 2; se se encontram, há ciclo.\nContainer with most water. Sliding Window para subarray de soma máxima.' },

  { id:'alg_052', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Notação Polonesa Reversa (RPN)',
    verso:'Expressa operações matemáticas sem parênteses, com o operador após os operandos. Avaliação com pilha: ao ler número → push; ao ler operador → pop dois operandos, calcula, push resultado.\nEx: 3 4 + 2 × = (3+4)×2 = 14.\nUsado em calculadoras HP, parsing de compiladores. Shunting-Yard algorithm converte infix para RPN.' },

  { id:'alg_053', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Algoritmo KMP — Busca de Padrão em String',
    verso:'Knuth-Morris-Pratt: busca padrão P em texto T em O(n+m), evitando comparações redundantes. Pré-processa uma tabela de falha (failure function) que indica o maior prefixo-sufixo próprio de cada prefixo de P. Ao haver mismatch, desloca o padrão conforme a tabela sem recomeçar do início. Alternativas: Boyer-Moore (na prática mais rápido), Rabin-Karp (hash).' },

  { id:'alg_054', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Componentes Fortemente Conectados (SCC)',
    verso:'Num grafo dirigido, SCC é conjunto máximo de vértices onde existe caminho de qualquer vértice a qualquer outro.\nKosaraju: 2 DFS (original + grafo invertido) — O(V+E).\nTarjan: 1 DFS com pilha e low-link values — O(V+E).\nAplicações: análise de dependências, compressão de grafos, reachability.' },

  { id:'alg_055', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Problema do Fluxo Máximo',
    verso:'Ford-Fulkerson: aumenta fluxo por caminhos de s a t no grafo residual enquanto existir. Complexidade O(E × f) onde f é o fluxo máximo.\nEdmonds-Karp: Ford-Fulkerson + BFS para achar caminho aumentante mais curto → O(VE²).\nTheorema max-flow min-cut: fluxo max = capacidade do corte mínimo. Aplicações: redes de transporte, matching bipartido.' },

  { id:'alg_056', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Recursão vs. Iteração',
    verso:'Recursão: mais elegante para problemas naturalmente recursivos (árvores, grafos, divisão e conquista). Overhead por chamadas de função e uso de pilha. Risco de stack overflow.\nIteração: geralmente mais eficiente em tempo e espaço. Mais verbosa para certos problemas.\nEmpiria: prefira iteração por padrão; use recursão quando tornar o código significativamente mais claro.' },

  { id:'alg_057', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Amortized Analysis',
    verso:'Analisa o custo médio de operações em uma sequência, mesmo que operações individuais possam ser caras. Métodos: agregado (custo total / n operações), banker\'s (créditos), physicist\'s (função potencial).\nExemplo: inserção em array dinâmico (ArrayList). Custo amortizado por inserção = O(1) mesmo com redimensionamentos O(n) ocasionais.' },

  { id:'alg_058', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Treap (Tree + Heap)',
    verso:'BST de chaves com prioridades aleatórias satisfazendo propriedade de heap. Mantida com rotações em inserção/remoção. Comportamento esperado O(log n). Mais simples que AVL ou Red-Black Tree para implementar corretamente. Prioridades aleatórias garantem balanceamento esperado sem lógica explícita de rotação balanceada.' },

  { id:'alg_059', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Difícil',
    frente:'Programação Dinâmica — Edit Distance',
    verso:'Distância de Levenshtein: mínimo de edições (inserção, remoção, substituição) para transformar string A em B.\ndp[i][j] = custo para converter A[0..i] em B[0..j].\nSe A[i]==B[j]: dp[i][j]=dp[i-1][j-1]\nSenão: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\nO(mn) tempo e espaço. Aplicações: spell checking, DNA alignment.' },

  { id:'alg_060', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'B-Tree vs. LSM Tree',
    verso:'B-Tree: balanceada, bom para leituras e atualizações aleatórias. Padrão em SGBD tradicionais (MySQL InnoDB, PostgreSQL).\nLSM Tree (Log-Structured Merge): otimizada para escritas. Dados escritos em memória (MemTable), depois compactados em disco (SST files). Leituras mais lentas (múltiplos níveis). Usada em RocksDB, LevelDB, Cassandra, HBase.' },

  { id:'alg_061', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Algoritmo A* (A Star)',
    verso:'Algoritmo de pathfinding que combina Dijkstra (custo real g(n)) com heurística admissível h(n). F(n) = g(n) + h(n).\nHeurística admissível: nunca superestima o custo. Ex: distância euclidiana ou Manhattan para grid.\nOtimal: garante caminho mais curto se h for admissível. Mais eficiente que Dijkstra puro por guiar a busca. Usado em mapas, jogos, robótica.' },

  { id:'alg_062', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Fila de Prioridade — Implementação',
    verso:'Implementada com heap binária. Operações:\ninsert: adiciona no final e sobe (sift up) — O(log n).\nextractMax/Min: remove raiz, move último elemento para raiz, desce (sift down) — O(log n).\npeek: O(1).\nconstrução a partir de array: O(n) via heapify.\nFila de prioridade com deleção arbitrária requer referência ao índice (handle) ou lazy deletion.' },

  { id:'alg_063', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Problema da Subsequência Crescente Máxima (LIS)',
    verso:'Maior subsequência donde elementos são estritamente crescentes. DP ingênua: O(n²). Otimizado com árvore de busca ou patience sorting: O(n log n). Patience sorting usa pilhas que representam "piles" da sequência de cartas; tamanho da menor pilha por posição encontrado com busca binária. Aplica em algoritmos de diff e bioinformática.' },

  { id:'alg_064', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Deque — Double-Ended Queue',
    verso:'Fila de duas pontas: insere e remove tanto na frente quanto no final, todos O(1). Implementado com array circular ou lista duplamente encadeada.\nAplicações: sliding window maximum (deslizante, monitora máximo em janela); algoritmo de escalonamento work-stealing; palíndromo (verifica de ambas as pontas). std::deque em C++, ArrayDeque em Java.' },

  { id:'alg_065', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Hashing Consistente (Consistent Hashing)',
    verso:'Técnica para distribuir chaves em nodes de forma que ao adicionar/remover um node, apenas K/n chaves precisam ser remapeadas (K = total chaves, n = nodes). Anel hash: todos os nodes e chaves são mapeados em anel [0, 2^32). Chave vai para o próximo node no sentido horário. Virtual nodes melhoram distribuição. Usado em Cassandra, DynamoDB, CDNs.' },

  { id:'alg_066', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Algoritmos de String — Z-Function',
    verso:'Z[i] = comprimento do maior prefixo da string S que também é prefixo de S[i..]. Z[0] indefinido. Útil para: busca de padrão em O(n+m) (concatena P + "$" + T; posições onde Z ≥ |P| são matches), contagem de substrings distintas, períodos de strings. Alternativa ao KMP, mais fácil de implementar.' },

  { id:'alg_067', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Complexidade de Operações — Java Collections',
    verso:'ArrayList: get/set O(1), add O(1) amortizado, remove(index) O(n).\nLinkedList: add/remove inicio e fim O(1), get O(n).\nHashMap: get/put/remove O(1) amortizado, O(n) pior.\nTreeMap: get/put/remove O(log n), ordenado.\nHashSet: O(1) amortizado. TreeSet: O(log n), ordenado.\nPriorityQueue: peek O(1), poll/add O(log n).' },

  { id:'alg_068', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Algoritmos Randomizados',
    verso:'Usam aleatoriedade para obter bom desempenho esperado. Tipos:\nLas Vegas: sempre correto, tempo aleatório (ex: randomized quicksort).\nMonte Carlo: resultado pode estar errado com probabilidade pequena (ex: Miller-Rabin para primalidade, Bloom Filter).\nAplicações: hashing universal, skip list, randomized BST, algoritmos aproximados para NP-hard.' },

  { id:'alg_069', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Bloom Filter',
    verso:'Estrutura probabilística para testar pertinência (set membership). Usa array de bits + k funções de hash. Inserção: seta k posições. Consulta: verifica k posições. Falso positivo é possível (retorna "sim" para item ausente). Falso negativo: impossível.\nUso de espaço: muito eficiente. Aplicado em databases (evita disk reads), web caches, spell checkers, CDNs.' },

  { id:'alg_070', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Algoritmo de Euclides — MDC',
    verso:'MDC(a, b) = MDC(b, a mod b). Base: MDC(a, 0) = a. Eficiente: O(log min(a,b)) divisões.\nMMC(a,b) = a*b / MDC(a,b).\nAlgoritmo de Euclides Estendido: encontra x, y tais que ax + by = MDC(a,b). Útil para inversão modular (a^-1 mod m). Base para criptografia RSA (inversão modular no cálculo da chave privada).' },

  { id:'alg_071', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Sliding Window — Técnica',
    verso:'Mantém uma janela de tamanho variável ou fixo sobre um array/string. Expande ao adicionar elemento à direita; contrai ao remover da esquerda. O(n) em vez de O(n²) para problemas de subarray.\nExemplos: maximum sum subarray de tamanho k, menor subarray com soma ≥ S, maior substring sem repetição. Variante: dois ponteiros para strings.' },

  { id:'alg_072', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Bit Manipulation — Operações',
    verso:'AND (&): verifica flags, limpa bits.\nOR (|): seta bits.\nXOR (^): inverte bits; a XOR a = 0; a XOR 0 = a. Usado para troca sem temporário e detecção de número único.\nNOT (~): inverte todos os bits.\nLeft shift (<<): multiplica por 2.\nRight shift (>>): divide por 2.\nVerificar bit i: (n >> i) & 1. Setar bit i: n | (1 << i). Limpar: n & ~(1 << i).' },

  { id:'alg_073', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Números Primos — Crivo de Eratóstenes',
    verso:'Encontra todos os primos até N. Inicializa array booleano verdadeiro. Para cada i de 2 a √N: se primo[i], marca múltiplos i² em diante como compostos. Complexidade: O(n log log n). Memória: O(n).\nVariante: Crivo Segmentado para N muito grande. Crivo Linear: O(n) assintótico. Teste de primalidade individual: Miller-Rabin probabilístico O(k log²n).' },

  { id:'alg_074', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Exponenciação Rápida (Fast Exponentiation)',
    verso:'Calcula a^n em O(log n) multiplicações. Baseado em:\na^n = (a²)^(n/2) se n par\na^n = a × a^(n-1) se n ímpar\nVersão modular: (a^n mod m) — usada em criptografia (RSA, Diffie-Hellman). Evita overflow ao aplicar mod a cada passo: (a*b) mod m. Também chamado de binary exponentiation.' },

  { id:'alg_075', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Interpolação e Extrapolação — Spline',
    verso:'Interpolação linear: estima valor entre dois pontos com reta.\nInterpolação polinomial: polinômio de grau n-1 passa por n pontos (Lagrange, Newton). Instável para graus altos (fenômeno de Runge).\nSpline cúbica: polinômios de grau 3 por partes, com continuidade de derivadas. Smooth e estável.\nKNN para dados discretos. Usados em gráficos, animações, simulações físicas.' },

  { id:'alg_076', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Métodos de Acesso em OO — get/set',
    verso:'Encapsulamento: atributos privados acessados via getters (leitura) e setters (escrita). Permite validação no setter, lazy loading no getter, monitoramento e logging.\nJava Beans: padrão getNome(), setNome(), isAtivo(). Frameworks (Hibernate, Jackson) usam convenção de naming para refletir campos automaticamente. Lombok: @Getter @Setter gera automaticamente.' },

  { id:'alg_077', banca:'FCC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Princípio da Localidade e Cache CPU',
    verso:'Localidade temporal: dados recentemente acessados serão acessados novamente. Cache guarda cópias quentes.\nLocalidade espacial: dados próximos ao acessado também serão usados. Cache line (64 bytes) carrega vizinhança.\nImplicações: percorrer arrays em ordem de linhas (row-major) é mais rápido que em colunas em C/Java. Estruturas com boa localidade: array > lista encadeada. Cache-friendly algorithms.' },

  { id:'alg_078', banca:'Cebraspe', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Lazy Evaluation e Streams',
    verso:'Avaliação preguiçosa: expressão não é calculada até que seu resultado seja necessário. Permite trabalhar com sequências infinitas e otimizar pipelines.\nJava Streams: operações intermediárias (filter, map) são lazy. Terminal (collect, forEach, reduce) dispara a execução. Evita processar elementos desnecessários em operações encadeadas com findFirst() ou limit().' },

  { id:'alg_079', banca:'FGV', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Médio',
    frente:'Serialização e Deserialização',
    verso:'Serialização: converter objeto em formato transmissível/armazenável (JSON, XML, Protobuf, Avro, MessagePack).\nDesserialização: reconstruir objeto a partir do formato.\nConsiderações de segurança: desserialização de dados não confiáveis pode causar execução de código arbitrário (Java deserialization vulnerabilities).\nJSON: legível, verboso. Protobuf: binário, compacto, tipado. Avro: schema evolutivo.' },

  { id:'alg_080', banca:'IBFC', materia:'Algoritmos e Estruturas de Dados', dificuldade:'Fácil',
    frente:'Recursão — Torres de Hanói',
    verso:'Mover n discos do pino A para C usando B auxiliar. Regras: só mover 1 disco por vez; disco maior nunca sobre menor.\nSolução recursiva: mover n-1 discos de A para B, mover disco n de A para C, mover n-1 de B para C.\nNúmero mínimo de movimentos: 2^n - 1. O(2^n).\nDemonstra elegância da recursão; problema com estrutura recursiva natural.' },

  // ── Questões de Concurso ──────────────────────────────────────────────────
  {
    id: 'alg_081',
    banca: 'Cebraspe',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Difícil',
    frente: 'Rabin-Karp — Busca de Padrão em String',
    verso: 'Algoritmo de busca de substring usando hashing rolante. Calcula hash do padrão P e de cada janela de tamanho |P| no texto T. Se os hashes batem, verifica caractere a caractere (evita falsos positivos).\nHash rolante: remove char saindo, adiciona char entrando em O(1). Complexidade: O(n + m) caso médio, O(nm) pior caso (muitas colisões). Ideal para busca de múltiplos padrões simultaneamente (Aho-Corasick para conjunto fixo).',
  },
  {
    id: 'alg_082',
    banca: 'FGV',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Difícil',
    frente: 'Segment Tree — Consultas em Intervalos',
    verso: 'Árvore binária onde cada nó armazena o resultado de uma operação sobre um intervalo do array (soma, mínimo, máximo, GCD). Construção: O(n). Query e Update pontuais: O(log n). Lazy propagation: adiar atualizações em intervalo, atualiza só quando necessário — Range Update + Range Query em O(log n).\nUsada em consultas de soma/mínimo em subarrays com atualizações frequentes. Alternativa: Fenwick Tree (BIT) para casos restritos.',
  },
  {
    id: 'alg_083',
    banca: 'FCC',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Difícil',
    frente: 'Algoritmo de Dijkstra vs Bellman-Ford',
    verso: 'Dijkstra: menor caminho em grafos com pesos não-negativos. Greedy com priority queue (min-heap). O((V + E) log V). Não funciona com arestas negativas.\nBellman-Ford: funciona com pesos negativos. Relaxa todas as arestas V-1 vezes. O(VE). Detecta ciclos negativos (se ainda há relaxamento na V-ésima iteração → ciclo negativo).\nFloyd-Warshall: todos os pares de caminhos mínimos, O(V³). A*: Dijkstra com heurística admissível para busca orientada a destino.',
  },
  {
    id: 'alg_084',
    banca: 'Cebraspe',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Médio',
    frente: 'Problema da Mochila (Knapsack)',
    verso: '0/1 Knapsack: cada item pode ser incluído ou não. Recorrência DP: dp[i][w] = max(dp[i-1][w], dp[i-1][w-p[i]] + v[i]). O(nW).\nFractional Knapsack: itens divisíveis → solução Greedy por valor/peso. O(n log n).\nUnbounded Knapsack: cada item pode ser usado quantas vezes. dp[w] = max(dp[w], dp[w-p[i]] + v[i]).\nMeet-in-the-middle: para n~40 itens, divide em 2 metades — O(2^(n/2)).',
  },
  {
    id: 'alg_085',
    banca: 'FGV',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Difícil',
    frente: 'Algoritmos de Ordenação — Estabilidade',
    verso: 'Estável: preserva ordem relativa de elementos com chave igual.\nEstáveis: Merge Sort, Insertion Sort, Bubble Sort, Tim Sort (Python/Java padrão), Counting Sort, Radix Sort.\nInstáveis: Quick Sort (partição padrão), Heap Sort, Shell Sort, Selection Sort.\nTim Sort (Python): híbrido adaptativo Merge Sort + Insertion Sort. O(n log n) pior caso, O(n) para dados quase ordenados. Usado no Java Arrays.sort() para objetos e Python sorted().',
  },
  {
    id: 'alg_086',
    banca: 'FCC',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Médio',
    frente: 'Contagem de Inversões em Array',
    verso: 'Par (i, j) é inversão se i < j e A[i] > A[j]. Número de inversões mede quão "desordenado" está o array (0 = ordenado, n(n-1)/2 = inversamente ordenado).\nAlgoritmo eficiente: Merge Sort modificado — ao fundir, conta elementos do lado esquerdo maiores que os da direita. O(n log n), O(n) espaço.\nAplicações: ranking de similaridade entre listas (coeficiente de Kendall τ), análise de algoritmos de ordenação por inversões (Insertion Sort: O(n + inversões)).',
  },
  {
    id: 'alg_087',
    banca: 'Cebraspe',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Médio',
    frente: 'Trie (Árvore de Prefixos)',
    verso: 'Árvore multiway onde cada nó representa um caractere. Strings compartilham prefixos comuns. Nó folha (ou flag isEnd) marca término de palavra.\nOperações: insert, search, startsWith — todas O(m), onde m = tamanho da string, independente do número de strings.\nVantagem sobre HashMap: suporte a busca por prefixo, autocompletar, ordenação lexicográfica. Desvantagem: uso de memória alto.\nVariante: Compressed Trie (Patricia Tree) compacta caminhos únicos.',
  },
  {
    id: 'alg_088',
    banca: 'FGV',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Difícil',
    frente: 'Algoritmo de Floyd para Detecção de Ciclo',
    verso: 'Floyd\'s Cycle Detection ("tortoise and hare"): dois ponteiros percorrem a lista — lento (1 passo) e rápido (2 passos). Se houver ciclo, se encontram.\nFase 1 — Detecção: rápido alcança lento dentro do ciclo.\nFase 2 — Localização: reinicia um ponteiro no início, ambos avançam 1 passo; encontram-se exatamente no início do ciclo.\nComplexidade: O(n) tempo, O(1) espaço. Aplicação: encontrar ciclo em linked lists, detectar duplicata em array de n+1 inteiros em [1,n].',
  },
  {
    id: 'alg_089',
    banca: 'FCC',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Médio',
    frente: 'Longest Common Subsequence (LCS)',
    verso: 'LCS: maior subsequência comum a duas strings X e Y (elementos não precisam ser contíguos). Recorrência DP:\n• Se X[i] == Y[j]: dp[i][j] = dp[i-1][j-1] + 1\n• Senão: dp[i][j] = max(dp[i-1][j], dp[i][j-1])\nComplexidade: O(mn) tempo e espaço. Otimização espaço: O(min(m,n)).\nLCS vs LIS: LIS (Longest Increasing Subsequence) em um array — O(n log n) com binary search (algoritmo de Patience Sorting).',
  },
  {
    id: 'alg_090',
    banca: 'IBFC',
    materia: 'Algoritmos e Estruturas de Dados',
    dificuldade: 'Médio',
    frente: 'Union-Find (Disjoint Set Union)',
    verso: 'Estrutura de dados para gerenciar partições de conjuntos disjuntos. Operações: find(x) — retorna representante do conjunto de x; union(x, y) — une conjuntos de x e y.\nOtimizações: Path Compression (find achatado) + Union by Rank/Size. Com ambas: operações em O(α(n)) amortizado — praticamente O(1) (função inversa de Ackermann).\nAplicações: algoritmo de Kruskal (MST), detecção de ciclos em grafos não-dirigidos, componentes conectados, percolation.',
  },
];
