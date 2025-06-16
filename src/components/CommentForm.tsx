import React, { useState } from 'react';

interface CommentFormProps {
  addComment: (comment: { text: string; author: string }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ addComment }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState<{text?: string; author?: string}>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors: {text?: string; author?: string} = {};
    if (!text.trim()) newErrors.text = 'Требуется текст комментария';
    if (!author.trim()) newErrors.author = 'Требуется имя автора';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    addComment({ text, author });
    setText('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={author}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
        placeholder="Ваше имя"
        aria-label="Коммент автора"
      />
      {errors.author && <div className="error">{errors.author}</div>}
      
      <textarea
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        placeholder="Ваш коммент"
        aria-label="Текст комента"
      />
      {errors.text && <div className="error">{errors.text}</div>}
      
      <button type="submit">Добавить коммент</button>
    </form>
  );
};

export default CommentForm;