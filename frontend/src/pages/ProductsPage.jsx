import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, Search, Leaf, FlaskConical, SlidersHorizontal, AlertTriangle } from 'lucide-react';

const ProductsPage = ({ defaultCategory = 'ALL' }) => {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(defaultCategory);
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'ALL');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get('/products');
        const list = res?.data || res || [];
        setProducts(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err.message || 'Failed to load products from server.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters
  let filtered = products.filter((p) => {
    const matchSearch =
      !searchTerm ||
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    const matchType = typeFilter === 'ALL' || p.productType?.toLowerCase() === typeFilter.toLowerCase();
    return matchSearch && matchCat && matchType;
  });

  // Sort
  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const naturalCount = products.filter((p) => p.productType?.toLowerCase() === 'natural').length;
  const artificialCount = products.filter((p) => p.productType?.toLowerCase() === 'artificial').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="section-header">
        <div>
          <span className="badge badge-natural" style={{ marginBottom: '0.5rem' }}>
            <ShoppingBag size={12} /> Agro Marketplace
          </span>
          <h1 className="section-title">Fertilizers & Botanical Medicines</h1>
          <p className="section-subtitle">
            Curated organic and synthetic formulations matched to diagnosed plant pathologies.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div
            style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '0.6rem 1rem',
              borderRadius: '0.65rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-700)' }}>{naturalCount}</div>
            <div style={{ fontSize: '0.72rem', color: '#047857' }}>Natural</div>
          </div>
          <div
            style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              padding: '0.6rem 1rem',
              borderRadius: '0.65rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1d4ed8' }}>{artificialCount}</div>
            <div style={{ fontSize: '0.72rem', color: '#2563eb' }}>Synthetic</div>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search
            size={17}
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Search product name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
            id="products-search-input"
          />
        </div>

        {/* Category */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['ALL', 'Fertilizer', 'Medicine'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`btn btn-sm ${categoryFilter === cat ? 'btn-primary' : 'btn-outline'}`}
              id={`filter-cat-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Type */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => setTypeFilter('ALL')}
            className={`btn btn-sm ${typeFilter === 'ALL' ? 'btn-primary' : 'btn-outline'}`}
            id="filter-type-all"
          >
            All Types
          </button>
          <button
            onClick={() => setTypeFilter('Natural')}
            className={`btn btn-sm ${typeFilter === 'Natural' ? 'btn-primary' : 'btn-outline'}`}
            id="filter-type-natural"
          >
            <Leaf size={14} /> Natural
          </button>
          <button
            onClick={() => setTypeFilter('Artificial')}
            className={`btn btn-sm ${typeFilter === 'Artificial' ? 'btn-primary' : 'btn-outline'}`}
            id="filter-type-artificial"
          >
            <FlaskConical size={14} /> Synthetic
          </button>
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <SlidersHorizontal size={15} color="#64748b" />
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
            id="products-sort-select"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <AlertTriangle size={17} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          <div className="animate-pulse-glow">Loading agro products...</div>
        </div>
      ) : (
        <>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Showing <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> of {products.length} products
          </div>

          {filtered.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <ShoppingBag size={40} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: '#475569', marginBottom: '0.5rem' }}>No Products Found</h3>
              <p style={{ color: '#94a3b8' }}>Try adjusting filters or search terms.</p>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
