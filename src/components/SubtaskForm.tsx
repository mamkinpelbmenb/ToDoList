import React, { useState } from 'react';

interface SubtaskFormProps {
  addSubtask: (subtask: { title: string }) => void;
}

const SubtaskForm: React.FC<SubtaskFormProps> = ({ addSubtask }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Subtask title cannot be empty');
      return;
    }
    
    addSubtask({ title });
    setTitle('');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="subtask-form">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Add subtask"
        aria-label="Subtask title"
        required
      />
      <button type="submit">Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SubtaskForm;