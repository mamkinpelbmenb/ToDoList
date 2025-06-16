import React, { useState } from 'react';
import { Task } from '../types/global';

interface CollaborationProps {
  collaborators: string[];
  addCollaborator: (email: string) => void;
  tasks: Task[];
}

const Collaboration: React.FC<CollaborationProps> = ({ 
  collaborators, 
  addCollaborator, 
  tasks 
}) => {
  const [email, setEmail] = useState('');
  const [sharedTaskId, setSharedTaskId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddCollaborator = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Валидация email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    addCollaborator(email);
    setEmail('');
    setError('');
  };

  const handleShareTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!sharedTaskId) {
      setError('Please select a task to share');
      return;
    }
    
    if (!message.trim()) {
      setError('Please add a message');
      return;
    }
    
    alert(`Task shared with message: ${message}`);
    setSharedTaskId(null);
    setMessage('');
    setError('');
  };

  const handleTaskSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSharedTaskId(e.target.value || null);
    if (error) setError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="collaboration">
      <section className="collaborators-section">
        <h2>Участники</h2>
        <form onSubmit={handleAddCollaborator}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Добавь участника(почта)"
            aria-label="Collaborator email address"
            required
          />
          <button type="submit">Добавить</button>
          {error && <div className="error">{error}</div>}
        </form>
        
        {collaborators.length > 0 ? (
          <ul className="collaborators-list">
            {collaborators.map((collab, index) => (
              <li key={index}>{collab}</li>
            ))}
          </ul>
        ) : (
          <p className="no-collaborators">Пока не добавлено ни одного автора</p>
        )}
      </section>
      
      <section className="share-task-section">
        <h2>Поделиться задачей</h2>
        <form onSubmit={handleShareTask}>
          <label htmlFor="task-select" className="sr-only">Выбери задачу</label>
          <select 
            id="task-select"
            value={sharedTaskId || ''}
            onChange={handleTaskSelect}
            aria-label="Select a task to share"
            required
          >
            <option value="">Выбери задачу</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
          
          <label htmlFor="share-message" className="sr-only">Добавить сообщение</label>
          <textarea 
            id="share-message"
            value={message} 
            onChange={handleMessageChange} 
            placeholder="Добавь сообщение"
            aria-label="Share message"
            required
          />
          
          <button type="submit">Поделиться</button>
        </form>
      </section>
    </div>
  );
};

export default Collaboration;