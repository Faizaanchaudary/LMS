import React from 'react';
import './CanteenServices.css';
import { useNavigate } from 'react-router-dom';

const CanteenServices = () => {
    const navigate = useNavigate();

    return (
        <div className="canteen-services-container">
            <h2>Canteen Services</h2>
            <button onClick={() => navigate('/add-item')} className="canteen-button">Add New Item</button>
            <button onClick={() => navigate('/delete-item')} className="canteen-button">Delete Existing Item</button>
            <button onClick={() => navigate('/item-list')} className="canteen-button">Check Available Items</button>
            <button onClick={() => navigate('/new-orders')} className="canteen-button">New Orders</button>
        </div>
    );
};

export default CanteenServices;
