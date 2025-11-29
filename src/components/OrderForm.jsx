'use client'

import { useState } from 'react';
import './OrderForm.css';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        institution: '',
        payment: 'cod',
        transactionId: '',
        transactionPhone: '',
        quantity: 1
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^\d{11}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Enter a valid 11-digit number";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (formData.quantity < 1) newErrors.quantity = "Quantity must be at least 1";
        if ((formData.payment === 'bkash' || formData.payment === 'nagad') && !formData.transactionId.trim()) {
            newErrors.transactionId = "Transaction ID is required for digital payment";
        }
        if ((formData.payment === 'bkash' || formData.payment === 'nagad') && !formData.transactionPhone.trim()) {
            newErrors.transactionPhone = "Transaction phone number is required";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_name: formData.name,
                    phone_number: formData.phone,
                    payment_type: formData.payment,
                    transaction_number: formData.payment === 'cod' ? null : formData.transactionId,
                    transaction_phone_number: formData.payment === 'cod' ? null : formData.transactionPhone,
                    address: formData.address,
                    institution: formData.institution || null,
                    quantity: formData.quantity
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit order');
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error('Order submission error:', error);
            setErrors({ submit: error.message || 'Failed to submit order. Please try again.' });
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handlePaymentChange = (method) => {
        setFormData(prev => ({ ...prev, payment: method }));
    };

    const handleQuantityChange = (delta) => {
        setFormData(prev => ({
            ...prev,
            quantity: Math.max(1, prev.quantity + delta)
        }));
    };

    // Calculate prices
    const unitPrice = 3500;
    const deliveryCharge = 100;
    const subtotal = unitPrice * formData.quantity;
    const total = subtotal + deliveryCharge;

    return (
        <section id="order" className="order-section section">
            <div className="container">
                <div className="order-container">
                    <div className="order-info">
                        <h2 className="section-title">Get Your Kit Today</h2>
                        <p className="section-subtitle">Start building your electronics lab.</p>

                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-item">
                                <span>Lab-in-A-Box Combo Kit × {formData.quantity}</span>
                                <span>৳{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-item">
                                <span>Delivery Charge</span>
                                <span>৳{deliveryCharge}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>৳{total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`order-form-wrapper ${isShaking ? 'shake' : ''}`}>
                        {!isSubmitted ? (
                            <form className="order-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder=" "
                                    />
                                    <label htmlFor="name">Full Name</label>
                                    {errors.name && <span className="error-text">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder=" "
                                    />
                                    <label htmlFor="phone">Phone Number</label>
                                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label style={{ position: 'relative', top: 0, transform: 'none', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', display: 'block' }}>Quantity</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button 
                                            type="button" 
                                            onClick={() => handleQuantityChange(-1)}
                                            style={{ 
                                                width: '40px', 
                                                height: '40px', 
                                                borderRadius: '50%', 
                                                border: '2px solid var(--color-primary)', 
                                                background: 'white',
                                                color: 'var(--color-primary)',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            −
                                        </button>
                                        <span style={{ fontSize: '1.2rem', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                                            {formData.quantity}
                                        </span>
                                        <button 
                                            type="button" 
                                            onClick={() => handleQuantityChange(1)}
                                            style={{ 
                                                width: '40px', 
                                                height: '40px', 
                                                borderRadius: '50%', 
                                                border: '2px solid var(--color-primary)', 
                                                background: 'var(--color-primary)',
                                                color: 'white',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                    {errors.quantity && <span className="error-text">{errors.quantity}</span>}
                                </div>

                                <div className="form-group">
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder=" "
                                        rows="3"
                                    ></textarea>
                                    <label htmlFor="address">Delivery Address</label>
                                    {errors.address && <span className="error-text">{errors.address}</span>}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="institution"
                                        name="institution"
                                        value={formData.institution}
                                        onChange={handleChange}
                                        placeholder=" "
                                    />
                                    <label htmlFor="institution">Institution (Optional)</label>
                                </div>

                                <div className="payment-section">
                                    <label className="payment-label">Select Payment Method</label>
                                    <div className="payment-methods-grid">
                                        <div
                                            className={`payment-card ${formData.payment === 'cod' ? 'selected' : ''}`}
                                            onClick={() => handlePaymentChange('cod')}
                                        >
                                            <div className="payment-card-icon">💵</div>
                                            <span>Cash on Delivery</span>
                                        </div>
                                        <div
                                            className={`payment-card ${formData.payment === 'bkash' ? 'selected' : ''}`}
                                            onClick={() => handlePaymentChange('bkash')}
                                        >
                                            <div className="payment-card-icon" style={{ color: '#e2136e' }}>📱</div>
                                            <span>bKash</span>
                                        </div>
                                        <div
                                            className={`payment-card ${formData.payment === 'nagad' ? 'selected' : ''}`}
                                            onClick={() => handlePaymentChange('nagad')}
                                        >
                                            <div className="payment-card-icon" style={{ color: '#f6921e' }}>📨</div>
                                            <span>Nagad</span>
                                        </div>
                                    </div>

                                    <div className="payment-instructions">
                                        {formData.payment === 'cod' && (
                                            <div className="instruction-box fade-in">
                                                <p><strong>Cash on Delivery:</strong> Pay the full amount (৳3600) to the delivery person when you receive the package.</p>
                                            </div>
                                        )}
                                        {formData.payment === 'bkash' && (
                                            <div className="instruction-box fade-in">
                                                <p><strong>bKash Payment:</strong></p>
                                                <ol>
                                                    <li>Go to your bKash App or dial *247#</li>
                                                    <li>Choose "Send Money"</li>
                                                    <li>Enter Number: <strong>017XXXXXXXX</strong></li>
                                                    <li>Amount: <strong>৳3600</strong></li>
                                                    <li>Reference: Your Name</li>
                                                </ol>
                                                <div className="form-group" style={{ marginTop: '1rem', marginBottom: 0 }}>
                                                    <input
                                                        type="text"
                                                        name="transactionId"
                                                        value={formData.transactionId}
                                                        onChange={handleChange}
                                                        placeholder=" "
                                                    />
                                                    <label>Enter Transaction ID</label>
                                                </div>
                                                {errors.transactionId && <span className="error-text">{errors.transactionId}</span>}
                                                <div className="form-group" style={{ marginTop: '1rem', marginBottom: 0 }}>
                                                    <input
                                                        type="tel"
                                                        name="transactionPhone"
                                                        value={formData.transactionPhone}
                                                        onChange={handleChange}
                                                        placeholder=" "
                                                    />
                                                    <label>Phone Number Used for Payment</label>
                                                </div>
                                                {errors.transactionPhone && <span className="error-text">{errors.transactionPhone}</span>}
                                            </div>
                                        )}
                                        {formData.payment === 'nagad' && (
                                            <div className="instruction-box fade-in">
                                                <p><strong>Nagad Payment:</strong></p>
                                                <ol>
                                                    <li>Go to your Nagad App or dial *167#</li>
                                                    <li>Choose "Send Money"</li>
                                                    <li>Enter Number: <strong>018XXXXXXXX</strong></li>
                                                    <li>Amount: <strong>৳3600</strong></li>
                                                    <li>Reference: Your Name</li>
                                                </ol>
                                                <div className="form-group" style={{ marginTop: '1rem', marginBottom: 0 }}>
                                                    <input
                                                        type="text"
                                                        name="transactionId"
                                                        value={formData.transactionId}
                                                        onChange={handleChange}
                                                        placeholder=" "
                                                    />
                                                    <label>Enter Transaction ID</label>
                                                </div>
                                                {errors.transactionId && <span className="error-text">{errors.transactionId}</span>}
                                                <div className="form-group" style={{ marginTop: '1rem', marginBottom: 0 }}>
                                                    <input
                                                        type="tel"
                                                        name="transactionPhone"
                                                        value={formData.transactionPhone}
                                                        onChange={handleChange}
                                                        placeholder=" "
                                                    />
                                                    <label>Phone Number Used for Payment</label>
                                                </div>
                                                {errors.transactionPhone && <span className="error-text">{errors.transactionPhone}</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {errors.submit && <div className="error-text" style={{ textAlign: 'center', marginBottom: '1rem' }}>{errors.submit}</div>}

                                <button type="submit" className="submit-button" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : `Confirm Order - ৳${total.toLocaleString()}`}
                                </button>
                            </form>
                        ) : (
                            <div className="success-message">
                                <div className="success-icon">✓</div>
                                <h3>Order Placed Successfully!</h3>
                                <p>Thank you, {formData.name}. We will contact you at {formData.phone} shortly to confirm your order.</p>
                                <button className="reset-button" onClick={() => setIsSubmitted(false)}>Place Another Order</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderForm;
