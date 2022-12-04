import React, { FC, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

// This token used in official mapbox-gl examples
// https://github.com/mapbox/mapbox-react-examples
mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map: FC = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapContainerRef = useRef<any>();

  useEffect(() => {
    const mapInit = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.65, 41.84],
      zoom: 10,
    });

    // Add navigation control (the +/- zoom buttons)
    mapInit.addControl(new mapboxgl.NavigationControl(), 'top-right');

    setMap(mapInit);
    return () => map?.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
