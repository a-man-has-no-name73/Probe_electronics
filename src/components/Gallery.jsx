'use client'

import { useState, useEffect } from 'react';
import './Gallery.css';

const images = ['/gallery_1.png', '/gallery_2.jpg', '/gallery_3.jpg', '/feature_1.png', '/feature_2.png'];

const Gallery = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="gallery" className="gallery section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">See It In Action</h2>
                    <p className="section-subtitle">A closer look at the Probe Electronics kit.</p>
                </div>

                <div className="gallery-slideshow-container">
                    <div className="gallery-slide-wrapper">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`gallery-slide ${index === currentImageIndex ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${img})` }}
                            ></div>
                        ))}
                    </div>

                    <div className="gallery-indicators">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
