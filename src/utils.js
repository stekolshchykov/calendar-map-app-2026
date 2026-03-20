import data from './data.json';

export const getEventsForDate = (date) => {
    const targetDateStr = date.toISOString().split('T')[0];
    const targetDayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

    const dayOfWeekString = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][targetDayOfWeek];

    const events = data.events.filter(e => {
        // some dates are just one day, others are ranges
        const start = new Date(e.start_date).getTime();
        const end = new Date(e.end_date).getTime();
        const target = date.getTime();
        return target >= start && target <= end;
    });

    const holidays = data.public_holidays.filter(h => h.date === targetDateStr);
    const markets = data.markets.filter(m => m.day_of_week === dayOfWeekString);

    return { events, holidays, markets };
};

const scaleWeight = {
    "XL": 4,
    "++": 4,
    "L": 3,
    "L-XL": 4,
    "M-L": 3,
    "M": 2,
    "S-M": 1,
    "S": 1
};

export const calculateDemand = (date) => {
    const { events, holidays, markets } = getEventsForDate(date);

    let score = 0;

    // if an event has a fit score, let's heavily weight it.
    events.forEach(e => {
        if (e.food_truck_fit_score) {
            if (e.food_truck_fit_score >= 90) score += 4;
            else if (e.food_truck_fit_score >= 80) score += 3;
            else if (e.food_truck_fit_score >= 60) score += 2;
            else score += 1;
        } else {
            const scale = e.crowd?.scale || 'S';
            const weightStr = typeof scale === 'string' ? scale.replace('+', '').replace(' (estimate)', '').trim() : scale;
            score += scaleWeight[weightStr] || 1;
        }
    });

    score += holidays.length * 2;
    score += markets.length * 1;

    if (score === 0) return 0;
    if (score === 1) return 1;
    if (score <= 3) return 2;
    if (score <= 5) return 3;
    return 4; // Max demand
};

export const getLocationsForDate = (date) => {
    const { events, holidays, markets } = getEventsForDate(date);

    const locations = [];

    events.forEach(e => {
        let baseDemand = 1;
        if (e.food_truck_fit_score) {
            if (e.food_truck_fit_score >= 90) baseDemand = 4;
            else if (e.food_truck_fit_score >= 80) baseDemand = 3;
            else if (e.food_truck_fit_score >= 60) baseDemand = 2;
        } else {
            const scale = e.crowd?.scale || 'S';
            const weightStr = typeof scale === 'string' ? scale.replace('+', '').replace(' (estimate)', '').trim() : scale;
            baseDemand = scaleWeight[weightStr] || 1;
        }

        locations.push({
            ...e,
            itemType: 'event',
            demand: baseDemand
        });
    });

    markets.forEach(m => {
        locations.push({
            ...m,
            itemType: 'market',
            demand: 1
        });
    });

    // Sort by fit score or demand descending
    locations.sort((a, b) => {
        const aScore = a.food_truck_fit_score || (a.demand * 25); // approximate comparable scaling
        const bScore = b.food_truck_fit_score || (b.demand * 25);
        return bScore - aScore;
    });

    return locations;
};
