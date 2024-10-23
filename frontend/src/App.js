import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';
import CanteenRegister from './components/CanteenRegister';
import CanteenLogin from './components/CanteenLogin';
import CanteenServices from './components/CanteenServices';
import AddItem from './components/AddItem';
import DeleteItem from './components/DeleteItem'; 
import ItemList from './components/ItemList'; 
import NewOrders from './components/NewOrders';
import OrderFood from './components/OrderFood';
import UploadAssignment from './components/UploadAssignment';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/canteen-register" element={<CanteenRegister />} />
                <Route path="/canteen-login" element={<CanteenLogin />} />
                <Route path="/canteen-services" element={<CanteenServices />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/delete-item" element={<DeleteItem />} /> 
                <Route path="/item-list" element={<ItemList />} />
                <Route path="/new-orders" element={<NewOrders />} />
                <Route path="/order-food" element={<OrderFood />} />
                <Route path="/upload-assignment" element={<UploadAssignment />} />
            </Routes>
        </Router>
    );
}

export default App;
