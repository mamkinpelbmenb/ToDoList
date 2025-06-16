import React, { useState } from 'react'; // Добавлен импорт useState

interface UserProfileProps {
  user: {
    username: string;
    fullName?: string;
    email?: string;
    phone?: string;
  };
  onUpdate: (updates: { 
    fullName?: string; 
    email?: string; 
    phone?: string 
  }) => void;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate, onLogout }) => {
  const [fullName, setFullName] = useState(user.fullName || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate({ fullName, email, phone });
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <h2>Ваш профиль</h2>
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profile-username">Логин</label>
            <input 
              id="profile-username"
              type="text" 
              value={user.username} 
              disabled 
              aria-label="Username (read-only)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="profile-fullname">ФИО</label>
            <input
              id="profile-fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              aria-label="Full Name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="profile-email">Почта</label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email Address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="profile-phone">Номер</label>
            <input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              title="10-digit phone number"
              aria-label="Phone Number"
            />
          </div>
          
          <div className="profile-actions">
            <button 
              type="submit" 
              className="save-btn"
              aria-label="Save profile changes"
            >
              Сохранить
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
              aria-label="Cancel editing"
            >
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Логин:</strong> {user.username}</p>
          {fullName && <p><strong>ФИО:</strong> {fullName}</p>}
          {email && <p><strong>Почта:</strong> {email}</p>}
          {phone && <p><strong>Номер:</strong> {phone}</p>}
          
          <div className="profile-actions">
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              aria-label="Edit profile"
            >
              Редактировать профиль
            </button>
            <button 
              className="logout-btn"
              onClick={onLogout}
              aria-label="Logout"
            >
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;