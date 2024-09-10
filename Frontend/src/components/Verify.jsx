import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom"; 

function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const navigate = useNavigate();  
    const location = useLocation();

    const email = location.state?.email;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit button clicked for OTP verification');

        const data = {
            otp: otp,
            email: email,
        };
        console.log('Data being sent:', data);

        console.log('Sending request to:', "http://localhost/dev-diaries/Backend/authentication/verify_otp.php");
        axios
            .post("http://localhost/dev-diaries/Backend/authentication/verify_otp.php", data)
            .then((response) => {
                console.log('Response received:', response);
                setApiResponse(response.data.message);

                if (response.status === 200) {
                    navigate('/reset-password', { state: {email: email} }); 
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
                        sx={{ color: "#ffffff" }}  // title color
                    >
                        Verify OTP
                    </Typography>
                    {apiResponse && (
                        <Alert
                            style={{ marginBottom: "20px" }}
                            severity={apiResponse.includes("success") ? "success" : "error"}
                            sx={{
                                backgroundColor: "#333",  // dark background for alert
                                color: "#fff",             // light text for alert
                            }}
                        >
                            {apiResponse}
                        </Alert>
                    )}
                    <TextField
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        variant="filled"
                        label="Enter OTP"
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
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: "#007bff",
                            "&:hover": {
                                backgroundColor: "#0056b3",
                            },
                            color: "#fff",  // button text color
                        }}
                    >
                        Verify OTP
                    </Button>
                </form>
            </Container>
        </Box>
    );
}

export default VerifyOTP;