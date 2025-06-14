// @ts-check
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @param {{
 *   addComment: (comment: { text: string; author: string }) => void
 * }} props
 */
export default function CommentForm({ addComment }) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && author.trim()) {
      addComment({ text, author });
      setText('');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        aria-label="Comment author"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your comment"
        aria-label="Comment text"
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};