import React, { useState } from 'react';

interface AuthFormProps {
  onLogin: (user: { username: string; password: string }) => void;
  onRegister: (user: { 
    username: string; 
    password: string; 
    fullName?: string; 
    email?: string; 
    phone?: string 
  }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      onLogin({ username, password });
    } else {
      onRegister({ username, password, fullName, email, phone });
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="auth-username">Ник*</label>
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
        
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="auth-fullname">ФИО</label>
              <input
                id="auth-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                aria-label="Full Name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="auth-email">Email</label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email Address"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="auth-phone">Телефон</label>
              <input
                id="auth-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                aria-label="Phone Number"
              />
            </div>
          </>
        )}
        
        <button 
          type="submit" 
          className="auth-btn"
          aria-label={isLogin ? "Login to your account" : "Register new account"}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        
        <button 
          type="button" 
          className="toggle-btn"
          onClick={() => setIsLogin(!isLogin)}
          aria-label={isLogin ? "Switch to registration form" : "Switch to login form"}
        >
          {isLogin 
            ? 'Need an account? Register' 
            : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;