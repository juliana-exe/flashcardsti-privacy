// ─────────────────────────────────────────────────────────────────────────────
//  data.js — Base de flashcards para Concursos Públicos de TI
//
//  Como adicionar novos cards:
//    1. Copie um objeto do array CARDS abaixo.
//    2. Incremente o `id` (use string, ex: '6', '7', ...).
//    3. Preencha: banca, materia, frente, verso, dificuldade.
//    4. BANCAS e MATERIAS são derivados automaticamente — não precisa alterar.
//
//  Campos:
//    id           : string única
//    banca        : 'Cebraspe' | 'FGV' | 'FCC' | 'VUNESP' | 'IBFC' | ...
//    materia      : matéria do card (ex: 'Redes de Computadores')
//    frente       : termo / título exibido na frente do card
//    verso        : definição completa exibida no verso
//    dificuldade  : 'Fácil' | 'Médio' | 'Difícil'
// ─────────────────────────────────────────────────────────────────────────────

export const CARDS = [
  // ── Redes de Computadores ─────────────────────────────────────────────────
  {
    id: '1',
    banca: 'Cebraspe',
    materia: 'Redes de Computadores',
    frente: 'Protocolo TCP',
    verso:
      'Transmission Control Protocol — Camada de Transporte (OSI L4). Orientado à conexão via three-way handshake (SYN → SYN-ACK → ACK). Garante entrega confiável, ordenada e com controle de fluxo/congestionamento. Contraponto: UDP (sem conexão, menor overhead).',
    dificuldade: 'Fácil',
  },
  {
    id: '5',
    banca: 'FGV',
    materia: 'Redes de Computadores',
    frente: 'Protocolo DNS',
    verso:
      'Domain Name System — converte nomes de domínio em endereços IP. Porta 53 (UDP para consultas simples; TCP para respostas > 512 bytes e transferência de zona). Hierarquia: Root Servers → TLD (.com, .br) → Autoritativo → Resolver recursivo.',
    dificuldade: 'Fácil',
  },

  // ── Segurança da Informação ───────────────────────────────────────────────
  {
    id: '2',
    banca: 'FGV',
    materia: 'Segurança da Informação',
    frente: 'Ataque Man-in-the-Middle',
    verso:
      'O atacante se insere secretamente entre dois hosts que acreditam comunicar-se diretamente, interceptando e podendo modificar o tráfego em tempo real. Mitigações: TLS/SSL com validação de certificado, autenticação mútua, HSTS e certificate pinning.',
    dificuldade: 'Médio',
  },
  {
    id: '4',
    banca: 'Cebraspe',
    materia: 'Segurança da Informação',
    frente: 'RSA — Criptografia Assimétrica',
    verso:
      'Usa par de chaves: pública (cifrar/verificar assinatura) e privada (decifrar/assinar). Segurança baseada na dificuldade de fatorar números primos grandes. Aplicações: TLS, SSH, assinatura digital. Mais lento que a criptografia simétrica (ex.: AES).',
    dificuldade: 'Difícil',
  },

  // ── Banco de Dados ────────────────────────────────────────────────────────
  {
    id: '3',
    banca: 'FCC',
    materia: 'Banco de Dados',
    frente: 'Propriedades ACID',
    verso:
      'Garantias de confiabilidade em transações:\n\n• Atomicidade — tudo ou nada.\n• Consistência — estados sempre válidos.\n• Isolamento — transações independentes.\n• Durabilidade — dados persistem após commit.',
    dificuldade: 'Médio',
  },
];

// Opções de filtro derivadas automaticamente dos dados.
// Ao adicionar novos cards com nova banca/matéria, os filtros se atualizam sozinhos.
export const BANCAS   = ['Todas', ...Array.from(new Set(CARDS.map((c) => c.banca)))];
export const MATERIAS = ['Todas', ...Array.from(new Set(CARDS.map((c) => c.materia)))];
