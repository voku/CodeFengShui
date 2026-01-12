import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GripVertical, Sparkles, Zap } from 'lucide-react';
import DeskLayer from './components/DeskLayer';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';
import { DeskItemConfig } from './types';

const App: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  
  // Split state into hovered (temporary) and selected (persistent)
  const [hoveredItem, setHoveredItem] = useState<DeskItemConfig | null>(null);
  const [selectedItem, setSelectedItem] = useState<DeskItemConfig | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  
  const activeItem = hoveredItem || selectedItem;

  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e 
      ? (e as unknown as TouchEvent).touches[0].clientX 
      : (e as MouseEvent).clientX;
      
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global event listeners for drag release
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove as any);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove as any);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleItemClick = (item: DeskItemConfig) => {
    setSelectedItem(item);
    // Always show panel when user explicitly clicks an item
    setIsPanelVisible(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      
      {/* Header / Title Overlay (Top Left) */}
      <div className="absolute top-0 left-0 p-4 md:p-6 lg:p-8 z-50 pointer-events-none max-w-[60%] md:max-w-md">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-slate-800 drop-shadow-sm tracking-tight mb-1 bg-white/50 backdrop-blur-sm md:bg-transparent px-2 py-1 md:p-0 rounded-lg md:rounded-none inline-block">
          Code <span className="text-indigo-600">Feng Shui</span>
        </h1>
        <p className="hidden md:block text-slate-600 font-medium max-w-xs text-sm md:text-base">
          Drag the slider to transform chaos into clarity.
        </p>
      </div>

      {/* Auto Toggle Controls (Top Right) */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200">
        <button 
           onClick={() => { setSliderPosition(0); setSelectedItem(null); }}
           className={`
             flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300
             ${sliderPosition < 5 
               ? 'bg-amber-100 text-amber-800 shadow-sm ring-1 ring-amber-200' 
               : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}
           `}
        >
           <Zap size={14} className={sliderPosition < 5 ? "fill-amber-800" : ""} />
           <span>Chaos</span>
        </button>
        <button 
           onClick={() => { setSliderPosition(100); setSelectedItem(null); }}
           className={`
             flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300
             ${sliderPosition > 95 
               ? 'bg-indigo-100 text-indigo-800 shadow-sm ring-1 ring-indigo-200' 
               : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}
           `}
        >
           <span>Clarity</span>
           <Sparkles size={14} className={sliderPosition > 95 ? "fill-indigo-800" : ""} />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-col-resize select-none"
        onMouseDown={(e) => {
          setIsDragging(true);
          setSelectedItem(null); // Clicking background clears persistent selection
          handleMouseMove(e);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          setSelectedItem(null);
          handleMouseMove(e);
        }}
      >
        {/* Layer 1: Messy Desk (Underneath) */}
        <div className="absolute inset-0 z-0">
           <DeskLayer 
             type="messy" 
             onItemHover={setHoveredItem}
             onItemClick={handleItemClick}
             isPanelVisible={isPanelVisible}
             onTogglePanel={() => setIsPanelVisible(!isPanelVisible)}
           />
        </div>

        {/* Layer 2: Clean Desk (Top, clipped) */}
        {/* 
            We apply a transition to clip-path ONLY when not dragging.
            This ensures smooth auto-movement but responsive dragging.
        */}
        <div 
          className={`absolute inset-0 z-10 will-change-[clip-path] ${!isDragging ? 'transition-[clip-path] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
          style={{ 
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` 
          }}
        >
          <DeskLayer 
            type="clean" 
            onItemHover={setHoveredItem}
            onItemClick={handleItemClick}
            isPanelVisible={isPanelVisible}
            onTogglePanel={() => setIsPanelVisible(!isPanelVisible)}
          />
        </div>

        {/* The Slider Handle */}
        <div 
          className={`
            absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-40 shadow-[0_0_10px_rgba(0,0,0,0.3)] 
            flex items-center justify-center hover:bg-indigo-400 
            ${!isDragging ? 'transition-[left] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}
          `}
          style={{ 
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all border border-slate-100">
            <GripVertical size={20} className="md:w-6 md:h-6" />
          </div>
        </div>

      </div>

      {/* Info Panel Overlay */}
      <InfoPanel 
        activeItem={activeItem} 
        isMessyDominant={sliderPosition < 30}
        isVisible={isPanelVisible}
      />

      {/* Footer with Blog Post and GitHub Links */}
      <Footer />
    </div>
  );
};

export default App;