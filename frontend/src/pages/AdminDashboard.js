import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [freeReportUsers, setFreeReportUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactStats, setContactStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch free report users
      const usersRes = await fetch('/api/free-reports/users');
      const usersData = await usersRes.json();
      if (usersRes.ok) {
        setFreeReportUsers(usersData.users || []);
      }

      // Fetch contacts
      const contactsRes = await fetch('/api/contact');
      const contactsData = await contactsRes.json();
      if (contactsRes.ok) {
        setContacts(contactsData.contacts || []);
      }

      // Fetch contact stats
      const statsRes = await fetch('/api/contact/stats');
      const statsData = await statsRes.json();
      if (statsRes.ok) {
        setContactStats(statsData.stats);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`/api/free-reports/users/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchData();
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/contact/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const exportUsers = async () => {
    try {
      const res = await fetch('/api/free-reports/export');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'free-report-users.csv';
      a.click();
    } catch (error) {
      console.error('Error exporting users:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#0d1117', 
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center' 
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '50px',
            height: '50px',
            border: '3px solid #00ff7f',
            borderTopColor: 'transparent',
            borderRadius: '50%'
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0d1117', 
      color: '#ffffff',
      paddingTop: '80px',
      padding: '100px 20px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#00ff7f' }}>
          Admin Dashboard
        </h1>

        {/* Stats Overview */}
        {contactStats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Total Contacts</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{contactStats.total}</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Today's Contacts</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{contactStats.today}</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Free Report Users</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{freeReportUsers.length}</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button
            onClick={() => setActiveTab('freeReports')}
            style={{
              background: activeTab === 'freeReports' ? '#00ff7f' : 'transparent',
              color: activeTab === 'freeReports' ? '#0d1117' : '#ffffff',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '5px 5px 0 0'
            }}
          >
            Free Report Users ({freeReportUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            style={{
              background: activeTab === 'contacts' ? '#00ff7f' : 'transparent',
              color: activeTab === 'contacts' ? '#0d1117' : '#ffffff',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '5px 5px 0 0'
            }}
          >
            Contact Messages ({contacts.length})
          </button>
        </div>

        {/* Free Report Users Tab */}
        {activeTab === 'freeReports' && (
          <div>
            <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
              <button
                onClick={exportUsers}
                style={{
                  background: '#00ff7f',
                  color: '#0d1117',
                  border: 'none',
                  padding: '0.5rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderRadius: '5px'
                }}
              >
                Export CSV
              </button>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Occupation</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Registered</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {freeReportUsers.map((user) => (
                    <tr key={user._id} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '1rem' }}>{user.name}</td>
                      <td style={{ padding: '1rem' }}>{user.email}</td>
                      <td style={{ padding: '1rem' }}>{user.occupation}</td>
                      <td style={{ padding: '1rem' }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          style={{
                            background: '#ff4444',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            borderRadius: '3px'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Message</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '1rem' }}>{contact.name}</td>
                    <td style={{ padding: '1rem' }}>{contact.email}</td>
                    <td style={{ padding: '1rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {contact.message}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.85rem',
                        background: 
                          contact.status === 'new' ? '#ff4444' :
                          contact.status === 'read' ? '#ffaa00' :
                          contact.status === 'replied' ? '#00ff7f' :
                          '#666666',
                        color: '#ffffff'
                      }}>
                        {contact.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <select
                        value={contact.status}
                        onChange={(e) => handleUpdateContactStatus(contact._id, e.target.value)}
                        style={{
                          background: '#1a1a1a',
                          color: '#ffffff',
                          border: '1px solid #333',
                          padding: '0.25rem',
                          borderRadius: '3px'
                        }}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;