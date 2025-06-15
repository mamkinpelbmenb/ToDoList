import React, { useState } from 'react';
import { AuthFormFields } from './AuthFormFields';
import { RegistrationFormFields } from './RegistrationFormFields';

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Invalid email format';
      }
      
      if (phone && !/^\d{10}$/.test(phone)) {
        newErrors.phone = 'Phone must be 10 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    if (isLogin) {
      onLogin({ username, password });
    } else {
      onRegister({ username, password, fullName, email, phone });
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <AuthFormFields 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        
        {errors.username && <div className="error">{errors.username}</div>}
        {errors.password && <div className="error">{errors.password}</div>}
        
        {!isLogin && (
          <>
            <RegistrationFormFields 
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
            />
            
            {errors.email && <div className="error">{errors.email}</div>}
            {errors.phone && <div className="error">{errors.phone}</div>}
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