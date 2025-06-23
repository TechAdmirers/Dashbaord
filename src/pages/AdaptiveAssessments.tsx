import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, Brain, Target, Clock, CheckCircle, XCircle, 
  ArrowRight, ArrowLeft, Play, Pause, RotateCcw, BarChart3,
  TrendingUp, Zap, Lightbulb, BookOpen, Timer, Award, 
  BrainCircuit, TargetIcon, PieChart, LineChart, Activity,
  Star, Crown, Medal, Trophy, Users, Eye, EyeOff, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'coding';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  timeLimit: number;
  points: number;
  aiInsight?: string;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  questionsCount: number;
  completed: boolean;
  score?: number;
  timeSpent?: number;
  lastAttempted?: Date;
  adaptiveLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface AssessmentResult {
  questionId: string;
  userAnswer: string | number;
  correct: boolean;
  timeSpent: number;
  difficulty: string;
}

const AdaptiveAssessments = () => {
  const { t } = useLanguage();
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({});
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [adaptiveLevel, setAdaptiveLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [activeTab, setActiveTab] = useState('available');

  // Mock assessments data
  const assessments: Assessment[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and control structures.',
      category: 'Programming',
      difficulty: 'Beginner',
      estimatedTime: '15 minutes',
      questionsCount: 10,
      completed: false,
      adaptiveLevel: 'beginner'
    },
    {
      id: '2',
      title: 'React Development',
      description: 'Advanced React concepts including hooks, state management, and component lifecycle.',
      category: 'Frontend',
      difficulty: 'Intermediate',
      estimatedTime: '20 minutes',
      questionsCount: 15,
      completed: false,
      adaptiveLevel: 'intermediate'
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms',
      description: 'Complex problem-solving with various data structures and algorithmic patterns.',
      category: 'Computer Science',
      difficulty: 'Advanced',
      estimatedTime: '30 minutes',
      questionsCount: 20,
      completed: false,
      adaptiveLevel: 'advanced'
    },
    {
      id: '4',
      title: 'Python for Data Science',
      description: 'Python programming with focus on data manipulation and analysis libraries.',
      category: 'Data Science',
      difficulty: 'Intermediate',
      estimatedTime: '25 minutes',
      questionsCount: 18,
      completed: false,
      adaptiveLevel: 'intermediate'
    }
  ];

  // Mock questions data
  const questions: Question[] = [
    {
      id: '1',
      text: 'What is the correct way to declare a variable in JavaScript?',
      type: 'multiple-choice',
      options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
      correctAnswer: 0,
      explanation: 'The correct way to declare a variable in JavaScript is using var, let, or const keywords.',
      difficulty: 'easy',
      category: 'JavaScript',
      timeLimit: 60,
      points: 10,
      aiInsight: 'This is a fundamental concept that most developers should know.'
    },
    {
      id: '2',
      text: 'Which React hook is used for side effects?',
      type: 'multiple-choice',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 1,
      explanation: 'useEffect is the React hook used for handling side effects in functional components.',
      difficulty: 'medium',
      category: 'React',
      timeLimit: 90,
      points: 15,
      aiInsight: 'Understanding hooks is crucial for modern React development.'
    },
    {
      id: '3',
      text: 'What is the time complexity of binary search?',
      type: 'multiple-choice',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 1,
      explanation: 'Binary search has a time complexity of O(log n) as it divides the search space in half with each iteration.',
      difficulty: 'hard',
      category: 'Algorithms',
      timeLimit: 120,
      points: 20,
      aiInsight: 'This is a classic algorithm that demonstrates logarithmic complexity.'
    },
    {
      id: '4',
      text: 'JavaScript is a statically typed language.',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation: 'JavaScript is a dynamically typed language, not statically typed.',
      difficulty: 'easy',
      category: 'JavaScript',
      timeLimit: 45,
      points: 8,
      aiInsight: 'Understanding language characteristics helps in choosing the right tool for the job.'
    },
    {
      id: '5',
      text: 'Complete the code: function calculateSum(a, b) { return _____; }',
      type: 'fill-blank',
      correctAnswer: 'a + b',
      explanation: 'The function should return the sum of parameters a and b.',
      difficulty: 'easy',
      category: 'JavaScript',
      timeLimit: 60,
      points: 10,
      aiInsight: 'Basic function implementation is essential for programming.'
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAssessmentActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleFinishAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAssessmentActive, isPaused, timeRemaining]);

  const startAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setAssessmentResults([]);
    setTimeRemaining(assessment.questionsCount * 60); // 1 minute per question
    setIsAssessmentActive(true);
    setIsPaused(false);
    setShowResults(false);
  };

  const handleAnswer = (answer: string | number) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    
    // Record result
    const result: AssessmentResult = {
      questionId: currentQuestion.id,
      userAnswer: answer,
      correct: answer === currentQuestion.correctAnswer,
      timeSpent: currentQuestion.timeLimit - timeRemaining,
      difficulty: currentQuestion.difficulty
    };
    setAssessmentResults(prev => [...prev, result]);

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleFinishAssessment();
    }
  };

  const handleFinishAssessment = () => {
    setIsAssessmentActive(false);
    setShowResults(true);
    // Calculate adaptive level based on performance
    const correctAnswers = assessmentResults.filter(r => r.correct).length;
    const accuracy = correctAnswers / assessmentResults.length;
    
    if (accuracy >= 0.8) {
      setAdaptiveLevel('advanced');
    } else if (accuracy >= 0.6) {
      setAdaptiveLevel('intermediate');
    } else {
      setAdaptiveLevel('beginner');
    }
  };

  const pauseAssessment = () => {
    setIsPaused(true);
  };

  const resumeAssessment = () => {
    setIsPaused(false);
  };

  const resetAssessment = () => {
    setCurrentAssessment(null);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setAssessmentResults([]);
    setIsAssessmentActive(false);
    setShowResults(false);
    setTimeRemaining(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#08272a] mb-2">
              Adaptive Assessments
            </h1>
            <p className="text-[#08272a]/80 text-lg">
              AI-powered assessments that adapt to your skill level and learning pace
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
            <Badge className="bg-[#edf5ee] text-[#08272a] border border-[#edf5ee] px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Adaptive
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Active Assessment */}
      {isAssessmentActive && currentAssessment && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="bg-gradient-to-br from-white to-[#e3ffcd] border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#08272a] flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  {currentAssessment.title}
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-[#08272a]" />
                    <span className="font-mono text-lg font-bold text-[#08272a]">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isPaused ? resumeAssessment : pauseAssessment}
                    className="border-[#08272a] text-[#08272a] hover:bg-[#edf5ee]"
                  >
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Progress 
                value={(currentQuestionIndex / questions.length) * 100} 
                className="h-2 bg-[#edf5ee]"
              />
              <div className="flex justify-between text-sm text-[#08272a]/70">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round((currentQuestionIndex / questions.length) * 100)}% Complete</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question */}
              <div className="bg-white p-6 rounded-lg border border-[#edf5ee]">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                    {currentQuestion.difficulty.toUpperCase()}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-[#08272a]/70">
                    <Clock className="h-4 w-4" />
                    {currentQuestion.timeLimit}s
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-[#08272a] mb-6">
                  {currentQuestion.text}
                </h3>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    currentQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start h-auto p-4 text-left border-[#edf5ee] hover:bg-[#e3ffcd] hover:border-[#08272a]"
                        onClick={() => handleAnswer(index)}
                      >
                        <span className="font-medium text-[#08272a]">{String.fromCharCode(65 + index)}.</span>
                        <span className="ml-3 text-[#08272a]">{option}</span>
                      </Button>
                    ))
                  )}

                  {currentQuestion.type === 'true-false' && currentQuestion.options && (
                    <div className="grid grid-cols-2 gap-4">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-16 border-[#edf5ee] hover:bg-[#e3ffcd] hover:border-[#08272a] text-[#08272a]"
                          onClick={() => handleAnswer(index)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === 'fill-blank' && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Enter your answer..."
                        className="w-full p-3 border border-[#edf5ee] rounded-lg focus:border-[#08272a] focus:ring-[#08272a] text-[#08272a]"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            handleAnswer(target.value);
                          }
                        }}
                      />
                      <Button
                        className="bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                        onClick={() => {
                          const input = document.querySelector('input') as HTMLInputElement;
                          if (input) handleAnswer(input.value);
                        }}
                      >
                        Submit Answer
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Insight */}
              {currentQuestion.aiInsight && (
                <div className="bg-[#edf5ee] p-4 rounded-lg border border-[#e3ffcd]">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-[#08272a]" />
                    <span className="font-semibold text-[#08272a]">AI Insight</span>
                  </div>
                  <p className="text-[#08272a]/80 text-sm">{currentQuestion.aiInsight}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Assessment Results */}
      {showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-white to-[#e3ffcd] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#08272a] flex items-center gap-2">
                <Award className="h-5 w-5" />
                Assessment Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg border border-[#edf5ee]">
                  <div className="text-3xl font-bold text-[#08272a] mb-2">
                    {assessmentResults.filter(r => r.correct).length}/{assessmentResults.length}
                  </div>
                  <p className="text-[#08272a]/70">Correct Answers</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-[#edf5ee]">
                  <div className="text-3xl font-bold text-[#08272a] mb-2">
                    {Math.round((assessmentResults.filter(r => r.correct).length / assessmentResults.length) * 100)}%
                  </div>
                  <p className="text-[#08272a]/70">Accuracy</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-[#edf5ee]">
                  <div className="text-3xl font-bold text-[#08272a] mb-2">
                    {adaptiveLevel.toUpperCase()}
                  </div>
                  <p className="text-[#08272a]/70">Recommended Level</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={resetAssessment}
                  variant="outline"
                  className="border-[#08272a] text-[#08272a] hover:bg-[#edf5ee]"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Again
                </Button>
                <Button
                  onClick={() => setShowResults(false)}
                  className="bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Available Assessments */}
      {!isAssessmentActive && !showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#edf5ee]">
              <TabsTrigger 
                value="available" 
                className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a]"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Available
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a]"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a]"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessments.map((assessment) => (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="bg-gradient-to-br from-white to-[#edf5ee] border-0 shadow-xl hover:shadow-2xl transition-all cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#08272a] flex items-center justify-center text-white">
                            <GraduationCap className="h-6 w-6" />
                          </div>
                          <Badge className={getDifficultyColor(assessment.difficulty.toLowerCase())}>
                            {assessment.difficulty}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-[#08272a] text-lg mb-2">
                          {assessment.title}
                        </h3>
                        
                        <p className="text-[#08272a]/70 text-sm mb-4 leading-relaxed">
                          {assessment.description}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-[#08272a]/70">
                            <Clock className="h-4 w-4" />
                            {assessment.estimatedTime}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#08272a]/70">
                            <Target className="h-4 w-4" />
                            {assessment.questionsCount} questions
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#08272a]/70">
                            <Brain className="h-4 w-4" />
                            {assessment.adaptiveLevel} level
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => startAssessment(assessment)}
                          className="w-full bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Assessment
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="text-center py-12 text-[#08272a]/60">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Completed Assessments</h3>
                <p>Complete your first assessment to see your results here.</p>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-white to-[#e3ffcd] border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-[#08272a] flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#08272a]">Average Score</span>
                        <span className="font-bold text-[#08272a]">--</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#08272a]">Assessments Taken</span>
                        <span className="font-bold text-[#08272a]">0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#08272a]">Current Level</span>
                        <span className="font-bold text-[#08272a]">Beginner</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-[#edf5ee] border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-[#08272a] flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-[#08272a]/60">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Complete assessments to see your learning analytics</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
};

export default AdaptiveAssessments; 