import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Brain,
  BarChart3,
  Search,
  Edit,
  Eye,
  Trash2,
  User,
  Calendar,
  Clock,
  Globe,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
  ThumbsDown,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'video' | 'course' | 'quiz' | 'presentation' | 'infographic';
  status: 'draft' | 'review' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  aiScore: number;
  seoScore: number;
  content: string;
  aiGenerated: boolean;
  priority: 'low' | 'medium' | 'high';
}

const ContentManagement = () => {
  const [contents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Complete Guide to React Hooks',
      type: 'article',
      status: 'published',
      author: 'Sarah Johnson',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      tags: ['React', 'JavaScript', 'Frontend'],
      views: 15420,
      likes: 892,
      comments: 156,
      aiScore: 94,
      seoScore: 87,
      content: 'React Hooks have revolutionized how we write functional components...',
      aiGenerated: true,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals',
      type: 'course',
      status: 'review',
      author: 'Dr. Michael Chen',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-22',
      tags: ['AI', 'Machine Learning', 'Python'],
      views: 0,
      likes: 0,
      comments: 0,
      aiScore: 91,
      seoScore: 82,
      content: 'This comprehensive course covers the fundamentals of machine learning...',
      aiGenerated: true,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Advanced CSS Grid Techniques',
      type: 'video',
      status: 'draft',
      author: 'Alex Rodriguez',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-22',
      tags: ['CSS', 'Grid', 'Layout'],
      views: 0,
      likes: 0,
      comments: 0,
      aiScore: 88,
      seoScore: 79,
      content: 'Learn advanced CSS Grid techniques for modern web layouts...',
      aiGenerated: false,
      priority: 'low'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const [report, setReport] = useState<any | null>(null);

  const filteredContents = contents.filter(content => {
    return content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'archived': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleGenerateReport = () => {
    setReportLoading(true);
    setTimeout(() => {
      setReport({
        totalContent: 24,
        aiGenerated: 15,
        humanCreated: 9,
        mostPopular: 'Complete Guide to React Hooks',
        leastPopular: 'Advanced CSS Grid Techniques',
        avgCompletion: 78,
        engagementTrend: '+12%',
        recommendations: [
          'Add more interactive quizzes to "Machine Learning Fundamentals".',
          'Update outdated modules in "Advanced CSS Grid Techniques".',
          'Promote high-engagement content on the dashboard.',
          'Consider archiving content with low completion rates.'
        ],
      });
      setReportLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 p-6">
      {/* AI-Powered Report & Analytics Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-7 h-7 text-[#82c91e]" />
          <h2 className="text-2xl font-bold text-[#08272a]">AI-Powered Report & Analytics</h2>
        </div>
        <Button
          onClick={handleGenerateReport}
          disabled={reportLoading}
          className="bg-[#08272a] hover:bg-[#08272a]/90 text-white mb-4"
        >
          {reportLoading ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating Report...</>
          ) : (
            <>Generate AI Report</>
          )}
        </Button>
        {reportLoading && (
          <div className="flex items-center gap-2 text-[#08272a] font-medium mt-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            AI is analyzing your content and generating insights...
          </div>
        )}
        {report && !reportLoading && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-[#eaffd2] to-[#d6f5c6]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#08272a]">
                  <BarChart3 className="h-5 w-5 text-[#82c91e]" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-bold text-[#08272a]">
                  <FileText className="h-4 w-4" /> {report.totalContent} Total Content
                </div>
                <div className="flex items-center gap-2 text-[#08272a]">
                  <Brain className="h-4 w-4" /> {report.aiGenerated} AI-Generated
                </div>
                <div className="flex items-center gap-2 text-[#08272a]">
                  <CheckCircle className="h-4 w-4" /> {report.humanCreated} Human-Created
                </div>
                <div className="flex items-center gap-2 text-[#08272a]">
                  <TrendingUp className="h-4 w-4 text-green-600" /> Engagement Trend: <span className="font-bold">{report.engagementTrend}</span>
                </div>
                <div className="flex items-center gap-2 text-[#08272a]">
                  <ThumbsUp className="h-4 w-4 text-green-600" /> Avg. Completion: <span className="font-bold">{report.avgCompletion}%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-[#e3ffcd]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#08272a]">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Popularity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-[#08272a]">
                  <ThumbsUp className="h-4 w-4 text-green-600" /> Most Popular: <span className="font-bold">{report.mostPopular}</span>
                </div>
                <div className="flex items-center gap-2 text-[#08272a]">
                  <ThumbsDown className="h-4 w-4 text-red-600" /> Least Popular: <span className="font-bold">{report.leastPopular}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-[#e3ffcd]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#08272a]">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc ml-6 text-[#08272a] text-sm">
                  {report.recommendations.map((rec: string, i: number) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* AI Content Generator */}
        <div>
          <Card className="bg-gradient-to-br from-white to-[#e3ffcd] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#08272a]">
                <Brain className="text-[#08272a]" />
                AI Content Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#08272a] mb-2">Content Topic</label>
                <Input
                  placeholder="e.g., React Performance Optimization"
                  className="border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a]"
                />
              </div>
              <Button className="w-full bg-[#08272a] hover:bg-[#08272a]/90 text-white">
                Generate Content
              </Button>
            </CardContent>
          </Card>

          {/* Content Analytics */}
          <Card className="mt-6 bg-gradient-to-br from-white to-[#edf5ee] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#08272a]">
                <BarChart3 className="text-[#08272a]" />
                Content Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#08272a]">24</div>
                  <div className="text-sm text-[#08272a]/70">Total Content</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#08272a]">18</div>
                  <div className="text-sm text-[#08272a]/70">Published</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#08272a]">89.2%</div>
                  <div className="text-sm text-[#08272a]/70">Avg AI Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#08272a]">15.4K</div>
                  <div className="text-sm text-[#08272a]/70">Total Views</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#08272a]">Content Overview</h2>
                <Button className="bg-[#08272a] hover:bg-[#08272a]/90 text-white">
                  New Content
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search content..."
                  className="pl-10 border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a]"
                />
              </div>

              {/* Content List */}
              <div className="space-y-4">
                {filteredContents.map((content) => (
                  <div 
                    key={content.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer border-gray-200 hover:border-[#08272a]/50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="p-2 rounded-lg bg-[#e3ffcd] text-[#08272a] flex-shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2 min-w-0">
                            <h3 className="font-semibold text-[#08272a] text-base sm:text-lg truncate w-full sm:w-auto">
                              {content.title}
                            </h3>
                            <Badge className={getStatusColor(content.status)}>
                              {content.status}
                            </Badge>
                            <Badge className={getPriorityColor(content.priority)}>
                              {content.priority}
                            </Badge>
                            {content.aiGenerated && (
                              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                <Brain className="h-3 w-3 mr-1" />
                                AI
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {content.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {content.updatedAt}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {content.views.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-4 w-4 text-green-600" />
                              AI: {content.aiScore}%
                            </div>
                            <div className="flex items-center gap-1">
                              <Globe className="h-4 w-4 text-blue-600" />
                              SEO: {content.seoScore}%
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4 text-yellow-600" />
                              {content.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4 text-purple-600" />
                              {content.comments}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2 sm:gap-2 w-full sm:w-auto justify-end">
                        <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50 w-full sm:w-auto">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 w-full sm:w-auto">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement; 