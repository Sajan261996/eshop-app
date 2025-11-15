import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = ({ products }) => {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const navigate = useNavigate();

  // 🔎 Filter using product name + category (for jackets, headphones, etc.)
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  return (
    <div className="home-container">
      <h2>Search Results for "{query}"</h2>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* ✅ API uses imageUrl, not image */}
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>₹{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
