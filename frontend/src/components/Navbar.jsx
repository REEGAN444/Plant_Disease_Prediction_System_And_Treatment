import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sprout, 
  UploadCloud, 
  LayoutDashboard, 
  BookOpen, 
  History, 
  ShoppingBag, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  LogOut,
  User
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" id="nav-brand-logo">
          <div className="brand-logo-icon">
            <Sprout size={22} />
          </div>
          <span>Plant<span style={{ color: 'var(--primary-600)' }}>AI</span></span>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-home">
                Home
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-dashboard">
                  <LayoutDashboard size={16} /> Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/upload" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-upload">
                <UploadCloud size={16} /> Scan Leaf
              </NavLink>
            </li>
            <li>
              <NavLink to="/diseases" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-diseases">
                <BookOpen size={16} /> Diseases
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-products">
                <ShoppingBag size={16} /> Products
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-history">
                  <History size={16} /> History
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <li>
                <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ color: '#047857', fontWeight: '700' }} id="nav-admin">
                  <ShieldCheck size={16} /> Admin
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Auth Actions */}
        <div className="nav-auth-buttons">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="user-badge" title={user.email}>
                <User size={15} />
                <span>{user.name}</span>
                {isAdmin && <span className="badge badge-natural" style={{ fontSize: '0.65rem' }}>Admin</span>}
              </div>
              <button onClick={handleLogout} className="btn btn-outline btn-sm" id="btn-nav-logout">
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm" id="btn-nav-login">
                <LogIn size={15} /> Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" id="btn-nav-register">
                <UserPlus size={15} /> Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
