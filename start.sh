#!/bin/bash

# Script to start frontend and backend in separate terminal tabs/windows
# Works on macOS, Windows (Git Bash), and Linux

# Get the project directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

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

# Function to check and install dependencies
check_dependencies() {
    echo "Checking dependencies..."

    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        echo "✗ npm is not installed. Please install Node.js and npm first."
        exit 1
    fi

    # Check if node_modules exists
    if [ ! -d "$PROJECT_DIR/node_modules" ]; then
        echo "✗ node_modules not found. Installing npm packages..."
        cd "$PROJECT_DIR" && npm install
        if [ $? -ne 0 ]; then
            echo "✗ Failed to install npm packages"
            exit 1
        fi
    fi

    # Check if .venv exists
    if [ ! -d "$PROJECT_DIR/.venv" ]; then
        echo "✗ Virtual environment not found. Creating .venv..."
        python3 -m venv "$PROJECT_DIR/.venv"
        echo "✓ Virtual environment created"
    fi

    # Check if Flask is installed in venv
    if [ -f "$PROJECT_DIR/.venv/bin/python3" ]; then
        if ! "$PROJECT_DIR/.venv/bin/python3" -c "import flask" &> /dev/null; then
            echo "✗ Flask is not installed in virtual environment. Installing Python dependencies..."
            "$PROJECT_DIR/.venv/bin/pip3" install -r "$PROJECT_DIR/requirements.txt"
            if [ $? -ne 0 ]; then
                echo "✗ Failed to install Python dependencies"
                exit 1
            fi
        fi
    fi

    echo "✓ All dependencies are installed"
}

# Function to start on macOS
start_macos() {
    echo "Starting Movie Songs Recommender System on macOS..."

    # Check dependencies first
    check_dependencies

    echo "Opening tabs for Frontend and Backend in same terminal window..."

    # Try to use iTerm2 first, fallback to Terminal
    if osascript -e 'tell application "iTerm" to get version' >/dev/null 2>&1; then
        echo "Detected: iTerm2"

        # Create a new window with frontend, then add backend tab
        osascript 2>/dev/null <<EOF
tell application "iTerm"
    -- Create new window with frontend
    set newWindow to (create window with default profile)
    tell current session of newWindow
        set name to "Frontend-React"
        write text "cd '$PROJECT_DIR' && echo '=== Starting Frontend (React) ===' && npm start"
    end tell

    -- Add backend tab to the same window
    tell newWindow
        create tab with default profile
        tell current session
            set name to "Backend-Flask"
            write text "cd '$PROJECT_DIR' && source .venv/bin/activate && cd flask && echo '=== Starting Backend (Flask) ===' && python3 -m flask run"
        end tell
    end tell
end tell
EOF

        if [ $? -eq 0 ]; then
            echo "✓ iTerm2 window opened with tabs"
        else
            echo "✗ Failed to open iTerm2 tabs"
            exit 1
        fi

    else
        echo "Detected: Terminal.app"

        # Start frontend in new Terminal window, then add backend tab
        osascript 2>/dev/null - "$PROJECT_DIR" <<'EOF'
on run argv
    set projectRoot to item 1 of argv

    tell application "Terminal"
        -- Create new window with frontend
        set newWindow to do script "cd " & quoted form of projectRoot & " && echo '=== Starting Frontend (React) ===' && npm start"

        -- Wait for window to be ready
        delay 1

        -- Activate Terminal to ensure keyboard commands work
        activate

        -- Use System Events to press Cmd+T to create new tab
        tell application "System Events"
            keystroke "t" using command down
        end tell

        -- Wait for new tab to be created
        delay 0.5

        -- Run backend command in the new tab (which is now selected)
        do script "cd " & quoted form of projectRoot & " && source .venv/bin/activate && cd flask && echo '=== Starting Backend (Flask) ===' && python3 -m flask run" in selected tab of front window
    end tell
end run
EOF

        if [ $? -eq 0 ]; then
            echo "✓ Terminal.app window opened with tabs"
        else
            echo "✗ Failed to open Terminal.app tabs"
            echo ""
            echo "Please run the following commands manually in separate terminals:"
            echo "  Terminal 1: cd \"$PROJECT_DIR\" && npm start"
            echo "  Terminal 2: cd \"$PROJECT_DIR\" && source .venv/bin/activate && cd flask && python3 -m flask run"
            exit 1
        fi
    fi

    echo ""
    echo "✓ Tabs opened successfully!"
    echo "  - Tab 1: Frontend (React) - http://localhost:3000"
    echo "  - Tab 2: Backend (Flask) - http://localhost:5000"
    echo ""
    echo "To stop the servers and close the tabs, run: ./stop.sh"
}

# Function to start on Windows
start_windows() {
    echo "Starting Movie Songs Recommender System on Windows..."
    echo "Opening windows for Frontend and Backend..."

    # Convert Unix path to Windows path
    WIN_PROJECT_DIR=$(cygpath -w "$PROJECT_DIR" 2>/dev/null || echo "$PROJECT_DIR")

    # Check if Windows Terminal is available
    if command -v wt.exe &> /dev/null; then
        echo "Using Windows Terminal..."
        # Start Windows Terminal with two tabs
        cmd.exe /c "wt.exe -w 0 new-tab --title \"Frontend (React)\" cmd /k \"cd /d $WIN_PROJECT_DIR && echo === Starting Frontend (React) === && npm start\" ; new-tab --title \"Backend (Flask)\" cmd /k \"cd /d $WIN_PROJECT_DIR\\flask && echo === Starting Backend (Flask) === && flask run\""
    else
        echo "Windows Terminal not found. Using separate CMD windows..."
        # Start frontend in a new CMD window
        cmd.exe /c "start \"Frontend (React)\" cmd /k \"cd /d $WIN_PROJECT_DIR && echo === Starting Frontend (React) === && npm start\""

        # Small delay
        sleep 2

        # Start backend in a new CMD window
        cmd.exe /c "start \"Backend (Flask)\" cmd /k \"cd /d $WIN_PROJECT_DIR\\flask && echo === Starting Backend (Flask) === && flask run\""
    fi

    echo ""
    echo "✓ Windows opened successfully!"
    echo "  - Window 1: Frontend (React) - http://localhost:3000"
    echo "  - Window 2: Backend (Flask) - http://localhost:5000"
    echo ""
    echo "To stop the servers, run: ./stop.sh"
}

# Function to start on Linux
start_linux() {
    echo "Starting Movie Songs Recommender System on Linux..."

    # Try different terminal emulators
    if command -v gnome-terminal &> /dev/null; then
        echo "Using GNOME Terminal..."
        gnome-terminal --tab --title="Frontend (React)" -- bash -c "cd \"$PROJECT_DIR\" && echo '=== Starting Frontend (React) ===' && npm start; exec bash"
        sleep 1
        gnome-terminal --tab --title="Backend (Flask)" -- bash -c "cd \"$PROJECT_DIR/flask\" && echo '=== Starting Backend (Flask) ===' && flask run; exec bash"
    elif command -v xterm &> /dev/null; then
        echo "Using xterm..."
        xterm -T "Frontend (React)" -e "cd \"$PROJECT_DIR\" && echo '=== Starting Frontend (React) ===' && npm start" &
        sleep 1
        xterm -T "Backend (Flask)" -e "cd \"$PROJECT_DIR/flask\" && echo '=== Starting Backend (Flask) ===' && flask run" &
    else
        echo "No supported terminal found."
        echo "Please run the following commands manually in separate terminals:"
        echo "  Terminal 1: npm start"
        echo "  Terminal 2: cd flask && flask run"
        exit 1
    fi

    echo ""
    echo "✓ Terminals opened successfully!"
    echo "  - Terminal 1: Frontend (React) - http://localhost:3000"
    echo "  - Terminal 2: Backend (Flask) - http://localhost:5000"
    echo ""
    echo "To stop the servers, run: ./stop.sh"
}

# Main execution
OS=$(detect_os)

case "$OS" in
    macos)
        start_macos
        ;;
    windows)
        start_windows
        ;;
    linux)
        start_linux
        ;;
    *)
        echo "Unsupported operating system: $(uname -s)"
        echo "Please run the following commands manually in separate terminals:"
        echo "  Terminal 1: npm start"
        echo "  Terminal 2: cd flask && flask run"
        exit 1
        ;;
esac
