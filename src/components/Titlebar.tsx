'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TitleBarProps {
  isPortfolioOpen?: boolean;
}

export default function TitleBar({ isPortfolioOpen = false }: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="h-8 bg-[#3c3c3c] flex items-center px-2 border-b border-[#252526] relative">
      {/* Ícones à esquerda */}
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => {}}
          className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 cursor-pointer"
        />
        <button 
          onClick={() => {}}
          className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 cursor-pointer"
        />
        <button 
          onClick={() => {}}
          className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 cursor-pointer"
        />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="text-sm text-[#cccccc]">ICM</span>
      </div>

      {isPortfolioOpen && (
        <div className="absolute right-2 flex items-center space-x-2">
          <button
            onClick={toggleLanguage}
            className="w-6 h-4 flex items-center justify-center hover:bg-[#2a2a2a] rounded"
            title={language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
          >
            {language === 'pt-BR' ? (
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="18" fill="#009C3B"/>
                <path d="M12 0L24 9L12 18L0 9L12 0Z" fill="#FFDF00"/>
                <circle cx="12" cy="9" r="5" fill="#002776"/>
                <path d="M12 4L14.5 7.5L12 11L9.5 7.5L12 4Z" fill="#FFFFFF"/>
              </svg>
            ) : (
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="18" fill="#B22234"/>
                <rect width="24" height="2" fill="#FFFFFF"/>
                <rect width="24" height="2" y="4" fill="#FFFFFF"/>
                <rect width="24" height="2" y="8" fill="#FFFFFF"/>
                <rect width="24" height="2" y="12" fill="#FFFFFF"/>
                <rect width="24" height="2" y="16" fill="#FFFFFF"/>
                <rect width="12" height="10" fill="#3C3B6E"/>
                <path d="M2 2L4 4L2 6L0 4L2 2Z" fill="#FFFFFF"/>
                <path d="M6 2L8 4L6 6L4 4L6 2Z" fill="#FFFFFF"/>
                <path d="M10 2L12 4L10 6L8 4L10 2Z" fill="#FFFFFF"/>
                <path d="M2 6L4 8L2 10L0 8L2 6Z" fill="#FFFFFF"/>
                <path d="M6 6L8 8L6 10L4 8L6 6Z" fill="#FFFFFF"/>
                <path d="M10 6L12 8L10 10L8 8L10 6Z" fill="#FFFFFF"/>
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
} 