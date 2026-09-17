import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';
import {
  LayoutDashboard,
  Cpu,
  Leaf,
  History,
  TrendingUp,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Calendar,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/predictions/user/${user.id}`);
        const list = res?.data || res || [];
        setPredictions(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err.message || 'Failed to load your prediction history.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchHistory();
    }
  }, [user]);

  const totalScans = predictions.length;
  const healthyScans = predictions.filter((p) => p.diseaseName?.toLowerCase().includes('healthy')).length;
  const diseasedScans = totalScans - healthyScans;
  const avgConfidence =
    totalScans > 0
      ? (predictions.reduce((acc, p) => acc + (p.confidence || 0), 0) / totalScans).toFixed(1)
      : 0;

  const recentPredictions = [...predictions]
    .sort((a, b) => new Date(b.predictionDate) - new Date(a.predictionDate))
    .slice(0, 5);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-natural" style={{ marginBottom: '0.5rem' }}>
            <LayoutDashboard size={12} /> Farmer Console
          </span>
          <h1 className="section-title">
            Welcome, {user?.name?.split(' ')[0] || 'Farmer'} 👋
          </h1>
          <p className="section-subtitle">Your plant diagnostic overview and recent scan activity.</p>
        </div>
        <Link to="/upload" className="btn btn-primary" id="btn-dashboard-scan">
          <UploadCloud size={18} /> New Leaf Scan
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid-4">
        <div
          className="glass-card"
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.4rem' }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--primary-100)',
              color: 'var(--primary-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Cpu size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>{totalScans}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Total CNN Scans</div>
          </div>
        </div>

        <div
          className="glass-card"
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.4rem' }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#f0fdf4',
              color: '#15803d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>{healthyScans}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Healthy Leaves</div>
          </div>
        </div>

        <div
          className="glass-card"
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.4rem' }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#fef2f2',
              color: '#b91c1c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>{diseasedScans}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Diseases Detected</div>
          </div>
        </div>

        <div
          className="glass-card"
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.4rem' }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#fef3c7',
              color: '#b45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>{avgConfidence}%</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Avg. Confidence</div>
          </div>
        </div>
      </div>

      {/* Recent Predictions & Quick Links Grid */}
      <div className="grid-2" style={{ alignItems: 'start', gap: '2rem' }}>
        {/* Recent Scans */}
        <div className="glass-card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <History size={18} color="var(--primary-600)" />
              Recent Diagnoses
            </h3>
            <Link to="/history" className="btn btn-outline btn-sm" id="btn-view-all-history">
              View All
            </Link>
          </div>

          {error && (
            <div className="alert alert-danger">
              <AlertTriangle size={15} />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>
              Loading scans...
            </div>
          ) : recentPredictions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <Leaf size={36} color="#cbd5e1" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                No scans yet. Upload your first leaf image to get started.
              </p>
              <Link to="/upload" className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>
                <UploadCloud size={14} /> Start Scanning
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentPredictions.map((pred) => {
                const isHealthy = pred.diseaseName?.toLowerCase().includes('healthy');
                return (
                  <div
                    key={pred.id}
                    style={{
                      padding: '0.85rem 1rem',
                      background: '#f8fafc',
                      borderRadius: '0.65rem',
                      border: '1px solid #f1f5f9',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                    id={`dashboard-pred-${pred.id}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: isHealthy ? '#dcfce7' : '#fef2f2',
                          color: isHealthy ? '#16a34a' : '#b91c1c',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {isHealthy ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>
                          {pred.diseaseName}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          {pred.plantName} &bull;{' '}
                          <Calendar size={10} style={{ display: 'inline' }} />{' '}
                          {formatDate(pred.predictionDate)}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`badge ${isHealthy ? 'badge-healthy' : 'badge-diseased'}`}
                      style={{ flexShrink: 0, fontSize: '0.75rem' }}
                    >
                      {pred.confidence?.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link
                to="/upload"
                className="btn btn-primary"
                style={{ justifyContent: 'flex-start', gap: '0.75rem' }}
                id="btn-quick-scan"
              >
                <UploadCloud size={18} /> Scan Plant Leaf
              </Link>
              <Link
                to="/diseases"
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', gap: '0.75rem' }}
                id="btn-quick-diseases"
              >
                <Leaf size={18} /> Browse Disease Index
              </Link>
              <Link
                to="/products"
                className="btn btn-outline"
                style={{ justifyContent: 'flex-start', gap: '0.75rem' }}
                id="btn-quick-products"
              >
                <Cpu size={18} /> Explore Agro Products
              </Link>
              <Link
                to="/history"
                className="btn btn-outline"
                style={{ justifyContent: 'flex-start', gap: '0.75rem' }}
                id="btn-quick-history"
              >
                <History size={18} /> Full Prediction History
              </Link>
            </div>
          </div>

          {/* Account Info */}
          <div
            className="glass-card"
            style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(236,253,245,0.9) 0%, rgba(255,255,255,0.95) 100%)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#0f172a' }}>
              Account Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Name</span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{user?.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Email</span>
                <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.82rem' }}>{user?.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Role</span>
                <span className={`badge ${user?.role === 'ADMIN' ? 'badge-diseased' : 'badge-healthy'}`}>
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
