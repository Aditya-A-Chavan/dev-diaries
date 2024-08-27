import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        bottom: '0px',
        marginTop: '5%',
        backgroundColor: '#1c1c1c', // Dark background color for the footer
        padding: '16px',  // Padding for spacing
        color: '#f0f0f0', // Light text color for readability
      }}
    >
      <Divider sx={{ backgroundColor: '#333' }} />  {/* Divider with a darker color */}
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography color="inherit" style={{ padding: '16px', textAlign: 'center' }}>
            {new Date().getFullYear()} - ReactJS-PHP Blog Site | Developed by Aditya & Harshal
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
