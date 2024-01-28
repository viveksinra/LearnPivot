"use client";
import { useState,Suspense } from "react";
import Header from "../Components/Header1/Header";
import "./lifestyle.css";
import { TopAbstract } from "../MyApp";
import { Container, Typography,Grid,  Breadcrumbs,CircularProgress, Divider } from "@mui/material";
import Enquiry from "../Components/Enquiry/Enquiry";
import {NewFooter} from "../Components/Footer/Footer";
import Link from "next/link";

function CreativeLiving() {
    const [creativeData] = useState([{title:"Activities",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/2.1_CAN_wellness-533x355.jpg",text:"Enjoy a daily regimen of physical and mental activities that stimulate your mind and body to greater joy."},{title:"Connections",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/2.1_CAN_culture-533x355.jpg",text:"Through our resident portals, keep in touch with your friends and family as they go through the phases of their lives. Our portals also allow them, with your permission, to track your progress and care 24 by 7."},{title:"Services",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/2.1_CAN_arts-533x355.jpg",text:"We provide you access to services you enjoy in your life, from salons and recreational centers to appointments with doctors and dentists."},{title:"Cuisine",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/2.1_CAN_experience-533x355.jpg",text:"Our master chefs provide personalized meals that you can plan and request on a daily basis. Enjoy cuisines from around the world."},{title:"Staff Support",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/2.1_CAN_academy-533x355.jpg",text:"We listen to you. Our professional staff will support your activities as directed by you, guiding you to newer and richer experiences."}])
    return (
    <main style={{backgroundColor:"#fff"}}>
      <Header/>
      <TopAbstract/>
      <div className="topBg" id="livingBg">
      </div>
      <Container className="sectionMargin" >
        <br/>
        <Breadcrumbs separator="›" sx={{fontWeight:600,fontFamily:"acumin-pro,\"sans-serif\"",fontSize:"24px"}} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
        Chelmsford
        </Link>
        <Typography sx={{fontWeight:600,fontFamily:"acumin-pro,\"sans-serif\"",fontSize:"20px"}} color="text.primary">
        Joy in Living
        </Typography>
        </Breadcrumbs>
        <br/>
        <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"40px"}, fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\""}}>Joy in Living Communities</Typography>
        <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.3rem",lineHeight:"2.4rem"}}>
          Chelmsford communities are right-sized: not too large to be totally impersonal, but still large enough to
          provide you a wide variety of services. Our residents enjoy an enviable lifestyle: world class
          cuisine, activities both physical and mental, all backed by our caring professionals. We offer a
          well-kept setting with superb amenities where you can mindfully continue to pursue your joy in
          life.
        </Typography>
        
        <Grid container spacing={2}>
        {creativeData.map((c,i)=><Grid item xs={12}>
            <Divider sx={{margin:"30px 0px"}}/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <img src={c?.img} className="creativeImg" alt={c?.title} />
                </Grid>
                <Grid item xs={12} md={9}>
               <div style={{display:"flex"}}> 
               <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"32px"},fontWeight:600, fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\""}}>Joy in Living — &nbsp;</Typography><Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"32px"},fontWeight:100, fontFamily: "AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\""}}>{c.title}</Typography> 
                </div> 
                <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.3rem",lineHeight:"1.8rem"}}>
                {c?.text}
                 </Typography>
                </Grid>
            </Grid>
             </Grid>)}
        <Grid item xs={12}>
        <Divider sx={{margin:"30px 0px"}}/>
        </Grid>
        <Grid item xs={12}>
        <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"30px"}, fontWeight:100, fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\""}}>Resident led, staff supported</Typography>
        <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.3rem",lineHeight:"2.0rem"}}>
        The Academy draws on the insights and direction of a volunteer group of Chelmsford resident advisors who assist in its development and oversight. Creative Living mindfully celebrates the talents and life experiences of those who live at Chelmsford Residents are encouraged to be facilitators and teachers.
        </Typography><br/>
            <Typography color="black" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.3rem"}}> <br/>
            To learn more about joy in living, or if you have any questions, please do not hesitate to call or <Link style={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:400,color:"#00a2c2",fontSize:"1.2rem"}} href="/contact">Contact US</Link>
            </Typography>
        </Grid>
        </Grid>
      </Container>
      
      <Enquiry/>
    
      <NewFooter/>
    </main>
  )
}

export default CreativeLiving
