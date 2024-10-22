import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, CircularProgress, Alert } from "@mui/material";

function BlogDisplay() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost/dev-diaries/Backend/routes/fetch_blog.php?id=16`);
                if (response.data.status === 'success') {
                    setBlog(response.data.data);
                } else {
                    setError(response.data.message || "Failed to load the blog.");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                setError("Failed to load the blog.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ marginTop: "20px" }}>
                {error}
            </Alert>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ marginTop: "5%", color: "#fff" }}>
            {blog.blog_title ? (
                <Typography variant="h2" sx={{ marginBottom: "20px" }}>
                    {blog.blog_title}
                </Typography>
            ) : (
                <Typography variant="h2" sx={{ marginBottom: "20px", color: "gray" }}>
                    Untitled Blog
                </Typography>
            )}
            {blog.blog_content ? (
                <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                    {blog.blog_content}
                </Typography>
            ) : (
                <Typography variant="body1" sx={{ marginBottom: "20px", color: "gray" }}>
                    No content available.
                </Typography>
            )}
            {blog.image && (
                <img
                    src={blog.image}
                    alt="Blog"
                    style={{ width: "100%", borderRadius: "8px" }}
                />
            )}
        </Container>
    );
}

export default BlogDisplay;
