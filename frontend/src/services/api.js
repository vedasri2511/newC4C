import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchRequests = async () => {
  try {
    const response = await api.get('/api/requests');
    return response.data;
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
};

export const createRequest = async (requestData) => {
  try {
    const response = await api.post('/api/requests', requestData);
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
    throw error;
  }
};

export const updateRequest = async (requestId, requestData) => {
  try {
    const response = await api.put(`/api/requests/${requestId}`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error updating request:', error);
    throw error;
  }
};

export const deleteRequest = async (requestId) => {
  try {
    const response = await api.delete(`/api/requests/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting request:', error);
    throw error;
  }
}; 