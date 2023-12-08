/**
 * Retrieves the Mapbox access token from environment variables.
 * This function checks if the Mapbox token is defined in the environment variables (typically set in .env.local).
 * If the token is not found, it throws an error, indicating that the token is required but not set.
 * This ensures that the application does not run without the necessary Mapbox token.
 * @returns {string} The Mapbox token.
 * @throws Will throw an error if the Mapbox token is not defined in the environment variables.
 */
export const getMapboxToken = () => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
        throw new Error('Mapbox token is not defined in .env.local');
    }
    return token;
};
