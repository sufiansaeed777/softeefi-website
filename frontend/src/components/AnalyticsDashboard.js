import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnalyticsDashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState(24);
    const [selectedMetric, setSelectedMetric] = useState('all');

    useEffect(() => {
        fetchAnalytics();
    }, [timeRange]);

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem('item');
            const apiUrl = process.env.REACT_APP_API_URL || '';
            const response = await fetch(`${apiUrl}/api/analytics/summary?timeRange=${timeRange}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch analytics');
            }

            const data = await response.json();
            setAnalytics(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getMetricColor = (rating) => {
        switch(rating) {
            case 'good': return '#10b981';
            case 'needs-improvement': return '#f59e0b';
            case 'poor': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const formatMetricName = (metric) => {
        const names = {
            'LCP': 'Largest Contentful Paint',
            'FID': 'First Input Delay',
            'CLS': 'Cumulative Layout Shift',
            'FCP': 'First Contentful Paint',
            'TTFB': 'Time to First Byte',
            'INP': 'Interaction to Next Paint'
        };
        return names[metric] || metric;
    };

    const formatValue = (metric, value) => {
        if (['LCP', 'FCP', 'TTFB', 'FID', 'INP'].includes(metric)) {
            return `${Math.round(value)}ms`;
        }
        if (metric === 'CLS') {
            return value.toFixed(3);
        }
        return value;
    };

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#666' }}>Loading analytics...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
                Error: {error}
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', background: '#0a0a0a', minHeight: '100vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    marginBottom: '2rem',
                    color: '#fff'
                }}>
                    Analytics Dashboard
                </h2>

                {/* Time Range Selector */}
                <div style={{ marginBottom: '2rem' }}>
                    <select 
                        value={timeRange} 
                        onChange={(e) => setTimeRange(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            background: '#1a1a1a',
                            color: '#fff',
                            border: '1px solid #333'
                        }}
                    >
                        <option value="1">Last Hour</option>
                        <option value="24">Last 24 Hours</option>
                        <option value="168">Last Week</option>
                        <option value="720">Last Month</option>
                    </select>
                </div>

                {/* Quick Stats */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        background: '#1a1a1a',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid #333'
                    }}>
                        <div style={{ color: '#888', marginBottom: '0.5rem' }}>Total Page Views</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
                            {analytics?.stats?.totalPageViews || 0}
                        </div>
                    </div>

                    <div style={{
                        background: '#1a1a1a',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid #333'
                    }}>
                        <div style={{ color: '#888', marginBottom: '0.5rem' }}>Unique Sessions</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
                            {analytics?.stats?.uniqueSessions || 0}
                        </div>
                    </div>

                    {analytics?.stats?.deviceStats?.map(device => (
                        <div key={device._id} style={{
                            background: '#1a1a1a',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #333'
                        }}>
                            <div style={{ color: '#888', marginBottom: '0.5rem' }}>
                                {device._id || 'Unknown'} Users
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
                                {device.count}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Web Vitals */}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Web Vitals Performance
                </h3>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    {analytics?.vitals?.map(vital => (
                        <motion.div 
                            key={vital._id}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                background: '#1a1a1a',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid #333'
                            }}
                        >
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#fff' }}>
                                        {vital._id}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#888' }}>
                                        {formatMetricName(vital._id)}
                                    </div>
                                </div>
                                <div style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>
                                    {formatValue(vital._id, vital.avgValue)}
                                </div>
                            </div>

                            {/* Performance Bar */}
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '0.25rem',
                                    height: '8px'
                                }}>
                                    <div style={{
                                        flex: vital.goodCount || 0,
                                        background: '#10b981',
                                        borderRadius: '4px'
                                    }} />
                                    <div style={{
                                        flex: vital.needsImprovementCount || 0,
                                        background: '#f59e0b',
                                        borderRadius: '4px'
                                    }} />
                                    <div style={{
                                        flex: vital.poorCount || 0,
                                        background: '#ef4444',
                                        borderRadius: '4px'
                                    }} />
                                </div>
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                fontSize: '0.75rem',
                                color: '#888'
                            }}>
                                <span>Min: {formatValue(vital._id, vital.minValue)}</span>
                                <span>Max: {formatValue(vital._id, vital.maxValue)}</span>
                                <span>Count: {vital.count}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Popular Pages */}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Top Pages (Last 7 Days)
                </h3>
                <div style={{
                    background: '#1a1a1a',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #333'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #333' }}>
                                <th style={{ 
                                    padding: '1rem', 
                                    textAlign: 'left',
                                    color: '#888'
                                }}>
                                    Page
                                </th>
                                <th style={{ 
                                    padding: '1rem', 
                                    textAlign: 'right',
                                    color: '#888'
                                }}>
                                    Views
                                </th>
                                <th style={{ 
                                    padding: '1rem', 
                                    textAlign: 'right',
                                    color: '#888'
                                }}>
                                    Unique Views
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics?.pageViews?.slice(0, 10).map((page, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #222' }}>
                                    <td style={{ padding: '1rem', color: '#fff' }}>
                                        {page.page}
                                    </td>
                                    <td style={{ 
                                        padding: '1rem', 
                                        textAlign: 'right',
                                        color: '#fff'
                                    }}>
                                        {page.views}
                                    </td>
                                    <td style={{ 
                                        padding: '1rem', 
                                        textAlign: 'right',
                                        color: '#888'
                                    }}>
                                        {page.uniqueViews}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsDashboard;