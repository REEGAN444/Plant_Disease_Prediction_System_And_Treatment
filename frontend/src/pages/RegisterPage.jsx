import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';
import { Sprout, User, Mail, Lock, UserPlus, AlertTriangle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (res && res.data) {
        login(res.data);
        navigate('/dashboard');
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  const pwdStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const pwdColors = ['#e2e8f0', '#ef4444', '#f59e0b', '#10b981'];
  const pwdLabels = ['', 'Weak', 'Moderate', 'Strong'];

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div
        className="glass-card"
        style={{ width: '100%', maxWidth: '480px', padding: '2.5rem' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '62px',
              height: '62px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)',
            }}
          >
            <Sprout size={30} />
          </div>
          <h1 style={{ fontSize: '1.7rem', color: '#0f172a', marginBottom: '0.35rem' }}>
            Create Account
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            Register to save diagnoses & track prediction history
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" id="register-error-alert">
            <AlertTriangle size={17} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} id="register-form">
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">
              <User size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Full Name
            </label>
            <input
              id="register-name"
              type="text"
              name="name"
              className="form-input"
              placeholder="e.g. Ravi Kumar"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">
              <Mail size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Email Address
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              className="form-input"
              placeholder="farmer@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">
              <Lock size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="register-password"
                type={showPwd ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                required
                style={{ paddingRight: '2.8rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                }}
                id="btn-toggle-register-password"
              >
                {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {/* Password strength bar */}
            {form.password.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '0.25rem' }}>
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '9999px',
                        background: pwdStrength >= level ? pwdColors[pwdStrength] : '#e2e8f0',
                        transition: 'background 0.3s',
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.78rem', color: pwdColors[pwdStrength], fontWeight: 600 }}>
                  {pwdLabels[pwdStrength]}
                </span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-confirm-password">
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Confirm Password
            </label>
            <input
              id="register-confirm-password"
              type={showPwd ? 'text' : 'password'}
              name="confirmPassword"
              className="form-input"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              style={{
                borderColor:
                  form.confirmPassword && form.password !== form.confirmPassword
                    ? '#ef4444'
                    : form.confirmPassword && form.password === form.confirmPassword
                    ? '#10b981'
                    : undefined,
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem' }}
            disabled={loading}
            id="btn-register-submit"
          >
            {loading ? (
              'Creating Account...'
            ) : (
              <>
                <UserPlus size={17} /> Create Farmer Account
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid #f1f5f9',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#64748b',
          }}
        >
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-600)', fontWeight: 600 }} id="link-go-login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
