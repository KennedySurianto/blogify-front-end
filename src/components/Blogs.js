import React, { useEffect, useState } from "react"; // Ensure proper import
import Loading from "./Loading";

const Blogs = () => { // Make sure the component name starts with an uppercase letter
    const [blogs, setBlogs] = useState([]); // Initialize state for blogs
    const [loading, setLoading] = useState(true); // Initialize loading state
    const [error, setError] = useState(null); // Initialize error state

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/blogs");
                if (!response.ok) {
                    throw new Error("Failed to fetch blogs");
                }
                const data = await response.json();
                setBlogs(data); // Assuming your API returns an array of blogs
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <Loading />; // Loading state
    if (error) return <div>Error: {error}</div>; // Error state

    return (
        <div>
            <h1>Blog List</h1>
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

export default Blogs; // Export the component
