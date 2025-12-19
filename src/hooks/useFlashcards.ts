import { useState, useCallback, useEffect } from "react";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deck: string;
  nextReview: number;
  interval: number;
  easeFactor: number;
  repetitions: number;
  createdAt: number;
}

export interface Deck {
  name: string;
  cardCount: number;
  dueCount: number;
}

interface StudySession {
  cardId: string;
  showAnswer: boolean;
}

const STORAGE_KEY = "studyflow_flashcards";

const generateId = () => Math.random().toString(36).substring(2, 9);

export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load flashcards:", e);
    }
    return [];
  });

  const [currentStudy, setCurrentStudy] = useState<StudySession | null>(null);
  const [studyDeck, setStudyDeck] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  // Save to localStorage whenever cards change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error("Failed to save flashcards:", e);
    }
  }, [cards]);

  const addCard = useCallback((front: string, back: string, deck: string) => {
    const newCard: Flashcard = {
      id: generateId(),
      front: front.trim(),
      back: back.trim(),
      deck: deck.trim() || "General",
      nextReview: Date.now(),
      interval: 1,
      easeFactor: 2.5,
      repetitions: 0,
      createdAt: Date.now(),
    };
    setCards((prev) => [...prev, newCard]);
    return newCard;
  }, []);

  const updateCard = useCallback((id: string, front: string, back: string, deck: string) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, front: front.trim(), back: back.trim(), deck: deck.trim() || "General" }
          : c
      )
    );
    setEditingCard(null);
  }, []);

  const deleteCard = useCallback((id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    if (currentStudy?.cardId === id) {
      setCurrentStudy(null);
    }
    if (editingCard?.id === id) {
      setEditingCard(null);
    }
  }, [currentStudy, editingCard]);

  const getDecks = useCallback((): Deck[] => {
    const deckMap = new Map<string, { total: number; due: number }>();
    const now = Date.now();

    cards.forEach((card) => {
      const existing = deckMap.get(card.deck) || { total: 0, due: 0 };
      existing.total++;
      if (card.nextReview <= now) {
        existing.due++;
      }
      deckMap.set(card.deck, existing);
    });

    return Array.from(deckMap.entries()).map(([name, { total, due }]) => ({
      name,
      cardCount: total,
      dueCount: due,
    }));
  }, [cards]);

  const getDueCards = useCallback((deckName?: string): Flashcard[] => {
    const now = Date.now();
    return cards
      .filter((c) => c.nextReview <= now && (!deckName || c.deck === deckName))
      .sort((a, b) => a.nextReview - b.nextReview);
  }, [cards]);

  const startStudy = useCallback((deckName: string) => {
    setStudyDeck(deckName);
    const dueCards = getDueCards(deckName);
    if (dueCards.length > 0) {
      setCurrentStudy({ cardId: dueCards[0].id, showAnswer: false });
    }
  }, [getDueCards]);

  const endStudy = useCallback(() => {
    setStudyDeck(null);
    setCurrentStudy(null);
  }, []);

  const showAnswer = useCallback(() => {
    if (currentStudy) {
      setCurrentStudy({ ...currentStudy, showAnswer: true });
    }
  }, [currentStudy]);

  // SM-2 spaced repetition algorithm
  const gradeCard = useCallback((quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    if (!currentStudy || !studyDeck) return;

    const cardIndex = cards.findIndex((c) => c.id === currentStudy.cardId);
    if (cardIndex === -1) return;

    const card = cards[cardIndex];
    let { interval, easeFactor, repetitions } = card;

    if (quality >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions++;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = Math.max(
      1.3,
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );

    const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

    const updatedCards = [...cards];
    updatedCards[cardIndex] = {
      ...card,
      interval,
      easeFactor,
      repetitions,
      nextReview,
    };
    setCards(updatedCards);

    // Move to next due card
    const dueCards = getDueCards(studyDeck).filter((c) => c.id !== card.id);
    if (dueCards.length > 0) {
      setCurrentStudy({ cardId: dueCards[0].id, showAnswer: false });
    } else {
      setCurrentStudy(null);
    }
  }, [cards, currentStudy, studyDeck, getDueCards]);

  const getCurrentCard = useCallback((): Flashcard | null => {
    if (!currentStudy) return null;
    return cards.find((c) => c.id === currentStudy.cardId) || null;
  }, [cards, currentStudy]);

  const getCardsByDeck = useCallback((deckName: string): Flashcard[] => {
    return cards.filter((c) => c.deck === deckName);
  }, [cards]);

  const deleteDeck = useCallback((deckName: string) => {
    setCards((prev) => prev.filter((c) => c.deck !== deckName));
    if (studyDeck === deckName) {
      endStudy();
    }
  }, [studyDeck, endStudy]);

  const getTotalStats = useCallback(() => {
    const now = Date.now();
    const totalCards = cards.length;
    const dueCards = cards.filter((c) => c.nextReview <= now).length;
    const masteredCards = cards.filter((c) => c.interval >= 21).length;
    return { totalCards, dueCards, masteredCards };
  }, [cards]);

  return {
    cards,
    currentStudy,
    studyDeck,
    editingCard,
    setEditingCard,
    addCard,
    updateCard,
    deleteCard,
    getDecks,
    getDueCards,
    startStudy,
    endStudy,
    showAnswer,
    gradeCard,
    getCurrentCard,
    getCardsByDeck,
    deleteDeck,
    getTotalStats,
  };
}
