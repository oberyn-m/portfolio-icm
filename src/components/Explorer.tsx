'use client';

import { useState } from 'react';
import { User, Terminal, Cpu, Gamepad2, FileCode } from 'lucide-react';

interface ExplorerProps {
  onFileSelect: (file: string) => void;
  openFiles: string[];
}

export default function Explorer({ onFileSelect, openFiles }: ExplorerProps) {
  const [openEditorsExpanded, setOpenEditorsExpanded] = useState(true);
  const [icmatosExpanded, setIcmatosExpanded] = useState(true);
  const [portfolioExpanded, setPortfolioExpanded] = useState(true);
  const [vscodeExpanded, setVscodeExpanded] = useState(false);
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [othersExpanded, setOthersExpanded] = useState(false);

  const handleFileClick = (fileName: string) => {
    onFileSelect(fileName);
  };

  const getFileIcon = (fileName: string) => {
    switch (fileName) {
      case 'portfolio':
        return <User size={16} className="mr-1" />;
      case 'general':
        return <Terminal size={16} className="mr-1" />;
      case 'dev.setup':
        return <Cpu size={16} className="mr-1" />;
      case 'gaming.setup':
        return <Gamepad2 size={16} className="mr-1" />;
      default:
        return <FileCode size={16} className="mr-1" />;
    }
  };

  const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
    <svg 
      className={`w-4 h-4 transform transition-transform ${expanded ? 'rotate-90' : ''}`}
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5.7 13.7L5 13L9.6 8.4L5 3.7L5.7 3L10.7 8V8.7L5.7 13.7Z" 
        fill="currentColor"
      />
    </svg>
  );

  const FolderIcon = () => (
    <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.5 3H7.71L6.86 2.15L6.51 2H1.51L1 2.5V5.5L1.01 6H15L15.51 5.5v-2L14.5 3ZM14.99 13.5L14.5 14H1.51L1 13.5V7h14l-.01 6.5z"
        fill="currentColor"
        className="text-[#cccccc]"
      />
    </svg>
  );

  return (
    <div className="w-60 bg-[#252526] h-full text-[#cccccc] text-sm">
      {/* Cabeçalho do Explorer */}
      <div className="flex items-center justify-between px-4 py-2 select-none">
        <span className="uppercase text-xs tracking-wider">Explorer</span>
        <span className="text-xs">⋯</span>
      </div>

      <div className="px-2">
        <button
          onClick={() => setOpenEditorsExpanded(!openEditorsExpanded)}
          className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group"
        >
          <ChevronIcon expanded={openEditorsExpanded} />
          <span className="uppercase text-xs tracking-wider">Open Editors</span>
        </button>
        {openEditorsExpanded && openFiles.length > 0 && (
          <div className="ml-4">
            <button
              className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group"
              onClick={() => handleFileClick(openFiles[openFiles.length - 1])}
            >
              {getFileIcon(openFiles[openFiles.length - 1])}
              {openFiles[openFiles.length - 1]}
            </button>
          </div>
        )}
      </div>

      <div className="px-2">
        <button
          onClick={() => setIcmatosExpanded(!icmatosExpanded)}
          className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group"
        >
          <ChevronIcon expanded={icmatosExpanded} />
          <span className="uppercase text-xs tracking-wider">ICM</span>
        </button>
        {icmatosExpanded && (
          <div className="ml-4">
            <button
              onClick={() => setPortfolioExpanded(!portfolioExpanded)}
              className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group mt-1"
            >
              <ChevronIcon expanded={portfolioExpanded} />
              <span className="flex items-center whitespace-nowrap min-w-0 overflow-hidden">
                <FolderIcon />
                Portfolio
              </span>
            </button>
            
            {portfolioExpanded && (
              <div className="ml-6">
                <button 
                  className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group"
                  onClick={() => handleFileClick('portfolio')}
                >
                  <User size={16} className="mr-1" />
                  Isaac Matos
                </button>
              </div>
            )}

            <button
              onClick={() => setVscodeExpanded(!vscodeExpanded)}
              className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group mt-1"
            >
              <ChevronIcon expanded={vscodeExpanded} />
              <span className="flex items-center whitespace-nowrap min-w-0 overflow-hidden">
                <FolderIcon />
                Visual Studio Code
              </span>
            </button>
            
            {vscodeExpanded && (
              <div className="ml-6">
                <button 
                  className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group"
                  onClick={() => handleFileClick('settings.json')}
                >
                  <FileCode size={16} className="mr-1" />
                  settings.json
                </button>
                <button 
                  className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group"
                  onClick={() => handleFileClick('extensions.json')}
                >
                  <FileCode size={16} className="mr-1" />
                  extensions.json
                </button>
              </div>
            )}

            <button
              onClick={() => setTerminalExpanded(!terminalExpanded)}
              className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group mt-1"
            >
              <ChevronIcon expanded={terminalExpanded} />
              <span className="flex items-center whitespace-nowrap min-w-0 overflow-hidden">
                <FolderIcon />
                Terminal
              </span>
            </button>
            
            {terminalExpanded && (
              <div className="ml-6">
                <button 
                  className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group"
                  onClick={() => handleFileClick('general')}
                >
                  <Terminal size={16} className="mr-1" />
                  general
                </button>
              </div>
            )}

            <button
              onClick={() => setOthersExpanded(!othersExpanded)}
              className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group mt-1"
            >
              <ChevronIcon expanded={othersExpanded} />
              <span className="flex items-center whitespace-nowrap min-w-0 overflow-hidden">
                <FolderIcon />
                Others
              </span>
            </button>
            
            {othersExpanded && (
              <div className="ml-6">
                <button 
                  className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group"
                  onClick={() => handleFileClick('dev.setup')}
                >
                  <Cpu size={16} className="mr-1" />
                  dev.setup
                </button>
                <button 
                  className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] rounded group"
                  onClick={() => handleFileClick('gaming.setup')}
                >
                  <Gamepad2 size={16} className="mr-1" />
                  gaming.setup
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 