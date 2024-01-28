"use client";
import { useEffect, useState, useRef } from "react";
import "./enquiryStyle.css";
import {Container, Grid, Typography,TextField,RadioGroup,FormControlLabel,Radio,Autocomplete ,Fab,MenuItem,InputAdornment,CircularProgress,Alert } from '@mui/material/';
import { allStates } from "../StaticData";
import { FcFeedback,FcApproval } from "react-icons/fc";
import Link from 'next/link';
import {authService} from "../../services/index";
import axios from "axios";


const Enquiry = () => {
  const [enquiryFor, setEnquiryFor]=useState("self");
  const [firstName,setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [email, setEmail]=useState("");
  const [mobile, setMobile]=useState("");
  const [address, setAddress]=useState("");
  const [zip, setZip]=useState("");
  const [city, setCity]=useState(null);
  const [loadingCity, setLoadingCity]=useState(false);
  const [state, setStateName]=useState(null);
  const [allCity, setAllCity] = useState([]);
  const [marketing, setMarketing]=useState("");
  const [message,setMsg]=useState("");
  const [submitted,setSubmitted] = useState(false)
  useEffect(() => {
    async function getZIPData() {
      if(zip.length===5){
        setLoadingCity(true)
        await axios.get(`/api/public/zipToLocation?zipCode=${zip}`).then(res=>{
          setAllCity(res.data)
          let obj = allStates.find(o=>o.id ===res.data[0].state)
          setStateName(obj)
          setLoadingCity(false)
        }).catch(err=>{
          console.log(err);
          alert("Plesae enter correct ZIP code.");
          setZip("");
          setCity(null);
          setAllCity([]);
          setStateName(null)
          setLoadingCity(false)
        })
      }
    }
    getZIPData()
  }, [zip])
  
  const handleEnquiry= async (e)=>{
    e.preventDefault();
    let user = {enquiryFor,firstName,lastName,email,mobile,address,zip,city:city?.city,state,marketing,message};
    try {
      let res = await authService.post(`api/v1/public/enquiry`,user);
      if(res.variant ==="success"){
        setSubmitted(true);
        setEnquiryFor("self");
        setFName("");
        setLName("");
        setEmail("");
        setMobile("");
        setAddress("");
        setZip("");
        setCity(null);
        setAllCity([]);
        setStateName(null);
        setMarketing("");
        setMsg("");
      }else alert(res.message)  
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.")
    }
  }

  const allMarketing = ["Web Search / Google", "Friend or colleague Recommendation", "Social Media","Direct Mailer","Family Member", "Email","Blog or Publication"];
  return (
    <section className="enquryBg" id="enquiry">
        <Container maxWidth="xl">
            <Grid container>
                <Grid item xs={12} lg={6}>
          
                <Typography color="#082952" gutterBottom sx={{fontSize:{xs:"24px",md:"30px"},paddingTop:"100px", lineHeight:"1.2", fontWeight:300, fontFamily: "Adequate,Helvetica,\"sans-serif\""}}>Request More Information</Typography> <br/> <br/> <br/>
                <p style={{fontFamily:"acumin-pro,\"sans-serif\"",fontWeight:200,fontSize:"20px",lineHeight:"2.5rem", color:"black"}}>To learn more about the benefits of a worry-free lifestyle at Chelmsford <br/> please complete and submit the form or call us at <Link href="tel:984-617-3905"><strong>(310) 995-4859</strong></Link> </p> <br/><br/>

                </Grid>
                <Grid item xs={12} lg={6}>
                  <form onSubmit={e=>handleEnquiry(e)} id="enquiryForm">
                  <Grid container spacing={2}>
                        <Grid item xs={12}>
                      <Alert icon={<FcApproval fontSize="inherit" />} severity="success">
                      Protecting your privacy: This website adheres to <a href="https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act" target="_blank"><strong>HIPAA compliance</strong> standards. </a>
                    </Alert>
                        </Grid>
                        {submitted ? <Grid item xs={12} className="center" sx={{flexDirection:"column"}}>
                          <div id="thanks"/>
                          <Typography color="teal" sx={{fontSize:{xs:"14px",md:"18px"}}}>Your message has been sent. We will get back you to very shortly.</Typography>
                          <br/>
                          <Fab variant="extended" size="medium" color="primary" onClick={()=>setSubmitted(false)} aria-label="Thank">
                          <FcFeedback style={{fontSize:24,marginRight:10}} sx={{ mr: 1 }} />
                         New Enquiry ?
                        </Fab>
                           </Grid> : 
                        <> 
                        <Grid item xs={12} id="self" className="center">
                        <Typography color="primary" variant="h5">Are you interest for &#x2192;</Typography>
                        <RadioGroup row style={{marginLeft:30}}
                            defaultValue="self"
                            value={enquiryFor}
                            onChange={e=>setEnquiryFor(e.target.value)}
                            name="radio-buttons-group"
                          >
                        <FormControlLabel value="self" control={<Radio />} label="Self" />
                        <FormControlLabel value="other" style={{marginLeft:20}} control={<Radio />} label="Other" />
                      </RadioGroup>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <TextField fullWidth value={firstName} required onChange={e=>setFName(e.target.value)} label="First Name" placeholder="First Name..." variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <TextField fullWidth value={lastName} required onChange={e=>setLName(e.target.value)} label="Last Name" placeholder="Last Name..." variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                        <TextField fullWidth value={email} required type="email" onChange={e=>setEmail(e.target.value)} label="Email" placeholder="Enter your Email" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                        <TextField fullWidth value={mobile} required onChange={e=>setMobile(e.target.value)} label="Phone" type="number" placeholder="Enter your Mobile No" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={12}> 
                        <TextField fullWidth value={address} onChange={e=>setAddress(e.target.value)} label="Address" placeholder="Enter your Address" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={4}> 
                        <TextField fullWidth value={zip} onChange={e=> setZip(e.target.value)} disabled={loadingCity} InputProps= {{
                          endAdornment: (
                            <InputAdornment position="end">
                                  {loadingCity && <CircularProgress size={25}/>}  
                            </InputAdornment>
                          ),
                        }}  label="ZIP Code" type="number" placeholder="ZIP Code" variant="outlined" />
                        </Grid> 
                        <Grid item xs={12} md={4}>
                        <Autocomplete
                          id="all-City"
                          getOptionLabel={(option) => option.city ?? option}
                          isOptionEqualToValue={(option, value) => option.city === city.city}
                          options={allCity}
                          disabled={allCity.length===0}
                          onChange={(e, v) => {
                            setCity(v);
                          }}
                          value={city}
                          renderInput={(params) => <TextField {...params} fullWidth helperText="Just type ZIP Code" label="City" placeholder="City"/>}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}> 
                          <Autocomplete
                          id="all-State"
                          disablePortal
                          disabled
                          options={allStates}
                          onChange={(e, v) => {
                            setStateName(v);
                          }}
                          value={state}
                          renderInput={(params) => <TextField {...params} fullWidth helperText="Just type ZIP Code" label="State"/>}
                          />
                        </Grid>
                                          <Grid item xs={12}> 
                                          <TextField fullWidth value={marketing} select onChange={e=>setMarketing(e.target.value)} label="How did you hear about us ?" placeholder="State" variant="outlined" >
                                          {allMarketing.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12}> 
                        <TextField fullWidth value={message} onChange={e=>setMsg(e.target.value)} label="Your Message"  multiline minRows={4} placeholder="Please write your message..." variant="outlined" />
                        </Grid>
                        <Grid item xs={12} style={{display:"flex",justifyContent:"center"}}> 
                        <Fab variant="extended" size="medium" color="primary" aria-label="add" type="submit">
                          <FcFeedback style={{fontSize:24,marginRight:10}} sx={{ mr: 1 }} />
                          Send Enquiry
                        </Fab>
                        </Grid>

                        </> }
                        
                    </Grid>
                  </form>
                    
                </Grid>
            </Grid>
        </Container>
    </section>
  )
}

export default Enquiry