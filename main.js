// ─────────────────────────────────────────────────────────────────────────────
//  FlashCards TI — MVP para Concursos Públicos de Tecnologia da Informação
//  Stack: Expo · react-native-reanimated · react-native-gesture-handler · lucide-react-native
// ─────────────────────────────────────────────────────────────────────────────

import { registerRootComponent } from 'expo';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
  Extrapolation,
} from 'react-native-reanimated';

import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Filter,
  BookOpen,
  Brain,
  Layers,
  X,
} from 'lucide-react-native';

import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CARDS, BANCAS, MATERIAS } from './data/index';

// ─────────────────────────────────────────────────────────────────────────────
//  DIMENSÕES & TEMA
// ─────────────────────────────────────────────────────────────────────────────
const { width: SW } = Dimensions.get('window');
const CARD_W = SW - 48;
const CARD_H = CARD_W * 1.5;
const SWIPE_THRESHOLD = SW * 0.28;

const C = {
  bg:           '#0D0D0D',
  surface:      '#1A1A1A',
  surface2:     '#222222',
  neon:         '#00FF41',
  neonDim:      'rgba(0,255,65,0.12)',
  neonBorder:   'rgba(0,255,65,0.30)',
  purple:       '#7B2FBE',
  purpleLight:  '#B47FFF',
  purpleDim:    'rgba(123,47,190,0.15)',
  purpleBorder: 'rgba(180,127,255,0.35)',
  red:          '#FF4444',
  redDim:       'rgba(255,68,68,0.12)',
  redBorder:    'rgba(255,68,68,0.35)',
  gold:         '#FFD700',
  text:         '#E8E8E8',
  textDim:      '#999999',
  textMuted:    '#555555',
  border:       '#2A2A2A',
  cardFront:    '#111122',
  cardBack:     '#160A25',
};

const DIFF_COLOR = { 'Fácil': C.neon, 'Médio': C.gold, 'Difícil': C.red };

// CARDS, BANCAS e MATERIAS são importados de ./data.js

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: FlashCard (flip + swipe)
// ─────────────────────────────────────────────────────────────────────────────
function FlashCard({ card, onSwipeRight, onSwipeLeft, index, total }) {
  const tx   = useSharedValue(0);
  const ty   = useSharedValue(0);
  const rot  = useSharedValue(0);
  const flip = useSharedValue(0);

  // Callbacks executados no lado JS após animação concluir
  const doRight = useCallback(() => onSwipeRight(card.id), [onSwipeRight, card.id]);
  const doLeft  = useCallback(() => onSwipeLeft(card.id),  [onSwipeLeft,  card.id]);

  // ── Gesto de PAN (swipe) ──────────────────────────────────────────────────
  const panGesture = Gesture.Pan()
    .activeOffsetX([-14, 14])
    .onUpdate((e) => {
      tx.value  = e.translationX;
      ty.value  = e.translationY * 0.12;
      rot.value = interpolate(e.translationX, [-SW / 2, 0, SW / 2], [-14, 0, 14], Extrapolation.CLAMP);
    })
    .onEnd((e) => {
      if (e.translationX > SWIPE_THRESHOLD) {
        tx.value = withTiming(SW * 2,  { duration: 280 }, () => runOnJS(doRight)());
        ty.value = withTiming(e.translationY * 1.5, { duration: 280 });
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        tx.value = withTiming(-SW * 2, { duration: 280 }, () => runOnJS(doLeft)());
        ty.value = withTiming(e.translationY * 1.5, { duration: 280 });
      } else {
        tx.value  = withSpring(0, { damping: 14 });
        ty.value  = withSpring(0, { damping: 14 });
        rot.value = withSpring(0, { damping: 14 });
      }
    });

  // ── Gesto de TAP (flip) ───────────────────────────────────────────────────
  const tapGesture = Gesture.Tap()
    .maxDistance(8)
    .onEnd(() => {
      flip.value = withTiming(flip.value > 0.5 ? 0 : 1, { duration: 420 });
    });

  const composed = Gesture.Exclusive(panGesture, tapGesture);

  // ── Estilos animados ──────────────────────────────────────────────────────
  const cardWrapStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { rotate: `${rot.value}deg` },
    ],
  }));

  const swipeRightOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(tx.value, [0, SWIPE_THRESHOLD * 0.7], [0, 1], Extrapolation.CLAMP),
  }));

  const swipeLeftOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(tx.value, [-SWIPE_THRESHOLD * 0.7, 0], [1, 0], Extrapolation.CLAMP),
  }));

  // Frente: rotateY 0 → 180 (some behind backfaceVisibility)
  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1200 },
      { rotateY: `${interpolate(flip.value, [0, 1], [0, 180], Extrapolation.CLAMP)}deg` },
    ],
    backfaceVisibility: 'hidden',
    opacity: flip.value < 0.5 ? 1 : 0,
  }));

  // Verso: rotateY -180 → 0
  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1200 },
      { rotateY: `${interpolate(flip.value, [0, 1], [-180, 0], Extrapolation.CLAMP)}deg` },
    ],
    backfaceVisibility: 'hidden',
    opacity: flip.value >= 0.5 ? 1 : 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  }));

  const diffColor = DIFF_COLOR[card.dificuldade] ?? C.text;

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.cardWrapper, cardWrapStyle]}>

        {/* ── Indicador: Já Sei ─────────────────────────────────────────── */}
        <Animated.View style={[styles.swipeIndicatorRight, swipeRightOpacity]}>
          <CheckCircle color={C.neon} size={38} strokeWidth={2.5} />
          <Text style={[styles.swipeBadgeText, { color: C.neon }]}>JÁ SEI!</Text>
        </Animated.View>

        {/* ── Indicador: Revisar ────────────────────────────────────────── */}
        <Animated.View style={[styles.swipeIndicatorLeft, swipeLeftOpacity]}>
          <XCircle color={C.red} size={38} strokeWidth={2.5} />
          <Text style={[styles.swipeBadgeText, { color: C.red }]}>REVISAR</Text>
        </Animated.View>

        {/* ═══ FRENTE ═══════════════════════════════════════════════════ */}
        <Animated.View style={[styles.card, { backgroundColor: C.cardFront, borderColor: C.neonBorder }, frontStyle]}>
          {/* Tags */}
          <View style={styles.cardTopRow}>
            <View style={[styles.badge, { borderColor: C.neonBorder }]}>
              <Text style={[styles.badgeText, { color: C.neon }]}>{card.banca}</Text>
            </View>
            <View style={[styles.badge, { borderColor: 'rgba(255,255,255,0.12)' }]}>
              <Text style={[styles.badgeText, { color: diffColor }]}>{card.dificuldade}</Text>
            </View>
          </View>

          {/* Conteúdo central */}
          <View style={styles.cardCenter}>
            <View style={[styles.iconCircle, { backgroundColor: C.neonDim }]}>
              <BookOpen color={C.neon} size={30} strokeWidth={1.5} />
            </View>
            <Text style={styles.cardFaceLabel}>TERMO</Text>
            <Text style={styles.cardTermText}>{card.frente}</Text>
            <Text style={styles.cardMateriaText}>{card.materia}</Text>
          </View>

          {/* Rodapé */}
          <View style={styles.cardFooter}>
            <Text style={styles.hintText}>Toque para revelar ↑</Text>
            <Text style={styles.counterText}>{index + 1} / {total}</Text>
          </View>
        </Animated.View>

        {/* ═══ VERSO ════════════════════════════════════════════════════ */}
        <Animated.View style={[styles.card, { backgroundColor: C.cardBack, borderColor: C.purpleBorder }, backStyle]}>
          {/* Tags */}
          <View style={styles.cardTopRow}>
            <View style={[styles.badge, { borderColor: C.purpleBorder }]}>
              <Text style={[styles.badgeText, { color: C.purpleLight }]}>{card.banca}</Text>
            </View>
            <View style={[styles.badge, { borderColor: 'rgba(255,255,255,0.12)' }]}>
              <Text style={[styles.badgeText, { color: diffColor }]}>{card.dificuldade}</Text>
            </View>
          </View>

          {/* Conteúdo central */}
          <View style={styles.cardCenter}>
            <View style={[styles.iconCircle, { backgroundColor: C.purpleDim }]}>
              <Brain color={C.purpleLight} size={30} strokeWidth={1.5} />
            </View>
            <Text style={[styles.cardFaceLabel, { color: C.purpleLight }]}>DEFINIÇÃO</Text>
            <Text style={styles.cardBodyText}>{card.verso}</Text>
          </View>

          {/* Rodapé */}
          <View style={styles.cardFooter}>
            <Text style={styles.hintText}>← Revisar  ·  Já sei →</Text>
            <Text style={styles.counterText}>{index + 1} / {total}</Text>
          </View>
        </Animated.View>

      </Animated.View>
    </GestureDetector>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: Modal de Filtros
// ─────────────────────────────────────────────────────────────────────────────
function FilterModal({ visible, onClose, banca, materia, onBanca, onMateria }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>

          {/* Cabeçalho */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <X color={C.textDim} size={20} />
            </TouchableOpacity>
          </View>

          {/* Banca */}
          <Text style={styles.filterGroupLabel}>BANCA</Text>
          <View style={styles.chipsRow}>
            {BANCAS.map((b) => (
              <TouchableOpacity
                key={b}
                style={[styles.chip, banca === b && styles.chipActive]}
                onPress={() => onBanca(b)}
              >
                <Text style={[styles.chipText, banca === b && styles.chipTextActive]}>{b}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Matéria */}
          <Text style={[styles.filterGroupLabel, { marginTop: 22 }]}>MATÉRIA</Text>
          <View style={styles.chipsRow}>
            {MATERIAS.map((m) => (
              <TouchableOpacity
                key={m}
                style={[styles.chip, materia === m && styles.chipActive]}
                onPress={() => onMateria(m)}
              >
                <Text style={[styles.chipText, materia === m && styles.chipTextActive]}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
            <Text style={styles.applyBtnText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: DeckProgressBar
// ─────────────────────────────────────────────────────────────────────────────
function DeckProgressBar({ total, remaining }) {
  const done      = total - remaining;
  const targetPct = total > 0 ? done / total : 0;
  const animPct   = useSharedValue(0);

  useEffect(() => {
    animPct.value = withTiming(targetPct, { duration: 550 });
  }, [targetPct]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${animPct.value * 100}%`,
  }));

  return (
    <View style={styles.dpWrap}>
      <View style={styles.dpTopRow}>
        <View>
          <Text style={styles.dpRemNum}>{remaining}</Text>
          <Text style={styles.dpRemLabel}>cards restantes</Text>
        </View>
        <View style={styles.dpRight}>
          <Text style={styles.dpDone}>
            {done}{' '}
            <Text style={styles.dpDoneLabel}>concluídos</Text>
          </Text>
          <Text style={styles.dpPct}>{Math.round(targetPct * 100)}%</Text>
        </View>
      </View>
      <View style={styles.dpTrack}>
        <Animated.View style={[styles.dpFill, fillStyle]} />
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: Estado vazio / Deck concluído
// ─────────────────────────────────────────────────────────────────────────────
function EmptyState({ message, onReset }) {
  return (
    <View style={styles.emptyState}>
      <Layers color={C.neon} size={64} strokeWidth={1} />
      <Text style={styles.emptyText}>{message}</Text>
      <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
        <RotateCcw color={C.bg} size={17} />
        <Text style={styles.resetBtnText}>Reiniciar Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  APP PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = '@flashcards_ti:progress';

function App() {
  const [bancaFilter,   setBancaFilter]   = useState('Todas');
  const [materiaFilter, setMateriaFilter] = useState('Todas');
  const [showFilters,   setShowFilters]   = useState(false);
  // progress: { [cardId]: 'know' | 'review' }
  const [progress,      setProgress]      = useState({});
  const [loaded,        setLoaded]        = useState(false);

  // ── Carrega progresso salvo ao abrir o app ────────────────────────────────
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => { if (raw) setProgress(JSON.parse(raw)); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // ── Persiste progresso toda vez que muda ──────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress)).catch(() => {});
  }, [progress, loaded]);

  // Cards filtrados
  const filteredCards = useMemo(() =>
    CARDS.filter((c) =>
      (bancaFilter   === 'Todas' || c.banca   === bancaFilter) &&
      (materiaFilter === 'Todas' || c.materia === materiaFilter)
    ),
    [bancaFilter, materiaFilter]
  );

  // Cards ainda não avaliados (sem status no progresso)
  const remaining = useMemo(() =>
    filteredCards.filter((c) => !progress[c.id]),
    [filteredCards, progress]
  );

  // Stats derivadas do progresso salvo (apenas cards do filtro atual)
  const stats = useMemo(() => {
    return filteredCards.reduce(
      (acc, c) => {
        if (progress[c.id] === 'know')   acc.know   += 1;
        if (progress[c.id] === 'review') acc.review += 1;
        return acc;
      },
      { know: 0, review: 0 }
    );
  }, [filteredCards, progress]);

  const currentCard = remaining[0];
  const nextCard    = remaining[1];

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSwipeRight = useCallback((id) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setProgress((prev) => ({ ...prev, [id]: 'know' }));
  }, []);

  const handleSwipeLeft = useCallback((id) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setProgress((prev) => ({ ...prev, [id]: 'review' }));
  }, []);

  const handleReset = useCallback(() => {
    // Remove apenas os cards do filtro atual do progresso
    setProgress((prev) => {
      const next = { ...prev };
      filteredCards.forEach((c) => delete next[c.id]);
      return next;
    });
  }, [filteredCards]);

  const handleBanca = useCallback((b) => {
    setBancaFilter(b);
  }, []);

  const handleMateria = useCallback((m) => {
    setMateriaFilter(m);
  }, []);

  const isFinished = remaining.length === 0 && filteredCards.length > 0;
  const noCards    = filteredCards.length === 0;
  const filtersOn  = bancaFilter !== 'Todas' || materiaFilter !== 'Todas';
  const cardIndex  = filteredCards.length - remaining.length;

  // Tela de carregamento inicial (AsyncStorage)
  if (!loaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: C.neon, fontSize: 16, fontWeight: '700', letterSpacing: 1 }}>Carregando...</Text>
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <SafeAreaView style={styles.root}>

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>
              <Text style={{ color: C.neon }}>FLASH</Text>
              <Text style={{ color: C.text }}>CARDS</Text>
              <Text style={{ color: C.textDim }}> TI</Text>
            </Text>
            <Text style={styles.headerSub}>Concursos Públicos</Text>
          </View>
          <TouchableOpacity style={styles.filterIconBtn} onPress={() => setShowFilters(true)}>
            <Filter color={filtersOn ? C.neon : C.textDim} size={20} />
            {filtersOn && <View style={styles.filterDot} />}
          </TouchableOpacity>
        </View>

        {/* ── BARRA DE ESTATÍSTICAS ────────────────────────────────────── */}
        <View style={styles.statsBar}>
          <View style={styles.statCell}>
            <CheckCircle color={C.neon} size={15} />
            <Text style={[styles.statNum, { color: C.neon }]}>{stats.know}</Text>
            <Text style={styles.statLbl}>Já Sei</Text>
          </View>
          <View style={styles.statSep} />
          <View style={styles.statCell}>
            <Layers color={C.textDim} size={15} />
            <Text style={[styles.statNum, { color: C.textDim }]}>{filteredCards.length}</Text>
            <Text style={styles.statLbl}>Total</Text>
          </View>
          <View style={styles.statSep} />
          <View style={styles.statCell}>
            <XCircle color={C.red} size={15} />
            <Text style={[styles.statNum, { color: C.red }]}>{stats.review}</Text>
            <Text style={styles.statLbl}>Revisar</Text>
          </View>
        </View>

        {/* ── BARRA DE PROGRESSO DO DECK ────────────────────────────── */}
        <DeckProgressBar total={filteredCards.length} remaining={remaining.length} />

        {/* ── FILTROS ATIVOS (pills) ───────────────────────────────────── */}
        {filtersOn && (
          <View style={styles.activePills}>
            {bancaFilter !== 'Todas' && (
              <View style={styles.pill}><Text style={styles.pillText}>{bancaFilter}</Text></View>
            )}
            {materiaFilter !== 'Todas' && (
              <View style={styles.pill}><Text style={styles.pillText}>{materiaFilter}</Text></View>
            )}
          </View>
        )}

        {/* ── ÁREA DOS CARDS ──────────────────────────────────────────── */}
        <View style={styles.deckArea}>
          {noCards ? (
            <EmptyState message={'Nenhum card\ncom os filtros selecionados.'} onReset={handleReset} />
          ) : isFinished ? (
            <EmptyState
              message={`Deck concluído! 🎯\n${stats.know} acertos · ${stats.review} para revisar`}
              onReset={handleReset}
            />
          ) : (
            <>
              {/* Card do fundo (próximo) */}
              {nextCard && (
                <View style={styles.shadowCard} pointerEvents="none" />
              )}
              {/* Card ativo */}
              <FlashCard
                key={currentCard.id}
                card={currentCard}
                onSwipeRight={handleSwipeRight}
                onSwipeLeft={handleSwipeLeft}
                index={cardIndex}
                total={filteredCards.length}
              />
            </>
          )}
        </View>

        {/* ── BOTÕES DE AÇÃO ───────────────────────────────────────────── */}
        {!isFinished && !noCards && currentCard && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: C.redDim, borderColor: C.redBorder }]}
              onPress={() => handleSwipeLeft(currentCard.id)}
            >
              <XCircle color={C.red} size={26} />
              <Text style={[styles.actionLbl, { color: C.red }]}>Revisar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionResetBtn} onPress={handleReset}>
              <RotateCcw color={C.textDim} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: C.neonDim, borderColor: C.neonBorder }]}
              onPress={() => handleSwipeRight(currentCard.id)}
            >
              <CheckCircle color={C.neon} size={26} />
              <Text style={[styles.actionLbl, { color: C.neon }]}>Já Sei</Text>
            </TouchableOpacity>
          </View>
        )}

      </SafeAreaView>

      {/* Modal de filtros (fora da SafeAreaView para cobrir a tela inteira) */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        banca={bancaFilter}
        materia={materiaFilter}
        onBanca={handleBanca}
        onMateria={handleMateria}
      />
    </GestureHandlerRootView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ESTILOS
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  // ROOT
  root: { flex: 1, backgroundColor: C.bg },

  // ── HEADER ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: '900', letterSpacing: 1.5 },
  headerSub: { fontSize: 11, color: C.textMuted, letterSpacing: 1, marginTop: 2 },
  filterIconBtn: {
    width: 42, height: 42, borderRadius: 12,
    backgroundColor: C.surface, borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  filterDot: {
    position: 'absolute', top: 8, right: 8,
    width: 8, height: 8, borderRadius: 4, backgroundColor: C.neon,
  },

  // ── STATS ─────────────────────────────────────────────────────────────────
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: C.surface,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 12,
  },
  statCell: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 5,
  },
  statNum: { fontSize: 15, fontWeight: '700' },
  statLbl: { fontSize: 12, color: C.textMuted },
  statSep: { width: 1, backgroundColor: C.border, marginVertical: 4 },

  // ── DECK PROGRESS BAR ─────────────────────────────────────────────────────
  dpWrap: {
    marginHorizontal: 24,
    marginBottom: 10,
  },
  dpTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  dpRemNum: {
    fontSize: 32,
    fontWeight: '900',
    color: C.neon,
    lineHeight: 34,
  },
  dpRemLabel: {
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  dpRight: { alignItems: 'flex-end' },
  dpDone: { fontSize: 13, color: C.text, fontWeight: '600' },
  dpDoneLabel: { color: C.textMuted, fontWeight: '400' },
  dpPct: { fontSize: 11, color: C.neon, fontWeight: '700', marginTop: 2 },
  dpTrack: {
    height: 6,
    backgroundColor: C.surface2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  dpFill: {
    height: '100%',
    backgroundColor: C.neon,
    borderRadius: 3,
    shadowColor: C.neon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 6,
    elevation: 4,
  },

  // ── ACTIVE PILLS ──────────────────────────────────────────────────────────
  activePills: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 24, marginBottom: 6, gap: 6,
  },
  pill: {
    backgroundColor: C.neonDim, borderWidth: 1, borderColor: C.neonBorder,
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
  },
  pillText: { fontSize: 11, color: C.neon, fontWeight: '700' },

  // ── DECK AREA ─────────────────────────────────────────────────────────────
  deckArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  shadowCard: {
    position: 'absolute',
    width: CARD_W,
    height: CARD_H,
    borderRadius: 24,
    backgroundColor: C.cardFront,
    borderWidth: 1.5,
    borderColor: C.neonBorder,
    transform: [{ scale: 0.95 }, { translateY: 12 }],
  },

  // ── FLASH CARD ────────────────────────────────────────────────────────────
  cardWrapper: { width: CARD_W, height: CARD_H },

  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 24,
    borderWidth: 1.5,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: C.neon,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },

  cardCenter: {
    flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12,
  },
  iconCircle: {
    width: 62, height: 62, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  cardFaceLabel: {
    fontSize: 10, fontWeight: '800', color: C.neon,
    letterSpacing: 2.5, marginBottom: 14,
  },
  cardTermText: {
    fontSize: 24, fontWeight: '800', color: C.text,
    textAlign: 'center', letterSpacing: 0.3, marginBottom: 8,
  },
  cardMateriaText: {
    fontSize: 13, color: C.textMuted, textAlign: 'center',
  },
  cardBodyText: {
    fontSize: 14, color: C.text, textAlign: 'center',
    lineHeight: 22, paddingHorizontal: 4,
  },

  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  hintText:    { fontSize: 11, color: C.textMuted, fontStyle: 'italic' },
  counterText: { fontSize: 12, color: C.textMuted, fontWeight: '600' },

  // ── SWIPE INDICATORS ──────────────────────────────────────────────────────
  swipeIndicatorRight: {
    position: 'absolute', top: '35%', left: 20,
    zIndex: 20, alignItems: 'center', gap: 6,
  },
  swipeIndicatorLeft: {
    position: 'absolute', top: '35%', right: 20,
    zIndex: 20, alignItems: 'center', gap: 6,
  },
  swipeBadgeText: { fontSize: 14, fontWeight: '900', letterSpacing: 1 },

  // ── ACTION BUTTONS ────────────────────────────────────────────────────────
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 18,
    gap: 16,
  },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, borderRadius: 16, gap: 8, borderWidth: 1.5,
  },
  actionLbl: { fontSize: 14, fontWeight: '700', letterSpacing: 0.4 },
  actionResetBtn: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: C.surface, borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },

  // ── EMPTY STATE ───────────────────────────────────────────────────────────
  emptyState: { alignItems: 'center', gap: 14, paddingHorizontal: 32 },
  emptyText: {
    fontSize: 17, color: C.text, textAlign: 'center',
    fontWeight: '600', lineHeight: 26,
  },
  resetBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.neon, paddingHorizontal: 24, paddingVertical: 14,
    borderRadius: 14, gap: 8, marginTop: 6,
  },
  resetBtnText: { fontSize: 14, fontWeight: '800', color: C.bg, letterSpacing: 0.5 },

  // ── FILTER MODAL ──────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: C.surface,
    borderTopLeftRadius: 26, borderTopRightRadius: 26,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 42 : 28,
    borderTopWidth: 1, borderColor: C.border,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 24,
  },
  modalTitle: { fontSize: 19, fontWeight: '800', color: C.text },
  modalCloseBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center',
  },
  filterGroupLabel: {
    fontSize: 10, fontWeight: '700', color: C.textMuted,
    letterSpacing: 1.8, marginBottom: 10,
  },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1, borderColor: C.border, backgroundColor: C.surface2,
  },
  chipActive: { backgroundColor: C.neonDim, borderColor: C.neonBorder },
  chipText:       { fontSize: 13, color: C.textDim, fontWeight: '600' },
  chipTextActive: { color: C.neon },
  applyBtn: {
    backgroundColor: C.neon, borderRadius: 14,
    paddingVertical: 14, alignItems: 'center', marginTop: 28,
  },
  applyBtnText: { fontSize: 15, fontWeight: '800', color: C.bg, letterSpacing: 0.5 },
});

registerRootComponent(App);