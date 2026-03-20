import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import KerryMap from './components/Map';
import Sidebar from './components/Sidebar';
import StrategyModal from './components/StrategyModal';
import { getLocationsForDate } from './utils';
import { fetchWeatherForecast } from './weather';
import { Info } from 'lucide-react';

// Set today strictly in 2026 for context
const DEFAULT_DATE = new Date(2026, 2, 20);

function App() {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_DATE);
  const [locations, setLocations] = useState([]);
  const [activeLocationId, setActiveLocationId] = useState(null);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    fetchWeatherForecast().then(data => setWeatherData(data));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const locs = getLocationsForDate(selectedDate);
      setLocations(locs);
      setActiveLocationId(null);
    }
  }, [selectedDate]);

  return (
    <div className="app-container">
      <header>
        <div className="header-text">
          <h1>Kerry 2026 <span className="title-accent">Explorer</span></h1>
          <div className="ready-badge">Strategy & Weather 2026 Ready</div>
          <p>Discover the most vibrant events, markets, and hotspots in County Kerry.</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setIsStrategyModalOpen(true)}
        >
          <Info size={18} />
          View Strategy Map
        </button>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <KerryMap
            locations={locations}
            activeLocationId={activeLocationId}
            onLocationSelect={setActiveLocationId}
          />
          <Calendar 
            selectedDate={selectedDate} 
            onSelectDate={setSelectedDate}
            weatherData={weatherData}
          />
        </div>

        <div className="right-panel">
          <Sidebar
            selectedDate={selectedDate}
            locations={locations}
            activeLocationId={activeLocationId}
            onLocationSelect={setActiveLocationId}
            weatherData={weatherData}
          />
        </div>
      </div>

      <StrategyModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
      />
    </div>
  );
}

export default App;
