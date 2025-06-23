import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Brain, Zap, Target, CheckCircle, Clock, BookOpen, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Course' | 'Project' | 'Practice' | 'Assessment';
  completed: boolean;
  skills: string[];
}

const AiLearningPath = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [learningPath, setLearningPath] = useState<LearningStep[]>([]);
  const [motivation, setMotivation] = useState("You're 2 lessons ahead this week — Keep it up!");
  const [timeEstimate, setTimeEstimate] = useState('Estimated Completion: 6 weeks (based on current pace)');

  const generateLearningPath = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      let mockPath: LearningStep[] = [
        {
          id: '1',
          title: 'HTML & Web Basics',
          description: 'Start with the building blocks of the web.',
          duration: '1 week',
          difficulty: 'Beginner',
          type: 'Course',
          completed: true,
          skills: ['HTML', 'Web Structure']
        },
        {
          id: '2',
          title: 'CSS & Styling',
          description: 'Learn to style web pages beautifully.',
          duration: '1 week',
          difficulty: 'Beginner',
          type: 'Course',
          completed: true,
          skills: ['CSS', 'Flexbox', 'Grid']
        },
        {
          id: '3',
          title: 'JavaScript Fundamentals',
          description: 'Master the basics of programming for the web.',
          duration: '2 weeks',
          difficulty: 'Intermediate',
          type: 'Course',
          completed: false,
          skills: ['JavaScript', 'DOM', 'ES6']
        },
        {
          id: '4',
          title: 'React & Modern Frontend',
          description: 'Build dynamic UIs with React.',
          duration: '2 weeks',
          difficulty: 'Intermediate',
          type: 'Course',
          completed: false,
          skills: ['React', 'Hooks', 'SPA']
        },
        {
          id: '5',
          title: 'Node.js & Backend',
          description: 'Learn server-side JavaScript.',
          duration: '1 week',
          difficulty: 'Advanced',
          type: 'Course',
          completed: false,
          skills: ['Node.js', 'APIs', 'Express']
        },
        {
          id: '6',
          title: 'MongoDB & Databases',
          description: 'Store and manage data efficiently.',
          duration: '1 week',
          difficulty: 'Advanced',
          type: 'Course',
          completed: false,
          skills: ['MongoDB', 'NoSQL', 'Data Modeling']
        }
      ];
      // Dynamic adjustment: if user struggles in JS, insert a review step
      if (!mockPath[2].completed) {
        mockPath.splice(3, 0, {
          id: '3b',
          title: 'JavaScript Review & Micro-Lessons',
          description: 'Extra practice and review for JavaScript fundamentals.',
          duration: '3 days',
          difficulty: 'Beginner',
          type: 'Practice',
          completed: false,
          skills: ['JS Practice', 'Debugging']
        });
      }
      setLearningPath(mockPath);
      setTimeEstimate('Estimated Completion: 6 weeks (based on current pace)');
      setMotivation("You're 2 lessons ahead this week — Keep it up!");
      setIsGenerating(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Course': return <BookOpen className="h-4 w-4" />;
      case 'Project': return <Target className="h-4 w-4" />;
      case 'Practice': return <Zap className="h-4 w-4" />;
      case 'Assessment': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Course': return 'bg-blue-500';
      case 'Project': return 'bg-purple-500';
      case 'Practice': return 'bg-green-500';
      case 'Assessment': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleComplete = (id: string) => {
    setLearningPath(prev => 
      prev.map(step => 
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Section Title & Overview */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-[#08272a] mb-2">
              Your AI-Personalized Learning Path
            </h1>
            <p className="text-[#08272a]/80 text-lg mb-2">
              Based on your goals and skill level, our AI dynamically generates a step-by-step course roadmap tailored just for you.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2">
                <Brain className="h-4 w-4 mr-2" />
                AI-Powered
              </Badge>
              <Badge className="bg-[#edf5ee] text-[#08272a] border border-[#edf5ee] px-4 py-2">
                <Target className="h-4 w-4 mr-2" />
                Personalized
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Simulated Prompt Example */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
        <div className="bg-[#edf5ee] rounded-lg p-4 flex items-center gap-4">
          <span className="font-semibold text-[#08272a]">Simulated Prompt:</span>
          <span className="italic text-[#08272a]/80">"Design a learning path for UI/UX Designer"</span>
          <span className="text-[#08272a]/60">→</span>
          <span className="text-[#08272a] font-medium">Figma Basics → UX Psychology → Portfolios</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Card className="bg-gradient-to-br from-white to-[#e3ffcd] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#08272a]">
                <MapPin className="text-[#08272a]" />
                Enter Your Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-[#08272a] mb-2">
                  What do you want to learn?
                </label>
                <Input
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Full-Stack Development, UI/UX Design, Data Science..."
                  className="w-full border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a] text-[#08272a]"
                />
              </div>
              
              <Button 
                onClick={generateLearningPath}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-[#08272a] hover:bg-[#08272a]/90 text-white"
              >
                {isGenerating ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-spin" />
                    Generating Path...
                  </>
                ) : (
                  <>
                    <Target className="mr-2 h-4 w-4" />
                    Generate Learning Path
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Roadmap & Progress Visualization */}
        <div className="lg:col-span-3">
          {learningPath.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Time Estimate & Motivation */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 text-[#08272a] text-lg font-semibold">
                  <Clock className="h-5 w-5" />
                  {timeEstimate}
                </div>
                <div className="flex items-center gap-2 bg-[#e3ffcd] text-[#08272a] px-4 py-2 rounded-lg font-medium shadow">
                  <Zap className="h-4 w-4 mr-1" />
                  {motivation}
                </div>
              </div>

              {/* Progress Bar + Vertical Flowchart Roadmap */}
              <div className="flex gap-8">
                {/* Vertical Progress Bar */}
                <div className="flex flex-col items-center pt-2">
                  {learningPath.map((step, idx) => (
                    <React.Fragment key={step.id}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mb-2 ${step.completed ? 'bg-[#e3ffcd] border-[#08272a]' : 'bg-white border-[#edf5ee]' }`}>
                        {step.completed ? <CheckCircle className="text-[#08272a] w-3 h-3" /> : <span className="w-2 h-2 bg-[#08272a]/30 rounded-full block"></span>}
                      </div>
                      {idx < learningPath.length - 1 && (
                        <div className="w-1 h-10 bg-[#edf5ee]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {/* Vertical Flowchart Roadmap */}
                <div className="flex-1 relative border-l-4 border-[#08272a]/20 pl-8">
                  {learningPath.map((step, idx) => (
                    <div key={step.id} className="mb-10 flex items-start group">
                      <div className="absolute -left-6 top-2">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full border-4 ${step.completed ? 'bg-[#e3ffcd] border-[#08272a]' : 'bg-white border-[#edf5ee]' } transition-all`}>
                          {step.completed ? <CheckCircle className="text-[#08272a] w-5 h-5" /> : <span className="w-3 h-3 bg-[#08272a]/30 rounded-full block"></span>}
                        </span>
                      </div>
                      <div className={`flex-1 rounded-xl shadow p-6 border group-hover:shadow-lg transition-all ${step.type === 'Practice' && step.title.toLowerCase().includes('review') ? 'bg-[#e3ffcd]/60 border-[#e3ffcd]' : 'bg-white border-[#edf5ee]'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(step.difficulty)}`}>{step.difficulty}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(step.type)}`}>{step.type}</span>
                          {getTypeIcon(step.type)}
                        </div>
                        <h3 className="text-xl font-bold text-[#08272a] mb-1">{step.title}</h3>
                        <p className="text-[#08272a]/80 mb-2">{step.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {step.skills.map((skill, i) => (
                            <Badge key={i} className="bg-[#edf5ee] text-[#08272a] text-xs">{skill}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-[#08272a]/70 text-sm">
                          <Clock className="h-4 w-4" />
                          {step.duration}
                        </div>
                        <Button
                          size="sm"
                          className={`mt-4 ${step.completed ? 'bg-[#e3ffcd] text-[#08272a]' : 'bg-[#08272a] text-white hover:bg-[#08272a]/90'}`}
                          onClick={() => toggleComplete(step.id)}
                        >
                          {step.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiLearningPath;
