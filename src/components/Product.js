import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router's navigation hook
import "./Product.css";
import CategoryTabs from "./CategoryTabs";

const Product = ({ products, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("");
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const navigate = useNavigate(); // Initialize navigation hook

    useEffect(() => {
        let filteredProducts = products || [];

        if (selectedCategory !== "all") {
            filteredProducts = filteredProducts.filter(
                (product) => product.category?.toLowerCase() === selectedCategory
            );
        }

        let sortedProducts = [...filteredProducts].sort((a, b) => {
            if (sortBy === "priceAsc") return a.price - b.price;
            if (sortBy === "priceDesc") return b.price - a.price;
            return 0;
        });

        setDisplayedProducts(sortedProducts);
    }, [products, selectedCategory, sortBy]);

    const handleProductClick = (product) => {
        console.log("Clicked product:", product); // Log the product to check its contents
        if (product && (product._id || product.id)) {
            // Use _id or id for product navigation
            const productId = product._id || product.id;
            const productDetailsUrl = `/product/${productId}`;
            console.log("Navigating to:", productDetailsUrl); // Log the URL before opening
            window.open(productDetailsUrl, '_blank'); // Open in new tab
        } else {
            console.error("Product or product ID is missing:", product);
            alert("Could not open product details. Please try again later.");
        }
    };

    if (!products) {
        return <p>Loading products...</p>;
    }

    return (
        <div className="product-container">
            <div className="product-header">
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setCategory={setSelectedCategory}
                />
                <div className="sort-by">
                    Sort By:
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Select</option>
                        <option value="priceAsc">Price (Low to High)</option>
                        <option value="priceDesc">Price (High to Low)</option>
                    </select>
                </div>
            </div>

            <div className="product-listing">
                {displayedProducts.map((product) => (
                    <div
                        className="product-box"
                        key={product?._id || product?.id || Math.random().toString()} // Handle both _id and id
                        onClick={() => handleProductClick(product)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="product-image">
                            {product?.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-image.png";
                                    }}
                                />
                            ) : (
                                <img src="/placeholder-image.png" alt="Placeholder" />
                            )}
                        </div>
                        <div className="product-details">
                            <div className="product-name">{product?.name || "Product Name"}</div>
                            <div className="product-description">
                                {product?.description || "Product Description"}
                            </div>
                            <div className="product-price">₹{product?.price || "Price"}</div>
                            <button className="buy-button">BUY</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
