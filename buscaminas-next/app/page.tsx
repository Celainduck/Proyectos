'use client';
import React, { useState, useEffect } from 'react';


export type Cell = {
  isBomb: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  neighborCount: number;
};

const createEmptyGrid = (rows: number, cols: number): Cell[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isBomb: false,
      isOpen: false,
      isFlagged: false,
      neighborCount: 0,
    }))
  );
};

const placeMinesSafe = (grid: Cell[][], minesCount: number, rowClick: number, colClick: number): Cell[][] => {
  const newGrid = JSON.parse(JSON.stringify(grid));
  let placed = 0;
  const rows = newGrid.length;
  const cols = newGrid[0].length;

  while (placed < minesCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    const isForbidden = Math.abs(r - rowClick) <= 1 && Math.abs(c - colClick) <= 1;

    if (!newGrid[r][c].isBomb && !isForbidden) {
      newGrid[r][c].isBomb = true;
      placed++;
    }
  }
  return newGrid;
};

const calculateNeighbors = (grid: Cell[][]): Cell[][] => {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid: Cell[][] = JSON.parse(JSON.stringify(grid));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (newGrid[r][c].isBomb) continue;
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = r + i;
          const newCol = c + j;
          if (
            newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < cols &&
            newGrid[newRow][newCol].isBomb
          ) {
            count++;
          }
        }
      }
      newGrid[r][c].neighborCount = count;
    }
  }
  return newGrid;
};

const revealCellRecursively = (grid: Cell[][], r: number, c: number) => {
  const rows = grid.length;
  const cols = grid[0].length;

  if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c].isOpen || grid[r][c].isFlagged) {
    return;
  }

  grid[r][c].isOpen = true;

  if (grid[r][c].neighborCount === 0 && !grid[r][c].isBomb) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 || j !== 0) {
          revealCellRecursively(grid, r + i, c + j);
        }
      }
    }
  }
};

const getNumberColor = (num: number) => {
  const colors = [
    '',                // 0
    'text-blue-400',   // 1
    'text-green-400',  // 2
    'text-red-400',    // 3
    'text-purple-400', // 4
    'text-yellow-400', // 5
    'text-cyan-400',   // 6
    'text-orange-400', // 7
    'text-zinc-400'    // 8
  ];
  return colors[num] || 'text-white';
};

const revealAllBombs = (grid: Cell[][]) => {
  grid.forEach(row => row.forEach(cell => {
    if (cell.isBomb) cell.isOpen = true;
  }));
};

// --- COMPONENTE PRINCIPAL ---

export default function BuscaminasPage() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [gameWon, setGameWon] = useState(false);

  const startGame = () => {
    const newGrid = createEmptyGrid(10, 10);
    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false); // Reiniciamos estado de victoria
    setIsFirstClick(true);
  };

  useEffect(() => {
    startGame();
  }, []);

  const checkWin = (currentGrid: Cell[][]) => {
    const totalCells = currentGrid.length * currentGrid[0].length;
    const openedCells = currentGrid.flat().filter(cell => cell.isOpen).length;
    const minesCount = 15;

    if (totalCells - openedCells === minesCount) {
      setGameWon(true);
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (gameOver || gameWon || grid[r][c].isOpen || grid[r][c].isFlagged) return;

    let currentGrid = JSON.parse(JSON.stringify(grid));

    if (isFirstClick) {
      currentGrid = placeMinesSafe(currentGrid, 15, r, c);
      currentGrid = calculateNeighbors(currentGrid);
      setIsFirstClick(false);
    }

    if (currentGrid[r][c].isBomb) {
      setGameOver(true);
      revealAllBombs(currentGrid);
      setGrid(currentGrid);
      return;
    }

    revealCellRecursively(currentGrid, r, c);
    setGrid(currentGrid);
    checkWin(currentGrid);
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || gameWon || grid[r][c].isOpen) return;

    const newGrid: Cell[][] = JSON.parse(JSON.stringify(grid));
    newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
    setGrid(newGrid);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-4 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-emerald-500 tracking-tighter">BUSCAMINAS</h1>

      <button
        onClick={startGame}
        className="mb-8 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold transition-all shadow-lg active:scale-95"
      >
        {gameOver || gameWon ? 'Juego nuevo' : 'Reiniciar'}
      </button>

      <div className="grid grid-cols-10 gap-1 bg-zinc-800 p-2 rounded-lg shadow-2xl border border-zinc-700">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              onContextMenu={(e) => handleRightClick(e, r, c)}
              className={`w-9 h-9 flex items-center justify-center cursor-pointer rounded-sm text-lg font-bold transition-all duration-200
                ${cell.isOpen
                  ? 'bg-zinc-900 border-zinc-800 shadow-inner'
                  : 'bg-zinc-600 hover:bg-zinc-500 shadow-md active:scale-90'}
                ${cell.isOpen && cell.isBomb ? 'bg-red-700 animate-bounce' : ''} 
              `}
            >
              {cell.isOpen ? (
                cell.isBomb ? '💣' : (
                  <span className={getNumberColor(cell.neighborCount)}>
                    {cell.neighborCount || ''}
                  </span>
                )
              ) : (
                cell.isFlagged ? <span className="animate-in fade-in zoom-in">🚩</span> : ''
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-center h-16">
        {gameOver && (
          <div className="animate-bounce">
            <p className="text-red-500 text-3xl font-black tracking-widest">¡BOOM! PERDISTE</p>
          </div>
        )}
        {gameWon && (
          <div className="animate-pulse">
            <p className="text-emerald-400 text-3xl font-black tracking-widest uppercase">¡Ganaste!</p>
          </div>
        )}
      </div>
    </main>
  );
}