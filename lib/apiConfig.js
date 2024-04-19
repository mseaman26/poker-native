// apiConfig.js
let BASE_URL = '';

if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:3001';
} else {
    // Production or any other environment
    BASE_URL = 'https://poker-server-2d3e5c5dcd63.herokuapp.com';
}

export default BASE_URL;
