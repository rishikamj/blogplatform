import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts')
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 700, margin: '24px auto', padding: '0 16px' }}>
      <h2>All Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div key={post._id} style={{ background: 'white', padding: 16, marginBottom: 16, borderRadius: 8 }}>
          <h3 style={{ margin: '0 0 6px' }}>
            <Link to={'/posts/' + post._id}>{post.title}</Link>
          </h3>
          <small>by {post.author?.name} on {new Date(post.createdAt).toLocaleDateString()}</small>
          <p>{post.content.slice(0, 150)}</p>
        </div>
      ))}
    </div>
  );
}