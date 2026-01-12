import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex justify-between items-center px-4 py-3 md:px-6 md:py-4">
        {/* Blog Post Link - Bottom Left */}
        <a
          href="https://dev.to/suckup_de/do-not-fear-the-white-space-in-your-code-39d0"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-200 text-xs md:text-sm font-medium group"
          title="Read the original blog post"
        >
          <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Original Blog Post</span>
          <span className="sm:hidden">Blog</span>
        </a>

        {/* GitHub Link - Bottom Right */}
        <a
          href="https://github.com/voku/CodeFengShui"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-200 text-xs md:text-sm font-medium group"
          title="View source on GitHub and contribute"
        >
          <Github size={14} className="group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Contribute on GitHub</span>
          <span className="sm:hidden">GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
