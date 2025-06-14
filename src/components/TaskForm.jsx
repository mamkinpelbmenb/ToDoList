// @ts-check
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {import('../types/global').Priority} Priority
 * @typedef {import('../types/global').Recurrence} Recurrence
 */

/**
 * @typedef {{
 *   title: string;
 *   description: string;
 *   dueDate: string;
 *   priority: Priority;
 *   reminder: string;
 *   recurrence: Recurrence;
 * }} TaskFormState
 */

const initialFormState = /** @type {TaskFormState} */ ({
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  reminder: '',
  recurrence: 'none'
});

/**
 * @param {{
 *   addTask: (task: Omit<TaskFormState, 'id' | 'completed' | 'subtasks' | 'comments'>) => void
 * }} props
 */
export default function TaskForm({ addTask }) {
  const [form, setForm] = useState(initialFormState);

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    
    addTask({
      title: form.title,
      description: form.description,
      dueDate: form.dueDate,
      priority: form.priority,
      reminder: form.reminder,
      recurrence: form.recurrence
    });

    setForm(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label>Title*</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Reminder</label>
          <input
            type="datetime-local"
            name="reminder"
            value={form.reminder}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Recurrence</label>
          <select
            name="recurrence"
            value={form.recurrence}
            onChange={handleChange}
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      
      <button type="submit" className="add-task-btn">Add Task</button>
    </form>
  );
}

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired
};