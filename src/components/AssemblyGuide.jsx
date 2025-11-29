import { useState } from 'react';
import './AssemblyGuide.css';
import stepImage from '../assets/feature_4.png'; // Placeholder for steps

const steps = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    title: `Step ${i + 1}`,
    image: stepImage
}));

const AssemblyGuide = () => {
    const [selectedStep, setSelectedStep] = useState(null);

    return (
        <section id="assembly" className="assembly section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Assembly Guide</h2>
                    <p className="section-subtitle">Follow the step-by-step visual instructions.</p>
                </div>

                <div className="assembly-grid">
                    {steps.map((step) => (
                        <div className="assembly-step-card" key={step.id} onClick={() => setSelectedStep(step)}>
                            <div className="step-number">{step.id}</div>
                            <img src={step.image} alt={step.title} loading="lazy" />
                            <div className="step-overlay">
                                <span>View Step</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedStep && (
                <div className="modal-backdrop" onClick={() => setSelectedStep(null)}>
                    <div className="modal-content assembly-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedStep(null)}>&times;</button>
                        <img src={selectedStep.image} alt={selectedStep.title} />
                        <div className="modal-caption">
                            <h3>{selectedStep.title}</h3>
                            <p>Detailed instruction for this step goes here.</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AssemblyGuide;
