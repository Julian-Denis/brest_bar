import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { MapComponentProps } from "../types/MapComponentProps";
import { Bar } from "../types/Bar";
import { getMapboxToken } from "../utils/getMapboxToken";

/**
 * Component responsible for rendering the map and handling map-related functionalities.
 * @param mapRef Reference to the Mapbox map instance.
 * @param barsData Array of bar data to be displayed on the map.
 * @param handlePopup Function to handle popup display for bars.
 * @param popupRef Reference to the current popup, if any.
 */
export default function MapComponent({ mapRef, barsData, handlePopup }: MapComponentProps) {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        // Ensure map container is available
        if (!mapContainerRef.current) return;

        // Set Mapbox access token
        mapboxgl.accessToken = getMapboxToken();

        // Initialize Mapbox map with predefined style and center coordinates
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [-4.48, 48.39], // Brest, France
            zoom: 10,
        });

        // Store map instance in provided reference
        mapRef.current = map;

        // Handle map load event
        map.on('load', () => {
            // Define source for bars data using GeoJSON format
            map.addSource('bars', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: barsData.map(bar => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: bar.location.coordinates
                        },
                        properties: bar // Include all properties of each bar
                    }))
                },
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
            });

            // Define layers for clusters and individual bar points
            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'bars',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#b786ee',
                        100,
                        '#8454bc',
                        750,
                        '#b22bc0'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                }
            });

            // Cluster count layer
            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'bars',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            // Unclustered bar points layer
            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'bars',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            // Click event handling for clusters
            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                }) as mapboxgl.MapboxGeoJSONFeature[];

                if (features.length === 0) return;

                if (features[0].properties && 'cluster_id' in features[0].properties) {
                    const clusterId = features[0].properties.cluster_id as number;

                    const source = map.getSource('bars') as mapboxgl.GeoJSONSource;
                    if (!source) return;

                    source.getClusterExpansionZoom(clusterId, (err, zoom) => {
                        if (err) return;

                        // Make sure that is a Point before accessing to coordinates
                        if (features[0].geometry.type === 'Point') {
                            const coordinates = features[0].geometry.coordinates as [number, number];
                            map.easeTo({
                                center: coordinates,
                                zoom: zoom
                            });
                        }
                    });
                }
            });

            // Click event handling for individual points
            map.on('click', 'unclustered-point', (e) => {
                if (e.features && e.features.length > 0) {
                    const feature = e.features[0];
                    if (feature.geometry.type === 'Point' && feature.properties) {
                        const coordinates = feature.geometry.coordinates as [number, number];
                        const barData: Bar = feature.properties as Bar;
                        handlePopup(coordinates, barData);
                    }
                }
            });

            // Add geolocate control to the map
            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true,
                showUserHeading: true
            }));
        });

        // Cleanup function for removing map and popup on component unmount
        return () => {
            map.remove();
        };
    }, [barsData, mapRef, handlePopup]);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}></div>;
}
