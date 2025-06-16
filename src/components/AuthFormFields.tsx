import React from 'react';

interface AuthFormFieldsProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

export const AuthFormFields: React.FC<AuthFormFieldsProps> = ({
  username,
  setUsername,
  password,
  setPassword
}) => (
  <>
    <div className="form-group">
      <label htmlFor="auth-username">Логин*</label>
      <input
        id="auth-username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        aria-label="Username"
        required
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="auth-password">Пароль*</label>
      <input
        id="auth-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        aria-label="Password"
        required
      />
    </div>
  </>
);