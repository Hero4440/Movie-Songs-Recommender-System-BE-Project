#!/bin/bash

# Script to stop frontend and backend processes
# Works on macOS, Windows (Git Bash), and Linux

# Detect the operating system
detect_os() {
    case "$(uname -s)" in
        Darwin*)
            echo "macos"
            ;;
        MINGW*|MSYS*|CYGWIN*)
            echo "windows"
            ;;
        Linux*)
            echo "linux"
            ;;
        *)
            echo "unknown"
            ;;
    esac
}

# Function to stop on macOS
stop_macos() {
    echo "Stopping Movie Songs Recommender System..."

    # Find and kill React development server (runs on port 3000)
    echo "Stopping Frontend (React)..."
    REACT_PID=$(lsof -ti:3000 2>/dev/null)
    if [ ! -z "$REACT_PID" ]; then
        kill -9 $REACT_PID 2>/dev/null
        echo "✓ Frontend stopped (PID: $REACT_PID)"
    else
        echo "✗ Frontend not running on port 3000"
    fi

    # Find and kill Flask server (runs on port 5000)
    echo "Stopping Backend (Flask)..."
    FLASK_PID=$(lsof -ti:5000 2>/dev/null)
    if [ ! -z "$FLASK_PID" ]; then
        kill -9 $FLASK_PID 2>/dev/null
        echo "✓ Backend stopped (PID: $FLASK_PID)"
    else
        echo "✗ Backend not running on port 5000"
    fi

    # Also kill any remaining node processes running react-scripts
    echo "Cleaning up any remaining processes..."
    pkill -f "react-scripts start" 2>/dev/null
    pkill -f "flask run" 2>/dev/null

    # Close Terminal app completely
    echo "Closing Terminal app..."
    pkill -a Terminal 2>/dev/null

    if [ $? -eq 0 ]; then
        echo "✓ Terminal app closed"
    else
        echo "⚠ Could not close Terminal app"
    fi

    echo ""
    echo "Done! All servers stopped and Terminal closed."
}

# Function to stop on Linux
stop_linux() {
    echo "Stopping Movie Songs Recommender System..."

    # Find and kill React development server (runs on port 3000)
    echo "Stopping Frontend (React)..."
    REACT_PID=$(lsof -ti:3000 2>/dev/null)
    if [ ! -z "$REACT_PID" ]; then
        kill -9 $REACT_PID 2>/dev/null
        echo "✓ Frontend stopped (PID: $REACT_PID)"
    else
        echo "✗ Frontend not running on port 3000"
    fi

    # Find and kill Flask server (runs on port 5000)
    echo "Stopping Backend (Flask)..."
    FLASK_PID=$(lsof -ti:5000 2>/dev/null)
    if [ ! -z "$FLASK_PID" ]; then
        kill -9 $FLASK_PID 2>/dev/null
        echo "✓ Backend stopped (PID: $FLASK_PID)"
    else
        echo "✗ Backend not running on port 5000"
    fi

    # Also kill any remaining node processes running react-scripts
    echo "Cleaning up any remaining processes..."
    pkill -f "react-scripts start" 2>/dev/null
    pkill -f "flask run" 2>/dev/null

    echo ""
    echo "Done! All servers stopped."
    echo "Note: Automatic tab closing is not supported on Linux."
}

# Function to stop on Windows
stop_windows() {
    echo "Stopping Movie Songs Recommender System..."

    # Stop React development server (port 3000)
    echo "Stopping Frontend (React)..."
    REACT_PID=$(netstat -ano 2>/dev/null | grep ":3000" | grep "LISTENING" | awk '{print $5}' | head -1)
    if [ ! -z "$REACT_PID" ]; then
        taskkill.exe //F //PID $REACT_PID 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "✓ Frontend stopped (PID: $REACT_PID)"
        else
            echo "✗ Could not stop Frontend"
        fi
    else
        echo "✗ Frontend not running on port 3000"
    fi

    # Stop Flask server (port 5000)
    echo "Stopping Backend (Flask)..."
    FLASK_PID=$(netstat -ano 2>/dev/null | grep ":5000" | grep "LISTENING" | awk '{print $5}' | head -1)
    if [ ! -z "$FLASK_PID" ]; then
        taskkill.exe //F //PID $FLASK_PID 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "✓ Backend stopped (PID: $FLASK_PID)"
        else
            echo "✗ Could not stop Backend"
        fi
    else
        echo "✗ Backend not running on port 5000"
    fi

    # Clean up any remaining processes
    echo "Cleaning up any remaining processes..."
    taskkill.exe //F //IM node.exe 2>/dev/null
    taskkill.exe //F //IM python.exe 2>/dev/null

    # Close CMD windows with specific titles
    echo "Closing terminal windows..."
    taskkill.exe //FI "WindowTitle eq Frontend (React)*" 2>/dev/null
    taskkill.exe //FI "WindowTitle eq Backend (Flask)*" 2>/dev/null

    if [ $? -eq 0 ]; then
        echo "✓ Terminal windows closed"
    else
        echo "⚠ Could not automatically close windows. They may have already been closed."
    fi

    echo ""
    echo "Done! All servers stopped and windows closed."
}

# Main execution
OS=$(detect_os)

case "$OS" in
    macos)
        stop_macos
        ;;
    linux)
        stop_linux
        ;;
    windows)
        stop_windows
        ;;
    *)
        echo "Unsupported operating system: $(uname -s)"
        echo "Please stop the servers manually using Task Manager (Windows) or Activity Monitor (macOS)"
        exit 1
        ;;
esac
