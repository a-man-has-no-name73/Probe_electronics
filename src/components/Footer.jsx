import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3>Probe Electronics</h3>
                    <p>The ultimate electronics starter kit for students and makers.</p>
                </div>
                <div className="footer-section">
                    <h4>Links</h4>
                    <ul>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#specs">Specs</a></li>
                        <li><a href="#order">Order Now</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: <a href="mailto:probeelctronics@gmail.com" className="email-link">probeelctronics@gmail.com</a></p>
                    <p>Phone: <a href="tel:+8801908744679" className="phone-link">+880 1908 744679</a></p>
                    <p>
                        <a 
                            href="https://www.facebook.com/share/1YPckMYSGj/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            Facebook Page
                        </a>
                    </p>
                    <p>
                        <a 
                            href="https://youtube.com/@probe_electronics?si=4vsFDvjJAX4ljw6I" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-link youtube-link"
                        >
                            YouTube Channel
                        </a>
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Probe Electronics. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
