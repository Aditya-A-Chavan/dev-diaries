import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, CardMedia, Grid, Alert } from '@mui/material';

function BlogDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get(
          'http://localhost/dev-diaries/Backend/routes/display_all.php'
        );
        if (response.data.status === 'success') {
          setBlogs(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch blogs.');
        console.error(err);
      }
    }

    fetchBlogs();
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (blogs.length === 0) return <p>Loading...</p>;

  return (
    <Container>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.blog_id}>
            <Card>
              {blog.image_url && (
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.image_url}
                  alt="Blog Image"
                />
              )}
              <CardContent>
                <Typography variant="h5" component="div">
                  {blog.blog_title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.blog_content.substring(0, 100)}...
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  By {blog.user_name} on {new Date(blog.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BlogDashboard;
