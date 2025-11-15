import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import Product from "./Product";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!productData.name) newErrors.name = "Product name is required.";
    if (!productData.description)
      newErrors.description = "Description is required.";
    if (!productData.price || parseFloat(productData.price) <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!productData.image || !isValidURL(productData.image))
      newErrors.image = "A valid image URL is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setNewProduct(productData);
    setProductData({
      name: "",
      description: "",
      price: "",
      image: "",
    });
    setErrors({});
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={productData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          label="Image URL"
          name="image"
          value={productData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.image}
          helperText={errors.image}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
      </form>

      {newProduct && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Newly Added Product:
          </Typography>
          <Product product={newProduct} />
        </Box>
      )}
    </Box>
  );
};

export default AddProduct;
