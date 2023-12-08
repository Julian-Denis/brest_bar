/**
 * Parses a JSON string representing opening hours into an array format.
 * @param {string} openingHoursString - The JSON string containing opening hours data.
 * @returns {string[]} - An array of strings representing opening hours for each day of the week.
 */
const parseOpeningHours = (openingHoursString: string) => {
    // Default opening hours ("Fermé" for each day of the week)
    const defaultOpeningHours = Array(7).fill("Fermé");

    // If the input string is empty or undefined, return the default opening hours
    if (!openingHoursString) {
        return defaultOpeningHours;
    }

    try {
        // Attempt to parse the JSON string into an object
        const openingHours = JSON.parse(openingHoursString);

        // Map each day of the week to its corresponding opening hours,
        // using "Fermé" for days without specific hours
        return Array.from({ length: 7 }).map((_, index) => openingHours[index] || "Fermé");
    } catch (error) {
        // In case of an error during parsing (e.g., invalid JSON),
        // return the default opening hours
        return defaultOpeningHours;
    }
};

export default parseOpeningHours;
