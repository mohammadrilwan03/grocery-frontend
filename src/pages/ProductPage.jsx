import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, Truck, Heart, ArrowLeft, CheckCircle } from 'lucide-react';

const ProductPage = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // In a real app, you'd fetch by ID. Here we'll fetch all and find the one.
                const response = await fetch('http://127.0.0.1:5000/api/products');
                const data = await response.json();
                const found = data.find(p => (p._id || p.id).toString() === id);
                setProduct(found);
                setLoading(false);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <h2 style={{ fontSize: '32px' }}>Product not found</h2>
                <button onClick={() => navigate('/')} className="btn btn-primary">Back to Home</button>
            </div>
        );
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                paddingTop: '140px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8fafc, #ffffff)'
            }}
        >
            <div className="container">
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-light)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginBottom: '40px',
                        fontSize: '16px'
                    }}
                    className="hover:text-primary transition-colors"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '80px', alignItems: 'start' }} className="product-page-grid">
                    {/* Image Section */}
                    <div style={{ position: 'sticky', top: '140px' }}>
                        <div style={{
                            background: '#fff',
                            borderRadius: '40px',
                            padding: '60px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #f1f5f9'
                        }}>
                            <motion.img
                                layoutId={`product-img-${product._id || product.id}`}
                                src={product.image}
                                alt={product.name}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '450px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.1))'
                                }}
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div>
                            <span style={{
                                display: 'inline-block',
                                padding: '8px 16px',
                                background: 'rgba(0, 208, 132, 0.1)',
                                borderRadius: '100px',
                                fontSize: '14px',
                                fontWeight: 700,
                                color: 'var(--primary)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                marginBottom: '24px'
                            }}>
                                {product.category}
                            </span>
                            <h1 style={{ fontSize: '56px', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-2px', lineHeight: 1.1 }}>
                                {product.name}
                            </h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '24px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={20} fill={i < Math.floor(product.rating || 5) ? "#ffce00" : "none"} color="#ffce00" />
                                    ))}
                                    <span style={{ marginLeft: '8px', fontWeight: 700, fontSize: '18px' }}>{product.rating}</span>
                                </div>
                                <div style={{ height: '20px', width: '1px', background: '#e2e8f0' }}></div>
                                <span style={{ color: 'var(--text-light)', fontWeight: 500 }}>{product.reviews || 128} Reviews</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
                                <span style={{ fontSize: '56px', fontWeight: 900, color: 'var(--primary)', textShadow: '0 10px 20px rgba(0, 208, 132, 0.2)' }}>
                                    ₹{product.price.toFixed(0)}
                                </span>
                                <span style={{ fontSize: '28px', color: 'var(--text-light)', textDecoration: 'line-through', opacity: 0.6 }}>
                                    ₹{(product.price * 1.5).toFixed(0)}
                                </span>
                                <span style={{ background: '#ff4b2b', color: 'white', padding: '6px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, verticalAlign: 'middle', marginBottom: '10px', display: 'inline-block' }}>
                                    SAVE 50%
                                </span>
                            </div>
                        </div>

                        <p style={{ fontSize: '20px', color: 'var(--text-light)', lineHeight: 1.8, fontWeight: 500 }}>
                            Indulge in the finest quality of our {product.name}. Carefully selected and harvested at the peak of ripeness,
                            our organic produce comes straight from local sustainable farms. Every bite is packed with natural nutrients
                            and the authentic taste of nature. Perfect for health-conscious families who value freshness above all.
                        </p>

                        <div style={{ background: '#f8fafc', borderRadius: '32px', padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: '2px' }}>Quality Guaranteed</div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>100% Organic certified</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: '2px' }}>Fast Delivery</div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Same day available</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <button
                                onClick={handleAddToCart}
                                className="btn btn-primary"
                                style={{ flex: 1, padding: '24px', borderRadius: '20px', fontSize: '20px', height: 'auto' }}
                            >
                                {added ? (
                                    <>
                                        <CheckCircle size={24} />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={24} />
                                        Add to Cart — ₹{product.price.toFixed(0)}
                                    </>
                                )}
                            </button>
                            <button
                                style={{
                                    width: '76px',
                                    height: '76px',
                                    borderRadius: '20px',
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-light)',
                                    background: '#fff',
                                    transition: 'all 0.3s'
                                }}
                                className="wishlist-btn-large"
                            >
                                <Heart size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                    @media (max-width: 992px) {
                        .product-page-grid {
                            grid-template-columns: 1fr !important;
                            gap: 40px !important;
                        }
                        .product-page-grid > div {
                            position: static !important;
                        }
                    }
                    .wishlist-btn-large:hover {
                        border-color: #fda4af !important;
                        color: #f43f5e !important;
                        background: #fff1f2 !important;
                        transform: scale(1.05);
                    }
                `}
            </style>
        </motion.main>
    );
};

export default ProductPage;
