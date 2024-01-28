import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

const Hpage1 = () => {

    return(
<>

        <br/> 
        <Grid container spacing={2} sx={{ background: "#fff" }}>
        
         <Grid item xs={12}><Divider sx={{marginBottom:"30px"}}/></Grid>
         <Grid item xs={12} md={6} className="center">
           <img src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=900&t=st=1706439606~exp=1706440206~hmac=1a688e1e8cb685a5b571962601c19196c3f114d054212027db0b202e73e0d5dd" alt="Chelmsford-Aunty" style={{borderRadius:"20px",width:"500px"}}/>
         </Grid>
         <Grid item xs={12} md={6}>
      <Typography color="#082952" gutterBottom sx={{ fontSize: { xs: "24px", md: "36px" }, fontFamily: 'Adequate,Helvetica Neue,Helvetica,\"sans-serif\"' }}>Transform Your Learning Experience</Typography>
      <ul style={{ listStyle: "none", marginLeft: "10px" }}>
        <li className="ChoiceList"><Typography variant="subtitle1">Engage in Online Classes: Join interactive sessions led by expert instructors, ensuring a dynamic and immersive learning experience.</Typography></li>
        <li className="ChoiceList"><Typography variant="subtitle1">Practice with Mock Tests: Sharpen your skills and assess your knowledge through our comprehensive mock tests, preparing you for success.</Typography></li>
        <li className="ChoiceList"><Typography variant="subtitle1">Respect, Care, and Progress: Our platform values your learning journey. We provide support, care, and opportunities for your academic advancement.</Typography></li>
      </ul>
    </Grid>
         <Grid item xs={12}><Divider sx={{marginTop:"30px"}}/></Grid>
         </Grid>
         <br/>
         </>
    )

}

export default Hpage1