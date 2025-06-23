import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, User, Settings, GraduationCap, 
  BrainCircuit, MessageSquareQuote, Bot, Mic, Waypoints, Map, 
  FileText, GaugeCircle, Radar, Sparkles, CalendarCheck, Trophy, Languages, X, ChevronLeft, ChevronRight, Bell, Layers
} from 'lucide-react';

const navGroups = [
  {
    title: 'Main',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/my-courses', label: 'My Courses', icon: BookOpen },
    ],
  },
  {
    title: 'Personalization',
    items: [
      { to: '/course-recommendations', label: 'Recommendations', icon: Sparkles },
      { to: '/schedule-optimizer', label: 'Schedule Optimizer', icon: CalendarCheck },
      { to: '/achievements', label: 'Achievements', icon: Trophy },
    ],
  },
  {
    title: 'AI Learning Tools',
    items: [
      { to: '/smart-quiz', label: 'Smart Quiz', icon: BrainCircuit },
      { to: '/adaptive-assessments', label: 'Adaptive Assessments', icon: GraduationCap },
      { to: '/content-management', label: 'Content Management', icon: Layers },
      { to: '/feedback', label: 'AI Feedback', icon: MessageSquareQuote },
      { to: '/tutor-chat', label: 'Tutor Chat', icon: Bot },
      { to: '/voice-prompt', label: 'Voice Commands', icon: Mic },
    ],
  },
  {
    title: 'Career Development',
    items: [
      { to: '/ai-learning-path', label: 'Learning Path', icon: Waypoints },
      { to: '/career-roadmap', label: 'Career Roadmap', icon: Map },
      { to: '/cv-generator', label: 'CV Generator', icon: FileText },
      { to: '/resume-analyzer', label: 'Resume Analyzer', icon: GaugeCircle },
      { to: '/skill-gap', label: 'Skill Gap', icon: Radar },
    ],
  },
  {
    title: 'Account',
    items: [
      { to: '/profile', label: 'Profile', icon: User },
      { to: '/notifications', label: 'Notifications', icon: Bell },
      { to: '/settings', label: 'Settings', icon: Settings },
      { to: '/language-switcher', label: 'Language', icon: Languages },
    ]
  }
];

const Sidebar = ({ open = true, onClose, collapsed = false, setCollapsed }: { open?: boolean; onClose?: () => void; collapsed?: boolean; setCollapsed?: (v: boolean) => void }) => {
  return (
    <aside
      className={`fixed z-40 top-0 left-0 h-full bg-deep-emerald-green text-white flex flex-col transition-all duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        ${collapsed ? 'w-20' : 'w-64'}
        md:static md:translate-x-0 md:h-auto md:relative`}
    >
      <div className="flex items-center justify-between p-4 relative">
        <div className="flex items-center justify-center w-full">
          <GraduationCap size={32} className="text-light-neon-green" />
          {!collapsed && (
            <img 
              src="/images/logo.png" 
              alt="TechAdmirers Logo" 
              className="ml-3 h-8 w-auto"
            />
          )}
        </div>
        {/* Desktop hide button (collapse) */}
        {onClose && setCollapsed && !collapsed && (
          <button
            className="md:block hidden p-1 rounded-full ml-2 text-light-neon-green bg-deep-emerald-green hover:bg-light-neon-green/20 transition-colors"
            style={{ height: 36, width: 36, alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setCollapsed(true)}
            aria-label="Hide sidebar"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        {/* Desktop expand button (when collapsed) */}
        {onClose && setCollapsed && collapsed && (
          <button
            className="md:block hidden p-1 rounded-full ml-2 text-light-neon-green bg-deep-emerald-green hover:bg-light-neon-green/20 transition-colors"
            style={{ height: 36, width: 36, alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
          >
            <ChevronRight size={22} />
          </button>
        )}
        {/* Mobile close button */}
        {onClose && (
          <button
            className="md:hidden p-1 rounded hover:bg-white/10 ml-2"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        )}
      </div>
      {/* Navigation: icons only if collapsed, full if expanded */}
      <nav className={`sidebar-nav flex-1 overflow-y-auto ${collapsed ? 'flex flex-col items-center space-y-2 py-4' : 'px-2 py-2 space-y-4'} scrollbar-thin scrollbar-thumb-emerald-700 scrollbar-track-emerald-900`}>
        {navGroups.map((group) => (
          <div key={group.title} className={collapsed ? 'w-full' : ''}>
            {!collapsed && (
              <h3 className="px-4 py-2 text-xs font-semibold text-light-neon-green/50 uppercase tracking-wider">{group.title}</h3>
            )}
            <ul className={collapsed ? 'flex flex-col items-center gap-2' : ''}>
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} mx-2 p-3 rounded-lg transition-colors duration-200 text-sm ${
                        isActive
                          ? 'bg-light-neon-green/20 text-light-neon-green font-semibold'
                          : 'hover:bg-white/10'
                      }`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon size={22} />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      {/* Upgrade section only if not collapsed */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="p-4 bg-light-neon-green/10 rounded-lg text-center">
            <p className="text-sm">Upgrade to Pro</p>
            <p className="text-xs text-white/70">Get access to all features</p>
            <button className="mt-2 w-full bg-light-neon-green text-deep-emerald-green font-bold py-2 px-4 rounded-lg text-sm hover:bg-opacity-90 transition-colors">
              Upgrade
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
