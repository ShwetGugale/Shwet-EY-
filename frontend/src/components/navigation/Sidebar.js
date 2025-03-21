import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${userId}/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error('Failed to fetch projects:', err));
  }, [userId]);

  return (
    <div className="w-64 bg-white shadow-md">
      <h2 className="text-lg font-semibold p-4">Your Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="p-2 hover:bg-gray-200">
            <Link to={`/dashboard/${userId}/project/${project.id}`}>
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
