/**
 * Represents user's geographical location.
 * @param latitude - North-south position, ranging from -90° to +90°.
 * @param longitude - East-west position, ranging from -180° to +180°.
 * Nullable to indicate unavailable or undetermined location.
 */
export type UserLocation = {
    latitude: number;
    longitude: number;
} | null;
