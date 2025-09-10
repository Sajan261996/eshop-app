import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "./components/AppBar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import OrderDetail from "./components/Orders";
import Profile from "./components/Profile";
import axios from "axios";

const theme = createTheme({
  spacing: 8,
});

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          "https://dev-project-ecommerce.upgrad.dev/api/products"
        );
        setProducts(productResponse.data);

        const categoryResponse = await axios.get(
          "https://dev-project-ecommerce.upgrad.dev/api/products/categories"
        );
        setCategories(["ALL", ...categoryResponse.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]); // fallback to empty
        setCategories(["ALL"]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar onSearch={setSearchTerm} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Home page */}
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading products...</p>
              ) : (
                <Home
                  products={products}
                  categories={categories}
                  searchTerm={searchTerm}
                />
              )
            }
          />

          {/* ✅ Product details */}
          <Route path="/product/:id" element={<ProductDetails products={products} />} />

          {/* ✅ Orders and profile */}
          <Route path="/orders" element={<OrderDetail />} />
          <Route path="/profile" element={<Profile />} />

          {/* ✅ Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
