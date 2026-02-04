import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, LogIn, ArrowRight, User } from 'lucide-react';
import { toast } from 'sonner';

const SignInModal = ({ isOpen, onClose, onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        try {
            const response = await fetch(`https://grocery-backend-41lt.onrender.com${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Something went wrong');

            if (isLogin) {
                localStorage.setItem('freshToken', data.token);
                localStorage.setItem('freshUser', JSON.stringify(data.user));
                onAuthSuccess(data.user);
                toast.success(`Welcome back, ${data.user.name}!`);
                onClose();
            } else {
                toast.success('Account created! Please sign in.');
                setIsLogin(true);
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
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
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        style={{
                            background: 'var(--glass)', backdropFilter: 'blur(25px)',
                            padding: '40px', borderRadius: '32px',
                            width: '100%', maxWidth: '440px', position: 'relative',
                            boxShadow: 'var(--shadow-lg)', border: '1px solid var(--glass-border)'
                        }}
                    >
                        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: '#f8fafc', color: '#64748b', padding: '10px', borderRadius: '14px' }}>
                            <X size={20} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <div style={{
                                background: 'rgba(0, 208, 132, 0.1)', color: 'var(--primary)',
                                width: '60px', height: '60px', borderRadius: '20px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
                            }}>
                                <LogIn size={28} />
                            </div>
                            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                            <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>
                                {isLogin ? 'Enter your credentials to access your account' : 'Join our fresh community today'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {!isLogin && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 700 }}>Full Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 700 }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 700 }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                                    />
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    borderRadius: '20px',
                                    marginTop: '10px',
                                    fontSize: '18px',
                                    fontWeight: 800,
                                    animation: 'pulse-glow 2s infinite',
                                    boxShadow: '0 10px 20px var(--primary-glow)'
                                }}
                            >
                                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')} <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                            </button>

                            <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '15px' }}>
                                {isLogin ? "New here?" : "Already have an account?"}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    style={{ color: 'var(--primary)', fontWeight: 700, marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    {isLogin ? 'Join FreshMarket' : 'Sign In instead'}
                                </button>
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SignInModal;
