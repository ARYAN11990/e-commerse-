import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight as BreadcrumbRight, Filter, MessageSquare, Calendar, MoreHorizontal, Menu } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import FormModal from '../../components/FormModal';
import { Input, Select } from '../../components/Form';

const TaskList = () => {
  const { tasks, toggleTaskCompletion, addTask } = useTasks();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [sortDesc, setSortDesc] = useState(false);

  const sortedTasks = sortDesc ? [...tasks].reverse() : tasks;
  
  const todoTasks = sortedTasks.filter(t => t.status === 'todo');
  const inProgressTasks = sortedTasks.filter(t => t.status === 'in-progress');
  const completedTasks = sortedTasks.filter(t => t.status === 'completed');

  const getTagColor = (color) => {
    switch(color) {
      case 'blue': return 'bg-[#EFF4FB] text-[#3C50E0] dark:bg-[#3C50E0]/10 dark:text-[#3C50E0]';
      case 'green': return 'bg-[#F0FDF4] text-[#10B981] dark:bg-[#10B981]/10 dark:text-[#10B981]';
      case 'orange': return 'bg-[#FFFBEB] text-[#F59E0B] dark:bg-[#F59E0B]/10 dark:text-[#F59E0B]';
      default: return 'bg-[#EFF4FB] text-[#3C50E0] dark:bg-[#3C50E0]/10 dark:text-[#3C50E0]';
    }
  };

  const TaskRow = ({ task }) => (
    <div className="flex items-center justify-between rounded-sm border border-stroke bg-white p-4 sm:p-5 dark:border-strokedark dark:bg-boxdark mb-4 last:mb-0 transition hover:shadow-1">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button className="text-[#64748B] hover:text-[#1C2434] dark:hover:text-white cursor-grab">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 w-full">
          <label className="relative flex-shrink-0 cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <div className={`flex h-5 w-5 items-center justify-center rounded border ${task.completed ? 'border-[#3C50E0] bg-[#3C50E0]' : 'border-stroke dark:border-strokedark bg-transparent'}`}>
              <span className={`opacity-0 ${task.completed ? '!opacity-100' : ''}`}>
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z" fill="white" stroke="white" strokeWidth="0.4"></path>
                </svg>
              </span>
            </div>
          </label>
          <span className={`text-sm font-medium truncate ${task.completed ? 'text-[#64748B] line-through' : 'text-[#1C2434] dark:text-white'}`}>
            {task.title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 ml-4 hidden sm:flex">
        {task.category && (
          <span className={`rounded-md px-2 py-1 text-xs font-medium ${getTagColor(task.categoryColor)}`}>
            {task.category}
          </span>
        )}
        <div className="flex items-center gap-1.5 text-sm text-[#64748B] dark:text-[#8A99AF]">
          <Calendar className="w-4 h-4" />
          <span>{task.dueDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-[#64748B] dark:text-[#8A99AF]">
          <MessageSquare className="w-4 h-4" />
          <span>{task.comments}</span>
        </div>
        <div className="flex items-center">
          {task.assignees.map((avatar, idx) => (
            <div key={idx} className="h-8 w-8 rounded-full border-2 border-white dark:border-boxdark overflow-hidden -ml-2 first:ml-0">
              <img src={avatar} alt="User" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TaskGroup = ({ title, count, groupTasks }) => {
    if (groupTasks.length === 0) return null;
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold text-[#1C2434] dark:text-white">{title}</h4>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stroke text-sm font-medium text-[#1C2434] dark:bg-strokedark dark:text-white">
              {count}
            </span>
          </div>
          <button className="text-[#64748B] hover:text-[#1C2434] dark:hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <div>
          {groupTasks.map(task => <TaskRow key={task.id} task={task} />)}
        </div>
      </div>
    );
  };

  const handleAddTask = (values) => {
    addTask({
      title: values.title,
      status: values.status,
      category: values.category,
      categoryColor: 'blue',
      dueDate: values.dueDate
    });
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Task List</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <BreadcrumbRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Task List</span>
        </div>
      </div>

      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 sm:p-5 rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mb-6 gap-4">
        
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <button 
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${filter === 'all' ? 'bg-[#EDF2F9] text-[#1C2434] dark:bg-meta-4 dark:text-white' : 'text-[#64748B] hover:text-[#1C2434] dark:text-[#8A99AF] dark:hover:text-white'}`}
          >
            All Tasks <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3C50E0] text-[10px] text-white">{tasks.length}</span>
          </button>
          <button 
            onClick={() => setFilter('todo')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${filter === 'todo' ? 'bg-[#EDF2F9] text-[#1C2434] dark:bg-meta-4 dark:text-white' : 'text-[#64748B] hover:text-[#1C2434] dark:text-[#8A99AF] dark:hover:text-white'}`}
          >
            To do <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stroke text-[10px] text-[#1C2434] dark:bg-strokedark dark:text-white">{todoTasks.length}</span>
          </button>
          <button 
            onClick={() => setFilter('in-progress')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${filter === 'in-progress' ? 'bg-[#EDF2F9] text-[#1C2434] dark:bg-meta-4 dark:text-white' : 'text-[#64748B] hover:text-[#1C2434] dark:text-[#8A99AF] dark:hover:text-white'}`}
          >
            In Progress <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stroke text-[10px] text-[#1C2434] dark:bg-strokedark dark:text-white">{inProgressTasks.length}</span>
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${filter === 'completed' ? 'bg-[#EDF2F9] text-[#1C2434] dark:bg-meta-4 dark:text-white' : 'text-[#64748B] hover:text-[#1C2434] dark:text-[#8A99AF] dark:hover:text-white'}`}
          >
            Completed <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stroke text-[10px] text-[#1C2434] dark:bg-strokedark dark:text-white">{completedTasks.length}</span>
          </button>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <button 
            onClick={() => setSortDesc(!sortDesc)}
            className={`flex items-center gap-2 rounded-md border py-2 px-4 text-sm font-medium transition ${sortDesc ? 'border-[#3C50E0] text-[#3C50E0] bg-[#EFF4FB] dark:bg-meta-4' : 'border-stroke text-[#1C2434] hover:bg-gray dark:border-strokedark dark:text-white dark:hover:bg-meta-4'}`}
          >
            <Filter className="w-4 h-4" /> Filter & Short
          </button>
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center rounded-md bg-[#3C50E0] py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90 transition whitespace-nowrap"
          >
            Add New Task +
          </button>
        </div>

      </div>

      {/* Task Groups */}
      <div className="flex flex-col">
        {(filter === 'all' || filter === 'todo') && (
          <TaskGroup title="To Do" count={todoTasks.length} groupTasks={todoTasks} />
        )}
        {(filter === 'all' || filter === 'in-progress') && (
          <TaskGroup title="In Progress" count={inProgressTasks.length} groupTasks={inProgressTasks} />
        )}
        {(filter === 'all' || filter === 'completed') && (
          <TaskGroup title="Completed" count={completedTasks.length} groupTasks={completedTasks} />
        )}
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Task"
        initialValues={{ title: '', status: 'todo', category: '', dueDate: '' }}
        validationRules={{
          title: { required: 'Task title is required' }
        }}
        onSubmit={handleAddTask}
        submitText="Add Task"
      >
        <div className="flex flex-col gap-4">
          <Input name="title" label="Task Title" placeholder="Enter task title" />
          <div className="grid grid-cols-2 gap-4">
            <Select name="status" label="Status" options={[
              { value: 'todo', label: 'To Do' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' }
            ]} />
            <Input name="category" label="Category (optional)" placeholder="e.g. Marketing" />
          </div>
          <Input name="dueDate" label="Due Date" type="text" placeholder="e.g. Tomorrow or Jan 8, 2027" />
        </div>
      </FormModal>
    </>
  );
};

export default TaskList;
