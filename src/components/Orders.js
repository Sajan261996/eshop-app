import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

const steps = ['Items', 'Select Address', 'Confirm Order'];

const Orders = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState({
        name: '',
        contactNumber: '',
        street: '',
        city: '',
        state: '',
        landmark: '',
        zipcode: '',
    });
    const [addressError, setAddressError] = useState('');
    const [loadingAddresses, setLoadingAddresses] = useState(true); // Add loading state

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get("https://dev-project-ecommerce.upgrad.dev/api/addresses");
                setAddresses(response.data);
            } catch (error) {
                console.error("Error fetching addresses", error);
                alert("Failed to load addresses. Please try again later.");
            } finally {
                setLoadingAddresses(false); // Set loading to false regardless of success/failure
            }
        };

        fetchAddresses();
    }, []);

    const handleNext = async () => {
        setAddressError('');
        if (activeStep === 1) {
            if (!selectedAddress && !Object.values(newAddress).some(val => val.trim() !== "")) {
                setAddressError('Please select or add an address!');
                return;
            }

            if (Object.values(newAddress).some(val => val.trim() !== "")) {
                const requiredFields = ['name', 'contactNumber', 'street', 'city', 'state', 'zipcode'];
                const missingFields = requiredFields.filter(field => !newAddress[field].trim());
                if (missingFields.length > 0) {
                    setAddressError(`Please fill in all required fields: ${missingFields.join(', ')}`);
                    return;
                }
                try {
                    const addressResponse = await axios.post("https://dev-project-ecommerce.upgrad.dev/api/addresses", newAddress);
                    console.log("Address added", addressResponse.data);
                    setAddresses([...addresses, addressResponse.data]);
                    setSelectedAddress(addressResponse.data._id);
                    setNewAddress({ name: '', contactNumber: '', street: '', city: '', state: '', landmark: '', zipcode: '' });
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } catch (error) {
                    console.error("Error adding address", error);
                    if (error.response) {
                        alert(`Failed to add address: ${error.response.data.message || error.message}`);
                    } else {
                        alert("Failed to add address. Please check your network connection.");
                    }
                }
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else if (activeStep === 2) {
            alert("Your order is confirmed.");
            navigate('/');
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setAddressError('');
    };

    const handleAddressSelect = (event) => {
        setSelectedAddress(event.target.value);
        setAddressError('');
    };

    const handleNewAddressChange = (event) => {
        setNewAddress({ ...newAddress, [event.target.name]: event.target.value });
    };

    if (loadingAddresses) {
        return <div>Loading addresses...</div>; // Render loading message
    }

    return (
        <div style={{ padding: '20px' }}>
            {/* ... (rest of the component - same as before) */}
        </div>
    );
};

export default Orders;