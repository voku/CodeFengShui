import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeskItemConfig, BlogSection } from '../types';
import { INTRO_CONTENT } from '../constants';

interface InfoPanelProps {
  activeItem: DeskItemConfig | null;
  isMessyDominant: boolean; // True if slider is mostly revealing messy side
  isVisible: boolean;
}

// Simple syntax highlighter component
const SyntaxHighlight: React.FC<{ code: string }> = ({ code }) => {
  // Regex tokens: comments, strings, keywords, numbers, punctuation
  const tokenRegex = /(\/\*[\s\S]*?\*\/|\/\/.*)|(["'`].*?["'`])|\b(const|let|var|function|return|class|import|export|if|else|switch|case|default|break|continue|new|this|typeof|void|debugger|from|as)\b|(\b\d+\b)|([{}[\](),;:.])/g;

  const parts = code.split(tokenRegex);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        
        if (part.startsWith('//') || part.startsWith('/*')) {
           return <span key={i} className="text-slate-500 italic">{part}</span>;
        }
        if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
           return <span key={i} className="text-emerald-300">{part}</span>;
        }
        if (/^(const|let|var|function|return|class|import|export|if|else|switch|case|default|break|continue|new|this|typeof|void|debugger|from|as)$/.test(part)) {
           return <span key={i} className="text-purple-400 font-bold">{part}</span>;
        }
        if (/^\d+$/.test(part)) {
           return <span key={i} className="text-orange-300">{part}</span>;
        }
        if (/^[{}[\](),;:.]$/.test(part)) {
           return <span key={i} className="text-slate-400">{part}</span>;
        }
        // Identifiers / other text
        return <span key={i} className="text-indigo-100">{part}</span>;
      })}
    </>
  );
};

// Component to handle the code block layout (Clean vs Messy separation)
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  // Heuristic: Split by double newline followed by a comment (typical pattern in constants.ts)
  // Example: "...code... \n\n// Clean version..."
  const parts = code.split(/\n\n(?=\/\/|\/\*)/);

  return (
    <div className="font-mono text-xs md:text-sm leading-relaxed">
       {parts.map((part, index) => {
         const lower = part.toLowerCase();
         // Detect if this section is the "negative" example
         const isBadExample = lower.includes('crowded') || 
                              lower.includes('hard to scan') || 
                              lower.includes('dense') || 
                              lower.includes('disconnected') || 
                              lower.includes('inconsistent') || 
                              lower.includes('random') || 
                              lower.includes('wall of text');
         
         const borderColor = isBadExample 
            ? 'border-l-2 border-red-500/40 pl-3 bg-red-500/5' 
            : 'border-l-2 border-emerald-500/40 pl-3 bg-emerald-500/5';
         
         // If there's only one part, default to standard styling (likely a diff or single example)
         const styleClass = parts.length > 1 ? `rounded-r py-2 mb-2 ${borderColor}` : '';

         return (
           <div key={index} className={styleClass}>
              <SyntaxHighlight code={part} />
           </div>
         );
       })}
    </div>
  );
};

const InfoPanel: React.FC<InfoPanelProps> = ({ activeItem, isMessyDominant, isVisible }) => {
  const content: BlogSection = activeItem ? activeItem.blogData : INTRO_CONTENT;
  
  // Override content if the view is mostly messy and no item is selected
  const displayContent = (!activeItem && isMessyDominant) 
    ? {
        title: "The Chaos of Clutter",
        content: "Without white space, code becomes a jumbled mess. Connections are lost, focus is scattered, and maintenance becomes a nightmare. Drag the slider to the left to apply structure.",
        tags: ['Messy', 'Warning'],
        codeSnippet: undefined
      }
    : content;

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none flex justify-center z-50">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={activeItem ? activeItem.id : (isMessyDominant ? 'messy' : 'intro')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-xl md:rounded-2xl p-4 md:p-6 max-w-4xl w-full pointer-events-auto"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column: Text Content */}
              <div className={`flex-1 ${displayContent.codeSnippet ? 'md:w-1/2' : 'w-full'}`}>
                <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                  <h2 className="text-lg md:text-2xl font-bold text-slate-800">
                    {displayContent.title}
                  </h2>
                  <div className="flex gap-1 md:gap-2">
                    {displayContent.tags?.map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 md:px-2 md:py-0.5 bg-indigo-50 text-indigo-700 text-[10px] md:text-xs rounded-full font-semibold uppercase tracking-wider border border-indigo-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {displayContent.quote && (
                  <blockquote className="border-l-4 border-indigo-500 pl-3 md:pl-4 py-1 my-3 text-slate-600 italic text-sm md:text-base bg-slate-50 rounded-r pr-2">
                    "{displayContent.quote}"
                  </blockquote>
                )}
                
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                  {displayContent.content}
                </p>
              </div>

              {/* Right Column: Code Snippet (if exists) */}
              {displayContent.codeSnippet && (
                <div className="flex-1 md:w-1/2 md:border-l border-slate-100 md:pl-6 flex flex-col justify-center">
                  <div className="bg-slate-900 rounded-lg p-4 shadow-inner overflow-x-auto max-h-[300px] md:max-h-none overflow-y-auto custom-scrollbar">
                      <CodeBlock code={displayContent.codeSnippet} />
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 text-center uppercase tracking-widest font-semibold">
                      Example Comparison
                  </div>
                </div>
              )}
              
              {/* Visual hint for interaction - only show if no snippet and on desktop */}
              {!activeItem && !isMessyDominant && !displayContent.codeSnippet && (
                <div className="hidden md:flex flex-col items-center justify-center text-slate-400 text-sm w-32 shrink-0">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center mb-2 animate-bounce">
                      <span className="block w-1 h-1 bg-slate-400 rounded-full" />
                    </div>
                    <span>Hover items</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfoPanel;