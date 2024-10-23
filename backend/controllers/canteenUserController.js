const CanteenUser = require('../models/canteenUserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerCanteenUser = async (req, res) => {
  const { name, email, num, password } = req.body;
  const userExists = await CanteenUser.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Canteen user already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await CanteenUser.create({ name, email, num, password: hashedPassword });
  res.status(201).json({ message: 'Canteen user registered successfully' });
};

const loginCanteenUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await CanteenUser.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { registerCanteenUser, loginCanteenUser };
