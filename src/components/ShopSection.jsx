import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { products as localProducts, categories } from '../data/products';

const ShopSection = ({ addToCart, onView, searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://grocery-backend-41lt.onrender.com/api/products');
                const data = await response.json();
                setProducts(data.length > 0 ? data : localProducts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products from backend, using local data:", error);
                setProducts(localProducts);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-light)' }}>Loading fresh items...</div>
            </div>
        );
    }

    return (
        <section id="shop" className="shop-section section-padding">
            <div className="container">
                <div className="section-header" style={{ marginBottom: '60px' }}>
                    <h2 className="section-title">Fresh from the <span className="text-gradient">Local Farms</span></h2>
                    <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '20px auto 0', fontSize: '18px', fontWeight: 500 }}>
                        We handpick every item to ensure you get only the finest quality.
                    </p>
                </div>

                {/* Categories Filter */}
                <div className="category-filter">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                outline: 'none',
                                fontSize: '14px'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <motion.div
                    layout
                    className="products-grid"
                    style={{ marginTop: '40px' }}
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id || product.id} product={product} onAdd={addToCart} onView={onView} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-light)', background: '#f8fafc', borderRadius: '32px', marginTop: '40px' }}
                    >
                        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>No products found</h3>
                        <p style={{ marginTop: '10px', fontSize: '16px' }}>Try searching for something else or changing the category.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default ShopSection;
