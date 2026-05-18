# React Auth Dashboard

A secure, responsive React application featuring an authenticated dashboard, protected routes, and product management integrated with the DummyJSON API.

## Features
- **User Authentication**: Login system using DummyJSON API.
- **Protected Routing**: Secure routes ensuring only authenticated users can access the dashboard and profile views.
- **Product Management**: Paginated product list with detailed product views.
- **Local State Management**: Session persistence and local state handling for a seamless experience.
- **Modern UI**: Styled with standard CSS Modules for encapsulation without the need for large utility frameworks.

## Tech Stack
- React 19
- Vite
- React Router DOM v7
- Lucide React (Icons)
- Vanilla CSS Modules

## Setup and Installation

Follow these steps to get the project running locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine (v18+ recommended).

### 2. Clone the Repository
If you haven't already, clone or navigate into the project directory:
```bash
# If cloning:
git clone <repository-url>
cd <repository-directory>
```
### 3. Ask admin to gives .env file

### 4. Install Dependencies
Install all the required packages using npm:
```bash
npm install
```

### 5. Run the Development Server
Start the application locally:
```bash
npm run dev
```

### 6. Access the Application
Open your browser and navigate to the local server URL provided in the terminal (usually `http://localhost:5173`).

## Usage
- Use the **login page** to authenticate.
- Once logged in, you will be redirected to the **dashboard** where you can view your profile and the available products.
