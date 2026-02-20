# Minesweeper Pro | Next.js + TypeScript

A modern implementation of the classic Minesweeper game. This project serves as a technical showcase of transitioning complex logic from **Python** to a modern **React/Next.js** web stack.

## 🚀 Key Features
- **Modern UI/UX**: Built with **Tailwind CSS** using a dark-mode aesthetic.
- **Recursive Logic**: Implements the classic "Flood Fill" algorithm for cell expansion.
- **Robust State Management**: Built using React Hooks (`useState`, `useEffect`) following immutability principles.
- **Type Safety**: Fully typed with **TypeScript**, ensuring code reliability and clear structures.

## 🛠️ Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 💡 Technical Challenge: From Python to Web
This project was refactored from a legacy Python/Tkinter codebase. I successfully migrated:
1. **Matrix Generation**: Adapted randomized mine placement logic.
2. **Event Handling**: Transitioned from Tkinter's `<Button-3>` to React's `onContextMenu` for flagging.
3. **Performance Optimization**: Solved cascading render issues by using lazy state initialization, a crucial skill for Junior Developers.

## 🏁 How to Run
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)