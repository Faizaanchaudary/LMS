import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', credentials);
            const { token , user } = response.data; 
            
            if (token) {
                localStorage.setItem('jwt', token); 
                const userId = response.data.user._id; 
                localStorage.setItem('studentId', userId);
                alert('Login successful!');
                window.location.href = '/dashboard'; 
            } else {
                alert('Login failed: No token received');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            alert(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
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
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;
