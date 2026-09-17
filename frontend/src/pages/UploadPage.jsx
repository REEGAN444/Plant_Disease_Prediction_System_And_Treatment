import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import SampleLeavesModal from '../components/SampleLeavesModal';
import { 
  UploadCloud, 
  Leaf, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Printer, 
  ShieldAlert, 
  Cpu, 
  Info, 
  Layers,
  FlaskConical,
  HelpCircle,
  FileText
} from 'lucide-react';

const UploadPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const [treatmentFilter, setTreatmentFilter] = useState('ALL'); // 'ALL', 'NATURAL', 'ARTIFICIAL'

  // Handle sample passed from location state
  useEffect(() => {
    if (location.state?.sampleFile && location.state?.samplePreviewUrl) {
      setFile(location.state.sampleFile);
      setPreviewUrl(location.state.samplePreviewUrl);
      setResult(null);
      setError(null);
    }
  }, [location.state]);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      processSelectedFile(selected);
    }
  };

  const processSelectedFile = (selectedFile) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, or WEBP).');
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processSelectedFile(droppedFile);
    }
  };

  const handleSelectSample = (sampleFile, dataUrl) => {
    setFile(sampleFile);
    setPreviewUrl(dataUrl);
    setResult(null);
    setError(null);
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setLoadingStep(1);

    // Simulated step progression for visual feedback while backend computes
    const timer1 = setTimeout(() => setLoadingStep(2), 250);
    const timer2 = setTimeout(() => setLoadingStep(3), 500);

    try {
      const formData = new FormData();
      formData.append('image', file);
      if (user?.id) {
        formData.append('userId', user.id);
      }

      const res = await axiosClient.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res && res.data) {
        setResult(res.data);
      } else {
        throw new Error('No prediction data returned.');
      }
    } catch (err) {
      console.error('Prediction failed:', err);
      setError(err.message || 'Failed to complete leaf disease diagnosis. Ensure backend is running.');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  // Combine recommended products, fertilizers, and medicines for unified display
  const combinedProducts = result?.recommendedProducts || [];
  const filteredProducts = combinedProducts.filter((p) => {
    if (treatmentFilter === 'ALL') return true;
    return p.productType?.toUpperCase() === treatmentFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div className="section-header">
        <div>
          <h1 className="section-title">Plant Leaf Disease Diagnostic Studio</h1>
          <p className="section-subtitle">
            Upload leaf photographs to execute Convolutional Neural Network (CNN) diagnosis &amp; receive tailored remedies.
          </p>
        </div>
        <button 
          onClick={() => setShowSampleModal(true)} 
          className="btn btn-secondary btn-sm"
          id="btn-open-sample-modal"
        >
          <Sparkles size={16} color="var(--primary-600)" />
          Choose Sample Test Leaf
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" id="diagnostic-error-alert">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid-2" style={{ alignItems: 'start', gap: '2rem' }}>
        {/* Left Column: Upload & Preview Card */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={20} color="var(--primary-600)" />
            1. Leaf Capture / Selection
          </h3>

          {!previewUrl ? (
            <div 
              className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              id="upload-dropzone"
            >
              <div className="upload-icon-bubble">
                <UploadCloud size={36} />
              </div>
              <h4 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                Drop plant leaf image here or click to browse
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                Supports high-resolution PNG, JPG, JPEG, and WEBP
              </p>
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                Browse Files
              </button>
            </div>
          ) : (
            <div className="upload-preview-container">
              <div style={{ position: 'relative' }}>
                <img 
                  src={previewUrl} 
                  alt="Leaf to analyze" 
                  className="upload-preview-img"
                  id="preview-leaf-image"
                />
                {loading && (
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(5, 150, 105, 0.25)',
                      borderRadius: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <div className="animate-pulse-glow" style={{ background: '#ffffff', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-700)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Cpu size={16} /> Scanning Convolutions...
                    </div>
                  </div>
                )}
              </div>

              <div style={{ width: '100%', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '0.65rem', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px', fontSize: '0.85rem', color: '#334155' }}>
                  <strong>{file?.name || 'Selected Botanical Sample'}</strong>
                </div>
                <button 
                  onClick={handleReset} 
                  className="btn btn-outline btn-sm"
                  title="Remove image"
                  disabled={loading}
                  id="btn-remove-leaf"
                >
                  <RotateCcw size={14} /> Change
                </button>
              </div>

              <div style={{ width: '100%', display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={handleAnalyze} 
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={loading}
                  id="btn-run-analysis"
                >
                  <Cpu size={18} />
                  {loading ? 'Evaluating Deep Neural Layers...' : 'Run Deep CNN Diagnosis'}
                </button>
              </div>
            </div>
          )}

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
            id="leaf-file-input"
          />

          {/* CNN Architecture Pipeline Info Card */}
          <div style={{ marginTop: '1.5rem', background: '#f8fafc', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
              <Cpu size={15} color="var(--primary-600)" />
              <span>Deep Learning Architecture Specs:</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: '1.45' }}>
              64&times;64 RGB input tensor &bull; Conv2D (32 filters, 3&times;3 kernel, ReLU) &bull; MaxPool2D (2&times;2) &bull; Dense 64 Neurons &bull; Softmax 14-Class Categorical Output.
            </p>
          </div>
        </div>

        {/* Right Column: Diagnostic Output & Remedies */}
        <div>
          {!result && !loading && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <Layers size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#334155', marginBottom: '0.5rem' }}>
                Awaiting Leaf Image Input
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
                Select an image on the left or launch botanical test samples to generate complete pathology analysis and remedies.
              </p>
              <button 
                onClick={() => setShowSampleModal(true)} 
                className="btn btn-secondary btn-sm"
              >
                <Sparkles size={15} color="var(--primary-600)" />
                Load Sample Test Leaf
              </button>
            </div>
          )}

          {loading && (
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <div className="animate-pulse-glow" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Cpu size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                Neural Network Computing...
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Analyzing leaf cell pigmentation, lesion boundaries, and chlorosis distributions.
              </p>

              {/* Progress Step Indicator */}
              <div style={{ maxWidth: '340px', margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: loadingStep >= 1 ? 'var(--primary-700)' : '#94a3b8' }}>
                  <CheckCircle2 size={16} /> 1. Image preprocessing &amp; normalization
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: loadingStep >= 2 ? 'var(--primary-700)' : '#94a3b8' }}>
                  <CheckCircle2 size={16} /> 2. Feature map convolution (32 filters)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: loadingStep >= 3 ? 'var(--primary-700)' : '#94a3b8' }}>
                  <CheckCircle2 size={16} /> 3. Dense layer &amp; Softmax distribution
                </div>
              </div>
            </div>
          )}

          {result && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Top Banner Card */}
              <div 
                className="glass-card" 
                style={{ 
                  borderLeft: `6px solid ${result.healthy ? 'var(--color-success)' : 'var(--color-danger)'}`,
                  background: '#ffffff'
                }}
                id="diagnosis-result-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span className="badge badge-category">{result.plantName}</span>
                      <span className={`badge ${result.healthy ? 'badge-healthy' : 'badge-diseased'}`}>
                        {result.healthy ? 'Healthy Leaf' : 'Pathology Detected'}
                      </span>
                    </div>
                    <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>
                      {result.diseaseName}
                    </h2>
                  </div>

                  {/* Confidence Gauge */}
                  <div className="confidence-gauge-box">
                    <div 
                      className="confidence-circle" 
                      style={{ '--percentage': Math.round(result.confidence) }}
                    >
                      <div className="confidence-circle-inner">
                        {result.confidence?.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600 }}>Confidence Score</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                        {result.confidence >= 80 ? 'High Certainty' : 'Moderate Certainty'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class Probabilities Bar Chart (Top 3) */}
                {result.classProbabilities && (
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.65rem' }}>
                      Candidate Class Probability Distribution:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {Object.entries(result.classProbabilities)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([className, prob]) => {
                          const pct = (prob * 100).toFixed(1);
                          return (
                            <div key={className}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#334155', marginBottom: '0.2rem' }}>
                                <span>{className}</span>
                                <strong>{pct}%</strong>
                              </div>
                              <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                                <div 
                                  style={{ 
                                    height: '100%', 
                                    width: `${pct}%`, 
                                    background: 'linear-gradient(90deg, var(--primary-500), var(--primary-600))', 
                                    borderRadius: '9999px' 
                                  }} 
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Pathology Details Tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {result.diseaseCause && (
                    <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '0.75rem' }}>
                      <h4 style={{ fontSize: '0.95rem', color: '#92400e', marginBottom: '0.25rem' }}>Etiological Cause</h4>
                      <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>{result.diseaseCause}</p>
                    </div>
                  )}

                  {result.diseaseEffect && (
                    <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: '0.75rem' }}>
                      <h4 style={{ fontSize: '0.95rem', color: '#b91c1c', marginBottom: '0.25rem' }}>Pathological Effect &amp; Damage</h4>
                      <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>{result.diseaseEffect}</p>
                    </div>
                  )}

                  {result.prevention && (
                    <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '0.75rem' }}>
                      <h4 style={{ fontSize: '0.95rem', color: '#065f46', marginBottom: '0.25rem' }}>Cultural &amp; Agronomic Prevention</h4>
                      <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>{result.prevention}</p>
                    </div>
                  )}
                </div>

                {/* Report Actions */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => window.print()} 
                    className="btn btn-outline btn-sm"
                    id="btn-print-report"
                  >
                    <Printer size={15} /> Print Diagnostic Report
                  </button>
                  <button 
                    onClick={handleReset} 
                    className="btn btn-secondary btn-sm"
                    id="btn-scan-another"
                  >
                    <RotateCcw size={15} /> Scan Another Leaf
                  </button>
                  <Link to="/diseases" className="btn btn-outline btn-sm">
                    <FileText size={15} /> Read Full Pathology Index
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Remediation Section (Shown when diagnosis exists) */}
      {result && combinedProducts.length > 0 && (
        <section style={{ marginTop: '1.5rem' }}>
          <div className="section-header">
            <div>
              <span className="badge badge-natural" style={{ marginBottom: '0.35rem' }}>Prescribed Treatments</span>
              <h2 className="section-title">Matched Fertilizers &amp; Botanical Medicines</h2>
              <p className="section-subtitle">
                Targeted formulations formulated for <strong>{result.diseaseName}</strong> on {result.plantName}:
              </p>
            </div>

            {/* Filter Toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', background: '#e2e8f0', padding: '0.25rem', borderRadius: '0.65rem' }}>
              <button 
                onClick={() => setTreatmentFilter('ALL')}
                className={`btn btn-sm ${treatmentFilter === 'ALL' ? 'btn-primary' : 'btn-outline'}`}
                style={{ border: 'none', background: treatmentFilter === 'ALL' ? undefined : 'transparent' }}
              >
                All Solutions ({combinedProducts.length})
              </button>
              <button 
                onClick={() => setTreatmentFilter('NATURAL')}
                className={`btn btn-sm ${treatmentFilter === 'NATURAL' ? 'btn-primary' : 'btn-outline'}`}
                style={{ border: 'none', background: treatmentFilter === 'NATURAL' ? undefined : 'transparent' }}
              >
                <Leaf size={14} /> Organic / Natural
              </button>
              <button 
                onClick={() => setTreatmentFilter('ARTIFICIAL')}
                className={`btn btn-sm ${treatmentFilter === 'ARTIFICIAL' ? 'btn-primary' : 'btn-outline'}`}
                style={{ border: 'none', background: treatmentFilter === 'ARTIFICIAL' ? undefined : 'transparent' }}
              >
                <FlaskConical size={14} /> Synthetic / Mineral
              </button>
            </div>
          </div>

          <div className="grid-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Sample Leaf Modal */}
      <SampleLeavesModal 
        isOpen={showSampleModal} 
        onClose={() => setShowSampleModal(false)} 
        onSelectSample={handleSelectSample} 
      />
    </div>
  );
};

export default UploadPage;
