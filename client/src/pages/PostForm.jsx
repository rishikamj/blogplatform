import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      api.get('/posts/' + id).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (id) {
        await api.put('/posts/' + id, { title, content });
        navigate('/posts/' + id);
      } else {
        const res = await api.post('/posts', { title, content });
        navigate('/posts/' + res.data._id);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '24px auto', padding: '0 16px' }}>
      <h2>{id ? 'Edit Post' : 'New Post'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 10, boxSizing: 'border-box' }}
        />
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, minHeight: 200, marginBottom: 10, boxSizing: 'border-box' }}
        />
        <button type="submit">{id ? 'Save Changes' : 'Publish'}</button>
      </form>
    </div>
  );
}