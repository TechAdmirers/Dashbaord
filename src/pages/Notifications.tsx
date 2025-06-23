import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Info, 
  Star, 
  BookOpen, 
  Trophy, 
  MessageSquare, 
  Zap,
  Trash2,
  Archive,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  type: 'achievement' | 'course' | 'reminder' | 'streak' | 'feedback' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  archived: boolean;
  priority: 'high' | 'medium' | 'low';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'Congratulations! You\'ve earned the "JavaScript Master" badge for completing 50 JavaScript exercises.',
      time: '2 minutes ago',
      read: false,
      archived: false,
      priority: 'high',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 2,
      type: 'course',
      title: 'New Course Available',
      message: 'Advanced React Patterns course is now available for enrollment. Learn advanced concepts like HOCs, Render Props, and Custom Hooks.',
      time: '1 hour ago',
      read: false,
      archived: false,
      priority: 'medium',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Study Reminder',
      message: 'You have a scheduled study session in 30 minutes. Don\'t forget to review your React fundamentals!',
      time: '2 hours ago',
      read: true,
      archived: false,
      priority: 'high',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 4,
      type: 'streak',
      title: 'Streak Milestone!',
      message: 'You\'ve maintained a 7-day learning streak! Keep up the momentum and unlock more achievements.',
      time: '3 hours ago',
      read: true,
      archived: false,
      priority: 'medium',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 5,
      type: 'feedback',
      title: 'AI Feedback Ready',
      message: 'Your latest assessment feedback is ready for review. Check out personalized recommendations for improvement.',
      time: '5 hours ago',
      read: true,
      archived: false,
      priority: 'medium',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 6,
      type: 'system',
      title: 'System Update',
      message: 'New features have been added to your learning dashboard including enhanced analytics and progress tracking.',
      time: '1 day ago',
      read: true,
      archived: false,
      priority: 'low',
      icon: Info,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: 7,
      type: 'achievement',
      title: 'Course Completion',
      message: 'Great job! You\'ve completed the "React Basics" course with a score of 95%.',
      time: '2 days ago',
      read: true,
      archived: true,
      priority: 'high',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 8,
      type: 'course',
      title: 'Course Recommendation',
      message: 'Based on your learning history, we recommend "Advanced JavaScript Concepts" as your next course.',
      time: '3 days ago',
      read: true,
      archived: true,
      priority: 'medium',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && !n.archived).length;
  const archivedCount = notifications.filter(n => n.archived).length;

  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || notification.type === activeTab;
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArchived = showArchived ? notification.archived : !notification.archived;
    
    return matchesTab && matchesSearch && matchesArchived;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const archiveNotification = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, archived: true } : n
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleSelection = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(n => n !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id));
  };

  const clearSelection = () => {
    setSelectedNotifications([]);
  };

  const bulkAction = (action: 'read' | 'archive' | 'delete') => {
    setNotifications(prev => {
      switch (action) {
        case 'read':
          return prev.map(n => selectedNotifications.includes(n.id) ? { ...n, read: true } : n);
        case 'archive':
          return prev.map(n => selectedNotifications.includes(n.id) ? { ...n, archived: true } : n);
        case 'delete':
          return prev.filter(n => !selectedNotifications.includes(n.id));
        default:
          return prev;
      }
    });
    setSelectedNotifications([]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-[#08272a] mb-2">Notifications Center</h1>
        <p className="text-[#08272a]/80 text-lg mb-2">Stay updated with your learning progress, achievements, and important updates.</p>
        <div className="flex items-center gap-3 mt-2">
          <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2">
            {unreadCount} Unread
          </Badge>
          <Badge className="bg-[#edf5ee] text-[#08272a] border border-[#edf5ee] px-4 py-2">
            {archivedCount} Archived
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters and Actions */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
          <Card className="bg-gradient-to-br from-white to-[#e3ffcd] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#08272a]">
                <Filter className="text-[#08272a]" />
                Filters & Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#08272a] mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notifications..."
                    className="pl-10 border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#08272a] mb-2">Show Archived</label>
                <Button
                  variant={showArchived ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowArchived(!showArchived)}
                  className="w-full"
                >
                  {showArchived ? 'Hide Archived' : 'Show Archived'}
                </Button>
              </div>

              {selectedNotifications.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-[#08272a] font-medium">
                    {selectedNotifications.length} selected
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => bulkAction('read')}
                      className="flex-1 bg-[#08272a] hover:bg-[#08272a]/90"
                    >
                      Mark Read
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => bulkAction('archive')}
                      className="flex-1"
                    >
                      Archive
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => bulkAction('delete')}
                    className="w-full"
                  >
                    Delete
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Button
                  onClick={markAllAsRead}
                  className="w-full bg-[#08272a] hover:bg-[#08272a]/90"
                >
                  Mark All as Read
                </Button>
                <Button
                  variant="outline"
                  onClick={selectAll}
                  className="w-full"
                >
                  Select All
                </Button>
                <Button
                  variant="ghost"
                  onClick={clearSelection}
                  className="w-full"
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications List */}
        <div className="lg:col-span-3 mt-8 lg:mt-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 bg-[#edf5ee]">
                    <TabsTrigger value="all" className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a]">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="achievement" className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a]">
                      🏆
                    </TabsTrigger>
                    <TabsTrigger value="course" className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a]">
                      📚
                    </TabsTrigger>
                    <TabsTrigger value="reminder" className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a] hidden sm:block">
                      ⏰
                    </TabsTrigger>
                    <TabsTrigger value="streak" className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a] hidden sm:block">
                      🔥
                    </TabsTrigger>
                    <TabsTrigger value="feedback" className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a] hidden sm:block">
                      💬
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
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
                          <div className={`p-4 sm:p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''} ${notification.archived ? 'opacity-60' : ''}`}>
                            <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                <input
                                  type="checkbox"
                                  checked={selectedNotifications.includes(notification.id)}
                                  onChange={() => toggleSelection(notification.id)}
                                  className="mt-1 sm:mt-2"
                                />
                                <div className={`p-3 rounded-full ${notification.bgColor} ${notification.borderColor} border`}>
                                  <notification.icon className={`h-5 w-5 ${notification.color}`} />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0 w-full">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <span className="font-semibold text-[#08272a] text-base break-words">{notification.title}</span>
                                      <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                                    </div>
                                    <p className="text-sm text-[#08272a]/80 break-words mb-1">{notification.message}</p>
                                    <span className="text-xs text-[#08272a]/50">{notification.time}</span>
                                  </div>
                                  <div className="flex gap-2 mt-2 sm:mt-0">
                                    <Button size="sm" variant="outline" className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]">
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-[#edf5ee] text-[#08272a] hover:bg-[#edf5ee]">
                                      <Archive className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" className="border-[#edf5ee]">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-[#08272a]/60">No notifications found.</div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 