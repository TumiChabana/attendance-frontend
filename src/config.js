const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://attendance-backend-ag1i.onrender.com'
    : 'http://localhost:5000/api/attendance';

export default API_URL;