"use client";
import Header from "../Components/Header1/Header"
import "./aboutStyle.css";
import { TopAbstract } from "../MyApp";
import { Container, Typography,Grid, Divider,Fab,Breadcrumbs  } from "@mui/material";
// import {FcFinePrint } from "react-icons/fc";
import Enquiry from "../Components/Enquiry/Enquiry";
import {NewFooter} from "../Components/Footer/Footer";
import Link from "next/link";
function About() {
  return (
    <main style={{backgroundColor:"#fff"}}>
      <Header/>
      <TopAbstract/>

      <Container className="sectionMargin" >
        <br/>
        <Breadcrumbs separator="›" sx={{fontWeight:600,fontFamily:"acumin-pro,\"sans-serif\"",fontSize:"24px"}} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
        Chelmsford
        </Link>
        <Typography sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontSize:"20px"}} color="text.primary">
        About
        </Typography>
        <Typography sx={{fontWeight:500,fontFamily:"acumin-pro,\"sans-serif\"",fontSize:"20px"}} color="text.primary">
        Chelmsford Gateway
        </Typography>
        </Breadcrumbs>
        <br/>      
        <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"36px"}, fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\""}}>Chelmsford</Typography>
        <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.2rem"}}>
        Chelmsford is a chain of boutique assisted living facilities that bridge the gap between:
        </Typography>
        <ul style={{listStyle:"none",marginLeft:"30px"}}>
          <li className="ChoiceList"> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:100,fontSize:"1.2rem"}}>Small facilities that offer personalized attention with a limited range of services and</Typography></li>
          <li className="ChoiceList"> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.2rem"}}>The impersonal feel of large institutional facilities with a full range of services.</Typography></li>
        </ul>
        <br/>
        <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"36px"}, fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\""}}>A Full Service Personalized Care Facility</Typography>
        <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.2rem"}}>
        Chelmsford Gateway, set in central San Fernando Valley, is our first offering of this new type of living
        facility: the full services typically found in impersonal large care facilities combined with the
        personal touch of an intimate setting. An integral part of life at Chelmsford Gateway is the <strong>Joy of
        Living</strong>,  bringing you a personalized lifestyle in tune with your needs and abilities.
        </Typography>
        
        <br/> <br/>
       <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{display:"flex", flexDirection:"column",justifyContent:"center"}}>
        <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"36px"}, fontFamily: 'Adequate,Helvetica Neue,Helvetica,\"sans-serif\"'}}>A Full Range of Services</Typography>
         <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100, fontSize:"1.2rem"}}>Chelmsford Gateway provides a full range of amenities and services:</Typography>
         <br/>
        <Typography color="#082952" sx={{margin:"10px 0px", fontFamily:"AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\"",fontSize:"2rem"}}>- Your Safety</Typography>
          <ul style={{listStyleType: "circle",marginLeft:"30px"}}>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Cushioned Outdoor Floors - that help absorb pratfalls</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>24-hour security for building and grounds</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Full backup generator for 24x7 uptime of your equipment.</Typography></li>
          </ul>
          <br/>
        <Typography color="#082952" sx={{margin:"10px 0px", fontFamily:"AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\"",fontSize:"2rem"}}>- Your Home</Typography>
          <ul style={{listStyleType: "circle",marginLeft:"30px"}}>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Choice of Private Bedrooms and Bathrooms</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Garden Courtyard for the joy of nature</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Indoor/outdoor maintenance and management.</Typography></li>
          </ul>
          <br/>
        <Typography color="#082952" sx={{margin:"10px 0px", fontFamily:"AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\"",fontSize:"2rem"}}>- Your Joy</Typography>
          <ul style={{listStyleType: "circle",marginLeft:"30px"}}>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Heated Pool, sparkling spa and steam sauna</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Putting Green</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Courtyard Game Room.</Typography></li>
          </ul>
          <br/>
        <Typography color="#082952" sx={{margin:"10px 0px", fontFamily:"AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\"",fontSize:"2rem"}}>- Your Lifestyle Choices</Typography>
          <ul style={{listStyleType: "circle",marginLeft:"30px"}}>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Bring your friendly pet – we love them!</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Access personalized services like online classes and libraries.</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Access personalized Salon and Fitness Services.</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Personalized Meals from our in-house kitchen.</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>All meals are freshly prepared every day.</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Personalized web portal for you and your loved ones to interact.</Typography></li>
          </ul>
          <br/>
        <Typography color="#082952" sx={{margin:"10px 0px", fontFamily:"AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\"",fontSize:"2rem"}}>- Your Concierge Services</Typography>
          <ul style={{listStyleType: "circle",marginLeft:"30px"}}>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Weekly housekeeping and laundry services.</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Scheduled transportation to your choice destinations.</Typography></li>
          <li> <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>Community-wide WiFi.</Typography></li>
          </ul>
        </Grid>
        <Grid item xs={12} md={6} className="center" sx={{flexDirection:"column"}}>
        <Typography color="#00a2c2" sx={{paddingBottom:"2rem",fontFamily:"Adequate,Helvetica Neue,Helvetica,\"sans-serif\"",fontSize:"2rem"}}>“It's like home to me.”</Typography>
        <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:400,fontSize:"1.2rem"}}>- A Resident of Chelmsford Home.</Typography>
          </Grid>
        <Grid item xs={12} md={9}>
        <Typography color="#082952" sx={{paddingBottom:"2rem",marginTop:"60px", fontFamily:"Adequate,Helvetica Neue,Helvetica,\"sans-serif\"",fontSize:"2rem"}}>An Intimate Community</Typography>
        <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"", fontWeight:100, fontSize:"1.2rem"}}>Our team members work with you to develop your personalized Joy of Living care plan: leveraging
        our services to enable your personal comfort from walks in the morning to a glass of wine at night,
        while working with you to address your support needs from medication management to dressing
        and grooming. Quite simply, we care, and it shows in our community.</Typography>
        </Grid>
        <Grid item xs={12} md={3}/>
       </Grid>
       
       
       <br/> 
       <Grid container spacing={2}>
        <Grid item xs={12}><Divider sx={{marginBottom:"30px"}}/></Grid>
        <Grid item xs={12} md={6} className="center">
          <img src="https://res.cloudinary.com/oasismanors/image/upload/v1704448863/1.1_CAN_photo-533x355_pm26fh.avif" alt="Chelmsford-Aunty" style={{borderRadius:"20px",width:"500px"}}/>
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"36px"}, fontFamily: 'Adequate,Helvetica Neue,Helvetica,\"sans-serif\"'}}>Respect, Care and Joy</Typography>
          <ul style={{ listStyle:"none",marginLeft:"10px"}}>
            <li className="ChoiceList"><Typography variant="subtitle1">Respect: We respect your wishes in crafting your living plan here. From engaging activities to learning opportunities, we support your active lifestyle.</Typography></li>
            <li className="ChoiceList"><Typography variant="subtitle1">Care: We provide the care that you need: from assistance with daily chores to medications and physical activities.</Typography></li>
            <li className="ChoiceList"><Typography variant="subtitle1">Joy: We seek to bring joy into your life in ways small and large: from a simple culinary delight to engaging with family and friends.</Typography></li>
          </ul>
        </Grid>
        <Grid item xs={12}><Divider sx={{marginTop:"30px"}}/></Grid>
        </Grid>
        <br/> <br/>
        <Grid container>
          <Grid item xs={12} md={9}>
          <br/>
          <Typography gutterBottom sx={{fontFamily: 'AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\"',color:"#082952",fontSize:{xs:"20px",md:"30px"}}}>Come learn more about us.</Typography>
          <Typography gutterBottom sx={{fontFamily: "acumin-pro, \"sans-serif\"",color:"#333",fontWeight:"100", fontSize:{xs:"20px",md:"20px"}}}>Everyone has different needs. To learn more about The Chelmsford Gateway in central Sylmar, how it
            may be right for you or a loved one, or to arrange for a visit, please do not hesitate to <Link style={{color:"#00a2c2",fontWeight:500}} href="/contact">Contact Us.</Link></Typography>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
        </Grid>
      </Container>
      <Enquiry/>
    
      <NewFooter/>
    </main>
  )
}

export default About
