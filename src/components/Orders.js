// src/components/Order.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

const steps = ["Items", "Select Address", "Confirm Order"];

const Orders = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState({
    name: "",
    contactNumber: "",
    street: "",
    city: "",
    state: "",
    landmark: "",
    zipcode: "",
  });
  const [addressError, setAddressError] = useState("");
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "https://dev-project-ecommerce.upgrad.dev/api/addresses"
        );
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses", error);
        alert("Failed to load addresses. Please try again later.");
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleNext = async () => {
    setAddressError("");

    if (activeStep === 1) {
      if (
        !selectedAddress &&
        !Object.values(newAddress).some((val) => val.trim() !== "")
      ) {
        setAddressError("Please select or add an address!");
        return;
      }

      if (Object.values(newAddress).some((val) => val.trim() !== "")) {
        const requiredFields = [
          "name",
          "contactNumber",
          "street",
          "city",
          "state",
          "zipcode",
        ];
        const missingFields = requiredFields.filter(
          (field) => !newAddress[field].trim()
        );
        if (missingFields.length > 0) {
          setAddressError(
            `Please fill in all required fields: ${missingFields.join(", ")}`
          );
          return;
        }

        try {
          const addressResponse = await axios.post(
            "https://dev-project-ecommerce.upgrad.dev/api/addresses",
            newAddress
          );
          setAddresses([...addresses, addressResponse.data]);
          setSelectedAddress(addressResponse.data._id);
          setNewAddress({
            name: "",
            contactNumber: "",
            street: "",
            city: "",
            state: "",
            landmark: "",
            zipcode: "",
          });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error) {
          console.error("Error adding address", error);
          if (error.response) {
            alert(
              `Failed to add address: ${
                error.response.data.message || error.message
              }`
            );
          } else {
            alert(
              "Failed to add address. Please check your network connection."
            );
          }
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      alert("Your order is confirmed.");
      navigate("/");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setAddressError("");
  };

  const handleAddressSelect = (event) => {
    setSelectedAddress(event.target.value);
    setAddressError("");
  };

  const handleNewAddressChange = (event) => {
    setNewAddress({ ...newAddress, [event.target.name]: event.target.value });
  };

  if (loadingAddresses) {
    return <div>Loading addresses...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 1 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Select Existing Address</h3>
          <FormControl fullWidth>
            <InputLabel>Select Address</InputLabel>
            <Select
              value={selectedAddress}
              onChange={handleAddressSelect}
              label="Select Address"
            >
              {addresses.map((address) => (
                <MenuItem key={address._id} value={address._id}>
                  {address.name}, {address.street}, {address.city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <h3 style={{ marginTop: "20px" }}>Or Add New Address</h3>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newAddress.name}
            onChange={handleNewAddressChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            value={newAddress.contactNumber}
            onChange={handleNewAddressChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Street"
            name="street"
            value={newAddress.street}
            onChange={handleNewAddressChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={newAddress.city}
            onChange={handleNewAddressChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="State"
            name="state"
            value={newAddress.state}
            onChange={handleNewAddressChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Landmark"
            name="landmark"
            value={newAddress.landmark}
            onChange={handleNewAddressChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Zipcode"
            name="zipcode"
            value={newAddress.zipcode}
            onChange={handleNewAddressChange}
            margin="normal"
          />
          {addressError && (
            <p style={{ color: "red", marginTop: "10px" }}>{addressError}</p>
          )}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          style={{ marginRight: "10px" }}
        >
          Back
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Orders;
