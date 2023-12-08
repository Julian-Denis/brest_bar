/**
 * Calculates the distance between two geographical points on Earth.
 * @param lat1 - Latitude of the first point in degrees.
 * @param lon1 - Longitude of the first point in degrees.
 * @param lat2 - Latitude of the second point in degrees.
 * @param lon2 - Longitude of the second point in degrees.
 * @returns The distance in kilometers between the two points.
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180; // Convert latitude difference to radians
    const dLon = (lon2 - lon1) * Math.PI / 180; // Convert longitude difference to radians
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2); // Haversine formula
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Great circle distance in radians
    return R * c; // Distance in kilometers
};
