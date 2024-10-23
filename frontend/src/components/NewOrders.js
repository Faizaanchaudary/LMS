import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewOrders.css';

const NewOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/canteen/new-orders');
                setOrders(response.data);
            } catch (error) {
                alert('Error fetching orders:', error.response?.data?.message || error.message);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="new-orders-container">
            <h2>New Orders</h2>
            {orders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Department</th>
                            <th>Semester</th>
                            <th>Item</th>
                            <th>Amount</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order.studentName}</td>
                                <td>{order.department}</td>
                                <td>{order.semester}</td>
                                {/* Corrected this line to show `order.item.name` */}
                                <td>{order.item.name}</td> 
                                <td>{order.amount}</td>
                                <td>{order.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No new orders available</p>
            )}
        </div>
    );
};

export default NewOrders;
