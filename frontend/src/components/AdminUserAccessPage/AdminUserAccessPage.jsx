import LogoImage from "../../assets/uucnhlogo.png";
import { Link } from "react-router-dom";
import "./AdminUserAccess.css";
import "../styles/buttons.css";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const AdminUserAccess = () => {
  const [users, setUsers] = useState([]);
  const [temporarySelectedUser, setTemporarySelectedUser] = useState("");
  const [isSuccessNotification, setIsSuccessNotification] = useState(false);
  const [isDropdownVisible, setIsDropDownVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchAllUsers = async () => {
    try {
      const authUrl = import.meta.env.VITE_AUTH_SERVICE_URL;

      if (!authUrl) {
        console.log("URL not found.");
        return;
      }

      const response = await fetch(`${authUrl}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUserId(user._id);
    setIsDropDownVisible(true);
  };

  const handleSave = () => {
    setIsSuccessNotification(true);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === selectedUserId
          ? { ...user, access: temporarySelectedUser }
          : user
      )
    );
    setSelectedUserId(null);
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
        <div className="useraccess-grid-container">
          <div className="grid-title grid-item">First Name</div>
          <div className="grid-title grid-item">Last Name</div>
          <div className="grid-title grid-item">Email</div>
          <div className="grid-title grid-item">User Access</div>
        </div>
        {users.map((user) => (
          <div
            key={user._id}
            className="useraccess-grid-container selected-user"
            onClick={() => handleUserClick(user)}
          >
            <div className="grid-item">{user.firstName}</div>
            <div className="grid-item">{user.lastName}</div>
            <div className="grid-item">{user.email}</div>
            <div className="grid-item">
              {selectedUserId === user._id && isDropdownVisible ? (
                <select
                  id="user-role"
                  value={temporarySelectedUser}
                  onChange={(e) => setTemporarySelectedUser(e.target.value)}
                  onBlur={() => setIsDropDownVisible(false)}
                  autoFocus
                >
                  <option value="Admin">Admin</option>
                  <option value="Subadmin">Subadmin</option>
                  <option value="User">User</option>
                </select>
              ) : (
                <span>
                  {user.access.charAt(0).toUpperCase() + user.access.slice(1)}
                </span>
              )}
            </div>
          </div>
        ))}
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
