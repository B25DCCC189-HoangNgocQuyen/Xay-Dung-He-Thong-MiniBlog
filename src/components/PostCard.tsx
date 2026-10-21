import { Link } from "react-router-dom";
import { Post } from "../types/blog";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="post-item">
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p>{post.body.substring(0, 100)}...</p>
      <Link to={`/posts/${post.id}`} className="detail-link">
        Xem chi tiết
      </Link>
    </div>
  );
}
