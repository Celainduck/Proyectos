#!/bin/bash

echo "Starting fullstack app setup..."

# Install dependencies and start backend
echo "Setting up backend..."
cd backend
npm install
npm run start:dev &
BACKEND_PID=$!

# Install dependencies and start frontend
echo "Setting up frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "Both frontend and backend are starting up."
echo "Press Ctrl+C to stop both processes."

# Function to cleanly shut down background processes on exit
cleanup() {
    echo "Stopping applications..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit
}

# Trap Ctrl+C (SIGINT) to run cleanup
trap cleanup SIGINT SIGTERM

# Wait for background processes to keep script running
wait $BACKEND_PID
wait $FRONTEND_PID
