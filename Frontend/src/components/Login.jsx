import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost/dev-diaries/Backend/authentication/login.php", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem(
            "userData",
            JSON.stringify(response.data.data)
          );

          window.location.href = "/dashboard";
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
        color: "#f0f0f0",  // light text color
      }}
    >
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Typography
            style={{ marginBottom: "20px" }}
            variant="h2"
            component="h2"
            sx={{ color: "#ffffff" }}  // title color
          >
            Sign in
          </Typography>
          {error && (
            <Alert
              style={{ marginBottom: "20px" }}
              severity="error"
              sx={{
                backgroundColor: "#333",  // dark background for alert
                color: "#fff",             // light text for alert
              }}
            >
              {error}
            </Alert>
          )}
          <TextField
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="filled"
            id="email"
            label="Email address"
            fullWidth
            style={{ marginBottom: "20px" }}
            sx={{
              backgroundColor: "#333",  // input background
              input: { color: "#fff" }   // input text color
            }}
            InputLabelProps={{
              style: { color: '#fff' },  // label text color
            }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            variant="filled"
            id="password"
            label="Password"
            fullWidth
            style={{ marginBottom: "20px" }}
            sx={{
              backgroundColor: "#333",
              input: { color: "#fff" }
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleShowPassword} sx={{ color: "#fff" }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
              color: "#fff",  // button text color
              marginTop: "10px", // margin for better spacing
            }}
          >
            Login
          </Button>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px", color: "#fff" }}
          >
            Don't have an account?{" "}
            <Link
              href="/register"
              sx={{ color: "#007bff", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "10px", color: "#fff" }}
          >
            <Link
              href="/forgot-password"
              sx={{ color: "#007bff", textDecoration: "none" }}
            >
            Forgot Password?
            </Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
}

export default Login;
