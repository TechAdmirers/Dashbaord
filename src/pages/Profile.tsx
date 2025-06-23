import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sparkles, User, Mail, Edit3, CheckCircle, Phone, MapPin, Linkedin, Globe, Award, BookOpen, Flame } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const Profile = () => {
  const { user } = useUser();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#edf5ee] p-0 sm:p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto space-y-8">
        {/* Banner/Cover */}
        <div className="relative h-36 sm:h-48 rounded-2xl overflow-hidden mb-[-64px] sm:mb-[-72px] shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-[#e3ffcd] to-[#edf5ee]" />
          <img src="/public/placeholder.svg" alt="Banner" className="w-full h-full object-cover opacity-20" />
        </div>
        <Card className="bg-white shadow-xl rounded-2xl p-6 pt-16 relative z-10">
          <div className="absolute left-1/2 -top-16 sm:-top-20 -translate-x-1/2 z-20">
            <Avatar className="w-32 h-32 border-4 border-[#e3ffcd] shadow-xl">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || user?.username || 'User'} />
              <AvatarFallback className="bg-[#08272a] text-white text-4xl">
                {user?.firstName?.[0] || user?.username?.[0] || '?'}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardHeader className="flex flex-col items-center gap-2 pb-4 mt-8">
            <CardTitle className="text-3xl font-bold text-[#08272a] flex items-center gap-2">
              <User className="h-7 w-7 text-[#e3ffcd]" />
              {user?.fullName || user?.username || 'User'}
            </CardTitle>
            <div className="flex items-center gap-2 text-[#08272a]">
              <Mail className="h-5 w-5" />
              <span>{user?.primaryEmailAddress?.emailAddress || 'No email'}</span>
            </div>
            <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2 mt-2">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Learner
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6 mt-2">
            {/* You can add more Clerk user info here if needed */}
          </CardContent>
        </Card>
        {/* Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-[#e3ffcd] border border-[#08272a] shadow-lg rounded-2xl p-4 flex flex-col items-center">
            <BookOpen className="h-8 w-8 text-[#08272a] mb-2" />
            <span className="text-2xl font-bold text-[#08272a]">12</span>
            <span className="text-[#08272a] text-sm">Courses Completed</span>
          </Card>
          <Card className="bg-[#e3ffcd] border border-[#08272a] shadow-lg rounded-2xl p-4 flex flex-col items-center">
            <Award className="h-8 w-8 text-[#08272a] mb-2" />
            <span className="text-2xl font-bold text-[#08272a]">3</span>
            <span className="text-[#08272a] text-sm">AI Badges</span>
          </Card>
          <Card className="bg-[#e3ffcd] border border-[#08272a] shadow-lg rounded-2xl p-4 flex flex-col items-center">
            <Flame className="h-8 w-8 text-[#08272a] mb-2" />
            <span className="text-2xl font-bold text-[#08272a]">7</span>
            <span className="text-[#08272a] text-sm">Day Streak</span>
          </Card>
        </div>
        <Card className="bg-[#e3ffcd] border border-[#08272a] shadow-lg rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#08272a]">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 text-[#08272a] space-y-2">
              <li>Completed "React Advanced" course</li>
              <li>Earned "AI Innovator" badge</li>
              <li>Updated profile bio</li>
              <li>Logged in 2 days ago</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
