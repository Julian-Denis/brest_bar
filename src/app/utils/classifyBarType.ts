// Regular expression patterns for identifying bar types
export const brasseriePattern = /brasserie|bière|beer|brasseur|brasseurs|tavern/i;
export const cavePattern = /bar\sà\s+vin|cave|vin|vigneron/i;
export const barPattern = /bar|bistrot|café|pub/i;

/**
 * Classifies the type of a bar based on its name.
 * @param barName - Name of the bar.
 * @returns The type of the bar ('Brasserie', 'Cave', or 'Bar') or undefined if not classifiable.
 */
export const classifyBarType = (barName: string): string | undefined => {
    // Checks if the bar name matches the brasserie pattern
    if (brasseriePattern.test(barName)) {
        return 'Brasserie';
    } 
    // Checks if the bar name matches the cave pattern
    else if (cavePattern.test(barName)) {
        return 'Cave';
    } 
    // Checks if the bar name matches the bar pattern
    else if (barPattern.test(barName)) {
        console.log(barName); // Logging the bar name for debugging
        return 'Bar';
    }
    // Return undefined if the bar name doesn't match any patterns
    return undefined;
};
