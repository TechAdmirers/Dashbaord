import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { generateMockData } from '@/lib/mockData';
import { 
  ArrowUp, TrendingUp, Brain, Zap, Target, Award, Sparkles, 
  Rocket, Lightbulb, Clock, BarChart3, Activity, BrainCircuit,
  GraduationCap, BookOpen, Code2, Database, Server,
  Layers, Cpu, Globe, Shield, Terminal, Network, Bot, SparklesIcon,
  MessageSquareQuote, Mic, Waypoints, Map, FileText, GaugeCircle, 
  Radar as RadarIcon, CalendarCheck, Trophy, Languages, User, Settings,
  ArrowRight, Star, BookOpenCheck, Target as TargetIcon,
  Brain as BrainIcon, MessageCircle, Video, FileCode, 
  BarChart4, Users, Briefcase, GraduationCap as GraduationCapIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const { stats, weeklyTrend, courseProgress } = generateMockData();

// Enhanced mock data for more charts
const skillProgress = [
  { skill: 'React', current: 85, target: 95 },
  { skill: 'Python', current: 70, target: 90 },
  { skill: 'Machine Learning', current: 60, target: 85 },
  { skill: 'UI/UX', current: 75, target: 88 },
  { skill: 'Node.js', current: 65, target: 80 },
];

const learningActivity = [
  { day: 'Mon', hours: 3.5, efficiency: 85 },
  { day: 'Tue', hours: 4.2, efficiency: 90 },
  { day: 'Wed', hours: 2.8, efficiency: 75 },
  { day: 'Thu', hours: 5.1, efficiency: 95 },
  { day: 'Fri', hours: 4.5, efficiency: 88 },
  { day: 'Sat', hours: 6.2, efficiency: 92 },
  { day: 'Sun', hours: 3.8, efficiency: 80 },
];

const aiInsights = [
  { category: 'Focus', score: 88, color: '#08272a' },
  { category: 'Retention', score: 92, color: '#e3ffcd' },
  { category: 'Speed', score: 76, color: '#a6ff75' },
  { category: 'Consistency', score: 84, color: '#7dd3fc' },
  { category: 'Engagement', score: 90, color: '#fbbf24' },
];

// Add new mock data for futuristic learning insights
const learningPredictions = [
  { topic: 'Machine Learning', confidence: 92, nextMilestone: 'Advanced Neural Networks', timeToMaster: '3 weeks' },
  { topic: 'React Development', confidence: 88, nextMilestone: 'State Management Patterns', timeToMaster: '2 weeks' },
  { topic: 'Data Science', confidence: 85, nextMilestone: 'Deep Learning Models', timeToMaster: '4 weeks' },
];

const learningMetrics = [
  { metric: 'Learning Velocity', value: 87, trend: '+12%', icon: '🚀' },
  { metric: 'Knowledge Retention', value: 92, trend: '+8%', icon: '🧠' },
  { metric: 'Concept Mastery', value: 78, trend: '+15%', icon: '🎯' },
  { metric: 'Adaptive Learning', value: 85, trend: '+10%', icon: '🔄' },
];

// Add new mock data for advanced visualizations
const learningTrends3D = [
  { x: 1, y: 85, z: 92, topic: 'ML', category: 'Technical' },
  { x: 2, y: 78, z: 88, topic: 'React', category: 'Frontend' },
  { x: 3, y: 92, z: 95, topic: 'Python', category: 'Backend' },
  { x: 4, y: 88, z: 90, topic: 'Data', category: 'Analytics' },
  { x: 5, y: 75, z: 82, topic: 'DevOps', category: 'Infrastructure' },
];

const skillDistribution = [
  { name: 'Frontend', value: 35, color: '#7dd3fc' },
  { name: 'Backend', value: 25, color: '#08272a' },
  { name: 'AI/ML', value: 20, color: '#a6ff75' },
  { name: 'DevOps', value: 15, color: '#fbbf24' },
  { name: 'Data', value: 5, color: '#e3ffcd' },
];

const learningIntensity = [
  { time: '00:00', intensity: 20, focus: 30 },
  { time: '04:00', intensity: 15, focus: 25 },
  { time: '08:00', intensity: 85, focus: 90 },
  { time: '12:00', intensity: 65, focus: 75 },
  { time: '16:00', intensity: 75, focus: 85 },
  { time: '20:00', intensity: 45, focus: 60 },
  { time: '24:00', intensity: 25, focus: 35 },
];

const advancedStats = [
  { 
    title: 'Learning Efficiency',
    value: '92%',
    trend: '+15%',
    icon: <BrainCircuit className="h-6 w-6 text-purple-500" />,
    color: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-200'
  },
  { 
    title: 'Knowledge Depth',
    value: '87%',
    trend: '+12%',
    icon: <Database className="h-6 w-6 text-blue-500" />,
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-200'
  },
  { 
    title: 'Code Quality',
    value: '94%',
    trend: '+18%',
    icon: <Code2 className="h-6 w-6 text-green-500" />,
    color: 'from-green-500/20 to-green-600/20',
    borderColor: 'border-green-200'
  },
  { 
    title: 'System Design',
    value: '82%',
    trend: '+10%',
    icon: <Server className="h-6 w-6 text-orange-500" />,
    color: 'from-orange-500/20 to-orange-600/20',
    borderColor: 'border-orange-200'
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const Dashboard = () => {
  const { t } = useLanguage();

  // Navigation sections with all available features
  const navigationSections = [
    {
      title: "Learning Tools",
      items: [
        {
          title: t('nav.myCourses'),
          description: t('descriptions.myCourses'),
          icon: BookOpen,
          path: "/my-courses",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#edf5ee]",
          badge: t('features.active')
        },
        {
          title: t('nav.recommendations'),
          description: t('descriptions.recommendations'),
          icon: Sparkles,
          path: "/course-recommendations",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#e3ffcd]",
          badge: t('features.aiPowered')
        },
        {
          title: t('nav.smartQuiz'),
          description: t('descriptions.smartQuiz'),
          icon: BrainCircuit,
          path: "/smart-quiz",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#edf5ee]",
          badge: t('features.interactive')
        },
        {
          title: t('nav.tutorChat'),
          description: t('descriptions.tutorChat'),
          icon: Bot,
          path: "/tutor-chat",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#e3ffcd]",
          badge: t('features.aiPowered')
        }
      ]
    },
    {
      title: "Planning & Optimization",
      items: [
        {
          title: t('nav.scheduleOptimizer'),
          description: t('descriptions.scheduleOptimizer'),
          icon: CalendarCheck,
          path: "/schedule-optimizer",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#edf5ee]",
          badge: t('features.smart')
        },
        {
          title: t('nav.aiLearningPath'),
          description: t('descriptions.aiLearningPath'),
          icon: Waypoints,
          path: "/ai-learning-path",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#e3ffcd]",
          badge: t('features.aiPowered')
        },
        {
          title: t('nav.learningSchedule'),
          description: t('descriptions.learningSchedule'),
          icon: Clock,
          path: "/learning-schedule",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#edf5ee]",
          badge: t('features.custom')
        },
        {
          title: t('nav.setGoals'),
          description: t('descriptions.setGoals'),
          icon: Target,
          path: "/set-goal",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#e3ffcd]",
          badge: t('features.track')
        }
      ]
    },
    {
      title: "Career Development",
      items: [
        {
          title: t('nav.careerRoadmap'),
          description: t('descriptions.careerRoadmap'),
          icon: Map,
          path: "/career-roadmap",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#edf5ee]",
          badge: t('features.strategic')
        },
        {
          title: t('nav.cvGenerator'),
          description: t('descriptions.cvGenerator'),
          icon: FileText,
          path: "/cv-generator",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#e3ffcd]",
          badge: t('features.aiPowered')
        },
        {
          title: t('nav.resumeAnalyzer'),
          description: t('descriptions.resumeAnalyzer'),
          icon: GaugeCircle,
          path: "/resume-analyzer",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#edf5ee]",
          badge: t('features.smart')
        },
        {
          title: t('nav.skillGap'),
          description: t('descriptions.skillGap'),
          icon: Radar,
          path: "/skill-gap",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#e3ffcd]",
          badge: t('features.analysis')
        }
      ]
    },
    {
      title: "AI Features & Feedback",
      items: [
        {
          title: t('nav.feedback'),
          description: t('descriptions.feedback'),
          icon: MessageSquareQuote,
          path: "/feedback",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#edf5ee]",
          badge: t('features.aiPowered')
        },
        {
          title: t('nav.voiceCommands'),
          description: t('descriptions.voiceCommands'),
          icon: Mic,
          path: "/voice-prompt",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#e3ffcd]",
          badge: t('features.voice')
        },
        {
          title: t('nav.achievements'),
          description: t('descriptions.achievements'),
          icon: Trophy,
          path: "/achievements",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#edf5ee]",
          badge: t('features.gamified')
        },
        {
          title: t('nav.languageSwitcher'),
          description: t('descriptions.languageSwitcher'),
          icon: Languages,
          path: "/language-switcher",
          color: "from-[#08272a] to-[#08272a]",
          bgColor: "bg-[#e3ffcd]",
          badge: t('features.multi')
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header with AI Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-[#08272a]">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-500 mt-2">{t('dashboard.subtitle')}</p>
        </div>
        <Badge
          variant="secondary"
          className="px-4 py-2 rounded-full font-bold flex items-center gap-2"
          style={{
            background: 'linear-gradient(90deg, #e3ffcd 0%, #edf5ee 100%)',
            color: '#08272a',
            boxShadow: '0 2px 8px 0 #e3ffcd44'
          }}
        >
          <Brain className="h-4 w-4 mr-2" style={{ color: '#08272a' }} />
          {t('features.aiPowered')} Analytics
        </Badge>
      </motion.div>

      {/* Enhanced Stats Grid with 3D Effects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#08272a] mb-2">{t('dashboard.analytics')}</h2>
          <p className="text-[#08272a]/70">{t('dashboard.analytics.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advancedStats.map((stat, i) => (
            <motion.div
              key={stat.title}
              className="relative overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={i}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`bg-gradient-to-br ${stat.color} border ${stat.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">{stat.title}</h3>
                      <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                      <div className="flex items-center text-xs text-green-600 mt-2">
                        <TrendingUp size={12} className="mr-1" />
                        <span>{stat.trend}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 pointer-events-none" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 3D Learning Trends Visualization */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              3D Learning Trends Analysis
              <Badge variant="secondary" className="ml-auto">Interactive</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <XAxis type="number" dataKey="x" name="Progress" domain={[0, 6]} />
                  <YAxis type="number" dataKey="y" name="Mastery" domain={[0, 100]} />
                  <ZAxis type="number" dataKey="z" name="Confidence" range={[50, 400]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Scatter
                    name="Learning Progress"
                    data={learningTrends3D}
                    fill="#08272a"
                  >
                    {learningTrends3D.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`hsl(${index * 60}, 70%, 50%)`}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Learning Intensity Heatmap */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
              <Activity className="h-5 w-5 text-purple-500" />
              Learning Intensity Patterns
              <Badge variant="secondary" className="ml-auto">24/7 Analysis</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={learningIntensity}>
                  <defs>
                    <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#08272a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#08272a" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a6ff75" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#a6ff75" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="intensity"
                    stroke="#08272a"
                    fillOpacity={1}
                    fill="url(#colorIntensity)"
                    name="Learning Intensity"
                  />
                  <Area
                    type="monotone"
                    dataKey="focus"
                    stroke="#a6ff75"
                    fillOpacity={1}
                    fill="url(#colorFocus)"
                    name="Focus Level"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skill Distribution 3D Pie Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
              <GraduationCap className="h-5 w-5 text-green-500" />
              Skill Distribution
              <Badge variant="secondary" className="ml-auto">3D View</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={5}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skill Progress and Course Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } }}
        >
          <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-deep-emerald-green">
                <Award className="h-6 w-6 text-green-500" />
                Skill Progression
                <Badge variant="secondary" className="ml-auto">AI Tracked</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillProgress.map((skill, index) => (
                  <motion.div 
                    key={skill.skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.7 + index * 0.1 } }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{skill.skill}</span>
                      <span className="text-sm text-gray-500">{skill.current}% / {skill.target}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-deep-emerald-green to-light-neon-green h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.current}%` }}
                        />
                        <div 
                          className="absolute top-0 h-3 w-1 bg-red-400 rounded-full"
                          style={{ left: `${skill.target}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Course Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5 } }}
        >
          <Card className="bg-gradient-to-br from-white to-orange-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-deep-emerald-green">
                <Brain className="h-6 w-6 text-orange-500" />
                Course Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie 
                    data={courseProgress} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100}
                    innerRadius={60}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {courseProgress.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* New Futuristic Learning Insights Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5 } }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: '#08272a' }}>
          <Brain className="h-6 w-6 mr-2" style={{ color: '#08272a' }} />
          {t('dashboard.learning.predictions')}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning Predictions Card */}
          <Card className="bg-[#edf5ee] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: '#08272a' }}>
                <Zap className="h-5 w-5" style={{ color: '#08272a' }} />
                Learning Predictions
                <Badge
                  variant="secondary"
                  className="ml-auto px-3 py-1 rounded-full font-bold"
                  style={{ background: 'linear-gradient(90deg, #e3ffcd 0%, #edf5ee 100%)', color: '#08272a' }}
                >
                  AI Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPredictions.map((prediction, index) => (
                  <motion.div
                    key={prediction.topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.9 + index * 0.1 } }}
                    className="p-4 bg-white/50 rounded-lg border border-purple-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{prediction.topic}</h4>
                      <Badge variant="outline" className="bg-purple-50">
                        {prediction.confidence}% Confidence
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Next Milestone: <span className="font-medium text-purple-600">{prediction.nextMilestone}</span></p>
                      <p>Estimated Time: <span className="font-medium text-purple-600">{prediction.timeToMaster}</span></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Metrics Card */}
          <Card className="bg-[#edf5ee] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: '#08272a' }}>
                <Target className="h-5 w-5" style={{ color: '#08272a' }} />
                Learning Metrics
                <Badge
                  variant="secondary"
                  className="ml-auto px-3 py-1 rounded-full font-bold"
                  style={{ background: 'linear-gradient(90deg, #e3ffcd 0%, #edf5ee 100%)', color: '#08272a' }}
                >
                  Real-time
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {learningMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.metric}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 1 + index * 0.1 } }}
                    className="p-4 bg-white/50 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{metric.icon}</span>
                      <h4 className="font-semibold text-gray-800">{metric.metric}</h4>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-blue-600">{metric.value}%</span>
                      <span className="text-sm text-green-600">{metric.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Learning Recommendations */}
          <Card className="bg-[#e3ffcd] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: '#08272a' }}>
                <Sparkles className="h-5 w-5" style={{ color: '#08272a' }} />
                AI Recommendations
                <Badge
                  variant="secondary"
                  className="ml-auto px-3 py-1 rounded-full font-bold"
                  style={{ background: 'linear-gradient(90deg, #e3ffcd 0%, #edf5ee 100%)', color: '#08272a' }}
                >
                  Personalized
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 1.1 } }}
                  className="p-4 bg-white/50 rounded-lg border border-green-100"
                >
                  <h4 className="font-semibold text-gray-800 mb-2">Suggested Learning Focus</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Based on your current progress and learning patterns, we recommend focusing on:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Deep dive into Neural Networks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Practice with Real-world Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Review Advanced React Patterns</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 1.2 } }}
                  className="p-4 bg-white/50 rounded-lg border border-green-100"
                >
                  <h4 className="font-semibold text-gray-800 mb-2">Optimal Learning Schedule</h4>
                  <p className="text-sm text-gray-600">
                    Your peak learning hours are between <span className="font-medium text-green-600">9 AM - 11 AM</span> and <span className="font-medium text-green-600">3 PM - 5 PM</span>
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
