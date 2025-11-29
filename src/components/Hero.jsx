'use client'

import { useEffect, useRef, useState } from 'react';
import './Hero.css';

// Array of product images to rotate through
const productImages = [
    '/photo_2025-11-29_18-35-13.jpg',
    '/photo_2025-11-29_18-36-00.jpg',
    '/photo_2025-11-29_18-36-05.jpg',
    '/photo_2025-11-29_18-36-10.jpg',
    '/photo_2025-11-29_18-36-15.jpg',
    '/photo_2025-11-29_19-25-48.jpg'
];

const Hero = () => {
    const heroRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-rotate images every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

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
                        {productImages.map((img, index) => (
                            <img 
                                key={index}
                                src={img} 
                                alt="DSO138 Digital Oscilloscope and Function Generator" 
                                className={`hero-rotating-image ${index === currentImageIndex ? 'active' : ''}`}
                                style={{
                                    opacity: index === currentImageIndex ? 1 : 0,
                                    transition: 'opacity 1s ease-in-out'
                                }}
                            />
                        ))}
                        <div className="glow-effect"></div>
                    </div>
                    
                    {/* Image indicators */}
                    <div className="hero-image-indicators">
                        {productImages.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator-dot ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                                aria-label={`View image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="hero-background-grid"></div>
        </section>
    );
};

export default Hero;
