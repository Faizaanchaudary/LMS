import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css'; 

const StudentDashboard = () => {
    const navigate = useNavigate();

    const handleNavigate = (page) => {
        navigate(page);
    };

    return (
        <div className="dashboard-container">
            <h2>Student Dashboard</h2>
            <div className="button-container">
                <button onClick={() => handleNavigate('/results')}>Results</button>
                <button onClick={() => handleNavigate('/upload-assignment')}>Assignment Upload</button>
                <button onClick={() => handleNavigate('/submit-fee')}>Fee Submit</button>
                <button onClick={() => handleNavigate('/news')}>News</button>
                <button onClick={() => handleNavigate('/order-food')}>Order Food</button>
            </div>
        </div>
    );
};

export default StudentDashboard;
