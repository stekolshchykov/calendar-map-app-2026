import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LOCATION_COORDS } from '../locations';
import 'leaflet/dist/leaflet.css';

// Fix typical React-Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom highlighted icon
const highlightIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Helper component to adjust bounds and handle active marker
const MapBoundsAggregator = ({ locations, activeLocationId }) => {
    const map = useMap();

    useEffect(() => {
        if (locations.length === 0) return;

        let validCoords = [];
        locations.forEach(loc => {
            const coords = LOCATION_COORDS[loc.location];
            if (coords) validCoords.push(coords);
        });

        if (validCoords.length > 0) {
            if (validCoords.length === 1 || activeLocationId) {
                // Find the active coords
                const activeLoc = locations.find(l => l.id === activeLocationId);
                let center = validCoords[0];
                if (activeLoc && LOCATION_COORDS[activeLoc.location]) {
                    center = LOCATION_COORDS[activeLoc.location];
                }
                map.setView(center, 10, { animate: true });
            } else {
                const bounds = L.latLngBounds(validCoords);
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10, animate: true });
            }
        }
    }, [locations, map, activeLocationId]);

    return null;
};

// Fixes Leaflet tiles not loading after container resize (mobile)
const ResizeHandler = () => {
    const map = useMap();
    useEffect(() => {
        const handleResize = () => {
            setTimeout(() => map.invalidateSize(), 500);
        };
        window.addEventListener('resize', handleResize);
        // Also trigger on mount in case the container was hidden
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [map]);
    return null;
};

const KerryMap = ({ locations, activeLocationId, onLocationSelect }) => {
    const kerryCenter = [52.1545, -9.5669];

    // deduplicate markers by location
    const markersMap = new Map();
    locations.forEach(loc => {
        const coords = LOCATION_COORDS[loc.location];
        if (coords) {
            if (!markersMap.has(loc.location)) {
                markersMap.set(loc.location, { coords, items: [] });
            }
            markersMap.get(loc.location).items.push(loc);
        }
    });

    return (
        <div className="map-container glass-panel">
            <MapContainer
                center={kerryCenter}
                zoom={9}
                style={{ height: '100%', width: '100%', borderRadius: '12px', zIndex: 1 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <MapBoundsAggregator locations={locations} activeLocationId={activeLocationId} />
                <ResizeHandler />

                {Array.from(markersMap.entries()).map(([locName, data], idx) => {
                    const isActive = data.items.some(i => i.id === activeLocationId);
                    return (
                        <Marker
                            key={idx}
                            position={data.coords}
                            icon={isActive ? highlightIcon : new L.Icon.Default()}
                            eventHandlers={{
                                click: () => onLocationSelect(data.items[0].id)
                            }}
                        >
                            <Popup className="custom-popup">
                                <strong>{locName}</strong>
                                <ul style={{ margin: '5px 0 0 15px', padding: 0, fontSize: '0.85rem' }}>
                                    {data.items.map(item => (
                                        <li key={item.id}>{item.name}</li>
                                    ))}
                                </ul>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default KerryMap;
