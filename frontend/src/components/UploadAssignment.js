import React, { useState } from 'react';
import axios from 'axios';
import './UploadAssignment.css';

const UploadAssignment = () => {
  const [assignmentDetails, setAssignmentDetails] = useState({
    studentName: '',
    assignmentNum: '',
    assignmentTitle: '',
    dateOfSubmission: '',
    submittedTo: '',
    assignmentText: '',
    file: null,
  });

  const [submittedAssignments, setSubmittedAssignments] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentDetails({ ...assignmentDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setAssignmentDetails({ ...assignmentDetails, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('studentName', assignmentDetails.studentName);
    formData.append('assignmentNum', assignmentDetails.assignmentNum);
    formData.append('assignmentTitle', assignmentDetails.assignmentTitle);
    formData.append('dateOfSubmission', assignmentDetails.dateOfSubmission);
    formData.append('submittedTo', assignmentDetails.submittedTo);
    formData.append('assignmentText', assignmentDetails.assignmentText);
    if (assignmentDetails.file) {
      formData.append('file', assignmentDetails.file);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/assignments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Add the new assignment to the list
      setSubmittedAssignments([...submittedAssignments, response.data]);

      // Reset form fields
      setAssignmentDetails({
        studentName: '',
        assignmentNum: '',
        assignmentTitle: '',
        dateOfSubmission: '',
        submittedTo: '',
        assignmentText: '',
        file: null,
      });
    } catch (error) {
      console.error('Error uploading assignment:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0]; // Formats date to YYYY-MM-DD
  };

  return (
    <div className="assignment-container">
      <h1>Upload Assignment</h1>
      <form className="assignment-form" onSubmit={handleSubmit}>
        <label>Student Name:</label>
        <input type="text" name="studentName" value={assignmentDetails.studentName} onChange={handleInputChange} required />

        <label>Assignment Number:</label>
        <input type="text" name="assignmentNum" value={assignmentDetails.assignmentNum} onChange={handleInputChange} required />

        <label>Assignment Title:</label>
        <input type="text" name="assignmentTitle" value={assignmentDetails.assignmentTitle} onChange={handleInputChange} required />

        <label>Date of Submission:</label>
        <input type="date" name="dateOfSubmission" value={assignmentDetails.dateOfSubmission} onChange={handleInputChange} required />

        <label>Submitted To:</label>
        <input type="text" name="submittedTo" value={assignmentDetails.submittedTo} onChange={handleInputChange} required />

        <label>Write Assignment:</label>
        <textarea
          name="assignmentText"
          value={assignmentDetails.assignmentText}
          onChange={handleInputChange}
          placeholder="Write your assignment here."
          required
        />

        <label>Upload Assignment File (Optional):</label>
        <input type="file" name="file" onChange={handleFileChange} />

        <button type="submit">Submit Assignment</button>
      </form>

      <div className="submitted-assignments">
        <h2>Submitted Assignments</h2>
        {submittedAssignments.map((assignment, index) => (
          <div key={index} className="assignment-details">
            <p><strong>Student Name:</strong> {assignment.studentName}</p>
            <p><strong>Assignment Number:</strong> {assignment.assignmentNum}</p>
            <p><strong>Title:</strong> {assignment.assignmentTitle}</p>
            <p><strong>Date of Submission:</strong> {formatDate(assignment.dateOfSubmission)}</p>
            <p><strong>Submitted To:</strong> {assignment.submittedTo}</p>
            <p><strong>Assignment:</strong> {assignment.assignmentText}</p>
            {assignment.file && <a href={`http://localhost:5000/uploads/${assignment.file}`} download={assignment.file}>Download {assignment.file}</a>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadAssignment;
