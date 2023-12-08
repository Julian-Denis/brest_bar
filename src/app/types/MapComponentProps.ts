import { Bar } from "./Bar";
import mapboxgl from "mapbox-gl";

/**
 * Defines the properties for the MapComponent.
 * 
 * @param barsData - An array of Bar objects, representing various bar locations and details.
 * @param mapRef - A React ref object pointing to the Mapbox map instance. Used for manipulating the map externally.
 * @param handlePopup - A function to handle the creation and display of popups on the map when a bar location is clicked. 
 *                      Takes the coordinates of the bar and the bar data as arguments.
 */

/*
*      /!\ XSS vulnerability /!\
*  This methode avoid xss vulnerability
*  Do not follow the doc on creating a
*  popup content. There is more simpler
*  but less safer.
*/

export type MapComponentProps = {
    barsData: Bar[];
    mapRef: React.MutableRefObject<mapboxgl.Map | null>;
    handlePopup: (coordinates: [number, number], barData: Bar) => void;
};

