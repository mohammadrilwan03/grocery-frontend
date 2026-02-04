import React from 'react';
import { Plus, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAdd }) => {
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`/product/${product._id || product.id}`);
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="product-card"
        >
            <div className="product-img-box" onClick={handleView} style={{ cursor: 'pointer' }}>
                <motion.img
                    layoutId={`product-img-${product._id || product.id}`}
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // Add to wishlist logic could go here
                    }}
                    style={{
                        position: 'absolute', top: '16px', left: '16px',
                        background: 'white', padding: '8px', borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)', color: '#cbd5e1'
                    }}
                    className="hover:scale-110 transition-transform"
                >
                    <Heart size={18} />
                </button>
                <div className="rating-badge" style={{ bottom: '16px', right: '16px', top: 'auto', padding: '6px 10px', borderRadius: '10px' }}>
                    <Star size={14} fill="#ffce00" color="#ffce00" />
                    <span style={{ fontWeight: 700 }}>{product.rating}</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{
                    fontSize: '12px', fontWeight: 700, color: 'var(--primary)',
                    textTransform: 'uppercase', letterSpacing: '1px'
                }}>
                    {product.category}
                </span>
                <h3
                    onClick={handleView}
                    style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.3px', cursor: 'pointer' }}
                    className="hover:text-primary transition-colors"
                >
                    {product.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '12px' }}>High quality organic produce.</p>

                <div className="product-footer" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>Best Price</span>
                        <span className="product-price" style={{ fontSize: '22px', letterSpacing: '-0.5px', color: 'var(--primary)', fontWeight: 800 }}>₹{product.price.toFixed(0)}</span>
                    </div>
                    <button
                        onClick={() => onAdd(product)}
                        className="add-btn btn-primary"
                        style={{
                            width: '48px', height: '48px', borderRadius: '16px',
                            background: 'linear-gradient(135deg, var(--text-dark), #1e293b)',
                            color: 'white',
                            boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        <Plus size={24} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
