import React, { FC, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import generateId from './common/generateId';
import 'mapbox-gl/dist/mapbox-gl.css'; // https://stackoverflow.com/questions/50909438/missing-mapbox-css-using-react

interface IMarkerProps {
  id: string;
  marker: mapboxgl.Marker;
}

// This token used in official mapbox-gl examples
// https://github.com/mapbox/mapbox-react-examples
mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map: FC = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapContainerRef = useRef<any>();
  const [markers, setMarkers] = useState<IMarkerProps[]>([]);

  const removeMarkerClick = () => {
    if (map) {
      map.off('click', addMarker);
    }
  };

  const addMarker = (e: any) => {
    if (map) {
      const { lng, lat } = e.lngLat;
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      setMarkers([...markers, { id: generateId(), marker }]);
      map.getCanvas().style.cursor = 'grab';
      removeMarkerClick();
    }
  };

  const enableMarkerSelection = () => {
    if (map) {
      map.getCanvas().style.cursor = 'crosshair';

      map?.on('click', addMarker);
    }
  };

  useEffect(() => {
    const mapInit = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [-87.65, 41.84],
      zoom: 3,
    });

    // Add navigation control (the +/- zoom buttons)
    mapInit.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapInit.getCanvas().style.cursor = 'grab';

    setMap(mapInit);

    return () => map?.remove();
  }, []);

  return (
    <>
      <button className="add-marker-button" onClick={enableMarkerSelection}>
        Add Marker
      </button>

      <div className="mapboxgl-canvas" ref={mapContainerRef} />
    </>
  );
};

export default Map;
