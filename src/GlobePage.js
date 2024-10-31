import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';
import * as topojson from 'topojson-client';

function GlobePage() {
    const globeEl = useRef();
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://unpkg.com/world-atlas@2/countries-50m.json')
            .then((res) => res.json())
            .then((worldData) => {
                const countryFeatures = topojson.feature(
                    worldData,
                    worldData.objects.countries
                ).features;
                setCountries(countryFeatures);
            });
    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                polygonsData={countries}
                polygonAltitude={0.01}
                polygonCapColor={() => 'rgba(38, 166, 154, 0.6)'}
                polygonSideColor={() => 'rgba(38, 166, 154, 0.15)'}
                polygonStrokeColor={() => '#111'}
                polygonLabel={({ properties: d }) => `${d.name}`}
                onPolygonClick={(country) => {
                    const countryName = country.properties.name;
                    if (countryName) {
                        // Encode the country name to handle spaces and special characters
                        const encodedCountryName = encodeURIComponent(countryName);
                        navigate(`/country/${encodedCountryName}`);
                    } else {
                        console.error('Country name is undefined.');
                    }
                }}
            />
        </div>
    );
}

export default GlobePage;