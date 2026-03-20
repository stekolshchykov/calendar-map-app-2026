import React from 'react';
import { format } from 'date-fns';
import { MapPin, Users, Info, CloudRain, Truck } from 'lucide-react';

const Sidebar = ({ selectedDate, locations, activeLocationId, onLocationSelect }) => {
    const getRiskColor = (risk) => {
        if (risk === 'very_high' || risk.includes('Очень высокий')) return '#f85149';
        if (risk === 'high' || risk.includes('Высокий')) return '#ff7b72';
        if (risk === 'medium' || risk.includes('Средний') || risk.includes('Средне-высокий') || risk.includes('Средне‑высокий')) return '#d2a8ff';
        return '#8b949e';
    };

    const getRiskLabel = (risk) => {
        if (risk === 'very_high' || risk.includes('Очень высокий')) return 'Very High';
        if (risk === 'high' || risk.includes('Высокий')) return 'High';
        if (risk === 'medium' || risk.includes('Средний')) return 'Medium/Moderate';
        return risk;
    };

    const getScoreColor = (score) => {
        if (score >= 90) return '#3fb950'; // excellent
        if (score >= 75) return '#d2a8ff'; // good
        if (score >= 60) return '#e3b341'; // ok
        return '#f85149'; // poor
    };

    return (
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="sidebar-header">
                <h2>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a Date'}</h2>
                <p>
                    {locations.length > 0
                        ? `${locations.length} top places to visit today`
                        : 'No major events or markets recorded on this day.'}
                </p>
            </div>

            <div className="locations-list">
                {locations.map(item => (
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
                                <Users /> Crowd Estimate: {item.crowd.known_value ? item.crowd.known_value.toLocaleString() : item.crowd.scale}
                            </div>
                        )}

                        {item.food_truck_fit_score && (
                            <div className="item-detail">
                                <Truck />
                                <span style={{ color: getScoreColor(item.food_truck_fit_score), fontWeight: 'bold', marginLeft: '4px' }}>
                                    Fit Score: {item.food_truck_fit_score}/100
                                </span>
                            </div>
                        )}

                        {item.weather_risk && (
                            <div className="item-detail">
                                <CloudRain />
                                <span style={{ color: getRiskColor(item.weather_risk), marginLeft: '4px' }}>
                                    Weather Risk: {getRiskLabel(item.weather_risk)}
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
