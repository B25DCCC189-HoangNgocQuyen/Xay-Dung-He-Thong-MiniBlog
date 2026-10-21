import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Post } from "../types/blog";
import PostCard from "../components/PostCard";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const { data: apiPosts, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const saved = localStorage.getItem("my_posts");
  const localPosts: Post[] = saved ? JSON.parse(saved) : [];

  const allPosts: Post[] = [...localPosts, ...(apiPosts || [])];

  const filteredPosts = allPosts.filter((p) =>
    p.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) return <p className="loading">Đang tải danh sách bài viết...</p>;
  if (error) return <p className="error">Lỗi: {error}</p>;

  return (
    <div>
      <h2>Danh sách bài viết</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Nhập tiêu đề cần tìm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <p>Không tìm thấy bài viết nào.</p>
      ) : (
        <div className="post-list">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
