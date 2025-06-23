import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { generateMockData } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { 
  Brain, Globe, Server, Shield, Database, Terminal, Layers, Bot, 
  Network, SparklesIcon, Gamepad, Target, Clock, TrendingUp, 
  Filter, BookOpen, ArrowRight, X, Calendar, CheckCircle, Circle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import LearningSchedule from './LearningSchedule';
import SetGoal from './SetGoal';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';

const { courseProgress, recommendedCourses } = generateMockData();

// Combine and create a unified list of courses for demo
const allCourses = [
  ...courseProgress.map(p => ({
    ...recommendedCourses.find(r => r.title.includes(p.name.split(' ')[0])) || recommendedCourses[0],
    title: p.name,
    progress: p.value,
    status: 'In Progress' as const
  })),
  {
    ...recommendedCourses[4],
    progress: 100,
    status: 'Completed' as const
  }
];

// Update course categories with more courses
const courseCategories = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    color: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-200',
    courses: [
      // ... existing AI & ML courses ...
      {
        title: 'Generative AI & LLMs',
        progress: 20,
        difficulty: 'Expert',
        aiInsight: 'Ready to explore cutting-edge AI models',
        nextMilestone: 'Fine-tuning LLMs',
        estimatedTime: '6 weeks',
        confidence: 75
      },
      {
        title: 'Computer Vision with PyTorch',
        progress: 35,
        difficulty: 'Advanced',
        aiInsight: 'Strong in basic CV, ready for advanced models',
        nextMilestone: 'Object Detection & Segmentation',
        estimatedTime: '4 weeks',
        confidence: 82
      },
      {
        title: 'MLOps & Model Deployment',
        progress: 40,
        difficulty: 'Advanced',
        aiInsight: 'Good ML fundamentals, ready for production',
        nextMilestone: 'Model Serving & Monitoring',
        estimatedTime: '3 weeks',
        confidence: 85
      },
      {
        title: 'Advanced NLP Techniques',
        progress: 45,
        difficulty: 'Expert',
        aiInsight: 'Ready for complex language models',
        nextMilestone: 'Transformer Architecture',
        estimatedTime: '5 weeks',
        confidence: 80
      }
    ]
  },
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    icon: <Network className="h-6 w-6 text-yellow-500" />,
    color: 'from-yellow-500/20 to-yellow-600/20',
    borderColor: 'border-yellow-200',
    courses: [
      {
        title: 'Smart Contract Development',
        progress: 35,
        difficulty: 'Advanced',
        aiInsight: 'Ready for complex contracts',
        nextMilestone: 'DeFi Protocol Development',
        estimatedTime: '4 weeks',
        confidence: 82
      },
      {
        title: 'Web3 & DApp Development',
        progress: 40,
        difficulty: 'Advanced',
        aiInsight: 'Good in basic blockchain',
        nextMilestone: 'Full-stack DApps',
        estimatedTime: '5 weeks',
        confidence: 85
      },
      {
        title: 'Blockchain Security',
        progress: 30,
        difficulty: 'Expert',
        aiInsight: 'Ready for security audits',
        nextMilestone: 'Smart Contract Auditing',
        estimatedTime: '6 weeks',
        confidence: 80
      },
      {
        title: 'NFT & Token Development',
        progress: 45,
        difficulty: 'Intermediate',
        aiInsight: 'Ready for token standards',
        nextMilestone: 'ERC Standards',
        estimatedTime: '3 weeks',
        confidence: 87
      },
      {
        title: 'DeFi Protocol Design',
        progress: 25,
        difficulty: 'Expert',
        aiInsight: 'Ready for protocol development',
        nextMilestone: 'Protocol Architecture',
        estimatedTime: '5 weeks',
        confidence: 78
      }
    ]
  },
  {
    id: 'game-dev',
    title: 'Game Development',
    icon: <Gamepad className="h-6 w-6 text-red-500" />,
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-200',
    courses: [
      {
        title: 'Unity Game Development',
        progress: 40,
        difficulty: 'Advanced',
        aiInsight: 'Ready for complex game mechanics',
        nextMilestone: 'Advanced Physics',
        estimatedTime: '4 weeks',
        confidence: 85
      },
      {
        title: 'Unreal Engine Mastery',
        progress: 35,
        difficulty: 'Expert',
        aiInsight: 'Good in basic game dev',
        nextMilestone: 'Blueprint Programming',
        estimatedTime: '5 weeks',
        confidence: 82
      },
      {
        title: 'Game AI & Pathfinding',
        progress: 30,
        difficulty: 'Advanced',
        aiInsight: 'Ready for AI implementation',
        nextMilestone: 'Behavior Trees',
        estimatedTime: '3 weeks',
        confidence: 80
      },
      {
        title: '3D Game Graphics',
        progress: 45,
        difficulty: 'Advanced',
        aiInsight: 'Ready for advanced graphics',
        nextMilestone: 'Shader Programming',
        estimatedTime: '4 weeks',
        confidence: 87
      },
      {
        title: 'Game Networking',
        progress: 25,
        difficulty: 'Expert',
        aiInsight: 'Ready for multiplayer games',
        nextMilestone: 'Network Architecture',
        estimatedTime: '6 weeks',
        confidence: 78
      }
    ]
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: <Globe className="h-6 w-6 text-blue-500" />,
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-200',
    courses: [
      // ... existing courses ...
      {
        title: 'Next.js 14 Mastery',
        progress: 30,
        difficulty: 'Advanced',
        aiInsight: 'Ready for server components and app router',
        nextMilestone: 'Advanced Server Actions',
        estimatedTime: '3 weeks',
        confidence: 88
      },
      {
        title: 'Advanced TypeScript Patterns',
        progress: 55,
        difficulty: 'Expert',
        aiInsight: 'Strong typing skills, ready for advanced patterns',
        nextMilestone: 'Type System Mastery',
        estimatedTime: '4 weeks',
        confidence: 85
      },
      {
        title: 'WebAssembly & Performance',
        progress: 25,
        difficulty: 'Advanced',
        aiInsight: 'Ready to optimize web applications',
        nextMilestone: 'WASM Integration',
        estimatedTime: '5 weeks',
        confidence: 78
      },
      {
        title: 'Advanced CSS & Animations',
        progress: 60,
        difficulty: 'Intermediate',
        aiInsight: 'Good CSS skills, ready for advanced animations',
        nextMilestone: 'Motion Design',
        estimatedTime: '2 weeks',
        confidence: 90
      }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    icon: <Server className="h-6 w-6 text-orange-500" />,
    color: 'from-orange-500/20 to-orange-600/20',
    borderColor: 'border-orange-200',
    courses: [
      // ... existing courses ...
      {
        title: 'Advanced Kubernetes',
        progress: 35,
        difficulty: 'Expert',
        aiInsight: 'Ready for complex orchestration',
        nextMilestone: 'Service Mesh Implementation',
        estimatedTime: '4 weeks',
        confidence: 82
      },
      {
        title: 'Cloud Architecture Design',
        progress: 45,
        difficulty: 'Advanced',
        aiInsight: 'Strong in basic cloud concepts',
        nextMilestone: 'Multi-cloud Strategy',
        estimatedTime: '5 weeks',
        confidence: 85
      },
      {
        title: 'DevSecOps & Security',
        progress: 30,
        difficulty: 'Advanced',
        aiInsight: 'Ready to integrate security in CI/CD',
        nextMilestone: 'Security Automation',
        estimatedTime: '3 weeks',
        confidence: 80
      },
      {
        title: 'Infrastructure as Code',
        progress: 50,
        difficulty: 'Advanced',
        aiInsight: 'Good in basic automation',
        nextMilestone: 'Advanced Terraform',
        estimatedTime: '4 weeks',
        confidence: 87
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    icon: <Shield className="h-6 w-6 text-green-500" />,
    color: 'from-green-500/20 to-green-600/20',
    borderColor: 'border-green-200',
    courses: [
      // ... existing courses ...
      {
        title: 'Advanced Penetration Testing',
        progress: 40,
        difficulty: 'Expert',
        aiInsight: 'Ready for advanced security testing',
        nextMilestone: 'Red Team Operations',
        estimatedTime: '6 weeks',
        confidence: 82
      },
      {
        title: 'Cloud Security Architecture',
        progress: 35,
        difficulty: 'Advanced',
        aiInsight: 'Strong in basic security',
        nextMilestone: 'Zero Trust Implementation',
        estimatedTime: '4 weeks',
        confidence: 85
      },
      {
        title: 'Security Automation & DevSecOps',
        progress: 45,
        difficulty: 'Advanced',
        aiInsight: 'Ready to automate security',
        nextMilestone: 'Security Pipeline Integration',
        estimatedTime: '3 weeks',
        confidence: 88
      },
      {
        title: 'Advanced Threat Intelligence',
        progress: 30,
        difficulty: 'Expert',
        aiInsight: 'Ready for complex threat analysis',
        nextMilestone: 'Threat Hunting',
        estimatedTime: '5 weeks',
        confidence: 80
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    icon: <Database className="h-6 w-6 text-indigo-500" />,
    color: 'from-indigo-500/20 to-indigo-600/20',
    borderColor: 'border-indigo-200',
    courses: [
      // ... existing courses ...
      {
        title: 'Advanced Machine Learning',
        progress: 40,
        difficulty: 'Expert',
        aiInsight: 'Ready for complex ML models',
        nextMilestone: 'Ensemble Methods',
        estimatedTime: '5 weeks',
        confidence: 85
      },
      {
        title: 'Big Data Processing',
        progress: 35,
        difficulty: 'Advanced',
        aiInsight: 'Good in data processing',
        nextMilestone: 'Distributed Computing',
        estimatedTime: '4 weeks',
        confidence: 82
      },
      {
        title: 'Data Engineering & ETL',
        progress: 45,
        difficulty: 'Advanced',
        aiInsight: 'Ready for complex pipelines',
        nextMilestone: 'Real-time Processing',
        estimatedTime: '3 weeks',
        confidence: 87
      },
      {
        title: 'Advanced Data Visualization',
        progress: 50,
        difficulty: 'Intermediate',
        aiInsight: 'Strong in basic visualization',
        nextMilestone: 'Interactive Dashboards',
        estimatedTime: '2 weeks',
        confidence: 90
      }
    ]
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    icon: <Terminal className="h-6 w-6 text-pink-500" />,
    color: 'from-pink-500/20 to-pink-600/20',
    borderColor: 'border-pink-200',
    courses: [
      // ... existing courses ...
      {
        title: 'Advanced React Native',
        progress: 40,
        difficulty: 'Expert',
        aiInsight: 'Ready for complex mobile apps',
        nextMilestone: 'Native Module Development',
        estimatedTime: '4 weeks',
        confidence: 85
      },
      {
        title: 'iOS App Architecture',
        progress: 35,
        difficulty: 'Advanced',
        aiInsight: 'Good Swift skills, ready for architecture',
        nextMilestone: 'Clean Architecture',
        estimatedTime: '3 weeks',
        confidence: 82
      },
      {
        title: 'Android Jetpack Compose',
        progress: 45,
        difficulty: 'Advanced',
        aiInsight: 'Ready for modern Android UI',
        nextMilestone: 'Custom Composables',
        estimatedTime: '4 weeks',
        confidence: 87
      },
      {
        title: 'Cross-platform Development',
        progress: 30,
        difficulty: 'Expert',
        aiInsight: 'Ready for multi-platform apps',
        nextMilestone: 'Platform Integration',
        estimatedTime: '5 weeks',
        confidence: 80
      }
    ]
  },
  // ... new categories (Blockchain & Game Dev) ...
];

// Add mock learning path data
const learningPath = [
  {
    id: '1',
    title: 'Fundamentals of React',
    description: 'Master the core concepts and terminology',
    duration: '2-3 weeks',
    difficulty: 'Beginner',
    skills: ['JSX', 'Components', 'Props'],
    completed: true,
  },
  {
    id: '2',
    title: 'Hands-on Practice',
    description: 'Apply concepts through practical exercises',
    duration: '3-4 weeks',
    difficulty: 'Intermediate',
    skills: ['Hooks', 'State', 'Events'],
    completed: true,
  },
  {
    id: '3',
    title: 'Real-world Project',
    description: 'Build a comprehensive project using learned skills',
    duration: '4-6 weeks',
    difficulty: 'Advanced',
    skills: ['Project Management', 'Implementation'],
    completed: false,
  },
  {
    id: '4',
    title: 'Advanced Concepts',
    description: 'Dive deeper into complex topics and optimization',
    duration: '3-4 weeks',
    difficulty: 'Advanced',
    skills: ['Optimization', 'Architecture'],
    completed: false,
  },
  {
    id: '5',
    title: 'Capstone Assessment',
    description: 'Demonstrate mastery through comprehensive evaluation',
    duration: '1-2 weeks',
    difficulty: 'Advanced',
    skills: ['Evaluation', 'Portfolio'],
    completed: false,
  },
];

export default function MyCourses() {
  const [selectedCategory, setSelectedCategory] = useState(courseCategories[0]?.id || null);
  const { courseProgress, recommendedCourses } = generateMockData();
  const navigate = useNavigate();
  const [showSchedule, setShowSchedule] = useState(false);
  const [showGoal, setShowGoal] = useState(false);

  const inProgressCourses = allCourses.filter(c => c.status === 'In Progress');
  const completedCourses = allCourses.filter(c => c.status === 'Completed');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
        <h1 className="text-3xl font-bold text-deep-emerald-green">My Courses</h1>
          <p className="text-gray-600 mt-2">Track your learning progress and get AI-powered recommendations</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setShowSchedule(true)}>
            <Calendar className="h-5 w-5 mr-2 text-blue-500" /> Learning Schedule
          </Button>
          <Button variant="outline" onClick={() => setShowGoal(true)}>
            <Target className="h-5 w-5 mr-2 text-green-500" /> Set Goal
          </Button>
        </div>
      </div>

      {/* Learning Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {courseCategories.reduce((acc, cat) => acc + cat.courses.length, 0)}
            </div>
            <p className="text-sm text-gray-600 mt-1">Active enrollments</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {Math.round(
                courseCategories.reduce((acc, cat) => 
                  acc + cat.courses.reduce((sum, course) => sum + course.progress, 0) / cat.courses.length, 0
                ) / courseCategories.length
              )}%
            </div>
            <p className="text-sm text-gray-600 mt-1">Overall completion</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Next Milestone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-800 truncate">
              {courseCategories[0]?.courses[0]?.nextMilestone || 'No active courses'}
            </div>
            <p className="text-sm text-gray-600 mt-1">Upcoming achievement</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">7 days</div>
            <p className="text-sm text-gray-600 mt-1">Current streak</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Learning Path Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
              <Network className="h-5 w-5 text-purple-500" />
              AI Learning Path Suggestion
              <Badge variant="secondary" className="ml-auto bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd]">
                Optimized Path
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-white/50 rounded-lg border border-purple-100 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-500" />
                  Recommended Focus
                </h4>
                <p className="text-sm text-gray-600">
                  Based on your learning patterns, we recommend focusing on{' '}
                  <span className="font-medium text-purple-600">Advanced Neural Networks</span> and{' '}
                  <span className="font-medium text-purple-600">React Advanced Patterns</span> simultaneously.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-50">AI-Powered</Badge>
                  <Badge variant="outline" className="bg-purple-50">Personalized</Badge>
                </div>
      </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white/50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Learning Strategy
                </h4>
                <p className="text-sm text-gray-600">
                  Your optimal learning schedule suggests{' '}
                  <span className="font-medium text-blue-600">morning sessions</span> for technical concepts and{' '}
                  <span className="font-medium text-blue-600">afternoon practice</span> for implementation.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50">Time-Optimized</Badge>
                  <Badge variant="outline" className="bg-blue-50">Adaptive</Badge>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-white/50 rounded-lg border border-green-100 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Success Prediction
                </h4>
                <p className="text-sm text-gray-600">
                  With current progress, you're predicted to achieve{' '}
                  <span className="font-medium text-green-600">85% mastery</span> in selected courses within the next 4 weeks.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50">High Confidence</Badge>
                  <Badge variant="outline" className="bg-green-50">Data-Driven</Badge>
                    </div>
              </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

      {/* AI-Powered Course Categories */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI-Powered Course Categories
          </h2>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge variant="secondary" className="px-3 py-1">
              {courseCategories.reduce((acc, cat) => acc + cat.courses.length, 0)} Courses
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter Courses
            </Button>
          </div>
        </div>

        {/* Category Selection Grid - always visible, no scroll */}
        <div className="flex flex-wrap gap-4 justify-start items-center w-full mb-8">
          {courseCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "group relative flex items-center gap-2 rounded-xl border p-3 text-left transition-all duration-300 min-w-[220px] max-w-full",
                "bg-gradient-to-br hover:shadow-lg",
                category.color,
                category.borderColor,
                selectedCategory === category.id ? "ring-2 ring-offset-2 ring-blue-500 font-bold" : "hover:scale-[1.02]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ flex: '0 1 220px' }}
            >
              <span className="rounded-lg p-2 bg-white/20 dark:bg-gray-800/20 group-hover:bg-white/30 dark:group-hover:bg-gray-800/30">
                {category.icon}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white truncate">
                {category.title}
              </span>
              <span className="ml-2 font-bold text-gray-700 dark:text-gray-200">
                {category.courses.length}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Selected Category Courses */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {courseCategories.find(cat => cat.id === selectedCategory)?.icon}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {courseCategories.find(cat => cat.id === selectedCategory)?.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseCategories
                .find(cat => cat.id === selectedCategory)
                ?.courses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border bg-gradient-to-br p-6",
                      courseCategories.find(cat => cat.id === selectedCategory)?.color,
                      courseCategories.find(cat => cat.id === selectedCategory)?.borderColor,
                      "hover:shadow-lg transition-all duration-300"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={cn(
                            "px-2 py-0.5 text-xs",
                            course.difficulty === 'Expert' ? "border-red-200 text-red-700" :
                            course.difficulty === 'Advanced' ? "border-orange-200 text-orange-700" :
                            "border-blue-200 text-blue-700"
                          )}>
                            {course.difficulty}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {course.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Progress</span>
                          <span className="font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="rounded-lg bg-white/50 dark:bg-gray-800/50 p-3">
                        <div className="flex items-start gap-2">
                          <SparklesIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              AI Insight
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {course.aiInsight}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Next Milestone</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {course.nextMilestone}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Confidence Score</span>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600"
                              style={{ width: `${course.confidence}%` }}
                            />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {course.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Learning Path Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
            >
        <Card className="bg-[#edf5ee] border-0 shadow-xl">
                <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: '#08272a' }}>
              <Network className="h-5 w-5" style={{ color: '#08272a' }} />
              Learning Path Visualization
              <Badge variant="secondary" className="ml-auto px-3 py-1 rounded-full font-bold" style={{ background: '#e3ffcd', color: '#08272a' }}>
                Interactive
              </Badge>
            </CardTitle>
                </CardHeader>
                <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-[#e3ffcd] rounded-lg border border-[#e3ffcd]">
                <h4 className="font-semibold mb-4" style={{ color: '#08272a' }}>
                  Current Learning Track
                </h4>
                <div className="space-y-4">
                  {courseCategories.slice(0, 3).map((category, index) => (
                    <div key={category.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#08272a] flex items-center justify-center text-[#e3ffcd] font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: '#08272a' }}>{category.title}</p>
                        <p className="text-sm" style={{ color: '#08272a' }}>
                          {category.courses.length} courses • {Math.round(
                            category.courses.reduce((acc, course) => acc + course.progress, 0) / category.courses.length
                          )}% average progress
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-[#e3ffcd] text-[#08272a] font-bold">
                        {category.courses[0]?.estimatedTime}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-[#e3ffcd] rounded-lg border border-[#e3ffcd]">
                <h4 className="font-semibold mb-4" style={{ color: '#08272a' }}>
                  Upcoming Milestones
                </h4>
                <div className="space-y-4">
                  {/* Example milestones, replace with your data as needed */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#08272a] flex items-center justify-center">
                      <Network className="h-5 w-5" style={{ color: '#e3ffcd' }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: '#08272a' }}>Fine-tuning LLMs</p>
                      <p className="text-sm" style={{ color: '#08272a' }}>Ready to explore cutting-edge AI models</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="bg-[#e3ffcd] text-[#08272a] font-bold">6 weeks</Badge>
                        <Badge variant="outline" className="bg-[#e3ffcd] text-[#08272a] font-bold">75% Confidence</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#08272a] flex items-center justify-center">
                      <Network className="h-5 w-5" style={{ color: '#e3ffcd' }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: '#08272a' }}>DeFi Protocol Development</p>
                      <p className="text-sm" style={{ color: '#08272a' }}>Ready for complex contracts</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="bg-[#e3ffcd] text-[#08272a] font-bold">4 weeks</Badge>
                        <Badge variant="outline" className="bg-[#e3ffcd] text-[#08272a] font-bold">82% Confidence</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#08272a] flex items-center justify-center">
                      <Network className="h-5 w-5" style={{ color: '#e3ffcd' }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: '#08272a' }}>Advanced Physics</p>
                      <p className="text-sm" style={{ color: '#08272a' }}>Ready for complex game mechanics</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="bg-[#e3ffcd] text-[#08272a] font-bold">4 weeks</Badge>
                        <Badge variant="outline" className="bg-[#e3ffcd] text-[#08272a] font-bold">85% Confidence</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              {/* Progress Bar */}
              <div className="w-full bg-[#e3ffcd] rounded-full h-3 mb-8">
                <div
                  className="bg-[#08272a] h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(learningPath.filter(s => s.completed).length / learningPath.length) * 100}%` }}
                />
              </div>
              {/* Vertical Timeline */}
              <div className="relative">
                {learningPath.map((step, index) => {
                  const isCompleted = step.completed;
                  const isCurrent = !step.completed && (learningPath[index - 1]?.completed || index === 0);
                  return (
                    <div key={step.id} className="relative mb-10 last:mb-0 flex items-start">
                      {/* Vertical line */}
                      {index < learningPath.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-12 bg-[#e3ffcd] z-0" />
                      )}
                      {/* Step Circle */}
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-[#08272a] border-[#08272a] text-[#e3ffcd]'
                          : isCurrent
                            ? 'bg-[#e3ffcd] border-[#08272a] text-[#08272a]'
                            : 'bg-[#edf5ee] border-[#e3ffcd] text-[#08272a]'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <span className="text-lg font-bold">{index + 1}</span>
                        )}
                      </div>
                      {/* Step Content */}
                      <div className="flex-1 ml-6">
                        <div className="p-6 rounded-xl border transition-all duration-300 group hover:shadow-lg bg-[#edf5ee] border-[#e3ffcd]">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-[#08272a]">{step.title}</h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-[#e3ffcd] text-[#08272a] font-bold border border-[#e3ffcd]">{step.difficulty}</span>
                          </div>
                          <p className="text-sm text-[#08272a] mb-2">{step.description}</p>
                          <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center text-sm text-[#08272a]">
                              <Clock className="h-4 w-4 mr-1" />
                              {step.duration}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {step.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd]">
                                  {skill}
                                </Badge>
          ))}
        </div>
      </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={showSchedule} onOpenChange={setShowSchedule}>
        <DialogContent className="max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle>Learning Schedule</DialogTitle>
          </DialogHeader>
          <LearningSchedule />
        </DialogContent>
      </Dialog>
      <Dialog open={showGoal} onOpenChange={setShowGoal}>
        <DialogContent className="max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle>Set Goal</DialogTitle>
          </DialogHeader>
          <SetGoal />
        </DialogContent>
      </Dialog>
    </div>
  );
}

