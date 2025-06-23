import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon, Bell, UserCog, Lock, Globe, Eye, Download, Trash2, Volume2, Text, FastForward } from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [email, setEmail] = useState('user@email.com');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const [privacy, setPrivacy] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [videoSpeed, setVideoSpeed] = useState('1.0');
  const [accessibility, setAccessibility] = useState({ highContrast: false, screenReader: false });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#edf5ee] p-0 sm:p-6 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Account Settings */}
        <Card className="bg-white shadow-xl rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#08272a] flex items-center gap-2">
              <UserCog className="h-6 w-6 text-[#e3ffcd]" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#08272a] font-semibold mb-1">Email</label>
              <Input
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-[#e3ffcd]/30 border border-[#e3ffcd] text-[#08272a] rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[#08272a] font-semibold mb-1">Change Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-[#e3ffcd]/30 border border-[#e3ffcd] text-[#08272a] rounded-lg"
                placeholder="New password"
              />
            </div>
          </CardContent>
        </Card>
        {/* Notification Preferences */}
        <Card className="bg-white shadow-xl rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#08272a] flex items-center gap-2">
              <Bell className="h-6 w-6 text-[#e3ffcd]" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">Email</span>
              <Switch checked={notifications.email} onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))} />
              <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd]">{notifications.email ? 'On' : 'Off'}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">SMS</span>
              <Switch checked={notifications.sms} onCheckedChange={v => setNotifications(n => ({ ...n, sms: v }))} />
              <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd]">{notifications.sms ? 'On' : 'Off'}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">Push</span>
              <Switch checked={notifications.push} onCheckedChange={v => setNotifications(n => ({ ...n, push: v }))} />
              <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd]">{notifications.push ? 'On' : 'Off'}</Badge>
            </div>
          </CardContent>
        </Card>
        {/* Theme & Language */}
        <Card className="bg-white shadow-xl rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#08272a] flex items-center gap-2">
              <Sun className="h-6 w-6 text-[#e3ffcd]" />
              Theme & Language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">Theme</span>
              <Button
                type="button"
                className={`flex items-center gap-2 ${theme === 'light' ? 'bg-[#e3ffcd] text-[#08272a]' : 'bg-[#08272a] text-white'}`}
                onClick={() => setTheme('light')}
              >
                <Sun className="h-5 w-5" /> Light
              </Button>
              <Button
                type="button"
                className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-[#e3ffcd] text-[#08272a]' : 'bg-[#08272a] text-white'}`}
                onClick={() => setTheme('dark')}
              >
                <Moon className="h-5 w-5" /> Dark
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">Language</span>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="bg-[#e3ffcd]/30 border border-[#e3ffcd] text-[#08272a] rounded-lg px-3 py-2"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
                <option value="hi">Hindi</option>
              </select>
              <Globe className="h-5 w-5 text-[#08272a]" />
            </div>
          </CardContent>
        </Card>
        {/* Privacy & Accessibility */}
        <Card className="bg-white shadow-xl rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#08272a] flex items-center gap-2">
              <Eye className="h-6 w-6 text-[#e3ffcd]" />
              Privacy & Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">Profile Visibility</span>
              <Switch checked={privacy} onCheckedChange={setPrivacy} />
              <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd]">{privacy ? 'Public' : 'Private'}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">High Contrast</span>
              <Switch checked={accessibility.highContrast} onCheckedChange={v => setAccessibility(a => ({ ...a, highContrast: v }))} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">Screen Reader</span>
              <Switch checked={accessibility.screenReader} onCheckedChange={v => setAccessibility(a => ({ ...a, screenReader: v }))} />
            </div>
          </CardContent>
        </Card>
        {/* Learning Preferences */}
        <Card className="bg-white shadow-xl rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#08272a] flex items-center gap-2">
              <Text className="h-6 w-6 text-[#e3ffcd]" />
              Learning Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">Font Size</span>
              <select
                value={fontSize}
                onChange={e => setFontSize(e.target.value)}
                className="bg-[#e3ffcd]/30 border border-[#e3ffcd] text-[#08272a] rounded-lg px-3 py-2"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#08272a] font-semibold">Video Speed</span>
              <select
                value={videoSpeed}
                onChange={e => setVideoSpeed(e.target.value)}
                className="bg-[#e3ffcd]/30 border border-[#e3ffcd] text-[#08272a] rounded-lg px-3 py-2"
              >
                <option value="0.75">0.75x</option>
                <option value="1.0">1x (Normal)</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2.0">2x</option>
              </select>
              <FastForward className="h-5 w-5 text-[#08272a]" />
            </div>
          </CardContent>
        </Card>
        {/* Data Management */}
        <Card className="bg-white shadow-xl rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#08272a] flex items-center gap-2">
              <Download className="h-6 w-6 text-[#e3ffcd]" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-[#08272a] text-white hover:bg-[#08272a]/90 flex items-center gap-2"><Download className="h-4 w-4" /> Export Data</Button>
            <Button className="w-full bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"><Trash2 className="h-4 w-4" /> Delete Account</Button>
          </CardContent>
        </Card>
      </div>
      <div className="max-w-2xl w-full mx-auto mt-8">
        <Button onClick={handleSave} className="w-full bg-[#08272a] text-white hover:bg-[#08272a]/90">Save All Settings</Button>
        {saved && <span className="text-green-600 flex items-center gap-1 mt-2">Settings saved!</span>}
      </div>
    </div>
  );
};

export default Settings;
