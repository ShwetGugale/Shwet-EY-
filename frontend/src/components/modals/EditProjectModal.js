import React, { useState, useEffect, Fragment, memo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import BtnPrimary from '../projects/BtnPrimary';
import BtnSecondary from '../projects/BtnSecondary';
import api from '../api';
import toast from 'react-hot-toast';

const EditProjectModal = ({ isModalOpen, closeModal, projectId }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        if (projectId && isModalOpen) {
            api.get(`/project/${projectId}`)
                .then((res) => {
                    setTitle(res.data.title);
                    setDesc(res.data.description);
                })
                .catch(() => {
                    toast.error('Failed to fetch project details');
                });
        }
    }, [isModalOpen, projectId]);

    const handleUpdate = (e) => {
        e.preventDefault();
        api.put(`/project/${projectId}`, { title, description: desc })
            .then(() => {
                toast.success('Project updated successfully');
                closeModal();
                const customEvent = new CustomEvent('projectUpdate');
                document.dispatchEvent(customEvent);
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || 'Update failed');
            });
    };

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog as='div' open={isModalOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="rounded-md bg-white w-6/12">
                            <Dialog.Title className="bg-white shadow px-6 py-4 rounded-t-md">
                                <h1>Edit Project</h1>
                            </Dialog.Title>
                            <form onSubmit={handleUpdate} className="gap-4 px-8 py-4">
                                <div className='mb-3'>
                                    <label htmlFor="title" className='block text-gray-600'>Title</label>
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        className='border border-gray-300 rounded-md w-full text-sm py-2 px-2.5'
                                        placeholder='Project title'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="description" className='block text-gray-600'>Description</label>
                                    <textarea
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        className='border border-gray-300 rounded-md w-full text-sm py-2 px-2.5'
                                        rows="6"
                                        placeholder='Project description'
                                    />
                                </div>
                                <div className='flex justify-end space-x-2'>
                                    <BtnSecondary onClick={closeModal}>Cancel</BtnSecondary>
                                    <BtnPrimary type="submit">Update</BtnPrimary>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default memo(EditProjectModal);
