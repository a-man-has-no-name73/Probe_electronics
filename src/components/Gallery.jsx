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

                <div className="gallery-video-container">
                    <iframe
                        width="100%"
                        height="500"
                        src="https://www.youtube.com/embed/jzmNvUf239M"
                        title="Probe Electronics Kit Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
