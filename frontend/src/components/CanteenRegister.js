import React, { useState } from 'react';
import axios from 'axios';
import './CanteenRegister.css'; 

const CanteenRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    num: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/canteen/register', formData);
      alert(response.data.message);
      window.location.href = '/canteen-login'; 
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Canteen Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="num" placeholder="Phone Number" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CanteenRegister;
