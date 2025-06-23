import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Brain, Target, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AnalysisResult {
  overallScore: number;
  categories: {
    content: number;
    formatting: number;
    keywords: number;
    experience: number;
    skills: number;
  };
  suggestions: string[];
  strengths: string[];
  improvements: string[];
  aiInsights: string[];
}

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Demo resume autofill
  const handleDemo = () => {
    setResumeText(`Jordan Smith
Frontend Developer at Webify (2021-Present)
- Built responsive UIs with React and Tailwind CSS.
- Improved site performance by 30%.
Backend Developer at DataCore (2019-2021)
- Developed REST APIs with Node.js and Express.
- Designed and optimized SQL databases.
B.Tech in Information Technology - Tech University (2015-2019)
Skills: JavaScript, React, Node.js, Express, SQL, HTML, CSS, Git, Agile`);
    setAnalysis(null);
  };

  const analyzeResume = () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        overallScore: 82,
        categories: {
          content: 85,
          formatting: 80,
          keywords: 78,
          experience: 88,
          skills: 75,
        },
        suggestions: [
          'Add more quantified achievements with specific metrics',
          'Include relevant industry keywords for ATS optimization',
          'Enhance the professional summary section',
        ],
        strengths: [
          'Well-structured professional experience',
          'Clear and concise bullet points',
          'Relevant educational background',
        ],
        improvements: [
          'Expand skills section',
          'Add measurable results',
        ],
        aiInsights: [
          'Your resume shows strong technical foundation',
          'Consider highlighting leadership experiences',
          'ATS compatibility score: 82%'
        ]
      };
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const categoryData = analysis ? Object.entries(analysis.categories).map(([key, value]) => ({
    category: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
    fullMark: 100
  })) : [];

  const scoreDistribution = analysis ? [
    { name: 'Excellent', value: analysis.overallScore > 90 ? 1 : 0, color: '#22c55e' },
    { name: 'Good', value: analysis.overallScore > 70 ? 1 : 0, color: '#84cc16' },
    { name: 'Average', value: analysis.overallScore > 50 ? 1 : 0, color: '#f59e0b' },
    { name: 'Needs Work', value: analysis.overallScore <= 50 ? 1 : 0, color: '#ef4444' },
  ] : [];

  const improvementData = analysis ? [
    { area: 'Content', current: analysis.categories.content, target: 95 },
    { area: 'Format', current: analysis.categories.formatting, target: 90 },
    { area: 'Keywords', current: analysis.categories.keywords, target: 85 },
    { area: 'Experience', current: analysis.categories.experience, target: 92 },
    { area: 'Skills', current: analysis.categories.skills, target: 88 },
  ] : [];

  return (
    <div className="min-h-screen bg-[#edf5ee] p-0 sm:p-6 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="min-h-[600px]">
          <Card className="bg-white shadow-xl rounded-2xl min-h-[600px] flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#08272a] flex items-center gap-2">
                <FileText />
                Resume Analyzer
              </CardTitle>
              <p className="text-[#08272a] mt-2 text-base">Paste your resume below and get instant AI-powered feedback and ATS score.</p>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <Textarea
                id="resume"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="min-h-[300px] resize-none bg-[#e3ffcd]/30 text-[#08272a] border border-[#e3ffcd] rounded-lg"
              />
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button 
                  onClick={analyzeResume}
                  disabled={!resumeText.trim() || isAnalyzing}
                  className="w-full bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Target className="mr-2 h-4 w-4" />
                      Analyze Resume
                    </>
                  )}
                </Button>
                <Button onClick={handleDemo} type="button" variant="outline" className="w-full border-[#08272a] text-[#08272a] hover:bg-[#e3ffcd]">Demo Resume</Button>
                <Dialog open={showPreview} onOpenChange={setShowPreview}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" className="w-full border-[#08272a] text-[#08272a] hover:bg-[#e3ffcd]">Preview Resume</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#ffffff] border-[#e3ffcd] max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#08272a]">Resume Preview</DialogTitle>
                    </DialogHeader>
                    <div className="p-4 bg-[#edf5ee] rounded-lg shadow-inner max-h-[70vh] overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-[#08272a] font-['Poppins'] text-base leading-relaxed">{resumeText || 'Paste your resume to preview.'}</pre>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Analysis Results */}
        <div className="flex flex-col gap-6 min-h-[600px]">
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6 min-h-[600px]">
                <Card className="bg-white shadow-2xl rounded-2xl border border-[#e3ffcd] min-h-[600px] flex flex-col items-center justify-center">
                  <CardContent className="flex flex-col items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-[#08272a]"></div>
                    <Brain className="absolute mt-[-60px] h-10 w-10 text-[#08272a] animate-pulse" />
                    <p className="text-lg font-medium text-[#08272a] mt-8">AI is analyzing your resume...</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {analysis && !isAnalyzing && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6 min-h-[600px]">
                <Card className="bg-white shadow-2xl rounded-2xl border border-[#e3ffcd] min-h-[600px] flex flex-col">
                  <CardHeader className="border-b border-[#e3ffcd] pb-2">
                    <CardTitle className="text-2xl font-bold text-[#08272a] flex items-center gap-2">
                      <TrendingUp />
                      Analysis Results
                      <Badge className="ml-auto bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd]">AI Generated</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 font-['Poppins'] flex-1">
                    {/* ATS Score Summary */}
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-lg font-bold text-[#08272a]">ATS-Friendly Score:</span>
                        <span className="text-2xl font-extrabold text-[#08272a]">{analysis.overallScore}%</span>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {Object.entries(analysis.categories).map(([cat, score]) => (
                          <span key={cat} className="bg-[#e3ffcd] text-[#08272a] px-3 py-1 rounded-full text-sm font-semibold shadow">
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}: {score}%
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Strengths & Improvements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-[#08272a] mb-2 flex items-center gap-2"><CheckCircle className="text-[#08272a]" /> Strengths</h3>
                        <ul className="list-disc ml-6 text-[#08272a]">
                          {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#08272a] mb-2 flex items-center gap-2"><AlertCircle className="text-[#08272a]" /> Improvements</h3>
                        <ul className="list-disc ml-6 text-[#08272a]">
                          {analysis.improvements.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                    </div>
                    {/* Suggestions */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-[#08272a] mb-2 flex items-center gap-2"><Zap className="text-[#08272a]" /> Suggestions</h3>
                      <ul className="list-disc ml-6 text-[#08272a]">
                        {analysis.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    {/* AI Summary */}
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-[#08272a] mb-2 flex items-center gap-2"><Brain className="text-[#08272a]" /> AI Summary</h3>
                      <ul className="list-disc ml-6 text-[#08272a]">
                        {analysis.aiInsights.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
