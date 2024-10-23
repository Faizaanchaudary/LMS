const express = require('express');
const multer = require('multer');
const Assignment = require('../models/assignmentModel');
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post('/', upload.single('file'), async (req, res) => {
  const { studentName, assignmentNum, assignmentTitle, dateOfSubmission, submittedTo, assignmentText } = req.body;
  const file = req.file ? req.file.filename : null;

  try {
    const newAssignment = new Assignment({
      studentName,
      assignmentNum,
      assignmentTitle,
      dateOfSubmission,
      submittedTo,
      assignmentText,
      file,
    });

    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting assignment', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error });
  }
});

module.exports = router;
