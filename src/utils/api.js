import baseurl from './baseurl';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  try {
    const response = await fetch(`${baseurl}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Handle unauthorized (token expired or invalid)
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Example usage:
// const login = async (credentials) => {
//   return apiRequest('/login', {
//     method: 'POST',
//     body: JSON.stringify(credentials)
//   });
// };
