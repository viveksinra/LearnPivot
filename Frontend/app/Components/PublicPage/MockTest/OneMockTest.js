import React, { useState } from "react";
import { Divider, Grid, Typography, Chip, Button } from "@mui/material";
import BuyDialog from "../BuyForm/BuyDialog";
const OneMockTest = ({ data }) => {

  return (
    <Grid container key={data._id} spacing={4}>
      <Grid item xs={12} md={4}>
        <img
          src={data.url}
          className="creativeImg"
          alt={data.mockTestTitle}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography
          color="#082952"
          gutterBottom
          sx={{
            fontSize: { xs: "18px", md: "20px" },
            fontWeight: 600,
            lineHeight: "20px", // reduced the line height
            fontFamily: "Adequate, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
         {data.mockTestTitle}
        </Typography>
        <Typography
          color="#082952"
          gutterBottom
          sx={{
            fontSize: { xs: "12px", md: "15px" },
            fontWeight: 200,
            fontFamily: "Adequate, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          from {data.date} to {data.endDate}
        </Typography>
        <Typography
          color="#333"
          sx={{
            fontFamily: "acumin-pro, sans-serif",
            fontWeight: 100,
            fontSize: { xs: "11px", md: "14px" },
            lineHeight: "1.8rem",
          }}
        >
        {data.shortDescription}
          <div style={{ display: "flex", marginTop: "10px" }}>
          <Chip
                label={`Mock Test: ${data.testClass?.label}`}
                color="primary"
                variant="contained"
                sx={{ marginRight: "8px" }}
              />
                <Chip
                label={`Type: ${data.testType?.label}`}
                color="primary"
                variant="contained"
                sx={{ marginRight: "8px" }}
              />
                <Chip
                label={`Duration: ${data.duration?.label}`}
                color="primary"
                variant="contained"
                sx={{ marginRight: "8px" }}
              />
          </div>
        </Typography>
        <br />
        <div style={{ display: "flex" }}>
        <BuyDialog />
          <span style={{ flexGrow: 0.1 }} />
          <button className="viewBtn">View Details</button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginTop: "-20px", marginBottom:"15px" }} />
      </Grid>
    </Grid>
  );
};

export default OneMockTest;
