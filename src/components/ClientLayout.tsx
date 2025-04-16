'use client';

import { useState, ReactNode } from 'react';
import Titlebar from '@/components/Titlebar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import CodeEditor from '@/components/CodeEditor';
import ActivityBar from '@/components/ActivityBar';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>('portfolio');
  const [openFiles, setOpenFiles] = useState<string[]>(['portfolio']);

  const handleFileSelect = (file: string) => {
    setSelectedFile(file);
    setOpenFiles([file]);
  };

  const handleFileClose = (file: string) => {
    setOpenFiles([]);
    setSelectedFile(null);
  };

  return (
    <LanguageProvider>
      <div className="h-[calc(100vh-4rem)] max-w-7xl mx-auto my-8 flex flex-col shadow-2xl rounded-lg border border-[#1e1e1e] bg-[#1e1e1e]">
        <Titlebar isPortfolioOpen={selectedFile === 'portfolio'} />
        <div className="flex flex-1 overflow-hidden">
          <ActivityBar />
          <Sidebar onFileSelect={handleFileSelect} openFiles={openFiles} />
          {selectedFile && (
            <div className="flex-1">
              <CodeEditor filePath={selectedFile} onClose={() => handleFileClose(selectedFile)} />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
} 