import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';
import {
  History,
  Search,
  Leaf,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  UploadCloud,
  Cpu,
  RotateCcw,
} from 'lucide-react';

const HistoryPage = () => {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL'); // ALL, HEALTHY, DISEASED

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/predictions/user/${user.id}`);
        const list = res?.data || res || [];
        // sort newest first
        const sorted = (Array.isArray(list) ? list : []).sort(
          (a, b) => new Date(b.predictionDate) - new Date(a.predictionDate)
        );
        setPredictions(sorted);
      } catch (err) {
        setError(err.message || 'Failed to fetch scan history.');
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchHistory();
  }, [user]);

  const filtered = predictions.filter((p) => {
    const isHealthy = p.diseaseName?.toLowerCase().includes('healthy');
    const matchFilter =
      filter === 'ALL' ||
      (filter === 'HEALTHY' && isHealthy) ||
      (filter === 'DISEASED' && !isHealthy);
    const matchSearch =
      !searchTerm ||
      p.diseaseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.plantName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

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
      {/* Header */}
      <div className="section-header">
        <div>
          <span className="badge badge-category" style={{ marginBottom: '0.5rem' }}>
            <History size={12} /> Diagnostic Ledger
          </span>
          <h1 className="section-title">Prediction History</h1>
          <p className="section-subtitle">
            Full log of all plant disease CNN diagnoses associated with your account.
          </p>
        </div>
        <Link to="/upload" className="btn btn-primary" id="btn-history-new-scan">
          <UploadCloud size={16} /> New Scan
        </Link>
      </div>

      {/* Filters */}
      <div
        className="glass-card"
        style={{
          padding: '1.1rem 1.25rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search
            size={17}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
            }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Search by disease or plant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
            id="history-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {[
            { key: 'ALL', label: 'All Scans' },
            { key: 'HEALTHY', label: '✅ Healthy' },
            { key: 'DISEASED', label: '⚠ Diseased' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`btn btn-sm ${filter === key ? 'btn-primary' : 'btn-outline'}`}
              id={`history-filter-${key.toLowerCase()}`}
            >
              {label}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginLeft: 'auto' }}>
          {filtered.length} / {predictions.length} entries
        </span>
      </div>

      {error && (
        <div className="alert alert-danger">
          <AlertTriangle size={17} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          <Cpu size={32} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <div className="animate-pulse-glow">Loading prediction history...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <History size={44} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ color: '#475569', marginBottom: '0.5rem' }}>No Records Found</h3>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {predictions.length === 0
              ? 'You have no scan history yet. Upload a leaf image to start diagnosing.'
              : 'No scans match your current filter/search.'}
          </p>
          {predictions.length === 0 && (
            <Link to="/upload" className="btn btn-primary btn-sm">
              <UploadCloud size={15} /> Scan Your First Leaf
            </Link>
          )}
          {predictions.length > 0 && (
            <button onClick={() => { setFilter('ALL'); setSearchTerm(''); }} className="btn btn-secondary btn-sm">
              <RotateCcw size={14} /> Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Plant</th>
                <th>Diagnosis</th>
                <th>Status</th>
                <th>Confidence</th>
                <th>Scan Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pred, idx) => {
                const isHealthy = pred.diseaseName?.toLowerCase().includes('healthy');
                return (
                  <tr key={pred.id} id={`history-row-${pred.id}`}>
                    <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{idx + 1}</td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontWeight: 600,
                          color: '#1e293b',
                          fontSize: '0.9rem',
                        }}
                      >
                        <Leaf size={14} color="var(--primary-600)" />
                        {pred.plantName}
                      </span>
                    </td>
                    <td style={{ maxWidth: '260px' }}>
                      <span style={{ fontSize: '0.88rem', color: '#1e293b', fontWeight: 500 }}>
                        {pred.diseaseName}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${isHealthy ? 'badge-healthy' : 'badge-diseased'}`}>
                        {isHealthy ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
                        {isHealthy ? 'Healthy' : 'Diseased'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div
                          style={{
                            flex: 1,
                            height: '6px',
                            background: '#e2e8f0',
                            borderRadius: '9999px',
                            overflow: 'hidden',
                            minWidth: '60px',
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${pred.confidence?.toFixed(0)}%`,
                              background: `linear-gradient(90deg, ${isHealthy ? '#10b981' : '#f59e0b'}, ${isHealthy ? '#34d399' : '#fbbf24'})`,
                              borderRadius: '9999px',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', whiteSpace: 'nowrap' }}>
                          {pred.confidence?.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.82rem',
                          color: '#64748b',
                        }}
                      >
                        <Calendar size={12} />
                        {formatDate(pred.predictionDate)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
