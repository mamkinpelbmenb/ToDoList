// @ts-check
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @param {{
 *   addSubtask: (subtask: { title: string }) => void
 * }} props
 */
export default function SubtaskForm({ addSubtask }) {
  const [title, setTitle] = useState('');

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addSubtask({ title });
      setTitle('');
    }
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="subtask-form">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Add subtask"
        aria-label="Subtask title"
      />
      <button type="submit">Add</button>
    </form>
  );
}

SubtaskForm.propTypes = {
  addSubtask: PropTypes.func.isRequired
};