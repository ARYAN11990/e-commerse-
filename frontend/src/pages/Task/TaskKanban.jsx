import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight as BreadcrumbRight, Filter, MessageSquare, Calendar, MoreHorizontal, Paperclip } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import FormModal from '../../components/FormModal';
import { Input, Select } from '../../components/Form';

const TaskKanban = () => {
  const { tasks, addTask, updateTaskStatus } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortDesc, setSortDesc] = useState(false);

  const sortedTasks = sortDesc ? [...tasks].reverse() : tasks;

  const getTagColor = (color) => {
    switch(color) {
      case 'blue': return 'bg-[#EFF4FB] text-[#3C50E0] dark:bg-[#3C50E0]/10 dark:text-[#3C50E0]';
      case 'green': return 'bg-[#F0FDF4] text-[#10B981] dark:bg-[#10B981]/10 dark:text-[#10B981]';
      case 'orange': return 'bg-[#FFFBEB] text-[#F59E0B] dark:bg-[#F59E0B]/10 dark:text-[#F59E0B]';
      default: return 'bg-[#EFF4FB] text-[#3C50E0] dark:bg-[#3C50E0]/10 dark:text-[#3C50E0]';
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('taskId', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateTaskStatus(taskId, status);
    }
  };

  const KanbanCard = ({ task }) => (
    <div 
      className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark mb-4 cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        <h5 className="text-sm font-medium text-[#1C2434] dark:text-white leading-relaxed">
          {task.title}
        </h5>
        {task.assignees.length > 0 && (
          <div className="h-7 w-7 rounded-full overflow-hidden flex-shrink-0">
            <img src={task.assignees[0]} alt="User" className="h-full w-full object-cover" />
          </div>
        )}
      </div>

      {/* Mock attachment image for specific task */}
      {task.title.includes('Product Update') && (
        <div className="mb-4 h-32 w-full rounded-md overflow-hidden bg-gray dark:bg-meta-4">
          <div className="h-full w-full bg-gradient-to-r from-blue-300 to-blue-500 opacity-50"></div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{task.dueDate}</span>
          </div>
          {(task.comments > 0 || task.attachments > 0) && (
            <div className="flex items-center gap-3">
              {task.comments > 0 && (
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{task.comments}</span>
                </div>
              )}
              {task.attachments > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip className="w-4 h-4" />
                  <span>{task.attachments}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {task.category && (
          <div className="mt-1">
            <span className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${getTagColor(task.categoryColor)}`}>
              {task.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const KanbanColumn = ({ title, status, count }) => {
    const columnTasks = sortedTasks.filter(t => t.status === status);
    return (
      <div 
        className="flex min-w-[300px] flex-col"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, status)}
      >
        <div className="flex items-center justify-between mb-4 px-2">
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
        <div className="flex-1 rounded-sm min-h-[200px] transition-colors p-2 -mx-2 hover:bg-gray/50 dark:hover:bg-meta-4/20">
          {columnTasks.map(task => <KanbanCard key={task.id} task={task} />)}
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

  const todoTasks = sortedTasks.filter(t => t.status === 'todo');
  const inProgressTasks = sortedTasks.filter(t => t.status === 'in-progress');
  const completedTasks = sortedTasks.filter(t => t.status === 'completed');

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Kanban</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <BreadcrumbRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Kanban</span>
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

      {/* Kanban Grid */}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-6 pb-4">
          {(filter === 'all' || filter === 'todo') && <KanbanColumn title="To Do" status="todo" count={todoTasks.length} />}
          {(filter === 'all' || filter === 'in-progress') && <KanbanColumn title="In Progress" status="in-progress" count={inProgressTasks.length} />}
          {(filter === 'all' || filter === 'completed') && <KanbanColumn title="Completed" status="completed" count={completedTasks.length} />}
        </div>
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

export default TaskKanban;
