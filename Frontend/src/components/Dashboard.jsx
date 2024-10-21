import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Alert, Typography, Button, Box, Paper } from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const username = userData?.username;

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        // height: ""
        minHeight: "78vh",
        backgroundColor: "#1c1c1c",
        // padding: "2rem",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "2rem",
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#2e2e2e",
          color: "#ffffff",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Welcome, {username}!
        </Typography>
        <Container>
          <Alert
            severity="success"
            sx={{
              marginBottom: "1.5rem",
              backgroundColor: "#4caf50",
              color: "#ffffff",
              borderRadius: "4px",
            }}
          >
            You have successfully logged into your account!
          </Alert>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "0.75rem 2rem",
                backgroundColor: "#007bff",
                '&:hover': {
                  backgroundColor: "#0056b3",
                },
              }}
              href="/logout"
            >
              Logout
            </Button>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}

export default Dashboard;
