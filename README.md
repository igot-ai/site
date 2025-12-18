# Data Labeling Platform

This is a code bundle for Data Labeling Platform. The original project is available at https://www.figma.com/design/V0EUOzG7fJW5UwIMbpCfvm/Data-Labeling-Platform.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icons

## Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

## Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main app component
│   ├── components/
│   │   ├── Dashboard.tsx       # Dashboard page
│   │   ├── LabelingStudio.tsx  # Labeling studio page
│   │   ├── MassiveImport.tsx   # Import page
│   │   ├── DatasetGeneration.tsx # Dataset generation page
│   │   ├── Layout.tsx          # Main layout with navigation
│   │   └── ui/                 # Reusable UI components (shadcn/ui)
│   └── ...
├── assets/                     # Static assets (images, etc.)
├── styles/                     # Global styles and themes
└── main.tsx                    # Entry point
```

## Features

- **Dashboard** - Overview of datasets and activity
- **Massive Import** - Import large datasets from cloud storage
- **Dataset Generation** - Generate synthetic datasets
- **Labeling Studio** - Professional annotation tools

## Development

The project uses:
- Path aliases (`@/` for `src/`)
- TypeScript strict mode
- Tailwind CSS v4 with custom theme
- Modern React patterns (hooks, functional components)

## License

See LICENSE file for details.