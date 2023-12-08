/**
 * Type definition for a bar.
 * @param id - Unique identifier of the bar.
 * @param name - Name of the bar.
 * @param address - Physical address of the bar.
 * @param international_phone_number - International phone number of the bar.
 * @param opening_hours - Opening hours of the bar.
 * @param rating - Average rating of the bar.
 * @param user_ratings_total - Total number of user ratings for the bar.
 * @param location - Geographical location of the bar, represented by latitude and longitude coordinates.
 * @param website - URL of the bar's website.
 * @param maps_url - URL of the bar's location on a map service like Google Maps.
 */
export type Bar = {
    id: number;
    name: string;
    address: string;
    international_phone_number: string;
    opening_hours: string;
    rating: number;
    user_ratings_total: number;
    location: {
        coordinates: [number, number];
    };
    website: string;
    maps_url: string;
};
