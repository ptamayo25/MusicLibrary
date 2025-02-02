// Imports
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import LogoImage from "../../assets/uucnhlogo.png";
// import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";

// Define the Navigation functional component
function Navigation() {
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation within the application
  // const { logout } = useAuthContext(); // Access the logout function from the AuthContext
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Use useState to manage whether the navigation menu is open (for mobile view)

  // Define an array of navigation items, each with a path and a label to display
  const navItems = [
    { path: "/musicLibrary", label: "Music Library" }, //links to song library page
    // { path: "/musicPrograms", label: "Music Programs" }, //links to program manager page STRETCH GOAL
    { path: "/adminuserAccess", label: "User Access" }, // links to admin user access page
  ];

  // Function to toggle the menu's open/closed state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Inverts the current isMenuOpen state
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out..."); // Log the logout process
      // await logout(); // Call the logout function from AuthContext
      console.log("User state cleared successfully."); // Log successful logout
      // Redirect the user to the login page after logout
      navigate("/login");
    } catch (error) {
      // Handle logout errors
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      ); // Log the error
      alert("Error during logout. Please try again."); // Display an alert to the user
    }
  };

  // Render the component JSX
  return (
    // Navigation container with styles
    <nav className={styles.navigation}>
      {/* Brand/logo container */}
      <div className={styles.navigation__brand}>
        <img src={LogoImage} alt="UUCNH Logo" key="logoImage" />
        Music Library
      </div>{" "}
      {/* Button to toggle the mobile menu */}
      <button
        className={styles.navigation__toggle} // Apply styles for the toggle button
        onClick={toggleMenu} // Call the toggleMenu function when clicked
        aria-expanded={isMenuOpen} // Set aria-expanded attribute to indicate menu state for accessibility
        aria-label="Toggle navigation" // Set aria-label for accessibility
      >
        <span className={styles.navigation__toggleIcon}></span>{" "}
        {/* Placeholder for the toggle icon (e.g., hamburger icon) */}
      </button>
      {/* Navigation menu (unordered list) */}
      <ul
        className={`${styles.navigation__menu} ${
          isMenuOpen ? styles["is-open"] : "" // Apply "is-open" class if the menu is open
        }`}
      >
        {/* Render navigation items */}
        {navItems.map((item) => (
          <li key={item.path} className={styles.navigation__item}>
            {" "}
            {/* Use unique key for each list item */}
            {/* Use NavLink to render navigation links with active styling */}
            <NavLink
              to={item.path} // Set the link path
              className={(
                { isActive } // Apply active class if the link is currently active
              ) =>
                `${styles.navigation__link} ${
                  isActive ? styles["is-active"] : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)} // Close the menu when a link is clicked
            >
              {item.label} {/* Display the link label */}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* Display the logout button */}
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

// Export the Navigation component as the default export
export default Navigation;
