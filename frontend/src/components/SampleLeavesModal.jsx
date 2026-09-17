import React from 'react';
import { Leaf, Sparkles, Check } from 'lucide-react';

const SAMPLES = [
  {
    id: 'tomato-early-blight',
    plantName: 'Tomato',
    diseaseName: 'Tomato Early Blight',
    description: 'Concentric dark target spots with yellowing halos.',
    themeColor: '#b45309',
    generator: (ctx) => {
      // Background / Leaf base
      ctx.fillStyle = '#2d6a4f';
      ctx.beginPath();
      ctx.ellipse(120, 120, 95, 75, 0.2, 0, Math.PI * 2);
      ctx.fill();
      // Veins
      ctx.strokeStyle = '#52b788';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(35, 120);
      ctx.lineTo(205, 120);
      ctx.stroke();
      // Chlorosis (yellow rings)
      ctx.fillStyle = 'rgba(234, 179, 8, 0.75)';
      ctx.beginPath();
      ctx.arc(90, 95, 32, 0, Math.PI * 2);
      ctx.arc(150, 135, 26, 0, Math.PI * 2);
      ctx.fill();
      // Early Blight Necrotic Target Spots (dark brown with concentric rings)
      ctx.fillStyle = '#3f1d14';
      ctx.beginPath();
      ctx.arc(90, 95, 20, 0, Math.PI * 2);
      ctx.arc(150, 135, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1c0f0a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(90, 95, 12, 0, Math.PI * 2);
      ctx.stroke();
    }
  },
  {
    id: 'tomato-late-blight',
    plantName: 'Tomato',
    diseaseName: 'Tomato Late Blight',
    description: 'Water-soaked purplish brown decay patches.',
    themeColor: '#4a044e',
    generator: (ctx) => {
      ctx.fillStyle = '#1e3a2f';
      ctx.beginPath();
      ctx.ellipse(120, 120, 95, 75, -0.1, 0, Math.PI * 2);
      ctx.fill();
      // Late Blight water-soaked large dark blotches
      ctx.fillStyle = '#2e1065';
      ctx.beginPath();
      ctx.ellipse(80, 85, 45, 35, 0.4, 0, Math.PI * 2);
      ctx.ellipse(155, 135, 40, 30, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#18020c';
      ctx.beginPath();
      ctx.ellipse(80, 85, 28, 20, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  {
    id: 'grape-powdery-mildew',
    plantName: 'Grape',
    diseaseName: 'Grape Powdery Mildew',
    description: 'White powdery floury dust covering leaf surface.',
    themeColor: '#64748b',
    generator: (ctx) => {
      ctx.fillStyle = '#2d6a4f';
      ctx.beginPath();
      ctx.arc(120, 120, 85, 0, Math.PI * 2);
      ctx.fill();
      // White powdery mold patches
      ctx.fillStyle = 'rgba(241, 245, 249, 0.85)';
      for (let i = 0; i < 60; i++) {
        const x = 70 + Math.random() * 100;
        const y = 70 + Math.random() * 100;
        const r = 4 + Math.random() * 14;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
  {
    id: 'apple-cedar-rust',
    plantName: 'Apple',
    diseaseName: 'Apple Cedar Rust',
    description: 'Bright cinnamon-orange rust spots.',
    themeColor: '#c2410c',
    generator: (ctx) => {
      ctx.fillStyle = '#1b4332';
      ctx.beginPath();
      ctx.ellipse(120, 120, 90, 65, 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Rust pustules (orange with dark pinpoint center)
      const spots = [[80, 90], [130, 80], [160, 120], [105, 140], [70, 145]];
      spots.forEach(([x, y]) => {
        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#7c2d12';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  },
  {
    id: 'tomato-healthy',
    plantName: 'Tomato',
    diseaseName: 'Tomato Healthy Leaf',
    description: 'Vibrant green chlorophyll leaf with no spots.',
    themeColor: '#10b981',
    generator: (ctx) => {
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.ellipse(120, 120, 95, 75, 0.1, 0, Math.PI * 2);
      ctx.fill();
      // Bright fresh leaf veins
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(35, 120);
      ctx.lineTo(205, 120);
      ctx.moveTo(80, 120);
      ctx.lineTo(110, 70);
      ctx.moveTo(140, 120);
      ctx.lineTo(170, 80);
      ctx.moveTo(90, 120);
      ctx.lineTo(70, 165);
      ctx.moveTo(140, 120);
      ctx.lineTo(120, 165);
      ctx.stroke();
    }
  }
];

const SampleLeavesModal = ({ isOpen, onClose, onSelectSample }) => {
  if (!isOpen) return null;

  const handleSelect = (sample) => {
    // Generate actual canvas leaf and convert to File
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 240, 240);
    
    // Draw leaf
    sample.generator(ctx);

    canvas.toBlob((blob) => {
      const file = new File([blob], `${sample.id}.png`, { type: 'image/png' });
      onSelectSample(file, canvas.toDataURL());
      onClose();
    }, 'image/png');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Sparkles color="var(--primary-600)" size={22} />
            <h3 style={{ fontSize: '1.3rem' }}>Select a Botanical Test Sample</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Instantly test the Java CNN classification engine using realistic plant leaf pathology samples:
        </p>

        <div className="grid-3" style={{ gap: '1rem' }}>
          {SAMPLES.map((sample) => (
            <div 
              key={sample.id}
              onClick={() => handleSelect(sample)}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '0.85rem',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-500)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              id={`sample-leaf-${sample.id}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: sample.themeColor }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>{sample.plantName}</span>
              </div>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.35rem' }}>{sample.diseaseName}</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                {sample.description}
              </p>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                <Leaf size={13} /> Select &amp; Run CNN
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SampleLeavesModal;
