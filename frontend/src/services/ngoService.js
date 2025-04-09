import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const registerNgo = async (ngoData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ngos/register`, ngoData);
    return response.data;
  } catch (error) {
    console.error('Error registering NGO:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to register NGO' };
  }
};

export const getNgos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ngos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    throw error;
  }
};

export const getNgoById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ngos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching NGO:', error);
    throw error;
  }
}; 