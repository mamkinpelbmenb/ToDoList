import React, { useState, useEffect, useLayoutEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ThemeSelector from './components/ThemeSelector';
import ThemeCustomizer from './components/ThemeCustomizer';
import Collaboration from './components/Collaboration';
import AuthForm from './components/AuthForm';
import UserProfile from './components/UserProfile';
import './styles/App.css';
import { Task, Theme, Subtask, Comment, User, CustomTheme } from './types/global';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [activeTab, setActiveTab] = useState<'tasks' | 'collaboration' | 'profile' | 'customize'>('tasks');
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [isAuthFormVisible, setIsAuthFormVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    // Загрузка сохраненных данных из localStorage
    const savedTheme = localStorage.getItem('theme') as Theme || 'light';
    const savedUser = JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null;
    const savedCollaborators = JSON.parse(localStorage.getItem('collaborators') || '[]') as string[];
    
    // Загрузка кастомной темы
    const customTheme = localStorage.getItem('customTheme');
    if (customTheme) {
      const themeData: CustomTheme = JSON.parse(customTheme);
      const root = document.documentElement;
      root.style.setProperty('--primary-color', themeData.primary);
      root.style.setProperty('--secondary-color', themeData.secondary);
      root.style.setProperty('--background-color', themeData.bg);
      root.style.setProperty('--surface-color', themeData.surface);
      root.style.setProperty('--text-color', themeData.text);
    }
    
    setTheme(savedTheme);
    setCollaborators(savedCollaborators);
    
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsAuthFormVisible(false);
    }
    
    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
    // Сохранение данных в localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('collaborators', JSON.stringify(collaborators));
    
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(currentUser.tasks));
    }
  }, [theme, collaborators, currentUser]);

  const handleLogin = (credentials: { username: string; password: string }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const user = users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (user) {
      const savedTasks = JSON.parse(localStorage.getItem(`tasks_${user.id}`) || '[]') as Task[];
      const userWithTasks = { ...user, tasks: savedTasks };
      
      setCurrentUser(userWithTasks);
      setIsAuthFormVisible(false);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleRegister = (userData: { 
    username: string; 
    password: string; 
    fullName?: string; 
    email?: string; 
    phone?: string
  }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    
    if (users.some(u => u.username === userData.username)) {
      alert('Username already exists');
      return;
    }
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      tasks: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    setCurrentUser(newUser);
    setIsAuthFormVisible(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthFormVisible(true);
    localStorage.removeItem('currentUser');
  };

  const handleProfileUpdate = (updates: { 
    fullName?: string; 
    email?: string; 
    phone?: string
  }) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      ...updates
    };
    
    setCurrentUser(updatedUser);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'subtasks' | 'comments'>) => {
    if (!currentUser) return;
    
    const newTask: Task = { 
      ...task, 
      id: Date.now().toString(), 
      completed: false, 
      subtasks: [], 
      comments: [] 
    };
    
    const updatedUser = {
      ...currentUser,
      tasks: [...currentUser.tasks, newTask]
    };
    
    setCurrentUser(updatedUser);
  };

  const toggleTask = (taskId: string) => {
    if (!currentUser) return;
    
    setCurrentUser({
      ...currentUser,
      tasks: currentUser.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    });
  };

  const deleteTask = (taskId: string) => {
    if (!currentUser) return;
    
    setCurrentUser({
      ...currentUser,
      tasks: currentUser.tasks.filter(task => task.id !== taskId)
    });
  };

  const addSubtask = (taskId: string, subtask: Omit<Subtask, 'id' | 'completed'>) => {
    if (!currentUser) return;
    
    setCurrentUser({
      ...currentUser,
      tasks: currentUser.tasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              subtasks: [
                ...task.subtasks, 
                { ...subtask, id: Date.now().toString(), completed: false }
              ] 
            } 
          : task
      )
    });
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    if (!currentUser) return;
    
    setCurrentUser({
      ...currentUser,
      tasks: currentUser.tasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              subtasks: task.subtasks.map(subtask => 
                subtask.id === subtaskId 
                  ? { ...subtask, completed: !subtask.completed } 
                  : subtask
              ) 
            } 
          : task
      )
    });
  };

  const addComment = (taskId: string, comment: Omit<Comment, 'id' | 'date'>) => {
    if (!currentUser) return;
    
    setCurrentUser({
      ...currentUser,
      tasks: currentUser.tasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              comments: [
                ...task.comments, 
                { ...comment, id: Date.now().toString(), date: new Date().toISOString() }
              ] 
            } 
          : task
      )
    });
  };

  const addCollaborator = (email: string) => {
    if (!collaborators.includes(email)) {
      setCollaborators(prev => [...prev, email]);
    }
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    if (!currentUser) return;
    
    setCurrentUser(prevUser => {
      if (!prevUser) return prevUser;
      
      const newTasks = Array.from(prevUser.tasks);
      const [removed] = newTasks.splice(startIndex, 1);
      newTasks.splice(endIndex, 0, removed);
      
      return {
        ...prevUser,
        tasks: newTasks
      };
    });
  };

  const saveCustomTheme = (themeData: CustomTheme) => {
    localStorage.setItem('customTheme', JSON.stringify(themeData));
  };

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!currentUser || isAuthFormVisible) {
    return (
      <div className={`app auth-container ${theme}`}>
        <div className="auth-content-wrapper">
          <header className="auth-header">
            <h1>Advanced To-Do List</h1>
          </header>
          
          <div className="auth-theme-selector">
            <ThemeSelector theme={theme} setTheme={setTheme} />
          </div>
          
          <main className="auth-main">
            <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Advanced To-Do List</h1>
        <nav>
          <button 
            className={`nav-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <i className="fas fa-tasks"></i>
            <span>Tasks</span>
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'collaboration' ? 'active' : ''}`}
            onClick={() => setActiveTab('collaboration')}
          >
            <i className="fas fa-users"></i>
            <span>Collaboration</span>
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'customize' ? 'active' : ''}`}
            onClick={() => setActiveTab('customize')}
          >
            <i className="fas fa-palette"></i>
            <span>Customize</span>
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'tasks' ? (
          <>
            <TaskForm addTask={addTask} />
            <TaskList 
              tasks={currentUser.tasks} 
              toggleTask={toggleTask} 
              deleteTask={deleteTask} 
              addSubtask={addSubtask} 
              toggleSubtask={toggleSubtask}
              addComment={addComment}
              reorderTasks={reorderTasks}
            />
          </>
        ) : activeTab === 'collaboration' ? (
          <Collaboration 
            collaborators={collaborators} 
            addCollaborator={addCollaborator} 
            tasks={currentUser.tasks}
          />
        ) : activeTab === 'customize' ? (
          <div className="customization-tab">
            <ThemeCustomizer 
              currentTheme={theme} 
              onThemeChange={setTheme} 
              onSaveCustomTheme={saveCustomTheme}
            />
            
            <div className="theme-preview">
              <div className="preview-card">
                <h4>Task Card Preview</h4>
                <div className="preview-content">
                  <span className="preview-badge high">High Priority</span>
                  <p>This is a sample task preview</p>
                  <div className="preview-meta">
                    <span><i className="far fa-calendar"></i> Tomorrow</span>
                    <span><i className="far fa-check-square"></i> 2/5</span>
                  </div>
                </div>
              </div>
              
              <div className="preview-card">
                <h4>Button Preview</h4>
                <div className="preview-buttons">
                  <button className="primary-btn">Primary Button</button>
                  <button className="secondary-btn">Secondary Button</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <UserProfile 
            user={{
              username: currentUser.username,
              fullName: currentUser.fullName || undefined,
              email: currentUser.email || undefined,
              phone: currentUser.phone || undefined
            }} 
            onUpdate={handleProfileUpdate}
            onLogout={handleLogout}
          />
        )}
      </main>
    </div>
  );
};

export default App;