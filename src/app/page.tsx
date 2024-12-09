'use client'
import React, { useEffect, useState } from 'react';
import { Task } from './types/type';
import { getTasks } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';


const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskCreatedOrUpdated = () => {
    fetchTasks();
    setEditingTask(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className='mainContainer'>
      <div className={`formContainer' ${tasks.length > 0 ? 'shifted' : ''}`}>
        <h1 className='formTitle'>Task Manager</h1>
        <TaskForm
          onTaskCreatedOrUpdated={handleTaskCreatedOrUpdated}
          initialTask={editingTask || undefined}
        />
      </div>
      {tasks.length > 0 && (
        <div className='listContainer'>
          <h1 className='listTitle'>List of tasks</h1>
          <TaskList
            tasks={tasks}
            onTaskDeleted={fetchTasks}
            onEditTask={(task) => setEditingTask(task)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;