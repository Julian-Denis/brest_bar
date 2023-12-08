import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import mapboxgl from "mapbox-gl";
import createPopupContent from "../utils/createPopupContent";

import { Bar } from "../types/Bar";
import { BarMenu } from "../types/BarMenu";
import { filterBarsByType } from "../utils/filterBarByType";
import { classifyBarType } from "../utils/classifyBarType";
import isBarOpenNow from "../utils/isBarOpenNow";

import { calculateDistance } from "../utils/calculateDistance";
import { UserLocation } from "../types/UserLocation";

/**
 * Component for displaying the left menu with bars' list and filters.
 * @param barsData - Array of bars to be displayed.
 * @param handlePopup - Callback function to handle popup on the map.
 * @param mapRef - Reference to the Mapbox map instance.
 */
export default function BarsLeftMenu({ barsData, handlePopup, mapRef }: BarMenu) {
    // State initialization with a slice of bars array
    const initialBars = barsData.slice(0, 5);
    const [displayedBars, setDisplayedBars] = useState(initialBars);

    // Categories of bars for filtering
    const types = [
        { "id": 1, "name": "Cave", "icon": "🍷" },
        { "id": 2, "name": "Brasserie", "icon": "🍺" },
        { "id": 3, "name": "Bar", "icon": "🍹" }
    ];

    // State for sorting and filtering
    const [sortType, setSortType] = useState('default');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [userLocation, setUserLocation] = useState<UserLocation>(null);

    // Fetch user's location
    useEffect(() => {
        setDisplayedBars(barsData.slice(0, 5));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                err => console.error(err),
                { enableHighAccuracy: true }
            );
        }
    }, [barsData]);

    // Function to load more bars
    const loadMoreBars = () => {
        const currentCount = displayedBars.length;
        const remainingBars = filteredBars.length - currentCount;
        const nextBarsCount = Math.min(remainingBars, 5);
        const nextBars = filteredBars.slice(currentCount, currentCount + nextBarsCount);
        setDisplayedBars(displayedBars.concat(nextBars));
    };

    // Memoized calculation for filtered bars
    const filteredBars = useMemo(() => {
        let tempBars = filterBarsByType(barsData, selectedTypes);

        switch (sortType) {
            case 'rating':
                return [...tempBars].sort((a, b) => b.rating - a.rating);
            case 'distance':
                return userLocation ? [...tempBars].sort((a, b) =>
                    calculateDistance(userLocation.latitude, userLocation.longitude, a.location.coordinates[1], a.location.coordinates[0]) -
                    calculateDistance(userLocation.latitude, userLocation.longitude, b.location.coordinates[1], b.location.coordinates[0])
                ) : tempBars;
            case 'open':
                return tempBars.filter(bar => isBarOpenNow(bar));
            default:
                return tempBars;
        }
    }, [barsData, selectedTypes, sortType, userLocation]);

    // Handlers for selecting sort type and bar type
    const handleSelectSortType = (type: string) => setSortType(type);
    const handleTypeSelect = (type: string) => {
        setSelectedTypes(prevTypes => 
            prevTypes.includes(type) ? prevTypes.filter(t => t !== type) : [...prevTypes, type]
        );
    };

    // Callback to show bar on map and open popup
    const showOnMap = useCallback((coordinates: [number, number], bar: Bar) => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: coordinates,
                essential: true,
                duration: 1200,
                zoom: 15
            });
            handlePopup(coordinates, bar);
        }
    }, [handlePopup, mapRef]);

    // function for Tailwind dropdown selection
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    // JSX for the left menu component
    return (
        <div id="drawer" className="custom-scrollbar relative z-10 min-h-full flex-1 origin-left bg-custom-dark-gray text-white shadow-xl transition-all lg:w-1/3 w-4/5 overflow-y-scroll lg:w-1/3">
            <div className="flex w-full justify-end px-4 py-2 lg:hidden">
                <button data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example" type="button" aria-label="close" className="bg-gray-secondary p-2 rounded-lg">
                    <div className="h-6 w-6 rotate-180">
                        <svg width="100%" height="100%" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path>
                        </svg>
                    </div>
                </button>
            </div>
            <div className="opacity-100 transition-opacity">
                <div className="">
                    <div className="p-4">
                        <h1 className="text-4xl font-bold text-white">
                            Trouver le bar qu&apos;il vous faut <span className="gradient bg-clip-text text-transparent">selon votre humeur</span>
                        </h1>
                    </div>
                    <div id="divider" className="w-full border .border-custom-gray"></div>
                    <div className="flex flex-col gap-6 p-4">
                        <h2 className="text-2xl font-semibold">Où boire à Brest ?</h2>
                        <div className="flex items-center gap-8">
                            {types.map((type) => (
                                <button key={type.id} type="button" onClick={() => handleTypeSelect(type.name)} aria-label={type.name} className="flex w-[30%] flex-col items-center gap-2 font-medium">
                                    <div className={`flex aspect-square w-full items-center justify-center rounded-lg bg-[#2c2c2c] text-4xl ${selectedTypes.includes(type.name) ? 'border-4 border-violet-700' : ''}`}>{type.icon}</div>                                        <p className="transition-colors">{type.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div id="divider" className="w-full border border-[#3d3d3d]"></div>
                    <div className="flex w-full flex-col gap-6 p-4 text-white">
                        <div className=" flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">Explorer</h2>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg gradient px-4 py-2 text-sm font-semibold text-white-900 shadow-sm ring-1 ring-inset ring-violet-800 hover:bg-violet-700">
                                        Trier ✍️
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-white-400" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right border-solid border border-gray-700 rounded-md bg-custom-dark-gray shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => handleSelectSortType('default')}
                                                        className={classNames(
                                                            (sortType === 'default' ? 'bg-violet-700 text-white-900 font-semibold' : 'text-white-700 font-semibold'),
                                                            active ? 'bg-violet-700 text-white-900 font-semibold' : 'text-white-700 font-semibold',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Par défaut
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => handleSelectSortType('rating')}
                                                        className={classNames(
                                                            (sortType === 'rating' ? 'bg-violet-700 text-white-900 font-semibold' : 'text-white-700 font-semibold'),
                                                            active ? 'bg-violet-700 text-white-900 font-semibold' : 'text-white-700 font-semibold',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Les mieux notés
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => handleSelectSortType('distance')}
                                                        className={classNames(
                                                            (sortType === 'distance' ? 'bg-violet-700 text-white-900 font-semibold' : 'text-white-700 font-semibold'),
                                                            active ? 'bg-violet-700 text-white-900 font-semibold' : 'text-white-700 font-semibold',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Les plus proches
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => handleSelectSortType('open')}
                                                        className={classNames(
                                                            (sortType === 'open' ? 'bg-violet-700 text-white-900 font-semibold' : 'text-white-700 font-semibold'),
                                                            active ? 'bg-violet-700 text-white-900 font-semibold' : 'text-white-700 font-semibold',
                                                            'block w-full px-4 py-2 text-left text-sm'
                                                        )}
                                                    >
                                                        Actuellement ouvert
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        <div className="flex flex-col gap-6">
                            {displayedBars.map((bar) => (
                                <div key={bar.id} className="flex flex-col gap-4 rounded-2xl bg-gray-secondary p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex w-4/5 flex-col">
                                            <p className="font-bold uppercase text-violet">{classifyBarType(bar.name)}</p>
                                            <h2 className="text-2xl font-bold">{bar.name}</h2>
                                            <p className="truncate text-violet"> 🏃‍♂️
                                                <strong className="uppercase">
                                                    {userLocation ?
                                                        `a ${calculateDistance(userLocation.latitude, userLocation.longitude, bar.location.coordinates[1], bar.location.coordinates[0]).toFixed(2)} km` :
                                                        'Position inconnue'}
                                                </strong> - {bar.address}
                                            </p>
                                        </div>
                                        <button type="button" onClick={() => showOnMap(bar.location.coordinates, bar)} aria-label="show on map" className="aspect-square rounded-full bg-violet p-4">👁️ </button>
                                    </div>
                                    <div className="flex items-center gap-3">

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex w-full items-center justify-center">
                            {displayedBars.length < filteredBars.length && (
                                <button onClick={loadMoreBars} type="button" className="mx-auto w-fit rounded-lg bg-gray-secondary px-6 py-2 animate-pulse">Plus</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}