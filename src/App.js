import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobePage from './GlobePage';
import CountryPage from './CountryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GlobePage />} />
      <Route path="/country/:countryCode" element={<CountryPage />} />
    </Routes>
  );
}

export default App;