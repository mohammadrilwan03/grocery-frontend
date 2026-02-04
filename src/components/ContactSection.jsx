import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://grocery-backend-41lt.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                toast.error(data.message || 'Failed to send message');
            }
        } catch (err) {
            toast.error('Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-padding" style={{ background: '#f8fafc', borderRadius: '80px 80px 0 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'var(--primary-glow)', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }}></div>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Let's <span className="text-gradient">Grow</span> Together</h2>
                    <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '20px auto 0', fontSize: '18px', fontWeight: 500 }}>
                        Our team is always ready to hear from you. Whether it's a question, feedback, or a partnership inquiry.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '60px',
                    marginTop: '60px',
                    alignItems: 'start'
                }}>
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                    >
                        <div style={{ background: 'var(--glass)', backdropFilter: 'blur(20px)', padding: '40px', borderRadius: '32px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-sm)' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '32px', letterSpacing: '-0.5px' }}>Contact Details</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '14px', borderRadius: '16px', color: '#6366f1' }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 800, fontSize: '15px' }}>Email Address</h4>
                                        <p style={{ color: 'var(--text-light)', fontWeight: 500, marginTop: '2px' }}>hello@freshmarket.com</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(0, 208, 132, 0.1)', padding: '14px', borderRadius: '16px', color: 'var(--primary)' }}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 800, fontSize: '15px' }}>Phone Support</h4>
                                        <p style={{ color: 'var(--text-light)', fontWeight: 500, marginTop: '2px' }}>+1 (800) FRESH-NOW</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '14px', borderRadius: '16px', color: '#f59e0b' }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 800, fontSize: '15px' }}>Visit Us</h4>
                                        <p style={{ color: 'var(--text-light)', fontWeight: 500, marginTop: '2px' }}>742 Evergreen Terrace, NY</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} style={{
                            background: 'var(--glass)', backdropFilter: 'blur(20px)', padding: '48px', borderRadius: '40px',
                            display: 'flex', flexDirection: 'column', gap: '24px',
                            boxShadow: 'var(--shadow-lg)', border: '1px solid var(--glass-border)'
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)', marginLeft: '4px' }}>FIRST NAME</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Jane"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        style={{ padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '15px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)', marginLeft: '4px' }}>LAST NAME</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        style={{ padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '15px' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)', marginLeft: '4px' }}>EMAIL ADDRESS</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="jane@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{ padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '15px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)', marginLeft: '4px' }}>MESSAGE</label>
                                <textarea
                                    required
                                    placeholder="How can we help you?"
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    style={{ padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', outline: 'none', resize: 'none', background: '#f8fafc', fontSize: '15px' }}
                                ></textarea>
                            </div>
                            <button
                                className="btn btn-primary"
                                disabled={loading}
                                style={{
                                    padding: '20px',
                                    borderRadius: '20px',
                                    justifyContent: 'center',
                                    width: '100%',
                                    fontSize: '18px',
                                    fontWeight: 800,
                                    animation: 'pulse-glow 2s infinite',
                                    boxShadow: '0 10px 20px var(--primary-glow)'
                                }}
                            >
                                {loading ? 'Sending Message...' : 'Send Your Message'} <Send size={22} style={{ marginLeft: '10px' }} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
