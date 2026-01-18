import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // NestJS URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
