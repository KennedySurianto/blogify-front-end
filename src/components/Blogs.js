import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth"; // Adjust the path if necessary
import NewBlogModal from "./NewBlogModal";
import axios from "axios";
import { Button } from "react-bootstrap";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

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

    const handleDelete = async (blogId) => {
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchBlogs(); // Refresh the blogs list after deletion
        } catch (error) {
            console.error('Error deleting blog', error);
        }
    };

    const handleEdit = (blog) => {
        // setEditBlog(blog); // Set the blog to be edited in state
        // setShowModal(true); // Open the modal with blog details pre-filled
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleNewBlog = () => {
        if (isAuthenticated()) {
            setShowModal(true);
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
                        <p><strong>Author:</strong> {blog.author?.name}</p>

                        {blog.author?._id === userId && (
                            <div>
                                <Button variant="warning" onClick={() => handleEdit(blog)} className="me-2">
                                    Update
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <NewBlogModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                refreshBlogs={fetchBlogs}
            />
        </div>
    );
};

export default Blogs;
