# Notes Application 📝

This is a complete, full-stack Single Page Application (SPA) for note-taking, developed using React and NestJS. It allows you to create, manage, archive, and categorize your notes efficiently.

🌐 **Live Demo:** [https://mis-notas-seven.vercel.app/](https://mis-notas-seven.vercel.app/)

## Features ✨

- **Note Management:** Create, edit, delete, and list notes.
- **Archiving System:** Archive/Unarchive notes and view archived notes in a dedicated section.
- **Categorization:** Add and remove categories to your notes.
- **Filtering:** Quickly filter notes by categories using visual tags.
- **Persistence:** Reliable database storage using TypeORM and SQLite.
- **Architecture:** Robust backend built with a layered architecture (Controllers, Services, Repositories).

## Technologies Used ​🤖​

- **Frontend:** React, Vite, Axios
- **Backend:** NestJS, TypeORM, SQLite3
- **Language:** TypeScript & JavaScript
- **Package Manager:** npm

## Requirements 🔧​

To run this application locally, you need the following installed:

- **Node.js:** >= 18.x
- **npm:** >= 9.x
- **Git** (for version control)

## How to Run Locally ​🔍​

A bash script is provided to automatically install all dependencies and start both the backend and frontend concurrently (recommended for Linux/macOS or Git Bash/WSL on Windows).

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
