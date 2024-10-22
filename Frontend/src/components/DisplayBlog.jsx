import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, CircularProgress, Alert } from "@mui/material";

function BlogDisplay() {
    const { id } = useParams(); // Assuming you're using React Router to get blog ID from the URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost/dev-diaries/Backend/routes/fetch_blog.php?id=${id}`)
            .then((response) => {
                setBlog(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blog:", error);
                setError("Failed to load the blog.");
                setLoading(false);
            });
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
            <Typography variant="h2" sx={{ marginBottom: "20px" }}>
                {blog.blog_title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                {blog.blog_content}
            </Typography>
            {blog.image && (
                <img
                    src={`data:image/jpeg;base64,${blog.image}`}
                    alt="Blog"
                    style={{ width: "100%", borderRadius: "8px" }}
                />
            )}
        </Container>
    );
}

export default BlogDisplay;
