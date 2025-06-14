// @ts-check
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

/**
 * @typedef {import('../types/global').Task} Task
 * @typedef {import('../types/global').Priority} Priority
 */

/**
 * @param {{
 *   tasks: Task[],
 *   toggleTask: (taskId: string) => void,
 *   deleteTask: (taskId: string) => void,
 *   addSubtask: (taskId: string, subtask: { title: string }) => void,
 *   toggleSubtask: (taskId: string, subtaskId: string) => void,
 *   addComment: (taskId: string, comment: { text: string; author: string }) => void
 * }} props
 */
export default function TaskList({ 
  tasks, 
  toggleTask, 
  deleteTask, 
  addSubtask, 
  toggleSubtask,
  addComment
}) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      /** @type {{ high: number; medium: number; low: number }} */
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

  return (
    <div className="task-list">
      <div className="task-controls">
        <div className="filter-controls">
          <label>Filter:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="sort-controls">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      
      {sortedTasks.length === 0 ? (
        <p className="no-tasks">No tasks found. Add a new task!</p>
      ) : (
        <ul>
          {sortedTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              toggleTask={toggleTask} 
              deleteTask={deleteTask}
              addSubtask={addSubtask}
              toggleSubtask={toggleSubtask}
              addComment={addComment}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      dueDate: PropTypes.string,
      priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
      completed: PropTypes.bool.isRequired,
      subtasks: PropTypes.array,
      comments: PropTypes.array
    })
  ).isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addSubtask: PropTypes.func.isRequired,
  toggleSubtask: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
};