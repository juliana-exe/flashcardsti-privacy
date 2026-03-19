// ─────────────────────────────────────────────────────────────────────────────
//  data/bancoDados.js — Banco de Dados
// ─────────────────────────────────────────────────────────────────────────────

export default [
  {
    id: 'bd_001',
    banca: 'FCC',
    materia: 'Banco de Dados',
    frente: 'Propriedades ACID',
    verso:
      'Garantias de confiabilidade em transações:\n\n• Atomicidade — tudo ou nada.\n• Consistência — estados sempre válidos.\n• Isolamento — transações independentes.\n• Durabilidade — dados persistem após commit.',
    dificuldade: 'Médio',
  },
  {
    id: 'bd_002',
    banca: 'Cebraspe',
    materia: 'Banco de Dados',
    frente: 'Normalização — 1FN, 2FN, 3FN',
    verso:
      '• 1FN: atributos atômicos, sem grupos repetidos.\n• 2FN: 1FN + sem dependência parcial da chave primária (válido para chaves compostas).\n• 3FN: 2FN + sem dependência transitiva (atributo não-chave → não-chave).',
    dificuldade: 'Difícil',
  },
  {
    id: 'bd_003',
    banca: 'FGV',
    materia: 'Banco de Dados',
    frente: 'Índice B-Tree',
    verso:
      'Estrutura de dados balanceada usada em bancos relacionais para acelerar buscas. Mantém dados ordenados em nós com múltiplas chaves. Eficiente para buscas por igualdade (=), faixa (BETWEEN, >, <) e ORDER BY. Padrão no PostgreSQL, MySQL e Oracle.',
    dificuldade: 'Difícil',
  },
  {
    id: 'bd_004',
    banca: 'FCC',
    materia: 'Banco de Dados',
    frente: 'JOIN — Tipos Principais',
    verso:
      '• INNER JOIN — apenas registros com match em ambas as tabelas.\n• LEFT JOIN — todos da esquerda + match da direita (NULL onde não há).\n• RIGHT JOIN — inverso do LEFT.\n• FULL OUTER JOIN — todos de ambas, NULL onde sem correspondência.\n• CROSS JOIN — produto cartesiano.',
    dificuldade: 'Médio',
  },
  {
    id: 'bd_005',
    banca: 'Cebraspe',
    materia: 'Banco de Dados',
    frente: 'NoSQL — Tipos de Bancos',
    verso:
      '• Chave-Valor: Redis, DynamoDB — acesso ultrarrápido por chave.\n• Documento: MongoDB, Firestore — JSON/BSON flexível.\n• Colunar: Cassandra, HBase — alto volume, analytics.\n• Grafo: Neo4j — relacionamentos complexos.\n\nSacrifício do ACID em favor de escalabilidade (BASE/CAP).',
    dificuldade: 'Médio',
  },
];
