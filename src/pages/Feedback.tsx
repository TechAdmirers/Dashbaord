import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { MessageSquareQuote, Brain, Upload, FileText, Code, PenTool, TrendingUp, Target, Award, Zap, Star, ThumbsUp, AlertCircle, CheckCircle, Camera, Mic, Lightbulb, Clock, Users, BarChart3, Sparkles, ArrowUpRight, Download, Share2, BookOpen, Settings, Filter } from 'lucide-react';

interface FeedbackAnalysis {
  id: string;
  title: string;
  category: string;
  overallScore: number;
  categories: Array<{
    subject: string;
    score: number;
    maxScore: number;
  }>;
  improvements: Array<{
    area: string;
    current: number;
    target: number;
    priority: 'high' | 'medium' | 'low';
  }>;
  trends: Array<{
    week: string;
    score: number;
    submissions: number;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    impact: string;
    effort: string;
  }>;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  timestamp: string;
  status: 'completed' | 'processing' | 'failed';
}

const Feedback = () => {
  const [selectedType, setSelectedType] = useState('code');
  const [feedbackText, setFeedbackText] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackAnalysis[]>([]);

  const feedbackTypes = [
    { 
      id: 'code', 
      name: 'Code Review', 
      icon: Code, 
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Get detailed feedback on your code quality, structure, and best practices'
    },
    { 
      id: 'essay', 
      name: 'Essay Analysis', 
      icon: FileText, 
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Analyze writing style, grammar, structure, and content quality'
    },
    { 
      id: 'design', 
      name: 'Design Critique', 
      icon: PenTool, 
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Receive feedback on UI/UX design, aesthetics, and user experience'
    },
    { 
      id: 'presentation', 
      name: 'Presentation', 
      icon: Camera, 
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Evaluate presentation skills, content organization, and delivery'
    }
  ];

  const mockFeedbackData: FeedbackAnalysis = {
    id: '1',
    title: 'React Component Optimization',
    category: 'Frontend Development',
    overallScore: 85,
    categories: [
      { subject: 'Code Quality', score: 85, maxScore: 100 },
      { subject: 'Performance', score: 90, maxScore: 100 },
      { subject: 'Readability', score: 75, maxScore: 100 },
      { subject: 'Best Practices', score: 88, maxScore: 100 },
      { subject: 'Documentation', score: 92, maxScore: 100 },
      { subject: 'Maintainability', score: 80, maxScore: 100 }
    ],
    improvements: [
      { area: 'Code Structure', current: 75, target: 90, priority: 'high' },
      { area: 'Documentation', current: 60, target: 85, priority: 'medium' },
      { area: 'Error Handling', current: 70, target: 88, priority: 'high' },
      { area: 'Performance', current: 85, target: 95, priority: 'low' }
    ],
    trends: [
      { week: 'Week 1', score: 70, submissions: 5 },
      { week: 'Week 2', score: 75, submissions: 8 },
      { week: 'Week 3', score: 80, submissions: 6 },
      { week: 'Week 4', score: 85, submissions: 10 }
    ],
    recommendations: [
      {
        title: 'Implement Code Splitting',
        description: 'Break down large components into smaller, focused ones to improve maintainability and performance.',
        priority: 'high',
        impact: 'High',
        effort: 'Medium'
      },
      {
        title: 'Add Comprehensive Documentation',
        description: 'Include JSDoc comments and README files to make the codebase more accessible to other developers.',
        priority: 'medium',
        impact: 'Medium',
        effort: 'Low'
      },
      {
        title: 'Enhance Error Handling',
        description: 'Implement proper error boundaries and try-catch blocks for better user experience.',
        priority: 'high',
        impact: 'High',
        effort: 'Medium'
      },
      {
        title: 'Optimize Bundle Size',
        description: 'Use tree shaking and dynamic imports to reduce the overall bundle size.',
        priority: 'low',
        impact: 'Medium',
        effort: 'High'
      }
    ],
    sentiment: {
      positive: 65,
      neutral: 25,
      negative: 10
    },
    timestamp: new Date().toISOString(),
    status: 'completed'
  };

  const sentimentColors = ['#e3ffcd', '#edf5ee', '#08272a'];

  const handleAnalyze = () => {
    if (!feedbackText.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      setFeedbackHistory(prev => [mockFeedbackData, ...prev]);
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-[#08272a] text-white border-[#08272a]';
      case 'medium': return 'bg-[#edf5ee] text-[#08272a] border-[#edf5ee]';
      case 'low': return 'bg-[#e3ffcd] text-[#08272a] border-[#e3ffcd]';
      default: return 'bg-[#edf5ee] text-[#08272a] border-[#edf5ee]';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-[#08272a]';
      case 'Medium': return 'text-[#08272a]';
      case 'Low': return 'text-[#08272a]';
      default: return 'text-[#08272a]';
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 font-['Poppins']">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#08272a] rounded-2xl shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-[#08272a]">
              AI Feedback Engine
            </h1>
          </div>
          <p className="text-[#08272a] text-lg max-w-2xl mx-auto">
            Get instant, AI-powered feedback on your code, essays, and creative work with detailed analytics and improvement suggestions
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              Real-time Analysis
            </Badge>
            <Badge className="bg-[#edf5ee] text-[#08272a] border border-[#edf5ee] px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
          </div>
        </motion.div>

        {/* Feedback Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {feedbackTypes.map((type, index) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-full"
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 border-2 shadow-lg hover:shadow-xl h-full flex flex-col ${
                  selectedType === type.id 
                    ? 'border-[#08272a] bg-[#edf5ee]' 
                    : 'border-[#edf5ee] bg-white hover:border-[#08272a]'
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <CardContent className="p-6 text-center flex flex-col justify-between h-full">
                  <div>
                    <div className={`mx-auto w-16 h-16 rounded-2xl bg-[#08272a] flex items-center justify-center mb-4 shadow-lg`}>
                      <type.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-[#08272a] font-semibold text-lg mb-3">{type.name}</h3>
                    <p className="text-[#08272a] text-sm leading-relaxed">{type.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
        >
          <Card className="bg-white border border-[#edf5ee] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#08272a] flex items-center gap-3">
                <Upload className="h-6 w-6 text-[#08272a]" />
                Submit Your Work for Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#08272a] block mb-2 font-medium">Title</label>
                  <Input 
                    placeholder="Enter title of your work..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a] text-[#08272a] placeholder-[#08272a]/60"
                  />
                </div>
                <div>
                  <label className="text-[#08272a] block mb-2 font-medium">Category</label>
                  <Input 
                    placeholder="e.g., React Component, Python Script..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a] text-[#08272a] placeholder-[#08272a]/60 mt-4 md:mt-0"
                  />
                </div>
              </div>
              <div>
                <label className="text-[#08272a] block mb-2 font-medium">Content</label>
                <Textarea 
                  placeholder="Paste your code, essay, or description here..."
                  rows={8}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a] text-[#08272a] placeholder-[#08272a]/60"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !feedbackText}
                  className="bg-[#08272a] hover:bg-[#08272a]/90 text-white px-8 shadow-lg w-full sm:w-auto"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>
                <Button variant="outline" className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee] w-full sm:w-auto">
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Input
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="space-y-6"
            >
              {/* Overall Score */}
              <Card className="bg-[#edf5ee] border border-[#e3ffcd] shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-[#08272a]">
                        {mockFeedbackData.overallScore}
                      </div>
                      <div className="text-[#08272a] text-lg font-medium">Overall Score</div>
                    </div>
                    <div className="h-16 w-px bg-[#e3ffcd]"></div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#08272a]">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Excellent Quality</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#08272a]">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">Minor Improvements</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#08272a]">
                        <ThumbsUp className="h-5 w-5" />
                        <span className="font-medium">Well Structured</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for Different Views */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-[#edf5ee] p-1 rounded-lg">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-[#08272a] text-[#08272a]">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="analysis" className="data-[state=active]:bg-white data-[state=active]:text-[#08272a] text-[#08272a]">
                    <Target className="h-4 w-4 mr-2" />
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger value="recommendations" className="data-[state=active]:bg-white data-[state=active]:text-[#08272a] text-[#08272a]">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Recommendations
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:text-[#08272a] text-[#08272a]">
                    <Clock className="h-4 w-4 mr-2" />
                    History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Performance Radar */}
                    <Card className="bg-white border border-[#edf5ee] shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#08272a] flex items-center gap-3">
                          <Target className="h-6 w-6 text-[#08272a]" />
                          Performance Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <RadarChart data={mockFeedbackData.categories}>
                            <PolarGrid stroke="#edf5ee" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#08272a', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#08272a', fontSize: 10 }} />
                            <Radar 
                              name="Your Score" 
                              dataKey="score" 
                              stroke="#08272a" 
                              fill="#08272a" 
                              fillOpacity={0.3} 
                              strokeWidth={2}
                            />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #edf5ee',
                                borderRadius: '8px',
                                color: '#08272a'
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Sentiment Analysis */}
                    <Card className="bg-white border border-[#edf5ee] shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#08272a] flex items-center gap-3">
                          <MessageSquareQuote className="h-6 w-6 text-[#08272a]" />
                          Sentiment Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Positive', value: mockFeedbackData.sentiment.positive },
                                { name: 'Neutral', value: mockFeedbackData.sentiment.neutral },
                                { name: 'Negative', value: mockFeedbackData.sentiment.negative }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                            >
                              {sentimentColors.map((color, index) => (
                                <Cell key={`cell-${index}`} fill={color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #edf5ee',
                                borderRadius: '8px',
                                color: '#08272a'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#e3ffcd] rounded-full"></div>
                            <span className="text-sm text-[#08272a]">Positive</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#edf5ee] rounded-full"></div>
                            <span className="text-sm text-[#08272a]">Neutral</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#08272a] rounded-full"></div>
                            <span className="text-sm text-[#08272a]">Negative</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Progress Trends */}
                  <Card className="bg-white border border-[#edf5ee] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#08272a] flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-[#08272a]" />
                        Progress Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={mockFeedbackData.trends}>
                          <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#08272a" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#08272a" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="week" tick={{ fill: '#08272a' }} />
                          <YAxis tick={{ fill: '#08272a' }} />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #edf5ee',
                              borderRadius: '8px',
                              color: '#08272a'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#08272a" 
                            fillOpacity={1} 
                            fill="url(#colorScore)" 
                            strokeWidth={3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-6">
                  {/* Improvement Areas */}
                  <Card className="bg-white border border-[#edf5ee] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#08272a] flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-[#08272a]" />
                        Improvement Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockFeedbackData.improvements}>
                          <XAxis dataKey="area" tick={{ fill: '#08272a', fontSize: 11 }} />
                          <YAxis tick={{ fill: '#08272a' }} />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #edf5ee',
                              borderRadius: '8px',
                              color: '#08272a'
                            }}
                          />
                          <Legend />
                          <Bar dataKey="current" fill="#edf5ee" name="Current Score" />
                          <Bar dataKey="target" fill="#e3ffcd" name="Target Score" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Detailed Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockFeedbackData.categories.map((category, index) => (
                      <Card key={index} className="bg-white border border-[#edf5ee] shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[#08272a] font-semibold">{category.subject}</h3>
                            <span className="text-2xl font-bold text-[#08272a]">{category.score}</span>
                          </div>
                          <Progress value={category.score} className="h-2 bg-[#edf5ee]" style={{ '--progress-background': '#08272a' } as any} />
                          <div className="flex justify-between text-sm text-[#08272a] mt-2">
                            <span>0</span>
                            <span>{category.maxScore}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-6">
                  {/* AI Recommendations */}
                  <Card className="bg-[#edf5ee] border border-[#e3ffcd] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#08272a] flex items-center gap-3">
                        <Brain className="h-6 w-6 text-[#08272a]" />
                        AI-Generated Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockFeedbackData.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                          className="p-6 bg-white rounded-lg border border-[#edf5ee] shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="text-[#08272a] font-semibold text-lg mb-2">{rec.title}</h4>
                              <p className="text-[#08272a] mb-3">{rec.description}</p>
                              <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-[#08272a]/70">Impact:</span>
                                  <span className={`text-sm font-medium ${getImpactColor(rec.impact)}`}>
                                    {rec.impact}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-[#08272a]/70">Effort:</span>
                                  <span className="text-sm font-medium text-[#08272a]">{rec.effort}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={`ml-4 border ${getPriorityColor(rec.priority)}`}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Learn More
                            </Button>
                            <Button size="sm" variant="outline" className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]">
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                  {/* Feedback History */}
                  <Card className="bg-white border border-[#edf5ee] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#08272a] flex items-center gap-3">
                        <Clock className="h-6 w-6 text-[#08272a]" />
                        Feedback History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {feedbackHistory.map((feedback, index) => (
                          <motion.div
                            key={feedback.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                            className="p-4 border border-[#edf5ee] rounded-lg hover:bg-[#edf5ee] transition-colors cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="text-[#08272a] font-semibold">{feedback.title}</h4>
                                <p className="text-[#08272a] text-sm">{feedback.category}</p>
                                <p className="text-[#08272a]/70 text-xs">
                                  {new Date(feedback.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-[#08272a]">{feedback.overallScore}</div>
                                  <div className="text-xs text-[#08272a]/70">Score</div>
                                </div>
                                <Button size="sm" variant="outline" className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]">
                                  <ArrowUpRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {feedbackHistory.length === 0 && (
                          <div className="text-center py-8 text-[#08272a]/70">
                            <Clock className="h-12 w-12 mx-auto mb-4 text-[#edf5ee]" />
                            <p>No feedback history yet. Submit your first analysis to see it here!</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feedback;
