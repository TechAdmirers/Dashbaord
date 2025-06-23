import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarCheck, 
  Clock, 
  Brain, 
  Zap, 
  Target, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  Star,
  Timer,
  BookOpen,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  Shield,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

interface ScheduleBlock {
  id: string;
  subject: string;
  time: string;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Study' | 'Practice' | 'Review' | 'Project' | 'Break';
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  energy: number;
  focus: number;
  category: string;
  description: string;
  tags: string[];
}

interface LearningGoal {
  id: string;
  name: string;
  progress: number;
  targetHours: number;
  currentHours: number;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
}

interface AIInsight {
  type: 'optimization' | 'warning' | 'suggestion' | 'achievement';
  title: string;
  message: string;
  icon: React.ReactNode;
  color: string;
}

const ScheduleOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [weeklyHours, setWeeklyHours] = useState('25');
  const [schedule, setSchedule] = useState<ScheduleBlock[]>([]);
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [selectedDay, setSelectedDay] = useState('monday');
  const [optimizationMode, setOptimizationMode] = useState('balanced');
  const [showBreaks, setShowBreaks] = useState(true);
  const [energyLevel, setEnergyLevel] = useState('medium');
  const [activeTab, setActiveTab] = useState('schedule');

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Initialize with demo data
  useEffect(() => {
    const demoGoals: LearningGoal[] = [
      {
        id: '1',
        name: 'React Development',
        progress: 65,
        targetHours: 40,
        currentHours: 26,
        category: 'Frontend',
        priority: 'High',
        deadline: '2024-02-15'
      },
      {
        id: '2',
        name: 'Python Programming',
        progress: 45,
        targetHours: 30,
        currentHours: 13.5,
        category: 'Backend',
        priority: 'Medium',
        deadline: '2024-03-01'
      },
      {
        id: '3',
        name: 'Machine Learning',
        progress: 25,
        targetHours: 50,
        currentHours: 12.5,
        category: 'AI/ML',
        priority: 'High',
        deadline: '2024-04-01'
      }
    ];
    setGoals(demoGoals);

    const demoInsights: AIInsight[] = [
      {
        type: 'optimization',
        title: 'Peak Performance Time',
        message: 'Your focus peaks between 9-11 AM. Schedule complex tasks during this window.',
        icon: <TrendingUp className="w-4 h-4" />,
        color: 'text-green-600'
      },
      {
        type: 'suggestion',
        title: 'Break Optimization',
        message: 'Add 15-minute breaks every 90 minutes to maintain productivity.',
        icon: <Timer className="w-4 h-4" />,
        color: 'text-blue-600'
      },
      {
        type: 'achievement',
        title: 'Weekly Goal Progress',
        message: 'You\'re 15% ahead of your weekly learning target!',
        icon: <Star className="w-4 h-4" />,
        color: 'text-yellow-600'
      }
    ];
    setInsights(demoInsights);
  }, []);

  const generateOptimizedSchedule = () => {
    setIsOptimizing(true);
    
    setTimeout(() => {
      const mockSchedule: ScheduleBlock[] = [
        {
          id: '1',
          subject: 'React Fundamentals',
          time: '09:00 AM',
          duration: 90,
          difficulty: 'Medium',
          type: 'Study',
          completed: false,
          priority: 'High',
          energy: 85,
          focus: 90,
          category: 'Frontend',
          description: 'Learn React hooks, state management, and component lifecycle',
          tags: ['React', 'JavaScript', 'Hooks']
        },
        {
          id: '2',
          subject: 'Morning Break',
          time: '10:30 AM',
          duration: 15,
          difficulty: 'Easy',
          type: 'Break',
          completed: false,
          priority: 'Low',
          energy: 70,
          focus: 60,
          category: 'Wellness',
          description: 'Short break to refresh and maintain focus',
          tags: ['Break', 'Refresh']
        },
        {
          id: '3',
          subject: 'JavaScript Practice',
          time: '10:45 AM',
          duration: 60,
          difficulty: 'Easy',
          type: 'Practice',
          completed: false,
          priority: 'Medium',
          energy: 75,
          focus: 80,
          category: 'Programming',
          description: 'Practice ES6+ features and async programming',
          tags: ['JavaScript', 'ES6', 'Async']
        },
        {
          id: '4',
          subject: 'Python Basics',
          time: '02:00 PM',
          duration: 120,
          difficulty: 'Hard',
          type: 'Study',
          completed: false,
          priority: 'High',
          energy: 65,
          focus: 75,
          category: 'Backend',
          description: 'Master Python fundamentals and data structures',
          tags: ['Python', 'Data Structures', 'OOP']
        },
        {
          id: '5',
          subject: 'ML Algorithms',
          time: '04:30 PM',
          duration: 90,
          difficulty: 'Hard',
          type: 'Study',
          completed: false,
          priority: 'High',
          energy: 60,
          focus: 70,
          category: 'AI/ML',
          description: 'Study machine learning algorithms and implementation',
          tags: ['Machine Learning', 'Algorithms', 'Python']
        },
        {
          id: '6',
          subject: 'Project Work',
          time: '07:00 PM',
          duration: 120,
          difficulty: 'Medium',
          type: 'Project',
          completed: false,
          priority: 'Medium',
          energy: 55,
          focus: 65,
          category: 'Projects',
          description: 'Work on portfolio project combining React and Python',
          tags: ['Project', 'Portfolio', 'Full-stack']
        }
      ];
      setSchedule(mockSchedule);
      setIsOptimizing(false);
    }, 3000);
  };

  const toggleTaskCompletion = (id: string) => {
    setSchedule(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentTime(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Study': return 'bg-blue-500';
      case 'Practice': return 'bg-green-500';
      case 'Review': return 'bg-purple-500';
      case 'Project': return 'bg-orange-500';
      case 'Break': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Study': return <BookOpen className="w-4 h-4" />;
      case 'Practice': return <Code className="w-4 h-4" />;
      case 'Review': return <RotateCcw className="w-4 h-4" />;
      case 'Project': return <Rocket className="w-4 h-4" />;
      case 'Break': return <Timer className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Palette className="w-4 h-4" />;
      case 'Backend': return <Database className="w-4 h-4" />;
      case 'AI/ML': return <Brain className="w-4 h-4" />;
      case 'Mobile': return <Smartphone className="w-4 h-4" />;
      case 'Web': return <Globe className="w-4 h-4" />;
      case 'Security': return <Shield className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const totalHours = schedule.reduce((sum, task) => sum + task.duration, 0) / 60;
  const completedTasks = schedule.filter(task => task.completed).length;
  const completionRate = schedule.length > 0 ? (completedTasks / schedule.length) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-deep-emerald-green">
              AI Schedule Optimizer
            </h1>
            <p className="text-gray-600 mt-2">Intelligent learning schedule optimization powered by AI</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd]">
              <Brain className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600">{isActive ? 'Active' : 'Idle'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Hours</p>
                <p className="text-2xl font-bold text-blue-800">{totalHours.toFixed(1)}h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Completion</p>
                <p className="text-2xl font-bold text-green-800">{completionRate.toFixed(0)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Tasks Done</p>
                <p className="text-2xl font-bold text-purple-800">{completedTasks}/{schedule.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Goals</p>
                <p className="text-2xl font-bold text-orange-800">{goals.length}</p>
              </div>
              <Star className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Configuration Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          className="lg:col-span-1"
        >
          <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-xl sticky top-4 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                <Settings className="text-blue-500" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="hours">Weekly Study Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(e.target.value)}
                  className="mt-2"
                  placeholder="25"
                />
              </div>

              <div>
                <Label>Optimization Mode</Label>
                <Select value={optimizationMode} onValueChange={setOptimizationMode}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="intensive">Intensive</SelectItem>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
                    <SelectItem value="focused">Focused</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Energy Level</Label>
                <Select value={energyLevel} onValueChange={setEnergyLevel}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Energy</SelectItem>
                    <SelectItem value="medium">Medium Energy</SelectItem>
                    <SelectItem value="high">High Energy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>Include Breaks</Label>
                <Switch checked={showBreaks} onCheckedChange={setShowBreaks} />
              </div>

              <Separator />

              <div>
                <Label>Learning Goals</Label>
                <div className="space-y-3 mt-2">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                      className="p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{goal.name}</span>
                        <Badge className={goal.priority === 'High' ? 'bg-red-100 text-red-800' : goal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                          {goal.priority}
                        </Badge>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{goal.currentHours}/{goal.targetHours}h</span>
                        <span>{goal.progress}%</span>
                      </div>
                    </motion.div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </div>

              <Button 
                onClick={generateOptimizedSchedule}
                disabled={isOptimizing}
                className="w-full bg-gradient-to-r from-deep-emerald-green to-teal-600 hover:from-deep-emerald-green/90 hover:to-teal-600/90"
              >
                {isOptimizing ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-spin" />
                    AI Optimizing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Schedule
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Schedule Area */}
        <motion.div 
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="mt-6">
              <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-xl min-h-[600px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                    <CalendarCheck className="text-green-500" />
                    Optimized Schedule
                    {schedule.length > 0 && (
                      <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
                        AI Generated
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {isOptimizing ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-64 space-y-6"
                      >
                        <div className="relative">
                          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-deep-emerald-green"></div>
                          <Brain className="absolute inset-0 m-auto h-10 w-10 text-deep-emerald-green animate-pulse" />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-700 font-medium text-lg">AI analyzing your learning patterns...</p>
                          <p className="text-gray-500 text-sm mt-1">Optimizing for maximum productivity</p>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-deep-emerald-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </motion.div>
                    ) : schedule.length > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <Reorder.Group axis="y" values={schedule} onReorder={setSchedule}>
                          {schedule.map((block, index) => (
                            <Reorder.Item key={block.id} value={block}>
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                                className={`group relative p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 bg-white cursor-move ${
                                  block.completed ? 'opacity-75 bg-green-50 border-green-200' : ''
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className={`w-2 h-20 rounded-full ${getTypeColor(block.type)}`}></div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <h3 className={`font-semibold ${block.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                          {block.subject}
                                        </h3>
                                        <Badge className={getDifficultyColor(block.difficulty)}>
                                          {block.difficulty}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                          {getTypeIcon(block.type)}
                                          {block.type}
                                        </div>
                                      </div>
                                      
                                      <p className="text-sm text-gray-600 mb-3">{block.description}</p>
                                      
                                      <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                          <Clock className="h-4 w-4 mr-1" />
                                          {block.time} ({block.duration}min)
                                        </div>
                                        <div className="flex items-center">
                                          {getCategoryIcon(block.category)}
                                          <span className="ml-1">{block.category}</span>
                                        </div>
                                        <div className="flex items-center">
                                          <Zap className="h-4 w-4 mr-1" />
                                          Energy: {block.energy}%
                                        </div>
                                      </div>
                                      
                                      <div className="flex flex-wrap gap-1 mt-3">
                                        {block.tags.map((tag, tagIndex) => (
                                          <Badge key={tagIndex} variant="outline" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant={block.completed ? "default" : "outline"}
                                      onClick={() => toggleTaskCompletion(block.id)}
                                      className={block.completed ? "bg-green-500 hover:bg-green-600" : ""}
                                    >
                                      {block.completed ? <CheckCircle className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            </Reorder.Item>
                          ))}
                        </Reorder.Group>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <CalendarCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Schedule Generated</h3>
                        <p className="text-gray-500">Click "Generate Schedule" to create your optimized learning plan</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="mt-6">
              <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl min-h-[600px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                    <Target className="text-purple-500" />
                    Learning Goals Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {goals.map((goal, index) => (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                        className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(goal.category)}
                            <h3 className="font-semibold text-lg">{goal.name}</h3>
                          </div>
                          <Badge className={goal.priority === 'High' ? 'bg-red-100 text-red-800' : goal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                            {goal.priority}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-3" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Hours:</span>
                              <span className="font-medium ml-1">{goal.currentHours}/{goal.targetHours}h</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Deadline:</span>
                              <span className="font-medium ml-1">{goal.deadline}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <BarChart3 className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="mt-6">
              <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-xl min-h-[600px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                    <Brain className="text-blue-500" />
                    AI Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                        className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${insight.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                            <div className={insight.color}>
                              {insight.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-600">{insight.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleOptimizer;
