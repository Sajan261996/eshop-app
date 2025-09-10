// Home.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";

// Local fallback images
import img1 from "../assets/bluetoothheadphones-2048px-0880.png";
import img2 from "../assets/mensjacket.png";
import img3 from "../assets/facewash.png";
import img4 from "../assets/smartwatch.png";
import img5 from "../assets/sneakers.png";
import img6 from "../assets/bluetoothspeaker.png";
import img7 from "../assets/womenshandbag.png";
import img8 from "../assets/tshirtpack.png";
import img9 from "../assets/sunglasses.png";
import img10 from "../assets/laptopbackpack.png";
import img11 from "../assets/gamingmouse.png";
import img12 from "../assets/coffeemugset.png";
import img13 from "../assets/DeskLamp.png";
import img14 from "../assets/YogaMat.png";
import img15 from "../assets/WaterBottle.png";

const Home = ({ products: initialProducts }) => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // ✅ Get search query from URL (/search?query=Headphones)
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase() || "";

  // Dummy fallback products with details
  const dummyProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 1999,
      stock: 50,
      rating: 4.5,
      description: "High-quality wireless headphones with noise cancellation.",
      image: img1,
    },
    {
      id: 2,
      name: "Men’s Jacket",
      category: "Apparel",
      price: 2499,
      stock: 30,
      rating: 4.2,
      description: "Stylish winter jacket made with premium materials.",
      image: img2,
    },
    {
      id: 3,
      name: "Face Wash",
      category: "Personal Care",
      price: 299,
      stock: 100,
      rating: 4.0,
      description: "Gentle face wash suitable for all skin types.",
      image: img3,
    },
    {
      id: 4,
      name: "Smartwatch",
      category: "Electronics",
      price: 3999,
      stock: 25,
      rating: 4.7,
      description: "Feature-rich smartwatch with health tracking.",
      image: img4,
    },
    {
      id: 5,
      name: "Sneakers",
      category: "Footwear",
      price: 3499,
      stock: 40,
      rating: 4.3,
      description: "Comfortable and stylish sneakers for daily wear.",
      image: img5,
    },
    // ✅ Add more dummy products as needed...
  ];

  // Load products (API or fallback)
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
    } else {
      setProducts(dummyProducts);
    }
  }, [initialProducts]);

  // ✅ Filter products by search query
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
  );

  // ✅ Open product details in new window
  const handleProductClick = (product) => {
    const productData = encodeURIComponent(JSON.stringify(product));
    window.open(`/product/${product.id}?data=${productData}`, "_blank");
  };

  return (
    <div className="home-container">
      <h1>Home</h1>

      {/* Products Section */}
      <section className="products-section">
        <h2>{searchQuery ? `Search Results for "${searchQuery}"` : "Products"}</h2>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.image || product.imageUrl}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>₹{Number(product.price).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
