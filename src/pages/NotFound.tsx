import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>404 - Không tìm thấy trang</h1>
      <p>Đường dẫn bạn truy cập không tồn tại.</p>
      <br />
      <Link to="/" className="detail-link">
        Quay về trang chủ
      </Link>
    </div>
  );
}
