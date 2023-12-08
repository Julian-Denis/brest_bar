import { Bar } from "../types/Bar";
import { classifyBarType } from "./classifyBarType";

/**
 * Filters bars based on selected types.
 * @param bars - Array of bar objects.
 * @param selectedTypes - Array of selected types to filter by.
 * @returns Array of bars filtered by the selected types.
 */
export const filterBarsByType = (bars: Bar[], selectedTypes: string[]): Bar[] => {
    // If no types are selected, return all bars
    if (selectedTypes.length === 0) return bars;

    // Filter bars where at least one selected type matches the bar's type
    return bars.filter(bar => 
        selectedTypes.some(type => {
            const barType = classifyBarType(bar.name); // Determine the bar's type
            return barType === type; // Check if the bar's type matches any of the selected types
        })
    );
};
