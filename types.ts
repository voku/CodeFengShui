import { LucideIcon } from 'lucide-react';

export interface BlogSection {
  title: string;
  quote?: string;
  content: string;
  tags?: string[];
  codeSnippet?: string; // Optional code example
  language?: string;    // e.g., 'javascript', 'css'
}

export interface DeskItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  // Position for the messy layout (0-100%)
  messyPos: {
    top: string;
    left: string;
    rotation: number;
    zIndex: number;
  };
  // Content to display when hovered/selected
  blogData: BlogSection;
}

export type DeskState = 'clean' | 'messy';