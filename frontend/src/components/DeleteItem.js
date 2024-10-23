// frontend/src/components/DeleteItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteItem.css'; 

const DeleteItem = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/canteen/items', {
                headers: { Authorization: `Bearer ${localStorage.getItem('canteenJwt')}` }
            });
            setItems(response.data);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to fetch items.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/canteen/delete-item/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('canteenJwt')}` }
            });
            alert(response.data.message);
            fetchItems(); 
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete item.');
        }
    };

    return (
        <div className="delete-item-container">
            <h2>Delete Existing Item</h2>
            <table className="delete-item-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount Available</th>
                        <th>Price</th>
                        <th>Company Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.amountAvailable}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.companyName}</td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No items available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteItem;
