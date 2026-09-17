import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import {
  BookOpen,
  Search,
  Leaf,
  AlertTriangle,
  ShieldCheck,
  FlaskConical,
  ChevronDown,
  ChevronUp,
  Sprout,
} from 'lucide-react';

const DiseasesPage = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [plantFilter, setPlantFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchDiseases = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get('/diseases');
        const list = res?.data || res || [];
        setDiseases(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err.message || 'Failed to load disease data from server.');
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, []);

  const uniquePlants = ['ALL', ...new Set(diseases.map((d) => d.plantName).filter(Boolean))];

  const filtered = diseases.filter((d) => {
    const matchSearch =
      !searchTerm ||
      d.diseaseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.plantName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPlant = plantFilter === 'ALL' || d.plantName === plantFilter;
    return matchSearch && matchPlant;
  });

  const toggleExpand = (id) => setExpandedId((prev) => (prev === id ? null : id));

  const tagColors = {
    Tomato: { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
    Apple: { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
    Grape: { bg: '#f3e8ff', color: '#7e22ce', border: '#d8b4fe' },
    Corn: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
    Potato: { bg: '#fefce8', color: '#854d0e', border: '#fde68a' },
    Pepper: { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="section-header">
        <div>
          <span className="badge badge-diseased" style={{ marginBottom: '0.5rem' }}>
            <BookOpen size={12} /> Pathology Library
          </span>
          <h1 className="section-title">Plant Disease Encyclopedia</h1>
          <p className="section-subtitle">
            Explore etiological causes, pathological effects, and preventive strategies for all
            diagnosable crop diseases.
          </p>
        </div>
        <div
          style={{
            background: '#f0fdf4',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            border: '1px solid #a7f3d0',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-700)' }}>
            {diseases.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#047857' }}>Indexed Pathologies</div>
        </div>
      </div>

      {/* Search + Filter */}
      <div
        className="glass-card"
        style={{ padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search
            size={17}
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Search disease or plant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
            id="disease-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {uniquePlants.map((plant) => (
            <button
              key={plant}
              onClick={() => setPlantFilter(plant)}
              className={`btn btn-sm ${plantFilter === plant ? 'btn-primary' : 'btn-outline'}`}
              id={`filter-plant-${plant.toLowerCase()}`}
            >
              {plant === 'ALL' ? <Sprout size={14} /> : <Leaf size={14} />}
              {plant}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <AlertTriangle size={17} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748b' }}>
          <div className="animate-pulse-glow" style={{ fontSize: '1.1rem' }}>
            Loading disease database...
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <BookOpen size={40} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ color: '#475569', marginBottom: '0.5rem' }}>No Diseases Found</h3>
          <p style={{ color: '#94a3b8' }}>Try adjusting your search or plant filter.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((disease) => {
            const isExpanded = expandedId === disease.id;
            const tag = tagColors[disease.plantName] || {
              bg: '#f8fafc',
              color: '#475569',
              border: '#e2e8f0',
            };

            return (
              <div
                key={disease.id}
                className="glass-card"
                style={{
                  padding: '0',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                id={`disease-card-${disease.id}`}
              >
                {/* Card Header Row */}
                <div
                  onClick={() => toggleExpand(disease.id)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: tag.bg,
                        border: `1px solid ${tag.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Leaf size={22} color={tag.color} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                        <span
                          className="badge"
                          style={{
                            background: tag.bg,
                            color: tag.color,
                            border: `1px solid ${tag.border}`,
                            fontSize: '0.72rem',
                          }}
                        >
                          {disease.plantName}
                        </span>
                        <span className="badge badge-diseased" style={{ fontSize: '0.7rem' }}>
                          Pathology
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', color: '#0f172a', lineHeight: 1.2 }}>
                        {disease.diseaseName}
                      </h3>
                    </div>
                  </div>
                  <div style={{ color: '#94a3b8', flexShrink: 0 }}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.5rem',
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      paddingTop: '1.25rem',
                    }}
                  >
                    {disease.diseaseCause && (
                      <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '0.85rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#92400e',
                            marginBottom: '0.3rem',
                          }}
                        >
                          <FlaskConical size={14} /> Etiological Cause
                        </div>
                        <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.55' }}>
                          {disease.diseaseCause}
                        </p>
                      </div>
                    )}

                    {disease.diseaseEffect && (
                      <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: '0.85rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#b91c1c',
                            marginBottom: '0.3rem',
                          }}
                        >
                          <AlertTriangle size={14} /> Pathological Effect & Damage
                        </div>
                        <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.55' }}>
                          {disease.diseaseEffect}
                        </p>
                      </div>
                    )}

                    {disease.prevention && (
                      <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '0.85rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#065f46',
                            marginBottom: '0.3rem',
                          }}
                        >
                          <ShieldCheck size={14} /> Cultural & Agronomic Prevention
                        </div>
                        <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.55' }}>
                          {disease.prevention}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DiseasesPage;
