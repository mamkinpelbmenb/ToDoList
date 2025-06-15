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
        <h2>Collaborators</h2>
        <form onSubmit={handleAddCollaborator}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Add collaborator by email"
            aria-label="Collaborator email address"
            required
          />
          <button type="submit">Add</button>
          {error && <div className="error">{error}</div>}
        </form>
        
        {collaborators.length > 0 ? (
          <ul className="collaborators-list">
            {collaborators.map((collab, index) => (
              <li key={index}>{collab}</li>
            ))}
          </ul>
        ) : (
          <p className="no-collaborators">No collaborators added yet</p>
        )}
      </section>
      
      <section className="share-task-section">
        <h2>Share Task</h2>
        <form onSubmit={handleShareTask}>
          <label htmlFor="task-select" className="sr-only">Select task to share</label>
          <select 
            id="task-select"
            value={sharedTaskId || ''}
            onChange={handleTaskSelect}
            aria-label="Select a task to share"
            required
          >
            <option value="">Select a task to share</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
          
          <label htmlFor="share-message" className="sr-only">Add a message</label>
          <textarea 
            id="share-message"
            value={message} 
            onChange={handleMessageChange} 
            placeholder="Add a message"
            aria-label="Share message"
            required
          />
          
          <button type="submit">Share Task</button>
        </form>
      </section>
    </div>
  );
};

export default Collaboration;