import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  BrainCircuit, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Trophy,
  Star,
  Target,
  Clock,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Award,
  Zap,
  Sparkles,
  Brain,
  Code,
  Database,
  Palette,
  Smartphone,
  Globe,
  Shield,
  Bookmark,
  Share2,
  Download,
  RefreshCw,
  Play,
  Pause,
  SkipForward,
  BarChart3,
  PieChart,
  Activity,
  Crown,
  Medal,
  Gift,
  Eye,
  Heart,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Settings,
  Timer,
  AlertCircle,
  Info,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  timeLimit?: number;
  points: number;
  aiInsight?: string;
  relatedTopics?: string[];
  resources?: Array<{
    title: string;
    url: string;
    type: 'video' | 'article' | 'documentation' | 'practice';
  }>;
}

interface QuizCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  topics: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface QuizSession {
  id: string;
  category: string;
  topic: string;
  questions: Quiz[];
  answers: number[];
  score: number;
  timeSpent: number;
  completedAt: Date;
  accuracy: number;
  speed: number;
}

const SmartQuiz = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [topic, setTopic] = useState('');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [quizHistory, setQuizHistory] = useState<QuizSession[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [relatedContent, setRelatedContent] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('categories');

  // Quiz categories with icons and topics
  const quizCategories: QuizCategory[] = [
    {
      id: 'programming',
      name: 'Programming',
      icon: <Code className="w-6 h-6" />,
      description: 'Master programming languages and concepts',
      color: 'from-[#08272a] to-[#08272a]',
      topics: ['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'Go'],
      difficulty: 'Intermediate'
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      icon: <Palette className="w-6 h-6" />,
      description: 'Learn modern frontend technologies',
      color: 'from-[#08272a] to-[#08272a]',
      topics: ['React', 'Vue.js', 'Angular', 'CSS', 'HTML', 'Sass', 'Webpack', 'TypeScript'],
      difficulty: 'Intermediate'
    },
    {
      id: 'backend',
      name: 'Backend Development',
      icon: <Database className="w-6 h-6" />,
      description: 'Server-side development and APIs',
      color: 'from-[#08272a] to-[#08272a]',
      topics: ['Node.js', 'Express', 'Python', 'Django', 'Java', 'Spring', 'PHP', 'Laravel'],
      difficulty: 'Advanced'
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      icon: <Brain className="w-6 h-6" />,
      description: 'Artificial Intelligence and ML concepts',
      color: 'from-[#08272a] to-[#08272a]',
      topics: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Neural Networks', 'Deep Learning'],
      difficulty: 'Advanced'
    },
    {
      id: 'mobile',
      name: 'Mobile Development',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Mobile app development platforms',
      color: 'from-[#08272a] to-[#08272a]',
      topics: ['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin'],
      difficulty: 'Intermediate'
    },
    {
      id: 'web',
      name: 'Web Development',
      icon: <Globe className="w-6 h-6" />,
      description: 'Full-stack web development',
      color: 'from-[#08272a] to-[#08272a]',
      topics: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'MongoDB', 'AWS'],
      difficulty: 'Beginner'
    },
    {
      id: 'security',
      name: 'Cybersecurity',
      icon: <Shield className="w-6 h-6" />,
      description: 'Security and ethical hacking',
      color: 'from-[#08272a] to-[#08272a]',
      topics: ['Network Security', 'Web Security', 'Cryptography', 'Penetration Testing'],
      difficulty: 'Advanced'
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: <Settings className="w-6 h-6" />,
      description: 'Development operations and deployment',
      color: 'from-[#08272a] to-[#08272a]',
      topics: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure', 'Linux'],
      difficulty: 'Advanced'
    }
  ];

  // Mock quiz data for different categories
  const mockQuizzes: Record<string, Quiz[]> = {
    programming: [
      {
        id: 'prog-1',
        question: 'What is the difference between let, const, and var in JavaScript?',
          options: [
          'They are all the same',
          'let and const are block-scoped, var is function-scoped',
          'const is immutable, let and var are mutable',
          'var is the newest, let and const are deprecated'
          ],
          correct: 1,
        explanation: 'let and const are block-scoped (ES6), while var is function-scoped. const creates immutable bindings, while let and var allow reassignment.',
        difficulty: 'Medium',
        category: 'Programming',
        tags: ['JavaScript', 'ES6', 'Variables'],
        points: 10,
        aiInsight: 'This is a fundamental concept that appears in 85% of JavaScript interviews.',
        relatedTopics: ['Hoisting', 'Temporal Dead Zone', 'Scope'],
        resources: [
          { title: 'JavaScript Variables Guide', url: '#', type: 'article' },
          { title: 'ES6 Tutorial', url: '#', type: 'video' }
        ]
      },
      {
        id: 'prog-2',
        question: 'What is a closure in JavaScript?',
          options: [
          'A function that has access to variables in its outer scope',
          'A way to close browser tabs',
          'A method to end loops',
          'A type of variable declaration'
        ],
        correct: 0,
        explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.',
        difficulty: 'Hard',
        category: 'Programming',
        tags: ['JavaScript', 'Closures', 'Scope'],
        points: 15,
        aiInsight: 'Closures are crucial for understanding advanced JavaScript patterns.',
        relatedTopics: ['Lexical Scope', 'Function Scope', 'Module Pattern']
      },
      {
        id: 'prog-3',
        question: 'What is the output of console.log(typeof null)?',
        options: [
          'null',
          'undefined',
          'object',
          'number'
          ],
          correct: 2,
        explanation: 'typeof null returns "object" - this is a known JavaScript quirk. null is actually a primitive value, not an object.',
        difficulty: 'Easy',
        category: 'Programming',
        tags: ['JavaScript', 'Type Checking', 'Primitives'],
        points: 8,
        aiInsight: 'This is a common JavaScript gotcha that many developers miss.',
        relatedTopics: ['Type Coercion', 'Primitive Types', 'JavaScript Quirks']
      },
      {
        id: 'prog-4',
        question: 'What is hoisting in JavaScript?',
          options: [
          'Moving elements up in the DOM',
          'Moving variable and function declarations to the top of their scope',
          'A way to lift heavy objects',
          'A CSS property'
        ],
        correct: 1,
        explanation: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top of their scope during compilation.',
        difficulty: 'Medium',
        category: 'Programming',
        tags: ['JavaScript', 'Hoisting', 'Scope'],
        points: 12,
        aiInsight: 'Understanding hoisting helps debug many JavaScript issues.',
        relatedTopics: ['Execution Context', 'Variable Declaration', 'Function Declaration']
      },
      {
        id: 'prog-5',
        question: 'What is the difference between == and === in JavaScript?',
        options: [
          'There is no difference',
          '== checks value and type, === checks only value',
          '=== checks value and type, == checks only value',
          '== is faster than ==='
        ],
        correct: 2,
        explanation: '=== (strict equality) checks both value and type, while == (loose equality) performs type coercion before comparison.',
        difficulty: 'Easy',
        category: 'Programming',
        tags: ['JavaScript', 'Comparison', 'Type Coercion'],
        points: 8,
        aiInsight: 'Always use === unless you specifically need type coercion.',
        relatedTopics: ['Type Coercion', 'Equality', 'Best Practices']
      }
    ],
    frontend: [
      {
        id: 'frontend-1',
        question: 'What is the Virtual DOM in React?',
        options: [
          'A real DOM element',
          'A lightweight copy of the actual DOM',
          'A browser extension',
          'A type of component'
        ],
        correct: 1,
        explanation: 'The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering performance.',
        difficulty: 'Medium',
        category: 'Frontend',
        tags: ['React', 'Virtual DOM', 'Performance'],
        points: 12,
        aiInsight: 'Understanding Virtual DOM is essential for React optimization.',
        relatedTopics: ['Reconciliation', 'Diffing Algorithm', 'React Fiber']
      },
      {
        id: 'frontend-2',
        question: 'What is the purpose of useEffect in React?',
        options: [
          'To create side effects in functional components',
          'To style components',
          'To handle form submissions',
          'To create animations'
        ],
        correct: 0,
        explanation: 'useEffect is a React Hook that lets you perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.',
        difficulty: 'Medium',
        category: 'Frontend',
        tags: ['React', 'Hooks', 'useEffect'],
        points: 12,
        aiInsight: 'useEffect is one of the most commonly used React Hooks.',
        relatedTopics: ['React Hooks', 'Side Effects', 'Component Lifecycle']
      },
      {
        id: 'frontend-3',
        question: 'What is CSS Grid?',
        options: [
          'A way to create tables',
          'A two-dimensional layout system for CSS',
          'A JavaScript framework',
          'A database system'
        ],
        correct: 1,
        explanation: 'CSS Grid is a two-dimensional layout system that allows you to create complex web layouts with rows and columns.',
        difficulty: 'Medium',
        category: 'Frontend',
        tags: ['CSS', 'Grid', 'Layout'],
        points: 10,
        aiInsight: 'CSS Grid is essential for modern responsive layouts.',
        relatedTopics: ['Flexbox', 'Responsive Design', 'CSS Layout']
      },
      {
        id: 'frontend-4',
        question: 'What is the difference between state and props in React?',
        options: [
          'There is no difference',
          'State is internal, props are external',
          'Props are internal, state is external',
          'State is for styling, props are for data'
        ],
        correct: 1,
        explanation: 'State is internal to a component and can be changed, while props are external data passed to a component and are read-only.',
        difficulty: 'Medium',
        category: 'Frontend',
        tags: ['React', 'State', 'Props'],
        points: 12,
        aiInsight: 'Understanding state vs props is fundamental to React development.',
        relatedTopics: ['Component Communication', 'Data Flow', 'React Patterns']
      },
      {
        id: 'frontend-5',
        question: 'What is TypeScript?',
        options: [
          'A new programming language',
          'A superset of JavaScript with static typing',
          'A CSS framework',
          'A database system'
        ],
        correct: 1,
        explanation: 'TypeScript is a superset of JavaScript that adds static typing, making it easier to catch errors during development.',
        difficulty: 'Medium',
        category: 'Frontend',
        tags: ['TypeScript', 'JavaScript', 'Static Typing'],
        points: 10,
        aiInsight: 'TypeScript is becoming standard in modern web development.',
        relatedTopics: ['Static Typing', 'JavaScript', 'Development Tools']
      }
    ],
    backend: [
      {
        id: 'backend-1',
        question: 'What is middleware in Express.js?',
        options: [
          'A database',
          'Functions that have access to request, response, and next function',
          'A frontend framework',
          'A testing tool'
        ],
        correct: 1,
        explanation: 'Middleware functions are functions that have access to the request object, response object, and the next middleware function in the application\'s request-response cycle.',
        difficulty: 'Medium',
        category: 'Backend',
        tags: ['Node.js', 'Express', 'Middleware'],
        points: 12,
        aiInsight: 'Middleware is essential for building scalable Express applications.',
        relatedTopics: ['Request Processing', 'Authentication', 'Error Handling']
      },
      {
        id: 'backend-2',
        question: 'What is the difference between SQL and NoSQL databases?',
        options: [
          'SQL is newer than NoSQL',
          'SQL is relational, NoSQL is non-relational',
          'NoSQL is always faster than SQL',
          'They are the same thing'
        ],
        correct: 1,
        explanation: 'SQL databases are relational and use structured query language, while NoSQL databases are non-relational and can store data in various formats.',
        difficulty: 'Medium',
        category: 'Backend',
        tags: ['Database', 'SQL', 'NoSQL'],
        points: 12,
        aiInsight: 'Choose between SQL and NoSQL based on your data structure needs.',
        relatedTopics: ['Database Design', 'Data Modeling', 'Scalability']
      },
      {
        id: 'backend-3',
        question: 'What is REST API?',
        options: [
          'A programming language',
          'An architectural style for designing networked applications',
          'A database system',
          'A frontend framework'
        ],
        correct: 1,
        explanation: 'REST (Representational State Transfer) is an architectural style for designing networked applications, typically using HTTP.',
        difficulty: 'Medium',
        category: 'Backend',
        tags: ['API', 'REST', 'HTTP'],
        points: 10,
        aiInsight: 'REST APIs are the standard for web services.',
        relatedTopics: ['HTTP Methods', 'API Design', 'Web Services']
      },
      {
        id: 'backend-4',
        question: 'What is JWT (JSON Web Token)?',
        options: [
          'A database',
          'A compact, URL-safe means of representing claims between parties',
          'A programming language',
          'A CSS framework'
        ],
        correct: 1,
        explanation: 'JWT is a compact, URL-safe means of representing claims to be transferred between two parties, commonly used for authentication.',
        difficulty: 'Hard',
        category: 'Backend',
        tags: ['Authentication', 'JWT', 'Security'],
        points: 15,
        aiInsight: 'JWTs are widely used for stateless authentication.',
        relatedTopics: ['Authentication', 'Authorization', 'Security']
      },
      {
        id: 'backend-5',
        question: 'What is the purpose of environment variables?',
        options: [
          'To style applications',
          'To store configuration data outside of code',
          'To create animations',
          'To handle user input'
        ],
        correct: 1,
        explanation: 'Environment variables are used to store configuration data outside of the application code, such as API keys, database URLs, and other sensitive information.',
        difficulty: 'Easy',
        category: 'Backend',
        tags: ['Configuration', 'Security', 'Environment'],
        points: 8,
        aiInsight: 'Environment variables are crucial for security and deployment.',
        relatedTopics: ['Security', 'Configuration Management', 'Deployment']
      }
    ],
    'ai-ml': [
      {
        id: 'ai-1',
        question: 'What is overfitting in machine learning?',
        options: [
          'When a model performs too well on training data',
          'When a model is too simple',
          'When data is missing',
          'When features are correlated'
        ],
        correct: 0,
        explanation: 'Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize to new data.',
        difficulty: 'Hard',
        category: 'AI/ML',
        tags: ['Machine Learning', 'Overfitting', 'Generalization'],
        points: 15,
        aiInsight: 'Overfitting is one of the most common issues in ML projects.',
        relatedTopics: ['Underfitting', 'Cross-validation', 'Regularization']
      },
      {
        id: 'ai-2',
        question: 'What is the difference between supervised and unsupervised learning?',
        options: [
          'Supervised uses labeled data, unsupervised uses unlabeled data',
          'Supervised is faster than unsupervised',
          'Unsupervised is always better',
          'They are the same thing'
        ],
        correct: 0,
        explanation: 'Supervised learning uses labeled training data to learn patterns, while unsupervised learning finds patterns in unlabeled data.',
        difficulty: 'Medium',
        category: 'AI/ML',
        tags: ['Machine Learning', 'Supervised Learning', 'Unsupervised Learning'],
        points: 12,
        aiInsight: 'Understanding this distinction is fundamental to ML.',
        relatedTopics: ['Classification', 'Clustering', 'Data Labeling']
      },
      {
        id: 'ai-3',
        question: 'What is a neural network?',
        options: [
          'A computer network',
          'A computational model inspired by biological neural networks',
          'A database system',
          'A programming language'
        ],
        correct: 1,
        explanation: 'A neural network is a computational model inspired by biological neural networks, consisting of interconnected nodes (neurons) that process information.',
        difficulty: 'Hard',
        category: 'AI/ML',
        tags: ['Neural Networks', 'Deep Learning', 'AI'],
        points: 15,
        aiInsight: 'Neural networks are the foundation of modern deep learning.',
        relatedTopics: ['Deep Learning', 'Backpropagation', 'Activation Functions']
      },
      {
        id: 'ai-4',
        question: 'What is the purpose of cross-validation?',
        options: [
          'To make models faster',
          'To assess how well a model will generalize to new data',
          'To reduce model size',
          'To increase accuracy'
        ],
        correct: 1,
        explanation: 'Cross-validation is a technique to assess how well a model will generalize to new, unseen data by testing it on different subsets of the training data.',
        difficulty: 'Medium',
        category: 'AI/ML',
        tags: ['Machine Learning', 'Cross-validation', 'Model Evaluation'],
        points: 12,
        aiInsight: 'Cross-validation is essential for reliable model evaluation.',
        relatedTopics: ['Model Evaluation', 'Hyperparameter Tuning', 'Bias-Variance Tradeoff']
      },
      {
        id: 'ai-5',
        question: 'What is the difference between classification and regression?',
        options: [
          'Classification predicts categories, regression predicts continuous values',
          'Classification is faster than regression',
          'Regression is always more accurate',
          'They are the same thing'
        ],
        correct: 0,
        explanation: 'Classification predicts discrete categories or classes, while regression predicts continuous numerical values.',
        difficulty: 'Medium',
        category: 'AI/ML',
        tags: ['Machine Learning', 'Classification', 'Regression'],
        points: 10,
        aiInsight: 'This is a fundamental distinction in supervised learning.',
        relatedTopics: ['Supervised Learning', 'Model Types', 'Problem Types']
      }
    ],
    mobile: [
      {
        id: 'mobile-1',
        question: 'What is React Native?',
        options: [
          'A web framework',
          'A framework for building native mobile apps using React',
          'A database system',
          'A programming language'
        ],
        correct: 1,
        explanation: 'React Native is a framework that allows you to build native mobile applications using React and JavaScript.',
        difficulty: 'Medium',
        category: 'Mobile',
        tags: ['React Native', 'Mobile Development', 'JavaScript'],
        points: 12,
        aiInsight: 'React Native is popular for cross-platform mobile development.',
        relatedTopics: ['Cross-platform Development', 'Mobile Apps', 'React']
      },
      {
        id: 'mobile-2',
        question: 'What is the difference between iOS and Android development?',
        options: [
          'iOS uses Swift/Objective-C, Android uses Java/Kotlin',
          'iOS is easier than Android',
          'Android is always better',
          'They use the same languages'
        ],
        correct: 0,
        explanation: 'iOS development typically uses Swift or Objective-C, while Android development uses Java or Kotlin.',
        difficulty: 'Easy',
        category: 'Mobile',
        tags: ['iOS', 'Android', 'Mobile Development'],
        points: 8,
        aiInsight: 'Understanding platform differences is crucial for mobile development.',
        relatedTopics: ['Platform-specific Development', 'Native Apps', 'Mobile SDKs']
      },
      {
        id: 'mobile-3',
        question: 'What is Flutter?',
        options: [
          'A database system',
          'A UI framework for building cross-platform apps',
          'A programming language',
          'A web framework'
        ],
        correct: 1,
        explanation: 'Flutter is Google\'s UI framework for building natively compiled applications for mobile, web, and desktop from a single codebase.',
        difficulty: 'Medium',
        category: 'Mobile',
        tags: ['Flutter', 'Dart', 'Cross-platform'],
        points: 12,
        aiInsight: 'Flutter is gaining popularity for cross-platform development.',
        relatedTopics: ['Dart Programming', 'Cross-platform Development', 'Mobile UI']
      },
      {
        id: 'mobile-4',
        question: 'What is the purpose of mobile app testing?',
        options: [
          'To make apps slower',
          'To ensure app quality and functionality across devices',
          'To increase app size',
          'To reduce features'
        ],
        correct: 1,
        explanation: 'Mobile app testing ensures that the app works correctly across different devices, operating systems, and user scenarios.',
        difficulty: 'Easy',
        category: 'Mobile',
        tags: ['Testing', 'Quality Assurance', 'Mobile Apps'],
        points: 8,
        aiInsight: 'Testing is crucial for mobile app success.',
        relatedTopics: ['Quality Assurance', 'Device Testing', 'User Experience']
      },
      {
        id: 'mobile-5',
        question: 'What is the App Store and Google Play?',
        options: [
          'Programming languages',
          'Mobile app distribution platforms',
          'Database systems',
          'Web frameworks'
        ],
        correct: 1,
        explanation: 'The App Store (iOS) and Google Play (Android) are the official app distribution platforms for their respective mobile operating systems.',
        difficulty: 'Easy',
        category: 'Mobile',
        tags: ['App Store', 'Google Play', 'App Distribution'],
        points: 8,
        aiInsight: 'Understanding app store requirements is essential for mobile developers.',
        relatedTopics: ['App Distribution', 'App Store Guidelines', 'Mobile Marketing']
      }
    ],
    web: [
      {
        id: 'web-1',
        question: 'What is HTML?',
        options: [
          'A programming language',
          'A markup language for creating web pages',
          'A styling language',
          'A database system'
        ],
        correct: 1,
        explanation: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications.',
        difficulty: 'Easy',
        category: 'Web',
        tags: ['HTML', 'Web Development', 'Markup'],
        points: 8,
        aiInsight: 'HTML is the foundation of web development.',
        relatedTopics: ['Web Pages', 'Semantic HTML', 'Web Standards']
      },
      {
        id: 'web-2',
        question: 'What is the purpose of CSS?',
        options: [
          'To create web pages',
          'To style and layout web pages',
          'To handle user interactions',
          'To store data'
        ],
        correct: 1,
        explanation: 'CSS (Cascading Style Sheets) is used to style and layout web pages, controlling the appearance and presentation of HTML elements.',
        difficulty: 'Easy',
        category: 'Web',
        tags: ['CSS', 'Styling', 'Web Design'],
        points: 8,
        aiInsight: 'CSS is essential for creating attractive web pages.',
        relatedTopics: ['Web Design', 'Responsive Design', 'CSS Frameworks']
      },
      {
        id: 'web-3',
        question: 'What is responsive web design?',
        options: [
          'A programming language',
          'Designing websites to work well on all devices',
          'A database system',
          'A web framework'
        ],
        correct: 1,
        explanation: 'Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes.',
        difficulty: 'Medium',
        category: 'Web',
        tags: ['Responsive Design', 'CSS', 'Web Design'],
        points: 10,
        aiInsight: 'Responsive design is essential for modern web development.',
        relatedTopics: ['Mobile-first Design', 'CSS Media Queries', 'User Experience']
      },
      {
        id: 'web-4',
        question: 'What is the difference between HTTP and HTTPS?',
        options: [
          'HTTPS is faster than HTTP',
          'HTTPS is secure, HTTP is not',
          'HTTP is newer than HTTPS',
          'They are the same thing'
        ],
        correct: 1,
        explanation: 'HTTPS (HTTP Secure) is a secure version of HTTP that uses encryption to protect data transmitted between the client and server.',
        difficulty: 'Medium',
        category: 'Web',
        tags: ['HTTP', 'HTTPS', 'Security'],
        points: 10,
        aiInsight: 'HTTPS is now standard for web security.',
        relatedTopics: ['Web Security', 'SSL/TLS', 'Data Encryption']
      },
      {
        id: 'web-5',
        question: 'What is a web server?',
        options: [
          'A computer that serves web pages',
          'A programming language',
          'A database system',
          'A web browser'
        ],
        correct: 0,
        explanation: 'A web server is a computer system that processes requests via HTTP and serves web pages to clients.',
        difficulty: 'Easy',
        category: 'Web',
        tags: ['Web Server', 'HTTP', 'Server-side'],
        points: 8,
        aiInsight: 'Understanding web servers is fundamental to web development.',
        relatedTopics: ['Server-side Development', 'HTTP Protocol', 'Web Architecture']
      }
    ],
    security: [
      {
        id: 'security-1',
        question: 'What is SQL injection?',
        options: [
          'A database feature',
          'A security vulnerability where malicious SQL code is inserted',
          'A programming language',
          'A web framework'
        ],
        correct: 1,
        explanation: 'SQL injection is a code injection technique that exploits vulnerabilities in an application\'s software by inserting malicious SQL statements.',
        difficulty: 'Hard',
        category: 'Security',
        tags: ['SQL Injection', 'Security', 'Database'],
        points: 15,
        aiInsight: 'SQL injection is one of the most common web vulnerabilities.',
        relatedTopics: ['Input Validation', 'Prepared Statements', 'Web Security']
      },
      {
        id: 'security-2',
        question: 'What is XSS (Cross-Site Scripting)?',
        options: [
          'A CSS framework',
          'A security vulnerability where malicious scripts are injected',
          'A programming language',
          'A database system'
        ],
        correct: 1,
        explanation: 'XSS is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.',
        difficulty: 'Hard',
        category: 'Security',
        tags: ['XSS', 'Security', 'Web Security'],
        points: 15,
        aiInsight: 'XSS attacks are common and can be very dangerous.',
        relatedTopics: ['Input Sanitization', 'Content Security Policy', 'Web Security']
      },
      {
        id: 'security-3',
        question: 'What is encryption?',
        options: [
          'A programming language',
          'The process of encoding information to prevent unauthorized access',
          'A database system',
          'A web framework'
        ],
        correct: 1,
        explanation: 'Encryption is the process of encoding information in such a way that only authorized parties can access it.',
        difficulty: 'Medium',
        category: 'Security',
        tags: ['Encryption', 'Security', 'Data Protection'],
        points: 12,
        aiInsight: 'Encryption is fundamental to data security.',
        relatedTopics: ['Cryptography', 'Data Protection', 'Security Protocols']
      },
      {
        id: 'security-4',
        question: 'What is a firewall?',
        options: [
          'A physical wall',
          'A security system that monitors and controls network traffic',
          'A programming language',
          'A database system'
        ],
        correct: 1,
        explanation: 'A firewall is a security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.',
        difficulty: 'Medium',
        category: 'Security',
        tags: ['Firewall', 'Network Security', 'Security'],
        points: 10,
        aiInsight: 'Firewalls are essential for network security.',
        relatedTopics: ['Network Security', 'Access Control', 'Security Policies']
      },
      {
        id: 'security-5',
        question: 'What is two-factor authentication (2FA)?',
        options: [
          'A type of password',
          'A security process requiring two different forms of identification',
          'A programming language',
          'A database system'
        ],
        correct: 1,
        explanation: 'Two-factor authentication is a security process that requires users to provide two different forms of identification to access an account.',
        difficulty: 'Easy',
        category: 'Security',
        tags: ['2FA', 'Authentication', 'Security'],
        points: 8,
        aiInsight: '2FA significantly improves account security.',
        relatedTopics: ['Authentication', 'Account Security', 'Multi-factor Authentication']
      }
    ],
    devops: [
      {
        id: 'devops-1',
        question: 'What is Docker?',
        options: [
          'A programming language',
          'A platform for developing, shipping, and running applications in containers',
          'A database system',
          'A web framework'
        ],
        correct: 1,
        explanation: 'Docker is a platform that enables developers to package applications into containers for consistent deployment across different environments.',
        difficulty: 'Medium',
        category: 'DevOps',
        tags: ['Docker', 'Containers', 'DevOps'],
        points: 12,
        aiInsight: 'Docker is essential for modern application deployment.',
        relatedTopics: ['Containerization', 'Microservices', 'Application Deployment']
      },
      {
        id: 'devops-2',
        question: 'What is Kubernetes?',
        options: [
          'A programming language',
          'An open-source container orchestration platform',
          'A database system',
          'A web framework'
        ],
        correct: 1,
        explanation: 'Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.',
        difficulty: 'Hard',
        category: 'DevOps',
        tags: ['Kubernetes', 'Container Orchestration', 'DevOps'],
        points: 15,
        aiInsight: 'Kubernetes is the standard for container orchestration.',
        relatedTopics: ['Container Orchestration', 'Microservices', 'Scalability']
      },
      {
        id: 'devops-3',
        question: 'What is CI/CD?',
        options: [
          'A programming language',
          'Continuous Integration and Continuous Deployment',
          'A database system',
          'A web framework'
        ],
        correct: 1,
        explanation: 'CI/CD stands for Continuous Integration and Continuous Deployment, which are practices that automate the software delivery process.',
        difficulty: 'Medium',
        category: 'DevOps',
        tags: ['CI/CD', 'DevOps', 'Automation'],
        points: 12,
        aiInsight: 'CI/CD is essential for modern software development.',
        relatedTopics: ['Automation', 'Software Delivery', 'DevOps Practices']
      },
      {
        id: 'devops-4',
        question: 'What is AWS?',
        options: [
          'A programming language',
          'Amazon Web Services - a cloud computing platform',
          'A database system',
          'A web framework'
        ],
        correct: 1,
        explanation: 'AWS (Amazon Web Services) is a comprehensive cloud computing platform that provides a wide range of services for building and deploying applications.',
        difficulty: 'Medium',
        category: 'DevOps',
        tags: ['AWS', 'Cloud Computing', 'DevOps'],
        points: 10,
        aiInsight: 'AWS is the leading cloud platform for many organizations.',
        relatedTopics: ['Cloud Computing', 'Infrastructure as Code', 'Cloud Services']
      },
      {
        id: 'devops-5',
        question: 'What is Infrastructure as Code (IaC)?',
        options: [
          'A programming language',
          'Managing infrastructure through code instead of manual processes',
          'A database system',
          'A web framework'
        ],
        correct: 1,
        explanation: 'Infrastructure as Code is the practice of managing and provisioning computing infrastructure through machine-readable definition files rather than physical hardware configuration.',
        difficulty: 'Medium',
        category: 'DevOps',
        tags: ['IaC', 'DevOps', 'Automation'],
        points: 12,
        aiInsight: 'IaC is crucial for scalable infrastructure management.',
        relatedTopics: ['Terraform', 'CloudFormation', 'Infrastructure Management']
      }
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev && prev <= 1) {
            setIsTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const generateQuiz = (category: string, topic: string) => {
    setIsGenerating(true);
    setSelectedCategory(category);
    setTopic(topic);
    
    // Simulate AI generation
    setTimeout(() => {
      const categoryQuizzes = mockQuizzes[category] || [];
      const generatedQuizzes = categoryQuizzes.map(quiz => ({
        ...quiz,
        timeLimit: Math.random() > 0.5 ? 60 : undefined
      }));
      
      setQuizzes(generatedQuizzes);
      setCurrentQuiz(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsGenerating(false);
      
      // Set timer if question has time limit
      if (generatedQuizzes[0]?.timeLimit) {
        setTimeLeft(generatedQuizzes[0].timeLimit);
        setIsTimerActive(true);
      }
    }, 2000);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setIsTimerActive(false);
    
    if (answerIndex === quizzes[currentQuiz].correct) {
      setScore(score + quizzes[currentQuiz].points);
    }
    
    // Generate related content for wrong answers
    if (answerIndex !== quizzes[currentQuiz].correct) {
      generateRelatedContent(quizzes[currentQuiz]);
    }
  };

  const handleTimeUp = () => {
    setShowResult(true);
    setIsTimerActive(false);
    // Auto-select wrong answer if no answer was selected
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // Indicates time up
    }
  };

  const generateRelatedContent = (quiz: Quiz) => {
    // Mock related content generation
    const related = [
      {
        title: `${quiz.tags[0]} Fundamentals`,
        type: 'course',
        difficulty: 'Beginner',
        duration: '2 hours',
        rating: 4.8
      },
      {
        title: `Advanced ${quiz.category} Concepts`,
        type: 'article',
        readTime: '5 min',
        difficulty: 'Intermediate'
      },
      {
        title: `${quiz.tags[0]} Practice Exercises`,
        type: 'practice',
        questions: 20,
        difficulty: 'Mixed'
      }
    ];
    setRelatedContent(related);
  };

  const nextQuestion = () => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
      setRelatedContent([]);
      
      // Set timer for next question
      if (quizzes[currentQuiz + 1]?.timeLimit) {
        setTimeLeft(quizzes[currentQuiz + 1].timeLimit);
        setIsTimerActive(true);
      }
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const session: QuizSession = {
      id: Date.now().toString(),
      category: selectedCategory,
      topic: topic,
      questions: quizzes,
      answers: [], // Would track actual answers
      score: score,
      timeSpent: 0, // Would calculate actual time
      completedAt: new Date(),
      accuracy: (score / quizzes.reduce((sum, q) => sum + q.points, 0)) * 100,
      speed: 0 // Would calculate questions per minute
    };
    
    setQuizHistory(prev => [session, ...prev]);
    setShowPopup(true);
  };

  const resetQuiz = () => {
    setQuizzes([]);
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTopic('');
    setTimeLeft(null);
    setIsTimerActive(false);
    setShowExplanation(false);
    setRelatedContent([]);
    setSelectedCategory('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
      case 'Beginner':
        return 'bg-[#e3ffcd] text-[#08272a] border-[#e3ffcd]';
      case 'Medium':
      case 'Intermediate':
        return 'bg-[#edf5ee] text-[#08272a] border-[#edf5ee]';
      case 'Hard':
      case 'Advanced':
        return 'bg-[#08272a] text-white border-[#08272a]';
      default:
        return 'bg-[#edf5ee] text-[#08272a] border-[#edf5ee]';
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = quizCategories.find(cat => cat.id === categoryId);
  return (
      <div className="w-10 h-10 rounded-full bg-[#08272a] flex items-center justify-center text-white">
        {category?.icon || <Code className="w-5 h-5" />}
      </div>
    );
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
              AI Smart Quiz
            </h1>
            <div className="p-3 bg-[#e3ffcd] rounded-2xl shadow-lg">
              <Sparkles className="h-8 w-8 text-[#08272a]" />
            </div>
          </div>
          <p className="text-[#08272a] text-lg max-w-2xl mx-auto">
            Master any topic with AI-powered adaptive quizzes
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
            <Badge className="bg-[#edf5ee] text-[#08272a] border border-[#edf5ee] px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Adaptive Learning
            </Badge>
          </div>
      </motion.div>

        {/* Quiz Categories */}
        {quizzes.length === 0 && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#edf5ee] p-1 rounded-lg">
              <TabsTrigger value="categories" className="data-[state=active]:bg-white data-[state=active]:text-[#08272a] text-[#08272a]">
                Categories
              </TabsTrigger>
              <TabsTrigger value="topics" className="data-[state=active]:bg-white data-[state=active]:text-[#08272a] text-[#08272a]">
                Popular Topics
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:text-[#08272a] text-[#08272a]">
                Quiz History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quizCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                  >
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 group bg-white border border-[#edf5ee]"
                      onClick={() => setActiveTab('topics')}
                    >
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-[#08272a] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          {category.icon}
                        </div>
                        <CardTitle className="text-lg text-[#08272a]">{category.name}</CardTitle>
                        <p className="text-sm text-[#08272a]">{category.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Badge className={getDifficultyColor(category.difficulty)}>
                            {category.difficulty}
                          </Badge>
                          <div className="text-xs text-[#08272a]/70">
                            {category.topics.length} topics available
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="topics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizCategories.map(category => 
                  category.topics.map((topic, index) => (
                    <motion.div
                      key={`${category.id}-${topic}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.05 } }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-lg transition-all duration-300 group bg-white border border-[#edf5ee]"
                        onClick={() => generateQuiz(category.id, topic)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full bg-[#08272a] flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg`}>
                              {category.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-[#08272a]">{topic}</h3>
                              <p className="text-sm text-[#08272a]/70">{category.name}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#08272a] group-hover:text-[#08272a] transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card className="bg-white border border-[#edf5ee] shadow-lg">
            <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#08272a]">
                    <BarChart3 className="text-[#08272a]" />
                    Quiz History
              </CardTitle>
            </CardHeader>
                <CardContent>
                  {quizHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-16 h-16 text-[#edf5ee] mx-auto mb-4" />
                      <p className="text-[#08272a]/70">No quiz history yet. Start your first quiz!</p>
              </div>
                  ) : (
                    <div className="space-y-4">
                      {quizHistory.slice(0, 5).map((session, index) => (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                          className="flex items-center justify-between p-4 bg-[#edf5ee] rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            {getCategoryIcon(session.category)}
                            <div>
                              <div className="font-medium text-[#08272a]">{session.topic}</div>
                              <div className="text-sm text-[#08272a]/70">{session.category}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-[#08272a]">{session.accuracy.toFixed(1)}%</div>
                            <div className="text-sm text-[#08272a]/70">{session.score} points</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
            </CardContent>
          </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Quiz Interface */}
        {quizzes.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Quiz Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuiz}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                  <Card className="bg-white border border-[#edf5ee] shadow-xl">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-[#08272a] flex items-center gap-2">
                            <Target className="text-[#08272a]" />
                        Question {currentQuiz + 1} of {quizzes.length}
                      </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getDifficultyColor(quizzes[currentQuiz].difficulty)}>
                              {quizzes[currentQuiz].difficulty}
                            </Badge>
                            <Badge variant="outline" className="border-[#edf5ee] text-[#08272a]">
                              {quizzes[currentQuiz].points} pts
                            </Badge>
                            {quizzes[currentQuiz].timeLimit && (
                              <Badge variant="outline" className="flex items-center gap-1 border-[#edf5ee] text-[#08272a]">
                                <Timer className="w-3 h-3" />
                                {timeLeft}s
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge className="bg-[#08272a] text-white">
                          <Brain className="w-3 h-3 mr-1" />
                          AI Generated
                        </Badge>
                    </div>
                  </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="bg-[#edf5ee] rounded-lg p-4 sm:p-6 border border-[#e3ffcd]">
                        <h3 className="text-lg sm:text-xl font-semibold text-[#08272a] mb-4 sm:mb-6 break-words">
                          {quizzes[currentQuiz].question}
                        </h3>
                        <div className="space-y-3">
                          {quizzes[currentQuiz].options.map((option, index) => (
                            <Button
                              key={index}
                              variant={
                                showResult
                                  ? index === quizzes[currentQuiz].correct
                                    ? "default"
                                    : selectedAnswer === index
                                    ? "destructive"
                                    : "outline"
                                  : selectedAnswer === index
                                  ? "secondary"
                                  : "outline"
                              }
                              className={`w-full justify-start h-auto p-3 sm:p-4 text-left hover:shadow-md transition-all whitespace-normal break-words text-sm sm:text-base ${
                                showResult
                                  ? index === quizzes[currentQuiz].correct
                                    ? "bg-[#e3ffcd] text-[#08272a] border-[#e3ffcd]"
                                    : selectedAnswer === index
                                    ? "bg-[#08272a] text-white border-[#08272a]"
                                    : "border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                                  : selectedAnswer === index
                                  ? "bg-[#edf5ee] text-[#08272a] border-[#edf5ee]"
                                  : "border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                              }`}
                              onClick={() => !showResult && handleAnswer(index)}
                              disabled={showResult}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  showResult
                                    ? index === quizzes[currentQuiz].correct
                                      ? "bg-[#e3ffcd] border-[#e3ffcd] text-[#08272a]"
                                      : selectedAnswer === index
                                      ? "bg-[#08272a] border-[#08272a] text-white"
                                      : "border-[#edf5ee]"
                                    : selectedAnswer === index
                                    ? "bg-[#edf5ee] border-[#edf5ee] text-[#08272a]"
                                    : "border-[#edf5ee]"
                                }`}>
                                  {showResult && index === quizzes[currentQuiz].correct && <CheckCircle className="w-4 h-4" />}
                                  {showResult && selectedAnswer === index && index !== quizzes[currentQuiz].correct && <XCircle className="w-4 h-4" />}
                                  {!showResult && selectedAnswer === index && <div className="w-2 h-2 bg-[#08272a] rounded-full" />}
                                </div>
                                <span className="text-left break-words w-full">{option}</span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Explanation and Related Content */}
                    {showResult && (
                      <motion.div
                          initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <Card className="bg-[#edf5ee] border border-[#e3ffcd]">
                            <CardHeader>
                              <CardTitle className="text-[#08272a] flex items-center gap-2">
                                <Lightbulb className="text-[#08272a]" />
                                Explanation
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-[#08272a]">{quizzes[currentQuiz].explanation}</p>
                              {quizzes[currentQuiz].aiInsight && (
                                <div className="mt-4 p-3 bg-[#e3ffcd] rounded-lg">
                                  <p className="text-sm text-[#08272a] font-medium">
                                    💡 AI Insight: {quizzes[currentQuiz].aiInsight}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>

                          {relatedContent.length > 0 && (
                            <Card className="bg-white border border-[#edf5ee]">
                              <CardHeader>
                                <CardTitle className="text-[#08272a] flex items-center gap-2">
                                  <BookOpen className="text-[#08272a]" />
                                  Related Content
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {relatedContent.map((content, index) => (
                                    <div key={index} className="p-3 bg-[#edf5ee] rounded-lg">
                                      <h4 className="font-medium text-[#08272a]">{content.title}</h4>
                                      <p className="text-sm text-[#08272a]/70">{content.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                      </motion.div>
                    )}

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        {!showResult ? (
                          <Button 
                            onClick={() => setShowResult(true)}
                            disabled={selectedAnswer === null}
                            className="bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                          >
                            Submit Answer
                      </Button>
                        ) : (
                          <>
                            {currentQuiz < quizzes.length - 1 ? (
                              <Button 
                                onClick={nextQuestion}
                                className="bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                              >
                          Next Question
                        </Button>
                            ) : (
                              <Button 
                                onClick={finishQuiz}
                                className="bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                              >
                                Finish Quiz
                        </Button>
                      )}
                          </>
                        )}
                        <Button 
                          variant="outline" 
                          onClick={resetQuiz}
                          className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <Card className="bg-white border border-[#edf5ee] shadow-lg">
              <CardHeader>
                  <CardTitle className="text-[#08272a] flex items-center gap-2">
                    <TrendingUp className="text-[#08272a]" />
                    Progress
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm text-[#08272a] mb-2">
                      <span>Questions</span>
                      <span>{currentQuiz + 1} / {quizzes.length}</span>
                  </div>
                    <Progress value={((currentQuiz + 1) / quizzes.length) * 100} className="h-2 bg-[#edf5ee]" style={{ '--progress-background': '#08272a' } as any} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-[#08272a] mb-2">
                      <span>Score</span>
                      <span>{score} pts</span>
                </div>
                    <Progress value={(score / (quizzes.length * 10)) * 100} className="h-2 bg-[#edf5ee]" style={{ '--progress-background': '#08272a' } as any} />
                  </div>
                </CardContent>
              </Card>

              {/* Timer */}
              {timeLeft !== null && (
                <Card className="bg-white border border-[#edf5ee] shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#08272a] flex items-center gap-2">
                      <Clock className="text-[#08272a]" />
                      Time Remaining
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                <div className="text-center">
                      <div className="text-3xl font-bold text-[#08272a]">{timeLeft}s</div>
                      <div className="text-sm text-[#08272a]/70">seconds left</div>
                </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Stats */}
              <Card className="bg-white border border-[#edf5ee] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#08272a] flex items-center gap-2">
                    <Activity className="text-[#08272a]" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#08272a]/70">Correct</span>
                    <span className="font-medium text-[#08272a]">{score / 10}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#08272a]/70">Incorrect</span>
                    <span className="font-medium text-[#08272a]">{currentQuiz - (score / 10)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#08272a]/70">Accuracy</span>
                    <span className="font-medium text-[#08272a]">{((score / 10) / (currentQuiz + 1) * 100).toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

        {/* Completion Popup */}
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogContent className="bg-white border border-[#edf5ee] w-full max-w-[95vw] sm:max-w-md p-4 sm:p-8">
            <DialogHeader>
              <DialogTitle className="text-[#08272a] flex items-center gap-2">
                <Trophy className="text-[#08272a]" />
                Quiz Completed!
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#08272a] mb-2">{score}</div>
                <div className="text-[#08272a]/70">Total Points</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#edf5ee] rounded-lg">
                  <div className="text-2xl font-bold text-[#08272a]">{((score / 10) / quizzes.length * 100).toFixed(1)}%</div>
                  <div className="text-sm text-[#08272a]/70">Accuracy</div>
                </div>
                <div className="text-center p-3 bg-[#e3ffcd] rounded-lg">
                  <div className="text-2xl font-bold text-[#08272a]">{quizzes.length}</div>
                  <div className="text-sm text-[#08272a]/70">Questions</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={() => {
                    setShowPopup(false);
                    resetQuiz();
                  }}
                  className="flex-1 bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                >
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowPopup(false);
                    setQuizzes([]);
                    setCurrentQuiz(0);
                    setScore(0);
                    setSelectedAnswer(null);
                    setShowResult(false);
                  }}
                  className="flex-1 border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                >
                  New Quiz
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SmartQuiz;
