import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const AnalyticsPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if already authenticated
        const token = localStorage.getItem('item');
        if (token) {
            checkAdminStatus();
        }
    }, []);

    const checkAdminStatus = async () => {
        try {
            const token = localStorage.getItem('item');
            const apiUrl = process.env.REACT_APP_API_URL || '';
            const response = await fetch(`${apiUrl}/api/analytics/summary?timeRange=1`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Login with email and password
            const apiUrl = process.env.REACT_APP_API_URL || '';
            const loginRes = await fetch(`${apiUrl}/api/realUser/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const loginData = await loginRes.json();

            if (loginRes.ok) {
                // Store token
                localStorage.setItem('item', loginData.token);
                
                // Check if admin
                const analyticsRes = await fetch(`${apiUrl}/api/analytics/summary?timeRange=1`, {
                    headers: {
                        'Authorization': `Bearer ${loginData.token}`
                    }
                });

                if (analyticsRes.ok) {
                    setIsAuthenticated(true);
                } else {
                    setError('Admin access required');
                    localStorage.removeItem('item');
                }
            } else {
                setError(loginData.error || 'Login failed');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: 'rgba(26, 26, 26, 0.9)',
                        backdropFilter: 'blur(10px)',
                        padding: '3rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        width: '100%',
                        maxWidth: '400px'
                    }}
                >
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '2rem',
                        color: '#fff',
                        textAlign: 'center'
                    }}>
                        Analytics Dashboard
                    </h2>
                    
                    <p style={{
                        color: '#888',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}>
                        Admin access required
                    </p>

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="email"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        {error && (
                            <div style={{
                                color: '#ef4444',
                                marginBottom: '1rem',
                                textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: loading ? '#444' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'transform 0.2s'
                            }}
                            onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            {loading ? 'Authenticating...' : 'Access Dashboard'}
                        </button>
                    </form>

                    <div style={{
                        marginTop: '2rem',
                        textAlign: 'center'
                    }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                color: '#888',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Back to Home
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return <AnalyticsDashboard />;
};

export default AnalyticsPage;