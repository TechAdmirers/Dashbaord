import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Zap, ArrowRight, BookOpen, User, Award, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CareerStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  difficult: boolean;
  icon: React.ReactNode;
  suggestions?: string[];
}

const defaultSteps: Record<string, CareerStep[]> = {
  'frontend developer': [
    { id: '1', title: 'Learn HTML & CSS', description: 'Master the basics of web structure and styling.', duration: '1 month', completed: true, difficult: false, icon: <BookOpen className="w-5 h-5" /> },
    { id: '2', title: 'Master JavaScript', description: 'Understand core programming concepts and DOM manipulation.', duration: '2 months', completed: false, difficult: false, icon: <Zap className="w-5 h-5" /> },
    { id: '3', title: 'Learn React', description: 'Build dynamic UIs with React.', duration: '2 months', completed: false, difficult: false, icon: <User className="w-5 h-5" /> },
    { id: '4', title: 'Build Portfolio', description: 'Create and deploy real projects to showcase your skills.', duration: '1 month', completed: false, difficult: false, icon: <Award className="w-5 h-5" /> },
    { id: '5', title: 'Apply for Internships', description: 'Start applying for entry-level positions and internships.', duration: '2 months', completed: false, difficult: false, icon: <ArrowRight className="w-5 h-5" /> },
    { id: '6', title: 'Land First Job', description: 'Begin your professional journey as a Frontend Developer.', duration: 'ongoing', completed: false, difficult: false, icon: <CheckCircle className="w-5 h-5" /> },
  ],
  'data scientist': [
    { id: '1', title: 'Learn Python', description: 'Master Python for data analysis and scripting.', duration: '1 month', completed: true, difficult: false, icon: <BookOpen className="w-5 h-5" /> },
    { id: '2', title: 'Statistics & Math', description: 'Understand probability, statistics, and linear algebra.', duration: '2 months', completed: false, difficult: false, icon: <Lightbulb className="w-5 h-5" /> },
    { id: '3', title: 'Data Visualization', description: 'Learn to visualize data using libraries like Matplotlib and Seaborn.', duration: '1 month', completed: false, difficult: false, icon: <Award className="w-5 h-5" /> },
    { id: '4', title: 'Machine Learning', description: 'Study ML algorithms and build predictive models.', duration: '3 months', completed: false, difficult: false, icon: <Zap className="w-5 h-5" /> },
    { id: '5', title: 'Build Portfolio', description: 'Create and share data science projects.', duration: '1 month', completed: false, difficult: false, icon: <User className="w-5 h-5" /> },
    { id: '6', title: 'Apply for Jobs', description: 'Start applying for data scientist roles.', duration: 'ongoing', completed: false, difficult: false, icon: <ArrowRight className="w-5 h-5" /> },
  ]
};

const CareerRoadmap = () => {
  const [career, setCareer] = useState('Frontend Developer');
  const [steps, setSteps] = useState<CareerStep[]>(defaultSteps['frontend developer']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [motivation, setMotivation] = useState("You're on track! Keep building your skills.");
  const [timeline, setTimeline] = useState('Estimated Time to Goal: 12 months (based on your pace)');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.innerWidth >= 1024 ? 2 : 1);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const key = career.trim().toLowerCase();
      setSteps(defaultSteps[key] || defaultSteps['frontend developer']);
      setTimeline('Estimated Time to Goal: 12 months (based on your pace)');
      setMotivation("You're on track! Keep building your skills.");
      setIsGenerating(false);
    }, 1200);
  };

  const toggleComplete = (id: string) => {
    setSteps(prev => prev.map(step => step.id === id ? { ...step, completed: !step.completed } : step));
  };

  const markDifficult = (id: string) => {
    setSteps(prev => prev.map(step => step.id === id ? { ...step, difficult: !step.difficult, suggestions: !step.difficult ? [
      'Review related online tutorials',
      'Ask for help in a developer community',
      'Try a smaller project or micro-lesson'
    ] : undefined } : step));
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(prev + 1, steps.length - cardsPerView));
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-[#08272a] mb-2">Your AI-Powered Career Roadmap</h1>
        <p className="text-[#08272a]/80 text-lg mb-2">Visualize your career journey, set milestones, and let AI suggest the next best steps for your professional growth.</p>
        <div className="flex items-center gap-3 mt-2">
          <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2">AI-Powered</Badge>
          <Badge className="bg-[#edf5ee] text-[#08272a] border border-[#edf5ee] px-4 py-2">Personalized</Badge>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
        <div className="bg-[#edf5ee] rounded-lg p-4 flex items-center gap-4">
          <span className="font-semibold text-[#08272a]">Example:</span>
          <span className="italic text-[#08272a]/80">“Data Scientist”</span>
          <span className="text-[#08272a]/60">→</span>
          <span className="text-[#08272a] font-medium">Learn Python → Statistics & Math → Data Visualization → Machine Learning → Build Portfolio → Apply for Jobs</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Input Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
          <Card className="bg-gradient-to-br from-white to-[#e3ffcd] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#08272a]">
                <User className="text-[#08272a]" />
                Enter Your Target Career
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="career" className="block text-sm font-medium text-[#08272a] mb-2">What career are you aiming for?</label>
                <Input
                  id="career"
                  value={career}
                  onChange={e => setCareer(e.target.value)}
                  placeholder="e.g., Frontend Developer, Data Scientist, UI/UX Designer..."
                  className="w-full border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a] text-[#08272a]"
                />
              </div>
              <Button
                onClick={handleGenerate}
                disabled={!career.trim() || isGenerating}
                className="w-full bg-[#08272a] hover:bg-[#08272a]/90 text-white"
              >
                {isGenerating ? 'Generating Roadmap...' : 'Generate Career Roadmap'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Roadmap Visualization */}
        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Timeline & Motivation */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
              <div className="flex items-center gap-2 text-[#08272a] text-lg font-semibold">
                <Clock className="h-5 w-5" />
                {timeline}
              </div>
              <div className="flex items-center gap-2 bg-[#e3ffcd] text-[#08272a] px-4 py-2 rounded-lg font-medium shadow">
                <Zap className="h-4 w-4 mr-1" />
                {motivation}
              </div>
            </div>

            {/* Carousel Roadmap */}
            <div className="relative w-full flex items-center justify-center">
              <button
                onClick={handlePrev}
                disabled={carouselIndex === 0}
                className={`absolute left-2 z-10 p-2 rounded-full bg-[#e3ffcd] text-[#08272a] shadow hover:bg-[#e3ffcd]/80 transition disabled:opacity-40 disabled:cursor-not-allowed top-1/2 -translate-y-1/2`}
                aria-label="Previous"
                style={{ minWidth: 40, minHeight: 40 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="overflow-hidden w-full px-2 sm:px-6 md:px-12">
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${carouselIndex * (100 / cardsPerView)}%)`,
                  }}
                >
                  {steps.map((step, idx) => (
                    <div
                      key={step.id}
                      className={`flex-shrink-0 px-2 sm:px-4 w-full ${cardsPerView === 2 ? 'lg:w-1/2' : ''} ${idx === carouselIndex ? 'scale-105' : 'scale-100'} transition-transform`}
                      style={{ maxWidth: cardsPerView === 2 ? '50%' : '100%' }}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center mb-2 ${step.completed ? 'bg-[#e3ffcd] border-[#08272a]' : 'bg-white border-[#edf5ee]' }`}>
                          {step.completed ? <CheckCircle className="text-[#08272a] w-6 h-6" /> : step.icon}
                        </div>
                        <div className={`rounded-xl shadow p-4 border group-hover:shadow-lg transition-all w-full ${step.difficult ? 'bg-[#e3ffcd]/60 border-[#e3ffcd]' : 'bg-white border-[#edf5ee]'}`}>
                          <h3 className="text-lg font-bold text-[#08272a] mb-1">{step.title}</h3>
                          <p className="text-[#08272a]/80 mb-2 text-sm">{step.description}</p>
                          <div className="flex items-center gap-2 text-[#08272a]/70 text-xs mb-2">
                            <Clock className="h-4 w-4" />
                            {step.duration}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button size="sm" className={`text-xs ${step.completed ? 'bg-[#e3ffcd] text-[#08272a]' : 'bg-[#08272a] text-white hover:bg-[#08272a]/90'}`} onClick={() => toggleComplete(step.id)}>
                              {step.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs border-[#08272a] text-[#08272a] hover:bg-[#edf5ee]" onClick={() => markDifficult(step.id)}>
                              {step.difficult ? 'Not Difficult' : 'Mark Difficult'}
                            </Button>
                          </div>
                          {step.difficult && step.suggestions && (
                            <div className="mt-3 p-2 bg-[#edf5ee] rounded text-[#08272a] text-xs">
                              <span className="font-semibold">AI Suggestions:</span>
                              <ul className="list-disc ml-4 mt-1">
                                {step.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={handleNext}
                disabled={carouselIndex >= steps.length - cardsPerView}
                className={`absolute right-2 z-10 p-2 rounded-full bg-[#e3ffcd] text-[#08272a] shadow hover:bg-[#e3ffcd]/80 transition disabled:opacity-40 disabled:cursor-not-allowed top-1/2 -translate-y-1/2`}
                aria-label="Next"
                style={{ minWidth: 40, minHeight: 40 }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
