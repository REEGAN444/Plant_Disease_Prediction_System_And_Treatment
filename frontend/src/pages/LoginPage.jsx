import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';
import { Sprout, Mail, Lock, LogIn, AlertTriangle, Eye, EyeOff, Cpu } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.post('/auth/login', form);
      if (res && res.data) {
        login(res.data);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

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
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem',
        }}
      >
        {/* Logo / Header */}
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
            Welcome Back
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            Sign in to your PlantAI farmer account
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" id="login-error-alert">
            <AlertTriangle size={17} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              <Mail size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              className="form-input"
              placeholder="farmer@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              <Lock size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPwd ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
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
                  padding: '0.25rem',
                }}
                id="btn-toggle-password"
              >
                {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem' }}
            disabled={loading}
            id="btn-login-submit"
          >
            {loading ? (
              <>
                <Cpu size={17} /> Authenticating...
              </>
            ) : (
              <>
                <LogIn size={17} /> Sign In to PlantAI
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
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{ color: 'var(--primary-600)', fontWeight: 600 }}
            id="link-go-register"
          >
            Register as Farmer
          </Link>
        </div>

        {/* Demo credentials notice */}
        <div
          className="alert alert-info"
          style={{ marginTop: '1rem', fontSize: '0.82rem' }}
        >
          <Cpu size={15} />
          <span>
            Demo: <strong>admin@plant.ai</strong> / <strong>admin123</strong> for admin access.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
