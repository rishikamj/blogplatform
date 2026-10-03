import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PostDetail from './pages/PostDetail';
import PostForm from './pages/PostForm';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}