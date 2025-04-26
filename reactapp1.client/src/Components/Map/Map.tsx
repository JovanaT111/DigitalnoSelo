import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface SeloMapVM {
    naziv: string;
    latitude: number;
    longitude: number;
    id: number; // Assuming each selo has a unique id
}

const centerPosition: LatLngExpression = [43.51, 18.25];

const Map: React.FC = () => {
    const [seloCoordinates, setSeloCoordinates] = useState<SeloMapVM[]>([]);

    useEffect(() => {
        axios.get<SeloMapVM[]>('https://localhost:7249/api/Selo/coordinates')
            .then(response => {
                console.log(response.data);
                setSeloCoordinates(response.data);
            })
            .catch(error => {
                console.error("Error fetching coordinates:", error);
            });
    }, []);

    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <MapContainer
                center={centerPosition}
                zoom={13}
                minZoom={3}
                maxZoom={19}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {seloCoordinates.map((selo, index) => (
                    <Marker key={index} position={[selo.latitude, selo.longitude]}>
                        <Popup>
                            <div>
                                <h3>{selo.naziv}</h3>
                                <a href={`/view/${selo.id}`} target="_blank" rel="noopener noreferrer">
                                    More Info
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
