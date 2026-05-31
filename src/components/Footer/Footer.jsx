import './Footer.css';

function Footer() {
    return (
        <footer className="Footer">
            <div className="Footer-content">
                <p className="Footer-copyright">&copy; 2026 PlateScout. All rights reserved.</p>
                <ul className="Footer-links">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Privacy</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
