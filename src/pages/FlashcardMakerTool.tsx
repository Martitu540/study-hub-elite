import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFlashcards, Flashcard } from "@/hooks/useFlashcards";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Clock,
  CalendarDays,
  Calculator,
  BookOpen,
  RotateCcw,
  Eye,
  Brain,
  Layers,
  Check,
  X,
  Pencil,
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  Meh,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const relatedTools = [
  {
    title: "Pomodoro Timer",
    description: "Stay focused with timed study sessions and breaks.",
    icon: Clock,
    slug: "pomodoro-timer",
  },
  {
    title: "Study Plan Generator",
    description: "Create a personalized study schedule for your exams.",
    icon: CalendarDays,
    slug: "study-plan-generator",
  },
  {
    title: "GPA Calculator",
    description: "Calculate your grade point average quickly.",
    icon: Calculator,
    slug: "gpa-calculator",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Flashcard Maker - Free Digital Flashcards with Spaced Repetition",
  description:
    "Create and study digital flashcards with built-in spaced repetition. Organize cards into decks, track your progress, and master any subject with our free flashcard maker.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Create unlimited flashcards",
    "Organize cards into decks",
    "Spaced repetition algorithm",
    "Track mastery progress",
    "Save progress automatically",
  ],
};

export default function FlashcardMakerTool() {
  const {
    currentStudy,
    studyDeck,
    editingCard,
    setEditingCard,
    addCard,
    updateCard,
    deleteCard,
    getDecks,
    startStudy,
    endStudy,
    showAnswer,
    gradeCard,
    getCurrentCard,
    getCardsByDeck,
    deleteDeck,
    getTotalStats,
  } = useFlashcards();

  const [newCard, setNewCard] = useState({ front: "", back: "", deck: "" });
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const decks = getDecks();
  const stats = getTotalStats();
  const currentCard = getCurrentCard();

  const handleAddCard = () => {
    if (newCard.front.trim() && newCard.back.trim()) {
      addCard(newCard.front, newCard.back, newCard.deck || selectedDeck || "General");
      setNewCard({ front: "", back: "", deck: "" });
      setShowCreateForm(false);
    }
  };

  const handleUpdateCard = () => {
    if (editingCard && editingCard.front.trim() && editingCard.back.trim()) {
      updateCard(editingCard.id, editingCard.front, editingCard.back, editingCard.deck);
    }
  };

  // Study Mode View
  if (studyDeck && currentCard) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex flex-col animate-fade-in">
          <div className="container py-6">
            <Button
              variant="ghost"
              onClick={endStudy}
              className="text-muted-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
              Exit Study
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-center pb-16">
            <div className="w-full max-w-xl px-4">
              <div className="text-center mb-6">
                <span className="text-caption text-muted-foreground">
                  Studying: {studyDeck}
                </span>
              </div>

              {/* Flashcard */}
              <div
                className={cn(
                  "bg-card rounded-2xl border-2 border-border p-8 md:p-12 min-h-[300px] flex items-center justify-center cursor-pointer transition-all",
                  !currentStudy?.showAnswer && "hover:border-primary/50"
                )}
                onClick={() => !currentStudy?.showAnswer && showAnswer()}
              >
                <div className="text-center">
                  {!currentStudy?.showAnswer ? (
                    <>
                      <p className="text-caption text-muted-foreground mb-4">
                        Question
                      </p>
                      <p className="text-subtitle md:text-title font-semibold text-heading">
                        {currentCard.front}
                      </p>
                      <p className="text-caption text-muted-foreground mt-8">
                        Click to reveal answer
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-caption text-muted-foreground mb-4">
                        Answer
                      </p>
                      <p className="text-subtitle md:text-title font-semibold text-heading">
                        {currentCard.back}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Rating Buttons */}
              {currentStudy?.showAnswer && (
                <div className="mt-8 animate-fade-in">
                  <p className="text-center text-caption text-muted-foreground mb-4">
                    How well did you know this?
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => gradeCard(1)}
                      className="flex-1 max-w-32 flex-col h-auto py-4 border-destructive/30 hover:bg-destructive/10"
                    >
                      <ThumbsDown className="w-5 h-5 mb-1 text-destructive" />
                      <span className="text-small">Again</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => gradeCard(3)}
                      className="flex-1 max-w-32 flex-col h-auto py-4 border-yellow-500/30 hover:bg-yellow-500/10"
                    >
                      <Meh className="w-5 h-5 mb-1 text-yellow-500" />
                      <span className="text-small">Hard</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => gradeCard(4)}
                      className="flex-1 max-w-32 flex-col h-auto py-4 border-primary/30 hover:bg-primary/10"
                    >
                      <ThumbsUp className="w-5 h-5 mb-1 text-primary" />
                      <span className="text-small">Good</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => gradeCard(5)}
                      className="flex-1 max-w-32 flex-col h-auto py-4 border-green-500/30 hover:bg-green-500/10"
                    >
                      <Sparkles className="w-5 h-5 mb-1 text-green-500" />
                      <span className="text-small">Easy</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Study Complete View
  if (studyDeck && !currentCard) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center animate-fade-in">
          <div className="text-center max-w-md px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-500/10 mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-subtitle font-bold text-heading mb-3">
              All caught up!
            </h2>
            <p className="text-body text-muted-foreground mb-8">
              You've reviewed all due cards in this deck. Come back later for
              more practice.
            </p>
            <Button onClick={endStudy} size="lg">
              Back to Decks
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Deck Detail View
  if (selectedDeck) {
    const deckCards = getCardsByDeck(selectedDeck);

    return (
      <Layout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="animate-fade-in">
          <header className="bg-surface border-b border-divider">
            <div className="container py-8 md:py-12">
              <Button
                variant="ghost"
                onClick={() => setSelectedDeck(null)}
                className="text-muted-foreground mb-4"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Decks
              </Button>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-title font-bold text-heading">
                    {selectedDeck}
                  </h1>
                  <p className="text-body-lg text-body">
                    {deckCards.length} cards in this deck
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => startStudy(selectedDeck)}
                    disabled={deckCards.length === 0}
                  >
                    <Brain className="w-4 h-4" />
                    Study Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateForm(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Add Card
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="container py-8 md:py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Add Card Form */}
                {showCreateForm && (
                  <div className="bg-card rounded-xl border border-border p-6 mb-6 animate-fade-in">
                    <h3 className="font-semibold text-heading mb-4">
                      Add New Card
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="front">Front (Question)</Label>
                        <Textarea
                          id="front"
                          placeholder="Enter the question or term..."
                          value={newCard.front}
                          onChange={(e) =>
                            setNewCard({ ...newCard, front: e.target.value })
                          }
                          className="mt-1.5"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="back">Back (Answer)</Label>
                        <Textarea
                          id="back"
                          placeholder="Enter the answer or definition..."
                          value={newCard.back}
                          onChange={(e) =>
                            setNewCard({ ...newCard, back: e.target.value })
                          }
                          className="mt-1.5"
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={handleAddCard} disabled={!newCard.front.trim() || !newCard.back.trim()}>
                          <Plus className="w-4 h-4" />
                          Add Card
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowCreateForm(false);
                            setNewCard({ front: "", back: "", deck: "" });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cards List */}
                {deckCards.length === 0 ? (
                  <div className="bg-surface rounded-xl p-12 text-center">
                    <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-heading mb-2">
                      No cards yet
                    </h3>
                    <p className="text-caption text-muted-foreground mb-4">
                      Start adding flashcards to this deck.
                    </p>
                    <Button onClick={() => setShowCreateForm(true)}>
                      <Plus className="w-4 h-4" />
                      Add First Card
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {deckCards.map((card) => (
                      <div
                        key={card.id}
                        className="bg-card rounded-xl border border-border p-4"
                      >
                        {editingCard?.id === card.id ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editingCard.front}
                              onChange={(e) =>
                                setEditingCard({
                                  ...editingCard,
                                  front: e.target.value,
                                })
                              }
                              rows={2}
                              placeholder="Front"
                            />
                            <Textarea
                              value={editingCard.back}
                              onChange={(e) =>
                                setEditingCard({
                                  ...editingCard,
                                  back: e.target.value,
                                })
                              }
                              rows={2}
                              placeholder="Back"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleUpdateCard}>
                                <Check className="w-4 h-4" />
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingCard(null)}
                              >
                                <X className="w-4 h-4" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-heading mb-1 line-clamp-2">
                                {card.front}
                              </p>
                              <p className="text-caption text-muted-foreground line-clamp-2">
                                {card.back}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingCard(card)}
                                className="text-muted-foreground"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteCard(card.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Danger Zone */}
                <div className="mt-8 pt-8 border-t border-divider">
                  <h3 className="font-semibold text-heading mb-4">
                    Danger Zone
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => {
                      deleteDeck(selectedDeck);
                      setSelectedDeck(null);
                    }}
                    className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Deck
                  </Button>
                </div>
              </div>

              <aside className="space-y-6">
                <AdPlaceholder variant="sidebar" />
              </aside>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Main Decks View
  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="animate-fade-in">
        {/* Tool Header */}
        <header className="bg-surface border-b border-divider">
          <div className="container py-8 md:py-12">
            <div className="max-w-3xl">
              <Link
                to="/category/tools"
                className="inline-flex items-center gap-2 text-caption text-body hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to tools
              </Link>

              <h1 className="text-title font-bold text-heading mb-3">
                Flashcard Maker
              </h1>
              <p className="text-body-lg text-body">
                Create digital flashcards with built-in spaced repetition.
                Organize your cards into decks and master any subject
                efficiently.
              </p>
            </div>
          </div>
        </header>

        {/* Tool Content */}
        <div className="container py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Tool */}
            <div className="lg:col-span-2">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-card rounded-xl border border-border p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                    <Layers className="w-5 h-5" />
                  </div>
                  <p className="text-subtitle font-bold text-heading">
                    {stats.totalCards}
                  </p>
                  <p className="text-small text-muted-foreground">Total Cards</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                    <Clock className="w-5 h-5" />
                  </div>
                  <p className="text-subtitle font-bold text-heading">
                    {stats.dueCards}
                  </p>
                  <p className="text-small text-muted-foreground">Due Today</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10 text-green-500 mx-auto mb-2">
                    <Check className="w-5 h-5" />
                  </div>
                  <p className="text-subtitle font-bold text-heading">
                    {stats.masteredCards}
                  </p>
                  <p className="text-small text-muted-foreground">Mastered</p>
                </div>
              </div>

              {/* Create New Deck/Card */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                <h2 className="text-subtitle font-bold text-heading mb-6">
                  Create New Card
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="front">Front (Question)</Label>
                    <Textarea
                      id="front"
                      placeholder="Enter the question or term..."
                      value={newCard.front}
                      onChange={(e) =>
                        setNewCard({ ...newCard, front: e.target.value })
                      }
                      className="mt-1.5"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="back">Back (Answer)</Label>
                    <Textarea
                      id="back"
                      placeholder="Enter the answer or definition..."
                      value={newCard.back}
                      onChange={(e) =>
                        setNewCard({ ...newCard, back: e.target.value })
                      }
                      className="mt-1.5"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deck">Deck Name</Label>
                    <Input
                      id="deck"
                      placeholder="e.g., Biology, Spanish Vocabulary..."
                      value={newCard.deck}
                      onChange={(e) =>
                        setNewCard({ ...newCard, deck: e.target.value })
                      }
                      className="mt-1.5"
                      maxLength={50}
                    />
                  </div>
                  <Button onClick={handleAddCard} disabled={!newCard.front.trim() || !newCard.back.trim()}>
                    <Plus className="w-4 h-4" />
                    Add Card
                  </Button>
                </div>
              </div>

              {/* Decks List */}
              <div>
                <h2 className="text-subtitle font-bold text-heading mb-6">
                  Your Decks
                </h2>
                {decks.length === 0 ? (
                  <div className="bg-surface rounded-xl p-12 text-center">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-heading mb-2">
                      No decks yet
                    </h3>
                    <p className="text-caption text-muted-foreground">
                      Create your first flashcard above to get started.
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {decks.map((deck) => (
                      <div
                        key={deck.name}
                        className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedDeck(deck.name)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-primary">
                            <Layers className="w-5 h-5" />
                          </div>
                          {deck.dueCount > 0 && (
                            <span className="px-2 py-0.5 text-small font-medium bg-primary text-primary-foreground rounded-full">
                              {deck.dueCount} due
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-heading mb-1">
                          {deck.name}
                        </h3>
                        <p className="text-caption text-muted-foreground">
                          {deck.cardCount} cards
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              startStudy(deck.name);
                            }}
                            disabled={deck.dueCount === 0}
                          >
                            <Brain className="w-4 h-4" />
                            Study
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDeck(deck.name);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ad Banner */}
              <div className="mt-8">
                <AdPlaceholder variant="banner" />
              </div>

              {/* SEO Content */}
              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">
                  What is Spaced Repetition?
                </h2>
                <div className="prose">
                  <p>
                    <strong>Spaced repetition</strong> is a learning technique
                    that involves reviewing information at gradually increasing
                    intervals. This method is scientifically proven to be one of
                    the most effective ways to memorize large amounts of
                    information.
                  </p>
                  <p>
                    Our flashcard maker uses the SM-2 algorithm, the same system
                    used by popular apps like Anki. When you review a card, you
                    rate how well you knew it, and the algorithm schedules the
                    next review accordingly.
                  </p>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">
                  Tips for Effective Flashcard Study
                </h2>
                <div className="prose">
                  <ul>
                    <li>
                      <strong>Keep cards simple</strong> – One fact per card
                      works better than cramming multiple concepts.
                    </li>
                    <li>
                      <strong>Use active recall</strong> – Always try to answer
                      before flipping the card.
                    </li>
                    <li>
                      <strong>Study regularly</strong> – Short daily sessions are
                      more effective than long cramming sessions.
                    </li>
                    <li>
                      <strong>Be honest with ratings</strong> – Accurate
                      self-assessment improves the algorithm's effectiveness.
                    </li>
                    <li>
                      <strong>Add context</strong> – Include examples or
                      mnemonics to make cards memorable.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Internal Links CTA */}
              <section className="mt-10 bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-heading mb-2">
                  Maximize Your Study Sessions
                </h3>
                <p className="text-caption text-body mb-4">
                  Combine flashcards with the Pomodoro Technique for focused,
                  effective study sessions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm" asChild>
                    <Link to="/tool/pomodoro-timer">Try Pomodoro Timer</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/article/active-recall-spaced-repetition">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </section>

              {/* Related Tools */}
              <section className="mt-12 pt-8 border-t border-divider">
                <h2 className="text-subtitle font-bold text-heading mb-6">
                  Related Tools
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTools.map((tool) => (
                    <ToolCard key={tool.slug} {...tool} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AdPlaceholder variant="sidebar" />

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-heading mb-4">How It Works</h3>
                <ul className="space-y-3 text-caption text-body">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">1.</span>
                    Create flashcards with questions and answers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">2.</span>
                    Organize cards into decks by subject
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">3.</span>
                    Study due cards and rate your recall
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">4.</span>
                    Algorithm schedules optimal review times
                  </li>
                </ul>
              </div>

              <div className="bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-heading mb-2">
                  Need a Study Plan?
                </h3>
                <p className="text-caption text-body mb-4">
                  Generate a personalized study schedule for your exams.
                </p>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/tool/study-plan-generator">Create Plan</Link>
                </Button>
              </div>

              <AdPlaceholder variant="sidebar" />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
