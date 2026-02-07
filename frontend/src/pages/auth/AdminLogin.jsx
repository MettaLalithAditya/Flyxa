import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      // ❌ stop if not admin
      if (res.data.user.role !== "admin") {
        alert("Access denied: Not an admin");
        return;
      }

      // ✅ CLEAR OLD DATA (important)
      localStorage.clear();

      // ✅ SAVE NEW ADMIN DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("role", "admin");  // ⭐ force admin

      navigate("/admin");

    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={loginAdmin}>
          Login as Admin
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
