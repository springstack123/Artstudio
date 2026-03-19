import { useState, useEffect } from 'react';

export default function AdminDashboard({ showPage, user, token }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('Please login as admin');
      setLoading(false);
      return;
    }

    fetch('http://localhost:8080/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
          setLoading(false);
        } else {
          throw new Error(data.message || 'Failed to load stats');
        }
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  if (!user || user.role !== "admin") {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h2>Access Denied</h2>
      <p>You don't have permission to view this page.</p>
      <button onClick={() => showPage("home")}>Go Home</button>
    </div>
  );
}

if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return (
    <div className="admin-error">
      <h2>Admin Dashboard</h2>
      <p style={{ color: 'red' }}>{error}</p>
      <p>Login as admin@example.com / admin123</p>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <style>{`
        .admin-dashboard { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .admin-header { text-align: center; margin-bottom: 3rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        .stat-card { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 2rem; text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.2); }
        .stat-number { font-size: 3rem; font-weight: 800; color: #1a1a1a; margin-bottom: .5rem; }
        .stat-label { font-size: 1.1rem; color: #6c757d; text-transform: uppercase; letter-spacing: 1px; }
        .recent-orders { background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
        .recent-title { font-size: 1.5rem; margin-bottom: 1.5rem; color: #1a1a1a; }
        .order-item { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid #eee; }
        .order-item:last-child { border-bottom: none; }
        .order-left { display: flex; flex-direction: column; }
        .order-customer { font-weight: 600; }
        .order-status { font-size: .85rem; color: #28a745; text-transform: uppercase; letter-spacing: .5px; }
        .order-amount { font-weight: 700; color: #b8956a; font-size: 1.1rem; }
      `}</style>

      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.name}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalUsers.toLocaleString()}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalOrders.toLocaleString()}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹{stats.totalRevenue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
      </div>

      <div className="recent-orders">
        <h2 className="recent-title">Recent Orders</h2>
        {stats.recentOrders.length === 0 ? (
          <p>No recent orders</p>
        ) : (
          stats.recentOrders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-left">
                <div className="order-customer">{order.customerName}</div>
                <div className="order-status">{order.status}</div>
              </div>
              <div className="order-amount">₹{order.totalAmount.toLocaleString('en-IN')}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
