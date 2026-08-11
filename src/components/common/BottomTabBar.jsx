// File: src/components/common/BottomTabBar.jsx
// Phone/tablet bottom navigation (hidden from lg up, where the sidebar is
// docked). One tap to the four main areas + the full drawer menu.
import { Home, BookOpen, Flame, Gamepad2, Menu } from 'lucide-react';

const TABS = [
  { mode: 'home', label: 'Lộ trình', icon: Home, active: 'text-cyan-600 dark:text-cyan-400' },
  { mode: 'grammar', label: 'Ngữ pháp', icon: BookOpen, active: 'text-yellow-600 dark:text-yellow-400' },
  { mode: 'vocab', label: 'Từ vựng', icon: Flame, active: 'text-green-600 dark:text-green-400' },
  { mode: 'games', label: 'Games', icon: Gamepad2, active: 'text-violet-600 dark:text-violet-400' },
];

const BottomTabBar = ({ appMode, onSelect, onMenu }) => (
  <nav aria-label="Điều hướng nhanh" className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white dark:bg-slate-900 border-t-4 border-slate-800 dark:border-slate-700 flex items-stretch pb-[env(safe-area-inset-bottom)]">
    {TABS.map(({ mode, label, icon: Icon, active }) => {
      const isActive = appMode === mode;
      return (
        <button
          key={mode}
          onClick={() => onSelect(mode)}
          aria-current={isActive ? 'page' : undefined}
          className={`flex-1 py-2 flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${isActive ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
        >
          <Icon size={21} className={isActive ? active : 'text-slate-400 dark:text-slate-500'} />
          <span className={`text-[10px] font-black ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>{label}</span>
        </button>
      );
    })}
    <button onClick={onMenu} aria-label="Mở menu đầy đủ" className="flex-1 py-2 flex flex-col items-center gap-0.5 cursor-pointer">
      <Menu size={21} className="text-slate-400 dark:text-slate-500" />
      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500">Menu</span>
    </button>
  </nav>
);

export default BottomTabBar;
