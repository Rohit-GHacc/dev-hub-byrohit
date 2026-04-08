// export const BASE_URL = location.hostname === 'localhost' ? 'http://localhost:7777': '/api'
export const BASE_URL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:7777"
    : "https://dev-tinder-backend-u441.onrender.com";