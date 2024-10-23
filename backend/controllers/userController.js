const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const registerUser = async (req, res) => {
    const { name, email, password, bsfId, role, department, semester } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return  res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        bsfId,
        role,
        department,
        semester,
    });

    if (user) {
        res.status(201).json({ message: 'User registered successfully' });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            department: user.department,
            semester: user.semester
        }
    });
};

module.exports = { registerUser, loginUser }; 

