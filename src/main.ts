import './style.css';
import { App } from './app';

document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.getElementById('app');
    if (appRoot) {
        new App(appRoot);
    }
});