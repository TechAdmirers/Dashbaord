import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language interface
interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

// Available languages
export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
];

// Translation interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Translation data
const translations: Translations = {
  en: {
    // Dashboard
    'dashboard.title': 'AI Learning Dashboard',
    'dashboard.subtitle': 'Your personalized learning insights powered by AI',
    'dashboard.analytics': 'Your Learning Analytics',
    'dashboard.analytics.subtitle': 'Real-time insights into your learning progress',
    'dashboard.learning.predictions': 'AI Learning Predictions & Insights',
    'dashboard.learning.predictions.subtitle': 'AI-powered insights into your learning journey',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.myCourses': 'My Courses',
    'nav.recommendations': 'Course Recommendations',
    'nav.scheduleOptimizer': 'Schedule Optimizer',
    'nav.achievements': 'Achievements',
    'nav.smartQuiz': 'Smart Quiz',
    'nav.feedback': 'AI Feedback',
    'nav.tutorChat': 'Tutor Chat',
    'nav.voiceCommands': 'Voice Commands',
    'nav.aiLearningPath': 'AI Learning Path',
    'nav.careerRoadmap': 'Career Roadmap',
    'nav.cvGenerator': 'CV Generator',
    'nav.resumeAnalyzer': 'Resume Analyzer',
    'nav.skillGap': 'Skill Gap Analysis',
    'nav.languageSwitcher': 'Language Switcher',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.refresh': 'Refresh',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
    
    // Language Switcher
    'language.title': 'Language Switcher',
    'language.subtitle': 'Learn in your native language! Switch the UI text instantly.',
    'language.current': 'Current Language',
    'language.select': 'Select Language',
    'language.autoDetect': 'Auto-detect',
    'language.recentlyUsed': 'Recently Used',
    'language.allLanguages': 'All Languages',
    'language.searchPlaceholder': 'Search languages...',
    'language.changeSuccess': 'Language changed successfully!',
    'language.changeError': 'Failed to change language. Please try again.',
    
    // Features
    'features.aiPowered': 'AI-Powered',
    'features.personalized': 'Personalized',
    'features.interactive': 'Interactive',
    'features.smart': 'Smart',
    'features.voice': 'Voice',
    'features.gamified': 'Gamified',
    'features.multi': 'Multi',
    'features.active': 'Active',
    'features.custom': 'Custom',
    'features.track': 'Track',
    'features.strategic': 'Strategic',
    'features.analysis': 'Analysis',
    
    // Descriptions
    'descriptions.myCourses': 'Track your enrolled courses and progress',
    'descriptions.recommendations': 'AI-powered course suggestions',
    'descriptions.smartQuiz': 'Interactive quizzes with AI hints',
    'descriptions.tutorChat': 'AI tutor for personalized learning',
    'descriptions.scheduleOptimizer': 'AI-powered learning schedule optimization',
    'descriptions.aiLearningPath': 'Personalized learning roadmap',
    'descriptions.learningSchedule': 'Manage your learning timetable',
    'descriptions.setGoals': 'Define and track learning objectives',
    'descriptions.careerRoadmap': 'Plan your career progression',
    'descriptions.cvGenerator': 'AI-powered CV creation',
    'descriptions.resumeAnalyzer': 'Analyze and improve your resume',
    'descriptions.skillGap': 'Identify skills you need to develop',
    'descriptions.feedback': 'Get personalized learning feedback',
    'descriptions.voiceCommands': 'Control your learning with voice',
    'descriptions.achievements': 'Track your learning milestones',
    'descriptions.languageSwitcher': 'Switch between different languages',
  },
  es: {
    // Dashboard
    'dashboard.title': 'Panel de Aprendizaje IA',
    'dashboard.subtitle': 'Tus insights de aprendizaje personalizados impulsados por IA',
    'dashboard.analytics': 'Tu Análisis de Aprendizaje',
    'dashboard.analytics.subtitle': 'Insights en tiempo real de tu progreso de aprendizaje',
    'dashboard.learning.predictions': 'Predicciones e Insights de Aprendizaje IA',
    'dashboard.learning.predictions.subtitle': 'Insights impulsados por IA en tu viaje de aprendizaje',
    
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.myCourses': 'Mis Cursos',
    'nav.recommendations': 'Recomendaciones',
    'nav.scheduleOptimizer': 'Optimizador de Horarios',
    'nav.achievements': 'Logros',
    'nav.smartQuiz': 'Quiz Inteligente',
    'nav.feedback': 'Feedback IA',
    'nav.tutorChat': 'Chat Tutor',
    'nav.voiceCommands': 'Comandos de Voz',
    'nav.aiLearningPath': 'Ruta de Aprendizaje IA',
    'nav.careerRoadmap': 'Hoja de Ruta de Carrera',
    'nav.cvGenerator': 'Generador de CV',
    'nav.resumeAnalyzer': 'Analizador de CV',
    'nav.skillGap': 'Análisis de Brechas',
    'nav.languageSwitcher': 'Selector de Idioma',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    
    // Common
    'common.loading': 'Cargando...',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.confirm': 'Confirmar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.submit': 'Enviar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.refresh': 'Actualizar',
    'common.close': 'Cerrar',
    'common.open': 'Abrir',
    'common.yes': 'Sí',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.warning': 'Advertencia',
    'common.info': 'Información',
    
    // Language Switcher
    'language.title': 'Selector de Idioma',
    'language.subtitle': '¡Aprende en tu idioma nativo! Cambia el texto de la interfaz al instante.',
    'language.current': 'Idioma Actual',
    'language.select': 'Seleccionar Idioma',
    'language.autoDetect': 'Detección automática',
    'language.recentlyUsed': 'Usado Recientemente',
    'language.allLanguages': 'Todos los Idiomas',
    'language.searchPlaceholder': 'Buscar idiomas...',
    'language.changeSuccess': '¡Idioma cambiado exitosamente!',
    'language.changeError': 'Error al cambiar el idioma. Inténtalo de nuevo.',
    
    // Features
    'features.aiPowered': 'Impulsado por IA',
    'features.personalized': 'Personalizado',
    'features.interactive': 'Interactivo',
    'features.smart': 'Inteligente',
    'features.voice': 'Voz',
    'features.gamified': 'Gamificado',
    'features.multi': 'Multi',
    'features.active': 'Activo',
    'features.custom': 'Personalizado',
    'features.track': 'Seguimiento',
    'features.strategic': 'Estratégico',
    'features.analysis': 'Análisis',
    
    // Descriptions
    'descriptions.myCourses': 'Rastrea tus cursos inscritos y progreso',
    'descriptions.recommendations': 'Sugerencias de cursos impulsadas por IA',
    'descriptions.smartQuiz': 'Cuestionarios interactivos con pistas de IA',
    'descriptions.tutorChat': 'Tutor IA para aprendizaje personalizado',
    'descriptions.scheduleOptimizer': 'Optimización de horarios de aprendizaje impulsada por IA',
    'descriptions.aiLearningPath': 'Ruta de aprendizaje personalizada',
    'descriptions.learningSchedule': 'Gestiona tu horario de aprendizaje',
    'descriptions.setGoals': 'Define y rastrea objetivos de aprendizaje',
    'descriptions.careerRoadmap': 'Planifica tu progresión de carrera',
    'descriptions.cvGenerator': 'Creación de CV impulsada por IA',
    'descriptions.resumeAnalyzer': 'Analiza y mejora tu CV',
    'descriptions.skillGap': 'Identifica las habilidades que necesitas desarrollar',
    'descriptions.feedback': 'Obtén feedback de aprendizaje personalizado',
    'descriptions.voiceCommands': 'Controla tu aprendizaje con voz',
    'descriptions.achievements': 'Rastrea tus hitos de aprendizaje',
    'descriptions.languageSwitcher': 'Cambia entre diferentes idiomas',
  },
  hi: {
    // Dashboard
    'dashboard.title': 'एआई लर्निंग डैशबोर्ड',
    'dashboard.subtitle': 'आपकी व्यक्तिगत शिक्षण अंतर्दृष्टि एआई द्वारा संचालित',
    'dashboard.analytics': 'आपका शिक्षण विश्लेषण',
    'dashboard.analytics.subtitle': 'आपकी शिक्षण प्रगति में वास्तविक समय की अंतर्दृष्टि',
    'dashboard.learning.predictions': 'एआई शिक्षण भविष्यवाणी और अंतर्दृष्टि',
    'dashboard.learning.predictions.subtitle': 'आपकी शिक्षण यात्रा में एआई संचालित अंतर्दृष्टि',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.myCourses': 'मेरे पाठ्यक्रम',
    'nav.recommendations': 'पाठ्यक्रम सिफारिशें',
    'nav.scheduleOptimizer': 'शेड्यूल ऑप्टिमाइज़र',
    'nav.achievements': 'उपलब्धियां',
    'nav.smartQuiz': 'स्मार्ट क्विज',
    'nav.feedback': 'एआई फीडबैक',
    'nav.tutorChat': 'ट्यूटर चैट',
    'nav.voiceCommands': 'वॉइस कमांड',
    'nav.aiLearningPath': 'एआई लर्निंग पाथ',
    'nav.careerRoadmap': 'करियर रोडमैप',
    'nav.cvGenerator': 'सीवी जनरेटर',
    'nav.resumeAnalyzer': 'रिज्यूमे एनालाइज़र',
    'nav.skillGap': 'स्किल गैप विश्लेषण',
    'nav.languageSwitcher': 'भाषा स्विचर',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिंग्स',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.confirm': 'पुष्टि करें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.submit': 'सबमिट करें',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.sort': 'क्रमबद्ध करें',
    'common.refresh': 'रिफ्रेश',
    'common.close': 'बंद करें',
    'common.open': 'खोलें',
    'common.yes': 'हाँ',
    'common.no': 'नहीं',
    'common.ok': 'ठीक है',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.warning': 'चेतावनी',
    'common.info': 'जानकारी',
    
    // Language Switcher
    'language.title': 'भाषा स्विचर',
    'language.subtitle': 'अपनी मातृभाषा में सीखें! UI टेक्स्ट को तुरंत बदलें।',
    'language.current': 'वर्तमान भाषा',
    'language.select': 'भाषा चुनें',
    'language.autoDetect': 'स्वतः पता लगाएं',
    'language.recentlyUsed': 'हाल ही में उपयोग किया गया',
    'language.allLanguages': 'सभी भाषाएं',
    'language.searchPlaceholder': 'भाषाएं खोजें...',
    'language.changeSuccess': 'भाषा सफलतापूर्वक बदली गई!',
    'language.changeError': 'भाषा बदलने में विफल। कृपया पुनः प्रयास करें।',
    
    // Features
    'features.aiPowered': 'एआई संचालित',
    'features.personalized': 'व्यक्तिगत',
    'features.interactive': 'इंटरैक्टिव',
    'features.smart': 'स्मार्ट',
    'features.voice': 'वॉइस',
    'features.gamified': 'गेमिफाइड',
    'features.multi': 'मल्टी',
    'features.active': 'सक्रिय',
    'features.custom': 'कस्टम',
    'features.track': 'ट्रैक',
    'features.strategic': 'रणनीतिक',
    'features.analysis': 'विश्लेषण',
    
    // Descriptions
    'descriptions.myCourses': 'अपने नामांकित पाठ्यक्रमों और प्रगति को ट्रैक करें',
    'descriptions.recommendations': 'एआई संचालित पाठ्यक्रम सुझाव',
    'descriptions.smartQuiz': 'एआई संकेतों के साथ इंटरैक्टिव क्विज',
    'descriptions.tutorChat': 'व्यक्तिगत शिक्षण के लिए एआई ट्यूटर',
    'descriptions.scheduleOptimizer': 'एआई संचालित शिक्षण शेड्यूल अनुकूलन',
    'descriptions.aiLearningPath': 'व्यक्तिगत शिक्षण रोडमैप',
    'descriptions.learningSchedule': 'अपने शिक्षण समय सारणी का प्रबंधन करें',
    'descriptions.setGoals': 'शिक्षण उद्देश्यों को परिभाषित और ट्रैक करें',
    'descriptions.careerRoadmap': 'अपनी करियर प्रगति की योजना बनाएं',
    'descriptions.cvGenerator': 'एआई संचालित सीवी निर्माण',
    'descriptions.resumeAnalyzer': 'अपने रिज्यूमे का विश्लेषण और सुधार करें',
    'descriptions.skillGap': 'उन कौशलों की पहचान करें जिन्हें आपको विकसित करने की आवश्यकता है',
    'descriptions.feedback': 'व्यक्तिगत शिक्षण फीडबैक प्राप्त करें',
    'descriptions.voiceCommands': 'वॉइस के साथ अपने शिक्षण को नियंत्रित करें',
    'descriptions.achievements': 'अपने शिक्षण मील के पत्थर को ट्रैक करें',
    'descriptions.languageSwitcher': 'विभिन्न भाषाओं के बीच स्विच करें',
  },
  ta: {
    // Dashboard
    'dashboard.title': 'ஏஐ கற்றல் டாஷ்போர்டு',
    'dashboard.subtitle': 'ஏஐ மூலம் இயக்கப்படும் உங்கள் தனிப்பட்ட கற்றல் நுண்ணறிவு',
    'dashboard.analytics': 'உங்கள் கற்றல் பகுப்பாய்வு',
    'dashboard.analytics.subtitle': 'உங்கள் கற்றல் முன்னேற்றத்தில் நேரலை நுண்ணறிவு',
    'dashboard.learning.predictions': 'ஏஐ கற்றல் கணிப்புகள் மற்றும் நுண்ணறிவு',
    'dashboard.learning.predictions.subtitle': 'உங்கள் கற்றல் பயணத்தில் ஏஐ இயக்கப்படும் நுண்ணறிவு',
    
    // Navigation
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.myCourses': 'எனது படிப்புகள்',
    'nav.recommendations': 'படிப்பு பரிந்துரைகள்',
    'nav.scheduleOptimizer': 'அட்டவணை உகந்தமயமாக்கி',
    'nav.achievements': 'சாதனைகள்',
    'nav.smartQuiz': 'ஸ்மார்ட் வினாடி வினா',
    'nav.feedback': 'ஏஐ கருத்து',
    'nav.tutorChat': 'பயிற்சியாளர் அரட்டை',
    'nav.voiceCommands': 'குரல் கட்டளைகள்',
    'nav.aiLearningPath': 'ஏஐ கற்றல் பாதை',
    'nav.careerRoadmap': 'வாழ்க்கை வரைபடம்',
    'nav.cvGenerator': 'சி.வி உருவாக்கி',
    'nav.resumeAnalyzer': 'விவரக்குறிப்பு பகுப்பாய்வு',
    'nav.skillGap': 'திறன் இடைவெளி பகுப்பாய்வு',
    'nav.languageSwitcher': 'மொழி மாற்றி',
    'nav.profile': 'சுயவிவரம்',
    'nav.settings': 'அமைப்புகள்',
    
    // Common
    'common.loading': 'ஏற்றுகிறது...',
    'common.save': 'சேமி',
    'common.cancel': 'ரத்து',
    'common.edit': 'திருத்து',
    'common.delete': 'அழி',
    'common.confirm': 'உறுதிப்படுத்து',
    'common.back': 'பின்செல்',
    'common.next': 'அடுத்து',
    'common.previous': 'முந்தைய',
    'common.submit': 'சமர்ப்பி',
    'common.search': 'தேடு',
    'common.filter': 'வடிப்பான்',
    'common.sort': 'வரிசைப்படுத்து',
    'common.refresh': 'புதுப்பி',
    'common.close': 'மூடு',
    'common.open': 'திற',
    'common.yes': 'ஆம்',
    'common.no': 'இல்லை',
    'common.ok': 'சரி',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.warning': 'எச்சரிக்கை',
    'common.info': 'தகவல்',
    
    // Language Switcher
    'language.title': 'மொழி மாற்றி',
    'language.subtitle': 'உங்கள் தாய்மொழியில் கற்கவும்! UI உரையை உடனடியாக மாற்றவும்.',
    'language.current': 'தற்போதைய மொழி',
    'language.select': 'மொழியைத் தேர்ந்தெடுக்கவும்',
    'language.autoDetect': 'தானாக கண்டறி',
    'language.recentlyUsed': 'சமீபத்தில் பயன்படுத்தப்பட்டது',
    'language.allLanguages': 'அனைத்து மொழிகளும்',
    'language.searchPlaceholder': 'மொழிகளைத் தேடுங்கள்...',
    'language.changeSuccess': 'மொழி வெற்றிகரமாக மாற்றப்பட்டது!',
    'language.changeError': 'மொழியை மாற்றுவதில் தோல்வி. மீண்டும் முயற்சிக்கவும்.',
    
    // Features
    'features.aiPowered': 'ஏஐ இயக்கப்படும்',
    'features.personalized': 'தனிப்பட்ட',
    'features.interactive': 'ஊடாடும்',
    'features.smart': 'ஸ்மார்ட்',
    'features.voice': 'குரல்',
    'features.gamified': 'விளையாட்டாக்கப்பட்ட',
    'features.multi': 'பல',
    'features.active': 'செயலில்',
    'features.custom': 'தனிப்பயன்',
    'features.track': 'கண்காணி',
    'features.strategic': 'மூலோபாய',
    'features.analysis': 'பகுப்பாய்வு',
    
    // Descriptions
    'descriptions.myCourses': 'உங்கள் பதிவு செய்யப்பட்ட படிப்புகள் மற்றும் முன்னேற்றத்தை கண்காணிக்கவும்',
    'descriptions.recommendations': 'ஏஐ இயக்கப்படும் படிப்பு பரிந்துரைகள்',
    'descriptions.smartQuiz': 'ஏஐ குறிப்புகளுடன் ஊடாடும் வினாடி வினாக்கள்',
    'descriptions.tutorChat': 'தனிப்பட்ட கற்றலுக்கான ஏஐ பயிற்சியாளர்',
    'descriptions.scheduleOptimizer': 'ஏஐ இயக்கப்படும் கற்றல் அட்டவணை உகந்தமயமாக்கல்',
    'descriptions.aiLearningPath': 'தனிப்பட்ட கற்றல் வரைபடம்',
    'descriptions.learningSchedule': 'உங்கள் கற்றல் நேர அட்டவணையை நிர்வகிக்கவும்',
    'descriptions.setGoals': 'கற்றல் நோக்கங்களை வரையறுத்து கண்காணிக்கவும்',
    'descriptions.careerRoadmap': 'உங்கள் வாழ்க்கை முன்னேற்றத்தை திட்டமிடவும்',
    'descriptions.cvGenerator': 'ஏஐ இயக்கப்படும் சி.வி உருவாக்கம்',
    'descriptions.resumeAnalyzer': 'உங்கள் விவரக்குறிப்பை பகுப்பாய்வு செய்து மேம்படுத்தவும்',
    'descriptions.skillGap': 'நீங்கள் வளர்க்க வேண்டிய திறன்களை அடையாளம் காணவும்',
    'descriptions.feedback': 'தனிப்பட்ட கற்றல் கருத்தைப் பெறவும்',
    'descriptions.voiceCommands': 'குரலுடன் உங்கள் கற்றலைக் கட்டுப்படுத்தவும்',
    'descriptions.achievements': 'உங்கள் கற்றல் மைல்கற்களை கண்காணிக்கவும்',
    'descriptions.languageSwitcher': 'வெவ்வேறு மொழிகளுக்கு இடையே மாறவும்',
  },
};

// Language context interface
interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (languageCode: string) => void;
  t: (key: string) => string;
  languages: Language[];
  recentlyUsed: string[];
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const savedRecentlyUsed = localStorage.getItem('recentlyUsedLanguages');
    
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Auto-detect language from browser
      const browserLanguage = navigator.language.split('-')[0];
      const detectedLanguage = languages.find(lang => lang.code === browserLanguage)?.code || 'en';
      setCurrentLanguage(detectedLanguage);
    }
    
    if (savedRecentlyUsed) {
      try {
        setRecentlyUsed(JSON.parse(savedRecentlyUsed));
      } catch (error) {
        console.error('Error parsing recently used languages:', error);
      }
    }
  }, []);

  // Translation function
  const t = (key: string): string => {
    const translation = translations[currentLanguage]?.[key];
    if (translation) {
      return translation;
    }
    
    // Fallback to English
    const englishTranslation = translations['en']?.[key];
    if (englishTranslation) {
      return englishTranslation;
    }
    
    // Return key if no translation found
    return key;
  };

  // Set language function
  const setLanguage = (languageCode: string) => {
    if (languages.some(lang => lang.code === languageCode)) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('selectedLanguage', languageCode);
      
      // Update recently used languages
      const updatedRecentlyUsed = [
        languageCode,
        ...recentlyUsed.filter(lang => lang !== languageCode)
      ].slice(0, 5); // Keep only 5 most recent
      
      setRecentlyUsed(updatedRecentlyUsed);
      localStorage.setItem('recentlyUsedLanguages', JSON.stringify(updatedRecentlyUsed));
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    languages,
    recentlyUsed,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 