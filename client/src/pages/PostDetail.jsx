import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const loadComments = () =>
    api.get('/posts/' + id + '/comments').then((res) => setComments(res.data));

  useEffect(() => {
    api.get('/posts/' + id)
      .then((res) => setPost(res.data))
      .catch(() => setError('Post not found'));
    loadComments();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await api.post('/posts/' + id + '/comments', { text });
      setText('');
      loadComments();
    } catch (err) {
      setError(err.response?.data?.msg || 'Could not add comment');
    }
  };

  const deleteComment = async (commentId) => {
    await api.delete('/posts/' + id + '/comments/' + commentId);
    loadComments();
  };

  const deletePost = async () => {
    if (!window.confirm('Delete this post?')) return;
    await api.delete('/posts/' + id);
    navigate('/');
  };

  if (error && !post) return <p style={{ textAlign: 'center' }}>{error}</p>;
  if (!post) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  const isOwner = user && post.author?._id === user.id;

  return (
    <div style={{ maxWidth: 700, margin: '24px auto', padding: '0 16px' }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>{post.title}</h2>
        <small>by {post.author?.name} on {new Date(post.createdAt).toLocaleDateString()}</small>
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
        {isOwner && (
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to={'/edit/' + post._id}>Edit</Link>
            <button onClick={deletePost}>Delete</button>
          </div>
        )}
      </div>

      <h3>Comments ({comments.length})</h3>

      {user ? (
        <form onSubmit={addComment} style={{ marginBottom: 16 }}>
          <textarea
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', padding: 8, minHeight: 70, boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ marginTop: 8 }}>Add Comment</button>
        </form>
      ) : (
        <p><Link to="/login">Login</Link> to write a comment.</p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {comments.map((c) => (
        <div key={c._id} style={{ background: 'white', padding: 12, marginBottom: 10, borderRadius: 8 }}>
          <strong>{c.author?.name}</strong>
          <span style={{ color: '#888', marginLeft: 8, fontSize: 12 }}>
            {new Date(c.createdAt).toLocaleString()}
          </span>
          <p style={{ margin: '6px 0' }}>{c.text}</p>
          {user && c.author?._id === user.id && (
            <button onClick={() => deleteComment(c._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}