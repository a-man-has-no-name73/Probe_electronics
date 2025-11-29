'use client'

import { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, []);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) * 0.02;
        const moveY = (clientY - window.innerHeight / 2) * 0.02;

        const image = document.querySelector('.hero-image-container img');
        if (image) {
            image.style.transform = `translate(${moveX}px, ${moveY}px) rotate(-5deg)`;
        }
    };

    return (
        <section className="hero section" ref={heroRef} onMouseMove={handleMouseMove}>
            <div className="container hero-container">
                <div className="hero-content animate-fade-up">
                    <span className="hero-badge">Student Special Offer</span>
                    <h1 className="hero-title">
                        Master Electronics with <span className="highlight">Probe Electronics</span>
                    </h1>
                    <p className="hero-subtitle">
                        The ultimate combo kit: DSO138 Oscilloscope + XR2206 Function Generator.
                        Build, test, and visualize signals like a pro.
                    </p>
                    <ul className="hero-benefits">
                        <li>✓ Complete DIY Soldering Kit</li>
                        <li>✓ Real-time Waveform Visualization</li>
                        <li>✓ Perfect for University Labs</li>
                    </ul>
                    <div className="hero-actions">
                        <button className="cta-button-large" onClick={() => document.getElementById('order').scrollIntoView({ behavior: 'smooth' })}>
                            Get the Kit - <span className="price-old">৳4000</span> <span className="price-new">৳3500</span>
                        </button>
                        <a href="#how-it-works" className="secondary-link">See how it works →</a>
                    </div>
                </div>
                <div className="hero-image-wrapper animate-fade-up delay-200">
                    <div className="hero-image-container">
                        <img src="/hero_image.png" alt="DSO138 Digital Oscilloscope and Function Generator" />
                        <div className="glow-effect"></div>
                    </div>
                </div>
            </div>
            <div className="hero-background-grid"></div>
        </section>
    );
};

export default Hero;
