import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiResponse, setApiResponse] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit button clicked for resetting password');

        // Check if passwords match
        if (password !== confirmPassword) {
            setApiResponse("Passwords do not match");
            return;
        }

        const data = {
            email: email,
            newPass: password,
        };
        console.log('Data being sent:', data);

        console.log('Sending request to:', "http://localhost/dev-diaries/Backend/authentication/new_pass.php");
        axios
            .post("http://localhost/dev-diaries/Backend/authentication/new_pass.php", data)
            .then((response) => {
                console.log('Response received:', response);
                setApiResponse(response.data.message);

                if (response.status === 200) {
                    navigate('/dashboard'); 
                }
            })
            .catch((error) => {
                console.error('Error occurred:', error);
                if (error.response) {
                    console.log('Error response:', error.response);
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
                width: "100vw",
                height: "68vh",
                marginTop: "5%",
                color: "#f0f0f0",  // light text color
            }}
        >
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <Typography
                        style={{ marginBottom: "20px" }}
                        variant="h4"
                        component="h2"
                        sx={{ color: "#ffffff" }} 
                    >
                        Reset Password
                    </Typography>
                    {apiResponse && (
                        <Alert
                            style={{ marginBottom: "20px" }}
                            severity={apiResponse.includes("success") ? "success" : "error"}
                            sx={{
                                backgroundColor: "#333", 
                                color: "#fff",       
                            }}
                        >
                            {apiResponse}
                        </Alert>
                    )}
                    <div>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="filled"
                            label="New Password"
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
                    </div>
                    <div>
                        <TextField
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            variant="filled"
                            label="Confirm New Password"
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
                                    <IconButton onClick={handleShowConfirmPassword} sx={{ color: "#fff" }}>
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: "#007bff",
                            "&:hover": {
                                backgroundColor: "#0056b3",
                            },
                            color: "#fff", 
                        }}
                    >
                        Reset Password
                    </Button>
                </form>
            </Container>
        </Box>
    );
}

export default ResetPassword;