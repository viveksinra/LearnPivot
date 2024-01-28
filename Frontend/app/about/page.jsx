import React from "react";
import Header from "../Components/Header1/Header";
import { TopAbstract } from "../MyApp";
import Enquiry from "../Components/Enquiry/Enquiry";
import { NewFooter } from "../Components/Footer/Footer";
import { Container, Typography, Grid, Divider, Breadcrumbs } from "@mui/material";
import Link from "next/link";

import "./aboutStyle.css";

function About() {
  return (
    <main style={{ backgroundColor: "#fff" }}>
      <Header />
      <TopAbstract />
    
      <Container className="sectionMargin">
        <br />
        <Breadcrumbs separator="›" sx={{ fontWeight: 600, fontFamily: "acumin-pro,\"sans-serif\"", fontSize: "24px" }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Your E-Learning Platform
          </Link>
          <Typography sx={{ fontFamily: "acumin-pro,\"sans-serif\"", fontSize: "20px" }} color="text.primary">
            About
          </Typography>
          <Typography sx={{ fontWeight: 500, fontFamily: "acumin-pro,\"sans-serif\"", fontSize: "20px" }} color="text.primary">
            Gateway to Knowledge
          </Typography>
        </Breadcrumbs>
        <br />
        <Typography color="#082952" gutterBottom sx={{ fontSize: { xs: "24px", md: "36px" }, fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\"" }}>Welcome to Your E-Learning Oasis</Typography>
        <Typography color="#333" sx={{ fontFamily: "acumin-pro,\"sans-serif\"", fontWeight: 100, fontSize: "1.2rem" }}>
          Your E-Learning Oasis is a hub for transformative online education, bridging the gap between traditional classrooms and modern digital learning experiences.
        </Typography>
        <br />
        <Typography color="#082952" gutterBottom sx={{ fontSize: { xs: "24px", md: "36px" }, fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\"" }}>Empowering Learning, Personalized Journey</Typography>
        <Typography color="#333" sx={{ fontFamily: "acumin-pro,\"sans-serif\"", fontWeight: 100, fontSize: "1.2rem" }}>
          The Gateway to Knowledge, located in the heart of online education, is designed to offer you the full spectrum of learning services, combining the flexibility of digital courses with personalized guidance.
        </Typography>
  
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography color="#082952" gutterBottom sx={{ fontSize: { xs: "24px", md: "36px" }, fontFamily: 'Adequate,Helvetica Neue,Helvetica,\"sans-serif\"' }}>A Full Range of Courses</Typography>
            <Typography color="#333" sx={{ fontFamily: "acumin-pro,\"sans-serif\"", fontWeight: 100, fontSize: "1.2rem" }}>Your E-Learning Oasis provides a wide range of courses and amenities:</Typography>
            <br />
            <Typography color="#082952" sx={{ margin: "10px 0px", fontFamily: "AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\"", fontSize: "2rem" }}>- Diverse Subject Offerings</Typography>
            <ul style={{ listStyleType: "circle", marginLeft: "30px" }}>
              <li> <Typography color="#333" sx={{ fontFamily: "acumin-pro,\"sans-serif\"", fontWeight: 400, fontSize: "1.2rem" }}>From foundational math and English courses to advanced programming and design.</Typography></li>
              {/* Add more course offerings as needed */}
            </ul>
            <br />
            <Typography color="#082952" sx={{ margin: "10px 0px", fontFamily: "AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\"", fontSize: "2rem" }}>- Interactive Learning Tools</Typography>
            <ul style={{ listStyleType: "circle", marginLeft: "30px" }}>
              <li> <Typography color="#333" sx={{ fontFamily: "acumin-pro,\"sans-serif\"", fontWeight: 400, fontSize: "1.2rem" }}>Engage with quizzes, simulations, and collaborative projects for a hands-on learning experience.</Typography></li>
              {/* Add more interactive tools */}
            </ul>
            <br />
            {/* Add more sections based on your e-learning platform features */}
          </Grid>
          <Grid item xs={12} md={6} className="center" sx={{ flexDirection: "column" }}>
            <Typography color="#00a2c2" sx={{ paddingBottom: "2rem", fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\"", fontSize: "2rem" }}>“Unlock Your Potential.”</Typography>
            <Typography color="#333" sx={{ fontFamily: "acumin-pro,\"sans-serif\"", fontWeight: 400, fontSize: "1.2rem" }}>- A Learner at Your E-Learning Oasis.</Typography>
          </Grid>
        </Grid>
  
        <br />
        <Grid container spacing={2}>
          {/* Additional content goes here */}
        </Grid>
  
        <br />
        <Grid container>
          <Grid item xs={12} md={9}>
            <br />
            <Typography gutterBottom sx={{ fontFamily: 'AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\"', color: "#082952", fontSize: { xs: "20px", md: "30px" } }}>Connect with Your Educational Oasis.</Typography>
            <Typography gutterBottom sx={{ fontFamily: "acumin-pro, \"sans-serif\"", color: "#333", fontWeight: "100", fontSize: { xs: "20px", md: "20px" } }}>
              Everyone has different learning needs. To discover more about Your E-Learning Oasis, how it can benefit you or someone you know, or to get started on your educational journey, please do not hesitate to <Link style={{ color: "#00a2c2", fontWeight: 500 }} href="/contact">Contact Us.</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
        </Grid>
      </Container>
      <Enquiry />
      <NewFooter />
    </main>
  );
  
  
}

export default About;
