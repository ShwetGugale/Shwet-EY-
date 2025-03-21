import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
import AddTaskModal from '../modals/AddTaskModal';
import TaskModal from '../modals/TaskModal';
import api from '../api';
import toast from 'react-hot-toast';
import ProjectDropdown from '../navigation/ProjectDropdown';
import BtnPrimary from '../shared/BtnPrimary';
import DropdownMenu from '../navigation/DropdownMenu';

function Task() {
  const [isAddTaskModalOpen, setAddTaskModal] = useState(false);
  const [columns, setColumns] = useState({});
  const [isRenderChange, setRenderChange] = useState(false);
  const [isTaskOpen, setTaskOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams(); // Extract projectId from the URL
  const navigate = useNavigate();

  // Fetch tasks when the component mounts or when projectId changes
  useEffect(() => {
    if (!projectId) {
      toast.error('Project ID is missing');
      return;
    }

    if (!isAddTaskModalOpen || isRenderChange) {
      setIsLoading(true);
      api.get(`/projects/${projectId}`) // Include projectId in the API request
        .then((res) => {
          setTitle(res.data.title);
          setColumns({
            [uuid()]: {
              name: "Requested",
              items: res.data.tasks.filter((task) => task.stage === "Requested").sort((a, b) => a.order - b.order)
            },
            [uuid()]: {
              name: "To do",
              items: res.data.tasks.filter((task) => task.stage === "To do").sort((a, b) => a.order - b.order)
            },
            [uuid()]: {
              name: "In Progress",
              items: res.data.tasks.filter((task) => task.stage === "In Progress").sort((a, b) => a.order - b.order)
            },
            [uuid()]: {
              name: "Done",
              items: res.data.tasks.filter((task) => task.stage === "Done").sort((a, b) => a.order - b.order)
            }
          });
          setRenderChange(false);
        })
        .catch((error) => {
          toast.error('Failed to fetch tasks. Please try again.');
          console.error('Error fetching tasks:', error.response?.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [projectId, isAddTaskModalOpen, isRenderChange]);

  // Update task order when dragging and dropping
  const updateTodo = (data) => {
    api.put(`/projects/${projectId}/todo`, data) // Include projectId in the API request
      .then((res) => {
        toast.success('Task order updated successfully');
      })
      .catch((error) => {
        toast.error('Failed to update task order. Please try again.');
        console.error('Error updating task order:', error.response?.data);
      });
  };

  // Handle task deletion
  const handleDelete = (e, taskId) => {
    e.stopPropagation();
    api.delete(`/projects/${projectId}/tasks/${taskId}`) // Include projectId in the API request
      .then((res) => {
        toast.success('Task deleted successfully');
        setRenderChange(true);
      })
      .catch((error) => {
        toast.error('Failed to delete task. Please try again.');
        console.error('Error deleting task:', error.response?.data);
      });
  };

  // Open task details modal
  const handleTaskDetails = (id) => {
    setTaskId(id);
    setTaskOpen(true);
  };

  // Handle drag-and-drop events
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const updatedColumns = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      };

      setColumns(updatedColumns);
      updateTodo(updatedColumns);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      const updatedColumns = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      };

      setColumns(updatedColumns);
      updateTodo(updatedColumns);
    }
  };

  return (
    <div className='px-12 py-6 w-full'>
      <div className="flex items-center justify-between mb-6">
        <h1 className='text-xl text-gray-800 flex justify-start items-center space-x-2.5'>
          <span>{title.slice(0, 25)}{title.length > 25 && '...'}</span>
          <ProjectDropdown id={projectId} navigate={navigate} />
        </h1>
        <BtnPrimary onClick={() => setAddTaskModal(true)}>Add todo</BtnPrimary>
      </div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        <div className="flex gap-5">
          {Object.entries(columns).map(([columnId, column], index) => (
            <div className="w-3/12 h-[580px]" key={columnId}>
              <div className="pb-2.5 w-full flex justify-between">
                <div className="inline-flex items-center space-x-2">
                  <h2 className="text-[#1e293b] font-medium text-sm uppercase leading-3">{column.name}</h2>
                  <span className={`h-5 inline-flex items-center justify-center px-2 mb-[2px] leading-none rounded-full text-xs font-semibold text-gray-500 border border-gray-300 ${column.items.length < 1 && 'invisible'}`}>{column.items?.length}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width={15} className="text-[#9ba8bc]" viewBox="0 0 448 512"><path d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z" /></svg>
              </div>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`min-h-[530px] pt-4 duration-75 transition-colors border-t-2 border-indigo-400 ${snapshot.isDraggingOver && 'border-indigo-600'}`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                            onClick={() => handleTaskDetails(item._id)}
                            className={`select-none px-3.5 pt-3.5 pb-2.5 mb-2 border border-gray-200 rounded-lg shadow-sm bg-white relative ${snapshot.isDragging && 'shadow-md'}`}
                          >
                            <div className="pb-2">
                              <div className="flex item-center justify-between">
                                <h3 className="text-[#1e293b] font-medium text-sm capitalize">{item.title.slice(0, 22)}{item.title.length > 22 && '...'}</h3>
                                <DropdownMenu taskId={item._id} handleDelete={handleDelete} projectId={projectId} setRenderChange={setRenderChange} />
                              </div>
                              <p className="text-xs text-slate-500 leading-4 -tracking-tight">{item.description.slice(0, 60)}{item.description.length > 60 && '...'}</p>
                              <span className="py-1 px-2.5 bg-indigo-100 text-indigo-600 rounded-md text-xs font-medium mt-1 inline-block">Task-{item.index}</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      <AddTaskModal isAddTaskModalOpen={isAddTaskModalOpen} setAddTaskModal={setAddTaskModal} projectId={projectId} />
      <TaskModal isOpen={isTaskOpen} setIsOpen={setTaskOpen} id={taskId} />
    </div>
  );
}

export default Task;