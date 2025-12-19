import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Article from "./pages/Article";
import PomodoroTool from "./pages/PomodoroTool";
import StudyPlanTool from "./pages/StudyPlanTool";
import GpaCalculatorTool from "./pages/GpaCalculatorTool";
import FlashcardMakerTool from "./pages/FlashcardMakerTool";
import Category from "./pages/Category";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/article/:slug" element={<Article />} />
              <Route path="/tool/pomodoro-timer" element={<PomodoroTool />} />
              <Route path="/tool/study-plan-generator" element={<StudyPlanTool />} />
              <Route path="/tool/gpa-calculator" element={<GpaCalculatorTool />} />
              <Route path="/tool/flashcard-maker" element={<FlashcardMakerTool />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
