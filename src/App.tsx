import React, { useState, useEffect, useLayoutEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ThemeSelector from './components/ThemeSelector';
import Collaboration from './components/Collaboration';
import AuthForm from './components/AuthForm';
import UserProfile from './components/UserProfile';
import './styles/App.css';
import { Task, Theme, Subtask, Comment, User } from './types/global';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [activeTab, setActiveTab] = useState<'tasks' | 'collaboration' | 'profile'>('tasks');
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [isAuthFormVisible, setIsAuthFormVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'light';
    const savedUser = JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null;
    const savedCollaborators = JSON.parse(localStorage.getItem('collaborators') || '[]') as string[];
    
    setTheme(savedTheme);
    setCollaborators(savedCollaborators);
    
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsAuthFormVisible(false);
    }
    
    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
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

  // Добавление задачи
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

  // Переключение статуса задачи
  const toggleTask = (taskId: string) => {
    if (!currentUser) return;
    
    setCurrentUser({
      ...currentUser,
      tasks: currentUser.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    });
  };

  // Удаление задачи
  const deleteTask = (taskId: string) => {
    if (!currentUser) return;
    
    setCurrentUser({
      ...currentUser,
      tasks: currentUser.tasks.filter(task => task.id !== taskId)
    });
  };

  // Добавление подзадачи
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

  // Переключение статуса подзадачи
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

  // Добавление комментария
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

  // Добавление коллаборатора
  const addCollaborator = (email: string) => {
    if (!collaborators.includes(email)) {
      setCollaborators(prev => [...prev, email]);
    }
  };

  if (isLoading) {
    return <div className="loadingContainer">Loading...</div>; // Исправлено
  }

  if (!currentUser || isAuthFormVisible) {
    return (
      <div className="app authContainer"> {/* Исправлено */}
        <header>
          <h1>Advanced To-Do List</h1>
          <ThemeSelector theme={theme} setTheme={setTheme} />
        </header>
        <main>
          <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
        </main>
      </div>
    );
  }

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

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Advanced To-Do List</h1>
        <nav>
          <button 
            className={activeTab === 'tasks' ? 'active' : ''}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
          <button 
            className={activeTab === 'collaboration' ? 'active' : ''}
            onClick={() => setActiveTab('collaboration')}
          >
            Collaboration
          </button>
          <button 
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </nav>
        <ThemeSelector theme={theme} setTheme={setTheme} />
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