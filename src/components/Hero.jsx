import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Leaf, Clock, MapPin } from 'lucide-react';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-grid">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="hero-tag">
                        <span style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '100px',
                            fontSize: '10px',
                            fontWeight: 800
                        }}>NEW</span>
                        #1 Organic Grocery Store in Town
                    </div>

                    <h1 className="hero-title">
                        Pure Nature <br />
                        <span className="text-gradient">Everywhere.</span>
                    </h1>

                    <p className="hero-text" style={{ fontSize: '20px', lineHeight: 1.6 }}>
                        Experience the best of nature with over <strong style={{ color: 'var(--primary)', fontSize: '26px' }}>30 Premium Varieties</strong>
                        of organic produce, ethically sourced and delivered fresh to your door.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <button className="btn btn-primary" style={{ padding: '18px 40px', borderRadius: '16px', animation: 'pulse-glow 2s infinite' }}>
                            Shop Now <ArrowRight size={20} />
                        </button>
                        <button className="btn btn-outline" style={{ padding: '18px 40px', borderRadius: '16px' }}>
                            Our Story
                        </button>
                    </div>

                    <div className="hero-stats" style={{ marginTop: '60px' }}>
                        <div>
                            <p style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>35k+</p>
                            <p style={{ color: 'var(--text-light)', fontWeight: 500 }}>Active Users</p>
                        </div>
                        <div className="stat-divider"></div>
                        <div>
                            <p style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>100%</p>
                            <p style={{ color: 'var(--text-light)', fontWeight: 500 }}>Bio-Certified</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-img-box"
                >
                    <div style={{ position: 'relative' }}>
                        <img
                            src="https://loremflickr.com/800/800/organic,grocery"
                            alt="Fresh Market"
                            className="hero-img"
                        />

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="floating-card"
                            style={{ top: '20%', right: '-30px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '12px' }}>
                                    <Star size={20} fill="#f59e0b" color="#f59e0b" />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 800, fontSize: '14px' }}>4.9 Rating</p>
                                    <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>2k+ Reviews</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="floating-card"
                            style={{ bottom: '10%', left: '-40px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '12px', color: 'var(--primary)' }}>
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 800, fontSize: '14px' }}>Fast Delivery</p>
                                    <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>Within 30 Mins</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
