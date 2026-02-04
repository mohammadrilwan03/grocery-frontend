import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ShopSection from '../components/ShopSection';
import ContactSection from '../components/ContactSection';
import { motion } from 'framer-motion';

const HomePage = ({ addToCart, searchQuery }) => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1 }}
        >
            <Hero />

            <div style={{ background: '#fff' }}>
                <Features />
            </div>

            <ShopSection addToCart={addToCart} searchQuery={searchQuery} />

            <section className="container" style={{ margin: '80px auto' }}>
                <div className="banner">
                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
                        <h2 className="text-gradient">Get 20% Discount on your first order</h2>
                        <p style={{ marginBottom: '40px', opacity: 0.8, fontSize: '18px' }}>
                            Join the FreshMarket community and get exclusive offers delivered to your inbox every week.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                style={{
                                    padding: '18px 30px',
                                    borderRadius: '16px',
                                    border: 'none',
                                    flex: 1,
                                    minWidth: '280px',
                                    fontSize: '16px',
                                    outline: 'none',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: '#fff',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            />
                            <button className="btn btn-primary">Subscribe</button>
                        </div>
                    </div>
                    <div className="banner-deco"></div>
                </div>
            </section>

            <ContactSection />
        </motion.main>
    );
};

export default HomePage;
