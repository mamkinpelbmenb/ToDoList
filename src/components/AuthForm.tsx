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
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2> {/* Более короткий текст */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Логин*"
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль*"
            required
          />
        </div>
        
        {!isLogin && (
          <>
            <div className="form-group">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ФИО"
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Почта"
              />
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Номер"
              />
            </div>
          </>
        )}
        
        <button type="submit" className="auth-btn">
          {isLogin ? 'Войти' : 'Зарегистрироваться'} {/* Более короткий текст */}
        </button>
        
        <button 
          type="button" 
          className="toggle-btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin 
            ? 'Нет аккаунта? Регистрация' 
            : 'Уже есть аккаунт? Войти'} {/* Более короткий текст */}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;