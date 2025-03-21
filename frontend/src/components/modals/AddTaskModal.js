import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import BtnPrimary from '../shared/BtnPrimary';
import BtnSecondary from '../shared/BtnSecondary';
import api from '../api';
import toast from 'react-hot-toast';

const AddTaskModal = ({ isAddTaskModalOpen, setAddTaskModal, projectId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) {
      toast.error('Project ID is missing');
      return;
    }

    if (!title || !description) {
      toast.error('Title and description are required');
      return;
    }

    try {
      const response = await api.post(`/projects/${projectId}/tasks`, {
        title,
        description,
        stage: 'To do',
      });

      toast.success('Task created successfully');
      const customEvent = new CustomEvent('taskUpdate', { detail: { ...response.data } });
      document.dispatchEvent(customEvent);
      setTitle('');
      setDescription('');
      setAddTaskModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      console.error('Error creating task:', error.response?.data);
    }
  };

  return (
    <Transition appear show={isAddTaskModalOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setAddTaskModal(false)}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-bold">Add Task</Dialog.Title>
              <button onClick={() => setAddTaskModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <BtnSecondary onClick={() => setAddTaskModal(false)}>Cancel</BtnSecondary>
                <BtnPrimary type="submit">Add Task</BtnPrimary>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTaskModal;
