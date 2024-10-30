import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const sampleData = {
    US: ['Call of Duty: Modern Warfare', 'Fortnite', 'Minecraft'],
    CA: ['Assassin\'s Creed Valhalla', 'FIFA 21', 'Rocket League'],
    GB: ['FIFA 21', 'Fortnite', 'Grand Theft Auto V'],
    FR: ['League of Legends', 'Fortnite', 'Minecraft'],
    DE: ['FIFA 21', 'League of Legends', 'Fortnite'],
    // Add more countries and data as needed
};

function CountryPage() {
    const { countryCode } = useParams();
    const navigate = useNavigate();

    const games = sampleData[countryCode] || ['Data not available'];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Top 3 Video Games in {countryCode}</h1>
            <ol>
                {games.map((game, index) => (
                    <li key={index}>{game}</li>
                ))}
            </ol>
            <button onClick={() => navigate(-1)}>Back to Globe</button>
        </div>
    );
}

export default CountryPage;