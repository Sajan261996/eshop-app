import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// Import all images from assets
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

const Home = ({ products: initialProducts, categories }) => {
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/addresses"
      );
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/orders"
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Load products
  useEffect(() => {
    fetchAddresses();
    fetchOrders();

    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
    } else {
      // Dummy products with imported images
      const dummyProducts = [
        { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1999, image: img1 },
        { id: 2, name: "Men’s Jacket", category: "Apparel", price: 2499, image: img2 },
        { id: 3, name: "Face Wash", category: "Personal Care", price: 299, image: img3 },
        { id: 4, name: "Smartwatch", category: "Electronics", price: 3999, image: img4 },
        { id: 5, name: "Sneakers", category: "Footwear", price: 3499, image: img5 },
        { id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 1599, image: img6 },
        { id: 7, name: "Women’s Handbag", category: "Accessories", price: 1299, image: img7 },
        { id: 8, name: "T-shirt Pack", category: "Apparel", price: 999, image: img8 },
        { id: 9, name: "Sunglasses", category: "Accessories", price: 799, image: img9 },
        { id: 10, name: "Laptop Backpack", category: "Accessories", price: 1899, image: img10 },
        { id: 11, name: "Gaming Mouse", category: "Electronics", price: 1199, image: img11 },
        { id: 12, name: "Coffee Mug Set", category: "Home & Kitchen", price: 499, image: img12 },
        { id: 13, name: "Desk Lamp", category: "Home & Kitchen", price: 699, image: img13 },
        { id: 14, name: "Yoga Mat", category: "Fitness", price: 1299, image: img14 },
        { id: 15, name: "Water Bottle", category: "Fitness", price: 499, image: img15 },
      ];

      setProducts(dummyProducts);
    }
  }, [initialProducts]);

  // Navigate to product details
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="home-container">
      <h1>Home</h1>

      {/* Products Section */}
      <section className="products-section">
        <h2>Products</h2>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>₹{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Addresses Section */}
      <section className="addresses-section">
        <h2>Addresses</h2>
        {addresses.length === 0 ? (
          <p>No addresses found</p>
        ) : (
          <ul>
            {addresses.map((address) => (
              <li key={address.id}>
                {address.name} - {address.city}, {address.state} ({address.zipcode})
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Orders Section */}
      <section className="orders-section">
        <h2>Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                Order ID: {order.id} - Quantity: {order.quantity} - Product: {order.product}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Home;
