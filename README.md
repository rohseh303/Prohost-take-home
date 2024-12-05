# Vite + React + TypeScript Reservation Calendar

This project is a reservation calendar built using Vite, React, and TypeScript. It allows users to view and manage reservations for various listings, providing a user-friendly interface for navigating through dates and reservations.

## Features

- **Dynamic Calendar**: View reservations in a calendar format.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Data Fetching**: Fetches listings and reservations from a backend API.
- **Reservation Management**: Overlay reservation bars on the calendar for easy visibility.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - date-fns
  - lodash.throttle
  - react-window

- **Backend**:
  - FastAPI
  - SQLAlchemy
  - PostgreSQL

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database
- Python (v3.7 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/repo-name.git
   cd repo-name
   ```

2. Set up the backend virtual environment:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Install the frontend dependencies:

   ```bash
   cd ../project
   npm install
   ```

5. Set up your PostgreSQL database and update the `.env` file with your database connection string.

6. Run the backend server:

   ```bash
   uvicorn main:app --reload
   ```

7. Run the frontend development server:

   ```bash
   cd project
   npm run dev
   ```

8. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Navigate through the calendar to view reservations.
