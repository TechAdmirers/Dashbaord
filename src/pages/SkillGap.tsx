
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMockData } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { Lightbulb } from 'lucide-react';

const { skillGapData } = generateMockData();

const SkillGap = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-deep-emerald-green">Skill Gap Analyzer</h1>
        <p className="text-gray-500 mt-2">AI-powered analysis of your current skills against your career goals.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-deep-emerald-green">Your Skill Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillGapData.radar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]}/>
                  <Radar name="Your Skills" dataKey="A" stroke="#08272a" fill="#08272a" fillOpacity={0.6} />
                  <Radar name="Target Role" dataKey="B" stroke="#a6ff75" fill="#e3ffcd" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-deep-emerald-green flex items-center gap-2">
                <Lightbulb className="text-light-neon-green"/>
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillGapData.suggestions.map((suggestion, i) => (
                <div key={i} className="p-3 bg-pastel-mint rounded-lg">
                  <h4 className="font-semibold text-deep-emerald-green">{suggestion.skill}</h4>
                  <p className="text-sm text-gray-600">{suggestion.recommendation}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillGap;
