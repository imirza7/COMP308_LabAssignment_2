import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useMutation, gql } from '@apollo/client';

const UPDATE_PROJECT_STATUS_MUTATION = gql`
  mutation UpdateProjectStatus($id: ID!, $status: String!) {
    updateProjectStatus(id: $id, status: $status) {
      id
      projectName
      status
    }
  }
`;

const UpdateProjectStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [status, setStatus] = useState('');
  const [updateProjectStatus] = useMutation(UPDATE_PROJECT_STATUS_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateProjectStatus({
        variables: { id, status },
      });
      console.log('Project status updated:', data.updateProjectStatus);
      alert('Project status updated successfully!');
    } catch (err) {
      console.error('Error updating project status:', err.message);
      alert('Failed to update project status.');
    }
  };

  return (
    <div>
      <h1>Update Project Status</h1>
      <form onSubmit={handleSubmit}>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Update Status</button>
      </form>

      {/* Return Button */}
      <button onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
    </div>
  );
};

export default UpdateProjectStatus;