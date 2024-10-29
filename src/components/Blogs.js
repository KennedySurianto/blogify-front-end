import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth"; // Adjust the path if necessary

const Blogs = () => {
    const [blogs, setBlogs] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/blogs");
                if (!response.ok) {
                    throw new Error("Failed to fetch blogs");
                }
                const data = await response.json();
                setBlogs(data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };  

        fetchBlogs();
    }, []);

    const handleNewBlog = () => {
        if (isAuthenticated()) {
            navigate('/new-blog'); // Redirect to blog creation page
        } else {
            alert("Please log in to create a blog");
            navigate('/login');
        }
    };

    if (loading) return <Loading />; 
    if (error) return <div>Error: {error}</div>; 

    return (
        <div>
            <h1>Blog List</h1>
            <button onClick={handleNewBlog} disabled={!isAuthenticated()} style={{ marginBottom: '20px' }}>
                {isAuthenticated() ? "Create Blog" : "Log in to create a blog"}
            </button>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog._id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Blogs;
