import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { calculateDemand } from '../utils';
import { getWeatherInfo } from '../weather';

const Calendar = ({ selectedDate, onSelectDate, weatherData }) => {
    const year = 2026;
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <div className="calendar-wrapper">
            <div className="months-grid">
                {months.map((monthDate, i) => {
                    const start = new Date(year, i, 1);
                    const end = new Date(year, i + 1, 0);

                    let calendarStart = startOfWeek(start, { weekStartsOn: 1 });
                    let calendarEnd = endOfWeek(end, { weekStartsOn: 1 });

                    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

                    return (
                        <div key={i} className="month">
                            <div className="month-header">{format(start, 'MMMM')}</div>
                            <div className="days-header">
                                {weekDays.map((d, index) => <div key={index}>{d}</div>)}
                            </div>
                            <div className="days-grid">
                                {days.map((day, idx) => {
                                    const isCurrentMonth = day.getMonth() === i;
                                    if (!isCurrentMonth) {
                                        return <div key={idx} className="day-cell empty"></div>;
                                    }

                                    const demand = calculateDemand(day);
                                    const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                                    const dateStr = format(day, 'yyyy-MM-dd');
                                    const weather = weatherData?.[dateStr];
                                    const weatherEmoji = weather ? getWeatherInfo(weather.weatherCode).emoji : '';

                                    return (
                                        <div
                                            key={idx}
                                            className={`day-cell heat-${demand} ${isSelected ? 'selected' : ''}`}
                                            onClick={() => onSelectDate(day)}
                                            title={`${format(day, 'MMM d, yyyy')}\nDemand: ${demand}${weather ? `\n${getWeatherInfo(weather.weatherCode).label} ${Math.round(weather.tempMax)}°C` : ''}`}
                                        >
                                            <div className="day-number">{format(day, 'd')}</div>
                                            {weatherEmoji && <div className="day-weather">{weatherEmoji}</div>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
