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
  StatusBar,
  Modal,
  TouchableOpacity,
  Platform,
  ScrollView,
  useWindowDimensions,
  Alert,
  AppState,
} from 'react-native';

import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  cancelAnimation,
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
  Shuffle,
  Flame,
} from 'lucide-react-native';

import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import { CARDS, BANCAS, MATERIAS } from './data/index';

// ─────────────────────────────────────────────────────────────────────────────
//  DIMENSÕES & TEMA
// ─────────────────────────────────────────────────────────────────────────────
// Dimensões responsivas recalculadas a cada mudança de orientação / tamanho
function useLayout() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const cardW = width - 48;
  // Desconta insets reais do dispositivo + chrome: header(60) + filterBar(56) + stats(56) + progress(72) + actionBar(110) + margem(46)
  const safeHeight = height - insets.top - insets.bottom;
  const maxCardH = safeHeight - 400;
  const cardH = Math.min(cardW * 1.55, safeHeight * 0.52, maxCardH);
  const swipeThreshold = width * 0.28;
  // Escala tipográfica: base 375 px (iPhone padrão). Clamp entre 0.82 e 1.12.
  const fontScale = Math.min(Math.max(width / 375, 0.82), 1.12);
  // Memoiza para referência estável — evita re-renders desnecessários em FlashCard
  return useMemo(
    () => ({ width, height, cardW, cardH, swipeThreshold, fontScale }),
    [width, height, cardW, cardH, swipeThreshold, fontScale],
  );
}

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
const FlashCard = React.memo(function FlashCard({ card, onSwipeRight, onSwipeLeft, index, total, layout }) {
  const { width: SW, cardW: CARD_W, cardH: CARD_H, swipeThreshold: SWIPE_THRESHOLD, fontScale } = layout;
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
      <Animated.View style={[styles.cardWrapper, { width: CARD_W, height: CARD_H }, cardWrapStyle]}>

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
        <Animated.View style={[styles.card, { width: CARD_W, height: CARD_H, backgroundColor: C.cardFront, borderColor: C.neonBorder }, frontStyle]}>
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
            <Text style={[styles.cardTermText, { fontSize: Math.round(24 * fontScale) }]}>{card.frente}</Text>
            <Text style={styles.cardMateriaText}>{card.materia}</Text>
          </View>

          {/* Rodapé */}
          <View style={styles.cardFooter}>
            <Text style={styles.hintText}>Toque para revelar ↑</Text>
            <Text style={styles.counterText}>{index + 1} / {total}</Text>
          </View>
        </Animated.View>

        {/* ═══ VERSO ════════════════════════════════════════════════════ */}
        <Animated.View style={[styles.card, { width: CARD_W, height: CARD_H, backgroundColor: C.cardBack, borderColor: C.purpleBorder }, backStyle]}>
          {/* Tags */}
          <View style={styles.cardTopRow}>
            <View style={[styles.badge, { borderColor: C.purpleBorder }]}>
              <Text style={[styles.badgeText, { color: C.purpleLight }]}>{card.banca}</Text>
            </View>
            <View style={[styles.badge, { borderColor: 'rgba(255,255,255,0.12)' }]}>
              <Text style={[styles.badgeText, { color: diffColor }]}>{card.dificuldade}</Text>
            </View>
          </View>

          {/* Conteúdo central com scroll para textos longos */}
          <View style={styles.cardCenter}>
            <View style={[styles.iconCircleSmall, { backgroundColor: C.purpleDim }]}>
              <Brain color={C.purpleLight} size={20} strokeWidth={1.5} />
            </View>
            <Text style={[styles.cardFaceLabel, { color: C.purpleLight, marginBottom: 8 }]}>DEFINIÇÃO</Text>
            <ScrollView
              nestedScrollEnabled={true}
              style={{ width: '100%', flexGrow: 0 }}
              contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 4 }}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <Text style={[styles.cardBodyText, { fontSize: Math.round(13 * fontScale), lineHeight: Math.round(20 * fontScale) }]}>{card.verso}</Text>
            </ScrollView>
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
});

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: Modal de Filtros
// ─────────────────────────────────────────────────────────────────────────────
function FilterModal({ visible, onClose, bancas, materias, onToggleBanca, onToggleMateria, onClear }) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalSheet, { paddingBottom: Math.max(insets.bottom + 12, 20) }]}>

          {/* Cabeçalho */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TouchableOpacity onPress={onClear} style={styles.modalClearBtn}>
              <Text style={styles.modalClearText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <X color={C.textDim} size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">
            {/* Banca */}
            <Text style={styles.filterGroupLabel}>BANCA</Text>
            <View style={styles.chipsRow}>
              {BANCAS.filter((b) => b !== 'Todas').map((b) => {
                const active = bancas.has(b);
                return (
                  <TouchableOpacity
                    key={b}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => onToggleBanca(b)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{b}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Matéria */}
            <Text style={[styles.filterGroupLabel, { marginTop: 22 }]}>MATÉRIA</Text>
            <View style={[styles.chipsRow, { marginBottom: 8 }]}>
              {MATERIAS.filter((m) => m !== 'Todas').map((m) => {
                const active = materias.has(m);
                return (
                  <TouchableOpacity
                    key={m}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => onToggleMateria(m)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{m}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

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
function DeckProgressBar({ total, remaining, fontScale }) {
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
          <Text style={[styles.dpRemNum, { fontSize: Math.round(30 * fontScale) }]}>{remaining}</Text>
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
function EmptyState({ message, onReset, resetLabel = 'Reiniciar Deck' }) {
  return (
    <View style={styles.emptyState}>
      <Layers color={C.neon} size={64} strokeWidth={1} />
      <Text style={styles.emptyText}>{message}</Text>
      <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
        <RotateCcw color={C.bg} size={17} />
        <Text style={styles.resetBtnText}>{resetLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: ActionBar — botões que somem/aparecem
// ─────────────────────────────────────────────────────────────────────────────
function ActionBar({ buttonsAnim, buttonsVisible, onToggle, onRevisar, onJaSei, navBarHeight = 0 }) {
  const insets = useSafeAreaInsets();
  const slideStyle = useAnimatedStyle(() => ({
    opacity: buttonsAnim.value,
    maxHeight: interpolate(buttonsAnim.value, [0, 1], [0, 120], Extrapolation.CLAMP),
    overflow: 'hidden',
  }));

  const bottomPad = Math.max(insets.bottom, navBarHeight, 16);

  return (
    <View style={[styles.actionBarWrap, { paddingBottom: bottomPad }]}>
      {/* Handle: sempre visível, toggle ao tocar */}
      <TouchableOpacity style={styles.actionHandle} onPress={onToggle} activeOpacity={0.6}>
        <View style={styles.actionHandlePill} />
        <Text style={styles.actionHandleHint}>
          {buttonsVisible ? 'toque para ocultar botões' : '← deslize o card →  ou toque aqui'}
        </Text>
      </TouchableOpacity>

      {/* Botões animados */}
      <Animated.View style={[styles.actions, slideStyle]} pointerEvents={buttonsVisible ? 'auto' : 'none'}>
        <TouchableOpacity style={styles.actionBtnSecondary} onPress={onRevisar} activeOpacity={0.65}>
          <XCircle color={C.red} size={21} />
          <Text style={[styles.actionLbl, { color: C.red }]}>Revisar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtnPrimary} onPress={onJaSei} activeOpacity={0.75}>
          <CheckCircle color={C.neon} size={21} />
          <Text style={[styles.actionLbl, { color: C.neon }]}>Já Sei</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  APP PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY         = '@flashcards_ti:progress';
const STORAGE_FILTERS_KEY = '@flashcards_ti:filters';

// ── Utilitário: Fisher-Yates shuffle ─────────────────────────────────────────
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const layout = useLayout();
  const [bancaFilter,    setBancaFilter]   = useState(new Set());
  const [materiaFilter,  setMateriaFilter] = useState(new Set());
  const [reviewOnly,     setReviewOnly]    = useState(false);
  const [showFilters,    setShowFilters]   = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [shuffled,       setShuffled]      = useState(false);
  const [shuffleOrder,   setShuffleOrder]  = useState([]);
  const [reviewSnapshot,    setReviewSnapshot]    = useState([]);
  const [reviewQueue,       setReviewQueue]       = useState([]); // fila rotativa do modo Só Revisar
  const [streak,            setStreak]            = useState(0);
  const buttonsAnim = useSharedValue(1);
  // progress: { [cardId]: 'know' | 'review' }
  const [progress,       setProgress]      = useState({});
  const [loaded,         setLoaded]        = useState(false);

  const [navBarHeight, setNavBarHeight] = useState(0);
  const [deckAreaHeight, setDeckAreaHeight] = useState(null);

  // ── Modo imersivo: esconde barra de navegação do Android ──────────────────
  useEffect(() => {
    const hideNavBar = async () => {
      try {
        const h = await NavigationBar.getHeightAsync();
        setNavBarHeight(h ?? 0);
        await NavigationBar.setVisibilityAsync('hidden');
        await NavigationBar.setBehaviorAsync('overlay-swipe');
      } catch (_) {}
    };
    hideNavBar();
    // Re-esconde quando o app volta ao foreground (swipe acidental reexibe a nav bar)
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') hideNavBar();
    });
    return () => sub.remove();
  }, []);

  // ── Carrega progresso e filtros salvos ao abrir o app ───────────────────
  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(STORAGE_KEY),
      AsyncStorage.getItem(STORAGE_FILTERS_KEY),
    ])
      .then(([rawProgress, rawFilters]) => {
        if (rawProgress) setProgress(JSON.parse(rawProgress));
        if (rawFilters) {
          const { bancas, materias } = JSON.parse(rawFilters);
          if (bancas)   setBancaFilter(new Set(bancas));
          if (materias) setMateriaFilter(new Set(materias));
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // ── Persiste progresso toda vez que muda ──────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress)).catch(() => {});
  }, [progress, loaded]);

  // ── Persiste filtros toda vez que mudam ───────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_FILTERS_KEY, JSON.stringify({
      bancas: [...bancaFilter],
      materias: [...materiaFilter],
    })).catch(() => {});
  }, [bancaFilter, materiaFilter, loaded]);

  // Cards filtrados — apenas banca e matéria (estável, não depende de progress)
  const filteredCards = useMemo(() =>
    CARDS.filter((c) =>
      (bancaFilter.size   === 0 || bancaFilter.has(c.banca)) &&
      (materiaFilter.size === 0 || materiaFilter.has(c.materia))
    ),
    [bancaFilter, materiaFilter]
  );

  // No modo Só Revisar usa o snapshot capturado ao entrar (lista fixa);
  // caso contrário usa filteredCards normalmente.
  const deckBase = useMemo(() => {
    if (!reviewOnly) return filteredCards;
    return reviewSnapshot
      .map((id) => filteredCards.find((c) => c.id === id))
      .filter(Boolean);
  }, [reviewOnly, reviewSnapshot, filteredCards]);

  // Ordem embaralhada — recalculada quando deckBase muda ou shuffle ativa
  const orderedCards = useMemo(() => {
    if (!shuffled) return deckBase;
    // Usa Map para lookup O(1) — evita O(n²) com find/some
    const deckMap = new Map(deckBase.map((c) => [c.id, c]));
    const isValid =
      shuffleOrder.length === deckBase.length &&
      shuffleOrder.every((id) => deckMap.has(id));
    if (isValid) {
      return shuffleOrder.map((id) => deckMap.get(id)).filter(Boolean);
    }
    return deckBase;
  }, [shuffled, shuffleOrder, deckBase]);

  // Cards ainda não avaliados
  // Modo normal: cards sem progresso
  // Modo Só Revisar: fila rotativa — "Revisar" manda pro final, "Já Sei" remove
  const remaining = useMemo(() => {
    if (reviewOnly) {
      const cardMap = new Map(filteredCards.map((c) => [c.id, c]));
      return reviewQueue.map((id) => cardMap.get(id)).filter(Boolean);
    }
    return orderedCards.filter((c) => !progress[c.id]);
  }, [reviewOnly, reviewQueue, filteredCards, orderedCards, progress]);

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
    setStreak((s) => s + 1);
    if (reviewOnly) {
      // Remove da fila — sessão avança, card não volta mais nesta sessão
      setReviewQueue((prev) => prev.slice(1));
    }
  }, [reviewOnly]);

  const handleSwipeLeft = useCallback((id) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setStreak(0);
    if (reviewOnly) {
      // Rotaciona a fila: card atual vai pro final → reaparece após ver os demais
      setReviewQueue((prev) => prev.length > 1 ? [...prev.slice(1), prev[0]] : prev);
    } else {
      setProgress((prev) => ({ ...prev, [id]: 'review' }));
    }
  }, [reviewOnly]);

  const handleReset = useCallback(() => {
    setProgress((prev) => {
      const next = { ...prev };
      filteredCards.forEach((c) => delete next[c.id]);
      return next;
    });
    setStreak(0);
    // Sai do modo Só Revisar ao reiniciar para não ficar preso na tela de conclusão
    if (reviewOnly) {
      setReviewOnly(false);
      setReviewSnapshot([]);
      setReviewQueue([]);
    }
  }, [filteredCards, reviewOnly]);

  const handleResetConfirm = useCallback(() => {
    const count = filteredCards.filter((c) => progress[c.id]).length;
    if (count === 0) { handleReset(); return; }
    Alert.alert(
      'Reiniciar deck?',
      `Isso vai apagar o progresso de ${count} card${count > 1 ? 's' : ''} ${filteredCards.length < CARDS.length ? 'neste filtro' : 'do deck inteiro'}. Essa ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reiniciar', style: 'destructive', onPress: handleReset },
      ],
      { cancelable: true }
    );
  }, [filteredCards, progress, handleReset]);

  const handleToggleBanca = useCallback((b) => {
    setBancaFilter((prev) => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
  }, []);

  const handleToggleMateria = useCallback((m) => {
    setMateriaFilter((prev) => {
      const next = new Set(prev);
      next.has(m) ? next.delete(m) : next.add(m);
      return next;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setBancaFilter(new Set());
    setMateriaFilter(new Set());
    setReviewOnly(false);
    setReviewSnapshot([]);
    setReviewQueue([]);
  }, []);

  const handleShuffle = useCallback(() => {
    const next = !shuffled;
    setShuffled(next);
    if (next) {
      setShuffleOrder(shuffleArray(deckBase).map((c) => c.id));
    } else {
      setShuffleOrder([]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [shuffled, deckBase]);

  // Re-embaralha automaticamente quando deckBase muda (filtros/reviewOnly) e shuffle está ativo
  useEffect(() => {
    if (!shuffled || deckBase.length === 0) return;
    const deckMap = new Map(deckBase.map((c) => [c.id, c]));
    const stale =
      shuffleOrder.length !== deckBase.length ||
      !shuffleOrder.every((id) => deckMap.has(id));
    if (stale) {
      setShuffleOrder(shuffleArray(deckBase).map((c) => c.id));
    }
  }, [shuffled, deckBase, shuffleOrder]);

  const toggleButtons = useCallback(() => {
    const next = !buttonsVisible;
    setButtonsVisible(next);
    buttonsAnim.value = withSpring(next ? 1 : 0, { damping: 18, stiffness: 160 });
    Haptics.selectionAsync();
  }, [buttonsVisible, buttonsAnim]);

  const isFinished = remaining.length === 0 && orderedCards.length > 0;
  const noCards    = orderedCards.length === 0;
  const filtersOn  = bancaFilter.size > 0 || materiaFilter.size > 0 || reviewOnly;
  const cardIndex  = orderedCards.length - remaining.length;

  // Limita altura do card ao espaço real disponível (evita overlap com barra de progresso)
  const effectiveCardH = deckAreaHeight != null && deckAreaHeight > 80
    ? Math.min(layout.cardH, deckAreaHeight - 20)
    : layout.cardH;

  // Memoiza o layout com cardH efetivo — referência estável para React.memo do FlashCard
  const effectiveLayout = useMemo(
    () => ({ ...layout, cardH: effectiveCardH }),
    [layout, effectiveCardH],
  );

  // Tela de carregamento inicial (AsyncStorage)
  const loadingAnim = useSharedValue(0);
  useEffect(() => {
    loadingAnim.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, []);
  // Para a animação de loading assim que os dados estão prontos
  useEffect(() => {
    if (loaded) cancelAnimation(loadingAnim);
  }, [loaded]);
  const loadingBarStyle = useAnimatedStyle(() => ({
    width: `${interpolate(loadingAnim.value, [0, 1], [20, 85], Extrapolation.CLAMP)}%`,
    opacity: interpolate(loadingAnim.value, [0, 0.5, 1], [0.6, 1, 0.6], Extrapolation.CLAMP),
  }));

  if (!loaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: '900', letterSpacing: 1.5 }}>
            <Text style={{ color: C.neon }}>FLASH</Text>
            <Text style={{ color: C.text }}>CARDS</Text>
            <Text style={{ color: C.textDim }}> TI</Text>
          </Text>
          <Text style={{ color: C.textMuted, fontSize: 12, letterSpacing: 1 }}>Concursos Públicos</Text>
          <View style={{ marginTop: 24, width: 120, height: 3, backgroundColor: C.surface2, borderRadius: 2, overflow: 'hidden' }}>
            <Animated.View style={[{ height: '100%', backgroundColor: C.neon, borderRadius: 2 }, loadingBarStyle]} />
          </View>
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
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
          <View style={styles.headerActions}>
            {/* Streak */}
            {streak >= 3 && (
              <View style={styles.streakBadge}>
                <Flame color={C.gold} size={14} />
                <Text style={styles.streakText}>{streak}</Text>
              </View>
            )}
            {/* Shuffle */}
            <TouchableOpacity
              style={[styles.headerIconBtn, shuffled && styles.headerIconBtnActive]}
              onPress={handleShuffle}
              activeOpacity={0.7}
            >
              <Shuffle color={shuffled ? C.neon : C.textDim} size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── BOTÃO DE FILTRO ────────────────────────────────────────── */}
        <TouchableOpacity
          style={[styles.filterBar, filtersOn && styles.filterBarActive]}
          onPress={() => setShowFilters(true)}
          activeOpacity={0.75}
        >
          <Filter color={filtersOn ? C.neon : C.textDim} size={18} />
          <Text style={[styles.filterBarTxt, { color: filtersOn ? C.neon : C.textDim }]}>
            {filtersOn ? 'Filtro ativo — toque para alterar' : 'Filtrar por matéria ou banca'}
          </Text>
          {filtersOn && <View style={styles.filterActiveDot} />}
        </TouchableOpacity>

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
          {/* Botão Só Revisar */}
          <TouchableOpacity
            style={[styles.statCell, reviewOnly && styles.statCellActive, !reviewOnly && stats.review === 0 && { opacity: 0.35 }]}
            onPress={() => {
              if (!reviewOnly && stats.review === 0) return;
              if (!reviewOnly) {
                const ids = filteredCards
                  .filter((c) => progress[c.id] === 'review')
                  .map((c) => c.id);
                setReviewSnapshot(ids);
                setReviewQueue([...ids]);
                setReviewOnly(true);
              } else {
                setReviewOnly(false);
                setReviewSnapshot([]);
                setReviewQueue([]);
              }
            }}
            activeOpacity={0.7}
          >
            <XCircle color={reviewOnly ? C.red : C.textDim} size={15} />
            <Text style={[styles.statNum, { color: reviewOnly ? C.red : C.textDim }]}>{stats.review}</Text>
            <Text style={[styles.statLbl, reviewOnly && { color: C.red }]}>Revisar</Text>
          </TouchableOpacity>
        </View>

        {/* ── BARRA DE PROGRESSO DO DECK (long press = reiniciar) ───── */}
        <TouchableOpacity
          activeOpacity={1}
          delayLongPress={700}
          onLongPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            handleResetConfirm();
          }}
        >
          <DeckProgressBar total={orderedCards.length} remaining={remaining.length} fontScale={layout.fontScale} />
        </TouchableOpacity>

        {/* ── FILTROS ATIVOS (pills) — tappable para editar filtro ──────── */}
        {filtersOn && (
          <View style={styles.activePills}>
            {reviewOnly && (
              <TouchableOpacity style={[styles.pill, styles.pillRed]} onPress={() => { setReviewOnly(false); setReviewSnapshot([]); setReviewQueue([]); }}>
                <Text style={[styles.pillText, styles.pillTextRed]}>Só Revisar  ✕</Text>
              </TouchableOpacity>
            )}
            {[...bancaFilter].map((b) => (
              <TouchableOpacity key={b} style={styles.pill} onPress={() => handleToggleBanca(b)}>
                <Text style={styles.pillText}>{b}  ✕</Text>
              </TouchableOpacity>
            ))}
            {[...materiaFilter].map((m) => (
              <TouchableOpacity key={m} style={styles.pill} onPress={() => handleToggleMateria(m)}>
                <Text style={styles.pillText}>{m}  ✕</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── ÁREA DOS CARDS ──────────────────────────────────────────── */}
        <View style={styles.deckArea} onLayout={(e) => setDeckAreaHeight(e.nativeEvent.layout.height)}>
          {noCards ? (
            <EmptyState
              message={'Nenhum card\ncom os filtros selecionados.'}
              onReset={handleClearFilters}
              resetLabel="Limpar Filtros"
            />
          ) : isFinished ? (
            <EmptyState
              message={`Deck concluído! 🎯\n${stats.know} acertos · ${stats.review} para revisar`}
              onReset={handleReset}
            />
          ) : (
            <>
              {/* Card do fundo (próximo) */}
              {nextCard && (
                <View style={[styles.shadowCard, { width: layout.cardW, height: effectiveCardH }]} pointerEvents="none" />
              )}
              {/* Card ativo */}
              <FlashCard
                key={currentCard.id}
                card={currentCard}
                onSwipeRight={handleSwipeRight}
                onSwipeLeft={handleSwipeLeft}
                index={cardIndex}
                total={orderedCards.length}
                layout={effectiveLayout}
              />
            </>
          )}
        </View>

        {/* ── BOTÕES DE AÇÃO (deslizáveis) ─────────────────────────────── */}
        {!isFinished && !noCards && currentCard && (
          <ActionBar
            buttonsAnim={buttonsAnim}
            buttonsVisible={buttonsVisible}
            onToggle={toggleButtons}
            onRevisar={() => handleSwipeLeft(currentCard.id)}
            onJaSei={() => handleSwipeRight(currentCard.id)}
            navBarHeight={navBarHeight}
          />
        )}

      </SafeAreaView>

      {/* Modal de filtros (fora da SafeAreaView para cobrir a tela inteira) */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        bancas={bancaFilter}
        materias={materiaFilter}
        onToggleBanca={handleToggleBanca}
        onToggleMateria={handleToggleMateria}
        onClear={handleClearFilters}
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
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerIconBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: C.surface, borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  headerIconBtnActive: {
    backgroundColor: C.neonDim, borderColor: C.neonBorder,
  },
  streakBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,215,0,0.12)', borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.35)', borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 5,
  },
  streakText: { fontSize: 13, fontWeight: '800', color: C.gold },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: C.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    gap: 10,
  },
  filterBarActive: {
    borderColor: C.neonBorder,
    backgroundColor: C.neonDim,
  },
  filterBarTxt: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  filterActiveDot: {
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
  statCellActive: {
    backgroundColor: 'rgba(255,68,68,0.10)', borderRadius: 10, marginVertical: 2,
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
  pillRed: { backgroundColor: C.redDim, borderColor: C.redBorder },
  pillText: { fontSize: 11, color: C.neon, fontWeight: '700' },
  pillTextRed: { color: C.red },

  // ── DECK AREA ─────────────────────────────────────────────────────────────
  deckArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  shadowCard: {
    position: 'absolute',
    borderRadius: 24,
    backgroundColor: C.cardFront,
    borderWidth: 1.5,
    borderColor: C.neonBorder,
    transform: [{ scale: 0.95 }, { translateY: 12 }],
  },

  // ── FLASH CARD ────────────────────────────────────────────────────────────
  // width/height passados inline via prop layout (responsivo)
  cardWrapper: {},

  card: {
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
    flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 8,
  },
  iconCircle: {
    width: 62, height: 62, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  iconCircleSmall: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
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
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 4,
    gap: 10,
  },
  actionBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 100,
    gap: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,68,68,0.5)',
    backgroundColor: 'rgba(255,68,68,0.08)',
  },
  actionBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 100,
    gap: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(0,255,65,0.5)',
    backgroundColor: 'rgba(0,255,65,0.12)',
  },
  actionLbl: { fontSize: 15, fontWeight: '700', letterSpacing: 0.2 },

  // ActionBar wrapper — paddingBottom aplicado dinamicamente via useSafeAreaInsets
  actionBarWrap: {
    paddingBottom: 0,
  },
  actionHandle: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    gap: 5,
  },
  actionHandlePill: {
    width: 44, height: 4, borderRadius: 2,
    backgroundColor: C.textMuted,
  },
  actionHandleHint: {
    fontSize: 10, color: C.textMuted,
    letterSpacing: 0.4,
    textTransform: 'lowercase',
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
    borderTopWidth: 1, borderColor: C.border,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 24,
  },
  modalTitle: { fontSize: 19, fontWeight: '800', color: C.text, flex: 1 },
  modalClearBtn: { paddingHorizontal: 10, paddingVertical: 6, marginRight: 6 },
  modalClearText: { fontSize: 13, color: C.textDim, fontWeight: '600' },
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

function Root() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}

registerRootComponent(Root);