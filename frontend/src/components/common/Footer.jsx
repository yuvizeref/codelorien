import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span>
          &copy; {new Date().getFullYear()} Codelorien. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
