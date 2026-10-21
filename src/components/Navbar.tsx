import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const linkClass = ({ isActive }: any) =>
    isActive ? "nav-link active" : "nav-link";

  function handleLogout() {
    localStorage.removeItem("user");
    alert("Đã đăng xuất!");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">
          MiniBlog
        </Link>

        <div className="menu">
          <NavLink to="/" end className={linkClass}>
            Trang chủ
          </NavLink>
          <NavLink to="/create" className={linkClass}>
            Viết bài
          </NavLink>

          {user ? (
            <>
              <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                Chào, <b>{user}</b>
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Đăng xuất
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Đăng nhập
            </NavLink>
          )}

          <button onClick={() => setDark(!dark)} className="btn-theme">
            {dark ? "Sáng" : "Tối"}
          </button>
        </div>
      </div>
    </nav>
  );
}
