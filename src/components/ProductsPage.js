import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import CategoryTabs from "./CategoryTabs";

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // All products from API
  const [sortedProducts, setSortedProducts] = useState([]); // Filtered or sorted products
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/products?search=${searchQuery}`);
        setProducts(response.data);
        setSortedProducts(response.data); // Initially, all products are shown
      } catch (error) {
        setError("Failed to fetch products. Please try again.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div style={{ padding: "20px" }}>
      {/* Category Tabs */}
      <CategoryTabs />

      {/* Search Bar */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      {/* Loading Indicator */}
      {loading && (
        <p style={{ textAlign: "center" }}>Loading products...</p>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
