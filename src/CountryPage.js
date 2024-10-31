import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import driversByCountry from './drivers_by_country.json';
import countryNameToNationality from './countryNameToNationalityMap'

function CountryPage() {
    const { countryName } = useParams();
    const navigate = useNavigate();

    const decodedCountryName = decodeURIComponent(countryName);
    console.log(decodedCountryName);

    const nationality = countryNameToNationality[decodedCountryName];
    console.log(nationality);


    const drivers = nationality ? driversByCountry[nationality] || [] : [];

    return (
        <div style={{ padding: '20px' }}>
            <h1>
                Formula 1 Drivers from {decodedCountryName}
            </h1>
            {drivers.length > 0 ? (
                <>
                    <p>Total Drivers: {drivers.length}</p>
                    <h2>Drivers:</h2>
                    <ul>
                        {drivers.map((driver) => (
                            <li key={driver.driverId}>
                                {driver.givenName} {driver.familyName} ({driver.dateOfBirth})
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No Formula 1 drivers found for this country.</p>
            )}
            <button onClick={() => navigate(-1)}>Back to Globe</button>
        </div>
    );
}

export default CountryPage;