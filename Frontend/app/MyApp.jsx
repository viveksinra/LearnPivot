"use client";
// import MainContext from './Components/Context/MainContext';
import React, { Fragment, useEffect } from 'react'
import "./pageStyle.css";
import { useState,Suspense  } from "react";
// import {DARKMODE} from "./Components/Context/types"
import Header from "./Components/Header1/Header";
import Enquiry from "./Components/Enquiry/Enquiry";
import Footer, {NewFooter} from "./Components/Footer/Footer";
import {Grid, TextField, Typography,Box,Button,IconButton,InputAdornment, Container,Tabs,Tab} from '@mui/material';
import Link from 'next/link';
import { FcBusinessman,FcBusinesswoman,} from "react-icons/fc";
import {authService} from "./services/index"
import Loading from "./Components/Loading/Loading";


function MyApp() {  
  // const {state, dispatch} = useContext(MainContext)
  const [value, setValue] = React.useState(0);
  const [hero,setHero] = useState({btn:"Show Gallery",link:"/about/gallery",text:"Bring out the best in you.",bgImg:"https://res.cloudinary.com/oasismanors/image/upload/v1706128914/Oasis2_clq4l3.webp"})
  const [allItems] = useState([{btn:"Amenities",link:"/amenities",text:"Live life on your terms.",bgImg:"https://res.cloudinary.com/oasismanors/image/upload/v1706128914/Oasis1_rwtkv6.webp"},{btn:"Show Gallery",link:"/about/gallery",text:"Bring out the best in you.",bgImg:"https://res.cloudinary.com/oasismanors/image/upload/v1706128914/Oasis2_clq4l3.webp"},{btn:"Our Meal",link:"/amenities/menu",text:"Feel right at home.",bgImg:"https://res.cloudinary.com/oasismanors/image/upload/v1706128914/Oasis3_biy68f.webp"},{btn:"Supportive Services",link:"/lifestyle",text:"Support you can count on.",bgImg:"https://res.cloudinary.com/oasismanors/image/upload/v1706128915/Oasis4_anftz6.webp"}])

  useEffect(() => {
    const interval = setInterval(() => {  //assign interval to a variable to clear it.
      if(value < allItems.length-1 ){
        setHero(allItems[value+1]) ;
          setValue(value+1)
      }else {
        setHero(allItems[0]) ;
        setValue(0);
      }
    }, 3000)
    return () => clearInterval(interval); //This is important
   
  }, [value])


  return (
    <Fragment>
      <Header />
      <Suspense fallback={<Loading />}>
        <TopAbstract />
        <Box sx={{ background: "#fff", marginTop: "20px" }}>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h2" color="#082952" gutterBottom>
                  Welcome to Chelmsford
                </Typography>
                <Typography variant="h5">
                  Dive into a world of knowledge with our vast array of learning resources. Whether you're a beginner or an expert, we have something for everyone. Explore new topics, sharpen your skills, and broaden your horizons. Let's embark on this journey of learning together.
                </Typography>
                <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem',marginBottom: '1rem' }}>
                  <Button variant="contained">Classes</Button>
                  <Button variant="outlined">Test</Button>
                </Box>
          
              </Grid>
              <Grid item xs={12} md={6}>
                <div id="welcomeImg" />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ marginTop: '2rem' }}>
          <Suspense fallback={<Loading />}>
            <Enquiry />
            <Suspense fallback={<Loading />}>
              <Footer />
            </Suspense>
          </Suspense>
        </Box>
      </Suspense>
    </Fragment>
  );
  }


  
export function TopAbstract() {
    return (
      <div id="topAbstract"/>
    )
  }



 
export default MyApp