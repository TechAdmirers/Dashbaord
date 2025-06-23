import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, Clock, Users, Star, BarChart3, Lightbulb, Zap, TrendingDown } from 'lucide-react';

interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
  recommendedCourses: number;
}

interface LearningTrend {
  category: string;
  growth: number;
  demand: 'high' | 'medium' | 'low';
  salaryImpact: number;
  courseCount: number;
}

interface CourseAnalyticsProps {
  skillGaps: SkillGap[];
  learningTrends: LearningTrend[];
  userProgress: {
    completedCourses: number;
    totalHours: number;
    averageRating: number;
    preferredCategories: string[];
  };
}

const CourseAnalytics: React.FC<CourseAnalyticsProps> = ({ skillGaps, learningTrends, userProgress }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (growth < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <BarChart3 className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-8 h-8 text-deep-emerald-green" />
          <h2 className="text-2xl font-bold text-deep-emerald-green">AI Analytics & Insights</h2>
        </div>
        <p className="text-gray-600">Advanced analytics to help you make informed learning decisions.</p>
      </motion.div>

      {/* User Progress Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Your Learning Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userProgress.completedCourses}</div>
                <div className="text-sm text-blue-700">Courses Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{userProgress.totalHours}h</div>
                <div className="text-sm text-indigo-700">Total Learning Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userProgress.averageRating.toFixed(1)}</div>
                <div className="text-sm text-purple-700">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">{userProgress.preferredCategories.length}</div>
                <div className="text-sm text-cyan-700">Focus Areas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Gap Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-deep-emerald-green" />
                Skill Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillGaps.map((gap, index) => (
                  <motion.div
                    key={gap.skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{gap.skill}</span>
                        <Badge className={getPriorityColor(gap.priority)}>
                          {gap.priority} Priority
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-600">
                        {gap.currentLevel}% → {gap.targetLevel}%
                      </span>
                    </div>
                    <Progress value={gap.currentLevel} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Gap: {gap.gap}%</span>
                      <span>{gap.recommendedCourses} courses available</span>
                    </div>
                    {index < skillGaps.length - 1 && <Separator className="mt-4" />}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Trends */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-deep-emerald-green" />
                Market Trends & Demand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningTrends.map((trend, index) => (
                  <motion.div
                    key={trend.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{trend.category}</span>
                        <Badge className={getDemandColor(trend.demand)}>
                          {trend.demand} Demand
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {getGrowthIcon(trend.growth)}
                        <span className={`text-sm font-medium ${trend.growth > 0 ? 'text-green-600' : trend.growth < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {trend.growth > 0 ? '+' : ''}{trend.growth}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Salary Impact: +{trend.salaryImpact}%</span>
                      <span>{trend.courseCount} courses</span>
                    </div>
                    {index < learningTrends.length - 1 && <Separator className="mt-4" />}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-gradient-to-r from-deep-emerald-green/5 to-emerald-50 border-deep-emerald-green/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-deep-emerald-green" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-deep-emerald-green/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-deep-emerald-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Learning Pattern</h4>
                  <p className="text-xs text-gray-600">
                    You learn best with hands-on projects. Focus on courses with practical assignments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Career Opportunity</h4>
                  <p className="text-xs text-gray-600">
                    Full-stack development skills are in high demand. Consider the complete path.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Time Optimization</h4>
                  <p className="text-xs text-gray-600">
                    Study 2-3 hours daily for maximum retention. Weekends are your peak learning time.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommended Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-deep-emerald-green" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skillGaps
                .filter(gap => gap.priority === 'high')
                .slice(0, 3)
                .map((gap, index) => (
                  <motion.div
                    key={gap.skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg"
                  >
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Target className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-orange-900">
                        Focus on {gap.skill}
                      </h4>
                      <p className="text-xs text-orange-700">
                        {gap.recommendedCourses} courses available to close this {gap.gap}% skill gap
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CourseAnalytics; 