import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        bsfId: '',
        role: 'student', 
        department: '',
        semester: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            alert(response.data.message);
            window.location.href = '/login'; 
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="bsfId" placeholder="BSF ID" onChange={handleChange} required />
                <select name="role" onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
                <input type="text" name="semester" placeholder="Semester" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
