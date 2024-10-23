import React, { useState } from 'react';
import axios from 'axios';
import './CanteenLogin.css'; // Make sure this file includes necessary styles

const CanteenLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/canteen/login', credentials);
            const { token } = response.data;
            localStorage.setItem('canteenJwt', token);
            alert('Login successful!');
            window.location.href = '/canteen-services'; 
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Canteen Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                    className="login-input" 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required 
                    className="login-input" 
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            <p className="register-link">
                Already have an account? <a href="/canteen-register">Register here</a>
            </p>
        </div>
    );
};

export default CanteenLogin;
