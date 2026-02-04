import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Leaf, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, onSearch, onSignInClick, onCartClick, onOrdersClick, user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`navbar ${isScrolled || isOpen ? 'scrolled' : ''}`}>
                <div className="container nav-content">
                    <Link to="/" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="brand-icon">
                            <Leaf size={24} />
                        </div>
                        <span>Fresh<span style={{ color: 'var(--text-dark)' }}>Market</span></span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <a href="/#shop">Shop</a>
                        <a href="/#contact">Contact</a>
                    </div>

                    <div className="nav-actions">
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <AnimatePresence>
                                {showSearch && (
                                    <motion.input
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 220, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        type="text"
                                        placeholder="Search..."
                                        onChange={(e) => onSearch(e.target.value)}
                                        style={{
                                            padding: '10px 20px',
                                            borderRadius: '100px',
                                            border: '1px solid #e2e8f0',
                                            marginRight: '12px',
                                            outline: 'none',
                                            background: '#fff',
                                            fontSize: '14px'
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                            <button onClick={() => setShowSearch(!showSearch)} style={{ color: 'var(--text-dark)', display: 'flex', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Search size={22} />
                            </button>
                        </div>

                        <div className="cart-btn">
                            <button onClick={onCartClick} style={{ color: 'var(--text-dark)', display: 'flex', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <ShoppingCart size={22} />
                            </button>
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </div>

                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 208, 132, 0.1)', padding: '6px 16px', borderRadius: '100px' }}>
                                    <UserIcon size={16} color="var(--primary)" />
                                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-dark)' }}>{user.name.split(' ')[0]}</span>
                                </div>
                                <button
                                    onClick={onOrdersClick}
                                    style={{
                                        color: 'var(--text-light)',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0 8px'
                                    }}
                                    className="hover:text-primary transition-colors"
                                >
                                    My Orders
                                </button>
                                <button onClick={onLogout} style={{ color: 'var(--text-light)', display: 'flex', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-primary" onClick={onSignInClick} style={{ padding: '10px 24px', borderRadius: '100px' }}>
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ color: 'var(--text-dark)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mobile-menu"
                        style={{ borderRadius: '0 0 32px 32px', padding: '40px 24px' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    onChange={(e) => onSearch(e.target.value)}
                                    style={{
                                        padding: '16px 20px',
                                        borderRadius: '16px',
                                        border: '1px solid #e2e8f0',
                                        width: '100%',
                                        fontSize: '16px',
                                        background: '#f8fafc'
                                    }}
                                />
                            </div>
                            <Link to="/" onClick={() => setIsOpen(false)} style={{ fontSize: '18px', fontWeight: 600 }}>Home</Link>
                            <a href="/#shop" onClick={() => setIsOpen(false)} style={{ fontSize: '18px', fontWeight: 600 }}>Shop</a>
                            <a href="/#contact" onClick={() => setIsOpen(false)} style={{ fontSize: '18px', fontWeight: 600 }}>Contact</a>
                            <a href="#" onClick={() => { onCartClick(); setIsOpen(false); }} style={{ fontSize: '18px', fontWeight: 600 }}>Cart ({cartCount})</a>

                            {user ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <button
                                        onClick={() => { onOrdersClick(); setIsOpen(false); }}
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: 600,
                                            textAlign: 'left',
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            color: 'inherit',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        My Orders
                                    </button>
                                    <button onClick={() => { onLogout(); setIsOpen(false); }} className="btn btn-outline" style={{ border: 'none', background: '#fee2e2', color: '#ef4444', justifyContent: 'center' }}>
                                        Logout ({user.name})
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => { onSignInClick(); setIsOpen(false); }} className="btn btn-primary" style={{ width: '100%', padding: '18px', borderRadius: '16px', marginTop: '10px' }}>
                                    Sign In
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
