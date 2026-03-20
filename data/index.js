// ─────────────────────────────────────────────────────────────────────────────
//  data/index.js — Agrega todos os arquivos de questões
//
//  Como adicionar uma nova matéria:
//    1. Crie data/novaMateria.js com o array de cards.
//    2. Importe aqui: import novaMateria from './novaMateria';
//    3. Adicione ao array: ...novaMateria
//    Pronto! Filtros são gerados automaticamente.
// ─────────────────────────────────────────────────────────────────────────────

import redes        from './redes';
import seguranca    from './seguranca';
import bancoDados   from './bancoDados';
import so           from './so';
import engSoftware  from './engSoftware';
import linguagens   from './linguagens';

export const CARDS = [
  ...redes,
  ...seguranca,
  ...bancoDados,
  ...so,
  ...engSoftware,
  ...linguagens,
];

// Filtros gerados automaticamente a partir dos dados — nunca edite manualmente
export const BANCAS   = ['Todas', ...Array.from(new Set(CARDS.map((c) => c.banca)))];
export const MATERIAS = ['Todas', ...Array.from(new Set(CARDS.map((c) => c.materia)))];
