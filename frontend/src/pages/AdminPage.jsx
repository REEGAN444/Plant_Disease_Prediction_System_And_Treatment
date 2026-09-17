import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import {
  ShieldCheck,
  Users,
  Leaf,
  ShoppingBag,
  Activity,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  Cpu,
  FlaskConical,
} from 'lucide-react';

/* ─── helpers ─── */
const emptyDisease = {
  plantName: '',
  diseaseName: '',
  diseaseCause: '',
  diseaseEffect: '',
  prevention: '',
};

const emptyProduct = {
  name: '',
  category: 'Fertilizer',
  description: '',
  price: '',
  productType: 'Natural',
  availability: 'In Stock',
  plantName: '',
};

/* ─── Admin Page ─── */
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  /* ── stats ── */
  const [stats, setStats] = useState(null);

  /* ── diseases ── */
  const [diseases, setDiseases] = useState([]);
  const [diseaseForm, setDiseaseForm] = useState(emptyDisease);
  const [editingDiseaseId, setEditingDiseaseId] = useState(null);
  const [diseaseMsg, setDiseaseMsg] = useState({ type: '', text: '' });

  /* ── products ── */
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productMsg, setProductMsg] = useState({ type: '', text: '' });

  /* ── users ── */
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const showMsg = (setMsg, type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: '', text: '' }), 3500);
  };

  /* ── Load Data ── */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, diseaseRes, productRes, userRes] = await Promise.allSettled([
          axiosClient.get('/admin/stats'),
          axiosClient.get('/diseases'),
          axiosClient.get('/products'),
          axiosClient.get('/admin/users'),
        ]);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value?.data || statsRes.value);
        if (diseaseRes.status === 'fulfilled') {
          const d = diseaseRes.value?.data || diseaseRes.value;
          setDiseases(Array.isArray(d) ? d : []);
        }
        if (productRes.status === 'fulfilled') {
          const p = productRes.value?.data || productRes.value;
          setProducts(Array.isArray(p) ? p : []);
        }
        if (userRes.status === 'fulfilled') {
          const u = userRes.value?.data || userRes.value;
          setUsers(Array.isArray(u) ? u : []);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ── Disease CRUD ── */
  const handleDiseaseSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDiseaseId) {
        await axiosClient.put(`/diseases/${editingDiseaseId}`, diseaseForm);
        setDiseases((prev) =>
          prev.map((d) => (d.id === editingDiseaseId ? { ...d, ...diseaseForm } : d))
        );
        showMsg(setDiseaseMsg, 'success', 'Disease updated successfully.');
      } else {
        const res = await axiosClient.post('/diseases', diseaseForm);
        const created = res?.data || res;
        setDiseases((prev) => [...prev, created]);
        showMsg(setDiseaseMsg, 'success', 'Disease added successfully.');
      }
      setDiseaseForm(emptyDisease);
      setEditingDiseaseId(null);
    } catch (err) {
      showMsg(setDiseaseMsg, 'error', err.message || 'Failed to save disease.');
    }
  };

  const handleEditDisease = (d) => {
    setDiseaseForm({
      plantName: d.plantName || '',
      diseaseName: d.diseaseName || '',
      diseaseCause: d.diseaseCause || '',
      diseaseEffect: d.diseaseEffect || '',
      prevention: d.prevention || '',
    });
    setEditingDiseaseId(d.id);
    setActiveTab('diseases');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteDisease = async (id) => {
    if (!window.confirm('Delete this disease record?')) return;
    try {
      await axiosClient.delete(`/diseases/${id}`);
      setDiseases((prev) => prev.filter((d) => d.id !== id));
      showMsg(setDiseaseMsg, 'success', 'Disease deleted.');
    } catch (err) {
      showMsg(setDiseaseMsg, 'error', err.message || 'Delete failed.');
    }
  };

  /* ── Product CRUD ── */
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...productForm, price: parseFloat(productForm.price) };
    try {
      if (editingProductId) {
        await axiosClient.put(`/products/${editingProductId}`, payload);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProductId ? { ...p, ...payload } : p))
        );
        showMsg(setProductMsg, 'success', 'Product updated successfully.');
      } else {
        const res = await axiosClient.post('/products', payload);
        const created = res?.data || res;
        setProducts((prev) => [...prev, created]);
        showMsg(setProductMsg, 'success', 'Product added successfully.');
      }
      setProductForm(emptyProduct);
      setEditingProductId(null);
    } catch (err) {
      showMsg(setProductMsg, 'error', err.message || 'Failed to save product.');
    }
  };

  const handleEditProduct = (p) => {
    setProductForm({
      name: p.name || '',
      category: p.category || 'Fertilizer',
      description: p.description || '',
      price: p.price?.toString() || '',
      productType: p.productType || 'Natural',
      availability: p.availability || 'In Stock',
      plantName: p.plantName || '',
    });
    setEditingProductId(p.id);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axiosClient.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showMsg(setProductMsg, 'success', 'Product deleted.');
    } catch (err) {
      showMsg(setProductMsg, 'error', err.message || 'Delete failed.');
    }
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: <Activity size={15} /> },
    { key: 'diseases', label: 'Diseases', icon: <Leaf size={15} /> },
    { key: 'products', label: 'Products', icon: <ShoppingBag size={15} /> },
    { key: 'users', label: 'Users', icon: <Users size={15} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <span className="badge badge-diseased" style={{ marginBottom: '0.5rem' }}>
          <ShieldCheck size={12} /> Admin Console
        </span>
        <h1 className="section-title">System Administration Panel</h1>
        <p className="section-subtitle">
          Manage diseases, agro products, and registered farmer accounts.
        </p>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          background: '#f1f5f9',
          padding: '0.35rem',
          borderRadius: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`btn btn-sm ${activeTab === t.key ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', background: activeTab === t.key ? undefined : 'transparent' }}
            id={`admin-tab-${t.key}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
          <Cpu size={28} color="#cbd5e1" style={{ marginBottom: '0.5rem' }} />
          <div className="animate-pulse-glow">Loading admin data...</div>
        </div>
      )}

      {/* ── Overview Tab ── */}
      {activeTab === 'overview' && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="grid-4">
            {[
              { label: 'Total Users', value: stats?.totalUsers ?? users.length, icon: <Users size={22} />, bg: '#eff6ff', col: '#1d4ed8' },
              { label: 'Disease Records', value: stats?.totalDiseases ?? diseases.length, icon: <Leaf size={22} />, bg: '#fef2f2', col: '#b91c1c' },
              { label: 'Products Listed', value: stats?.totalProducts ?? products.length, icon: <ShoppingBag size={22} />, bg: '#f0fdf4', col: '#15803d' },
              { label: 'Total Predictions', value: stats?.totalPredictions ?? '—', icon: <Activity size={22} />, bg: '#fef3c7', col: '#b45309' },
            ].map((s, i) => (
              <div
                key={i}
                className="glass-card"
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.4rem' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: s.bg, color: s.col, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>{s.value}</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Diseases Tab ── */}
      {activeTab === 'diseases' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Form */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {editingDiseaseId ? <Edit3 size={17} color="var(--primary-600)" /> : <Plus size={17} color="var(--primary-600)" />}
              {editingDiseaseId ? 'Edit Disease Record' : 'Add New Disease'}
            </h3>

            {diseaseMsg.text && (
              <div className={`alert ${diseaseMsg.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                {diseaseMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                <span>{diseaseMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleDiseaseSubmit} id="admin-disease-form">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Plant Name *</label>
                  <input className="form-input" placeholder="e.g. Tomato" value={diseaseForm.plantName} onChange={(e) => setDiseaseForm((f) => ({ ...f, plantName: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Disease Name *</label>
                  <input className="form-input" placeholder="e.g. Early Blight" value={diseaseForm.diseaseName} onChange={(e) => setDiseaseForm((f) => ({ ...f, diseaseName: e.target.value }))} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Disease Cause *</label>
                <textarea className="form-textarea" placeholder="Describe the etiological cause..." value={diseaseForm.diseaseCause} onChange={(e) => setDiseaseForm((f) => ({ ...f, diseaseCause: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Disease Effect *</label>
                <textarea className="form-textarea" placeholder="Describe pathological effects on the plant..." value={diseaseForm.diseaseEffect} onChange={(e) => setDiseaseForm((f) => ({ ...f, diseaseEffect: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Prevention Methods *</label>
                <textarea className="form-textarea" placeholder="Cultural, chemical, and agronomic prevention strategies..." value={diseaseForm.prevention} onChange={(e) => setDiseaseForm((f) => ({ ...f, prevention: e.target.value }))} required />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" className="btn btn-primary" id="btn-save-disease">
                  {editingDiseaseId ? <Edit3 size={15} /> : <Plus size={15} />}
                  {editingDiseaseId ? 'Update Disease' : 'Add Disease'}
                </button>
                {editingDiseaseId && (
                  <button type="button" className="btn btn-outline" onClick={() => { setDiseaseForm(emptyDisease); setEditingDiseaseId(null); }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Disease Table */}
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Plant</th>
                  <th>Disease</th>
                  <th>Cause (preview)</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {diseases.map((d) => (
                  <tr key={d.id} id={`admin-disease-row-${d.id}`}>
                    <td>
                      <span className="badge badge-category">{d.plantName}</span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{d.diseaseName}</td>
                    <td style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '280px' }}>
                      {d.diseaseCause?.slice(0, 80)}{d.diseaseCause?.length > 80 ? '...' : ''}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => handleEditDisease(d)} id={`btn-edit-disease-${d.id}`}>
                          <Edit3 size={13} /> Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteDisease(d.id)} id={`btn-delete-disease-${d.id}`}>
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {diseases.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No diseases found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Products Tab ── */}
      {activeTab === 'products' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Form */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {editingProductId ? <Edit3 size={17} color="var(--primary-600)" /> : <Plus size={17} color="var(--primary-600)" />}
              {editingProductId ? 'Edit Product' : 'Add New Product'}
            </h3>

            {productMsg.text && (
              <div className={`alert ${productMsg.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                {productMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                <span>{productMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleProductSubmit} id="admin-product-form">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input className="form-input" placeholder="e.g. Neem Bio-Fungicide" value={productForm.name} onChange={(e) => setProductForm((f) => ({ ...f, name: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select className="form-select" value={productForm.category} onChange={(e) => setProductForm((f) => ({ ...f, category: e.target.value }))}>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Medicine">Medicine / Fungicide</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Product Type *</label>
                  <select className="form-select" value={productForm.productType} onChange={(e) => setProductForm((f) => ({ ...f, productType: e.target.value }))}>
                    <option value="Natural">Natural / Organic</option>
                    <option value="Artificial">Synthetic / Mineral</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Price (USD) *</label>
                  <input className="form-input" type="number" step="0.01" min="0" placeholder="e.g. 12.99" value={productForm.price} onChange={(e) => setProductForm((f) => ({ ...f, price: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Associated Plant</label>
                  <input className="form-input" placeholder="e.g. Tomato (optional)" value={productForm.plantName} onChange={(e) => setProductForm((f) => ({ ...f, plantName: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Availability</label>
                  <select className="form-select" value={productForm.availability} onChange={(e) => setProductForm((f) => ({ ...f, availability: e.target.value }))}>
                    <option value="In Stock">In Stock</option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-textarea" placeholder="Describe the product, its active ingredients, and use case..." value={productForm.description} onChange={(e) => setProductForm((f) => ({ ...f, description: e.target.value }))} required />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" className="btn btn-primary" id="btn-save-product">
                  {editingProductId ? <Edit3 size={15} /> : <Plus size={15} />}
                  {editingProductId ? 'Update Product' : 'Add Product'}
                </button>
                {editingProductId && (
                  <button type="button" className="btn btn-outline" onClick={() => { setProductForm(emptyProduct); setEditingProductId(null); }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Product Table */}
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} id={`admin-product-row-${p.id}`}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td><span className="badge badge-category">{p.category}</span></td>
                    <td>
                      <span className={`badge ${p.productType?.toLowerCase() === 'natural' ? 'badge-natural' : 'badge-artificial'}`}>
                        {p.productType?.toLowerCase() === 'natural' ? <Leaf size={11} /> : <FlaskConical size={11} />}
                        {p.productType}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--primary-700)' }}>${Number(p.price).toFixed(2)}</td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{p.availability}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => handleEditProduct(p)} id={`btn-edit-product-${p.id}`}>
                          <Edit3 size={13} /> Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(p.id)} id={`btn-delete-product-${p.id}`}>
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Users Tab ── */}
      {activeTab === 'users' && (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} id={`admin-user-row-${u.id}`}>
                  <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>#{u.id}</td>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ color: '#64748b' }}>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'ADMIN' ? 'badge-diseased' : 'badge-natural'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '—'}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
