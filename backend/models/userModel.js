const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bsfId: { type: String, required: true, unique: true },
    role: { type: String, enum: ['student', 'teacher'], required: true },
    department: { type: String, required: true },
    semester: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
