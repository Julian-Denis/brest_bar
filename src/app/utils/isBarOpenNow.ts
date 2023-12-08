import { Bar } from '../types/Bar';

/**
 * Function to check if a bar is currently open based on its opening hours.
 * @param {Bar} bar - The bar object containing opening hours information.
 * @returns {boolean} - Returns true if the bar is currently open, otherwise false.
 */
const isBarOpenNow = (bar: Bar) => {
    const now = new Date();
    const dayOfWeek = now.getDay() - 1; // Adjust to make the week start on Monday (0: Monday, 6: Sunday)

    // Convert the current time to minutes since midnight
    const currentTime = now.getHours() * 60 + now.getMinutes();

    // Parse the opening hours from the bar object, if available
    const openingHours = bar.opening_hours ? JSON.parse(bar.opening_hours) : null;
    // Check if the bar is closed or does not have opening hours for the current day
    if (!openingHours || !openingHours[dayOfWeek] || openingHours[dayOfWeek].includes("Fermé")) {
        return false;
    }

    // Regular expression to extract times in HH:MM format
    const timePattern = /(\d{2}:\d{2})/g;
    // Extract today's opening and closing times
    const todaysHours = openingHours[dayOfWeek].match(timePattern) || [];

    // Loop through pairs of opening and closing times
    for (let i = 0; i < todaysHours.length; i += 2) {
        const openTime = todaysHours[i].split(':');
        const closeTime = todaysHours[i + 1].split(':');

        // Convert opening and closing times to minutes since midnight
        const openingMinutes = parseInt(openTime[0]) * 60 + parseInt(openTime[1]);
        const closingMinutes = parseInt(closeTime[0]) * 60 + parseInt(closeTime[1]);

        // Check if current time is within the open hours
        if (currentTime >= openingMinutes && currentTime <= closingMinutes) {
            return true; // The bar is currently open
        }
    }

    return false; // The bar is currently closed (outside of open hours)
};

export default isBarOpenNow;
