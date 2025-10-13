# Movie-Songs-Recommender-System-BE-Project

A comprehensive media recommender system that suggests movies, songs, and books based on user preferences using advanced machine learning algorithms.

## Overview

This project implements a full-stack recommendation system utilizing multiple machine learning algorithms including:
- Cosine Similarity
- Pearson Correlation
- K-Nearest Neighbors (KNN)
- K-Means Clustering
- TF-IDF (Term Frequency-Inverse Document Frequency)

**Published Research**: Paper published at IJRASET publication with paper ID **IJRASET42927**

## Tech Stack

**Frontend:**
- React 17
- CoreUI React components
- React Router DOM

**Backend:**
- Flask (Python)
- NumPy, Pandas
- Scikit-learn
- Matplotlib, Seaborn
- SciPy

## Prerequisites

Before running this project, ensure you have the following installed:
- **Node.js** (v22 or higher) and npm
- **Python 3.x**
- **pip** (Python package manager)
- **Git**

## Installation & Setup

### Option 1: Quick Start (Recommended)

Clone the repository and use the automated start script:

```bash
git clone https://github.com/Hero4440/Movie-Songs-Recommender-System-BE-Project.git
cd Movie-Songs-Recommender-System-BE-Project
chmod +x start.sh stop.sh
./start.sh
```

The `start.sh` script will:
- Check and install all dependencies (npm packages and Python requirements)
- Create a virtual environment if needed
- Start both frontend and backend servers in separate terminal tabs
- Work on macOS, Windows (Git Bash), and Linux

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

**To stop the servers:**
```bash
./stop.sh
```

### Option 2: Manual Setup

If you prefer to run the services manually:

1. **Clone the repository:**
```bash
git clone https://github.com/Hero4440/Movie-Songs-Recommender-System-BE-Project.git
cd Movie-Songs-Recommender-System-BE-Project
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Set up Python virtual environment:**
```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

4. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

5. **Start the backend server (Terminal 1):**
```bash
source .venv/bin/activate  # Activate virtual environment
cd flask
python3 -m flask run
```

6. **Start the frontend server (Terminal 2):**
```bash
npm start
```

## Project Structure

```
Movie-Songs-Recommender-System-BE-Project/
├── flask/              # Backend Flask application
│   ├── app.py         # Main Flask application
│   ├── Movie.py       # Movie recommendation logic
│   ├── Song.py        # Song recommendation logic
│   ├── Book.py        # Book recommendation logic
│   └── api_data/      # Data and models
├── src/               # React frontend source code
├── public/            # Public assets
├── Resources/         # Additional resources
├── start.sh          # Automated startup script
├── stop.sh           # Automated shutdown script
├── requirements.txt  # Python dependencies
└── package.json      # Node.js dependencies
```

## Features

- **Multi-category recommendations**: Get personalized suggestions for movies, songs, and books
- **Advanced ML algorithms**: Multiple recommendation algorithms for improved accuracy
- **Interactive UI**: Modern, responsive interface built with React and CoreUI
- **RESTful API**: Clean Flask backend with well-structured endpoints
- **Cross-platform**: Works on macOS, Windows, and Linux

## Research Paper

This project has been published in the International Journal for Research in Applied Science and Engineering Technology (IJRASET).
- **Paper ID**: IJRASET42927
- Full paper available in repository: `IJRASET Paper.pdf`

## Credits

**Development Team:**
- Tanmay Bhuskute
- Amit Jeve
- Nihal Shah
- Tejas Shah

## License

This project was developed as a Bachelor of Engineering final year project.
