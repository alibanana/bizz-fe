/**
 * API Configuration Module
 *
 * Centralized configuration for API endpoints.
 *
 * Create React App requires env variables to start with REACT_APP_
 * and will embed them at build time. The .env file must be placed
 * in the project root (same level as package.json).
 *
 * Ensure REACT_APP_API_URL is defined in your .env file.
 *
 * @type {string}
 */
export const API_URL = process.env.REACT_APP_API_URL;
