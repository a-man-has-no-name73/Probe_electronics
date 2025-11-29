'use client'

import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <div className="logo-container">
                    <img src="/logo.jpg" alt="Probe Electronics" className="logo-img" />
                    <span className="logo-text">Probe Electronics</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#specs">Specs</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                </ul>
                <button className="cta-button-small" onClick={() => document.getElementById('order').scrollIntoView({ behavior: 'smooth' })}>
                    Buy Now
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
