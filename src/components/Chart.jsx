import React from 'react';
import { useSelector } from 'react-redux';
import { FaChartLine, FaTrophy, FaFire, FaWalking } from 'react-icons/fa';
import '../styles/chart.scss';

const Chart = () => {
    const { workoutHours, calories, steps } = useSelector(state => state.activities);

    const getProgressColor = (value, max) => {
        const percentage = (value / max) * 100;
        if (percentage >= 80) return 'var(--accent-teal)';
        if (percentage >= 60) return 'var(--primary-yellow)';
        if (percentage >= 40) return 'var(--primary-orange)';
        return 'var(--accent-red)';
    };

    const getProgressPercentage = (value, max) => {
        return Math.min((value / max) * 100, 100);
    };

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h1 className="chart-title">Progress Overview</h1>
                <p className="chart-subtitle">Track your fitness journey</p>
            </div>

            <div className="progress-grid">
                <div className="progress-card">
                    <div className="progress-icon">
                        <FaFire />
                    </div>
                    <div className="progress-content">
                        <h3>Workout Hours</h3>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ 
                                    width: `${getProgressPercentage(workoutHours, 8)}%`,
                                    backgroundColor: getProgressColor(workoutHours, 8)
                                }}
                            ></div>
                        </div>
                        <div className="progress-stats">
                            <span className="current">{workoutHours}h</span>
                            <span className="target">/ 8h</span>
                        </div>
                    </div>
                </div>

                <div className="progress-card">
                    <div className="progress-icon">
                        <FaChartLine />
                    </div>
                    <div className="progress-content">
                        <h3>Calories Burned</h3>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ 
                                    width: `${getProgressPercentage(calories, 2000)}%`,
                                    backgroundColor: getProgressColor(calories, 2000)
                                }}
                            ></div>
                        </div>
                        <div className="progress-stats">
                            <span className="current">{calories}</span>
                            <span className="target">/ 2000 kcal</span>
                        </div>
                    </div>
                </div>

                <div className="progress-card">
                    <div className="progress-icon">
                        <FaWalking />
                    </div>
                    <div className="progress-content">
                        <h3>Daily Steps</h3>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ 
                                    width: `${getProgressPercentage(steps, 10000)}%`,
                                    backgroundColor: getProgressColor(steps, 10000)
                                }}
                            ></div>
                        </div>
                        <div className="progress-stats">
                            <span className="current">{steps}</span>
                            <span className="target">/ 10,000</span>
                        </div>
                    </div>
                </div>

                <div className="progress-card achievement">
                    <div className="progress-icon">
                        <FaTrophy />
                    </div>
                    <div className="progress-content">
                        <h3>Weekly Goal</h3>
                        <div className="achievement-status">
                            {workoutHours >= 5 && calories >= 10000 && steps >= 50000 ? (
                                <span className="achieved">🎉 Goal Achieved!</span>
                            ) : (
                                <span className="in-progress">Keep going!</span>
                            )}
                        </div>
                        <div className="achievement-progress">
                            <div className="mini-progress">
                                <span className={`dot ${workoutHours >= 5 ? 'completed' : ''}`}></span>
                                <span className={`dot ${calories >= 10000 ? 'completed' : ''}`}></span>
                                <span className={`dot ${steps >= 50000 ? 'completed' : ''}`}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;