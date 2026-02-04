import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';

const ProductDetailModal = ({ isOpen, onClose, product, onAddToCart }) => {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(2, 6, 23, 0.7)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 2000,
                        }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '95%',
                            maxWidth: '1000px',
                            maxHeight: '90vh',
                            background: 'var(--glass)',
                            backdropFilter: 'blur(25px)',
                            borderRadius: '32px',
                            zIndex: 2001,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--glass-border)'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '24px',
                                right: '24px',
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                background: '#f8fafc',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                                color: 'var(--text-dark)',
                                transition: 'all 0.2s'
                            }}
                            className="close-modal-btn"
                        >
                            <X size={24} />
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'row', height: '100%', overflowY: 'auto' }} className="responsive-modal-layout">
                            {/* Product Image Section */}
                            <div style={{
                                flex: 1,
                                background: '#f8fafc',
                                padding: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <motion.img
                                    layoutId={`product-img-${product._id || product.id}`}
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '400px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
                                    }}
                                />
                                <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
                                    <span style={{
                                        padding: '8px 16px',
                                        background: 'white',
                                        borderRadius: '100px',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: 'var(--primary)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            {/* Product Details Section */}
                            <div style={{ flex: 1.2, padding: '60px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < Math.floor(product.rating || 5) ? "#ffce00" : "none"} color="#ffce00" />
                                            ))}
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-light)' }}>
                                            ({product.reviews || 120} customer reviews)
                                        </span>
                                    </div>
                                    <h2 style={{ fontSize: '40px', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-1px', lineHeight: 1.1 }}>
                                        {product.name}
                                    </h2>
                                    <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                                        <span style={{ fontSize: '40px', fontWeight: 900, color: 'var(--primary)' }}>
                                            ₹{product.price.toFixed(0)}
                                        </span>
                                        <span style={{ fontSize: '20px', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                                            ₹{(product.price * 1.5).toFixed(0)}
                                        </span>
                                        <div style={{ background: '#fef3c7', color: '#d97706', padding: '4px 12px', borderRadius: '100px', fontSize: '14px', fontWeight: 800 }}>SAVE 50%</div>
                                    </div>
                                </div>

                                <p style={{ fontSize: '18px', color: 'var(--text-light)', lineHeight: 1.6 }}>
                                    Experience the pure taste of nature with our handpicked, organic {product.name.toLowerCase()}.
                                    Sourced directly from local sustainable farms, ensuring peak freshness and nutritional value for your healthy lifestyle.
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: 700 }}>Quality Assured</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>100% Organic</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                                            <Truck size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: 700 }}>Free Delivery</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>On orders over $50</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 'auto', display: 'flex', gap: '16px' }}>
                                    <button
                                        onClick={() => {
                                            onAddToCart(product);
                                            onClose();
                                        }}
                                        className="btn btn-primary"
                                        style={{
                                            flex: 1,
                                            padding: '20px',
                                            borderRadius: '20px',
                                            fontSize: '20px',
                                            fontWeight: 800,
                                            animation: 'pulse-glow 2s infinite',
                                            boxShadow: '0 10px 20px var(--primary-glow)'
                                        }}
                                    >
                                        <ShoppingCart size={24} style={{ marginRight: '10px' }} />
                                        Add to Cart Now
                                    </button>
                                    <button
                                        style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '18px',
                                            border: '1px solid #e2e8f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--text-light)',
                                            transition: 'all 0.2s',
                                            background: 'white'
                                        }}
                                        className="wishlist-btn"
                                    >
                                        <Heart size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
            <style>
                {`
                    @media (max-width: 768px) {
                        .responsive-modal-layout {
                            flex-direction: column !important;
                        }
                        .responsive-modal-layout > div {
                            padding: 30px !important;
                        }
                    }
                    .close-modal-btn:hover {
                        background: #f1f5f9 !important;
                        transform: rotate(90deg);
                    }
                    .wishlist-btn:hover {
                        border-color: #fda4af !important;
                        color: #f43f5e !important;
                        background: #fff1f2 !important;
                    }
                `}
            </style>
        </AnimatePresence>
    );
};

export default ProductDetailModal;
