import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CourseRecommendations from "./pages/CourseRecommendations";
import ScheduleOptimizer from "./pages/ScheduleOptimizer";
import Achievements from "./pages/Achievements";
import SmartQuiz from "./pages/SmartQuiz";
import Feedback from "./pages/Feedback";
import TutorChat from "./pages/TutorChat";
import VoicePrompt from "./pages/VoicePrompt";
import AiLearningPath from "./pages/AiLearningPath";
import CareerRoadmap from "./pages/CareerRoadmap";
import CvGenerator from "./pages/CvGenerator";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillGap from "./pages/SkillGap";
import LanguageSwitcher from "./pages/LanguageSwitcher";
import LearningSchedule from './pages/LearningSchedule';
import SetGoal from './pages/SetGoal';
import AdaptiveAssessments from './pages/AdaptiveAssessments';
import Notifications from './pages/Notifications';
import ContentManagement from './pages/ContentManagement';
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react';
import ClerkCentered from './components/ClerkCentered';

const queryClient = new QueryClient();

const clerkAppearance = {
  variables: {
    colorPrimary: "#08272a",
    colorText: "#08272a",
    colorBackground: "#f7fafc",
    colorInputBackground: "#fff",
    colorInputText: "#08272a",
    colorInputBorder: "#edf5ee",
    colorDanger: "#e53e3e",
    colorSuccess: "#38a169",
    colorAlphaShade: "#e3ffcd",
    colorTextOnPrimaryBackground: "#fff",
    colorTextSecondary: "#6b7280",
  },
  elements: {
    card: "rounded-xl shadow-lg border border-[#edf5ee]",
    formButtonPrimary: "bg-[#08272a] hover:bg-[#08272a]/90 text-white rounded-lg font-semibold",
    headerTitle: "text-[#08272a] font-bold",
    headerSubtitle: "text-[#08272a]/70",
    socialButtonsBlockButton: "rounded-lg",
    footerActionLink: "text-[#08272a] font-semibold hover:underline",
    formFieldInput: "rounded-lg border-[#edf5ee] focus:ring-[#08272a]",
    formFieldLabel: "text-[#08272a] font-medium",
  }
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Clerk Auth Pages */}
              <Route path="/sign-in/*" element={<ClerkCentered><SignIn appearance={clerkAppearance} routing="path" path="/sign-in" /></ClerkCentered>} />
              <Route path="/sign-up/*" element={<ClerkCentered><SignUp appearance={clerkAppearance} routing="path" path="/sign-up" /></ClerkCentered>} />
              {/* Protected App Routes */}
              <Route
                path="/"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn redirectUrl="/sign-in" />
                    </SignedOut>
                  </>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="course-recommendations" element={<CourseRecommendations />} />
                <Route path="schedule-optimizer" element={<ScheduleOptimizer />} />
                <Route path="achievements" element={<Achievements />} />
                <Route path="smart-quiz" element={<SmartQuiz />} />
                <Route path="adaptive-assessments" element={<AdaptiveAssessments />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="tutor-chat" element={<TutorChat />} />
                <Route path="voice-prompt" element={<VoicePrompt />} />
                <Route path="ai-learning-path" element={<AiLearningPath />} />
                <Route path="career-roadmap" element={<CareerRoadmap />} />
                <Route path="cv-generator" element={<CvGenerator />} />
                <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
                <Route path="skill-gap" element={<SkillGap />} />
                <Route path="language-switcher" element={<LanguageSwitcher />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="content-management" element={<ContentManagement />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="learning-schedule" element={<LearningSchedule />} />
              <Route path="set-goal" element={<SetGoal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
