import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { state, subscribe, unsubscribe, updateState } from './utils/state';
import { AddVehicleForm } from './components/AddVehicleForm';
import { VehicleDetails } from './components/VehicleDetails';
import { TripLogForm } from './components/TripLogForm';
import { FuelLogForm } from './components/FuelLogForm';
import { MaintenanceList } from './components/MaintenanceList';
import { SettingsScreen } from './components/SettingsScreen';
import { loadInitialData } from './utils/dataService';

export class App {
    private appRoot: HTMLElement;
    private headerComponent: Header | null = null;
    private navigationComponent: Navigation | null = null;
    private currentScreen: HTMLElement | null = null;

    constructor(root: HTMLElement) {
        this.appRoot = root;
        this.initialize();
    }

    private async initialize() {
        await loadInitialData();
        subscribe(this.render.bind(this));
        this.render();
    }

    private render() {
        this.appRoot.innerHTML = ''; // Clear existing content

        if (!state.isAuthenticated) {
            this.renderAuthScreen();
        } else {
            this.renderMainLayout();
        }
    }

    private renderAuthScreen() {
        const authScreen = new AuthScreen((email, password) => {
            // Simulate login logic
            const user = state.users.find(u => u.email === email && u.password === password);
            if (user) {
                updateState({ isAuthenticated: true, currentUser: user, activeScreen: 'dashboard' });
            } else {
                alert('Invalid credentials');
            }
        }, (name, email, password) => {
            // Simulate signup logic
            if (state.users.some(u => u.email === email)) {
                alert('User with this email already exists.');
                return;
            }
            const newUser = { id: `u${state.users.length + 1}`, name, email, password };
            updateState({ users: [...state.users, newUser], isAuthenticated: true, currentUser: newUser, activeScreen: 'dashboard' });
        });
        this.appRoot.appendChild(authScreen.element);
    }

    private renderMainLayout() {
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-layout';

        // Header
        this.headerComponent = new Header(state.currentUser?.name || 'Guest', state.vehicles, state.activeVehicleId);
        this.headerComponent.onVehicleChange = (vehicleId) => updateState({ activeVehicleId: vehicleId });
        this.headerComponent.onLogout = () => updateState({ isAuthenticated: false, currentUser: null, activeVehicleId: null });
        mainContainer.appendChild(this.headerComponent.element);

        // Main content area
        const contentArea = document.createElement('div');
        contentArea.className = 'content-area';

        // Navigation (Sidebar for desktop, BottomNav for mobile)
        this.navigationComponent = new Navigation(state.activeScreen);
        this.navigationComponent.onNavigate = (screen) => updateState({ activeScreen: screen });
        contentArea.appendChild(this.navigationComponent.element);

        // Screen content
        const screenContent = document.createElement('div');
        screenContent.className = 'screen-content';
        this.currentScreen = this.getScreenComponent(state.activeScreen);
        if (this.currentScreen) {
            screenContent.appendChild(this.currentScreen);
        }
        contentArea.appendChild(screenContent);

        mainContainer.appendChild(contentArea);
        this.appRoot.appendChild(mainContainer);

        // Update header and nav when state changes
        this.headerComponent.update(state.currentUser?.name || 'Guest', state.vehicles, state.activeVehicleId);
        this.navigationComponent.update(state.activeScreen);
    }

    private getScreenComponent(screenName: string): HTMLElement | null {
        const activeVehicle = state.vehicles.find(v => v.id === state.activeVehicleId);

        switch (screenName) {
            case 'dashboard':
                return new Dashboard(activeVehicle, state.trips, state.fuelLogs, state.maintenance).element;
            case 'vehicle-details':
                return activeVehicle ? new VehicleDetails(activeVehicle, state.trips, state.fuelLogs, state.maintenance).element : this.createEmptyState('No vehicle selected. Please add or select a vehicle.');
            case 'add-vehicle':
                return new AddVehicleForm((newVehicle) => {
                    updateState({ vehicles: [...state.vehicles, newVehicle], activeVehicleId: newVehicle.id, activeScreen: 'dashboard' });
                }).element;
            case 'log-trip':
                return activeVehicle ? new TripLogForm(activeVehicle.id, (newTrip) => {
                    updateState({ trips: [...state.trips, newTrip], activeScreen: 'dashboard' });
                }).element : this.createEmptyState('Select a vehicle to log a trip.');
            case 'fuel-tracking':
                return activeVehicle ? new FuelLogForm(activeVehicle.id, (newFuelLog) => {
                    updateState({ fuelLogs: [...state.fuelLogs, newFuelLog], activeScreen: 'dashboard' });
                }).element : this.createEmptyState('Select a vehicle to track fuel.');
            case 'maintenance':
                return activeVehicle ? new MaintenanceList(activeVehicle.id, state.maintenance).element : this.createEmptyState('Select a vehicle to view maintenance.');
            case 'settings':
                return new SettingsScreen(state.currentUser, (updatedUser) => {
                    const updatedUsers = state.users.map(u => u.id === updatedUser.id ? updatedUser : u);
                    updateState({ currentUser: updatedUser, users: updatedUsers });
                }).element;
            default:
                return this.createEmptyState('Welcome to Car Companion! Select an option from the navigation.');
        }
    }

    private createEmptyState(message: string): HTMLElement {
        const div = document.createElement('div');
        div.className = 'empty-state';
        div.innerHTML = `<span class="material-icons">info</span><p>${message}</p>`;
        return div;
    }
}