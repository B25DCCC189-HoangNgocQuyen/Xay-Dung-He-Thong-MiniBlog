import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../types/blog";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", body: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (form.title.trim() === "" || form.body.trim() === "") {
      setError("Tiêu đề và nội dung không được để trống!");
      return;
    }
    if (form.title.trim().length < 5) {
      setError("Tiêu đề phải có ít nhất 5 ký tự!");
      return;
    }

    const saved = localStorage.getItem("my_posts");
    const oldPosts: Post[] = saved ? JSON.parse(saved) : [];

    const newPost: Post = {
      id: Date.now(),
      title: form.title,
      body: form.body,
    };

    localStorage.setItem("my_posts", JSON.stringify([newPost, ...oldPosts]));
    alert("Thêm bài viết thành công!");
    navigate("/");
  };

  return (
    <div className="form-box">
      <h2>Viết bài mới</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tiêu đề bài viết:</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề..."
          />
        </div>

        <div className="form-group">
          <label>Nội dung:</label>
          <textarea
            name="body"
            rows={5}
            value={form.body}
            onChange={handleChange}
            placeholder="Nhập nội dung bài viết..."
          />
        </div>

        <button type="submit" className="btn-submit">
          Lưu bài viết
        </button>
      </form>
    </div>
  );
}
