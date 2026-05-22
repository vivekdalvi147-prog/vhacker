# Car Companion Web Application

This project is a web-based simulation of the "Car Companion Mobile Application" technical specification. It aims to replicate the UI/UX and core functionalities using Vite, TypeScript, HTML, and modern CSS, focusing on a responsive and interactive front-end experience.

## Features Implemented (Web Simulation)

-   **Dashboard:** Centralized view of mock vehicle status, quick actions, and recent activity.
-   **Authentication:** Simple login/signup UI.
-   **Vehicle Management:** Add new vehicles, select active vehicle (using mock data).
-   **Trip Logging:** Form to add trips, display trip list.
-   **Fuel Tracking:** Form to add fuel logs, display fuel history.
-   **Maintenance Tracking:** Display upcoming/past maintenance, add reminders.
-   **Settings:** Basic account and app preferences.
-   **Responsive Design:** Adapts layout for mobile and desktop screens.
-   **Modern UI:** Glassmorphism, gradients, smooth animations.

## Project Structure

CarCompanionWebApp/
│── index.html
│── package.json
│── vite.config.ts
│── tsconfig.json
│── README.md
│
├── public/
│   └── data.json             # Mock data for vehicles, trips, fuel, maintenance, users
│
├── src/
│   ├── main.ts               # Entry point, mounts the App
│   ├── app.ts                # Main application logic, routing, state management
│   ├── style.css             # Global styles, variables, responsive design
│   ├── components/
│   │   ├── AuthScreen.ts     # Login/Signup UI
│   │   ├── AddVehicleForm.ts # Form to add a new vehicle
│   │   ├── Button.ts         # Reusable button component
│   │   ├── Card.ts           # Reusable card component
│   │   ├── Dashboard.ts      # Vehicle status, quick actions, activity feed
│   │   ├── FuelLogForm.ts    # Form for logging fuel
│   │   ├── Header.ts         # Top bar with greeting, vehicle selector, notifications
│   │   ├── Input.ts          # Reusable input component
│   │   ├── MaintenanceList.ts# Display maintenance items
│   │   ├── Navigation.ts     # Sidebar (desktop) and BottomNav (mobile)
│   │   ├── SettingsScreen.ts # Basic settings UI
│   │   ├── TripLogForm.ts    # Form for logging trips
│   │   └── VehicleDetails.ts # Display vehicle info, tabs
│   └── utils/
│       ├── dataService.ts    # Handles loading/saving mock data
│       ├── helpers.ts        # Utility functions (e.g., date formatting)
│       └── state.ts          # Simple global state management

## Getting Started

1.  **Clone the repository:**
        git clone <repository-url>
    cd car-companion-web-app
    
2.  **Install dependencies:**
        npm install
    # or
    yarn install
    
3.  **Run the development server:**
        npm run dev
    # or
    yarn dev
        The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

4.  **Build for production:**
        npm run build
    # or
    yarn build
        This will compile the project into the `dist` directory.

## Mock Data

The application uses `public/data.json` for mock data. You can modify this file to customize vehicles, trips, fuel logs, and maintenance records. The application simulates user authentication against the `users` array in this JSON.

**Default Login:**
-   **Email:** `user@example.com`
-   **Password:** `password123`

## Design System

-   **Theme:**
    -   Primary: `#2E86C1` (blue)
    -   Secondary: `#28B463` (green)
    -   Accent: `#E74C3C` (red)
-   **Typography:** Poppins (Bold, Regular, SemiBold)
-   **Icons:** Material Icons
-   **Layout:** Responsive, 8px grid system.
-   **UI Style:** Glassmorphism, gradients, subtle neon effects, smooth animations.

---

Enjoy your Car Companion!