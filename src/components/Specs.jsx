'use client'

import { useEffect, useRef } from 'react';
import './Specs.css';

const dsoSpecs = [
    { label: "Bandwidth", value: "0 - 200KHz" },
    { label: "Sampling Rate", value: "1Msps max" },
    { label: "Sensitivity", value: "10mV/div - 5V/div" },
    { label: "Timebase", value: "10us/div - 500s/div" },
    { label: "Display", value: "2.4\" Color TFT LCD" },
    { label: "Input Impedance", value: "1MΩ / 20pF" }
];

const xrSpecs = [
    { label: "Frequency Range", value: "1Hz - 1MHz" },
    { label: "Waveforms", value: "Sine, Triangle, Square" },
    { label: "Impedance", value: "600Ω + 10%" },
    { label: "Supply Voltage", value: "9-12V DC" },
    { label: "Amplitude", value: "0 - 3V (at 9V DC)" },
    { label: "Distortion", value: "Less than 1% (Sine)" }
];

const Specs = () => {
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
            { threshold: 0.1 }
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
        <section id="specs" className="specs section" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Technical Specifications</h2>
                    <p className="section-subtitle">Professional capabilities in a student kit.</p>
                </div>

                <div className="specs-container">
                    <div className="spec-column">
                        <h3 className="spec-heading">DSO138 Oscilloscope</h3>
                        <div className="spec-table">
                            {dsoSpecs.map((spec, index) => (
                                <div className="spec-row" key={index} style={{ animationDelay: `${index * 50}ms` }}>
                                    <span className="spec-label">{spec.label}</span>
                                    <span className="spec-value">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="spec-column">
                        <h3 className="spec-heading">XR2206 Function Generator</h3>
                        <div className="spec-table">
                            {xrSpecs.map((spec, index) => (
                                <div className="spec-row" key={index} style={{ animationDelay: `${index * 50 + 300}ms` }}>
                                    <span className="spec-label">{spec.label}</span>
                                    <span className="spec-value">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Specs;
