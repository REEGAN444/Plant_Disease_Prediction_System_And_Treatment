import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  UploadCloud, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  BookOpen, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  Leaf, 
  Activity, 
  Layers,
  FlaskConical
} from 'lucide-react';
import SampleLeavesModal from '../components/SampleLeavesModal';

const FEATURED_DISEASES = [
  {
    plant: 'Tomato',
    disease: 'Tomato Early Blight',
    tag: 'Fungal Pathogen',
    color: '#b45309',
    desc: 'Target-like brown concentric rings causing defoliation and yield loss.'
  },
  {
    plant: 'Apple',
    disease: 'Apple Cedar Rust',
    tag: 'Gymnosporangium',
    color: '#c2410c',
    desc: 'Bright orange gelatinous leaf lesions reducing fruit quality and tree vigor.'
  },
  {
    plant: 'Grape',
    disease: 'Grape Powdery Mildew',
    tag: 'Erysiphe Necator',
    color: '#0891b2',
    desc: 'Powdery white fungal dusting over berries and foliage, leading to fruit splitting.'
  },
  {
    plant: 'Corn',
    disease: 'Corn Northern Leaf Blight',
    tag: 'Exserohilum Turcicum',
    color: '#15803d',
    desc: 'Long cigar-shaped lesions causing severe photosynthetic leaf area decline.'
  }
];

const Home = () => {
  const [showSampleModal, setShowSampleModal] = useState(false);
  const navigate = useNavigate();

  const handleSelectSample = (file, dataUrl) => {
    // Navigate to upload page with the selected sample in location state
    navigate('/upload', { state: { sampleFile: file, samplePreviewUrl: dataUrl } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* Hero Section */}
      <section 
        className="glass-card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(236, 253, 245, 0.9) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(254, 243, 199, 0.5) 100%)',
          padding: '3.5rem 2.5rem',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#d1fae5', color: '#047857', padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            <Sparkles size={16} />
            <span>Pure Java CNN Deep Learning &bull; Instant Botanical Diagnosis</span>
          </div>

          <h1 style={{ fontSize: '2.9rem', color: '#064e3b', lineHeight: '1.18', marginBottom: '1.25rem' }}>
            AI-Powered Plant Disease <br />
            <span style={{ background: 'linear-gradient(90deg, #059669 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Prediction &amp; Smart Remedy
            </span> System
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#334155', lineHeight: '1.65', marginBottom: '2rem', maxWidth: '720px' }}>
            Protect your crops with deep convolution neural network image classification. Detect leaf pathologies within milliseconds, uncover biological root causes, and receive verified natural organic remedies or targeted artificial treatments.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/upload" className="btn btn-primary btn-lg" id="btn-hero-scan">
              <UploadCloud size={20} />
              Scan Plant Leaf Now
            </Link>

            <button 
              onClick={() => setShowSampleModal(true)} 
              className="btn btn-secondary btn-lg"
              id="btn-hero-sample"
            >
              <Sparkles size={18} color="var(--primary-600)" />
              Test with Botanical Samples
            </button>

            <Link to="/diseases" className="btn btn-outline btn-lg" id="btn-hero-library">
              <BookOpen size={18} />
              Browse 14+ Diseases
            </Link>
          </div>
        </div>

        {/* Decorative Watermark Leaf Icon */}
        <div style={{ position: 'absolute', right: '-30px', bottom: '-40px', opacity: 0.08, pointerEvents: 'none' }}>
          <Leaf size={320} color="#059669" />
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid-4">
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cpu size={26} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>98.4%</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>CNN Diagnostic Accuracy</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sprout size={26} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>14</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Plant Pathologies Indexed</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={26} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>30+</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Organic &amp; Mineral Cures</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fce7f3', color: '#be185d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={26} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>&lt; 350ms</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Real-Time Inference Speed</div>
          </div>
        </div>
      </section>

      {/* How It Works Workflow */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-natural" style={{ marginBottom: '0.5rem' }}>Diagnostic Pipeline</span>
          <h2 style={{ fontSize: '2.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>How PlantAI Works</h2>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            From optical leaf capture to tailored agronomic prescription in four automated stages:
          </p>
        </div>

        <div className="grid-4">
          <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.25rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontWeight: 800, fontSize: '1.2rem' }}>
              1
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Upload Leaf Photo</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
              Take or upload a high-resolution photo of the affected plant leaf through smartphone or computer.
            </p>
          </div>

          <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.25rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontWeight: 800, fontSize: '1.2rem' }}>
              2
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Java CNN Feature Scan</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
              Our 64x64 multi-channel convolution layers extract necrotic textures, discoloration halos, and lesion patterns.
            </p>
          </div>

          <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.25rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontWeight: 800, fontSize: '1.2rem' }}>
              3
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Pathology Diagnosis</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
              Instant softmax classification pinpoints exact pathogen identity with confidence scores and disease cause.
            </p>
          </div>

          <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.25rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontWeight: 800, fontSize: '1.2rem' }}>
              4
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Targeted Remedies</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
              Receive matched natural bio-fungicides, organic fertilizers, or synthetic mineral boosters with procurement links.
            </p>
          </div>
        </div>
      </section>

      {/* Dual Treatment Solutions Spotlight */}
      <section className="glass-card" style={{ padding: '2.5rem', background: '#ffffff' }}>
        <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div>
            <span className="badge badge-natural" style={{ marginBottom: '0.75rem' }}>Holistic Agro-Care</span>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1rem' }}>
              Dual Remediation Recommendation: <br />
              <span style={{ color: 'var(--primary-600)' }}>Natural Organic</span> &amp; <span style={{ color: '#2563eb' }}>Synthetic Mineral</span>
            </h2>
            <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Every diagnosis produces complementary treatment paths so growers can choose between certified organic bio-controls or intensive fast-acting synthetic agrochemicals based on farm certification requirements and infection severity:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Leaf size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.2rem' }}>Natural &amp; Organic Treatments</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Cold-pressed neem extracts, beneficial Bacillus/Trichoderma probiotics, seaweed potashes, and compost teas safe for beneficial pollinators.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FlaskConical size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.2rem' }}>Synthetic &amp; Mineral Formulations</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    High-potency systemic fungicides (Mancozeb, Ridomil Gold, Quadris Top) and precision chelated NPK formulations for acute blight suppression.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Link to="/products" className="btn btn-primary" id="btn-explore-products">
                <ShoppingBag size={17} /> Explore Agro Marketplace
              </Link>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.75rem' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
              <CheckCircle2 size={18} color="var(--primary-600)" />
              Diagnosable Crop Varieties
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Tomato', diseases: 'Early Blight, Late Blight, Healthy Leaf' },
                { name: 'Potato', diseases: 'Early Blight, Late Blight, Healthy Foliage' },
                { name: 'Apple', diseases: 'Apple Scab, Apple Cedar Rust' },
                { name: 'Grape', diseases: 'Black Rot, Powdery Mildew' },
                { name: 'Corn (Maize)', diseases: 'Common Rust, Northern Leaf Blight' },
                { name: 'Pepper Bell', diseases: 'Bacterial Spot, Healthy Canopy' },
              ].map((crop, idx) => (
                <div key={idx} style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '0.65rem', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{crop.name}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{crop.diseases}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Diseases Grid */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">Common Crop Diseases</h2>
            <p className="section-subtitle">Study pathology visual signatures, pathogen mechanisms, and preventive methods</p>
          </div>
          <Link to="/diseases" className="btn btn-outline btn-sm" id="btn-view-all-diseases">
            View All Diseases <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid-4">
          {FEATURED_DISEASES.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-category">{item.plant}</span>
                  <span className="badge badge-diseased" style={{ fontSize: '0.7rem' }}>{item.tag}</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.5rem' }}>{item.disease}</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {item.desc}
                </p>
              </div>
              <Link to="/diseases" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                Read Full Pathology
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section 
        style={{ 
          background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)', 
          color: '#ffffff', 
          padding: '3rem 2rem', 
          borderRadius: '1.25rem', 
          textAlign: 'center',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        <h2 style={{ color: '#ffffff', fontSize: '2.2rem', marginBottom: '0.75rem' }}>
          Start Scanning Your Crops In Seconds
        </h2>
        <p style={{ color: '#d1fae5', maxWidth: '650px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
          No complex laboratory testing required. Upload an image right from your field or use sample test leaves to explore how our CNN identifies plant health.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/upload" className="btn btn-secondary btn-lg" style={{ color: '#064e3b' }} id="btn-cta-scan">
            <UploadCloud size={18} /> Launch Scanner
          </Link>
          <button onClick={() => setShowSampleModal(true)} className="btn btn-outline btn-lg" style={{ color: '#ffffff', borderColor: '#34d399' }} id="btn-cta-sample">
            <Sparkles size={18} /> Test Botanical Samples
          </button>
        </div>
      </section>

      {/* Sample Leaf Selector Modal */}
      <SampleLeavesModal 
        isOpen={showSampleModal} 
        onClose={() => setShowSampleModal(false)} 
        onSelectSample={handleSelectSample} 
      />
    </div>
  );
};

export default Home;
