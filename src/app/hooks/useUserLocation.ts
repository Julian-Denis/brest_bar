import { useState, useEffect } from 'react';
import { UserLocation } from '../types/UserLocation';

/**
 * Custom React hook to get the user's current geographical location.
 * @returns {UserLocation} The current user location as latitude and longitude, or null if location is unavailable.
 */
const useUserLocation = (): UserLocation => {
    // State to store the user's location
    const [userLocation, setUserLocation] = useState<UserLocation>(null);

    useEffect(() => {
        // Check if the Geolocation API is available in the current browser
        if (navigator.geolocation) {
            // Attempt to get the user's current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Extract latitude and longitude from the position object
                    const { latitude, longitude } = position.coords;
                    // Update the userLocation state with the new location
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    // Log any errors and set user location to null
                    console.error('Error getting user location: ', error);
                    setUserLocation(null);
                }
            );
        } else {
            // Log an error if Geolocation API is not supported and set user location to null
            console.error('Geolocation is not supported by this browser.');
            setUserLocation(null);
        }
    }, []); // Empty dependency array ensures this effect runs only once after the component mounts

    return userLocation; // Return the current user location
};

export default useUserLocation;
