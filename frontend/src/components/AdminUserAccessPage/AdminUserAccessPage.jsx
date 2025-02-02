import LogoImage from "../../assets/uucnhlogo.png";
import { Link } from "react-router-dom";
import "./AdminUserAccess.css";
import "../styles/buttons.css";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

//TODO - Add function to logout
//TODO - Update link to home page
//TODO - Add function to update user access
//TODO - Save button to save and update changes

const AdminUserAccess = () => {
  const [isselectedUser, setIsSelectedUser] = useState(false);
  // const [isDropdownVisible, setIsDropDownVisible] = useState(false);
  const [isSuccessNotification, setIsSuccessNotification] = useState(false);
  // const handleLogout = () => {
  //   console.log("Logging out...");
  // };

  const handleSave = () => {
    setIsSuccessNotification(true);

    setTimeout(() => {
      setIsSuccessNotification(false);
    }, 3000);
  };

  return (
    <>
      <section className="header-container">
        <header className="header">
          <img className="uucnhlogo" src={LogoImage} alt="Logo" />
          <Link className="links" to="/">
            Back to Music Library
          </Link>
        </header>
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
          <div className="useraccess-grid-container selected-user">
            <div id="first-name" className="grid-item">
              JustJustJustJustJust
            </div>
            <div id="last-name" className="grid-item">
              TestingTestingTesting
            </div>
            <div id="email" className="grid-item">
              Dis@emailemailemailemail.com
            </div>

            <div
              id="user-access"
              className="grid-item"
              onClick={() => setIsSelectedUser(true)}
            >
              <div className="user-dropdown">
                <select
                  id="user-role"
                  value={isselectedUser}
                  onChange={(e) => setIsSelectedUser(e.target.value)}
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
      {isSuccessNotification && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          User access has been updated successfully!
        </Alert>
      )}
      <button onClick={handleSave} className="save-button hover-button">
        Save
      </button>
    </>
  );
};

export default AdminUserAccess;
