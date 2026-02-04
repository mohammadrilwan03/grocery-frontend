import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const CartModal = ({ isOpen, onClose, cartItems, onRemove, user, clearCart }) => {
    const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Success
    const [shippingData, setShippingData] = useState({
        fullName: user ? user.name : '',
        address: '',
        city: '',
        zipCode: ''
    });
    const [loading, setLoading] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            userId: user ? user.id : null,
            items: cartItems.map(item => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: 1
            })),
            totalAmount: total,
            shippingAddress: shippingData
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const data = await response.json();

            if (response.ok) {
                setStep(3);
                clearCart();
                toast.success("Order placed successfully!");
            } else {
                toast.error(data.message || "Failed to place order");
            }
        } catch (err) {
            toast.error("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetModal = () => {
        onClose();
        setTimeout(() => setStep(1), 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 2000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(2, 6, 23, 0.4)', backdropFilter: 'blur(16px)'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        style={{
                            background: 'var(--glass)', backdropFilter: 'blur(25px)',
                            padding: '40px', borderRadius: '32px',
                            width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto',
                            position: 'relative', boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--glass-border)'
                        }}
                    >
                        <button onClick={resetModal} style={{ position: 'absolute', top: '24px', right: '24px', background: '#f8fafc', padding: '10px', borderRadius: '14px', border: 'none' }}>
                            <X size={20} />
                        </button>

                        {step === 1 && (
                            <>
                                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                    <ShoppingBag size={32} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                                    <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Your Shopping Cart</h2>
                                    <p style={{ color: 'var(--text-light)' }}>{cartItems.length} items selected</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                padding: '16px',
                                                background: 'rgba(255,255,255,0.5)',
                                                borderRadius: '20px',
                                                border: '1px solid rgba(255,255,255,0.5)',
                                                boxShadow: 'var(--shadow-sm)'
                                            }}>
                                                <img src={item.image} style={{ width: '70px', height: '70px', borderRadius: '16px', objectFit: 'cover' }} />
                                                <div style={{ flex: 1 }}>
                                                    <h4 style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-dark)' }}>{item.name}</h4>
                                                    <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '18px' }}>₹{item.price.toFixed(0)}</p>
                                                </div>
                                                <button onClick={() => onRemove(idx)} style={{ background: '#fee2e2', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '10px', borderRadius: '12px', transition: 'all 0.3s' }} className="hover:scale-110">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                            <p style={{ color: 'var(--text-light)' }}>Your cart is empty.</p>
                                        </div>
                                    )}
                                </div>

                                {cartItems.length > 0 && (
                                    <div style={{ borderTop: '2px dashed #e2e8f0', paddingTop: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                            <span style={{ fontWeight: 600, fontSize: '18px' }}>Total Amount</span>
                                            <span style={{ fontWeight: 800, fontSize: '22px', color: 'var(--text-dark)' }}>₹{total.toFixed(0)}</span>
                                        </div>
                                        <button
                                            onClick={() => setStep(2)}
                                            className="btn btn-primary"
                                            style={{
                                                width: '100%',
                                                padding: '20px',
                                                borderRadius: '20px',
                                                fontSize: '18px',
                                                fontWeight: 800,
                                                animation: 'pulse-glow 2s infinite',
                                                boxShadow: '0 10px 20px var(--primary-glow)'
                                            }}
                                        >
                                            Checkout Now <CreditCard size={20} style={{ marginLeft: '10px' }} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                    <MapPin size={32} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                                    <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Shipping Details</h2>
                                    <p style={{ color: 'var(--text-light)' }}>Where should we deliver?</p>
                                </div>

                                <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Enter your name"
                                                value={shippingData.fullName}
                                                onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                                                style={{ width: '100%', padding: '18px', borderRadius: '18px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.7)', fontSize: '16px', outline: 'none', transition: 'all 0.3s' }}
                                                className="focus-ring"
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>Street Address</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="123 Fresh St"
                                                value={shippingData.address}
                                                onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                                                style={{ width: '100%', padding: '18px', borderRadius: '18px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.7)', fontSize: '16px', outline: 'none', transition: 'all 0.3s' }}
                                                className="focus-ring"
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>City</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="City"
                                                    value={shippingData.city}
                                                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                                                    style={{ width: '100%', padding: '18px', borderRadius: '18px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.7)', fontSize: '16px', outline: 'none', transition: 'all 0.3s' }}
                                                    className="focus-ring"
                                                />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>Zip Code</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="10001"
                                                    value={shippingData.zipCode}
                                                    onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                                                    style={{ width: '100%', padding: '18px', borderRadius: '18px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.7)', fontSize: '16px', outline: 'none', transition: 'all 0.3s' }}
                                                    className="focus-ring"
                                                />
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '20px', borderTop: '2px dashed var(--glass-border)', paddingTop: '20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                                <span style={{ fontWeight: 600, color: 'var(--text-light)' }}>Total to Pay</span>
                                                <span style={{ fontWeight: 800, fontSize: '24px', color: 'var(--text-dark)' }}>₹{total.toFixed(0)}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <button type="button" onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1, padding: '18px', borderRadius: '18px', border: '1px solid var(--glass-border)', background: 'white' }}>
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="btn btn-primary"
                                                    style={{
                                                        flex: 2,
                                                        padding: '18px',
                                                        borderRadius: '18px',
                                                        fontWeight: 800,
                                                        animation: 'pulse-glow 2s infinite',
                                                        boxShadow: '0 10px 20px var(--primary-glow)'
                                                    }}
                                                >
                                                    {loading ? 'Confirming...' : 'Place Order Now'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{ textAlign: 'center', padding: '20px 0' }}
                            >
                                <div style={{
                                    width: '100px', height: '100px',
                                    background: 'rgba(0, 208, 132, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 30px',
                                    border: '4px solid var(--primary)',
                                    boxShadow: '0 0 40px var(--primary-glow)'
                                }}>
                                    <CheckCircle size={50} color="var(--primary)" />
                                </div>
                                <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>Order Success!</h2>
                                <p style={{ color: 'var(--text-light)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.5 }}>
                                    Thank you for your purchase. <br />
                                    Your fresh products are on the way!
                                </p>
                                <button
                                    onClick={resetModal}
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '20px',
                                        borderRadius: '20px',
                                        fontSize: '18px',
                                        fontWeight: 800,
                                        boxShadow: 'var(--shadow-md)'
                                    }}
                                >
                                    Continue Shopping
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CartModal;
