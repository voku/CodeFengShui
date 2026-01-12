<div align="center">
<img width="1200" height="475" alt="Code Feng Shui Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Code Feng Shui: The Art of White Space

An interactive web application that demonstrates the importance of whitespace in code through a visual desk metaphor. Drag the slider to transform chaos into clarity and explore key code design principles.

🌐 **Live Demo:** [https://voku.github.io/CodeFengShui/](https://voku.github.io/CodeFengShui/)

📝 **Original Blog Post:** [Do Not Fear The White Space in Your Code](https://dev.to/suckup_de/do-not-fear-the-white-space-in-your-code-39d0)

## About

Code Feng Shui teaches developers about the power of whitespace through an engaging interactive experience. The application presents a split view:

- **Messy Desk** (left): Represents cluttered, hard-to-read code
- **Clean Desk** (right): Represents well-formatted, maintainable code

Explore 10 interactive desk items, each illustrating a core principle:
- Active Element
- Input & Comprehension
- Vertical & Horizontal Spacing
- Proximity & Grouping
- Consistency
- Automated Rules
- Pattern Recognition
- Diff Clarity
- Scanning vs. Reading
- Signal vs. Noise

## Features

- 🎨 Interactive slider to compare messy vs. clean code organization
- 📚 10 interactive learning modules with code examples
- 🏷️ Category filtering system
- 📱 Fully responsive design (mobile & desktop)
- ⚡ Built with React, TypeScript, and Framer Motion
- 🎯 No external dependencies or API keys required

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/voku/CodeFengShui.git
   cd CodeFengShui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Build for Production

Build the application for production deployment:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions. Every push to the `main` branch triggers a build and deployment.

To deploy to your own GitHub Pages:

1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Select "GitHub Actions" as the source
4. Push to the `main` branch

## Key Files Detector

Use this prompt with AI assistants to quickly understand the project structure:

```
List and explain the key files in this Code Feng Shui project:
- What does each TypeScript/TSX file do?
- What are the main components and their responsibilities?
- How is the desk metaphor implemented?
- What configuration files are important?
```

**Key Files:**
- `App.tsx` - Main application component with slider logic
- `components/DeskLayer.tsx` - Renders clean/messy desk items
- `components/InfoPanel.tsx` - Educational content display
- `constants.ts` - Desk items configuration and content
- `types.ts` - TypeScript type definitions
- `vite.config.ts` - Vite bundler configuration
- `index.html` - HTML entry point

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **Lucide React** - Icon system
- **Tailwind CSS** - Styling (via CDN)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available for educational purposes.

## Credits

Created by [voku](https://github.com/voku)

Original concept from the blog post: [Do Not Fear The White Space in Your Code](https://dev.to/suckup_de/do-not-fear-the-white-space-in-your-code-39d0)

---

⭐ If you find this project helpful, please consider giving it a star on [GitHub](https://github.com/voku/CodeFengShui)!
