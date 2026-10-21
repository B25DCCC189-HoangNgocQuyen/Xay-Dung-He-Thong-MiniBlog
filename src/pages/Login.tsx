import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", pass: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.username || !form.pass) {
      setError("Vui lòng nhập đủ tài khoản và mật khẩu!");
      return;
    }

    if (form.username === "admin" && form.pass === "123456") {
      localStorage.setItem("user", "admin");
      navigate("/create", { replace: true });
    } else {
      setError("Sai tài khoản hoặc mật khẩu! (admin / 123456)");
    }
  };

  return (
    <div className="form-box">
      <h2>Đăng nhập</h2>
      <p style={{ fontSize: "14px", color: "gray", marginBottom: "12px" }}>
        Tài khoản: admin / Mật khẩu: 123456
      </p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên đăng nhập:</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="admin"
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            name="pass"
            type="password"
            value={form.pass}
            onChange={handleChange}
            placeholder="123456"
          />
        </div>

        <button type="submit" className="btn-submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
