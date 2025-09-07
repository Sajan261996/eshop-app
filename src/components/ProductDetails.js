import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(true); // Loader for fetching product
  const [placingOrder, setPlacingOrder] = useState(false); // Loader for placing order

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dev-project-ecommerce.upgrad.dev/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Failed to load product details.');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, navigate]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10) || 1;
    setQuantity(value);
  };

  const handlePlaceOrder = async () => {
    if (quantity < 1 || quantity > product.availableQuantity) {
      alert('Invalid quantity selected.');
      return;
    }

    try {
      setPlacingOrder(true);
      const orderData = {
        productId: id,
        quantity,
      };

      const response = await axios.post(
        'https://dev-project-ecommerce.upgrad.dev/api/orders',
        orderData
      );

      console.log('Order created:', response.data);
      setOrderPlaced(true);

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/orders');
      }, 1500);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <button onClick={handleGoBack} className="back-button">
          Go Back
        </button>

        <div className="product-details">
          <div className="product-image">
            <img
              src={product.image || '/placeholder.png'}
              alt={product.name}
            />
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <p>Available Quantity: {product.availableQuantity}</p>
            <p>Category: {product.category}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">
              ₹{product.price.toLocaleString()}
            </p>

            <div className="quantity-input">
              <label htmlFor="quantity">Enter Quantity</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                max={product.availableQuantity}
                onChange={handleQuantityChange}
              />
            </div>

            {orderPlaced ? (
              <p style={{ color: 'green' }}>Order placed! Redirecting...</p>
            ) : (
              <button
                className="place-order-button"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
              >
                {placingOrder ? 'Placing Order...' : 'PLACE ORDER'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
