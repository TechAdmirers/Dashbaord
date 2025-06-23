import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Languages, Search, Clock, Globe, Check, Star, 
  ArrowRight, Settings, RefreshCw, BookOpen, Brain,
  Zap, Target, Calendar, Trophy, Bot, Mic, Map,
  FileText, GaugeCircle, Radar, MessageSquare, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, t, languages, recentlyUsed } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recent');

  // Filter languages based on search query
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return languages;
    
    return languages.filter(lang => 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [languages, searchQuery]);

  // Get recently used languages
  const recentLanguages = useMemo(() => {
    return languages.filter(lang => recentlyUsed.includes(lang.code));
  }, [languages, recentlyUsed]);

  // Handle language change
  const handleLanguageChange = (languageCode: string) => {
    try {
      setLanguage(languageCode);
      toast({
        title: t('language.changeSuccess'),
        description: `${languages.find(lang => lang.code === languageCode)?.name} ${t('common.success')}`,
      });
    } catch (error) {
      toast({
        title: t('language.changeError'),
        description: t('common.error'),
        variant: 'destructive',
      });
    }
  };

  // Get current language info
  const currentLangInfo = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#08272a] mb-2">
              {t('language.title')}
            </h1>
            <p className="text-[#08272a]/80 text-lg">
              {t('language.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-[#e3ffcd] text-[#08272a] border border-[#e3ffcd] px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              {t('language.current')}
            </Badge>
            <div className="flex items-center gap-2 bg-[#edf5ee] px-4 py-2 rounded-lg">
              <span className="text-2xl">{currentLangInfo?.flag}</span>
              <span className="font-semibold text-[#08272a]">{currentLangInfo?.nativeName}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Language Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Language Browser */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-white to-[#e3ffcd] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#08272a]">
                <Globe className="h-5 w-5" />
                {t('language.select')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#08272a]/50 h-4 w-4" />
                <Input
                  placeholder={t('language.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#edf5ee] focus:border-[#08272a] focus:ring-[#08272a] text-[#08272a]"
                />
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-[#edf5ee]">
                  <TabsTrigger 
                    value="recent" 
                    className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a]"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {t('language.recentlyUsed')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a]"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {t('language.allLanguages')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="auto" 
                    className="data-[state=active]:bg-[#e3ffcd] data-[state=active]:text-[#08272a]"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {t('language.autoDetect')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentLanguages.length > 0 ? (
                      recentLanguages.map((lang) => (
                        <motion.div
                          key={lang.code}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            currentLanguage === lang.code
                              ? 'border-[#08272a] bg-[#e3ffcd]'
                              : 'border-[#edf5ee] bg-white hover:border-[#08272a]/50'
                          }`}
                          onClick={() => handleLanguageChange(lang.code)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{lang.flag}</span>
                              <div>
                                <h3 className="font-semibold text-[#08272a]">{lang.nativeName}</h3>
                                <p className="text-sm text-[#08272a]/70">{lang.name}</p>
                              </div>
                            </div>
                            {currentLanguage === lang.code && (
                              <Check className="h-5 w-5 text-[#08272a]" />
                            )}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 text-[#08272a]/60">
                        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>{t('language.recentlyUsed')} - {t('common.no')} {t('language.recentlyUsed').toLowerCase()}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {filteredLanguages.map((lang) => (
                      <motion.div
                        key={lang.code}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          currentLanguage === lang.code
                            ? 'border-[#08272a] bg-[#e3ffcd]'
                            : 'border-[#edf5ee] bg-white hover:border-[#08272a]/50'
                        }`}
                        onClick={() => handleLanguageChange(lang.code)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{lang.flag}</span>
                            <div>
                              <h3 className="font-semibold text-[#08272a]">{lang.nativeName}</h3>
                              <p className="text-sm text-[#08272a]/70">{lang.name}</p>
                            </div>
                          </div>
                          {currentLanguage === lang.code && (
                            <Check className="h-5 w-5 text-[#08272a]" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="auto" className="mt-6">
                  <div className="text-center py-8">
                    <Settings className="h-16 w-16 mx-auto mb-4 text-[#08272a]/50" />
                    <h3 className="text-lg font-semibold text-[#08272a] mb-2">
                      {t('language.autoDetect')}
                    </h3>
                    <p className="text-[#08272a]/70 mb-4">
                      Automatically detect your preferred language based on your browser settings.
                    </p>
                    <Button
                      onClick={() => {
                        const browserLanguage = navigator.language.split('-')[0];
                        const detectedLanguage = languages.find(lang => lang.code === browserLanguage)?.code || 'en';
                        handleLanguageChange(detectedLanguage);
                      }}
                      className="bg-[#08272a] hover:bg-[#08272a]/90 text-white"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Detect Language
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Language Preview */}
        <div className="space-y-6">
          {/* Current Language Info */}
          <Card className="bg-gradient-to-br from-white to-[#edf5ee] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#08272a]">
                <Star className="h-5 w-5" />
                Current Language
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-[#e3ffcd] rounded-lg">
                <span className="text-3xl">{currentLangInfo?.flag}</span>
                <div>
                  <h3 className="font-bold text-[#08272a]">{currentLangInfo?.nativeName}</h3>
                  <p className="text-sm text-[#08272a]/70">{currentLangInfo?.name}</p>
                </div>
              </div>
              <div className="text-sm text-[#08272a]/70">
                <p><strong>Code:</strong> {currentLanguage}</p>
                <p><strong>Status:</strong> Active</p>
              </div>
            </CardContent>
          </Card>

          {/* Language Preview */}
          <Card className="bg-gradient-to-br from-white to-[#edf5ee] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#08272a]">
                <BookOpen className="h-5 w-5" />
                Language Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-[#edf5ee]">
                  <p className="text-sm text-[#08272a]/70">Dashboard Title</p>
                  <p className="font-semibold text-[#08272a]">{t('dashboard.title')}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#edf5ee]">
                  <p className="text-sm text-[#08272a]/70">Navigation</p>
                  <p className="font-semibold text-[#08272a]">{t('nav.myCourses')}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#edf5ee]">
                  <p className="text-sm text-[#08272a]/70">Common Actions</p>
                  <p className="font-semibold text-[#08272a]">{t('common.save')}, {t('common.cancel')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-white to-[#edf5ee] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#08272a]">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-[#edf5ee] text-[#08272a] hover:bg-[#e3ffcd]"
                onClick={() => handleLanguageChange('en')}
              >
                <Globe className="h-4 w-4 mr-2" />
                Switch to English
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-[#edf5ee] text-[#08272a] hover:bg-[#e3ffcd]"
                onClick={() => handleLanguageChange('es')}
              >
                <Globe className="h-4 w-4 mr-2" />
                Switch to Spanish
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-[#edf5ee] text-[#08272a] hover:bg-[#e3ffcd]"
                onClick={() => handleLanguageChange('hi')}
              >
                <Globe className="h-4 w-4 mr-2" />
                Switch to Hindi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Language Statistics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
        <Card className="bg-gradient-to-br from-white to-[#e3ffcd] border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#08272a]">
              <Brain className="h-5 w-5" />
              Language Support Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#08272a] mb-2">{languages.length}</div>
                <p className="text-[#08272a]/70">Total Languages</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#08272a] mb-2">{recentlyUsed.length}</div>
                <p className="text-[#08272a]/70">Recently Used</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#08272a] mb-2">15+</div>
                <p className="text-[#08272a]/70">UI Elements</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#08272a] mb-2">100%</div>
                <p className="text-[#08272a]/70">Coverage</p>
              </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
};

export default LanguageSwitcher;
