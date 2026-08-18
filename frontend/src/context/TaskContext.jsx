import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Finish user onboarding',
      status: 'todo',
      category: 'Marketing',
      categoryColor: 'blue',
      dueDate: 'Tomorrow',
      comments: 1,
      attachments: 0,
      assignees: ['https://randomuser.me/api/portraits/men/32.jpg'],
      completed: false
    },
    {
      id: '2',
      title: 'Solve the Dribbble prioritisation issue with the team',
      status: 'todo',
      category: '',
      dueDate: 'Jan 8, 2027',
      comments: 2,
      attachments: 1,
      assignees: ['https://randomuser.me/api/portraits/women/44.jpg'],
      completed: true
    },
    {
      id: '3',
      title: 'Change license and remove products',
      status: 'todo',
      category: 'Marketing',
      categoryColor: 'blue',
      dueDate: 'Feb 12, 2027',
      comments: 1,
      attachments: 0,
      assignees: ['https://randomuser.me/api/portraits/women/68.jpg'],
      completed: true
    },
    {
      id: '4',
      title: 'Work In Progress (WIP) Dashboard',
      status: 'in-progress',
      category: '',
      dueDate: 'Today',
      comments: 1,
      attachments: 0,
      assignees: ['https://randomuser.me/api/portraits/women/90.jpg'],
      completed: false
    },
    {
      id: '5',
      title: 'Kanban Flow Manager',
      status: 'in-progress',
      category: 'Template',
      categoryColor: 'green',
      dueDate: 'Feb 12, 2027',
      comments: 8,
      attachments: 2,
      assignees: ['https://randomuser.me/api/portraits/men/75.jpg'],
      completed: false
    },
    {
      id: '6',
      title: 'Product Update - Q4 2024',
      status: 'in-progress',
      category: '',
      dueDate: 'Feb 12, 2027',
      comments: 8,
      attachments: 0,
      assignees: ['https://randomuser.me/api/portraits/men/22.jpg'],
      completed: false
    },
    {
      id: '7',
      title: 'Make figbot send comment when ticket is auto-moved back to inbox',
      status: 'in-progress',
      category: '',
      dueDate: 'Mar 08, 2027',
      comments: 1,
      attachments: 0,
      assignees: ['https://randomuser.me/api/portraits/women/12.jpg'],
      completed: false
    },
    {
      id: '8',
      title: 'Manage internal feedback',
      status: 'completed',
      category: '',
      dueDate: 'Tomorrow',
      comments: 1,
      attachments: 0,
      assignees: ['https://randomuser.me/api/portraits/women/29.jpg'],
      completed: false
    },
    {
      id: '9',
      title: 'Do some projects on React Native with Flutter',
      status: 'completed',
      category: 'Development',
      categoryColor: 'orange',
      dueDate: 'Jan 8, 2027',
      comments: 0,
      attachments: 0,
      assignees: ['https://randomuser.me/api/portraits/men/11.jpg'],
      completed: false
    },
    {
      id: '10',
      title: 'Design marketing assets',
      status: 'completed',
      category: 'Marketing',
      categoryColor: 'blue',
      dueDate: 'Jan 8, 2027',
      comments: 2,
      attachments: 1,
      assignees: ['https://randomuser.me/api/portraits/women/33.jpg'],
      completed: false
    },
    {
      id: '11',
      title: 'Kanban Flow Manager',
      status: 'completed',
      category: 'Template',
      categoryColor: 'green',
      dueDate: 'Feb 12, 2027',
      comments: 8,
      attachments: 0,
      assignees: ['https://randomuser.me/api/portraits/women/41.jpg'],
      completed: false
    }
  ]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      status: taskData.status || 'todo',
      category: taskData.category || '',
      categoryColor: taskData.categoryColor || 'blue',
      dueDate: taskData.dueDate || 'No Date',
      comments: 0,
      attachments: 0,
      assignees: ['https://randomuser.me/api/portraits/men/1.jpg'], // default assignee
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTaskStatus,
      toggleTaskCompletion,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};
