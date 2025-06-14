// @ts-check
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SubtaskForm from './SubtaskForm';
import CommentForm from './CommentForm';

/**
 * @typedef {import('../types/global').Task} Task
 * @typedef {import('../types/global').Subtask} Subtask
 * @typedef {import('../types/global').Comment} Comment
 */

/**
 * @param {{
 *   task: Task,
 *   toggleTask: (id: string) => void,
 *   deleteTask: (id: string) => void,
 *   addSubtask: (taskId: string, subtask: Omit<Subtask, 'id' | 'completed'>) => void,
 *   toggleSubtask: (taskId: string, subtaskId: string) => void,
 *   addComment: (taskId: string, comment: Omit<Comment, 'id' | 'date'>) => void
 * }} props
 * @returns {React.JSX.Element}
 */
export default function TaskItem({ 
  task, 
  toggleTask, 
  deleteTask, 
  addSubtask, 
  toggleSubtask,
  addComment
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  /**
   * @param {Omit<Subtask, 'id' | 'completed'>} subtask
   */
  const handleAddSubtask = (subtask) => {
    addSubtask(task.id, subtask);
    setShowSubtaskForm(false);
  };

  /**
   * @param {Omit<Comment, 'id' | 'date'>} comment
   */
  const handleAddComment = (comment) => {
    addComment(task.id, comment);
    setShowCommentForm(false);
  };

  return (
    <li className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleTask(task.id)} 
        />
        
        <div className="task-title" onClick={() => setShowDetails(!showDetails)}>
          <h3>{task.title}</h3>
          {task.dueDate && (
            <span className="due-date">
              Due: {new Date(task.dueDate).toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="task-actions">
          <button onClick={() => setShowSubtaskForm(!showSubtaskForm)}>
            Add Subtask
          </button>
          <button onClick={() => setShowCommentForm(!showCommentForm)}>
            Add Comment
          </button>
          <button onClick={() => deleteTask(task.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
      
      {showDetails && (
        <div className="task-details">
          {task.description && <p>{task.description}</p>}
          
          {task.reminder && (
            <p className="reminder">
              Reminder set for: {new Date(task.reminder).toLocaleString()}
            </p>
          )}
          
          {task.recurrence !== 'none' && (
            <p className="recurrence">
              Repeats: {task.recurrence}
            </p>
          )}
        </div>
      )}
      
      {showSubtaskForm && (
        <SubtaskForm addSubtask={handleAddSubtask} />
      )}
      
      {task.subtasks.length > 0 && (
        <div className="subtasks">
          <h4>Subtasks:</h4>
          <ul>
            {task.subtasks.map(subtask => (
              <li key={subtask.id} className="subtask">
                <input 
                  type="checkbox" 
                  checked={subtask.completed} 
                  onChange={() => toggleSubtask(task.id, subtask.id)} 
                />
                <span>{subtask.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {showCommentForm && (
        <CommentForm addComment={handleAddComment} />
      )}
      
      {task.comments.length > 0 && (
        <div className="comments">
          <h4>Comments:</h4>
          {task.comments.map(comment => (
            <div key={comment.id} className="comment">
              <p className="comment-text">{comment.text}</p>
              <p className="comment-meta">
                {comment.author} at {new Date(comment.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
    reminder: PropTypes.string,
    recurrence: PropTypes.oneOf(['none', 'daily', 'weekly', 'monthly']),
    completed: PropTypes.bool.isRequired,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
      })
    ),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired
      })
    )
  }).isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addSubtask: PropTypes.func.isRequired,
  toggleSubtask: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
};