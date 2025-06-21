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
      <div className="auth-header">
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        <div className="auth-icon">
          <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'}`}></i>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form-content">
        <div className="form-group">
          <div className="input-with-icon">
            <i className="fas fa-user"></i>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Логин*"
              required
              className={errors.username ? 'error-input' : ''}
            />
          </div>
          {errors.username && <div className="error-message">{errors.username}</div>}
        </div>
        
        <div className="form-group">
          <div className="input-with-icon">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль*"
              required
              className={errors.password ? 'error-input' : ''}
            />
          </div>
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        {!isLogin && (
          <>
            <div className="form-group">
              <div className="input-with-icon">
                <i className="fas fa-id-card"></i>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ФИО"
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Почта"
                  className={errors.email ? 'error-input' : ''}
                />
              </div>
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <div className="input-with-icon">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Номер телефона"
                  className={errors.phone ? 'error-input' : ''}
                />
              </div>
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
          </>
        )}
        
        <div className="form-actions">
          <button type="submit" className="auth-btn primary-btn">
            <span className="button-content">
              <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'}`}></i>
              <span className="button-text">{isLogin ? 'Войти' : 'Зарегистрироваться'}</span>
            </span>
          </button>
          
          <button 
            type="button" 
            className="toggle-btn secondary-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            <span className="button-content">
              <i className={`fas ${isLogin ? 'fa-user-plus' : 'fa-sign-in-alt'}`}></i>
              <span className="button-text">
                {isLogin ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Войти'}
              </span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;