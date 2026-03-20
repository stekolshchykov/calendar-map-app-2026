import React from 'react';
import { X, Trophy, Calendar, MapPin, Coffee, ShieldCheck, Zap } from 'lucide-react';

const StrategyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}><X /></button>

                <h2>Kerry Food Truck Strategy 2026</h2>
                <div className="strategy-scroll">

                    <section className="strategy-section">
                        <h3><Trophy className="icon top-icon" /> 2026 High-Yield Hotspots</h3>
                        <div className="location-card">
                            <h4>1. Killarney (GAA & Stadium events)</h4>
                            <p><strong>Fitzgerald Stadium</strong> (15k capacity). Mark <strong>March 1 (vs Monaghan)</strong> and <strong>March 14 (vs Mayo)</strong> as absolute priority days. Arrive 4 hours before throw-in.</p>
                        </div>
                        <div className="location-card">
                            <h4>2. Banna Beach & Greenways</h4>
                            <p>Kerry Council's new 2026 focus. Banna Beach is a designated draft trading zone. High summer demand from domestic tourists.</p>
                        </div>
                        <div className="location-card">
                            <h4>3. Dingle (Harbor & Festivals)</h4>
                            <p>High spending power. <strong>Animation Dingle (Mar)</strong> and <strong>Food Festival (Oct)</strong> are the anchors. Best for specialty/artisan offerings.</p>
                        </div>
                        <div className="location-card">
                            <h4>4. Tralee (Rose of Tralee Hub)</h4>
                            <p>Austin Stack Park matches + the massive 100k+ crowd in mid-August. Requires earliest permit booking.</p>
                        </div>
                    </section>

                    <section className="strategy-section">
                        <h3><ShieldCheck className="icon season-icon" /> 2026 Licensing & Permits</h3>
                        <div className="location-card">
                            <p><strong>Casual Trading License:</strong> Mandatory for all public spots. Expected 2026 rates: <strong>€17 license fee + ~€64 annual bay charge</strong> per location.</p>
                            <p style={{marginTop: '10px', fontSize: '0.9rem', color: '#58a6ff'}}>Apply at least 30 days in advance via Kerry County Council's planning office.</p>
                        </div>
                    </section>

                    <section className="strategy-section">
                        <h3><Zap className="icon season-icon" /> Power & Operations</h3>
                        <p>Most 2026 council spots DO NOT provide electricity. <strong>Self-sufficiency is key:</strong></p>
                        <ul className="season-list" style={{marginTop: '10px'}}>
                            <li><strong>Quiet Inverter Generators:</strong> Mandatory for most festivals to avoid noise complaints.</li>
                            <li><strong>Propane:</strong> Best for high-output cooking (burgers/crepes) to save electrical load.</li>
                            <li><strong>Weather Flip:</strong> If the app shows Rain &gt; 5mm, pivot to sheltered town spots or indoor markets like Tralee Farmers Market.</li>
                        </ul>
                    </section>

                    <section className="strategy-section">
                        <h3><Calendar className="icon season-icon" /> Seasonal Macro-Trend</h3>
                        <ul className="season-list">
                            <li><strong className="winter">Winter:</strong> Focus on "Coffee & Hot Soup" at weekend sports hubs.</li>
                            <li><strong className="spring">Spring:</strong> Racing season begins. Killarney Races (May) have high "suitability" scores.</li>
                            <li><strong className="summer">Summer:</strong> 100% capacity. This is when the "Wild Atlantic Way" traffic peaks.</li>
                            <li><strong className="autumn">Autumn:</strong> Harvest festivals. Listowel Races (Sept) is the biggest late-season earner (~90k people).</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default StrategyModal;
