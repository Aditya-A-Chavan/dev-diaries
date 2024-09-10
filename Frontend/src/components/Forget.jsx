import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useNavigate, useLocation } from "react-router-dom";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const formatPhoneNumber = (phone) => {
       
        if (!phone.startsWith("+91")) {
            return "+91" + phone;
        }
        return phone;
    };

    // console.log(formatPhoneNumber(phoneNumber));

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit button clicked for password reset');

        const data = {
            email: email,
            phonenumber: formatPhoneNumber(phoneNumber),
        };
        console.log('Data being sent:', data);

        console.log('Sending request to:', "http://localhost/dev-diaries/Backend/authentication/forget.php");
        axios
            .post("http://localhost/dev-diaries/Backend/authentication/forget.php", data)
            .then((response) => {
                console.log('Response received:', response);
                setApiResponse(response.data.message);

                navigate("/verify", { state: {email: email} });
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
                        Forgot Password
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
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="filled"
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
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        variant="filled"
                        label="Phone Number"
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
                        Submit
                    </Button>
                    <Typography
                        variant="body1"
                        align="center"
                        style={{ marginTop: "20px", color: "#fff" }}
                    >
                        Remembered your password?{" "}
                        <Link
                            href="/login"
                            sx={{ color: "#007bff", textDecoration: "none" }}
                        >
                            Log in
                        </Link>
                    </Typography>
                </form>
            </Container>
        </Box>
    );
}

export default ForgetPassword;