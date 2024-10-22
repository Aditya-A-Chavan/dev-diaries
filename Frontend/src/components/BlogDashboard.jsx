import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, CardActions, Button, CircularProgress, Alert } from "@mui/material";

function BlogDashboard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost/dev-diaries/Backend/routes/fetch_all_blogs.php");
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
        return <CircularProgress style={{ margin: "auto", display: "block" }} />;
    }

    if (error) {
        return <Alert severity="error" sx={{ marginTop: "20px" }}>{error}</Alert>;
    }

    return (
        <Container sx={{ marginTop: "5%", width: "100vw", height: "67vh" }}>
            <Grid container spacing={4}>
                {blogs.map((blog) => (
                    <Grid item xs={12} sm={6} md={4} key={blog.blog_id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">
                                    {blog.blog_title || "Untitled Blog"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {blog.blog_content.substring(0, 100)}...
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button component={Link} to={`/display/${blog.blog_id}`} size="small">
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

export default BlogDashboard;
