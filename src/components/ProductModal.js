// ProductModal.js
import React from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
    if (!product) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <div className="modal-inner">
                    <div className="modal-image">
                        {product.image && <img src={product.image} alt={product.name} />}
                    </div>
                    <div className="modal-details">
                        <h2>{product.name}</h2>
                        <p className="modal-description">{product.description}</p>
                        <p className="modal-price">₹{product.price}</p>
                        <button className="buy-button">BUY</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;