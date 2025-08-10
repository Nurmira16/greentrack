import React, { useState } from 'react';
import { FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';
import '../styles/goal_list.scss';
import mascot from '../assets/loading_mascot.png'

const GoalList = () => {
    const [goals, setGoals] = useState([
        { id: 1, text: 'Run 5km in under 25 minutes', completed: false, category: 'fitness' },
        { id: 2, text: 'Lose 5kg by end of month', completed: false, category: 'weight' },
        { id: 3, text: 'Complete 30 push-ups in one set', completed: true, category: 'strength' }
    ]);
    const [newGoal, setNewGoal] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('fitness');

    const addGoal = () => {
        if (newGoal.trim()) {
            const goal = {
                id: Date.now(),
                text: newGoal.trim(),
                completed: false,
                category: selectedCategory
            };
            setGoals([...goals, goal]);
            setNewGoal('');
        }
    };

    const toggleGoal = (id) => {
        setGoals(goals.map(goal => 
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        ));
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const getCategoryColor = (category) => {
        const colors = {
            fitness: 'var(--primary-purple)',
            weight: 'var(--accent-teal)',
            strength: 'var(--primary-orange)',
            nutrition: 'var(--accent-red)'
        };
        return colors[category] || 'var(--primary-purple)';
    };

    return (
        <div className="goal-list-container">
            <div className="goal-header">
                <h1 className="goal-title">Your Goals</h1>
                <p className="goal-subtitle">Track your progress and celebrate achievements</p>
            </div>

            <div className="goal-input-section">
                <div className="input-group">
                    <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="category-select"
                    >
                        <option value="fitness">Fitness</option>
                        <option value="weight">Weight</option>
                        <option value="strength">Strength</option>
                        <option value="nutrition">Nutrition</option>
                    </select>
                    <input
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="Add a new goal..."
                        className="goal-input"
                        onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                    />
                    <button onClick={addGoal} className="add-goal-btn">
                        <FaPlus />
                    </button>
                </div>
            </div>

            <div className="goals-container">
                {goals.map(goal => (
                    <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
                        <div className="goal-content">
                            <button 
                                onClick={() => toggleGoal(goal.id)}
                                className={`goal-checkbox ${goal.completed ? 'checked' : ''}`}
                            >
                                {goal.completed && <FaCheckCircle />}
                            </button>
                            <span className="goal-text">{goal.text}</span>
                            <span 
                                className="goal-category"
                                style={{ backgroundColor: getCategoryColor(goal.category) }}
                            >
                                {goal.category}
                            </span>
                        </div>
                        <button 
                            onClick={() => deleteGoal(goal.id)}
                            className="delete-goal-btn"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>

            {goals.length === 0 && (
                <div className="empty-state">
                    <p>No goals yet. Add your first goal to get started!</p>
                    <img 
                        src={mascot}
                        alt="Loading mascot" 
                        className="loading-mascot"
                    />
                </div>
            )}
        </div>
    );
};

export default GoalList;