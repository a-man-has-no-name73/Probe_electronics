'use client'

import { useEffect, useRef } from 'react';
import './Testimonials.css';

const reviews = [
  {
    name: "Ahmed R.",
    role: "EEE Student, BUET",
    text: "This kit saved my semester! The oscilloscope is surprisingly accurate for the price. Highly recommended for lab work.",
    rating: 5
  },
  {
    name: "Sarah K.",
    role: "Hobbyist Maker",
    text: "Building it was half the fun. The instructions were clear, and now I have a working function generator for my synth projects.",
    rating: 5
  },
  {
    name: "Tanvir H.",
    role: "Engineering Student",
    text: "Great value for money. The acrylic case is a nice touch, keeps everything safe in my backpack.",
    rating: 4
  },
  {
    name: "Michael B.",
    role: "Electronics Teacher",
    text: "I recommend this to all my students. It's the best way to understand how these instruments actually work.",
    rating: 5
  }
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const speed = 1; // Pixels per frame

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += speed;
        scrollAmount += speed;

        // Reset if reached end (infinite scroll illusion would require duplicating items, simple reset for now)
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
           // scrollContainer.scrollLeft = 0; // Hard reset
        }
      }
      requestAnimationFrame(scroll);
    };
    
    // const animationId = requestAnimationFrame(scroll);
    // return () => cancelAnimationFrame(animationId);
    // Auto-scroll can be annoying, let's stick to manual horizontal scroll with snap
  }, []);

  return (
    <section id="reviews" className="testimonials section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Users Say</h2>
          <p className="section-subtitle">Trusted by students and makers everywhere.</p>
        </div>
        
        <div className="testimonials-carousel" ref={scrollRef}>
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-rating">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <div className="author-avatar">{review.name.charAt(0)}</div>
                <div className="author-info">
                  <span className="author-name">{review.name}</span>
                  <span className="author-role">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
