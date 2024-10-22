import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
    Alert,
    CardActions,
    Button,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function BlogsDisplay() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    "http://localhost/dev-diaries/Backend/routes/fetch_all_blogs.php"
                );
                if (response.data.status === "success") {
                    setBlogs(response.data.data);
                } else {
                    setError(response.data.message || "Failed to load blogs.");
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Failed to load blogs.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
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
        <Container sx={{ marginTop: "5%", width: "100vw" }}>
            <Grid container spacing={4}>
                {blogs.map((blog) => (
                    <Grid item xs={12} sm={6} md={4} key={blog.blog_id}>
                        <Card>
                            {blog.image_url && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={blog.image_url}
                                    alt={blog.blog_title}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {blog.blog_title || "Untitled Blog"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {blog.blog_content.substring(0, 100)}...
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    By {blog.user_name} on{" "}
                                    {new Date(blog.created_at).toLocaleString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() => navigate(`/blog/${blog.blog_id}`)}
                                >
                                    Read More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default BlogsDisplay;
