import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css';

const AddItem = () => {
    const [itemData, setItemData] = useState({
        name: '',
        amountAvailable: '',
        price: '',
        companyName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({ ...itemData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/canteen/add-item', itemData);
            alert('Item added successfully');
        } catch (error) {
            alert('Error adding item');
        }
    };

    return (
        <div className="add-item-container">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Item Name" onChange={handleChange} required />
                <input type="number" name="amountAvailable" placeholder="Amount Available" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
                <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
                <button type="submit" className="add-item-button">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;
