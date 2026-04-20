# Notes Application - Full Stack Challenge 😀​

This is a full-stack SPA note-taking application developed using React and NestJS, satisfying all the requirements of Phase 1 and Phase 2.

## Technologies Used ​🤖​

- **Frontend:** React, Vite, Axios
- **Backend:** NestJS, TypeORM, SQLite3
- **Language:** TypeScript & JavaScript
- **Package Manager:** npm

## Requirements 🔧​

To run this application, you need the following installed:

- **Node.js:** >= 18.x
- **npm:** >= 9.x
- **Git** (for version control)
- **Linux/macOS** environment is recommended to run the provided start script. (Windows users can use Git Bash or WSL).

## How to Run ​🔍​

A bash script is provided to automatically install all dependencies and start both the backend and frontend concurrently.

1. Open your terminal in the project's root folder.
2. Ensure the script is executable:
   ```bash
   chmod +x run.sh
   ```
3. Run the script:
   ```bash
   ./run.sh
   ```

The script will start:
- **Backend:** Running at `http://localhost:3000`
- **Frontend:** Running typically at `http://localhost:5173` (Vite's default port; check your terminal output for the exact URL).

Alternatively, you can run them manually in separate terminal windows:
- **Backend:** `cd backend && npm install && npm run start:dev`
- **Frontend:** `cd frontend && npm install && npm run dev`

## Features Implemented

- **Phase 1 (Mandatory):**
  - Create, edit, delete, and list notes.
  - Archive/Unarchive notes and list archived notes separately.
  - Database persistence using TypeORM and SQLite.
  - Layered architecture on the backend (Controllers, Services, Repositories).
  - Single Page Application (SPA) structure.

- **Phase 2 (Extra):**
  - Add/remove categories to notes.
  - Filter notes by categories visually.
