import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const [status, setStatus] = useState('');
  const [updateProjectStatus] = useMutation(UPDATE_PROJECT_STATUS_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateProjectStatus({
        variables: { id, status },
      });
      console.log('Project status updated:', data.updateProjectStatus);
    } catch (err) {
      console.error('Error updating project status:', err.message);
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
    </div>
  );
};

export default UpdateProjectStatus;