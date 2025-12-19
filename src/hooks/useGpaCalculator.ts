import { useState, useCallback, useEffect } from "react";

export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export interface GpaResult {
  gpa: number;
  totalCredits: number;
  totalPoints: number;
}

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "D-": 0.7,
  "F": 0.0,
};

export const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

const STORAGE_KEY = "studyflow_gpa_courses";

const generateId = () => Math.random().toString(36).substring(2, 9);

export function useGpaCalculator() {
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load GPA data:", e);
    }
    return [{ id: generateId(), name: "", credits: 3, grade: "A" }];
  });

  const [result, setResult] = useState<GpaResult | null>(null);

  // Save to localStorage whenever courses change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    } catch (e) {
      console.error("Failed to save GPA data:", e);
    }
  }, [courses]);

  const addCourse = useCallback(() => {
    setCourses((prev) => [
      ...prev,
      { id: generateId(), name: "", credits: 3, grade: "A" },
    ]);
  }, []);

  const removeCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCourse = useCallback(
    (id: string, field: keyof Course, value: string | number) => {
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
      );
    },
    []
  );

  const calculateGpa = useCallback(() => {
    const validCourses = courses.filter(
      (c) => c.credits > 0 && GRADE_POINTS[c.grade] !== undefined
    );

    if (validCourses.length === 0) {
      setResult({ gpa: 0, totalCredits: 0, totalPoints: 0 });
      return;
    }

    let totalCredits = 0;
    let totalPoints = 0;

    validCourses.forEach((course) => {
      const gradePoints = GRADE_POINTS[course.grade];
      totalCredits += course.credits;
      totalPoints += gradePoints * course.credits;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    setResult({
      gpa: Math.round(gpa * 1000) / 1000,
      totalCredits,
      totalPoints: Math.round(totalPoints * 100) / 100,
    });
  }, [courses]);

  const clearAll = useCallback(() => {
    setCourses([{ id: generateId(), name: "", credits: 3, grade: "A" }]);
    setResult(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear GPA data:", e);
    }
  }, []);

  const getGpaColor = useCallback((gpa: number) => {
    if (gpa >= 3.7) return "text-green-500";
    if (gpa >= 3.0) return "text-primary";
    if (gpa >= 2.0) return "text-yellow-500";
    return "text-destructive";
  }, []);

  const getGpaLabel = useCallback((gpa: number) => {
    if (gpa >= 3.9) return "Excellent";
    if (gpa >= 3.7) return "Very Good";
    if (gpa >= 3.3) return "Good";
    if (gpa >= 3.0) return "Above Average";
    if (gpa >= 2.5) return "Average";
    if (gpa >= 2.0) return "Below Average";
    if (gpa >= 1.0) return "Poor";
    return "Failing";
  }, []);

  return {
    courses,
    result,
    addCourse,
    removeCourse,
    updateCourse,
    calculateGpa,
    clearAll,
    getGpaColor,
    getGpaLabel,
    GRADE_OPTIONS,
  };
}
