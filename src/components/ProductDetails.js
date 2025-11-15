// ProductDetails.js
import React from "react";
import { useParams, useLocation } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  // ✅ Extract product data passed from Home.js
  const queryParams = new URLSearchParams(location.search);
  const productData = queryParams.get("data");
  const product = productData ? JSON.parse(decodeURIComponent(productData)) : null;

  if (!product) {
    return <p>Product details not available.</p>;
  }

  // ✅ Handle Buy Now click
  const handleBuyNow = () => {
    const checkoutData = encodeURIComponent(JSON.stringify(product));
    window.open(`/checkout/${product.id}?data=${checkoutData}`, "_blank");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>
      <img
        src={product.image || product.imageUrl}
        alt={product.name}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ₹{Number(product.price).toLocaleString()}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Rating:</strong> ⭐ {product.rating}</p>
      <p><strong>Description:</strong> {product.description}</p>

      {/* ✅ Buy Now Button */}
      <button
        onClick={handleBuyNow}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetails;
