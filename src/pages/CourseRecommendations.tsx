import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateMockData } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Clock, Users, TrendingUp, Brain, Target, Zap, BookOpen, Award, Play } from 'lucide-react';
import LearningPathRecommendations from '@/components/LearningPathRecommendations';
import CourseAnalytics from '@/components/CourseAnalytics';

const { recommendedCourses, skillGapData } = generateMockData();

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  duration: string;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  instructor: string;
  category: string;
  tags: string[];
  prerequisites: string[];
  skills: string[];
  completionRate: number;
  aiInsight: string;
  recommendationReason: string;
  estimatedCompletion: string;
  includes: string[];
  lastUpdated: string;
  trending: boolean;
  personalized: boolean;
}

const CourseRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('courses');

  // Mock data for analytics
  const analyticsData = {
    skillGaps: [
      {
        skill: 'Backend Development',
        currentLevel: 65,
        targetLevel: 85,
        gap: 20,
        priority: 'high' as const,
        recommendedCourses: 3
      },
      {
        skill: 'DevOps',
        currentLevel: 40,
        targetLevel: 70,
        gap: 30,
        priority: 'high' as const,
        recommendedCourses: 2
      },
      {
        skill: 'Machine Learning',
        currentLevel: 30,
        targetLevel: 75,
        gap: 45,
        priority: 'medium' as const,
        recommendedCourses: 4
      },
      {
        skill: 'UI/UX Design',
        currentLevel: 60,
        targetLevel: 80,
        gap: 20,
        priority: 'medium' as const,
        recommendedCourses: 2
      }
    ],
    learningTrends: [
      {
        category: 'AI & Machine Learning',
        growth: 25,
        demand: 'high' as const,
        salaryImpact: 40,
        courseCount: 15
      },
      {
        category: 'Full-Stack Development',
        growth: 18,
        demand: 'high' as const,
        salaryImpact: 30,
        courseCount: 12
      },
      {
        category: 'Mobile Development',
        growth: 12,
        demand: 'medium' as const,
        salaryImpact: 25,
        courseCount: 8
      },
      {
        category: 'DevOps',
        growth: 20,
        demand: 'high' as const,
        salaryImpact: 35,
        courseCount: 10
      }
    ],
    userProgress: {
      completedCourses: 8,
      totalHours: 156,
      averageRating: 4.7,
      preferredCategories: ['Frontend', 'JavaScript', 'React']
    }
  };

  // Get unique categories and difficulties
  const categories = useMemo(() => {
    const cats = [...new Set(recommendedCourses.map(course => course.category))];
    return ['all', ...cats];
  }, []);

  const difficulties = useMemo(() => {
    const diffs = [...new Set(recommendedCourses.map(course => course.difficulty))];
    return ['all', ...diffs];
  }, []);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = recommendedCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort courses
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'students':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'completion':
        filtered.sort((a, b) => b.completionRate - a.completionRate);
        break;
      case 'trending':
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      default: // recommended
        filtered.sort((a, b) => {
          // Prioritize personalized recommendations
          if (a.personalized && !b.personalized) return -1;
          if (!a.personalized && b.personalized) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  // Get recommendation insights
  const getRecommendationInsights = () => {
    const personalizedCount = filteredCourses.filter(c => c.personalized).length;
    const trendingCount = filteredCourses.filter(c => c.trending).length;
    const avgRating = filteredCourses.reduce((sum, c) => sum + c.rating, 0) / filteredCourses.length;
    
    return {
      personalizedCount,
      trendingCount,
      avgRating: avgRating.toFixed(1),
      totalCourses: filteredCourses.length
    };
  };

  const insights = getRecommendationInsights();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationIcon = (reason: string) => {
    switch (reason) {
      case 'skill_gap': return <Target className="w-4 h-4" />;
      case 'career_path': return <TrendingUp className="w-4 h-4" />;
      case 'skill_complement': return <Zap className="w-4 h-4" />;
      case 'ai_interest': return <Brain className="w-4 h-4" />;
      case 'skill_expansion': return <BookOpen className="w-4 h-4" />;
      case 'skill_enhancement': return <Award className="w-4 h-4" />;
      case 'full_stack': return <Play className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-8 h-8 text-deep-emerald-green" />
          <h1 className="text-3xl font-bold text-deep-emerald-green">AI Course Recommendations</h1>
        </div>
        <p className="text-gray-600">Intelligent course suggestions based on your profile, learning history, and career goals.</p>
      </motion.div>

      {/* AI Insights Dashboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-deep-emerald-green/5 to-emerald-50 border-deep-emerald-green/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-deep-emerald-green">{insights.personalizedCount}</div>
                <div className="text-sm text-gray-600">Personalized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{insights.trendingCount}</div>
                <div className="text-sm text-gray-600">Trending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{insights.avgRating}</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{insights.totalCourses}</div>
                <div className="text-sm text-gray-600">Total Courses</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">Individual Courses</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-6 space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty === 'all' ? 'All Levels' : difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="students">Most Popular</SelectItem>
                      <SelectItem value="price">Price: Low to High</SelectItem>
                      <SelectItem value="completion">Completion Rate</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedDifficulty('all');
                      setSortBy('recommended');
                    }}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course View Tabs */}
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="carousel">Carousel View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                          <div className="relative">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                            />
                            {course.trending && (
                              <Badge className="absolute top-2 left-2 bg-orange-500">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            {course.personalized && (
                              <Badge className="absolute top-2 right-2 bg-deep-emerald-green">
                                <Brain className="w-3 h-3 mr-1" />
                                AI Recommended
                              </Badge>
                            )}
                            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-sm">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </div>
                          </div>

                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg text-deep-emerald-green line-clamp-2">
                                {course.title}
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{course.instructor}</span>
                              <span>•</span>
                              <span>{course.category}</span>
                            </div>
                          </CardHeader>

                          <CardContent className="pt-0">
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {course.description}
                            </p>

                            <div className="flex items-center gap-2 mb-3">
                              <Badge className={getDifficultyColor(course.difficulty)}>
                                {course.difficulty}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Clock className="w-3 h-3" />
                                {course.duration}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Users className="w-3 h-3" />
                                {course.students.toLocaleString()}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              {getRecommendationIcon(course.recommendationReason)}
                              <span className="text-xs text-gray-500 italic">
                                {course.aiInsight}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-deep-emerald-green">
                                  ${course.price}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  ${course.originalPrice}
                                </span>
                              </div>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    onClick={() => setSelectedCourse(course)}
                                    className="bg-deep-emerald-green hover:bg-deep-emerald-green/90"
                                  >
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl text-deep-emerald-green">
                                      {course.title}
                                    </DialogTitle>
                                  </DialogHeader>
                                  
                                  {selectedCourse && (
                                    <div className="space-y-6">
                                      <img 
                                        src={selectedCourse.image} 
                                        alt={selectedCourse.title} 
                                        className="w-full h-64 object-cover rounded-lg"
                                      />
                                      
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                          <h3 className="font-semibold mb-2">Course Details</h3>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Instructor:</span>
                                              <span>{selectedCourse.instructor}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Duration:</span>
                                              <span>{selectedCourse.duration}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Difficulty:</span>
                                              <Badge className={getDifficultyColor(selectedCourse.difficulty)}>
                                                {selectedCourse.difficulty}
                                              </Badge>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Completion Rate:</span>
                                              <span>{selectedCourse.completionRate}%</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Students:</span>
                                              <span>{selectedCourse.students.toLocaleString()}</span>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <h3 className="font-semibold mb-2">AI Insight</h3>
                                          <p className="text-sm text-gray-600 mb-4">
                                            {selectedCourse.aiInsight}
                                          </p>
                                          
                                          <h3 className="font-semibold mb-2">Skills You'll Learn</h3>
                                          <div className="flex flex-wrap gap-1 mb-4">
                                            {selectedCourse.skills.map((skill, index) => (
                                              <Badge key={index} variant="secondary" className="text-xs">
                                                {skill}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>

                                      <Separator />

                                      <div>
                                        <h3 className="font-semibold mb-2">Prerequisites</h3>
                                        <div className="flex flex-wrap gap-1 mb-4">
                                          {selectedCourse.prerequisites.map((prereq, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                              {prereq}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      <div>
                                        <h3 className="font-semibold mb-2">What's Included</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                          {selectedCourse.includes.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                              <div className="w-2 h-2 bg-deep-emerald-green rounded-full"></div>
                                              {item}
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <Separator />

                                      <div className="flex items-center justify-between">
                                        <div>
                                          <span className="text-2xl font-bold text-deep-emerald-green">
                                            ${selectedCourse.price}
                                          </span>
                                          <span className="text-lg text-gray-500 line-through ml-2">
                                            ${selectedCourse.originalPrice}
                                          </span>
                                        </div>
                                        <Button className="bg-deep-emerald-green hover:bg-deep-emerald-green/90">
                                          Enroll Now
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>

              <TabsContent value="carousel" className="mt-6">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full max-w-6xl mx-auto"
                >
                  <CarouselContent>
                    {filteredCourses.map((course, index) => (
                      <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
                        <motion.div 
                          className="p-1"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                        >
                          <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-0">
                              <img src={course.image} alt={course.title} className="rounded-t-lg w-full h-40 object-cover" />
                            </CardContent>
                            <CardHeader>
                              <CardTitle className="text-deep-emerald-green">{course.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                              <p className="text-gray-600 text-sm">{course.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-12" />
                  <CarouselNext className="mr-12" />
                </Carousel>
              </TabsContent>
            </Tabs>

            {/* No Results */}
            {filteredCourses.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="paths" className="mt-6">
            <LearningPathRecommendations />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <CourseAnalytics 
              skillGaps={analyticsData.skillGaps}
              learningTrends={analyticsData.learningTrends}
              userProgress={analyticsData.userProgress}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default CourseRecommendations;
