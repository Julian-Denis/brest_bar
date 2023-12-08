"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Navbar from "./components/Navbar";
import MapComponent from "./components/MapComponent";
import BarsLeftMenu from "./components/BarsLeftMenu";

import { Bar } from "./types/Bar";
import createPopupContent from "./utils/createPopupContent";

export default function Home() {
    // State for storing bar data
    const [bars, setDataBars] = useState<Bar[]>([]);

    // Reference to the Mapbox map instance for direct map manipulation
    const mapRef = useRef<mapboxgl.Map | null>(null);

    // Reference to the Mapbox Popup instance
    const popupRef = useRef<mapboxgl.Popup | null>(null);

    // Fetch bar data on component mount
    useEffect(() => {
        fetch('https://api.brest.bar/items/bars')
            .then(response => response.json())
            .then(data => {
                setDataBars(data.data); // Set the bar data state
            })
            .catch(error => {
                console.error('Error fetching data: ', error); // Handle any errors in fetching data
            });
    }, []);

    /*
    *      /!\ XSS vulnerability /!\
    *  This methode for creating popup content
    *  avoid xss vulnerability Do not follow 
    *  the doc on creating a popup content. 
    * There is more simpler but less safer.
    */
   
    // Callback to handle the creation and display of popups on the map
    const handlePopup = useCallback((coordinates: [number, number], barData: Bar) => {
        if (mapRef.current) {
            if (popupRef.current) {
                popupRef.current.remove();  // Remove the existing popup if any
            }
            const popupContent = createPopupContent(barData);
            popupRef.current = new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setDOMContent(popupContent)
                .addTo(mapRef.current); // Add the new popup to the map
        }
    }, [mapRef, popupRef]);

    return (
        <div className="flex max-h-screen min-h-screen flex-col overflow-hidden">
            {/* Navbar component */}
            <Navbar />

            {/* Left side menu for bars */}
            <BarsLeftMenu barsData={bars} handlePopup={handlePopup} mapRef={mapRef}/>

            {/* Map display component */}
            <div className="!absolute top-0 left-0 h-screen w-screen bg-gray-secondary">
                <MapComponent mapRef={mapRef} barsData={bars} handlePopup={handlePopup} />
            </div>
        </div>
    )
}
