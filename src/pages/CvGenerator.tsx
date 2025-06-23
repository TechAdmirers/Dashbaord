import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateMockData } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const { user } = generateMockData();

const CvGenerator = () => {
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    bio: user.bio,
    experience: "Software Engineer at TechCorp (2022-Present)\n- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to deliver high-quality software.",
    education: "B.Sc. in Computer Science - University of Technology (2018-2022)",
    skills: "JavaScript, React, Node.js, TypeScript, HTML, CSS, SQL"
  });
  
  const [isGenerated, setIsGenerated] = useState(false);
  const [aiSummary, setAiSummary] = useState<null | {
    atsScore: number;
    improvementAreas: string[];
    summary: string;
  }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  // Demo CV autofill
  const handleDemo = () => {
    setFormData({
      fullName: 'Jordan Smith',
      email: 'jordan.smith@email.com',
      bio: 'Results-driven software engineer with 3+ years of experience in full-stack development. Passionate about building scalable web applications and leading agile teams.',
      experience: 'Frontend Developer at Webify (2021-Present)\n- Built responsive UIs with React and Tailwind CSS.\n- Improved site performance by 30%.\nBackend Developer at DataCore (2019-2021)\n- Developed REST APIs with Node.js and Express.\n- Designed and optimized SQL databases.',
      education: 'B.Tech in Information Technology - Tech University (2015-2019)',
      skills: 'JavaScript, React, Node.js, Express, SQL, HTML, CSS, Git, Agile'
    });
    setIsGenerated(false);
    setAiSummary(null);
  };

  // AI analysis (mocked)
  const analyzeCV = (data: typeof formData) => {
    // Simple mock logic for demo
    const atsScore = 82;
    const improvementAreas = [
      'Add more quantifiable achievements',
      'Include a professional summary',
      'Highlight leadership or teamwork skills'
    ];
    const summary = `This CV demonstrates strong technical skills in JavaScript, React, and Node.js, with experience in both frontend and backend roles. The candidate has a solid educational background and relevant work experience. To improve ATS-friendliness, consider adding more measurable results and a brief professional summary at the top.`;
    setAiSummary({ atsScore, improvementAreas, summary });
  };

  const handleGenerate = () => {
    setIsGenerated(true);
    analyzeCV(formData);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(formData.fullName, 20, 20);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(formData.email, 20, 30);
    let y = 40;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Summary', 20, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const bioLines = doc.splitTextToSize(formData.bio, 170);
    doc.text(bioLines, 20, y);
    y += bioLines.length * 7 + 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Experience', 20, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const expLines = formData.experience.split('\n');
    expLines.forEach(line => {
      if (line.startsWith('-')) {
        doc.text(`• ${line.substring(1).trim()}`, 25, y);
        y += 7;
      } else {
        doc.setFont('helvetica', 'bold');
        doc.text(line, 20, y);
        doc.setFont('helvetica', 'normal');
        y += 7;
      }
    });
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Education', 20, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const eduLines = doc.splitTextToSize(formData.education, 170);
    doc.text(eduLines, 20, y);
    y += eduLines.length * 7 + 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Skills', 20, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    // Show skills as a comma-separated line
    doc.text(formData.skills.split(',').map(s => s.trim()).join(', '), 20, y);
    doc.save(`${formData.fullName.replace(/\s+/g, '_')}_CV.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#edf5ee] p-0 sm:p-6 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-h-[700px]">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="min-h-[700px] flex flex-col">
          <Card className="bg-white shadow-xl rounded-2xl min-h-[700px] flex flex-col justify-between flex-1">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#08272a] flex items-center gap-2">
                <FileText />
                CV Generator
              </CardTitle>
              <p className="text-[#08272a] mt-2 text-base">Create a professional CV in seconds. Fill out your details and preview your CV instantly!</p>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={formData.fullName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="bio">Bio / Summary</Label>
                <Textarea id="bio" value={formData.bio} onChange={handleInputChange} rows={4} />
              </div>
              <div>
                <Label htmlFor="experience">Work Experience</Label>
                <Textarea id="experience" value={formData.experience} onChange={handleInputChange} rows={5} />
              </div>
              <div>
                <Label htmlFor="education">Education</Label>
                <Input id="education" value={formData.education} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input id="skills" value={formData.skills} onChange={handleInputChange} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleGenerate} className="w-full bg-[#08272a] hover:bg-[#08272a]/90 text-white">Generate CV Preview</Button>
                <Button onClick={handleDemo} type="button" variant="outline" className="w-full border-[#08272a] text-[#08272a] hover:bg-[#e3ffcd]">Demo CV</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <div className="flex flex-col gap-6 min-h-[700px] flex-1">
          <AnimatePresence>
            {isGenerated && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6 min-h-[700px] flex-1">
                <Card className="bg-white shadow-2xl rounded-2xl border border-[#e3ffcd] min-h-[700px] flex flex-col flex-1">
                  <CardHeader className="flex flex-row justify-between items-center border-b border-[#e3ffcd] pb-2">
                    <CardTitle className="text-2xl font-bold text-[#08272a]">CV Preview</CardTitle>
                    <Button onClick={handleDownload} variant="outline" className="border-[#08272a] text-[#08272a] hover:bg-[#e3ffcd]">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 font-['Poppins'] flex-1">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold text-[#08272a]">{formData.fullName}</h1>
                      <p className="text-[#08272a] text-lg font-medium">{formData.email}</p>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-bold text-[#e3ffcd] bg-[#08272a] px-3 py-1 rounded inline-block mb-2">Summary</h2>
                      <p className="text-[#08272a] text-base leading-relaxed">{formData.bio}</p>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-bold text-[#e3ffcd] bg-[#08272a] px-3 py-1 rounded inline-block mb-2">Experience</h2>
                      <div className="space-y-1">
                        {formData.experience.split('\n').map((line, i) =>
                          line.startsWith('-') ? (
                            <div key={i} className="flex items-start ml-6">
                              <span className="text-[#08272a] mr-2 mt-1">•</span>
                              <span className="text-[#08272a]">{line.substring(1).trim()}</span>
                            </div>
                          ) : (
                            <div key={i} className="font-semibold text-[#08272a]">{line}</div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-bold text-[#e3ffcd] bg-[#08272a] px-3 py-1 rounded inline-block mb-2">Education</h2>
                      <p className="text-[#08272a] text-base">{formData.education}</p>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-bold text-[#e3ffcd] bg-[#08272a] px-3 py-1 rounded inline-block mb-2">Skills</h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.split(',').map((skill, i) => (
                          <span key={i} className="bg-[#e3ffcd] text-[#08272a] px-3 py-1 rounded-full text-sm font-semibold shadow">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* AI Analysis Panel */}
                {aiSummary && (
                  <Card className="mt-6 bg-[#e3ffcd] border border-[#08272a] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-[#08272a] flex items-center gap-2">AI CV Analysis & ATS Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-[#08272a]">ATS-Friendly Score:</span>
                          <span className="text-2xl font-extrabold text-[#08272a]">{aiSummary.atsScore}%</span>
                        </div>
                        <div className="mt-2">
                          <span className="font-semibold text-[#08272a]">Improvement Areas:</span>
                          <ul className="list-disc ml-6 text-[#08272a]">
                            {aiSummary.improvementAreas.map((area, i) => (
                              <li key={i}>{area}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-2">
                          <span className="font-semibold text-[#08272a]">AI Summary:</span>
                          <p className="text-[#08272a] mt-1">{aiSummary.summary}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {!isGenerated && (
            <div className="flex items-center justify-center h-full min-h-[700px] border-2 border-dashed rounded-lg bg-[#e3ffcd]/30 flex-1">
              <div className="text-center text-[#08272a]/60">
                <FileText size={48} className="mx-auto" />
                <p className="mt-2 font-semibold">Your CV preview will appear here.</p>
                <p className="text-sm">Fill out the form and click "Generate".</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CvGenerator;

