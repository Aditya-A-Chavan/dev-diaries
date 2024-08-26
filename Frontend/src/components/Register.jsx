import axios from "axios";
import React, { useState } from "react";
// import "@fontsource/roboto/400.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";


function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [dob, setDob] = useState("");
    const [interestCat, setInterestCat] = useState("");
    const [fullName, setFullName] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [webLink, setWebLink] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const generatePassword = () => {
      const length = 12;
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
      }
      return password;
    };
  
    const handleGeneratePassword = () => {
      setPassword(generatePassword());
    };
  
    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit button clicked');
      
        const data = {
          username,
          email,
          password,
          displayName,
          contactNumber,
          dob,
          interestCat,
          fullName,
          aboutMe,
          webLink,
        };
        console.log('Data being sent:', data);
      
        console.log('Sending request to:', "http://localhost/dev-diaries/Backend/authentication/register.php");
        axios
          .post("http://localhost/dev-diaries/Backend/authentication/register.php", data)
          .then((response) => {
            console.log('Response received:', response);
            setApiResponse(response.data.message);
          })
          .catch((error) => {
            console.error('Error occurred:', error);
            if (error.response) {
              console.log('Error response:', error.response);
              console.log('Error response data:', error.response.data);
              setApiResponse(error.response.data.message);
            } else if (error.request) {
              console.log('Error request:', error.request);
              setApiResponse("No response received from server");
            } else {
              console.log('Error message:', error.message);
              setApiResponse("An error occurred");
            }
          });
    };

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Typography
              style={{ marginBottom: "20px" }}
              variant="h2"
              component="h2"
            >
              Sign up
            </Typography>
            {apiResponse && (
              <Alert
                style={{ marginBottom: "20px" }}
                severity={apiResponse.includes("success") ? "success" : "error"}
              >
                {apiResponse}
              </Alert>
            )}
            <TextField
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="filled"
              label="Username"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              label="Email address"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <div>
              <TextField
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                label="Password"
                fullWidth
                style={{ marginBottom: "10px" }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Button
                size="small"
                style={{ marginBottom: "25px" }}
                onClick={handleGeneratePassword}
              >
                Generate password
              </Button>
            </div>
            <TextField
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              variant="filled"
              label="Display Name"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              variant="filled"
              label="Contact Number"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              variant="filled"
              label="Date of Birth"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ marginBottom: "20px" }}
            />
            <TextField
              type="text"
              value={interestCat}
              onChange={(e) => setInterestCat(e.target.value)}
              variant="filled"
              label="Interest Category"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              variant="filled"
              label="Full Name"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              type="text"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              variant="filled"
              label="About Me"
              fullWidth
              multiline
              rows={4}
              style={{ marginBottom: "20px" }}
            />
            <TextField
              type="url"
              value={webLink}
              onChange={(e) => setWebLink(e.target.value)}
              variant="filled"
              label="Web Link"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <Button variant="contained" type="submit">
              Sign up
            </Button>
            <Typography
              variant="body1"
              gutterBottom
              style={{ marginTop: "20px" }}
            >
              Do You have an account? <Link href="/login">Sign in</Link>
            </Typography>
          </form>
        </Container>
      </Box>
    );
}

export default Register;