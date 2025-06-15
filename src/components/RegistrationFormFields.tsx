import React from 'react';

interface RegistrationFormFieldsProps {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

export const RegistrationFormFields: React.FC<RegistrationFormFieldsProps> = ({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone
}) => (
  <>
    <div className="form-group">
      <label htmlFor="auth-fullname">Full Name</label>
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
        placeholder="Enter your email"
        aria-label="Email"
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="auth-phone">Phone</label>
      <input
        id="auth-phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone"
        pattern="[0-9]{10}"
        title="10-digit phone number"
        aria-label="Phone"
      />
    </div>
  </>
);