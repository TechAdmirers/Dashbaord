import { faker } from '@faker-js/faker';

export const generateMockData = () => {
  const user = {
    name: faker.person.firstName(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatar(),
  };

  const stats = [
    { title: 'Total Courses Enrolled', value: faker.number.int({ min: 5, max: 20 }) },
    { title: 'Weekly Learning Hours', value: faker.number.int({ min: 2, max: 15 }) },
    { title: 'Upcoming Tasks', value: faker.number.int({ min: 1, max: 5 }) },
    { title: 'Achievements Unlocked', value: faker.number.int({ min: 3, max: 10 }) },
  ];

  const weeklyTrend = Array.from({ length: 7 }, (_, i) => {
    const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i];
    return {
      name: day,
      hours: faker.number.int({ min: 0, max: 5 }),
    };
  });

  const courseProgress = [
    { name: 'React Mastery', value: faker.number.int({ min: 20, max: 100 }), color: '#08272a' },
    { name: 'AI Fundamentals', value: faker.number.int({ min: 20, max: 100 }), color: '#0a3a3e' },
    { name: 'Advanced CSS', value: faker.number.int({ min: 20, max: 100 }), color: '#0f575c' },
    { name: 'Data Structures', value: faker.number.int({ min: 20, max: 100 }), color: '#14747b' },
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: 'Advanced JavaScript: From Fundamentals to Expert',
      description: 'Master closures, prototypes, and asynchronous JavaScript with real-world projects.',
      image: '/course/Js.jpg',
      difficulty: 'Advanced',
      duration: '8 weeks',
      rating: 4.8,
      students: 15420,
      price: 89.99,
      originalPrice: 129.99,
      instructor: 'Dr. Sarah Chen',
      category: 'Programming',
      tags: ['JavaScript', 'ES6+', 'Async/Await', 'Closures', 'Prototypes'],
      prerequisites: ['Basic JavaScript', 'HTML/CSS'],
      skills: ['Advanced JavaScript', 'Functional Programming', 'Async Programming'],
      completionRate: 78,
      aiInsight: 'Based on your React progress, this course will strengthen your JavaScript foundation and help you build more complex applications.',
      recommendationReason: 'skill_gap',
      estimatedCompletion: '6-8 weeks',
      includes: ['Video lectures', 'Hands-on projects', 'Code reviews', 'Certificate'],
      lastUpdated: '2024-01-15',
      trending: true,
      personalized: true
    },
    {
      id: 2,
      title: 'Python for Data Science: Complete Bootcamp',
      description: 'Learn NumPy, Pandas, Matplotlib, and Scikit-learn for comprehensive data analysis.',
      image: '/course/python.jpg',
      difficulty: 'Intermediate',
      duration: '10 weeks',
      rating: 4.9,
      students: 23450,
      price: 79.99,
      originalPrice: 149.99,
      instructor: 'Prof. Michael Rodriguez',
      category: 'Data Science',
      tags: ['Python', 'Data Analysis', 'Machine Learning', 'Pandas', 'NumPy'],
      prerequisites: ['Basic Python', 'High school math'],
      skills: ['Data Analysis', 'Python Programming', 'Statistical Analysis'],
      completionRate: 82,
      aiInsight: 'Your interest in AI and current skill profile suggests this data science course would be a perfect next step in your learning journey.',
      recommendationReason: 'career_path',
      estimatedCompletion: '8-10 weeks',
      includes: ['Video lectures', 'Real datasets', 'Jupyter notebooks', 'Certificate'],
      lastUpdated: '2024-01-10',
      trending: true,
      personalized: true
    },
    {
      id: 3,
      title: 'UI/UX Design Principles: From Concept to Prototype',
      description: 'Understand the fundamentals of creating intuitive and beautiful user interfaces with modern design tools.',
      image: '/course/uiux.jpg',
      difficulty: 'Beginner',
      duration: '6 weeks',
      rating: 4.7,
      students: 18920,
      price: 69.99,
      originalPrice: 99.99,
      instructor: 'Emma Thompson',
      category: 'Design',
      tags: ['UI/UX', 'Figma', 'Design Thinking', 'User Research', 'Prototyping'],
      prerequisites: ['None'],
      skills: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
      completionRate: 85,
      aiInsight: 'Complement your frontend development skills with design principles to become a more well-rounded developer.',
      recommendationReason: 'skill_complement',
      estimatedCompletion: '4-6 weeks',
      includes: ['Video lectures', 'Design files', 'Portfolio projects', 'Certificate'],
      lastUpdated: '2024-01-20',
      trending: false,
      personalized: true
    },
    {
      id: 4,
      title: 'Introduction to Machine Learning with Python',
      description: 'Explore the basics of ML algorithms like regression, classification, and clustering with hands-on projects.',
      image: '/course/AI.jpg',
      difficulty: 'Intermediate',
      duration: '12 weeks',
      rating: 4.6,
      students: 32150,
      price: 99.99,
      originalPrice: 179.99,
      instructor: 'Dr. Alex Kumar',
      category: 'Machine Learning',
      tags: ['Machine Learning', 'Python', 'Scikit-learn', 'Neural Networks', 'AI'],
      prerequisites: ['Python basics', 'Linear algebra', 'Statistics'],
      skills: ['Machine Learning', 'Algorithm Implementation', 'Model Evaluation'],
      completionRate: 71,
      aiInsight: 'Your strong foundation in programming and interest in AI makes this the perfect course to start your ML journey.',
      recommendationReason: 'ai_interest',
      estimatedCompletion: '10-12 weeks',
      includes: ['Video lectures', 'ML projects', 'Model deployment', 'Certificate'],
      lastUpdated: '2024-01-05',
      trending: true,
      personalized: true
    },
    {
      id: 5,
      title: 'Docker & Kubernetes: Container Orchestration Mastery',
      description: 'Get started with containerization and orchestration for scalable application deployment.',
      image: '/course/docker.jpg',
      difficulty: 'Advanced',
      duration: '8 weeks',
      rating: 4.5,
      students: 12580,
      price: 89.99,
      originalPrice: 139.99,
      instructor: 'David Wilson',
      category: 'DevOps',
      tags: ['Docker', 'Kubernetes', 'DevOps', 'CI/CD', 'Microservices'],
      prerequisites: ['Basic Linux', 'Command line', 'Networking'],
      skills: ['Containerization', 'Orchestration', 'DevOps', 'Microservices'],
      completionRate: 68,
      aiInsight: 'This course addresses your biggest skill gap in DevOps and will significantly enhance your career prospects.',
      recommendationReason: 'skill_gap',
      estimatedCompletion: '6-8 weeks',
      includes: ['Video lectures', 'Hands-on labs', 'Cloud deployment', 'Certificate'],
      lastUpdated: '2024-01-12',
      trending: false,
      personalized: true
    },
    {
      id: 6,
      title: 'React Native: Mobile App Development',
      description: 'Build cross-platform mobile applications using React Native and modern mobile development practices.',
      image: '/course/react.avif',
      difficulty: 'Intermediate',
      duration: '10 weeks',
      rating: 4.8,
      students: 19850,
      price: 84.99,
      originalPrice: 129.99,
      instructor: 'Lisa Park',
      category: 'Mobile Development',
      tags: ['React Native', 'Mobile Development', 'JavaScript', 'iOS', 'Android'],
      prerequisites: ['React basics', 'JavaScript ES6+'],
      skills: ['Mobile Development', 'React Native', 'Cross-platform Development'],
      completionRate: 76,
      aiInsight: 'Leverage your existing React knowledge to expand into mobile development and increase your marketability.',
      recommendationReason: 'skill_expansion',
      estimatedCompletion: '8-10 weeks',
      includes: ['Video lectures', 'Mobile projects', 'App store deployment', 'Certificate'],
      lastUpdated: '2024-01-18',
      trending: true,
      personalized: true
    },
    {
      id: 7,
      title: 'Advanced CSS: Grid, Flexbox, and Modern Layouts',
      description: 'Master modern CSS techniques including Grid, Flexbox, and advanced styling patterns.',
      image: '/course/css.jpg',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      rating: 4.7,
      students: 15680,
      price: 59.99,
      originalPrice: 89.99,
      instructor: 'Chris Johnson',
      category: 'Frontend',
      tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design', 'Modern Layouts'],
      prerequisites: ['Basic CSS', 'HTML'],
      skills: ['Advanced CSS', 'Layout Design', 'Responsive Design'],
      completionRate: 88,
      aiInsight: 'Strengthen your CSS skills to create more sophisticated and responsive user interfaces.',
      recommendationReason: 'skill_enhancement',
      estimatedCompletion: '4-6 weeks',
      includes: ['Video lectures', 'Layout challenges', 'Design systems', 'Certificate'],
      lastUpdated: '2024-01-14',
      trending: false,
      personalized: true
    },
    {
      id: 8,
      title: 'Node.js Backend Development: From Zero to Hero',
      description: 'Build scalable backend applications with Node.js, Express, and modern database technologies.',
      image: '/course/node.jpg',
      difficulty: 'Intermediate',
      duration: '12 weeks',
      rating: 4.6,
      students: 22340,
      price: 94.99,
      originalPrice: 159.99,
      instructor: 'Maria Garcia',
      category: 'Backend Development',
      tags: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication'],
      prerequisites: ['JavaScript basics', 'Basic HTTP knowledge'],
      skills: ['Backend Development', 'API Design', 'Database Management'],
      completionRate: 73,
      aiInsight: 'Complete your full-stack development skills by learning backend development with Node.js.',
      recommendationReason: 'full_stack',
      estimatedCompletion: '10-12 weeks',
      includes: ['Video lectures', 'API projects', 'Database design', 'Certificate'],
      lastUpdated: '2024-01-08',
      trending: true,
      personalized: true
    }
  ];

  const skillGapData = {
    radar: [
      { subject: 'Frontend', A: 80, B: 90, fullMark: 100 },
      { subject: 'Backend', A: 65, B: 85, fullMark: 100 },
      { subject: 'DevOps', A: 40, B: 70, fullMark: 100 },
      { subject: 'Databases', A: 70, B: 80, fullMark: 100 },
      { subject: 'UI/UX', A: 85, B: 90, fullMark: 100 },
      { subject: 'Soft Skills', A: 75, B: 95, fullMark: 100 },
    ],
    suggestions: [
      { skill: 'Backend', recommendation: 'Focus on Node.js and Express. Try our "Advanced Node.js" course.' },
      { skill: 'DevOps', recommendation: 'Your biggest gap. Start with "Docker & Kubernetes" to build foundational knowledge.' },
      { skill: 'Soft Skills', recommendation: 'Practice communication by joining study groups. Our "Leadership 101" course can help.' },
    ]
  };

  const achievements = [
    { 
      id: 1, 
      title: 'React Beginner', 
      icon: '⚛️', 
      unlocked: true, 
      description: 'Complete the "React Basics" course.',
      category: 'Programming',
      progress: 100,
      dateUnlocked: '2024-01-15',
      rarity: 'Common',
      points: 50,
      aiInsight: 'Great foundation! Your React skills are developing well. Consider exploring advanced patterns next.'
    },
    { 
      id: 2, 
      title: 'CSS Pro', 
      icon: '🎨', 
      unlocked: true, 
      description: 'Master 10 advanced CSS concepts.',
      category: 'Design',
      progress: 100,
      dateUnlocked: '2024-01-20',
      rarity: 'Rare',
      points: 100,
      aiInsight: 'Excellent design skills! Your CSS mastery will help you create stunning user interfaces.'
    },
    { 
      id: 3, 
      title: 'Learning Streak', 
      icon: '🔥', 
      unlocked: true, 
      description: 'Study for 7 days in a row.',
      category: 'Motivation',
      progress: 100,
      dateUnlocked: '2024-01-25',
      rarity: 'Epic',
      points: 200,
      aiInsight: 'Consistency is key! Your learning streak shows excellent dedication. Keep this momentum going!'
    },
    { 
      id: 4, 
      title: 'AI Explorer', 
      icon: '🤖', 
      unlocked: false, 
      description: 'Try 3 different AI-powered tools.',
      category: 'AI/ML',
      progress: 66,
      dateUnlocked: null,
      rarity: 'Legendary',
      points: 500,
      aiInsight: 'You\'re 2/3 there! Try our AI code reviewer to unlock this achievement.'
    },
    { 
      id: 5, 
      title: 'Weekend Warrior', 
      icon: '💪', 
      unlocked: true, 
      description: 'Log 5+ hours of study on a weekend.',
      category: 'Motivation',
      progress: 100,
      dateUnlocked: '2024-01-28',
      rarity: 'Rare',
      points: 150,
      aiInsight: 'Impressive dedication! Weekend study sessions show true commitment to learning.'
    },
    { 
      id: 6, 
      title: 'Project Starter', 
      icon: '🚀', 
      unlocked: false, 
      description: 'Begin your first portfolio project.',
      category: 'Projects',
      progress: 0,
      dateUnlocked: null,
      rarity: 'Epic',
      points: 300,
      aiInsight: 'Ready to build something amazing? Start with a simple React app to unlock this achievement.'
    },
    { 
      id: 7, 
      title: 'Feedback Seeker', 
      icon: '📢', 
      unlocked: true, 
      description: 'Get AI feedback on your code.',
      category: 'AI/ML',
      progress: 100,
      dateUnlocked: '2024-01-30',
      rarity: 'Common',
      points: 75,
      aiInsight: 'Great initiative! Seeking feedback is a hallmark of excellent developers.'
    },
    { 
      id: 8, 
      title: 'Pathfinder', 
      icon: '🗺️', 
      unlocked: false, 
      description: 'Generate your first AI Learning Path.',
      category: 'AI/ML',
      progress: 0,
      dateUnlocked: null,
      rarity: 'Legendary',
      points: 400,
      aiInsight: 'Let AI guide your learning journey! Generate a personalized path to unlock this achievement.'
    },
    { 
      id: 9, 
      title: 'JavaScript Master', 
      icon: '📜', 
      unlocked: true, 
      description: 'Complete advanced JavaScript concepts.',
      category: 'Programming',
      progress: 100,
      dateUnlocked: '2024-02-01',
      rarity: 'Epic',
      points: 250,
      aiInsight: 'JavaScript mastery achieved! This opens doors to many advanced frameworks and libraries.'
    },
    { 
      id: 10, 
      title: 'Data Structures Expert', 
      icon: '🏗️', 
      unlocked: false, 
      description: 'Master 5 core data structures.',
      category: 'Programming',
      progress: 40,
      dateUnlocked: null,
      rarity: 'Rare',
      points: 175,
      aiInsight: 'You\'ve mastered 2/5 structures! Focus on trees and graphs next.'
    },
    { 
      id: 11, 
      title: 'UI/UX Designer', 
      icon: '🎯', 
      unlocked: true, 
      description: 'Complete UI/UX design principles course.',
      category: 'Design',
      progress: 100,
      dateUnlocked: '2024-02-05',
      rarity: 'Rare',
      points: 125,
      aiInsight: 'Design thinking skills acquired! This will make you a more well-rounded developer.'
    },
    { 
      id: 12, 
      title: 'Git Guru', 
      icon: '📚', 
      unlocked: true, 
      description: 'Master Git version control.',
      category: 'Tools',
      progress: 100,
      dateUnlocked: '2024-02-08',
      rarity: 'Common',
      points: 80,
      aiInsight: 'Version control mastery! Essential skill for any development team.'
    }
  ];

  // Achievement statistics for charts
  const achievementStats = {
    totalAchievements: achievements.length,
    unlockedCount: achievements.filter(a => a.unlocked).length,
    completionRate: Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100),
    totalPoints: achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0),
    maxPoints: achievements.reduce((sum, a) => sum + a.points, 0),
    categoryBreakdown: [
      { category: 'Programming', count: achievements.filter(a => a.category === 'Programming' && a.unlocked).length, total: achievements.filter(a => a.category === 'Programming').length },
      { category: 'Design', count: achievements.filter(a => a.category === 'Design' && a.unlocked).length, total: achievements.filter(a => a.category === 'Design').length },
      { category: 'AI/ML', count: achievements.filter(a => a.category === 'AI/ML' && a.unlocked).length, total: achievements.filter(a => a.category === 'AI/ML').length },
      { category: 'Motivation', count: achievements.filter(a => a.category === 'Motivation' && a.unlocked).length, total: achievements.filter(a => a.category === 'Motivation').length },
      { category: 'Projects', count: achievements.filter(a => a.category === 'Projects' && a.unlocked).length, total: achievements.filter(a => a.category === 'Projects').length },
      { category: 'Tools', count: achievements.filter(a => a.category === 'Tools' && a.unlocked).length, total: achievements.filter(a => a.category === 'Tools').length }
    ],
    rarityBreakdown: [
      { rarity: 'Common', count: achievements.filter(a => a.rarity === 'Common' && a.unlocked).length, total: achievements.filter(a => a.rarity === 'Common').length },
      { rarity: 'Rare', count: achievements.filter(a => a.rarity === 'Rare' && a.unlocked).length, total: achievements.filter(a => a.rarity === 'Rare').length },
      { rarity: 'Epic', count: achievements.filter(a => a.rarity === 'Epic' && a.unlocked).length, total: achievements.filter(a => a.rarity === 'Epic').length },
      { rarity: 'Legendary', count: achievements.filter(a => a.rarity === 'Legendary' && a.unlocked).length, total: achievements.filter(a => a.rarity === 'Legendary').length }
    ],
    monthlyProgress: [
      { month: 'Jan', unlocked: 5, total: 8 },
      { month: 'Feb', unlocked: 3, total: 4 },
      { month: 'Mar', unlocked: 0, total: 0 },
      { month: 'Apr', unlocked: 0, total: 0 },
      { month: 'May', unlocked: 0, total: 0 },
      { month: 'Jun', unlocked: 0, total: 0 }
    ]
  };

  // AI insights for achievements
  const achievementInsights = [
    {
      type: 'progress',
      title: 'Excellent Progress!',
      message: 'You\'ve unlocked 75% of available achievements. You\'re in the top 15% of learners!',
      icon: '🎉',
      color: 'text-green-600'
    },
    {
      type: 'suggestion',
      title: 'Next Achievement Goal',
      message: 'Focus on "AI Explorer" - you\'re just one step away from unlocking it!',
      icon: '🎯',
      color: 'text-blue-600'
    },
    {
      type: 'motivation',
      title: 'Learning Streak',
      message: 'Your 7-day learning streak is impressive! Keep it up for bonus rewards.',
      icon: '🔥',
      color: 'text-orange-600'
    },
    {
      type: 'skill_gap',
      title: 'Skill Development',
      message: 'Consider exploring data structures to unlock "Data Structures Expert" achievement.',
      icon: '📈',
      color: 'text-purple-600'
    },
    {
      type: 'comparison',
      title: 'Peer Comparison',
      message: 'You\'re ahead of 78% of learners in your skill level. Great job!',
      icon: '🏆',
      color: 'text-yellow-600'
    },
    {
      type: 'prediction',
      title: 'AI Prediction',
      message: 'Based on your current pace, you\'ll unlock 3 more achievements this month.',
      icon: '🔮',
      color: 'text-indigo-600'
    }
  ];

  // Achievement chains and series
  const achievementChains = [
    {
      id: 'react-mastery',
      title: 'React Mastery Series',
      description: 'Complete the full React learning path',
      icon: '⚛️',
      achievements: [
        { id: 1, title: 'React Beginner', unlocked: true, order: 1 },
        { id: 13, title: 'React Intermediate', unlocked: false, order: 2 },
        { id: 14, title: 'React Advanced', unlocked: false, order: 3 },
        { id: 15, title: 'React Expert', unlocked: false, order: 4 }
      ],
      reward: { type: 'badge', name: 'React Master', icon: '👑' },
      progress: 25
    },
    {
      id: 'ai-journey',
      title: 'AI Learning Journey',
      description: 'Master AI and machine learning concepts',
      icon: '🤖',
      achievements: [
        { id: 4, title: 'AI Explorer', unlocked: false, order: 1 },
        { id: 7, title: 'Feedback Seeker', unlocked: true, order: 2 },
        { id: 8, title: 'Pathfinder', unlocked: false, order: 3 },
        { id: 16, title: 'AI Practitioner', unlocked: false, order: 4 }
      ],
      reward: { type: 'certificate', name: 'AI Specialist', icon: '🎓' },
      progress: 25
    },
    {
      id: 'fullstack',
      title: 'Full-Stack Developer',
      description: 'Become a complete full-stack developer',
      icon: '🌐',
      achievements: [
        { id: 1, title: 'React Beginner', unlocked: true, order: 1 },
        { id: 9, title: 'JavaScript Master', unlocked: true, order: 2 },
        { id: 17, title: 'Backend Basics', unlocked: false, order: 3 },
        { id: 18, title: 'Database Master', unlocked: false, order: 4 }
      ],
      reward: { type: 'title', name: 'Full-Stack Developer', icon: '🚀' },
      progress: 50
    }
  ];

  // User progress tracking
  const userProgress = {
    currentStreak: 7,
    longestStreak: 12,
    totalStudyHours: 156,
    weeklyAverage: 8.5,
    monthlyGoal: 40,
    monthlyProgress: 34,
    skillLevel: 'Intermediate',
    rank: 'Gold',
    experience: 2450,
    level: 15,
    nextLevel: 16,
    experienceToNext: 550,
    weeklyGoals: [
      { week: 'Week 1', target: 8, actual: 9, completed: true },
      { week: 'Week 2', target: 8, actual: 7, completed: false },
      { week: 'Week 3', target: 8, actual: 8, completed: true },
      { week: 'Week 4', target: 8, actual: 10, completed: true }
    ],
    dailyActivity: [
      { day: 'Mon', hours: 2.5, achievements: 1 },
      { day: 'Tue', hours: 1.8, achievements: 0 },
      { day: 'Wed', hours: 3.2, achievements: 2 },
      { day: 'Thu', hours: 2.1, achievements: 1 },
      { day: 'Fri', hours: 1.5, achievements: 0 },
      { day: 'Sat', hours: 4.0, achievements: 1 },
      { day: 'Sun', hours: 2.9, achievements: 0 }
    ]
  };

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Alex Chen', achievements: 15, points: 2850, avatar: faker.image.avatar(), level: 18 },
    { rank: 2, name: 'Sarah Johnson', achievements: 14, points: 2720, avatar: faker.image.avatar(), level: 17 },
    { rank: 3, name: 'Mike Rodriguez', achievements: 13, points: 2580, avatar: faker.image.avatar(), level: 16 },
    { rank: 4, name: 'Emma Wilson', achievements: 12, points: 2450, avatar: faker.image.avatar(), level: 15 },
    { rank: 5, name: 'David Kim', achievements: 11, points: 2320, avatar: faker.image.avatar(), level: 14 },
    { rank: 6, name: 'Lisa Park', achievements: 10, points: 2180, avatar: faker.image.avatar(), level: 13 },
    { rank: 7, name: 'Chris Brown', achievements: 9, points: 2050, avatar: faker.image.avatar(), level: 12 },
    { rank: 8, name: 'Maria Garcia', achievements: 8, points: 1920, avatar: faker.image.avatar(), level: 11 },
    { rank: 9, name: 'James Lee', achievements: 7, points: 1780, avatar: faker.image.avatar(), level: 10 },
    { rank: 10, name: 'Anna Smith', achievements: 6, points: 1650, avatar: faker.image.avatar(), level: 9 }
  ];

  // Achievement recommendations
  const achievementRecommendations = [
    {
      id: 'ai-explorer',
      title: 'AI Explorer',
      reason: 'You\'re 2/3 complete! Just try one more AI tool.',
      difficulty: 'Easy',
      estimatedTime: '15 minutes',
      priority: 'High',
      aiInsight: 'This achievement will unlock the AI Learning Journey chain.',
      steps: [
        'Try the AI Code Reviewer',
        'Use the AI Learning Path Generator',
        'Test the AI Quiz Generator'
      ]
    },
    {
      id: 'data-structures',
      title: 'Data Structures Expert',
      reason: 'You\'ve mastered 2/5 structures. Focus on trees and graphs.',
      difficulty: 'Medium',
      estimatedTime: '2 hours',
      priority: 'Medium',
      aiInsight: 'This will significantly boost your programming skills.',
      steps: [
        'Complete the Trees module',
        'Practice Graph algorithms',
        'Take the final assessment'
      ]
    },
    {
      id: 'project-starter',
      title: 'Project Starter',
      reason: 'Ready to build your first portfolio project!',
      difficulty: 'Medium',
      estimatedTime: '4 hours',
      priority: 'High',
      aiInsight: 'This will showcase your skills to potential employers.',
      steps: [
        'Choose a project idea',
        'Set up the development environment',
        'Start coding the basic structure'
      ]
    }
  ];

  // Skill development tracking
  const skillDevelopment = {
    currentSkills: [
      { skill: 'React', level: 75, target: 90, trend: 'up' },
      { skill: 'JavaScript', level: 85, target: 95, trend: 'up' },
      { skill: 'CSS', level: 80, target: 85, trend: 'stable' },
      { skill: 'Git', level: 70, target: 80, trend: 'up' },
      { skill: 'Python', level: 45, target: 75, trend: 'up' },
      { skill: 'Data Structures', level: 40, target: 70, trend: 'up' }
    ],
    skillGaps: [
      { skill: 'Backend Development', priority: 'High', impact: 'Career Growth' },
      { skill: 'DevOps', priority: 'Medium', impact: 'Job Market' },
      { skill: 'Machine Learning', priority: 'Low', impact: 'Future Opportunities' }
    ],
    learningPath: [
      { phase: 'Foundation', skills: ['JavaScript', 'React', 'CSS'], status: 'completed' },
      { phase: 'Advanced', skills: ['Data Structures', 'Python'], status: 'in-progress' },
      { phase: 'Specialization', skills: ['Backend', 'DevOps'], status: 'planned' }
    ]
  };

  // Achievement milestones and rewards
  const milestones = [
    {
      id: 'first-achievement',
      title: 'First Steps',
      description: 'Unlock your first achievement',
      reward: { type: 'badge', name: 'Beginner', icon: '🌱' },
      unlocked: true,
      date: '2024-01-15'
    },
    {
      id: 'achievement-5',
      title: 'Achievement Hunter',
      description: 'Unlock 5 achievements',
      reward: { type: 'title', name: 'Achievement Hunter', icon: '🏆' },
      unlocked: true,
      date: '2024-01-25'
    },
    {
      id: 'achievement-10',
      title: 'Achievement Master',
      description: 'Unlock 10 achievements',
      reward: { type: 'certificate', name: 'Achievement Master', icon: '👑' },
      unlocked: false,
      progress: 8
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      reward: { type: 'badge', name: 'Week Warrior', icon: '🔥' },
      unlocked: true,
      date: '2024-01-25'
    },
    {
      id: 'streak-30',
      title: 'Month Master',
      description: 'Maintain a 30-day learning streak',
      reward: { type: 'title', name: 'Month Master', icon: '📅' },
      unlocked: false,
      progress: 7
    }
  ];

  // Enhanced achievement statistics
  const enhancedAchievementStats = {
    ...achievementStats,
    userRank: 'Gold',
    userLevel: 15,
    experiencePoints: 2450,
    experienceToNext: 550,
    weeklyProgress: 85,
    monthlyProgress: 68,
    skillDistribution: [
      { skill: 'Frontend', percentage: 75 },
      { skill: 'Backend', percentage: 30 },
      { skill: 'AI/ML', percentage: 45 },
      { skill: 'DevOps', percentage: 20 },
      { skill: 'Design', percentage: 60 }
    ],
    achievementTimeline: [
      { date: '2024-01-15', achievement: 'React Beginner', points: 50 },
      { date: '2024-01-20', achievement: 'CSS Pro', points: 100 },
      { date: '2024-01-25', achievement: 'Learning Streak', points: 200 },
      { date: '2024-01-28', achievement: 'Weekend Warrior', points: 150 },
      { date: '2024-01-30', achievement: 'Feedback Seeker', points: 75 },
      { date: '2024-02-01', achievement: 'JavaScript Master', points: 250 },
      { date: '2024-02-05', achievement: 'UI/UX Designer', points: 125 },
      { date: '2024-02-08', achievement: 'Git Guru', points: 80 }
    ],
    comparisonData: {
      globalAverage: 65,
      userPercentile: 85,
      topPerformers: 92,
      similarUsers: 78
    }
  };

  const tutorResponses = [
    "That's a great question! Let's break it down. In React, components are like JavaScript functions. They accept inputs called 'props' and return React elements describing what should appear on the screen.",
    "I can help with that. The main difference between `let`, `const`, and `var` is their scope and whether they can be reassigned. `const` is block-scoped and cannot be reassigned, which is generally the safest choice.",
    "To center a div, you have a few good options in CSS. `display: flex; justify-content: center; align-items: center;` on the parent is a very common and effective method.",
    "Could you show me the code you're working with? It would help me give you more specific advice.",
    "Excellent! You're making great progress. Keep practicing and these concepts will become second nature.",
  ];

  return { user, stats, weeklyTrend, courseProgress, recommendedCourses, skillGapData, achievements, achievementStats, achievementInsights, tutorResponses, achievementChains, userProgress, leaderboard, achievementRecommendations, skillDevelopment, milestones, enhancedAchievementStats };
};
