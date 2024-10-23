import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderFood.css';

const OrderFood = () => {
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [amount, setAmount] = useState('');
    const [location, setLocation] = useState('');
    const [studentData, setStudentData] = useState({
        name: '',
        department: '',
        semester: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/canteen/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Error fetching items');
            }
        };

        fetchItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!selectedItemId || !amount || !location || !studentData.name || !studentData.department || !studentData.semester) {
            setError('Please fill in all fields before submitting.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/canteen/order', {
                studentName: studentData.name,
                department: studentData.department,
                semester: studentData.semester,
                itemId: selectedItemId,
                amount,
                location,
            });
            alert('Order placed successfully');
            setAmount('');
            setLocation('');
            setSelectedItemId('');
            setStudentData({
                name: '',
                department: '',
                semester: ''
            });
        } catch (error) {
            console.error('Error placing order:', error);
            setError('Error placing order. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };

    return (
        <div className="order-food-container">
            <h2>Order Food</h2>
            {error && <p className="error-message">{error}</p>}
            
            <div className="student-info">
                <input 
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={studentData.name}
                    onChange={handleInputChange}
                    required
                />
                <input 
                    type="text"
                    name="department"
                    placeholder="Enter Department"
                    value={studentData.department}
                    onChange={handleInputChange}
                    required
                />
                <input 
                    type="text"
                    name="semester"
                    placeholder="Enter Semester"
                    value={studentData.semester}
                    onChange={handleInputChange}
                    required
                />
            </div>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="items">Select Item:</label>
                <select id="items" onChange={(e) => setSelectedItemId(e.target.value)} required>
                    <option value="">Select an item</option>
                    {items.map(item => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                </select>
                
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default OrderFood;
