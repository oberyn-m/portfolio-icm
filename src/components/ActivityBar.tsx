'use client';

import { useState, useEffect, useRef } from 'react';
import { Files, Search, GitBranch, Bug, Puzzle, User, Settings, Monitor, Beaker, Github, Linkedin } from 'lucide-react';

export default function ActivityBar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-12 bg-[#2d2d2d] flex flex-col items-center py-2 border-r border-[#1e1e1e]">
      <button className="p-2 text-white relative before:absolute before:left-0 before:top-0 before:w-[2px] before:h-full before:bg-white">
        <Files size={24} />
      </button>
      <div className="mt-4">
        <button className="p-2 text-white/70 hover:text-white">
          <Search size={24} />
        </button>
        <button className="p-2 mt-4 text-white/70 hover:text-white">
          <GitBranch size={24} />
        </button>
        <button className="p-2 mt-4 text-white/70 hover:text-white">
          <Bug size={24} />
        </button>
        <button className="p-2 mt-4 text-white/70 hover:text-white">
          <Puzzle size={24} />
        </button>
        <button className="p-2 mt-4 text-white/70 hover:text-white">
          <Monitor size={24} />
        </button>
        <button className="p-2 mt-4 text-white/70 hover:text-white">
          <Beaker size={24} />
        </button>
      </div>
      <div className="flex-1" />
      <div className="relative">
        <button 
          ref={buttonRef}
          className="p-2 text-white/70 hover:text-white"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <User size={24} />
        </button>
        {isUserMenuOpen && (
          <div 
            ref={menuRef}
            className="absolute bottom-0 left-12 bg-[#252526] border border-[#1e1e1e] rounded shadow-lg w-40"
          >
            <button
              onClick={() => window.open('https://github.com/oberyn-m', '_blank')}
              className="w-full px-4 py-2 flex items-center gap-2 text-white/70 hover:bg-[#2a2d2e] hover:text-white"
            >
              <Github size={16} />
              <span className="text-sm">GitHub</span>
            </button>
            <button
              onClick={() => window.open('https://www.linkedin.com/in/isaac-matos-568b6911a/', '_blank')}
              className="w-full px-4 py-2 flex items-center gap-2 text-white/70 hover:bg-[#2a2d2e] hover:text-white"
            >
              <Linkedin size={16} />
              <span className="text-sm">LinkedIn</span>
            </button>
          </div>
        )}
      </div>
      <button className="p-2 text-white/70 hover:text-white">
        <Settings size={24} />
      </button>
    </div>
  );
} 