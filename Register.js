import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target; setFormData({ ...formData, [name]: value, });
  };

  const validate = () => { let formErrors = {}; 
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) { formErrors.email = 'Email is required'; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {formErrors.email = 'Email is invalid';}
    if (!formData.password) formErrors.password = 'Password is required';
    if (!formData.confirmPassword) {formErrors.confirmPassword = 'Confirm Password is required';} 
    else if (formData.password !== formData.confirmPassword) { formErrors.confirmPassword = 'Passwords do not match';}
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {console.log('Form submitted', formData); navigate('/login'); } 
    else { setErrors(validationErrors);}
  };

  return (
    <div className="register-form">
      <h2>Sign-up! </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email-id:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} require />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <button type="submit">Sign-up</button>
        <p>Have an account? <Link to="/login">Login here</Link> </p>
      </form>
    </div>
  );
};

export default Register;