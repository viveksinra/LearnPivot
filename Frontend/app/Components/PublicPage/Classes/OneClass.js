import { Divider, Grid, Typography } from "@mui/material";
import React from "react";


const OneClass = ({key, img,title,timing,subTitle}) => {
  return (  <Grid container  key={key} spacing={4}>
    <Grid item xs={12} md={4}>
       <img src={img} className="creativeImg" alt={title} />
    </Grid>
    <Grid item xs={12} md={8}>
  <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"18px",md:"20px"},fontWeight:600, lineHeight:"60px", fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\""}}>{title}</Typography>
  <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"18px",md:"20px"},fontWeight:400, fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\""}}>{timing}</Typography>
    <Typography color="#333" sx={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:100,fontSize:"1.3rem",lineHeight:"1.8rem"}}>
    {subTitle}
    </Typography>
    <br/>
    <div style={{display:"flex"}}>
    <span style={{flexGrow:0.1}}/>
   <button className="viewBtn">View Details</button>
   <span style={{flexGrow:0.1}}/>
        <button className="viewBtn">Register</button>
    </div>
    </Grid>
    <Divider sx={{ marginTop: "5px" }} />

    </Grid> )

}

export default OneClass