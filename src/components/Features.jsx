import React from 'react';
import { Truck, ShieldCheck, Clock, Phone } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: "Free Delivery",
        desc: "Orders above $50",
        color: "#eff6ff",
        iconColor: "#3b82f6"
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        desc: "Protected by SSL",
        color: "#ecfdf5",
        iconColor: "#10b981"
    },
    {
        icon: Clock,
        title: "Fast Harvest",
        desc: "Fresh within 24h",
        color: "#fff7ed",
        iconColor: "#f59e0b"
    },
    {
        icon: Phone,
        title: "Expert Support",
        desc: "Always available",
        color: "#f5f3ff",
        iconColor: "#8b5cf6"
    }
];

const Features = () => {
    return (
        <section className="container" style={{ paddingBottom: '100px' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px'
            }}>
                {features.map((feature, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '30px',
                        borderRadius: '24px',
                        background: 'white',
                        border: '1px solid #f1f5f9',
                        transition: 'all 0.3s ease'
                    }} className="hover:shadow-lg">
                        <div style={{
                            background: feature.color,
                            color: feature.iconColor,
                            padding: '16px',
                            borderRadius: '16px',
                            display: 'flex'
                        }}>
                            <feature.icon size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>{feature.title}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: 500 }}>{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
