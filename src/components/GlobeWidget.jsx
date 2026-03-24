import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const GlobeWidget = ({ data, selected }) => {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({ 
    width: window.innerWidth < 1000 ? window.innerWidth : window.innerWidth - 400, 
    height: window.innerHeight 
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => setDimensions({ 
      width: window.innerWidth < 1000 ? window.innerWidth : window.innerWidth - 400, 
      height: window.innerHeight 
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter out any markers lacking lat/lng
  const markers = data.filter(d => d.lat !== undefined && d.lng !== undefined).map(d => {
    const isUp = d.changePercent > 0;
    return {
      lat: d.lat,
      lng: d.lng,
      size: Math.abs(d.changePercent) * 0.1 + 0.1, // Scale size by percentage shift
      color: isUp ? '#00e676' : '#ff1744',
      name: d.name,
      symbol: d.symbol
    };
  });

  console.log('Globe State:', { dimensions, markersCount: markers.length, dataCount: data.length });

  // Center globe on selected
  useEffect(() => {
    if(selected && globeRef.current) {
      const target = data.find(m => m.symbol === selected);
      if(target && target.lat && target.lng) {
        globeRef.current.pointOfView({ lat: target.lat, lng: target.lng, altitude: 1.5 }, 1000);
      }
    }
  }, [selected, data]);

  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    // Fetch GeoJSON for country outlines (Hexagons)
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error("Error loading countries:", err));
  }, []);

  return (
    <div className="globe-container">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#00e676"
        atmosphereAltitude={0.15}
        globeColor="#050505"
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonColor={() => 'rgba(255,255,255, 0.15)'}
        pointsData={markers}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude="size"
        pointRadius={0.8}
        pointsMerge={false}
        pointResolution={32}
        animateIn={true}
      />
    </div>
  );
};

export default GlobeWidget;
