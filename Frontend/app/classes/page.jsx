"use client";
import React, { useState } from "react";
import Header from "../Components/Header1/Header";
import "./classes.css";
import { Container, Typography, Grid, Breadcrumbs, Divider, Tabs, Tab } from "@mui/material";
import Footer from "../Components/Footer/Footer";
import { useRouter } from "next/navigation";
import Enquiry from "@/app/Components/Enquiry/Enquiry";
import OneClass from "../Components/PublicPage/Classes/OneClass";
import FilterComponent from "../Components/PublicPage/Classes/FilterComponent"; 
import FilterDialog from "../Components/PublicPage/Classes/FilterDialog"; 
import { Dialog, useMediaQuery, useTheme, Button, DialogActions, DialogContent } from "@mui/material";
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Events() {
  const [events] = useState([
    
        {
          month: "February 2024",
          img: "https://img.freepik.com/free-vector/flat-design-english-school-background_23-2149485957.jpg?w=900&t=st=1706446104~exp=1706446704~hmac=1793f247f123d53401121af165d35788ac318e724b2ed7485971e8e773ae2044",
          timing: "February 21, 2024 @ 10:00AM to 12 Noon",
          title: "Mastering English Grammar",
          subTitle: "Join our comprehensive session on mastering English grammar rules and usage.",
          _id: "541564515545451",
        },
     
  ]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main style={{ backgroundColor: "#fff" }}>
      <Header />

      <br />
      <Container>
        <Grid container spacing={3}>
        {fullScreen? (
       
        <FilterDialog />
     
      ):(
        <Grid item xs={2}>
        <FilterComponent />
      </Grid>
      )}
          <Grid item xs={fullScreen ? 12 : 10}>
            {events &&
              events.map((p, j) => (
                <OneClass key={j} img={p.img} title={p.title} timing={p.timing} subTitle={p.subTitle} />
              ))}
          </Grid>
        </Grid>
      </Container>
      <Enquiry />
      <Footer />
    </main>
  );
}

export default Events;
