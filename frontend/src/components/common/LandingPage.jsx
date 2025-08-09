import { Link } from "react-router-dom";
import "../../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <header className="landing-page-header">
        <h1>Welcome to Codelorien</h1>
        <p>
          Your go-to platform for solving coding problems and improving your
          skills!
        </p>
        <div className="landing-buttons">
          <Link to="/auth" className="landing-button">
            Get Started
          </Link>
          <Link to="/problems" className="landing-button">
            Explore Problems
          </Link>
        </div>
      </header>

      <section className="about-section">
        <h2>What is Codelorien?</h2>
        <p>
          Codelorien is an online platform where you can practice coding
          problems, improve your algorithmic skills, and participate in coding
          challenges. Whether you're a beginner or an advanced coder, there's
          always something for you to solve.
        </p>
      </section>

      <footer className="landing-footer">
        <p>
          &copy; {new Date().getFullYear()} Codelorien. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
