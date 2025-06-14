// @ts-check
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {import('../types/global').Task} Task
 */

/**
 * @param {object} props
 * @param {string[]} props.collaborators
 * @param {(email: string) => void} props.addCollaborator
 * @param {Task[]} props.tasks
 */
export default function Collaboration({ collaborators, addCollaborator, tasks }) {
  const [email, setEmail] = useState('');
  /** @type {[string|null, React.Dispatch<React.SetStateAction<string|null>>]} */
  const [sharedTaskId, setSharedTaskId] = useState(/** @type {string | null} */(null));
  const [message, setMessage] = useState('');

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleAddCollaborator = (e) => {
    e.preventDefault();
    if (email) {
      addCollaborator(email);
      setEmail('');
    }
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleShareTask = (e) => {
    e.preventDefault();
    if (sharedTaskId && message) {
      alert(`Task shared with message: ${message}`);
      setSharedTaskId(null);
      setMessage('');
    }
  };

  /**
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleTaskSelect = (e) => {
    setSharedTaskId(e.target.value || null);
  };

  return (
    <div className="collaboration">
      <section className="collaborators-section">
        <h2>Collaborators</h2>
        <form onSubmit={handleAddCollaborator}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Add collaborator by email"
            required
          />
          <button type="submit">Add</button>
        </form>
        
        <ul className="collaborators-list">
          {collaborators.map((collab, index) => (
            <li key={index}>{collab}</li>
          ))}
        </ul>
      </section>
      
      <section className="share-task-section">
        <h2>Share Task</h2>
        <form onSubmit={handleShareTask}>
          <select 
            value={sharedTaskId || ''}
            onChange={handleTaskSelect}
          >
            <option value="">Select a task to share</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
          
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Add a message"
            required
          />
          
          <button type="submit">Share Task</button>
        </form>
      </section>
    </div>
  );
}

Collaboration.propTypes = {
  collaborators: PropTypes.arrayOf(PropTypes.string).isRequired,
  addCollaborator: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};