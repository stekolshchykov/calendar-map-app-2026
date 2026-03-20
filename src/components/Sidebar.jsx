import React, { useState } from 'react';
import { format } from 'date-fns';
import { MapPin, Users, Info, CloudRain, Truck, Search, Thermometer, Wind, Droplets } from 'lucide-react';
import { getWeatherInfo } from '../weather';

const Sidebar = ({ selectedDate, locations, activeLocationId, onLocationSelect, weatherData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [topRatedOnly, setTopRatedOnly] = useState(false);

  const dateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
  const weather = dateStr ? weatherData?.[dateStr] : null;

  const getRiskColor = (risk) => {
    if (risk === 'very_high') return '#f85149';
    if (risk === 'high') return '#ff7b72';
    if (risk === 'medium') return '#d2a8ff';
    return '#8b949e';
  };

  const getRiskLabel = (risk) => {
    if (risk === 'very_high') return 'Very High';
    if (risk === 'high') return 'High';
    if (risk === 'medium') return 'Medium';
    return risk;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#3fb950';
    if (score >= 75) return '#d2a8ff';
    if (score >= 60) return '#e3b341';
    return '#f85149';
  };

  const filteredLocations = locations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' ? true : item.itemType === filterType;
    const matchesTopRated = topRatedOnly ? (item.food_truck_fit_score && item.food_truck_fit_score >= 85) : true;
    return matchesSearch && matchesType && matchesTopRated;
  });

  return (
    <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="sidebar-header">
        <h2>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a Date'}</h2>
        <p>
          {locations.length > 0
            ? `${locations.length} total places to visit today`
            : 'No major events or markets recorded on this day.'}
        </p>
      </div>

      {/* Weather Card */}
      {weather && (
        <div className="weather-card">
          <div className="weather-main">
            <span className="weather-emoji">{getWeatherInfo(weather.weatherCode).emoji}</span>
            <div>
              <div className="weather-label">{getWeatherInfo(weather.weatherCode).label}</div>
              <div className="weather-temp">{Math.round(weather.tempMin)}° — {Math.round(weather.tempMax)}°C</div>
            </div>
          </div>
          <div className="weather-details">
            <div className="weather-detail-item">
              <Droplets size={14} /> {weather.precipitation} mm
            </div>
            <div className="weather-detail-item">
              <Wind size={14} /> {Math.round(weather.windMax)} km/h
            </div>
          </div>
        </div>
      )}

      {locations.length > 0 && (
        <div className="sidebar-filters">
          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search event or town..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="event">Events Only</option>
              <option value="market">Markets Only</option>
            </select>
            <label className="checkbox-label" title="Show only events with Fit Score 85+">
              <input
                type="checkbox"
                checked={topRatedOnly}
                onChange={(e) => setTopRatedOnly(e.target.checked)}
              />
              <span className="checkbox-text">Top Rated Only</span>
            </label>
          </div>
        </div>
      )}

      <div className="locations-list">
        {filteredLocations.map(item => (
          <div
            key={item.id}
            className={`location-item ${activeLocationId === item.id ? 'active' : ''}`}
            onClick={() => onLocationSelect(item.id)}
          >
            <div className="item-header">
              <span className="item-title">{item.name}</span>
              <span className={`item-type ${item.itemType}`}>{item.itemType}</span>
            </div>
            <div className="item-detail">
              <MapPin /> {item.location}
            </div>
            {item.crowd && (
              <div className="item-detail">
                <Users /> Crowd: {item.crowd.known_value ? item.crowd.known_value.toLocaleString() : item.crowd.scale}
              </div>
            )}
            {item.food_truck_fit_score && (
              <div className="item-detail">
                <Truck />
                <span style={{color: getScoreColor(item.food_truck_fit_score), fontWeight: 'bold'}}>
                   Fit: {item.food_truck_fit_score}/100
                </span>
              </div>
            )}
            {item.weather_risk && (
              <div className="item-detail">
                <CloudRain />
                <span style={{color: getRiskColor(item.weather_risk)}}>
                  Risk: {getRiskLabel(item.weather_risk)}
                </span>
              </div>
            )}
            {item.time && (
              <div className="item-detail">
                <Info /> Time: {item.time}
              </div>
            )}
          </div>
        ))}

        {locations.length > 0 && filteredLocations.length === 0 && (
          <div className="empty-state">No events match your current filters.</div>
        )}

        {locations.length === 0 && selectedDate && (
          <div className="empty-state">
            Enjoy a quiet day exploring County Kerry's beautiful landscapes!
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
