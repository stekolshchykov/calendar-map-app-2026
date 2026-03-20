import React from 'react';
import { X, Trophy, Calendar, MapPin, Coffee } from 'lucide-react';

const StrategyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}><X /></button>

                <h2>Food Truck Strategy 2026 (Kerry)</h2>
                <div className="strategy-scroll">

                    <section className="strategy-section">
                        <h3><Trophy className="icon top-icon" /> Top 4 "Golden" Locations</h3>
                        <div className="location-card">
                            <h4>1. Killarney (Year-Round Stability)</h4>
                            <p>The highest volume of tourist traffic. <strong>Best Bets:</strong> Ireland BikeFest (May), St Patrick's (Mar), Rally of the Lakes (May).</p>
                        </div>
                        <div className="location-card">
                            <h4>2. Tralee (Peak Multi-Day Events)</h4>
                            <p>Home to the biggest single event. <strong>Best Bets:</strong> Rose of Tralee (Aug, 100k+), Kingdom County Show (May).</p>
                        </div>
                        <div className="location-card">
                            <h4>3. Dingle (Foodie & Sport Crowd)</h4>
                            <p>High willingness to pay for specialty food/coffee. <strong>Best Bets:</strong> Dingle Food Festival (Oct), Adventure Race/Marathon.</p>
                        </div>
                        <div className="location-card">
                            <h4>4. Listowel (The Autumn Harvest)</h4>
                            <p>The savior of the late season. <strong>Best Bets:</strong> Listowel Harvest Festival Races (September, ~90k volume).</p>
                        </div>
                    </section>

                    <section className="strategy-section">
                        <h3><Calendar className="icon season-icon" /> Seasonal Guide</h3>
                        <ul className="season-list">
                            <li><strong className="winter">Winter:</strong> Very high weather risk. Stick to morning sports events and indoor/covered markets. Coffee & hot drinks only.</li>
                            <li><strong className="spring">Spring:</strong> Street flow starts. Great for grabbing early market share (St Patrick's, BikeFest).</li>
                            <li><strong className="summer">Summer:</strong> Core revenue time. Book multi-day festivals. Very long working days.</li>
                            <li><strong className="autumn">Autumn:</strong> Storm risk increases. Target ONLY the mega-events (Listowel Races, Dingle Food Fest).</li>
                        </ul>
                    </section>

                    <section className="strategy-section">
                        <h3><Coffee className="icon profit-icon" /> Business Model Insights</h3>
                        <p><strong>The Morning Sports Niche:</strong> Target events like the Tralee 10 Mile or Dingle Marathon. Serving premium coffee between 07:00–10:00AM yields incredible conversion as most local cafes are still closed.</p>
                        <p><strong>Licensing:</strong> Ensure Event Trading pitches are booked 3+ months in advance for the "Big 3": BikeFest, Rose of Tralee, and Listowel Harvest Festival.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default StrategyModal;
