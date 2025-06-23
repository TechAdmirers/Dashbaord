import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, MicOff, Volume2, VolumeX, Search, Settings, 
  Play, Pause, RotateCcw, Save, Loader2, CheckCircle,
  AlertCircle, Brain, MessageSquare, BookOpen, Target,
  Calendar, Trophy, Bot, Sparkles, ArrowRight, Clock,
  User, Globe, Languages, Zap, Lightbulb, Star,
  History, Trash2, Download, Upload, Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface VoiceCommand {
  id: string;
  command: string;
  description: string;
  category: string;
  action: string;
  example: string;
}

interface VoiceHistory {
  id: string;
  command: string;
  response: string;
  timestamp: Date;
  success: boolean;
}

const VoicePrompt = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceResponse, setVoiceResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceHistory, setVoiceHistory] = useState<VoiceHistory[]>([]);
  const [settings, setSettings] = useState({
    voiceEnabled: true,
    autoSpeak: true,
    language: 'en-US',
    speed: 1.0,
    pitch: 1.0,
    volume: 1.0
  });
  const [activeTab, setActiveTab] = useState('commands');
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [aiTerminal, setAiTerminal] = useState<{ topic: string, content: string } | null>(null);

  // Voice commands database (expanded educational demo questions)
  const voiceCommands: VoiceCommand[] = [
    {
      id: '1',
      command: 'tell me about java',
      description: 'Get an AI-powered explanation of Java',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'Tell me about Java'
    },
    {
      id: '2',
      command: 'explain python',
      description: 'Get an AI-powered explanation of Python',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'Explain Python'
    },
    {
      id: '3',
      command: 'what is react',
      description: 'Get an AI-powered explanation of React',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'What is React?'
    },
    {
      id: '4',
      command: 'describe typescript',
      description: 'Get an AI-powered explanation of TypeScript',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'Describe TypeScript'
    },
    {
      id: '5',
      command: 'teach me about c++',
      description: 'Get an AI-powered explanation of C++',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'Teach me about C++'
    },
    {
      id: '6',
      command: 'get an ai powered explanation of java',
      description: 'Get an AI-powered explanation of Java',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'Get an AI powered explanation of Java'
    },
    {
      id: '7',
      command: 'give me an overview of machine learning',
      description: 'Get an AI-powered overview of Machine Learning',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'Give me an overview of Machine Learning'
    },
    {
      id: '8',
      command: 'summarize react',
      description: 'Get an AI-powered summary of React',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'Summarize React'
    },
    {
      id: '9',
      command: 'overview of python',
      description: 'Get an AI-powered overview of Python',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'Overview of Python'
    },
    {
      id: '10',
      command: 'give me a summary of javascript',
      description: 'Get an AI-powered summary of JavaScript',
      category: 'AI Study Assistant',
      action: 'study',
      example: 'Give me a summary of JavaScript'
    }
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = settings.language;
      
      recognitionInstance.onstart = () => {
    setIsListening(true);
    setTranscript('');
      };
      
      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          processVoiceCommand(finalTranscript);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setVoiceResponse(`Error: ${event.error}`);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
      
      // Load available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        if (voices.length > 0 && !selectedVoice) {
          setSelectedVoice(voices[0].name);
        }
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [settings.language]);

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setVoiceResponse('Error starting voice recognition. Please try again.');
      }
    } else {
      setVoiceResponse('Speech recognition is not supported in your browser.');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const processVoiceCommand = (command: string) => {
    setIsProcessing(true);
    const lowerCommand = command.toLowerCase();
    
    // Find matching command
    const matchedCommand = voiceCommands.find(cmd => 
      lowerCommand.includes(cmd.command.toLowerCase()) ||
      cmd.example.toLowerCase().includes(lowerCommand)
    );

    let response = '';
    let success = false;

    if (matchedCommand) {
      success = true;
      response = executeCommand(matchedCommand, command);
    } else {
      response = `I didn't understand "${command}". Try saying "help" to see available commands.`;
    }

    // Add to history
    const historyItem: VoiceHistory = {
      id: Date.now().toString(),
      command: command,
      response: response,
      timestamp: new Date(),
      success: success
    };

    setVoiceHistory(prev => [historyItem, ...prev.slice(0, 9)]);
    setVoiceResponse(response);
    setIsProcessing(false);

    // Auto-speak response if enabled
    if (settings.autoSpeak && success) {
      speakText(response);
    }

    if (isStudyQuery(command)) {
      const topic = extractStudyTopic(command);
      const content = getAiEducationalResponse(topic);
      setAiTerminal({ topic, content });
      setVoiceResponse(`Here's an overview of ${topic}:`);
      setIsProcessing(false);
      if (settings.autoSpeak) speakText(content);
      // Add to history
      const historyItem: VoiceHistory = {
        id: Date.now().toString(),
        command: command,
        response: content,
        timestamp: new Date(),
        success: true
      };
      setVoiceHistory(prev => [historyItem, ...prev.slice(0, 9)]);
      return;
    }
  };

  const executeCommand = (command: VoiceCommand, originalCommand: string): string => {
    switch (command.action) {
      case 'navigate':
        const path = getNavigationPath(command.command);
        if (path) {
          setTimeout(() => navigate(path), 1000);
          return `Navigating to ${command.description.toLowerCase()}.`;
        }
        return `Navigation command executed: ${command.description}`;
      
      case 'search':
        const searchTerm = extractSearchTerm(originalCommand);
        return `Searching for courses about ${searchTerm}. I found several relevant courses for you.`;
      
      case 'progress':
        return `Your current learning progress is 78%. You've completed 12 courses and are on track to reach your goals.`;
      
      case 'goal':
        const goal = extractGoal(originalCommand);
        return `Setting a new learning goal: ${goal}. I'll help you track your progress toward this goal.`;
      
      case 'path':
        return `Your AI-generated learning path shows you should focus on React development next, followed by Node.js and database management.`;
      
      case 'settings':
        setActiveTab('settings');
        return `Opening voice settings for you.`;
      
      case 'clear':
        setVoiceHistory([]);
        return `Voice command history has been cleared.`;
      
      case 'help':
        return `Here are some things you can say: "Go to dashboard", "Find courses on React", "Show my progress", "Start a quiz", or "Open tutor chat".`;
      
      case 'stop':
        stopListening();
        return `Stopped listening for voice commands.`;
      
      default:
        return `Command executed: ${command.description}`;
    }
  };

  const getNavigationPath = (command: string): string | null => {
    const navigationMap: Record<string, string> = {
      'dashboard': '/',
      'courses': '/my-courses',
      'achievements': '/achievements',
      'quiz': '/smart-quiz',
      'tutor': '/tutor-chat',
      'feedback': '/feedback',
      'schedule': '/schedule-optimizer',
      'recommendations': '/course-recommendations'
    };

    for (const [key, path] of Object.entries(navigationMap)) {
      if (command.includes(key)) {
        return path;
      }
    }
    return null;
  };

  const extractSearchTerm = (command: string): string => {
    const searchPatterns = [
      /find courses on (.+)/i,
      /search for (.+)/i,
      /courses about (.+)/i,
      /learn (.+)/i
    ];

    for (const pattern of searchPatterns) {
      const match = command.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return 'programming';
  };

  const extractGoal = (command: string): string => {
    const goalPatterns = [
      /goal to (.+)/i,
      /learn (.+)/i,
      /master (.+)/i
    ];

    for (const pattern of goalPatterns) {
      const match = command.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return 'improve programming skills';
  };

  const speakText = (text: string) => {
    if (synthesis && settings.voiceEnabled) {
      // Stop any current speech
      synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.speed;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;
      
      if (selectedVoice) {
        const voice = availableVoices.find(v => v.name === selectedVoice);
        if (voice) utterance.voice = voice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const clearHistory = () => {
    setVoiceHistory([]);
  };

  const isStudyQuery = (command: string) => {
    // Detects queries like 'tell me about', 'explain', 'what is', 'describe', 'teach me', 'give me an overview of', 'get an AI powered explanation of', etc.
    return /\b(tell me about|explain|what is|describe|teach me( about)?|give me an overview of|get an ai powered explanation of|give me a summary of|summarize|overview of)\b/i.test(command.trim());
  };

  const extractStudyTopic = (command: string) => {
    // Try to extract the topic from a variety of phrasings
    const patterns = [
      /tell me about\s+(.+)/i,
      /explain\s+(.+)/i,
      /what is\s+(.+)/i,
      /describe\s+(.+)/i,
      /teach me(?: about)?\s+(.+)/i,
      /give me an overview of\s+(.+)/i,
      /get an ai powered explanation of\s+(.+)/i,
      /give me a summary of\s+(.+)/i,
      /summarize\s+(.+)/i,
      /overview of\s+(.+)/i
    ];
    for (const pattern of patterns) {
      const match = command.match(pattern);
      if (match) return match[1].trim();
    }
    // Fallback: return the whole command if no pattern matched
    return command.trim();
  };

  const getAiEducationalResponse = (topic: string): string => {
    // You can expand this with more topics or connect to an AI API
    const lower = topic.toLowerCase();
    if (lower.includes('java')) {
      return `Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is widely used for building enterprise-scale applications, Android apps, and large systems. Java is known for its portability, robustness, and strong community support.`;
    }
    if (lower.includes('python')) {
      return `Python is a versatile, high-level programming language known for its readability and simplicity. It is widely used in web development, data science, artificial intelligence, automation, and more. Python's large ecosystem of libraries makes it a popular choice for rapid development.`;
    }
    if (lower.includes('react')) {
      return `React is a popular JavaScript library for building user interfaces, especially single-page applications. Developed by Facebook, React allows developers to create reusable UI components and efficiently update the UI in response to data changes.`;
    }
    // Default fallback
    return `"${topic}" is an interesting topic! Unfortunately, I don't have a detailed summary for it right now, but you can ask about popular programming languages, frameworks, or tech concepts.`;
  };

  return (
    <div className="min-h-screen bg-white p-6 font-['Poppins']">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center gap-2"
        >
          <div className="flex flex-col items-center gap-3 mb-4 w-full">
            <div className="p-3 bg-[#08272a] rounded-2xl shadow-lg flex items-center justify-center">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#08272a] break-words w-full">Voice Commands</h1>
            <div className="p-3 bg-[#e3ffcd] rounded-2xl shadow-lg flex items-center justify-center">
              <Brain className="h-8 w-8 text-[#08272a]" />
            </div>
          </div>
          <p className="text-[#08272a] text-base sm:text-lg max-w-xs sm:max-w-2xl mx-auto">
            Control your learning experience with voice commands powered by AI
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">
            <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
            <Badge className="bg-[#edf5ee] text-[#08272a] border border-[#edf5ee] px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Real-time
            </Badge>
          </div>
        </motion.div>

        {/* Main Voice Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Voice Control Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-[#edf5ee] shadow-xl">
            <CardHeader>
                <CardTitle className="text-[#08272a] flex items-center gap-2 text-xl">
                  <Mic className="text-[#08272a]" />
                  Voice Control
                  <Badge className="ml-auto bg-[#e3ffcd] text-[#08272a]">
                    {isListening ? 'Listening' : 'Ready'}
                  </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Voice Button */}
              <div className="text-center">
                <motion.div
                    className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-6 cursor-pointer ${
                      isListening 
                        ? 'bg-red-100 border-4 border-red-500 shadow-lg' 
                        : 'bg-[#edf5ee] border-4 border-[#08272a] hover:bg-[#e3ffcd] transition-colors'
                  }`}
                  animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: isListening ? Infinity : 0, duration: 1 }}
                    onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? (
                    <MicOff className="h-12 w-12 text-red-500" />
                  ) : (
                      <Mic className="h-12 w-12 text-[#08272a]" />
                  )}
                </motion.div>
                
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                    className={`w-full text-lg py-3 ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-[#08272a] hover:bg-[#08272a]/90 text-white'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : isListening ? (
                      <>
                        <MicOff className="h-5 w-5 mr-2" />
                        Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic className="h-5 w-5 mr-2" />
                        Start Voice Command
                      </>
                    )}
                </Button>
              </div>

                {/* Transcript Display */}
              <AnimatePresence>
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-[#edf5ee] rounded-lg border border-[#e3ffcd]"
                    >
                      <h4 className="font-semibold text-[#08272a] mb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        You said:
                      </h4>
                      <p className="text-[#08272a] italic">"{transcript}"</p>
                    {isListening && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-[#08272a]/70">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Listening...
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

                {/* Voice Response */}
                <AnimatePresence>
                  {voiceResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-[#e3ffcd] rounded-lg border border-[#08272a]/20"
                    >
                      <h4 className="font-semibold text-[#08272a] mb-2 flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        AI Response:
                      </h4>
                      <p className="text-[#08272a] mb-3">{voiceResponse}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => speakText(voiceResponse)}
                          disabled={isSpeaking}
                          className="bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                        >
                          {isSpeaking ? (
                            <>
                              <Pause className="h-3 w-3 mr-1" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-3 w-3 mr-1" />
                              Speak
                            </>
                          )}
                        </Button>
                        {isSpeaking && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={stopSpeaking}
                            className="border-[#08272a] text-[#08272a] hover:bg-[#08272a] hover:text-white"
                          >
                            <VolumeX className="h-3 w-3 mr-1" />
                            Stop
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 mt-6 lg:mt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#edf5ee]">
                <TabsTrigger value="commands" className="text-[#08272a] data-[state=active]:bg-[#08272a] data-[state=active]:text-white">
                  Commands
                </TabsTrigger>
                <TabsTrigger value="history" className="text-[#08272a] data-[state=active]:bg-[#08272a] data-[state=active]:text-white">
                  History
                </TabsTrigger>
                <TabsTrigger value="examples" className="text-[#08272a] data-[state=active]:bg-[#08272a] data-[state=active]:text-white">
                  Examples
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-[#08272a] data-[state=active]:bg-[#08272a] data-[state=active]:text-white">
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Commands Tab */}
              <TabsContent value="commands" className="mt-6">
                <Card className="bg-white border border-[#edf5ee] shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#08272a] flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Available Voice Commands
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {voiceCommands.map((command) => (
                        <motion.div
                          key={command.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 border border-[#edf5ee] rounded-lg hover:bg-[#edf5ee]/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-[#08272a]">{command.description}</h4>
                            <Badge className="bg-[#e3ffcd] text-[#08272a] text-xs">
                              {command.category}
                            </Badge>
                          </div>
                          <p className="text-[#08272a]/70 text-sm mb-2">{command.example}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setTranscript(command.example);
                              processVoiceCommand(command.example);
                            }}
                            className="border-[#08272a] text-[#08272a] hover:bg-[#08272a] hover:text-white"
                          >
                            Try This
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="mt-6">
                <Card className="bg-white border border-[#edf5ee] shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#08272a] flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Voice Command History
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={clearHistory}
                        className="ml-auto border-[#08272a] text-[#08272a] hover:bg-[#08272a] hover:text-white"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {voiceHistory.length === 0 ? (
                        <p className="text-[#08272a]/70 text-center py-8">No voice commands yet. Start using voice commands to see your history here.</p>
                      ) : (
                        voiceHistory.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-4 border border-[#edf5ee] rounded-lg"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                item.success ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                {item.success ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-[#08272a]">"{item.command}"</p>
                                <p className="text-sm text-[#08272a]/70 mt-1">{item.response}</p>
                                <p className="text-xs text-[#08272a]/50 mt-2">
                                  {item.timestamp.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Examples Tab */}
              <TabsContent value="examples" className="mt-6">
                <Card className="bg-white border border-[#edf5ee] shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#08272a] flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Quick Examples
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-[#08272a] flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Learning Commands
                        </h4>
                        {[
                          "Find courses on React development",
                          "Show my learning progress",
                          "Start a quiz on JavaScript",
                          "Open the tutor chat"
                        ].map((example, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                            onClick={() => {
                              setTranscript(example);
                              processVoiceCommand(example);
                            }}
                          >
                            "{example}"
                          </Button>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-[#08272a] flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          System Commands
                        </h4>
                        {[
                          "Go to dashboard",
                          "Show my achievements",
                          "Optimize my schedule",
                          "What can I say?"
                        ].map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                            className="w-full justify-start border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]"
                      onClick={() => {
                              setTranscript(example);
                              processVoiceCommand(example);
                      }}
                    >
                            "{example}"
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6">
                <Card className="bg-white border border-[#edf5ee] shadow-lg">
            <CardHeader>
                    <CardTitle className="text-[#08272a] flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Voice Settings
              </CardTitle>
            </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#08272a]">Voice Recognition</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[#08272a]">Language</span>
                            <select
                              value={settings.language}
                              onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                              className="border border-[#edf5ee] rounded px-3 py-1 text-[#08272a]"
                            >
                              <option value="en-US">English (US)</option>
                              <option value="en-GB">English (UK)</option>
                              <option value="es-ES">Spanish</option>
                              <option value="fr-FR">French</option>
                              <option value="de-DE">German</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#08272a]">Text-to-Speech</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[#08272a]">Voice</span>
                            <select
                              value={selectedVoice}
                              onChange={(e) => setSelectedVoice(e.target.value)}
                              className="border border-[#edf5ee] rounded px-3 py-1 text-[#08272a]"
                            >
                              {availableVoices.map((voice) => (
                                <option key={voice.name} value={voice.name}>
                                  {voice.name} ({voice.lang})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#08272a]">Speed</span>
                            <input
                              type="range"
                              min="0.5"
                              max="2"
                              step="0.1"
                              value={settings.speed}
                              onChange={(e) => setSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                              className="w-24"
                            />
                            <span className="text-sm text-[#08272a]/70">{settings.speed}x</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#08272a]">Pitch</span>
                            <input
                              type="range"
                              min="0.5"
                              max="2"
                              step="0.1"
                              value={settings.pitch}
                              onChange={(e) => setSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                              className="w-24"
                            />
                            <span className="text-sm text-[#08272a]/70">{settings.pitch}x</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#08272a]">Preferences</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settings.voiceEnabled}
                            onChange={(e) => setSettings(prev => ({ ...prev, voiceEnabled: e.target.checked }))}
                            className="rounded border-[#edf5ee]"
                          />
                          <span className="text-[#08272a]">Enable voice recognition</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settings.autoSpeak}
                            onChange={(e) => setSettings(prev => ({ ...prev, autoSpeak: e.target.checked }))}
                            className="rounded border-[#edf5ee]"
                          />
                          <span className="text-[#08272a]">Auto-speak responses</span>
                        </label>
                      </div>
                  </div>
            </CardContent>
          </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {aiTerminal && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center p-2 sm:top-24 sm:right-8 sm:left-auto sm:w-[400px] sm:max-w-full sm:items-start sm:justify-end"
          >
            <div className="bg-[#08272a] text-[#e3ffcd] rounded-xl shadow-2xl border-2 border-[#e3ffcd] overflow-hidden w-full max-w-md sm:max-w-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#e3ffcd]/30">
                <span className="font-mono text-lg font-bold">AI Terminal: {aiTerminal.topic}</span>
                <Button size="sm" variant="ghost" className="text-[#e3ffcd] hover:bg-[#e3ffcd]/10" onClick={() => setAiTerminal(null)}>
                  Close
                </Button>
              </div>
              <div className="p-4 font-mono text-base whitespace-pre-line min-h-[120px]">
                {aiTerminal.content}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VoicePrompt;
