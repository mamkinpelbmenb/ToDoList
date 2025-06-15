import React, { useState, useRef } from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/global';

interface TaskListProps {
  tasks: Task[];
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  addSubtask: (taskId: string, subtask: { title: string }) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  addComment: (taskId: string, comment: { text: string; author: string }) => void;
  reorderTasks: (fromIndex: number, toIndex: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  toggleTask, 
  deleteTask, 
  addSubtask, 
  toggleSubtask,
  addComment,
  reorderTasks
}) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  const taskRefs = useRef<Array<HTMLLIElement | null>>([]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'dueDate') {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return dateA - dateB;
    }
    return 0;
  });

  // Обработчики событий drag-and-drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
    e.currentTarget.classList.add('dragging');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (fromIndex !== toIndex) {
      reorderTasks(fromIndex, toIndex);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="task-list">
      <div className="task-controls">
        <div className="filter-controls">
          <label htmlFor="filter-select">Filter:</label>
          <select 
            id="filter-select"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter tasks"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort tasks by"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      
      {sortedTasks.length === 0 ? (
        <p className="no-tasks">No tasks found. Add a new task!</p>
      ) : (
        <ul className="task-list-container">
          {sortedTasks.map((task, index) => (
            <li 
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`task-item-wrapper ${index === draggedIndex ? 'dragging' : ''} ${index === dragOverIndex ? 'drag-over' : ''}`}
              ref={(el) => {
                taskRefs.current[index] = el;
              }}
            >
              <div className="drag-handle" aria-label="Drag to reorder">☰</div>
              <TaskItem 
                task={task} 
                toggleTask={toggleTask} 
                deleteTask={deleteTask}
                addSubtask={addSubtask}
                toggleSubtask={toggleSubtask}
                addComment={addComment}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;