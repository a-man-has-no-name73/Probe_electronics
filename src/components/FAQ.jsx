'use client'

import { useState } from 'react';
import './FAQ.css';

const faqs = [
    {
        question: "Is this kit suitable for complete beginners?",
        answer: "Yes! The kit is designed for students and beginners. It comes with a detailed step-by-step assembly guide and all components are clearly labeled."
    },
    {
        question: "Do I need a soldering iron?",
        answer: "Yes, this is a DIY kit that requires soldering. It's a great way to learn or practice your soldering skills. You'll need a basic soldering iron and solder wire."
    },
    {
        question: "What if I break a component during assembly?",
        answer: "Don't worry! We include a few extra spare parts for common components like resistors and capacitors. If you break something critical, contact our support and we can help."
    },
    {
        question: "Does it come with a power supply?",
        answer: "The kit includes a USB to DC cable, so you can power it using any standard USB phone charger or power bank (5V). A separate 9V adapter is not required but supported."
    },
    {
        question: "Can I use it for audio frequency testing?",
        answer: "Absolutely. The XR2206 generates signals up to 1MHz, which covers the entire audio range (20Hz-20kHz) and more, making it perfect for audio amplifier testing."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-subtitle">Got questions? We've got answers.</p>
                </div>

                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            key={index}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                <span className="faq-icon">+</span>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
