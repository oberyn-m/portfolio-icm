'use client';

import { useState } from 'react';
import Explorer from './Explorer';

interface SidebarProps {
  onFileSelect: (file: string) => void;
  openFiles: string[];
}

export default function Sidebar({ onFileSelect, openFiles }: SidebarProps) {
  return (
    <div className="w-64 h-full bg-[#252526] flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <Explorer onFileSelect={onFileSelect} openFiles={openFiles} />
      </div>
    </div>
  );
} 