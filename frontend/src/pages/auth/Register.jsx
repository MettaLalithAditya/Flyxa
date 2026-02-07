import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    await API.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Create Account</h2>

        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

        <button className="btn" onClick={submit}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
