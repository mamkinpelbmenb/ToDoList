import React, { useState } from 'react';
import SubtaskForm from './SubtaskForm';
import CommentForm from './CommentForm';
import { Task, Subtask, Comment, Priority, Recurrence } from '../types/global';

interface TaskItemProps {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addSubtask: (taskId: string, subtask: Omit<Subtask, 'id' | 'completed'>) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  addComment: (taskId: string, comment: Omit<Comment, 'id' | 'date'>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  toggleTask, 
  deleteTask, 
  addSubtask, 
  toggleSubtask,
  addComment
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleAddSubtask = (subtask: Omit<Subtask, 'id' | 'completed'>) => {
    addSubtask(task.id, subtask);
    setShowSubtaskForm(false);
  };

  const handleAddComment = (comment: Omit<Comment, 'id' | 'date'>) => {
    addComment(task.id, comment);
    setShowCommentForm(false);
  };

  return (
    <li className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="checkbox-container">
          <input 
            id={`task-${task.id}`}
            type="checkbox" 
            checked={task.completed} 
            onChange={() => toggleTask(task.id)} 
          />
          <label htmlFor={`task-${task.id}`} className="visually-hidden">
            Переключить задачи на
          </label>
        </div>
        
        <div className="task-title" onClick={() => setShowDetails(!showDetails)}>
          <h3>{task.title}</h3>
          {task.dueDate && (
            <span className="due-date">
              Соответствующий: {new Date(task.dueDate).toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="task-actions">
          <button onClick={() => setShowSubtaskForm(!showSubtaskForm)}>
            Добавить подзадачу
          </button>
          <button onClick={() => setShowCommentForm(!showCommentForm)}>
            Добавить коментарий
          </button>
          <button onClick={() => deleteTask(task.id)} className="delete-btn">
            Удалить
          </button>
        </div>
      </div>
      
      {showDetails && (
        <div className="task-details">
          {task.description && <p>{task.description}</p>}
          
          {task.reminder && (
            <p className="reminder">
              Установить напоминание: {new Date(task.reminder).toLocaleString()}
            </p>
          )}
          
          {task.recurrence !== 'none' && (
            <p className="recurrence">
              Повторяется: {task.recurrence}
            </p>
          )}
        </div>
      )}
      
      {showSubtaskForm && (
        <SubtaskForm addSubtask={handleAddSubtask} />
      )}
      
      {task.subtasks.length > 0 && (
        <div className="subtasks">
          <h4>Подзадачи:</h4>
          <ul>
            {task.subtasks.map(subtask => (
              <li key={subtask.id} className="subtask">
                <div className="checkbox-container">
                  <input 
                    id={`subtask-${subtask.id}`}
                    type="checkbox" 
                    checked={subtask.completed} 
                    onChange={() => toggleSubtask(task.id, subtask.id)} 
                  />
                  <label htmlFor={`subtask-${subtask.id}`} className="visually-hidden">
                    Переключение на выполнение подзадачи
                  </label>
                </div>
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
          <h4>Коментарии:</h4>
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
};

export default TaskItem;