// import LogoImage from "../../assets/uucnhlogo.png";
import { Link } from "react-router-dom";
import "./AdminUserAccess.css";
import "../styles/buttons.css";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Navigation from "../Navigation/Navigation";
import "../../components/SongList/SongList.css";

const AdminUserAccess = () => {
  const [users, setUsers] = useState([]);
  const [temporarySelectedUser, setTemporarySelectedUser] = useState("");
  const [isSuccessNotification, setIsSuccessNotification] = useState(false);
  const [isDropdownVisible, setIsDropDownVisible] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);

  const fetchAllUsers = async () => {
    try {
      const authUrl = import.meta.env.VITE_AUTH_SERVICE_URL;
      if (!authUrl) {
        console.log("URL not found.");
        return;
      }

      const response = await fetch(`${authUrl}/api/users`, {
        method: "GET",
        credentials: "include", // Include cookies in requests
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
    setSelectedUserEmail(user.email);
    setIsDropDownVisible(true);
  };

  const handleSave = async () => {
    try {
      const authUrl = import.meta.env.VITE_AUTH_SERVICE_URL;

      if (!authUrl) {
        console.log("URL not found.");
        return;
      }

      const response = await fetch(`${authUrl}/api/users/updateOne`, {
        method: "POST",
        credentials: "include", // Include cookies in requests
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedUserEmail,
          access: temporarySelectedUser,
        }),
      });

      if (response.ok) {
        setIsSuccessNotification(true);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === selectedUserEmail
              ? { ...user, access: temporarySelectedUser }
              : user
          )
        );
        setSelectedUserEmail(null);
        setTimeout(() => {
          setIsSuccessNotification(false);
        }, 3000);
      } else {
        console.error("Failed to update user access");
      }
    } catch (error) {
      console.error("Error updating user access:", error);
    }
  };

  return (
    <>
      <Navigation />
      <h3> UUCNH Music Library User Privilege Update</h3>

      <div className="table-container">
        <table className="table">
          <thead>
            <th className="grid-title grid-item table-header">First Name</th>
            <th className="grid-title grid-item table-header">Last Name</th>
            <th className="grid-title grid-item table-header">Email</th>
            <th className="grid-title grid-item table-header">User Access</th>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="useraccess-grid-container selected-user"
                onClick={() => handleUserClick(user)}
              >
                <td className="grid-item">{user.firstName}</td>
                <td className="grid-item">{user.lastName}</td>
                <td className="grid-item">{user.email}</td>
                <td className="grid-item">
                  {selectedUserEmail === user.email && isDropdownVisible ? (
                    <select
                      id="user-role"
                      value={temporarySelectedUser}
                      onChange={(e) => setTemporarySelectedUser(e.target.value)}
                      onBlur={() => setIsDropDownVisible(false)}
                      autoFocus
                    >
                      <option value="" disabled selected>
                        Select one
                      </option>
                      <option value="Admin">Admin</option>
                      <option value="Subadmin">Subadmin</option>
                      <option value="User">User</option>
                    </select>
                  ) : (
                    <span>
                      {user.access.charAt(0).toUpperCase() +
                        user.access.slice(1)}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="success-notification">
          {isSuccessNotification && (
            <Alert variant="filled" icon={<CheckIcon fontSize="inherit" />}>
              User access has been updated successfully!
            </Alert>
          )}
        </div>
        <button onClick={handleSave} className="save-button hover-button">
          Save
        </button>
      </div>
    </>
  );
};

export default AdminUserAccess;

// const [selectedUserId, setSelectedUserId] = useStat
// e(null);

// setSelectedUserId(user._id);

// email: users.find((user) => user._id === selectedUserId).email,

// setUsers((prevUsers) =>
//   prevUsers.map((user) =>
//     user._id === selectedUserId
//       ? { ...user, access: temporarySelectedUser }
//       : user
//   )
// );
// setSelectedUserId(null);

{
  /* {selectedUserId === user._id && 
isDropdownVisible ? ( */
}
