import axios from "axios";

// Base URL configuration
const API = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust as needed
});

// Add token to headers (if required)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

// Auth endpoints
export const signUp = (userData) => API.post("/auth/signup", userData);
export const signIn = (credentials) => API.post("/auth/signin", credentials);

// Product endpoints
export const createProduct = (productData) => API.post("/products", productData);
export const updateProduct = (id, productData) =>
  API.put(`/products/${id}`, productData);
export const getProduct = (id) => API.get(`/products/${id}`);
export const getCategories = () => API.get("/products/categories");

// Address endpoints
export const createAddress = (addressData) =>
  API.post("/addresses", addressData);
export const updateAddress = (id, addressData) =>
  API.put(`/addresses/${id}`, addressData);
export const getAllAddresses = () => API.get("/addresses");
export const getAddress = (id) => API.get(`/addresses/${id}`);

// Order endpoints
export const createOrder = (orderData) => API.post("/orders", orderData);
export const getAllOrders = () => API.get("/orders");
export const getOrder = (id) => API.get(`/orders/${id}`);
