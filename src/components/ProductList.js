import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const ProductsPage = ({ isLoggedIn, products }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Fetch categories from the API
  useEffect(() => {
    axios
      .get("/products/categories")
      .then((response) => {
        setCategories(["ALL", ...response.data]); // Include 'ALL' for all products
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Filter products by category and search term
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "ALL") {
      filtered = products.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      {/* Search Bar */}
      <div style={{ margin: "20px", textAlign: "center" }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "50%" }}
        />
      </div>

      {/* Category Toggle Buttons */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="product categories"
        >
          {categories.map((category) => (
            <ToggleButton key={category} value={category} aria-label={category}>
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {/* Products Display */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

