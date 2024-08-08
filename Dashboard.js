// src/components/Dashboard.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ onLogout }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const data = await res.json();
      setPosts(prevPosts => [...prevPosts, ...data]);
      setHasMore(data.length > 0);
      setLoading(false);
    };

    loadPosts();
  }, [page]);

  const lastPostRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>You are logged in!</p>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <div
                ref={lastPostRef}
                key={post.id}
              >
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>
            );
          } else {
            return (
              <div
                key={post.id}
              >
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>
            );
          }
        })}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default Dashboard;
