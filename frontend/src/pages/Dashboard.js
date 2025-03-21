import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';
import Task from '../components/projects/Task';
import axios from 'axios';

function Dashboard() {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/users/${userId}/projects`)
        .then((res) => {
          setProjects(res.data);
        })
        .catch((error) => {
          console.error('Error fetching user projects:', error);
        });
    }
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Task key={project.id} projectId={project.id} />
            ))
          ) : (
            <div>No projects found. Create a new project to get started!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
