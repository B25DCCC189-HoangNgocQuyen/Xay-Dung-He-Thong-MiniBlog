import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Post, Comment } from "../types/blog";

const API = "https://jsonplaceholder.typicode.com";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const saved = localStorage.getItem("my_posts");
        const localPosts: Post[] = saved ? JSON.parse(saved) : [];
        const found = localPosts.find((p) => String(p.id) === String(id));

        if (found) {
          setPost(found);
          setComments([]);
          setLoading(false);
          return;
        }

        const res1 = await fetch(`${API}/posts/${id}`);
        if (!res1.ok) throw new Error("Không tải được bài viết");
        const postData = await res1.json();
        setPost(postData);

        const res2 = await fetch(`${API}/posts/${id}/comments`);
        if (!res2.ok) throw new Error("Không tải được bình luận");
        const commentData = await res2.json();
        setComments(commentData);
      } catch (err: any) {
        console.log(err);
        setError(err.message);
      }
      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) return <p className="loading">Đang tải...</p>;
  if (error) return <p className="error">Lỗi: {error}</p>;
  if (!post) return <p>Không tìm thấy bài viết</p>;

  return (
    <div>
      <Link to="/" className="back-btn">
        ← Quay lại danh sách
      </Link>

      <div className="post-detail">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>

      <div className="comment-section">
        <h3>Bình luận ({comments.length})</h3>
        {comments.length === 0 ? (
          <p>Chưa có bình luận nào.</p>
        ) : (
          <ul>
            {comments.map((c) => (
              <li key={c.id} className="comment-item">
                <b>{c.name}</b> ({c.email})
                <p>{c.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
