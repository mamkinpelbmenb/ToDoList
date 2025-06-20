import React, { useState } from 'react';
import { Priority, Recurrence } from '../types/global';

interface TaskFormProps {
  addTask: (task: { 
    title: string; 
    description: string; 
    dueDate: string; 
    priority: Priority; 
    reminder: string; 
    recurrence: Recurrence;
  }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as Priority,
    reminder: '',
    recurrence: 'none' as Recurrence
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (form.dueDate && new Date(form.dueDate) < new Date()) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }
    if (form.reminder && new Date(form.reminder) < new Date()) {
      newErrors.reminder = 'Reminder cannot be in the past';
    }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    addTask(form);
    setForm({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      reminder: '',
      recurrence: 'none'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="task-title">Название*</label>
        <input
          id="task-title"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title"
          aria-label="Task title"
          required
        />
        {errors.title && <div className="error">{errors.title}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="task-description">Описание</label>
        <textarea
          id="task-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your task"
          aria-label="Task description"
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-due-date">Срок погашения</label>
          <input
            id="task-due-date"
            type="datetime-local"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            aria-label="Task due date"
          />
          {errors.dueDate && <div className="error">{errors.dueDate}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="task-priority">Приоритет</label>
          <select
            id="task-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            aria-label="Task priority"
          >
            <option value="high">Высокая</option>
            <option value="medium">Средняя</option>
            <option value="low">Низкая</option>
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-reminder">Напоминание</label>
          <input
            id="task-reminder"
            type="datetime-local"
            name="reminder"
            value={form.reminder}
            onChange={handleChange}
            aria-label="Task reminder"
          />
          {errors.reminder && <div className="error">{errors.reminder}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="task-recurrence">Повторение</label>
          <select
            id="task-recurrence"
            name="recurrence"
            value={form.recurrence}
            onChange={handleChange}
            aria-label="Task recurrence"
          >
            <option value="none">нет</option>
            <option value="daily">Ежедневный</option>
            <option value="weekly">Еженедельно</option>
            <option value="monthly">Ежемесячно</option>
          </select>
        </div>
      </div>
      
      <button type="submit" className="add-task-btn">Добавить задачу</button>
    </form>
  );
};

export default TaskForm;