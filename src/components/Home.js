import React, { useState, useEffect } from "react";
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

const Home = ({ products: apiProducts = [], searchTerm = "" }) => {
  const [products, setProducts] = useState([]);

  // Dummy products
  const dummyProducts = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1999, stock: 50, rating: 4.5, description: "High-quality wireless headphones with noise cancellation.", image: img1 },
    { id: 2, name: "Men’s Jacket", category: "Apparel", price: 2499, stock: 30, rating: 4.2, description: "Stylish winter jacket made with premium materials.", image: img2 },
    { id: 3, name: "Face Wash", category: "Personal Care", price: 299, stock: 100, rating: 4.0, description: "Gentle face wash suitable for all skin types.", image: img3 },
    { id: 4, name: "Smartwatch", category: "Electronics", price: 3999, stock: 25, rating: 4.7, description: "Feature-rich smartwatch with health tracking.", image: img4 },
    { id: 5, name: "Sneakers", category: "Footwear", price: 3499, stock: 40, rating: 4.3, description: "Comfortable and stylish sneakers for daily wear.", image: img5 },
    { id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 1799, stock: 60, rating: 4.6, description: "Portable speaker with deep bass and long battery life.", image: img6 },
    { id: 7, name: "Women’s Handbag", category: "Accessories", price: 1599, stock: 20, rating: 4.4, description: "Elegant handbag with spacious compartments.", image: img7 },
    { id: 8, name: "T-Shirt Pack", category: "Apparel", price: 899, stock: 70, rating: 4.1, description: "Pack of 3 cotton t-shirts in assorted colors.", image: img8 },
    { id: 9, name: "Sunglasses", category: "Accessories", price: 1299, stock: 35, rating: 4.2, description: "UV-protected sunglasses with a stylish design.", image: img9 },
    { id: 10, name: "Laptop Backpack", category: "Bags", price: 2199, stock: 15, rating: 4.5, description: "Durable backpack with laptop compartment and USB port.", image: img10 },
    { id: 11, name: "Gaming Mouse", category: "Electronics", price: 1299, stock: 50, rating: 4.6, description: "High-precision gaming mouse with RGB lighting.", image: img11 },
    { id: 12, name: "Coffee Mug Set", category: "Home & Kitchen", price: 599, stock: 100, rating: 4.3, description: "Set of 4 ceramic coffee mugs.", image: img12 },
    { id: 13, name: "Desk Lamp", category: "Home & Kitchen", price: 999, stock: 25, rating: 4.4, description: "LED desk lamp with adjustable brightness.", image: img13 },
    { id: 14, name: "Yoga Mat", category: "Fitness", price: 699, stock: 40, rating: 4.5, description: "Non-slip yoga mat made with eco-friendly material.", image: img14 },
    { id: 15, name: "Water Bottle", category: "Fitness", price: 499, stock: 80, rating: 4.2, description: "Stainless steel insulated water bottle.", image: img15 },
  ];

  // Load products (API fallback to dummy)
  useEffect(() => {
    if (apiProducts.length > 0) {
      setProducts(apiProducts);
    } else {
      setProducts(dummyProducts);
    }
  }, [apiProducts]);

  // Filter products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    const productData = encodeURIComponent(JSON.stringify(product));
    window.open(`#/product/${product.id}?data=${productData}`, "_blank");
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <section className="products-section">
        <h2>{searchTerm ? `Search Results for "${searchTerm}"` : "Products"}</h2>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                <img src={product.image} alt={product.name} />
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
