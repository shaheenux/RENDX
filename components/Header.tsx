import React from 'react';
import type { Theme } from '../App';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 00B6.061 6.061l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-6.061 6.061l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-6.061-6.061l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 006.061-6.061l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036a.75.75 0 001.452 0l.258-1.036A.75.75 0 0121 1.5a.75.75 0 01.568.728l1.036.258a.75.75 0 000 1.452l-1.036.258A.75.75 0 0121 6a.75.75 0 01-.728-.568l-.258-1.036a.75.75 0 00-1.452 0l-.258 1.036A.75.75 0 0118 6a.75.75 0 01-.568-.728l-1.036-.258a.75.75 0 000-1.452l1.036-.258A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183a.75.75 0 001.39 0l.394-1.183A.75.75 0 0121 15a.75.75 0 01.513.712l1.183.394a.75.75 0 000 1.39l-1.183.394A.75.75 0 0121 18a.75.75 0 01-.712-.513l-.394-1.183a.75.75 0 00-1.39 0l-.394 1.183A.75.75 0 0118 18a.75.75 0 01-.513-.712l-1.183-.394a.75.75 0 000-1.39l1.183-.394A.75.75 0 0116.5 15z"
      clipRule="evenodd"
    />
  </svg>
);

interface HeaderProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<HeaderProps> = ({ theme, setTheme }) => {
    const themes: { name: Theme, color: string }[] = [
        { name: 'light', color: 'bg-slate-300' },
        { name: 'dark', color: 'bg-slate-700' },
        { name: 'vibrant', color: 'bg-pink-400' },
    ];

    return (
        <div className="flex items-center space-x-2 bg-surface p-1 rounded-full border border-border-color">
            {themes.map((t) => (
                <button
                    key={t.name}
                    onClick={() => setTheme(t.name)}
                    className={`w-6 h-6 rounded-full ${t.color} transition transform hover:scale-110 ${
                        theme === t.name ? 'ring-2 ring-offset-2 ring-offset-surface ring-ring-color' : ''
                    }`}
                    aria-label={`Switch to ${t.name} theme`}
                />
            ))}
        </div>
    );
};


export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="bg-surface/80 backdrop-blur-sm border-b border-border-color shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <SparkleIcon className="h-8 w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
              RENDX by $H
            </h1>
          </div>
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </header>
  );
};