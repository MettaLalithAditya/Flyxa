import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const hideUser =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/admin-login";

  // ✅ smart home redirect
  const goHome = () => {
    if (!role) navigate("/");
    else if (role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  // ✅ BACK BUTTON
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="navbar">
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        
        {/* Back Button */}
        {!hideUser && token && (
          <button className="back-btn" onClick={goBack}>
            ←
          </button>
        )}

        {/* Logo */}
        <h2 style={{ cursor: "pointer" }} onClick={goHome}>
          Flyxa
        </h2>
      </div>

      {/* RIGHT */}
      {!hideUser && token && userName && (
        <div className="profile">
          <div className="profile-btn" onClick={() => setOpen(!open)}>
            Welcome, {userName} ▾
          </div>

          {open && (
            <div className="dropdown">
              {role !== "admin" && (
                <div onClick={() => navigate("/my-bookings")}>
                  My Bookings
                </div>
              )}
              <div onClick={logout} className="logout">
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
