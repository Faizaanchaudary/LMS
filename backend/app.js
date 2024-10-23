const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const canteenRoutes = require('./routes/canteenRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
    
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); 
app.use('/api/assignments', assignmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/canteen', canteenRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
