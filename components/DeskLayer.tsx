import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DESK_ITEMS } from '../constants';
import { DeskItemConfig } from '../types';
import { LayoutGrid, Check, Eye, EyeOff } from 'lucide-react';

interface DeskLayerProps {
  type: 'clean' | 'messy';
  onItemHover: (item: DeskItemConfig | null) => void;
  onItemClick: (item: DeskItemConfig) => void;
  isPanelVisible: boolean;
  onTogglePanel: () => void;
}

const getTagStyle = (tag: string) => {
  const t = tag.trim();
  // Blue: Conceptual / UX / Perception
  if (['Design', 'Readability', 'Focus', 'UX', 'Concept', 'Intro', 'Signal'].includes(t)) 
    return 'bg-blue-100 text-blue-700 border-blue-200';
  
  // Amber: Structure / Arrangement / Gestalt
  if (['Formatting', 'Structure', 'Proximity', 'Symmetry', 'Pattern', 'Gestalt', 'Grouping'].includes(t)) 
    return 'bg-amber-100 text-amber-800 border-amber-200';
  
  // Emerald: Rules / Standards
  if (['Standards', 'Discipline', 'Best Practice', 'Consistency', 'Automation'].includes(t)) 
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  
  // Rose: Tools / Workflow / Performance
  if (['Git', 'Tooling', 'Workflow', 'Speed', 'Scanning'].includes(t)) 
    return 'bg-rose-100 text-rose-700 border-rose-200';
  
  // Default
  return 'bg-slate-100 text-slate-600 border-slate-200';
};

const DeskLayer: React.FC<DeskLayerProps> = ({ type, onItemHover, onItemClick, isPanelVisible, onTogglePanel }) => {
  const isClean = type === 'clean';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const filteredItems = isClean && selectedCategory
    ? DESK_ITEMS.filter(item => item.blogData.tags?.[0] === selectedCategory)
    : DESK_ITEMS;

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    onItemHover(null);
  };

  // Extract unique categories in order of appearance
  const categories = Array.from(new Set(DESK_ITEMS.map(item => item.blogData.tags?.[0]).filter(Boolean) as string[]));

  return (
    <div className={`w-full h-full relative transition-colors duration-700 overflow-hidden font-sans`}>
      {/* Desk Surface Details */}
      {isClean ? (
        // Clean desk: Sleek, white/gray surface. Technical drawing board vibe.
        <div className="absolute inset-0 bg-slate-50">
           {/* Technical Dual Grid Pattern (Major and Minor lines) */}
           <div 
             className="absolute inset-0 pointer-events-none opacity-40"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(148, 163, 184, 0.4) 1px, transparent 1px),
                 linear-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(148, 163, 184, 0.15) 1px, transparent 1px)
               `,
               backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
               backgroundPosition: '-1px -1px'
             }}
           />
           
           {/* Ruler markings hint (Top edge) */}
           <div 
            className="absolute top-0 left-0 right-0 h-8 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(90deg, #94a3b8 1px, transparent 1px)`,
              backgroundSize: '20px 100%'
            }}
           />
           {/* Ruler markings hint (Left edge) */}
           <div 
            className="absolute top-0 left-0 bottom-0 w-8 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px)`,
              backgroundSize: '100% 20px'
            }}
           />

           {/* Subtle gradient to imply lighting from top-left */}
           <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-slate-100/30 pointer-events-none" />
           
           {/* Desk Pad / Active Area visual hint */}
           <div className="absolute inset-4 md:inset-10 border-2 border-dashed border-slate-300 rounded-[2rem] md:rounded-[3rem] opacity-30 pointer-events-none" />
        </div>
      ) : (
        // Messy desk: Warm wood texture
        <div className="absolute inset-0 bg-[#Cca47c]">
           {/* Wood Grain Simulation */}
           <div 
             className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply" 
             style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg, 
                    rgba(80, 50, 20, 0.1) 0px, 
                    rgba(80, 50, 20, 0.1) 2px, 
                    transparent 2px, 
                    transparent 8px
                  ),
                  repeating-linear-gradient(
                    -12deg, 
                    rgba(80, 50, 20, 0.08) 0px, 
                    rgba(80, 50, 20, 0.08) 1px, 
                    transparent 1px, 
                    transparent 15px
                  )
                `,
             }}
           />
           
           {/* Scratches/Texture layer */}
           <div 
             className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color-burn"
             style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    80deg, 
                    transparent 0px, 
                    transparent 98px, 
                    rgba(0,0,0,0.2) 99px, 
                    transparent 100px
                  )
                `,
             }}
           />
           
           {/* Vignette for focus and depth */}
           <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(40,20,5,0.5)] pointer-events-none" />
           
           {/* Decorative Stain 1 */}
           <div 
             className="absolute top-[20%] right-[30%] w-40 h-40 rounded-full border-[6px] border-[#5d4037] opacity-10 blur-[1px] pointer-events-none" 
             style={{ maskImage: 'radial-gradient(transparent 50%, black 100%)', transform: 'rotate(15deg) scale(1.1)' }} 
           />
           {/* Decorative Stain 2 (Solid drip) */}
           <div 
             className="absolute bottom-[20%] left-[10%] w-24 h-24 rounded-full bg-[#5d4037] opacity-5 blur-[20px] pointer-events-none" 
           />
           {/* Scuff marks */}
            <div 
             className="absolute top-[60%] left-[40%] w-32 h-1 bg-black/10 rotate-12 blur-[1px] pointer-events-none" 
           />
        </div>
      )}

      {/* Container */}
      <motion.div 
        className={`w-full h-full p-4 md:p-8 lg:p-12 ${
          isClean 
            ? 'flex flex-col items-center justify-start max-w-7xl mx-auto pt-24 md:pt-32 lg:pt-36' 
            : 'relative'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Concept Filter - Clean Mode Only */}
        {isClean && (
          <motion.div 
            className="w-full max-w-5xl mb-8 md:mb-12 relative z-50 pointer-events-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div 
              className="flex flex-col items-center gap-2"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 font-semibold mb-1">Explore by Category</span>
              
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-2">
                
                {/* Combined Toggle + All Concepts Button */}
                <div className={`
                    flex items-center rounded-full border transition-all duration-300
                    ${!selectedCategory 
                      ? 'bg-slate-800 border-slate-800 text-white shadow-lg scale-105 ring-2 ring-slate-200' 
                      : 'bg-white/80 border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-white'}
                  `}>
                  
                  {/* UI Toggle Part */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePanel();
                    }}
                    className={`
                      pl-3 pr-2 py-1.5 flex items-center justify-center border-r transition-colors
                      ${!selectedCategory ? 'border-white/20 hover:bg-white/10' : 'border-slate-200 hover:bg-slate-50'}
                    `}
                    title={isPanelVisible ? "Hide UI" : "Show UI"}
                  >
                    {isPanelVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>

                  {/* All Concepts Part */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategorySelect(null);
                    }}
                    className={`
                      pl-2 pr-3 py-1.5 flex items-center gap-2 text-xs md:text-sm font-medium transition-colors
                      ${!selectedCategory ? 'hover:bg-white/10' : 'hover:bg-slate-50'}
                    `}
                  >
                    <LayoutGrid size={14} />
                    <span>All Concepts</span>
                  </button>
                </div>

                {/* Category Buttons */}
                {categories.map(category => {
                   const tagStyle = getTagStyle(category);
                   const isSelected = selectedCategory === category;
                   const count = DESK_ITEMS.filter(i => i.blogData.tags?.[0] === category).length;

                   return (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`
                          pl-3 pr-2 py-1.5 rounded-full text-xs md:text-sm transition-all duration-300 border flex items-center gap-2 font-medium
                          ${isSelected
                            ? `${tagStyle} shadow-lg scale-105 ring-2 ring-white`
                            : `bg-white/80 text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-white`}
                        `}
                      >
                         {isSelected && <Check size={14} className="mr-1" />}
                         <span>{category}</span>
                         <span className={`text-[10px] px-1.5 py-0.5 rounded-full bg-black/5 text-current opacity-70`}>
                           {count}
                         </span>
                      </button>
                   );
                })}
              </div>
            </div>
          </motion.div>
        )}

        <div className={isClean ? "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:gap-8 w-full justify-items-center relative z-10" : "contents"}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const Icon = item.icon;
              
              let itemVariants;
              let itemStyle: React.CSSProperties;
              let hoverProps;

              if (isClean) {
                itemStyle = {
                   position: 'relative',
                   zIndex: 1,
                };
                itemVariants = {
                  hidden: { opacity: 0, y: 40, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { type: 'spring', stiffness: 120, damping: 20, mass: 1 }
                  },
                  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
                };
                hoverProps = {
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)",
                  borderColor: "rgba(99, 102, 241, 0.3)", // subtle indigo glow
                  transition: { type: 'spring', stiffness: 400, damping: 25 }
                };
              } else {
                // Messy
                itemStyle = {
                  position: 'absolute',
                  top: item.messyPos.top,
                  left: item.messyPos.left,
                  zIndex: item.messyPos.zIndex,
                };
                
                const randomOffset = (index % 2 === 0 ? 1 : -1) * (10 + (index % 3) * 5);
                
                itemVariants = {
                  hidden: { 
                    opacity: 0, 
                    scale: 0.6,
                    x: "-50%", 
                    y: "-50%", 
                    rotate: item.messyPos.rotation + randomOffset 
                  },
                  visible: { 
                    opacity: 0.95, 
                    scale: 1,
                    x: "-50%", 
                    y: "-50%", 
                    rotate: item.messyPos.rotation,
                    transition: { 
                      type: 'spring', 
                      stiffness: 150, 
                      damping: 15,
                      mass: 0.9
                    }
                  }
                };
                hoverProps = {
                  scale: 1.1,
                  opacity: 1,
                  zIndex: 100,
                  rotate: 0,
                  boxShadow: "0 35px 50px -15px rgba(0,0,0,0.3)",
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                };
              }

              // Responsive card sizing
              const cardClass = isClean 
                ? "bg-white border border-slate-200 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.12),0_2px_6px_-1px_rgba(0,0,0,0.08)] rounded-[1.25rem] md:rounded-[2rem] aspect-square w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40" 
                : "bg-white/95 border border-amber-100/50 shadow-xl backdrop-blur-sm rounded-lg aspect-[4/3] w-20 md:w-28 lg:w-40";

              return (
                <motion.div
                  key={item.id}
                  layout={isClean} // Only animate layout changes in clean mode
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`
                    group flex flex-col items-center justify-center p-2 md:p-3 relative overflow-hidden
                    cursor-pointer select-none
                    ${cardClass}
                  `}
                  style={itemStyle}
                  whileHover={hoverProps}
                  // Stop propagation here to prevent the slider dragging when interacting with items
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onMouseEnter={() => onItemHover(item)}
                  onMouseLeave={() => onItemHover(null)}
                  onClick={() => {
                     // Set the item as explicitly selected for the info panel
                     onItemClick(item);

                     // If clicking an item, enable its category filter if not already enabled
                     const category = item.blogData.tags?.[0];
                     if (category && selectedCategory !== category) {
                         handleCategorySelect(category);
                     }
                  }}
                >
                   {/* Decorative Visuals: Clean Syntax vs Broken Code */}
                   {isClean ? (
                     <div className="absolute inset-0 pointer-events-none opacity-[0.08] flex flex-col items-start justify-center p-3 md:p-4 lg:p-6 gap-1 md:gap-1.5 lg:gap-2">
                        {/* Simulated Clean Code Block */}
                        <div className="w-2/3 h-1 md:h-1.5 lg:h-2 bg-indigo-500 rounded-full mb-0.5" />
                        <div className="flex gap-1 w-full">
                           <div className="w-1/5 h-1 md:h-1.5 lg:h-2 bg-purple-500 rounded-full" />
                           <div className="w-1/3 h-1 md:h-1.5 lg:h-2 bg-slate-400 rounded-full" />
                        </div>
                        <div className="flex gap-1 w-full pl-3 md:pl-4">
                           <div className="w-1/4 h-1 md:h-1.5 lg:h-2 bg-emerald-500 rounded-full" />
                           <div className="w-1/4 h-1 md:h-1.5 lg:h-2 bg-blue-400 rounded-full" />
                        </div>
                         <div className="flex gap-1 w-full pl-3 md:pl-4">
                           <div className="w-1/3 h-1 md:h-1.5 lg:h-2 bg-slate-400 rounded-full" />
                        </div>
                        <div className="w-1/2 h-1 md:h-1.5 lg:h-2 bg-slate-300 rounded-full mt-0.5" />
                     </div>
                   ) : (
                     <div className="absolute inset-0 pointer-events-none opacity-20 p-2 overflow-hidden rotate-2">
                       {/* Simulated Broken Code / Chaos */}
                       <div className="font-mono text-[6px] md:text-[8px] text-red-900/60 leading-tight">
                         {"<<< HEAD"}<br/>
                         {"var x=1;"}<br/>
                         {"// TODO"}<br/>
                         {";;;;}"}<br/>
                         {"err"}
                       </div>
                       <div className="absolute bottom-2 right-2 w-12 h-12 bg-red-500/10 rounded-full blur-lg" />
                     </div>
                   )}

                   {/* Decorative subtle background gradient for card */}
                   <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none 
                     ${isClean ? 'from-indigo-50/0 to-indigo-50/80' : 'from-amber-50/0 to-amber-100/40'}`} 
                   />
                   
                   {/* Icon Container */}
                   <div className={`
                     relative flex items-center justify-center rounded-2xl mb-1.5 md:mb-3 transition-all duration-300 z-10
                     ${isClean ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-slate-50 group-hover:bg-white group-hover:shadow-md' : 'w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14'}
                   `}>
                     <Icon 
                       className={`
                         ${item.color} 
                         drop-shadow-sm
                         transition-transform duration-300 
                         group-hover:scale-110
                         w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8
                       `}
                       strokeWidth={isClean ? 1.5 : 2}
                     />
                   </div>

                  <span className={`
                    text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wide text-slate-700 text-center leading-tight z-10
                    ${isClean ? 'opacity-90' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 px-2 py-1 rounded-full shadow-sm border border-slate-100'}
                  `}>
                    {item.label}
                  </span>
                  
                  {/* Shine effect for clean items */}
                  {isClean && (
                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-white/80 to-transparent rounded-bl-full pointer-events-none opacity-40" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default DeskLayer;