import { useState, useCallback } from "react";

export interface StudyPlanInput {
  subject: string;
  examDate: string;
  dailyHours: number;
}

export interface DailyTask {
  day: string;
  date: string;
  tasks: string[];
  focusArea: string;
  hours: number;
  isReview: boolean;
}

export interface WeeklyPlan {
  week: number;
  startDate: string;
  endDate: string;
  theme: string;
  days: DailyTask[];
  totalHours: number;
}

export interface StudyPlan {
  subject: string;
  examDate: string;
  totalDays: number;
  totalHours: number;
  weeklyPlans: WeeklyPlan[];
  tips: string[];
}

const studyPhases = [
  { name: "Foundation & Overview", weight: 0.25 },
  { name: "Deep Dive & Understanding", weight: 0.35 },
  { name: "Practice & Application", weight: 0.25 },
  { name: "Review & Consolidation", weight: 0.15 },
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const studyTips = [
  "Use the Pomodoro Technique: Study for 25 minutes, then take a 5-minute break.",
  "Create summary notes after each study session to reinforce learning.",
  "Practice active recall by testing yourself without looking at notes.",
  "Get adequate sleep - your brain consolidates memories during rest.",
  "Stay hydrated and take regular breaks to maintain focus.",
  "Study in different locations to improve memory retention.",
  "Explain concepts out loud as if teaching someone else.",
  "Use spaced repetition for better long-term retention.",
];

const generateTasks = (phase: string, subject: string, hours: number, isReview: boolean): string[] => {
  const tasks: string[] = [];
  
  if (isReview) {
    tasks.push(`Review previous ${subject} material (${Math.round(hours * 0.4 * 60)} min)`);
    tasks.push(`Self-test on key concepts (${Math.round(hours * 0.3 * 60)} min)`);
    tasks.push(`Identify and address weak areas (${Math.round(hours * 0.3 * 60)} min)`);
  } else if (phase.includes("Foundation")) {
    tasks.push(`Read and summarize ${subject} fundamentals (${Math.round(hours * 0.5 * 60)} min)`);
    tasks.push(`Create concept maps or outlines (${Math.round(hours * 0.3 * 60)} min)`);
    tasks.push(`Note key terms and definitions (${Math.round(hours * 0.2 * 60)} min)`);
  } else if (phase.includes("Deep Dive")) {
    tasks.push(`In-depth study of ${subject} topics (${Math.round(hours * 0.5 * 60)} min)`);
    tasks.push(`Work through examples and explanations (${Math.round(hours * 0.3 * 60)} min)`);
    tasks.push(`Connect concepts to real-world applications (${Math.round(hours * 0.2 * 60)} min)`);
  } else if (phase.includes("Practice")) {
    tasks.push(`Solve practice problems for ${subject} (${Math.round(hours * 0.5 * 60)} min)`);
    tasks.push(`Review mistakes and understand solutions (${Math.round(hours * 0.3 * 60)} min)`);
    tasks.push(`Time yourself on sample questions (${Math.round(hours * 0.2 * 60)} min)`);
  } else {
    tasks.push(`Comprehensive review of ${subject} (${Math.round(hours * 0.4 * 60)} min)`);
    tasks.push(`Practice past exam questions (${Math.round(hours * 0.4 * 60)} min)`);
    tasks.push(`Final self-assessment (${Math.round(hours * 0.2 * 60)} min)`);
  }
  
  return tasks;
};

export function useStudyPlan() {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePlan = useCallback((input: StudyPlanInput): StudyPlan | null => {
    setIsGenerating(true);
    
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const examDate = new Date(input.examDate);
      examDate.setHours(0, 0, 0, 0);
      
      const diffTime = examDate.getTime() - today.getTime();
      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (totalDays < 1) {
        setIsGenerating(false);
        return null;
      }
      
      const totalHours = totalDays * input.dailyHours;
      const weeklyPlans: WeeklyPlan[] = [];
      
      let currentDate = new Date(today);
      let weekNumber = 1;
      let daysProcessed = 0;
      
      // Calculate phase boundaries
      let phaseIndex = 0;
      let phaseDayCounter = 0;
      const phaseDays = studyPhases.map(p => Math.max(1, Math.floor(totalDays * p.weight)));
      
      // Adjust last phase to account for any remaining days
      const sumPhaseDays = phaseDays.reduce((a, b) => a + b, 0);
      phaseDays[phaseDays.length - 1] += totalDays - sumPhaseDays;
      
      while (daysProcessed < totalDays) {
        const weekDays: DailyTask[] = [];
        const weekStart = new Date(currentDate);
        let weekHours = 0;
        
        // Generate days for this week (up to 7 days or remaining days)
        for (let d = 0; d < 7 && daysProcessed < totalDays; d++) {
          const dayDate = new Date(currentDate);
          const dayName = dayNames[dayDate.getDay()];
          
          // Every 3rd day is a review day
          const isReview = daysProcessed > 0 && (daysProcessed + 1) % 3 === 0;
          
          const currentPhase = studyPhases[phaseIndex]?.name || studyPhases[studyPhases.length - 1].name;
          
          const dayTask: DailyTask = {
            day: dayName,
            date: dayDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            tasks: generateTasks(currentPhase, input.subject, input.dailyHours, isReview),
            focusArea: isReview ? "Review & Reinforce" : currentPhase,
            hours: input.dailyHours,
            isReview,
          };
          
          weekDays.push(dayTask);
          weekHours += input.dailyHours;
          
          currentDate.setDate(currentDate.getDate() + 1);
          daysProcessed++;
          phaseDayCounter++;
          
          // Move to next phase if needed
          if (phaseDayCounter >= phaseDays[phaseIndex] && phaseIndex < studyPhases.length - 1) {
            phaseIndex++;
            phaseDayCounter = 0;
          }
        }
        
        const weekEnd = new Date(currentDate);
        weekEnd.setDate(weekEnd.getDate() - 1);
        
        weeklyPlans.push({
          week: weekNumber,
          startDate: weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          endDate: weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          theme: studyPhases[Math.min(phaseIndex, studyPhases.length - 1)].name,
          days: weekDays,
          totalHours: weekHours,
        });
        
        weekNumber++;
      }
      
      // Select random tips
      const selectedTips = [...studyTips]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      
      const generatedPlan: StudyPlan = {
        subject: input.subject,
        examDate: input.examDate,
        totalDays,
        totalHours,
        weeklyPlans,
        tips: selectedTips,
      };
      
      setPlan(generatedPlan);
      setIsGenerating(false);
      return generatedPlan;
    } catch (e) {
      console.error("Failed to generate study plan:", e);
      setIsGenerating(false);
      return null;
    }
  }, []);

  const clearPlan = useCallback(() => {
    setPlan(null);
  }, []);

  return {
    plan,
    isGenerating,
    generatePlan,
    clearPlan,
  };
}
