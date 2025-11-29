'use client'

import { useEffect, useRef, useState } from 'react';
import './Timeline.css';

const steps = [
    { title: "Order Kit", description: "Place your order securely online.", icon: "🛒" },
    { title: "Receive", description: "Get your kit delivered to your campus.", icon: "📦" },
    { title: "Assemble", description: "Follow the guide to build your lab.", icon: "🔧" },
    { title: "Experiment", description: "Start visualizing signals instantly.", icon: "⚡" }
];

const Timeline = () => {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress based on how much of the section is visible/scrolled past
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrolled = windowHeight - rect.top;
                const total = windowHeight + rect.height;
                const percentage = Math.min(Math.max((scrolled / total) * 1.5, 0), 1); // Multiplier to finish earlier
                setProgress(percentage * 100);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="how-it-works" className="timeline section" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">From order to experiment in 4 simple steps.</p>
                </div>

                <div className="timeline-container">
                    <div className="timeline-line-bg"></div>
                    <div className="timeline-line-progress" style={{ width: `${progress}%` }}></div>

                    <div className="timeline-steps">
                        {steps.map((step, index) => (
                            <div className="timeline-step" key={index}>
                                <div className={`step-icon ${progress > (index / (steps.length - 1)) * 90 ? 'active' : ''}`}>
                                    {step.icon}
                                </div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
