import React, { useState } from 'react';
import { ShoppingCart, CheckCircle2, Leaf, FlaskConical, AlertCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const isNatural = product.productType?.toLowerCase() === 'natural';

  const handleOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <>
      <div className="product-card" id={`product-card-${product.id}`}>
        <div className={`product-card-type-stripe ${isNatural ? 'type-stripe-natural' : 'type-stripe-artificial'}`} />
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className={`badge ${isNatural ? 'badge-natural' : 'badge-artificial'}`}>
              {isNatural ? <Leaf size={12} /> : <FlaskConical size={12} />}
              {product.productType}
            </span>
            <span className="badge badge-category">
              {product.category || 'Agro Item'}
            </span>
          </div>

          <h4 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 600 }}>
            {product.name}
          </h4>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
            {product.description}
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div className="product-price">
              ${Number(product.price).toFixed(2)}
            </div>
            <span className="badge badge-instock" style={{ fontSize: '0.75rem' }}>
              <CheckCircle2 size={12} /> {product.availability || 'In Stock'}
            </span>
          </div>

          <button 
            onClick={() => setShowModal(true)} 
            className="btn btn-secondary btn-sm"
            style={{ width: '100%' }}
            id={`btn-product-buy-${product.id}`}
          >
            <ShoppingCart size={15} /> View Details &amp; Purchase
          </button>
        </div>
      </div>

      {/* Purchase Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => !orderPlaced && setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem' }}>Product Procurement</h3>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            {orderPlaced ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#166534' }}>Order Placed Successfully!</h4>
                <p style={{ color: '#64748b' }}>A dispatch request for <strong>{product.name}</strong> has been logged with regional agro-distributors.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '10px', background: isNatural ? 'var(--primary-100)' : '#dbeafe', color: isNatural ? 'var(--primary-700)' : '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {isNatural ? <Leaf size={26} /> : <FlaskConical size={26} />}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', color: '#0f172a' }}>{product.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Category: {product.category} &bull; Classification: {product.productType}</p>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#334155' }}>
                  <p><strong>Description:</strong> {product.description}</p>
                  <p style={{ marginTop: '0.5rem' }}><strong>Recommended Dosage:</strong> Apply 2-3ml per liter of water as foliar spray in early morning or late evening.</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Unit Price</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-700)' }}>${Number(product.price).toFixed(2)}</div>
                  </div>
                  <span className="badge badge-instock">Guaranteed Availability</span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                  <button onClick={handleOrder} className="btn btn-primary" id="btn-confirm-order">
                    <ShoppingCart size={16} /> Confirm Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
