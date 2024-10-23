import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemList.css';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/canteen/items');
                setItems(response.data);
            } catch (error) {
                alert('Error fetching items');
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="item-list-container">
            <h2>Available Items</h2>
            <table className="item-list-table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Amount Available</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.amountAvailable}</td>
                            <td>{item.companyName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
