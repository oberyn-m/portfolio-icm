'use client';

import { useState, useEffect } from 'react';
import { settings } from '@/constants/settings';
import { extensions } from '@/constants/extensions';
import { usePortfolioContent } from '@/constants/portfolio';
import { devSetup } from '@/constants/dev.setup';
import { gameSetup } from '@/constants/game.setup';
import { general } from '@/constants/general';
import { useLanguage } from '@/contexts/LanguageContext';

interface CodeEditorProps {
  filePath: string;
  onClose: () => void;
}

export default function CodeEditor({ filePath, onClose }: CodeEditorProps) {
  const [content, setContent] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const { language } = useLanguage();
  const portfolioContent = usePortfolioContent();

  const handleCopyToClipboard = () => {
    const jsonContent = JSON.stringify(filePath === 'settings.json' ? settings : extensions, null, 2);
    navigator.clipboard.writeText(jsonContent);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const getFileContent = () => {
      switch (filePath) {
        case 'settings.json':
          return JSON.stringify(settings, null, 2);
        case 'extensions.json':
          return JSON.stringify(extensions, null, 2);
        case 'portfolio':
          return portfolioContent;
        case 'dev.setup':
          return devSetup;
        case 'gaming.setup':
          return gameSetup;
        case 'general':
          return general;
        default:
          return '';
      }
    };

    const fileContent = getFileContent();
    setContent(fileContent);
  }, [filePath, language, portfolioContent]);

  const formatLine = (line: string) => {
    if (filePath === 'settings.json' || filePath === 'extensions.json') {
      let formattedLine = line;

      formattedLine = formattedLine.replace(
        /"([^"]+)":/g,
        '<span style="color: #9CCFD8">"$1"</span>:'
      );

      formattedLine = formattedLine.replace(
        /: "([^"]+)"/g,
        ': <span style="color: #F6C177">"$1"</span>'
      );

      formattedLine = formattedLine.replace(
        /: (\d+)/g,
        ': <span style="color: #EA9A97">$1</span>'
      );

      formattedLine = formattedLine.replace(
        /: (true|false|null)/g,
        ': <span style="color: #EA9A97">$1</span>'
      );

      formattedLine = formattedLine.replace(
        /([{}\[\],])/g,
        '<span style="color: #D4D4D4">$1</span>'
      );

      const indentMatch = line.match(/^(\s+)/);
      const indent = indentMatch ? indentMatch[0] : '';
      return indent.replace(/ /g, '<span class="indent-space"> </span>') + formattedLine.trim();
    }

    if (line.includes('<a href=')) {
      return line.replace(
        /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#61CFCC] hover:underline">$2</a>'
      );
    }

    if (line.includes('[') && line.includes(']') && line.includes('(') && line.includes(')')) {
      return line.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#61CFCC] hover:underline">$1</a>'
      );
    }

    if (line.includes('http://') || line.includes('https://')) {
      const parts = line.split('https://');
      if (parts.length === 2) {
        const [prefix, url] = parts;
        const cleanUrl = url.split('"')[0];
        return `${prefix}<a href="https://${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-[#61CFCC] hover:underline">https://${cleanUrl}</a>`;
      }
      return line;
    }

    if (filePath === 'portfolio' || filePath === 'dev.setup' || filePath === 'gaming.setup' || filePath === 'general') {
      if (line.startsWith('# ')) {
        return line.replace(/^# (.+)$/, '<span style="color: #61CFCC"># $1</span>');
      }
      if (line.startsWith('## ') || line.startsWith('### ')) {
        return line.replace(/^(#{2,3}) (.+)$/, '<span style="color: #61CFCC">$1 $2</span>');
      }
    }

    return line;
  };

  const lines = content.split('\n');
  const fileName = filePath.split('/').pop() || '';

  return (
    <div className="h-full flex flex-col">
      <div className="h-8 bg-[#252526] flex items-center px-2 border-b border-[#333333]">
        <div className="flex items-center">
          <span className="text-sm text-[#cccccc]">{fileName}</span>
          <button
            onClick={onClose}
            className="w-4 h-4 flex items-center justify-center hover:bg-[#2a2a2a] rounded ml-2"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto font-mono text-sm">
        <div className="relative py-2 px-4 [&_.indent-space]:text-[#333333] [&_.indent-space]:before:content-['.'] [&_.indent-space]:before:invisible">
          {(filePath === 'settings.json' || filePath === 'extensions.json') && (
            <button
              onClick={handleCopyToClipboard}
              className={`absolute top-2 right-4 px-2 pt-5 pb-5 text-[.875rem] leading-5 text-[#cccccc] bg-[#252526] hover:bg-[#2a2a2a] rounded flex items-center gap-1 w-[200px] justify-center ${isCopied ? 'border border-green-500' : ''}`}
            >
              {isCopied ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {isCopied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          )}
          {lines.map((line, index) => (
            <div key={index} className="flex">
              <span className="w-8 text-right pr-2 text-[#6e7681] select-none">{index + 1}</span>
              <div 
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: formatLine(line) }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}