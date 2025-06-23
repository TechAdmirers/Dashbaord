import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateMockData } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';
import { 
  CheckCircle, 
  Lock, 
  Trophy, 
  Star, 
  Target, 
  TrendingUp, 
  Brain, 
  Zap,
  Calendar,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Crown,
  Sparkles,
  Rocket,
  Palette,
  Code,
  Database,
  Smartphone,
  Globe,
  Shield,
  BookOpen,
  Users,
  Clock,
  Filter,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Medal,
  Gift,
  Bookmark,
  Lightbulb,
  BarChart,
  LineChart,
  Target as TargetIcon,
  Flame,
  CalendarDays,
  UserCheck,
  Award as AwardIcon,
  GraduationCap,
  Briefcase,
  Heart,
  Eye,
  Share2,
  Download,
  Settings,
  RefreshCw,
  Link2
} from 'lucide-react';

const { 
  achievements, 
  achievementStats, 
  achievementInsights, 
  achievementChains, 
  userProgress, 
  leaderboard, 
  achievementRecommendations, 
  skillDevelopment, 
  milestones, 
  enhancedAchievementStats 
} = generateMockData();

const Achievements = () => {
  const [achievementsList, setAchievementsList] = useState(achievements);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRarity, setFilterRarity] = useState('all');
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const { width, height } = useWindowSize();

  const unlockAchievement = () => {
    const lockedAchievement = achievementsList.find(a => !a.unlocked);
    if (lockedAchievement) {
      setAchievementsList(
        achievementsList.map(a =>
          a.id === lockedAchievement.id ? { ...a, unlocked: true } : a
        )
      );
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const hasLockedAchievements = achievementsList.some(a => !a.unlocked);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Rare': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Epic': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming': return <Code className="w-4 h-4" />;
      case 'Design': return <Palette className="w-4 h-4" />;
      case 'AI/ML': return <Brain className="w-4 h-4" />;
      case 'Motivation': return <Target className="w-4 h-4" />;
      case 'Projects': return <Rocket className="w-4 h-4" />;
      case 'Tools': return <Database className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAchievements = achievementsList.filter(achievement => {
    const categoryMatch = filterCategory === 'all' || achievement.category === filterCategory;
    const rarityMatch = filterRarity === 'all' || achievement.rarity === filterRarity;
    return categoryMatch && rarityMatch;
  });

  const categories = ['all', ...Array.from(new Set(achievementsList.map(a => a.category)))];
  const rarities = ['all', 'Common', 'Rare', 'Epic', 'Legendary'];

  return (
    <div className="space-y-8">
      {showConfetti && <Confetti width={width} height={height} />}
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-deep-emerald-green flex items-center gap-3">
            <Trophy className="text-yellow-500" />
            Achievements
          </h1>
          <p className="text-gray-600 mt-2">Track your learning milestones and unlock rewards</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-lg border border-yellow-200">
            <Crown className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">{userProgress.rank} Rank</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg border border-blue-200">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Level {userProgress.level}</span>
        </div>
        {hasLockedAchievements && (
            <Button 
              onClick={unlockAchievement}
              className="bg-gradient-to-r from-deep-emerald-green to-teal-600 hover:from-deep-emerald-green/90 hover:to-teal-600/90"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Unlock Next Achievement
            </Button>
          )}
        </div>
      </motion.div>

      {/* Enhanced Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Achievements</p>
                <p className="text-3xl font-bold text-blue-800">{achievementStats.totalAchievements}</p>
                <p className="text-xs text-blue-600 mt-1">+2 this month</p>
              </div>
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Learning Streak</p>
                <p className="text-3xl font-bold text-green-800">{userProgress.currentStreak} days</p>
                <p className="text-xs text-green-600 mt-1">Best: {userProgress.longestStreak} days</p>
              </div>
              <Flame className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Experience Points</p>
                <p className="text-3xl font-bold text-purple-800">{userProgress.experience}</p>
                <p className="text-xs text-purple-600 mt-1">{userProgress.experienceToNext} to next level</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Study Hours</p>
                <p className="text-3xl font-bold text-orange-800">{userProgress.totalStudyHours}h</p>
                <p className="text-xs text-orange-600 mt-1">{userProgress.weeklyAverage}h/week avg</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Recommendations Banner */}
      {showRecommendations && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Recommendations</h3>
                <p className="text-sm text-gray-600">Personalized suggestions to boost your progress</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRecommendations(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {achievementRecommendations.slice(0, 3).map((rec, index) => (
          <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                className="bg-white rounded-lg p-4 border border-purple-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <Badge className={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⏱️ {rec.estimatedTime}</span>
                  <span>📊 {rec.difficulty}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="chains">Chains</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progress Chart */}
            <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                  <BarChart3 className="text-blue-500" />
                  Achievement Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                    <span className="text-sm font-bold text-deep-emerald-green">{achievementStats.completionRate}%</span>
                  </div>
                  <Progress value={achievementStats.completionRate} className="h-3" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-deep-emerald-green">{achievementStats.unlockedCount}</div>
                      <div className="text-sm text-gray-600">Unlocked</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-gray-400">{achievementStats.totalAchievements - achievementStats.unlockedCount}</div>
                      <div className="text-sm text-gray-600">Remaining</div>
                    </div>
                  </div>

                  {/* Experience Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Level Progress</span>
                      <span className="text-sm font-bold text-deep-emerald-green">{userProgress.level} → {userProgress.nextLevel}</span>
                    </div>
                    <Progress value={(userProgress.experience / (userProgress.experience + userProgress.experienceToNext)) * 100} className="h-2" />
                    <div className="text-xs text-gray-500 text-center">
                      {userProgress.experience} / {userProgress.experience + userProgress.experienceToNext} XP
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                  <PieChart className="text-green-500" />
                  Category Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievementStats.categoryBreakdown.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(category.category)}
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-deep-emerald-green">{category.count}/{category.total}</div>
                        <div className="text-xs text-gray-500">{Math.round((category.count / category.total) * 100)}%</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Development */}
          <Card className="mt-8 bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                <TrendingUp className="text-purple-500" />
                Skill Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillDevelopment.currentSkills.map((skill, index) => (
                  <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                    className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                      {getTrendIcon(skill.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Current: {skill.level}%</span>
                        <span>Target: {skill.target}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="mt-6">
          <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                <Award className="text-purple-500" />
                All Achievements
              </CardTitle>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-500" />
                  <select 
                    value={filterRarity} 
                    onChange={(e) => setFilterRarity(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    {rarities.map(rarity => (
                      <option key={rarity} value={rarity}>
                        {rarity === 'all' ? 'All Rarities' : rarity}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.05 } }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
                        achievement.unlocked 
                          ? 'border-light-neon-green/50 bg-gradient-to-br from-white to-green-50' 
                          : 'bg-gray-100 border-gray-200'
                      }`}>
                        <CardHeader className="text-center pb-4">
                          <motion.div 
                            className={`text-6xl mx-auto transition-transform duration-300 ${
                              achievement.unlocked ? 'transform scale-110' : 'opacity-50'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {achievement.icon}
                          </motion.div>
                          <CardTitle className={`mt-3 text-lg ${
                            achievement.unlocked ? 'text-deep-emerald-green' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <p className={`text-sm text-center ${
                            achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {achievement.description}
                          </p>
                          
                          <div className="flex items-center justify-center gap-2">
                            {getCategoryIcon(achievement.category)}
                            <span className="text-xs text-gray-500">{achievement.category}</span>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <Badge className={getRarityColor(achievement.rarity)}>
                              {achievement.rarity}
                            </Badge>
                          </div>
                          
                          {!achievement.unlocked && achievement.progress > 0 && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <Progress value={achievement.progress} className="h-2" />
                            </div>
                          )}
                          
                          <div className="flex items-center justify-center">
                            {achievement.unlocked ? (
                              <div className="flex items-center text-green-500">
                            <CheckCircle size={16} className="mr-1" />
                            <span className="text-xs font-semibold">Unlocked</span>
                        </div>
                    ) : (
                              <div className="flex items-center text-gray-400">
                            <Lock size={16} className="mr-1" />
                            <span className="text-xs font-semibold">Locked</span>
                        </div>
                    )}
                          </div>
                          
                          {achievement.unlocked && (
                            <div className="text-center">
                              <div className="text-xs text-gray-500">Unlocked on</div>
                              <div className="text-xs font-medium text-deep-emerald-green">
                                {new Date(achievement.dateUnlocked!).toLocaleDateString()}
                              </div>
                            </div>
                          )}
                          
                          <div className="text-center">
                            <Badge variant="outline" className="text-xs">
                              {achievement.points} pts
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievement Chains Tab */}
        <TabsContent value="chains" className="mt-6">
          <Card className="bg-gradient-to-br from-white to-yellow-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                <Link2 className="text-yellow-500" />
                Achievement Chains
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {achievementChains.map((chain, index) => (
                  <motion.div
                    key={chain.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                    className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{chain.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{chain.title}</h3>
                          <p className="text-sm text-gray-600">{chain.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-deep-emerald-green">{chain.progress}%</div>
                        <div className="text-sm text-gray-500">Complete</div>
                      </div>
                    </div>
                    
                    <Progress value={chain.progress} className="h-3 mb-4" />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {chain.achievements.map((achievement, achIndex) => (
                        <div
                          key={achievement.id}
                          className={`p-3 rounded-lg border text-center ${
                            achievement.unlocked 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className={`text-2xl mb-1 ${
                            achievement.unlocked ? 'opacity-100' : 'opacity-30'
                          }`}>
                            {achievement.order === 1 ? '1️⃣' : achievement.order === 2 ? '2️⃣' : achievement.order === 3 ? '3️⃣' : '4️⃣'}
                          </div>
                          <div className={`text-xs font-medium ${
                            achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </div>
                          {achievement.unlocked && (
                            <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-1" />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          Reward: {chain.reward.name} {chain.reward.icon}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Rarity Distribution */}
            <Card className="bg-gradient-to-br from-white to-yellow-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                  <Crown className="text-yellow-500" />
                  Rarity Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievementStats.rarityBreakdown.map((rarity, index) => (
                    <motion.div
                      key={rarity.rarity}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                      className="p-4 bg-white rounded-lg border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{rarity.rarity}</span>
                        </div>
                        <span className="text-sm font-bold text-deep-emerald-green">
                          {rarity.count}/{rarity.total}
                        </span>
                      </div>
                      <Progress 
                        value={(rarity.count / rarity.total) * 100} 
                        className="h-2" 
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Progress */}
            <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                  <Activity className="text-blue-500" />
                  Monthly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievementStats.monthlyProgress.map((month, index) => (
                    <motion.div
                      key={month.month}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      className="p-4 bg-white rounded-lg border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{month.month}</span>
                        </div>
                        <span className="text-sm font-bold text-deep-emerald-green">
                          {month.unlocked}/{month.total}
                        </span>
                      </div>
                      {month.total > 0 && (
                        <Progress 
                          value={(month.unlocked / month.total) * 100} 
                          className="h-2" 
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Activity Chart */}
          <Card className="mt-8 bg-gradient-to-br from-white to-green-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                <LineChart className="text-green-500" />
                Daily Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {userProgress.dailyActivity.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                    className="text-center"
                  >
                    <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                    <div className="bg-white rounded-lg p-2 border">
                      <div className="text-sm font-bold text-deep-emerald-green">{day.hours}h</div>
                      <div className="text-xs text-gray-500">{day.achievements} achievements</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="mt-6">
          <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                <Users className="text-purple-500" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {user.rank === 1 && <Medal className="w-5 h-5 text-yellow-500" />}
                        {user.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                        {user.rank === 3 && <Medal className="w-5 h-5 text-orange-500" />}
                        {user.rank > 3 && (
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                            {user.rank}
                          </div>
                        )}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">Level {user.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-deep-emerald-green">{user.points} pts</div>
                      <div className="text-sm text-gray-500">{user.achievements} achievements</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="mt-6">
          <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-deep-emerald-green">
                <Brain className="text-purple-500" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievementInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                    className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-3xl ${insight.color}`}>
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
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
    </div>
  );
};

export default Achievements;

