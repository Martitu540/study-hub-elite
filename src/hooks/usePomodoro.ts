import { useState, useEffect, useCallback, useRef } from "react";

export type SessionType = "focus" | "shortBreak" | "longBreak";

interface PomodoroSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
}

interface DailyStats {
  date: string;
  focusSessions: number;
  totalFocusMinutes: number;
  completedAt: string[];
}

interface PomodoroState {
  settings: PomodoroSettings;
  dailyStats: DailyStats;
  currentSession: number;
}

const STORAGE_KEY = "pomodoro-state";

const productivityTips = [
  "Take a moment to stretch and move around. Physical movement helps refresh your mind and maintain focus for the next session.",
  "Stay hydrated! Drinking water during breaks helps maintain cognitive function and concentration.",
  "Great work! Consider jotting down what you accomplished in that session to track your progress.",
  "Use the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain.",
  "Reward yourself! Celebrating small wins keeps you motivated for the next study session.",
  "Quick tip: Review your notes from the last session before starting the next one to strengthen memory.",
  "Take a few deep breaths. Oxygen helps your brain function better and reduces stress.",
  "Consider changing your environment slightly - even a small change can boost creativity and focus.",
  "Excellent session! Remember, consistency beats intensity. Keep up the steady progress.",
  "Pro tip: Write down any distracting thoughts that came up so you can address them later without breaking focus.",
];

const getToday = () => new Date().toISOString().split("T")[0];

const getDefaultSettings = (): PomodoroSettings => ({
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
});

const getDefaultDailyStats = (): DailyStats => ({
  date: getToday(),
  focusSessions: 0,
  totalFocusMinutes: 0,
  completedAt: [],
});

const loadState = (): PomodoroState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PomodoroState;
      // Reset daily stats if it's a new day
      if (parsed.dailyStats.date !== getToday()) {
        parsed.dailyStats = getDefaultDailyStats();
        parsed.currentSession = 1;
      }
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load pomodoro state:", e);
  }
  return {
    settings: getDefaultSettings(),
    dailyStats: getDefaultDailyStats(),
    currentSession: 1,
  };
};

const saveState = (state: PomodoroState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save pomodoro state:", e);
  }
};

export function usePomodoro() {
  const [state, setState] = useState<PomodoroState>(loadState);
  const [sessionType, setSessionType] = useState<SessionType>("focus");
  const [timeLeft, setTimeLeft] = useState(state.settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState("");
  
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleV9ecIeflpVoSzlNfJTIzr+dgnBeVU9ghrHR1LqQb1lMQkNZerjz2LqQaFBBM0Fbj9bi5cykgWhYSkA+TXee0ePkzayCbmZbT0NEWIer0tzXtY9wX1hUSUpbhqrQ2NDAmnlkWVBKR1Ncerza4ti0jm5gWFRQUl1qjLbM0ci2mX5pXVVOT1loeJe0xMS8qpN/b2JaU09WWmyFlrC9wr6sln9uYFhRTlRcaoOTpbS6t6ySgXJlXFZSVV1rgZSksbe2qpF+b2RcV1VXXmuBkqGvtrSqkn9wZV5ZV1lda36Pn6uyr6mRgHJmX1tZW19tfpGepq2so5B/cmdhXltdYGx9jp2nq6ecj4ByZ2JeXF9jbX2MmqSoo5aPgXRoY19dYWVtfIuZoqajlo+Bc2lkYF9hZWx6iZefo6OWj4J0amVhYGJmbnqIlp2hoJWOgXVrZmJgY2dveoaUm5+elI2Adm1oY2JkZ29+hJKZnZyTi39zbGdjY2VocH2EkZibnJKLf3Nsamdqa29+g5CXmpqRin10bm5ub3R4fYGMkpOSkIdycG1tbm9xdHh9ho2RkZCFcXBubm9vb3J2fIeMkJCPhXFwbW5vb29wdHiCiY6QkIhzb2xtbm9vb3F3fYeMj5CIc25sbG5vb29xd32GjJCQinNubWxtbm9wcXZ8hYuPkIt1bm1sbG1vb3B1eYOJjpCMdm1tbGxtbm9wdHmChoyPjHdsbGxsbG1vb3J3gYeMj413a2xrbGxtbm9xdX+FioyOeGtrbGtrbG1ub3J4gYeLjo14a2trbGtsbG1wcnmChomNjnlqa2trbGxtbGxwd3+EiIuOenBtbm9ucXBtbW93fYGGiIp5c3BycnJzcG9ucHV8gYWGiHl1c3R1dXRycG9wdHt/g4WGd3Z2d3d3d3ZzcHBzenyBg4R3eHh5eXl5eHVycXN4fH+CgnZ6e3t7e3t6d3RydHd7foF/dXx+fn5+fXt4dXR2eXx/fnJ+gIGBgYB+e3h2dXd5fH57cICDg4ODgn98end3d3l7fHlvgYOEhYSCgH57eXd3eHp7dm+BhISFhIOBfnt5eHd4eXpzb4GEhIWEg4B+fHp5eXl5eHBvgYSEhYSDgH58e3p5eXl4b2+AhISFhIOAfnx7enl5eXhuboCEhIWEg4B+fHt6eXl5eG5ugISDhYSDgH58e3p5eXl4bm5/g4OEg4OAfnx7enp5eXhubX+DgoSEg4B+fHt6enl5eG5tf4OChIOCgH18e3p6eXl5bm1/goKEg4OAfXx7enp5eXlubH+CgoSDgoB9fHt6enp5eW5sf4KCg4OCgH18e3p6enl5bmx+goKDgoKAfXx7e3p6eXlubH6CgoKCgoB9fHt7enp6eW5rfYKCgoKCgH18e3t7enp6b2t9gYGCgoKAfXx7e3t6enptanyBgYKCgoB9fHt7e3p6em1qfIGBgoKBgH18e3t7e3p6bmp8gYGBgoGAfXx8e3t7e3pvant/gICBgYB9fHx7e3t7em9pe3+AgIGBgH18fHt7e3t7cGl7f4CAgYGAfXx8fHt7e3twaXp/gICAgIB+fHx8fHt7e3Boen9/gICAgH58fHx8e3t8cWh6fn9/gIB/fnx8fHx8fHxwaHp+f3+AgH9+fHx8fHx8fHFoeX5+f3+Af358fHx8fHx8cWh5fn5/f4B/fnx8fHx8fHxxZ3l+fn5/f39+fXx8fHx8fXFneH1+fn5/f358fHx8fHx9cWd4fX5+fn5/fnx8fHx9fX1xZ3h9fn5+fn9+fXx8fH19fXJnd319fn5+fn59fX19fX19cnZ2dXV1dXV1dXV1dXV1dXV1");
  }, []);

  // Save state on changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Update time when settings or session type changes
  useEffect(() => {
    if (!isRunning) {
      const duration = getDuration(sessionType);
      setTimeLeft(duration * 60);
    }
  }, [state.settings, sessionType]);

  const getDuration = useCallback((type: SessionType) => {
    switch (type) {
      case "focus":
        return state.settings.focusDuration;
      case "shortBreak":
        return state.settings.shortBreakDuration;
      case "longBreak":
        return state.settings.longBreakDuration;
    }
  }, [state.settings]);

  const playNotification = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const getRandomTip = useCallback(() => {
    return productivityTips[Math.floor(Math.random() * productivityTips.length)];
  }, []);

  const completeSession = useCallback(() => {
    playNotification();
    
    if (sessionType === "focus") {
      // Update daily stats
      setState((prev) => ({
        ...prev,
        dailyStats: {
          ...prev.dailyStats,
          focusSessions: prev.dailyStats.focusSessions + 1,
          totalFocusMinutes: prev.dailyStats.totalFocusMinutes + prev.settings.focusDuration,
          completedAt: [...prev.dailyStats.completedAt, new Date().toISOString()],
        },
        currentSession: prev.currentSession + 1,
      }));

      // Show productivity tip
      setCurrentTip(getRandomTip());
      setShowTip(true);

      // Determine next session type
      const nextSession = state.currentSession + 1;
      if (nextSession > state.settings.sessionsBeforeLongBreak) {
        setSessionType("longBreak");
        setState((prev) => ({ ...prev, currentSession: 1 }));
      } else {
        setSessionType("shortBreak");
      }
    } else {
      // After break, go back to focus
      setSessionType("focus");
      setShowTip(false);
    }

    setIsRunning(false);
  }, [sessionType, state.currentSession, state.settings, playNotification, getRandomTip]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, completeSession]);

  const start = useCallback(() => {
    setShowTip(false);
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getDuration(sessionType) * 60);
    setShowTip(false);
  }, [sessionType, getDuration]);

  const skipToNext = useCallback(() => {
    completeSession();
  }, [completeSession]);

  const switchSession = useCallback((type: SessionType) => {
    setIsRunning(false);
    setSessionType(type);
    setTimeLeft(getDuration(type) * 60);
    setShowTip(false);
  }, [getDuration]);

  const updateSettings = useCallback((newSettings: Partial<PomodoroSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
  }, []);

  const dismissTip = useCallback(() => {
    setShowTip(false);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = 1 - timeLeft / (getDuration(sessionType) * 60);

  return {
    // Time
    minutes,
    seconds,
    timeLeft,
    progress,
    isRunning,
    
    // Session
    sessionType,
    currentSession: state.currentSession,
    settings: state.settings,
    
    // Stats
    dailyStats: state.dailyStats,
    
    // Tip
    showTip,
    currentTip,
    dismissTip,
    
    // Actions
    start,
    pause,
    reset,
    skipToNext,
    switchSession,
    updateSettings,
  };
}
