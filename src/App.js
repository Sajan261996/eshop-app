import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "./components/AppBar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import axios from "axios";

const theme = createTheme({
  spacing: 8,
});

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Products fetched:", products);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Home route with products, categories */}
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading products...</p>
              ) : (
                <Home products={products} categories={categories} />
              )
            }
          />

          {/* Product details route */}
          <Route
            path="/product/:id"
            element={<ProductDetails products={products} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
