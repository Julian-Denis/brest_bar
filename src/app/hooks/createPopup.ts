import { Bar } from '../types/Bar';
import createPopupContent from '../utils/createPopupContent';
import mapboxgl from "mapbox-gl";

/**
 * Creates a popup on the map at specified coordinates and with content based on the given bar data.
 * 
 * @param {mapboxgl.Map} map - The Mapbox map instance on which the popup will be added.
 * @param {[number, number]} coordinates - The longitude and latitude where the popup will appear.
 * @param {Bar} barData - Data object containing information about a bar.
 * @param {{ current: mapboxgl.Popup }} popupRef - Reference object for the current popup.
 */

/*
*      /!\ XSS vulnerability /!\
*  This methode avoid xss vulnerability
*  Do not follow the doc on creating a
*  popup content. There is more simpler
*  but less safer.
*/
export const createPopup = (map: mapboxgl.Map, coordinates: [number, number], barData: Bar, popupRef: { current: mapboxgl.Popup }) => {
    // Generate the popup content using bar data
    const popupContent = createPopupContent(barData);

    // Close any existing popup
    if (popupRef.current) {
        popupRef.current.remove();
    }

    // Create a new Mapbox popup with the generated content
    popupRef.current = new mapboxgl.Popup()
        .setLngLat(coordinates) // Set the location of the popup
        .setDOMContent(popupContent) // Attach the DOM content to the popup
        .addTo(map); // Add the popup to the map
};
