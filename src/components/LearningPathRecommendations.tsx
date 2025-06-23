import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Brain, BookOpen, Clock, Users, Star, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  courses: Array<{
    id: number;
    title: string;
    duration: string;
    difficulty: string;
    rating: number;
    skills: string[];
  }>;
  targetSkills: string[];
  currentSkillLevel: number;
  targetSkillLevel: number;
  estimatedTimeToComplete: string;
  careerImpact: string;
  aiInsight: string;
  priority: 'high' | 'medium' | 'low';
}

const LearningPathRecommendations = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const learningPaths: LearningPath[] = [
    {
      id: 'fullstack-dev',
      title: 'Full-Stack Development Path',
      description: 'Master both frontend and backend development to become a complete full-stack developer.',
      duration: '6-8 months',
      difficulty: 'Intermediate',
      courses: [
        {
          id: 1,
          title: 'Advanced JavaScript: From Fundamentals to Expert',
          duration: '8 weeks',
          difficulty: 'Advanced',
          rating: 4.8,
          skills: ['Advanced JavaScript', 'Functional Programming', 'Async Programming']
        },
        {
          id: 8,
          title: 'Node.js Backend Development: From Zero to Hero',
          duration: '12 weeks',
          difficulty: 'Intermediate',
          rating: 4.6,
          skills: ['Backend Development', 'API Design', 'Database Management']
        },
        {
          id: 5,
          title: 'Docker & Kubernetes: Container Orchestration Mastery',
          duration: '8 weeks',
          difficulty: 'Advanced',
          rating: 4.5,
          skills: ['Containerization', 'Orchestration', 'DevOps']
        }
      ],
      targetSkills: ['Full-Stack Development', 'API Design', 'DevOps', 'Database Management'],
      currentSkillLevel: 65,
      targetSkillLevel: 90,
      estimatedTimeToComplete: '6-8 months',
      careerImpact: 'High demand for full-stack developers. Average salary increase: 25-40%',
      aiInsight: 'Based on your current frontend skills and career goals, this path will complete your full-stack capabilities and significantly boost your market value.',
      priority: 'high'
    },
    {
      id: 'ai-ml-specialist',
      title: 'AI & Machine Learning Specialist',
      description: 'Dive deep into artificial intelligence and machine learning to become an AI specialist.',
      duration: '8-12 months',
      difficulty: 'Advanced',
      courses: [
        {
          id: 2,
          title: 'Python for Data Science: Complete Bootcamp',
          duration: '10 weeks',
          difficulty: 'Intermediate',
          rating: 4.9,
          skills: ['Data Analysis', 'Python Programming', 'Statistical Analysis']
        },
        {
          id: 4,
          title: 'Introduction to Machine Learning with Python',
          duration: '12 weeks',
          difficulty: 'Intermediate',
          rating: 4.6,
          skills: ['Machine Learning', 'Algorithm Implementation', 'Model Evaluation']
        }
      ],
      targetSkills: ['Machine Learning', 'Data Science', 'Python', 'AI Algorithms'],
      currentSkillLevel: 40,
      targetSkillLevel: 85,
      estimatedTimeToComplete: '8-12 months',
      careerImpact: 'AI/ML specialists are in extremely high demand. Average salary increase: 40-60%',
      aiInsight: 'Your programming background and interest in AI make this an excellent career progression path with tremendous growth potential.',
      priority: 'high'
    },
    {
      id: 'mobile-dev',
      title: 'Mobile Development Expert',
      description: 'Expand your React knowledge into mobile development with React Native.',
      duration: '4-6 months',
      difficulty: 'Intermediate',
      courses: [
        {
          id: 6,
          title: 'React Native: Mobile App Development',
          duration: '10 weeks',
          difficulty: 'Intermediate',
          rating: 4.8,
          skills: ['Mobile Development', 'React Native', 'Cross-platform Development']
        }
      ],
      targetSkills: ['Mobile Development', 'React Native', 'Cross-platform Development'],
      currentSkillLevel: 75,
      targetSkillLevel: 90,
      estimatedTimeToComplete: '4-6 months',
      careerImpact: 'Mobile development skills are highly valued. Average salary increase: 20-30%',
      aiInsight: 'Leverage your existing React expertise to quickly expand into the growing mobile development market.',
      priority: 'medium'
    },
    {
      id: 'ui-ux-designer',
      title: 'UI/UX Design Specialist',
      description: 'Combine design skills with your technical background to become a design-focused developer.',
      duration: '3-5 months',
      difficulty: 'Beginner',
      courses: [
        {
          id: 3,
          title: 'UI/UX Design Principles: From Concept to Prototype',
          duration: '6 weeks',
          difficulty: 'Beginner',
          rating: 4.7,
          skills: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems']
        },
        {
          id: 7,
          title: 'Advanced CSS: Grid, Flexbox, and Modern Layouts',
          duration: '6 weeks',
          difficulty: 'Intermediate',
          rating: 4.7,
          skills: ['Advanced CSS', 'Layout Design', 'Responsive Design']
        }
      ],
      targetSkills: ['UI Design', 'UX Research', 'Design Systems', 'Advanced CSS'],
      currentSkillLevel: 60,
      targetSkillLevel: 85,
      estimatedTimeToComplete: '3-5 months',
      careerImpact: 'Design skills complement technical skills well. Average salary increase: 15-25%',
      aiInsight: 'This path will make you a more well-rounded developer with both technical and design capabilities.',
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <Target className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-8 h-8 text-deep-emerald-green" />
          <h2 className="text-2xl font-bold text-deep-emerald-green">AI Learning Paths</h2>
        </div>
        <p className="text-gray-600">Intelligent learning paths designed to accelerate your career growth based on your current skills and goals.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {learningPaths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getPriorityColor(path.priority)}>
                        {getPriorityIcon(path.priority)}
                        <span className="ml-1 capitalize">{path.priority} Priority</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-deep-emerald-green mb-2">
                      {path.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm mb-4">
                      {path.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Skill Progress</span>
                      <span className="text-deep-emerald-green font-medium">
                        {path.currentSkillLevel}% → {path.targetSkillLevel}%
                      </span>
                    </div>
                    <Progress 
                      value={path.currentSkillLevel} 
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{path.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{path.difficulty}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Target Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.targetSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Career Impact</h4>
                    <p className="text-xs text-gray-600">{path.careerImpact}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">AI Insight</h4>
                    <p className="text-xs text-gray-600 italic">{path.aiInsight}</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-600">Courses: </span>
                      <span className="font-medium">{path.courses.length}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-deep-emerald-green hover:bg-deep-emerald-green/90"
                      onClick={() => setSelectedPath(path)}
                    >
                      View Path
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Learning Path Details Modal */}
      {selectedPath && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-deep-emerald-green">
                  {selectedPath.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPath(null)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Path Overview</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span>{selectedPath.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span>{selectedPath.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Time:</span>
                        <span>{selectedPath.estimatedTimeToComplete}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <Badge className={getPriorityColor(selectedPath.priority)}>
                          {selectedPath.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Career Impact</h4>
                    <p className="text-sm text-gray-600 mb-3">{selectedPath.careerImpact}</p>
                    
                    <h4 className="font-semibold mb-3">AI Insight</h4>
                    <p className="text-sm text-gray-600">{selectedPath.aiInsight}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4">Course Sequence</h4>
                  <div className="space-y-4">
                    {selectedPath.courses.map((course, index) => (
                      <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-deep-emerald-green text-white rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-deep-emerald-green">{course.title}</h5>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{course.duration}</span>
                            <span>•</span>
                            <span>{course.difficulty}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {course.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-deep-emerald-green">
                      Start Learning Path
                    </span>
                    <p className="text-sm text-gray-600">Begin your journey to mastery</p>
                  </div>
                  <Button className="bg-deep-emerald-green hover:bg-deep-emerald-green/90">
                    Enroll in Path
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LearningPathRecommendations; 