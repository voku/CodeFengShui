import { 
  Monitor, 
  Keyboard, 
  Coffee, 
  BookOpen, 
  PenTool, 
  Flower2, 
  Smartphone,
  Mouse,
  Glasses,
  Headphones
} from 'lucide-react';
import { DeskItemConfig, BlogSection } from './types';

export const DESK_ITEMS: DeskItemConfig[] = [
  {
    id: 'monitor',
    label: 'Main Display',
    icon: Monitor,
    color: 'text-slate-800',
    messyPos: { top: '30%', left: '45%', rotation: -15, zIndex: 10 },
    blogData: {
      title: "Active Element",
      quote: "White space is to be regarded as an active element, not a passive background.",
      content: "Just as a screen frames your work, white space frames your code. It isn't merely 'empty space' but a powerful design tool that guides the eye. Apple uses expansive white space to signal simplicity; we should use it to make code instantly consumable.",
      tags: ['Design', 'Focus'],
      codeSnippet: `// Crowded
const Header=()=><div style={{margin:0,padding:0}}>...</div>;

// Active Space
const Header = () => (
  <div className="p-8 mb-6">
    ...
  </div>
);`
    }
  },
  {
    id: 'keyboard',
    label: 'Keyboard',
    icon: Keyboard,
    color: 'text-slate-600',
    messyPos: { top: '55%', left: '40%', rotation: 25, zIndex: 20 },
    blogData: {
      title: "Input & Comprehension",
      content: "Your mind naturally filters, adds, and removes details from what you see. We must format our code so it can be easily processed. Effective use of white space has been shown to increase comprehension by nearly 20%.",
      tags: ['Design', 'Readability'],
      codeSnippet: `/* Hard to scan */
.btn{background:red;color:white;padding:10px;margin:5px}

/* Easy to scan */
.btn {
  background: red;
  color: white;
  padding: 10px;
  margin: 5px;
}`
    }
  },
  {
    id: 'notebook',
    label: 'Code Notebook',
    icon: BookOpen,
    color: 'text-amber-700',
    messyPos: { top: '58%', left: '15%', rotation: 45, zIndex: 5 },
    blogData: {
      title: "Vertical & Horizontal",
      content: "Vertical whitespace (blank lines) separates logical blocks, like paragraphs in text. Horizontal whitespace (indentation) visualizes hierarchy. Neither is wasted space; both are essential structure. Don't fear the return key.",
      tags: ['Structure', 'Formatting'],
      codeSnippet: `// Dense
function calc(x,y){let a=x*2;let b=y/2;return a+b;}

// Breathing
function calc(x, y) {
  let a = x * 2;
  let b = y / 2;
  
  return a + b;
}`
    }
  },
  {
    id: 'pens',
    label: 'Stationery',
    icon: PenTool,
    color: 'text-blue-600',
    messyPos: { top: '20%', left: '80%', rotation: 120, zIndex: 15 },
    blogData: {
      title: "Proximity",
      content: "The Law of Proximity states that objects near each other tend to be grouped together. Don't scatter related logic. Group your CSS properties, variable declarations, and helper functions. If they are related, keep them close.",
      tags: ['Structure', 'Gestalt'],
      codeSnippet: `// Disconnected
const userName = 'Alice';
let isLoggedIn = true;
const userAge = 25;
let hasToken = false;

// Grouped by Logic
const userName = 'Alice';
const userAge = 25;

let isLoggedIn = true;
let hasToken = false;`
    }
  },
  {
    id: 'coffee',
    label: 'Fuel',
    icon: Coffee,
    color: 'text-amber-900',
    messyPos: { top: '45%', left: '55%', rotation: 0, zIndex: 30 },
    blogData: {
      title: "Consistency",
      content: "The golden rule: Be Consistent! Don't mix tabs and spaces. Don't randomize brace styles. If a style guide doesn't exist, create one and stick to it. Consistency reduces cognitive load.",
      tags: ['Standards', 'Consistency'],
      codeSnippet: `// Inconsistent
if(x){
  doSomething();
} else 
  { doOther(); }

// Consistent
if (x) {
  doSomething();
} else {
  doOther();
}`
    }
  },
  {
    id: 'glasses',
    label: 'Linter',
    icon: Glasses,
    color: 'text-emerald-800',
    messyPos: { top: '35%', left: '22%', rotation: -30, zIndex: 8 },
    blogData: {
      title: "Automated Rules",
      content: "Don't rely on willpower to maintain whitespace. Use tools like ESLint and Prettier to enforce 'Best Practices' automatically. When the machine handles the layout, your brain is free to handle the logic.",
      tags: ['Standards', 'Automation'],
      codeSnippet: `// .prettierrc
{
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true
}

// Result: No arguments.`
    }
  },
  {
    id: 'plant',
    label: 'Decor',
    icon: Flower2,
    color: 'text-green-600',
    messyPos: { top: '15%', left: '10%', rotation: -10, zIndex: 2 },
    blogData: {
      title: "Pattern Recognition",
      content: "Our brains are wired to find patterns. Code that looks structurally similar implies it performs a similar function. Use alignment to create symmetry and leverage this natural expectation.",
      tags: ['Structure', 'Pattern'],
      codeSnippet: `// Random Alignment
const x = 1;
const speed = 200;
const direction = 'North';

// Symmetrical / Aligned
const x         = 1;
const speed     = 200;
const direction = 'North';`
    }
  },
  {
    id: 'phone',
    label: 'Device',
    icon: Smartphone,
    color: 'text-zinc-500',
    messyPos: { top: '42%', left: '85%', rotation: 90, zIndex: 25 },
    blogData: {
      title: "Diff Clarity",
      content: "Whitespace changes can clutter version control history. Use tools like 'git diff -w' to ignore them, but better yet—automate your formatting (Prettier, ESLint) so diffs highlight logic changes, not style debates.",
      tags: ['Workflow', 'Git'],
      codeSnippet: `$ git diff
- const a=1;
+ const a = 1;

# Auto-format ends debates`
    }
  },
  {
    id: 'mouse',
    label: 'Mouse',
    icon: Mouse,
    color: 'text-slate-700',
    messyPos: { top: '58%', left: '62%', rotation: -45, zIndex: 22 },
    blogData: {
      title: "Scanning vs. Reading",
      content: "Developers don't read code top-to-bottom like a novel; they scan it like a newspaper. We jump from headline to headline. White space creates the 'paragraphs' that make this scanning possible.",
      tags: ['Workflow', 'Scanning'],
      codeSnippet: `// Wall of text
class User{name;age;save(){...}delete(){...}update(){...}}

// Scannable
class User {
  name;
  age;

  save()   { ... }
  delete() { ... }
  update() { ... }
}`
    }
  },
  {
    id: 'headphones',
    label: 'Focus Mode',
    icon: Headphones,
    color: 'text-indigo-400',
    messyPos: { top: '12%', left: '65%', rotation: 15, zIndex: 12 },
    blogData: {
      title: "Signal vs. Noise",
      content: "Dense code is noisy code. It shouts every detail at once. Generous whitespace acts as a filter, reducing the visual noise so the important signals—function names, return values, and logic branches—stand out clearly.",
      tags: ['Design', 'Signal'],
      codeSnippet: `// Noisy
const f=(d)=>{if(d.v)return d.v*2;return 0;}

// Clear Signal
const f = (data) => {
  // Logic stands out
  if (data.isValid) {
    return data.value * 2;
  }
  
  return 0;
}`
    }
  }
];

export const INTRO_CONTENT: BlogSection = {
  title: "Do Not Fear The White Space",
  quote: "Move the slider to organize the chaos.",
  content: "White space in your code is like a clean desk. It is not empty; it is an active design element that reduces cognitive load, improves readability, and helps you focus on what matters. Explore the items on the clean desk to learn more.",
  tags: ['Intro', 'Concept']
};