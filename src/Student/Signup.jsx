import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    yearOfStudy: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!form.name || !form.yearOfStudy || !form.gender) {
      toast.error('Please fill out all Step 1 fields');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      toast.error('Enter a valid email address');
      return;
    }

    if (!validatePassword(form.password)) {
      toast.error('Password should be at least 6 characters');
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:5000/auth/signup', form);
      toast.success(res.data.message || 'Signup successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <ToastContainer position="top-center" />
      <h2 style={{ textAlign: 'center' }}>Student Signup</h2>

      <form onSubmit={step === 1 ? handleNext : handleSubmit}>
        {step === 1 && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            /><br /><br />

            <select
              name="yearOfStudy"
              value={form.yearOfStudy}
              onChange={handleChange}
              required
            >
              <option value="">Select Year of Study</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select><br /><br />

            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === 'Male'}
                  onChange={handleChange}
                /> Male
              </label>{' '}
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === 'Female'}
                  onChange={handleChange}
                /> Female
              </label>{' '}
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={form.gender === 'Other'}
                  onChange={handleChange}
                /> Other
              </label>
            </div><br />

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Please wait...' : 'Next'}
            </button>
            <p style={{ marginTop: '1rem' }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </>
        )}
{step === 2 && (
  <>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      required
    /><br /><br />

    <div style={{ position: 'relative' }}>
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer'
        }}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div><br />

    <div style={{ position: 'relative' }}>
      <input
        type={showConfirm ? 'text' : 'password'}
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />
      <span
        onClick={() => setShowConfirm(!showConfirm)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer'
        }}
      >
        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div><br />

    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
      <button type="button" onClick={() => setStep(1)} disabled={isLoading}>
        Back
      </button>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing up...' : 'Get Started'}
      </button>
    </div>

    <p style={{ marginTop: '1rem' }}>
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </>
)}

      </form>
    </div>
  );
};

export default Signup;
