import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

function CreateBlog() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [apiResponse, setApiResponse] = useState("");

  const handleImageChange = (event) => {
    setBlogImage(event.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!blogTitle || !blogContent || !blogImage) {
      setApiResponse("All fields are required.");
      return;
    }

    // Create FormData to handle file upload along with other fields
    const formData = new FormData();
    formData.append("blogtitle", blogTitle);
    formData.append("blogcontent", blogContent);
    formData.append("blogimage", blogImage);

    try {
      const response = await axios.post(
        "http://localhost/dev-diaries/Backend/routes/create_blog.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
      setApiResponse(response.data.message || "Blog saved successfully!");
    } catch (error) {
      console.error("Error uploading blog:", error);
      setApiResponse(error.response?.data?.message || "Failed to create blog.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "68vh",
        width: "100vw",
        marginTop: "5%",
        color: "#f0f0f0",
      }}
    >
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" sx={{ color: "#fff", marginBottom: "20px" }}>
            Create Blog
          </Typography>
          {apiResponse && (
            <Alert
              severity={apiResponse.includes("success") ? "success" : "error"}
              sx={{
                marginBottom: "20px",
                backgroundColor: "#333",
                color: "#fff",
              }}
            >
              {apiResponse}
            </Alert>
          )}
          <TextField
            type="text"
            label="Blog Title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            variant="filled"
            fullWidth
            sx={{
              marginBottom: "20px",
              backgroundColor: "#333",
              input: { color: "#fff" },
            }}
            InputLabelProps={{ style: { color: "#fff" } }}
          />
          <TextField
            type="text"
            label="Blog Content"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            variant="filled"
            fullWidth
            multiline
            rows={6}
            sx={{
              marginBottom: "20px",
              backgroundColor: "#333",
              input: { color: "#fff" },
            }}
            InputLabelProps={{ style: { color: "#fff" } }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              marginBottom: "20px",
              backgroundColor: "#007bff",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#007bff",
              "&:hover": { backgroundColor: "#0056b3" },
              color: "#fff",
            }}
          >
            Submit Blog
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default CreateBlog;
