import LogoImage from "../assets/uucnhlogo.png";
import "./styles/adminuseraccess.css";
import "./styles/buttons.css";
import { useState } from "react";

//TODO - Add function to logout
//TODO - Update link to home page
//TODO - Add function to update user access
//TODO - Save button to save and update changes

const AdminUserAccess = () => {
  const [userAccess, setUserAccess] = useState("");
  const handleLogout = () => {
    console.log("Logging out...");
  };
  return (
    <>
      <section className="header-container">
        <header className="header">
          <img className="uucnhlogo" src={LogoImage} alt="Logo" />
          <button className="logout-button hover-button" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <nav>
          <a> Home </a> {/* LINK TO BE UPDATED WHEN CREATED  */}
        </nav>
      </section>
      <section>
        <h3> UUCNH Music Library User Privilege Update</h3>
        <thead>
          <div className="useraccess-grid-container">
            <div id="first-name" className="grid-title grid-item">
              First Name
            </div>
            <div id="last-name" className="grid-title grid-item">
              Last Name
            </div>
            <div id="email" className="grid-title grid-item">
              Email
            </div>
            <div id="user-access" className="grid-title grid-item">
              User Access
            </div>
          </div>
        </thead>
        <tbody>
          <div className="useraccess-grid-container">
            <div id="first-name" className="grid-item">
              JustJustJustJustJust
            </div>
            <div id="last-name" className="grid-item">
              TestingTestingTesting
            </div>
            <div id="email" className="grid-item">
              Dis@emailemailemailemail.com
            </div>

            <div id="user-access" className="grid-item">
              <div className="user-dropdown">
                <select
                  id="user-role"
                  value={userAccess}
                  onChange={(e) => setUserAccess(e.target.value)}
                >
                  <option value="">Select </option>
                  <option value="admin">Admin</option>
                  <option value="subadmin">Sub-Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
        </tbody>
      </section>
      <button className="save-button hover-button">Save</button>
    </>
  );
};

export default AdminUserAccess;
