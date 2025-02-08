import "./LoginPage.css";
import "../styles/buttons.css";
import LogoImage from "../../assets/uucnhlogo.png";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4001/auth/google"; // Redirect to Google OAuth route
  };

  return (
    <div className="login-page"> {/* Wrapper class */}
      <div className="login-container">
        <form className="login-form">
          <img className="uucnhlogo" src={LogoImage} alt="Logo" />
          <h2>Welcome!</h2>
          <h2>Login or Register</h2>

          <button type="button" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
