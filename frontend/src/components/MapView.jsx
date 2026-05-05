import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Rectangle,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import { useStore } from "../store/useStore";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function MapUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 17);
  }, [position, map]);
  return null;
}

export default function MapView() {
  const [position, setPosition] = useState([28.6139, 77.2090]);
  const watchIdRef = useRef(null);
  const { capturedTiles, addTile } = useStore();
  const tileSize = 0.001;
  const captureTile = (lat, lng) => {
    const gridLat = Math.floor(lat / tileSize) * tileSize;
    const gridLng = Math.floor(lng / tileSize) * tileSize;
    const id = `${gridLat}-${gridLng}`;
    addTile({
      id,
      bounds: [
        [gridLat, gridLng],
        [gridLat + tileSize, gridLng + tileSize],
      ],
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition([lat, lng]);
          captureTile(lat, lng);
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-[1.8rem] overflow-hidden group">
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-neon-green/50 z-[1001] pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-neon-green/50 z-[1001] pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-neon-green/50 z-[1001] pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-neon-green/50 z-[1001] pointer-events-none" />

      <MapContainer
        center={position}
        zoom={17}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater position={position} />

        <Marker 
          position={position}
          icon={L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div class="relative flex items-center justify-center">
                <div class="absolute w-12 h-12 bg-[#39ff14]/20 rounded-full animate-ping"></div>
                <div class="absolute w-8 h-8 bg-[#39ff14]/40 rounded-full animate-pulse"></div>
                <div class="w-4 h-4 bg-[#39ff14] rounded-full border-2 border-white shadow-[0_0_10px_#39ff14]"></div>
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          })}
        >
          <Popup>
            <div className="font-bold text-neon-green">LIVE POSITION</div>
          </Popup>
        </Marker>

        {capturedTiles.map((tile) => (
          <Rectangle
            key={tile.id}
            bounds={tile.bounds}
            pathOptions={{
              color: "#39ff14",
              fillColor: "#39ff14",
              fillOpacity: 0.35,
              weight: 1,
            }}
          />
        ))}
      </MapContainer>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1001] flex gap-3">
        <button className="glass px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest text-white/70 hover:text-neon-green transition-all border border-white/10 uppercase backdrop-blur-xl">
          GPS SYNC
        </button>
        <button className="glass px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest text-white/70 hover:text-neon-green transition-all border border-white/10 uppercase backdrop-blur-xl">
          SATELLITE
        </button>
      </div>
    </div>
  );
}