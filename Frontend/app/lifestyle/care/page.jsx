"use client";
import { useState } from "react";
import Header from "../../Components/Header1/Header";
import "../lifestyle.css";
import { TopAbstract } from "../../MyApp";
import { Container, Typography,Grid,  Breadcrumbs, Divider } from "@mui/material";
import Enquiry from "../../Components/Enquiry/Enquiry";
import {NewFooter} from "../../Components/Footer/Footer";
import Link from "next/link";

function CarePage() {
    const [customCare] = useState([{title:"independent",text:"Enjoy relaxed, maintenance-free, independent senior living, a luxury lifestyle, and proactive health and wellness. Life atOasis Homes allows you to continue to forge your own path and enjoy all our community offers, including:",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/3.0_CA_independent-533x355.jpg",list:["Exceptional gourmet dining choices","An array of enrichment and lifelong learning programs","Complimentary transportation services","Fitness and wellness programs","Housekeeping and maintenance","A continuum of supportive care services","Financial options","Move-in support to help you transition into your new Independent Living lifestyle."]},{title:"assisted",text:"Sometimes, a little extra help is all you need. For assisted living, Los Angeles is a wonderful choice. Calling Chelmsford in Sylmar home means having access to a continuum of care – custom-tailored by you – to ensure a plan for your needs, now and in the future. With our exclusive CareOne program, means you enjoy all the benefits of Independent Living, complemented by the services you want, when and how you want them. Your CareOne program provides the assistance you need through a flexible range of services, including:",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/3.0_CA_assisted-533x355.jpg",list:["Personal assistance – bathing, dressing, grooming, toileting ","Delivery of prepared meals","Meal reminders or escorting to the dining rooms","Assistance with incontinence care","Arrangement of transportation to medical or dental appointments","Escorting to offsite recreation, events, or appointments","Observation of overall health status to identify and assist with dietary, social, and health needs."]},{title:"memory",text:"The Courtyards at Chelmsford was created specifically for those needing Alzheimer’s care or assistance with mild memory loss or cognitive decline. Our specialized programs are designed specifically to enhance our residents’ individual abilities and preferences. Every day, a dedicated group of specially trained, compassionate life-enrichment professionals come together with residents and their families to create meaningful, joyful experiences. In consultation with families, we develop plans of personalized care, integrating each resident’s interests into daily life while respecting personal preferences for dressing, dining, and participation activities, ensuring abundant opportunities for residents to laugh, to listen and to enjoy each other’s company in a safe, protected environment.",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/3.0_CA_memory-533x355.jpg",},{title:"one",text:"Your needs are as individual as you are. Your care should be too. CareOne is our exclusive program that allows you to personalize your care at every step of your journey. It is designed to seamlessly integrate within any Choice Custom Care option. In consultation with your doctor and family, your CareOne program helps you to continue to live life on your terms. It provides you the services you want, when you want them, the way you want them.",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/3.0_CA_care-one-533x355.jpg"}])
    const [teamCare]= useState([{title:"Our Trusted Team",text:"Our Team Members are dedicated professionals who will assist you with all your needs. All our team members go through regularly scheduled training, health screening and background checks including fingerprinting.",img:"https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/3.0_CA_team-care-533x355.jpg"}]) 
    const [joyCare] = useState(["Personal assistance – bathing, dressing, grooming, toileting","Delivery of prepared meals","Meal reminders or escorting to the dining rooms","Assistance with incontinence care","Arrangement of transportation to medical or dental appointments","Escorting to offsite recreation, events, or appointments","Observation of overall health status to identify and assist with dietary, social, and health needs.","Exceptional gourmet dining choices","An array of enrichment and lifelong learning programs","Transportation services","Fitness and wellness programs","Housekeeping and maintenance","A continuum of supportive care services","Move-in support to help you transition into your new Independent Living lifestyle."])
    return (
    <main style={{backgroundColor:"#fff"}}>
      <Header/>
      <TopAbstract/>
      <div className="topBg" id="careBg">
      </div>
      <Container className="sectionMargin" >
        <br/>
        <Breadcrumbs separator="›" sx={{fontSize:"24px"}} aria-label="breadcrumb">
        <Link underline="hover" style={{fontFamily:"acumin-pro,\"sans-serif\""}} color="inherit" href="/">
        Chelmsford
        </Link>
        <Typography sx={{fontWeight:600,fontFamily:"acumin-pro,\"sans-serif\"",fontSize:"20px"}} color="text.primary">
        Choice Custom Care
        </Typography>
        </Breadcrumbs>
        
        <br/> <br/> 
        <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"36px"}, fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\""}}>
        <Link  href="/about/respiteCare">
        Respite Care Service
              </Link>
         </Typography>
        <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.2rem"}}>
        Caring for a loved one can be a rewarding experience, but it can also be challenging. Taking time for yourself is essential, but it can be difficult to find reliable care while you're away.
        </Typography>
<br/> 
        <Grid container spacing={2}>
       
        <Grid item xs={12}>
        <Divider sx={{margin:"30px 0px"}}/>
        </Grid>
        <Grid item xs={12}>
        <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"18px",md:"36px"}, fontWeight:400, fontFamily: "AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\""}}>A trusted name</Typography>
        <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.3rem",lineHeight:"2rem"}}>
        Our Team Members are professionally trained and dedicated to providing heartfelt care with dignity and respect. As a continuing care retirement community, Chelmsford takes pride in creating a family atmosphere. Our Team Members play an important role, which is why their tenure withOasis Homes can be measured in terms of decades, not years.
        </Typography><br/>
        <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.3rem",lineHeight:"2rem"}}>
        All Team Members receive:
        </Typography>
            <ul style={{listStyle:"none",marginTop:"30px",marginLeft:"30px"}}>
            <li className="choiceList">Fingerprint and background checks</li>
            <li className="choiceList">Health screening</li>
            <li className="choiceList">Ongoing training</li>
            </ul>
        </Grid>
        </Grid>
      </Container>
      <br/>
      <Container>
        <Grid container spacing={2}>
        {teamCare.map((c,i)=><Grid item key={i} xs={12}>
            <Divider sx={{margin:"30px 0px"}}/>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
               <img src={c.img} className="creativeImg" alt={c.title} />
                </Grid>
                <Grid item xs={12} md={8}>
                <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"18px",md:"30px"}, fontFamily: "AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\""}}>{c.title}</Typography>
                <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:300,fontSize:"20px",lineHeight:"1.8rem"}}>
                    {c?.text}
                </Typography>
                </Grid>
            </Grid>
             </Grid>)}
             <Grid item xs={12} md={9}>
             <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"18px",md:"30px"},marginTop:"60px", fontFamily: "AdequateLight,Helvetica Neue,Helvetica,\"sans-serif\""}}>We are here for you</Typography>
             <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:300,fontSize:"20px",lineHeight:"1.8rem"}}>
                From independent to assisted living in the Valley, choosing the right level of care and
                accommodation is an important decision. If you have any questions, would like more
                information, clarification on a specific topic, or even arrange to drop by for a visit, don’t hesitate
                to call or <Link style={{color:"#00a2c2",fontWeight:500}} href="/contact">Contact Us.</Link>
                </Typography>
             </Grid>
             <Grid item xs={12} md={3}/>
        </Grid>
      </Container>
      
      <Enquiry/>
    
      <NewFooter/>
    </main>
  )
}

export default CarePage
