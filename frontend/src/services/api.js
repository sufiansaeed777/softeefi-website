import { captureError } from '../utils/sentry';

// API Configuration
// Use empty string for relative URLs if REACT_APP_API_URL is not set
const API_BASE_URL = process.env.REACT_APP_API_URL || '';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000;

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to handle API errors
const handleError = (error, context = {}) => {
  // Log to Sentry in production
  captureError(error, context);
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', error, context);
  }
  
  // Return user-friendly error message
  if (error.message === 'Failed to fetch') {
    throw new Error('Network error. Please check your connection and try again.');
  }
  
  throw error;
};

// Request wrapper with timeout
const fetchWithTimeout = (url, options = {}) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    return fetch(url, {
      ...options,
      signal: controller.signal
    }).finally(() => clearTimeout(timeout));
  } catch (error) {
    // Fallback to regular fetch if AbortController not supported
    return fetch(url, options);
  }
};

// Main API service object
const api = {
  // Generic GET request
  get: async (endpoint, options = {}) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error, { endpoint, method: 'GET' });
    }
  },

  // Generic POST request
  post: async (endpoint, data = {}, options = {}) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error, { endpoint, method: 'POST', data });
    }
  },

  // Generic PUT request
  put: async (endpoint, data = {}, options = {}) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error, { endpoint, method: 'PUT', data });
    }
  },

  // Generic DELETE request
  delete: async (endpoint, options = {}) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error, { endpoint, method: 'DELETE' });
    }
  },

  // File upload
  upload: async (endpoint, formData, options = {}) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
        ...options
        // Don't set Content-Type for FormData - browser will set it with boundary
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error, { endpoint, method: 'UPLOAD' });
    }
  }
};

// Specific API endpoints
export const contactAPI = {
  sendMessage: (data) => api.post('/api/contact', data),
  getMessages: () => api.get('/api/contact/messages'),
};

export const freeReportsAPI = {
  register: (data) => api.post('/api/free-reports/register', data),
  checkAccess: (email) => api.get(`/api/free-reports/check-access/${email}`),
  getUsers: () => api.get('/api/free-reports/users'),
  deleteUser: (id) => api.delete(`/api/free-reports/users/${id}`),
  exportUsers: () => api.get('/api/free-reports/export'),
};

export const aiAPI = {
  chat: (message) => api.post('/api/ai/chat', { message }),
  generateContent: (prompt) => api.post('/api/ai/generate', { prompt }),
};

export const geminiAPI = {
  chat: (message) => api.post('/api/gemini/chat', { message }),
  analyze: (data) => api.post('/api/gemini/analyze', data),
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/api/health');
    return response;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error', message: error.message };
  }
};

export default api;