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
                    <p>Email: support@probeelectronics.com</p>
                    <p>Phone: +880 1234 567890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Probe Electronics. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
