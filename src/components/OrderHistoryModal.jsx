import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Calendar, Tag, ChevronDown, ChevronUp } from 'lucide-react';

const OrderHistoryModal = ({ isOpen, onClose, userId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        if (isOpen && userId) {
            fetchOrders();
        }
    }, [isOpen, userId]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/orders/${userId}`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        style={{
                            background: 'var(--glass)', backdropFilter: 'blur(25px)',
                            padding: '40px', borderRadius: '32px',
                            width: '100%', maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto',
                            position: 'relative', boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--glass-border)'
                        }}
                    >
                        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: '#f8fafc', padding: '10px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <Package size={40} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Order History</h2>
                            <p style={{ color: 'var(--text-light)' }}>Track your past purchases</p>
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <div className="loader">Loading orders...</div>
                            </div>
                        ) : orders.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {orders.map((order) => (
                                    <div
                                        key={order._id}
                                        style={{
                                            background: '#f8fafc',
                                            borderRadius: '24px',
                                            padding: '24px',
                                            border: '1px solid #f1f5f9',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <div
                                            onClick={() => toggleExpand(order._id)}
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                        >
                                            <div style={{ display: 'flex', gap: '20px' }}>
                                                <div style={{ background: 'white', padding: '12px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Calendar size={20} color="var(--primary)" />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 800, fontSize: '16px' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                                                    <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Order ID: {order._id.slice(-6).toUpperCase()}</div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div>
                                                    <div style={{ fontWeight: 900, fontSize: '18px', color: 'var(--text-dark)' }}>₹{order.totalAmount}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700 }}>{order.status || 'Success'}</div>
                                                </div>
                                                {expandedOrder === order._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {expandedOrder === order._id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed #e2e8f0' }}>
                                                        <h5 style={{ fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <Tag size={16} /> Items
                                                        </h5>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            {order.items.map((item, idx) => (
                                                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '10px 16px', borderRadius: '12px', fontSize: '14px' }}>
                                                                    <span>{item.name} x {item.quantity}</span>
                                                                    <span style={{ fontWeight: 700 }}>₹{item.price}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div style={{ marginTop: '20px', fontSize: '13px', color: 'var(--text-light)', background: 'rgba(0, 208, 132, 0.05)', padding: '12px', borderRadius: '12px' }}>
                                                            <strong>Shipping to:</strong> {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                                <Package size={48} color="#e2e8f0" style={{ marginBottom: '16px' }} />
                                <p style={{ color: 'var(--text-light)', fontSize: '18px' }}>No orders found yet.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OrderHistoryModal;
