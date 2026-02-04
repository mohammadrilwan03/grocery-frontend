import React from 'react';
import { Leaf, Twitter, Facebook, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer" style={{ background: '#020617', color: 'white', border: 'none', borderRadius: '60px 60px 0 0', marginTop: '100px' }}>
            <div className="container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
                <div className="footer-grid" style={{ marginBottom: '60px' }}>
                    <div style={{ maxWidth: '320px' }}>
                        <div className="brand" style={{ marginBottom: '24px', color: 'white' }}>
                            <div className="brand-icon">
                                <Leaf size={24} />
                            </div>
                            <span>FreshMarket</span>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px' }}>
                            Redefining the way you shop for groceries. We bridge the gap between local farmers and your doorstep.
                        </p>
                        <div className="social-links" style={{ gap: '12px' }}>
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="social-btn" style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-title" style={{ fontWeight: 800, fontSize: '18px', marginBottom: '28px' }}>Explore</h4>
                        <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li><a href="#" style={{ color: '#94a3b8', fontSize: '15px' }}>Our Farmers</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', fontSize: '15px' }}>Quality Standards</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', fontSize: '15px' }}>Store Locator</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', fontSize: '15px' }}>Sponsorships</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title" style={{ fontWeight: 800, fontSize: '18px', marginBottom: '28px' }}>Support</h4>
                        <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li><a href="#" style={{ color: '#94a3b8', fontSize: '15px' }}>Help Center</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', fontSize: '15px' }}>Delivery Areas</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', fontSize: '15px' }}>Track Order</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', fontSize: '15px' }}>Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title" style={{ fontWeight: 800, fontSize: '18px', marginBottom: '28px' }}>Newsletter</h4>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
                            Get weekly recipes and seasonal harvest updates.
                        </p>
                        <form style={{ position: 'relative' }}>
                            <input
                                type="email"
                                placeholder="Email"
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    borderRadius: '14px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '14px'
                                }}
                            />
                            <button style={{
                                position: 'absolute', right: '6px', top: '6px',
                                background: 'white', color: 'black',
                                width: '40px', height: '40px', borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>&copy; 2024 FreshMarket. Built with passion for nature.</p>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <a href="#" style={{ color: '#64748b', fontSize: '14px' }}>Terms</a>
                        <a href="#" style={{ color: '#64748b', fontSize: '14px' }}>Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
