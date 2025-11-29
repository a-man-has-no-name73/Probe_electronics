'use client'

import { useEffect, useRef } from 'react';
import './BoxContents.css';

const items = [
    "DSO138 Digital Oscilloscope PCB",
    "XR2206 Function Generator PCB",
    "Transparent Acrylic Case",
    "BNC Probe with Alligator Clips",
    "Power Cable (USB to DC)",
    "Complete Component Set (Resistors, Capacitors)",
    "Assembly Instructions & Schematic"
];

const BoxContents = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section className="box-contents section" ref={sectionRef}>
            <div className="container box-container">
                <div className="box-image-wrapper animate-fade-up">
                    <img src="/gallery_1.png" alt="Lab-in-A-Box Kit Contents" className="box-image" />
                    <div className="box-decoration"></div>
                </div>
                <div className="box-info animate-fade-up delay-200">
                    <h2 className="section-title">What's Inside the Box?</h2>
                    <p className="section-subtitle">Everything you need to build your own lab.</p>
                    <ul className="box-list">
                        {items.map((item, index) => (
                            <li key={index} style={{ animationDelay: `${index * 100 + 300}ms` }}>
                                <span className="check-icon">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default BoxContents;
