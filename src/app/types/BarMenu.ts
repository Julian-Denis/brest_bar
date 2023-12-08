import { Bar } from "./Bar";

/**
 * Type definition for BarMenu props.
 * @param barsData - Array of Bar objects representing data for each bar.
 * @param handlePopup - Function to handle the display of popups on the map.
 * @param mapRef - Mutable reference object pointing to the Mapbox map instance.
 */
export type BarMenu = {
    barsData: Bar[];
    handlePopup: (coordinates: [number, number], barData: Bar) => void;
    mapRef: React.MutableRefObject<mapboxgl.Map | null>;
};
