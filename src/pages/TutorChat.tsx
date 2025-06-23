import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Send, 
  User, 
  Brain, 
  MessageSquare, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  Code, 
  Palette, 
  Database, 
  Smartphone, 
  Globe, 
  Shield, 
  Settings, 
  Clock, 
  Star, 
  Zap, 
  Target, 
  TrendingUp, 
  FileText, 
  Video, 
  Link, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings as SettingsIcon,
  HelpCircle,
  Info,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Share2,
  Download,
  Bookmark,
  History,
  Search,
  Filter,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Crown,
  Award,
  Gift,
  Heart,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  from: 'user' | 'bot';
  text: string;
  timestamp: Date;
  subject?: string;
  attachments?: Array<{
    type: 'image' | 'file' | 'link';
    url: string;
    name: string;
  }>;
  reactions?: {
    thumbsUp: number;
    thumbsDown: number;
  };
  aiInsights?: {
    confidence: number;
    relatedTopics: string[];
    suggestedResources: Array<{
      title: string;
      url: string;
      type: 'video' | 'article' | 'documentation' | 'practice';
    }>;
  };
}

interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  topics: string[];
}

interface ChatSession {
  id: string;
  subject: string;
  messages: Message[];
  startTime: Date;
  endTime?: Date;
  rating?: number;
  feedback?: string;
}

const TutorChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'bot',
      text: "Hello! I'm your AI Tutor. I can help you with any subject. What would you like to learn today?",
      timestamp: new Date(),
      aiInsights: {
        confidence: 0.95,
        relatedTopics: ['Getting Started', 'Subject Selection'],
        suggestedResources: [
          { title: 'How to use AI Tutor', url: '#', type: 'article' },
          { title: 'Available Subjects', url: '#', type: 'documentation' }
        ]
      }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [activeTab, setActiveTab] = useState('chat');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [showSubjectSelector, setShowSubjectSelector] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const subjects: Subject[] = [
    {
      id: 'programming',
      name: 'Programming',
      icon: <Code className="w-5 h-5" />,
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Learn programming languages and concepts',
      topics: ['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'Go']
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      icon: <Palette className="w-5 h-5" />,
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Master modern frontend technologies',
      topics: ['React', 'Vue.js', 'Angular', 'CSS', 'HTML', 'Sass', 'Webpack', 'TypeScript']
    },
    {
      id: 'backend',
      name: 'Backend Development',
      icon: <Database className="w-5 h-5" />,
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Server-side development and APIs',
      topics: ['Node.js', 'Express', 'Python', 'Django', 'Java', 'Spring', 'PHP', 'Laravel']
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Artificial Intelligence and ML concepts',
      topics: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Neural Networks', 'Deep Learning']
    },
    {
      id: 'mobile',
      name: 'Mobile Development',
      icon: <Smartphone className="w-5 h-5" />,
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Mobile app development platforms',
      topics: ['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin']
    },
    {
      id: 'web',
      name: 'Web Development',
      icon: <Globe className="w-5 h-5" />,
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Full-stack web development',
      topics: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'MongoDB', 'AWS']
    },
    {
      id: 'security',
      name: 'Cybersecurity',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Security and ethical hacking',
      topics: ['Network Security', 'Web Security', 'Cryptography', 'Penetration Testing']
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: <Settings className="w-5 h-5" />,
      color: 'from-[#08272a] to-[#08272a]',
      description: 'Development operations and deployment',
      topics: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure', 'Linux']
    }
  ];

  const subjectResponses: Record<string, string[]> = {
    programming: [
      "In programming, it's important to understand the fundamentals first. Let me explain this concept step by step...",
      "Here's a practical example of how to implement this in code...",
      "The key principle here is to follow best practices and write clean, maintainable code...",
      "This is a common pattern in programming. Let me show you how it works...",
      "Understanding this concept will help you become a better programmer..."
    ],
    frontend: [
      "Frontend development focuses on creating user interfaces. Here's how you can approach this...",
      "Modern frontend frameworks like React make this much easier. Let me demonstrate...",
      "CSS and styling are crucial for creating beautiful user interfaces...",
      "This is a common frontend pattern that you'll encounter frequently...",
      "Responsive design is essential for modern web applications..."
    ],
    backend: [
      "Backend development involves server-side logic and data management...",
      "APIs are the backbone of modern applications. Here's how to design them...",
      "Database design is crucial for scalable applications...",
      "Security should always be a priority in backend development...",
      "Performance optimization is key for production applications..."
    ],
    'ai-ml': [
      "Machine learning involves training models on data to make predictions...",
      "Neural networks are inspired by biological neurons. Here's how they work...",
      "Data preprocessing is crucial for successful ML projects...",
      "Understanding the mathematics behind ML algorithms is important...",
      "Model evaluation and validation are essential for reliable results..."
    ],
    mobile: [
      "Mobile development requires understanding platform-specific constraints...",
      "Cross-platform frameworks like React Native offer great flexibility...",
      "User experience is especially important on mobile devices...",
      "Performance optimization is crucial for mobile apps...",
      "App store guidelines and deployment processes are important to understand..."
    ],
    web: [
      "Web development combines frontend and backend technologies...",
      "Understanding HTTP and web protocols is fundamental...",
      "Web security is crucial for protecting user data...",
      "SEO and web performance affect user experience...",
      "Modern web development involves many tools and frameworks..."
    ],
    security: [
      "Cybersecurity involves protecting systems from various threats...",
      "Understanding attack vectors helps in building secure systems...",
      "Cryptography is fundamental to modern security...",
      "Network security involves protecting data in transit...",
      "Security should be built into applications from the start..."
    ],
    devops: [
      "DevOps combines development and operations for better software delivery...",
      "Containerization with Docker simplifies deployment...",
      "CI/CD pipelines automate testing and deployment...",
      "Cloud platforms offer scalable infrastructure...",
      "Monitoring and logging are essential for production systems..."
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const generateAIResponse = (userMessage: string, subject?: string): Message => {
    const subjectId = subject || selectedSubject || 'general';
    const responses = subjectResponses[subjectId] || subjectResponses.programming;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: randomResponse,
      timestamp: new Date(),
      subject: subjectId,
      aiInsights: {
        confidence: 0.85 + Math.random() * 0.1,
        relatedTopics: ['Related Topic 1', 'Related Topic 2', 'Related Topic 3'],
        suggestedResources: [
          { title: 'Learn More About This Topic', url: '#', type: 'article' },
          { title: 'Practice Exercises', url: '#', type: 'practice' },
          { title: 'Video Tutorial', url: '#', type: 'video' }
        ]
      }
    };
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      from: 'user',
      text: inputValue,
      timestamp: new Date(),
      subject: selectedSubject
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateAIResponse(inputValue, selectedSubject);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setShowSubjectSelector(false);
    
    const subject = subjects.find(s => s.id === subjectId);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      from: 'bot',
      text: `Great! I'm now your ${subject?.name} tutor. I can help you with topics like ${subject?.topics.slice(0, 3).join(', ')} and more. What would you like to learn?`,
      timestamp: new Date(),
      subject: subjectId,
      aiInsights: {
        confidence: 0.95,
        relatedTopics: subject?.topics.slice(0, 3) || [],
        suggestedResources: [
          { title: `${subject?.name} Fundamentals`, url: '#', type: 'article' },
          { title: 'Practice Exercises', url: '#', type: 'practice' }
        ]
      }
    };
    
    setMessages(prev => [...prev, welcomeMessage]);
  };

  const TypingIndicator = () => (
    <motion.div 
      className="flex items-center space-x-2 p-4 bg-[#edf5ee] rounded-2xl max-w-xs"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center space-x-1">
        <span className="h-2 w-2 bg-[#08272a] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 bg-[#08272a] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 bg-[#08272a] rounded-full animate-bounce"></span>
      </div>
      <span className="text-sm text-[#08272a]">AI is thinking...</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white p-6 font-['Poppins']">
      <div className="max-w-6xl mx-auto space-y-6">
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
                        AI Tutor Chat
            </h1>
            <div className="p-3 bg-[#e3ffcd] rounded-2xl shadow-lg">
              <MessageSquare className="h-8 w-8 text-[#08272a]" />
            </div>
          </div>
          <p className="text-[#08272a] text-lg max-w-2xl mx-auto">
            Get personalized help from your AI tutor across all subjects
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
            <Badge className="bg-[#edf5ee] text-[#08272a] border border-[#edf5ee] px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Subject-Specific
            </Badge>
          </div>
        </motion.div>

        {/* Subject Selector */}
        {!selectedSubject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#08272a] mb-2">Choose Your Subject</h2>
              <p className="text-[#08272a]/70">Select a subject to get specialized tutoring</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 group bg-white border border-[#edf5ee]"
                    onClick={() => handleSubjectSelect(subject.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#08272a] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        {subject.icon}
                      </div>
                      <h3 className="text-[#08272a] font-semibold text-lg mb-2">{subject.name}</h3>
                      <p className="text-[#08272a]/70 text-sm mb-3">{subject.description}</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {subject.topics.slice(0, 3).map((topic, idx) => (
                          <Badge key={idx} className="bg-[#edf5ee] text-[#08272a] text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {subject.topics.length > 3 && (
                          <Badge className="bg-[#e3ffcd] text-[#08272a] text-xs">
                            +{subject.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat Interface */}
        {selectedSubject && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <Card className="bg-white border border-[#edf5ee] shadow-xl h-[70vh] flex flex-col">
                <CardHeader className="border-b border-[#edf5ee] bg-[#edf5ee]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#08272a] flex items-center justify-center text-white">
                        {subjects.find(s => s.id === selectedSubject)?.icon}
                      </div>
                      <div>
                        <CardTitle className="text-[#08272a] text-lg">
                          {subjects.find(s => s.id === selectedSubject)?.name} Tutor
                        </CardTitle>
                        <p className="text-[#08272a]/70 text-sm">AI-powered personalized learning</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                        className={`border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee] ${
                          isVoiceEnabled ? 'bg-[#e3ffcd]' : ''
                        }`}
                      >
                        {isVoiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsMuted(!isMuted)}
                        className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubject('')}
                        className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                </div>
            </div>
        </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-[#edf5ee]/20">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                        key={msg.id}
                        className={`flex items-end gap-3 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.from === 'bot' && (
                          <Avatar className="w-8 h-8 border-2 border-[#e3ffcd]">
                            <AvatarFallback className="bg-[#08272a] text-white">
                              <Bot className="w-4 h-4" />
                            </AvatarFallback>
                  </Avatar>
                )}
                        
                        <div className="max-w-md">
                <div
                            className={`rounded-2xl p-4 shadow-sm ${
                    msg.from === 'user'
                                ? 'bg-[#08272a] text-white rounded-br-md'
                                : 'bg-white text-[#08272a] rounded-bl-md border border-[#edf5ee]'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                          </div>
                          
                          {/* AI Insights for bot messages */}
                          {msg.from === 'bot' && msg.aiInsights && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-2 space-y-2"
                            >
                              <div className="flex items-center gap-2 text-xs text-[#08272a]/70">
                                <Lightbulb className="w-3 h-3" />
                                <span>AI Confidence: {(msg.aiInsights.confidence * 100).toFixed(0)}%</span>
                              </div>
                              
                              {msg.aiInsights.suggestedResources.length > 0 && (
                                <div className="bg-[#edf5ee] rounded-lg p-3">
                                  <p className="text-xs font-medium text-[#08272a] mb-2">Suggested Resources:</p>
                                  <div className="space-y-1">
                                    {msg.aiInsights.suggestedResources.slice(0, 2).map((resource, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-xs">
                                        <BookOpen className="w-3 h-3 text-[#08272a]/70" />
                                        <span className="text-[#08272a]/80">{resource.title}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee] h-6 px-2">
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  Helpful
                                </Button>
                                <Button size="sm" variant="outline" className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee] h-6 px-2">
                                  <ThumbsDown className="w-3 h-3 mr-1" />
                                  Not Helpful
                                </Button>
                              </div>
                            </motion.div>
                          )}
                          
                          <div className="text-xs text-[#08272a]/50 mt-1">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                </div>
                        
                {msg.from === 'user' && (
                          <Avatar className="w-8 h-8 border-2 border-[#e3ffcd]">
                            <AvatarFallback className="bg-[#08272a] text-white">
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
                  
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </CardContent>
                
                <div className="p-4 border-t border-[#edf5ee] bg-white">
                  <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder={`Ask about ${subjects.find(s => s.id === selectedSubject)?.name}...`}
              className="flex-1 border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a] text-[#08272a] placeholder-[#08272a]/60 w-full sm:w-auto"
            />
            <Button 
              onClick={handleSend} 
              disabled={isTyping || !inputValue.trim()}
              className="bg-[#08272a] hover:bg-[#08272a]/90 text-white px-4 w-full sm:w-auto"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 mt-6 lg:mt-0">
              {/* Subject Info */}
              <Card className="bg-white border border-[#edf5ee] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#08272a] flex items-center gap-2 text-lg">
                    <BookOpen className="text-[#08272a]" />
                    Subject Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#08272a] flex items-center justify-center text-white">
                      {subjects.find(s => s.id === selectedSubject)?.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#08272a]">
                        {subjects.find(s => s.id === selectedSubject)?.name}
                      </h3>
                      <p className="text-sm text-[#08272a]/70">
                        {subjects.find(s => s.id === selectedSubject)?.description}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-[#08272a] mb-2">Available Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {subjects.find(s => s.id === selectedSubject)?.topics.slice(0, 6).map((topic, idx) => (
                        <Badge key={idx} className="bg-[#edf5ee] text-[#08272a] text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white border border-[#edf5ee] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#08272a] flex items-center gap-2 text-lg">
                    <Zap className="text-[#08272a]" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Study Guide
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Practice Quiz
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Video Tutorials
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Resources
                  </Button>
                </CardContent>
              </Card>

              {/* Chat Stats */}
              <Card className="bg-white border border-[#edf5ee] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#08272a] flex items-center gap-2 text-lg">
                    <TrendingUp className="text-[#08272a]" />
                    Chat Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#08272a]/70">Messages</span>
                    <span className="font-medium text-[#08272a]">{messages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#08272a]/70">Session Time</span>
                    <span className="font-medium text-[#08272a]">15 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#08272a]/70">Topics Covered</span>
                    <span className="font-medium text-[#08272a]">3</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorChat;

