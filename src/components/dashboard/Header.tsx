import React, { useState } from 'react';
import { Search, Bell, Calendar, Calculator, CheckCircle, XCircle, Clock, AlertCircle, Info, Star, BookOpen, Trophy, MessageSquare, Zap } from 'lucide-react';
import { generateMockData } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

const { user } = generateMockData();

const Header = () => {
  const navigate = useNavigate();
  const [isStreaksOpen, setIsStreaksOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useUser();

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'Congratulations! You\'ve earned the "JavaScript Master" badge.',
      time: '2 minutes ago',
      read: false,
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 2,
      type: 'course',
      title: 'New Course Available',
      message: 'Advanced React Patterns course is now available for enrollment.',
      time: '1 hour ago',
      read: false,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Study Reminder',
      message: 'You have a scheduled study session in 30 minutes.',
      time: '2 hours ago',
      read: true,
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 4,
      type: 'streak',
      title: 'Streak Milestone!',
      message: 'You\'ve maintained a 7-day learning streak! Keep it up!',
      time: '3 hours ago',
      read: true,
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 5,
      type: 'feedback',
      title: 'AI Feedback Ready',
      message: 'Your latest assessment feedback is ready for review.',
      time: '5 hours ago',
      read: true,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 6,
      type: 'system',
      title: 'System Update',
      message: 'New features have been added to your learning dashboard.',
      time: '1 day ago',
      read: true,
      icon: Info,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    // In real app, this would update the backend
    console.log('Marked as read:', id);
  };

  const markAllAsRead = () => {
    // In real app, this would update the backend
    console.log('Marked all as read');
  };

  const deleteNotification = (id: number) => {
    // In real app, this would update the backend
    console.log('Deleted notification:', id);
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  const handleViewAllNotifications = () => {
    setIsNotificationsOpen(false);
    navigate('/notifications');
  };

  return (
    <header className="bg-white p-4 flex justify-between items-center border-b hidden sm:flex">
      <div>
        <h2 className="text-2xl font-bold text-deep-emerald-green">
          Welcome back, {user?.firstName || user?.fullName || 'Learner'} 👋
        </h2>
        <p className="text-gray-500">Let's continue your learning journey!</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 w-64 border rounded-full focus:ring-2 focus:ring-deep-emerald-green/50 focus:outline-none transition"
          />
        </div>

        {/* Notifications Dropdown */}
        <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={24} className="text-[#08272a]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
        </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-96 max-h-[600px] overflow-hidden"
            sideOffset={8}
          >
            <DropdownMenuLabel className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#08272a]" />
                <span className="font-semibold text-[#08272a]">Notifications</span>
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white ml-2">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-[#08272a] hover:bg-[#edf5ee]"
                >
                  Mark all read
                </Button>
              )}
            </DropdownMenuLabel>

            <div className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-[#edf5ee] rounded-none">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a] text-xs"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievement" 
                    className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a] text-xs"
                  >
                    🏆
                  </TabsTrigger>
                  <TabsTrigger 
                    value="course" 
                    className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a] text-xs"
                  >
                    📚
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reminder" 
                    className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a] text-xs"
                  >
                    ⏰
                  </TabsTrigger>
                  <TabsTrigger 
                    value="streak" 
                    className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a] text-xs"
                  >
                    🔥
                  </TabsTrigger>
                </TabsList>

                <div className="max-h-[400px] overflow-y-auto">
                  <AnimatePresence>
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${notification.bgColor} ${notification.borderColor} border`}>
                                <notification.icon className={`h-4 w-4 ${notification.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-[#08272a] text-sm mb-1">
                                      {notification.title}
                                    </h4>
                                    <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                                      {notification.message}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Clock className="h-3 w-3" />
                                      {notification.time}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 hover:bg-gray-200"
                                        >
                                          ⋮
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Mark as read
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                          <XCircle className="h-4 w-4 mr-2" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No notifications</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </Tabs>
            </div>

            <DropdownMenuSeparator />
            <div className="p-3 bg-gray-50">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-[#08272a] hover:bg-[#edf5ee]"
                onClick={handleViewAllNotifications}
              >
                View All Notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Learning Streaks Button */}
        <Dialog open={isStreaksOpen} onOpenChange={setIsStreaksOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-[#08272a] text-[#08272a] hover:bg-[#edf5ee]"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Learning Streaks</span>
              <Badge className="bg-[#e3ffcd] text-[#08272a] ml-1">7</Badge>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-[#08272a]">
                <Calendar className="h-5 w-5" />
                Learning Streaks Calendar
              </DialogTitle>
            </DialogHeader>
            <LearningStreaksCalendar />
          </DialogContent>
        </Dialog>

        {/* AI Calculator Button */}
        <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-[#08272a] text-[#08272a] hover:bg-[#edf5ee]"
            >
              <Calculator className="h-4 w-4" />
              <span className="hidden md:inline">AI Calculator</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-[#08272a]">
                <Calculator className="h-5 w-5" />
                AI-Powered Calculator
              </DialogTitle>
            </DialogHeader>
            <AICalculator />
          </DialogContent>
        </Dialog>

        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
};

// Learning Streaks Calendar Component
const LearningStreaksCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock learning data - in real app this would come from backend
  const learningData = {
    '2024-01-15': { hours: 2, streak: 5, completed: true },
    '2024-01-16': { hours: 1.5, streak: 6, completed: true },
    '2024-01-17': { hours: 3, streak: 7, completed: true },
    '2024-01-18': { hours: 0, streak: 0, completed: false },
    '2024-01-19': { hours: 2.5, streak: 1, completed: true },
    '2024-01-20': { hours: 1, streak: 2, completed: true },
    '2024-01-21': { hours: 4, streak: 3, completed: true },
    '2024-01-22': { hours: 2, streak: 4, completed: true },
    '2024-01-23': { hours: 3.5, streak: 5, completed: true },
    '2024-01-24': { hours: 1.5, streak: 6, completed: true },
    '2024-01-25': { hours: 2, streak: 7, completed: true },
    '2024-01-26': { hours: 0, streak: 0, completed: false },
    '2024-01-27': { hours: 2, streak: 1, completed: true },
    '2024-01-28': { hours: 3, streak: 2, completed: true },
    '2024-01-29': { hours: 1.5, streak: 3, completed: true },
    '2024-01-30': { hours: 2.5, streak: 4, completed: true },
    '2024-01-31': { hours: 2, streak: 5, completed: true },
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-12"></div>);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateKey = formatDate(date);
    const dayData = learningData[dateKey as keyof typeof learningData];
    const isToday = formatDate(new Date()) === dateKey;
    const isSelected = selectedDate && formatDate(selectedDate) === dateKey;

    days.push(
      <div
        key={day}
        className={`h-12 border rounded-lg p-1 cursor-pointer transition-all ${
          isToday ? 'ring-2 ring-[#08272a]' : ''
        } ${isSelected ? 'bg-[#e3ffcd]' : ''} ${
          dayData?.completed ? 'bg-gradient-to-br from-green-100 to-green-200' : 'bg-gray-50'
        } hover:bg-[#edf5ee]`}
        onClick={() => setSelectedDate(date)}
      >
        <div className="text-xs font-medium text-gray-700">{day}</div>
        {dayData?.completed && (
          <div className="text-xs text-green-700 font-bold">
            {dayData.hours}h
          </div>
        )}
        {dayData?.streak > 0 && (
          <div className="text-xs text-orange-600 font-bold">
            🔥{dayData.streak}
          </div>
        )}
      </div>
    );
  }

  const selectedDayData = selectedDate ? learningData[formatDate(selectedDate) as keyof typeof learningData] : null;

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100 text-[#08272a]"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold text-[#08272a]">{getMonthName(currentDate)}</h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100 text-[#08272a]"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        {days}
      </div>

      {/* Selected Day Info */}
      {selectedDate && selectedDayData && (
        <div className="bg-[#edf5ee] p-4 rounded-lg border border-[#e3ffcd]">
          <h4 className="font-semibold text-[#08272a] mb-2">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-[#08272a]/70">Learning Hours:</span>
              <div className="font-bold text-[#08272a]">{selectedDayData.hours} hours</div>
            </div>
            <div>
              <span className="text-sm text-[#08272a]/70">Streak:</span>
              <div className="font-bold text-[#08272a]">
                {selectedDayData.streak > 0 ? `🔥 ${selectedDayData.streak} days` : 'No streak'}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-[#08272a]/70">Status:</span>
            <div className={`font-bold ${selectedDayData.completed ? 'text-green-600' : 'text-red-600'}`}>
              {selectedDayData.completed ? '✅ Completed' : '❌ Missed'}
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-white rounded-lg border border-[#edf5ee]">
          <div className="text-2xl font-bold text-[#08272a]">7</div>
          <div className="text-sm text-[#08272a]/70">Current Streak</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-[#edf5ee]">
          <div className="text-2xl font-bold text-[#08272a]">15</div>
          <div className="text-sm text-[#08272a]/70">Days This Month</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-[#edf5ee]">
          <div className="text-2xl font-bold text-[#08272a]">42.5h</div>
          <div className="text-sm text-[#08272a]/70">Total Hours</div>
        </div>
      </div>
    </div>
  );
};

// AI Calculator Component
const AICalculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<Array<{ expression: string; result: string }>>([]);
  const [aiSuggestion, setAiSuggestion] = useState('');

  const calculate = () => {
    try {
      // Basic calculation (in real app, this would be more sophisticated)
      const calculatedResult = eval(expression);
      setResult(calculatedResult.toString());
      
      // Add to history
      setHistory(prev => [...prev, { expression, result: calculatedResult.toString() }]);
      
      // AI suggestion based on result
      if (calculatedResult > 1000) {
        setAiSuggestion('That\'s a large number! Consider breaking it down into smaller calculations.');
      } else if (calculatedResult < 0) {
        setAiSuggestion('Negative result detected. Check if this is expected for your calculation.');
      } else if (calculatedResult === 0) {
        setAiSuggestion('Result is zero. This might indicate a balanced equation or division by zero.');
      } else {
        setAiSuggestion('Calculation completed successfully! The result looks reasonable.');
      }
    } catch (error) {
      setResult('Error: Invalid expression');
      setAiSuggestion('Please check your expression. Make sure all brackets are closed and operators are valid.');
    }
  };

  const clearAll = () => {
    setExpression('');
    setResult('');
    setAiSuggestion('');
  };

  const addToExpression = (value: string) => {
    setExpression(prev => prev + value);
  };

  const backspace = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const quickCalculations = [
    { label: '15% Tip', calc: (val: string) => `${val} * 0.15`, icon: '💡' },
    { label: '20% Tip', calc: (val: string) => `${val} * 0.20`, icon: '💰' },
    { label: 'Double', calc: (val: string) => `${val} * 2`, icon: '⚡' },
    { label: 'Half', calc: (val: string) => `${val} / 2`, icon: '✂️' },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Display */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 shadow-inner">
        <div className="text-right space-y-2">
          <div className="text-sm text-gray-500 font-medium">Expression</div>
          <div className="text-xl font-mono text-[#08272a] min-h-[2rem] break-all">
            {expression || '0'}
          </div>
          <div className="text-sm text-gray-500 font-medium">Result</div>
          <div className="text-3xl font-bold text-[#08272a] min-h-[3rem]">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Enhanced AI Suggestion */}
      {aiSuggestion && (
        <div className="bg-gradient-to-r from-[#edf5ee] to-[#e3ffcd] p-4 rounded-xl border border-[#e3ffcd] shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🤖</div>
            <div className="flex-1">
              <div className="font-semibold text-[#08272a] mb-1">AI Insight</div>
              <p className="text-sm text-[#08272a]/80 leading-relaxed">{aiSuggestion}</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Quick Calculations */}
      <div className="grid grid-cols-2 gap-3">
        {quickCalculations.map((quick, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-12 text-sm border-[#08272a] text-[#08272a] hover:bg-[#edf5ee] hover:border-[#08272a]/80 transition-all duration-200 shadow-sm"
            onClick={() => {
              if (result && result !== 'Error: Invalid expression') {
                const newExpression = quick.calc(result);
                setExpression(newExpression);
                setResult('');
                setAiSuggestion('');
              }
            }}
          >
            <span className="mr-2">{quick.icon}</span>
            {quick.label}
          </Button>
        ))}
      </div>

      {/* Enhanced Calculator Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { value: '7', type: 'number' },
          { value: '8', type: 'number' },
          { value: '9', type: 'number' },
          { value: '/', type: 'operator' },
          { value: '4', type: 'number' },
          { value: '5', type: 'number' },
          { value: '6', type: 'number' },
          { value: '*', type: 'operator' },
          { value: '1', type: 'number' },
          { value: '2', type: 'number' },
          { value: '3', type: 'number' },
          { value: '-', type: 'operator' },
          { value: '0', type: 'number' },
          { value: '.', type: 'number' },
          { value: '=', type: 'equals' },
          { value: '+', type: 'operator' },
        ].map((btn) => (
          <Button
            key={btn.value}
            variant={btn.type === 'equals' ? 'default' : 'outline'}
            size="sm"
            className={`h-14 text-lg font-semibold transition-all duration-200 shadow-sm ${
              btn.type === 'equals' 
                ? 'bg-gradient-to-r from-[#08272a] to-[#08272a]/90 text-white hover:from-[#08272a]/90 hover:to-[#08272a] shadow-lg' 
                : btn.type === 'operator'
                ? 'border-[#08272a] text-[#08272a] hover:bg-[#e3ffcd] hover:border-[#08272a]/80 bg-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 bg-white'
            }`}
            onClick={() => {
              if (btn.value === '=') {
                calculate();
              } else {
                addToExpression(btn.value);
              }
            }}
          >
            {btn.value}
          </Button>
        ))}
      </div>

      {/* Enhanced Control Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-12 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-sm"
          onClick={clearAll}
        >
          <span className="mr-2">🗑️</span>
          Clear All
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-12 border-[#08272a] text-[#08272a] hover:bg-[#edf5ee] hover:border-[#08272a]/80 transition-all duration-200 shadow-sm"
          onClick={backspace}
        >
          <span className="mr-2">⌫</span>
          Backspace
        </Button>
      </div>

      {/* Enhanced History */}
      {history.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📊</span>
            <h4 className="font-semibold text-[#08272a]">Recent Calculations</h4>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {history.slice(-5).reverse().map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-sm text-gray-600 font-mono">{item.expression}</div>
                <div className="font-bold text-[#08272a] text-lg">= {item.result}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Features */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💡</span>
          <h5 className="font-semibold text-blue-800">Calculator Tips</h5>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use quick calculation buttons for common operations</li>
          <li>• AI will analyze your results and provide insights</li>
          <li>• History is automatically saved for your reference</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
