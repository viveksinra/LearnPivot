'use client';
import React, { forwardRef,useImperativeHandle } from 'react'
import { useState,useEffect,useRef} from 'react';
import MySnackbar from "../../Components/MySnackbar/MySnackbar";
import {Typography, Grid,TextField,FormControlLabel,Switch,ButtonGroup,Button,Accordion,AccordionSummary,Rating, AccordionDetails,InputAdornment,CircularProgress,IconButton} from '@mui/material/';
import Autocomplete from '@mui/material/Autocomplete';
import {allStates,allGenders, todayDate} from "../../Components/StaticData";
import { FcLikePlaceholder, FcLike,FcExpand,FcCheckmark,FcSearch } from "react-icons/fc";
import {MdDeleteForever} from "react-icons/md";
import { prospectService,invoiceService } from "../../services";
import axios from 'axios';


const EntryArea = forwardRef((props, ref) => {
    const snackRef = useRef();
    const [important, setImp] = useState(false);
    const [inquiryDate, setInquiryDate] = useState("");
    const [financialMoveInDate, setFinancialDate] = useState("");
    const [physicalMoveInDate, setPhysicalDate] = useState("");
    const [salesAgent, setSalesAgent] = useState(null);
    const [prospectStage, setProspectStage] = useState(null);
    const [prospectScore, setProspectScore] = useState(null);
    const [prospectSource, setProspectSource]  = useState(null);
    const [subscribed, setSubscribe] = useState(true);
    const [message, setMsg]=useState("");
    const [firstName, setFN]=useState("");
    const [lastName, setLN] = useState("");
    const [DOB, setDOB] = useState("");
    const [street, setStreet] = useState("");
    const [unit, setUnit] = useState("");
    const [gender, setGender] = useState(null);
    const [home, setHome] = useState("")
    const [office, setOffice] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [ssNumber,setSSNo] = useState("");
    const [zip, setZip] = useState("");
    const [loadingCity, setLoadingCity] = useState(false);
    const [city, setCity] =useState(null);
    const [state, setState]=useState(null);
  
    const [PAccordion, setPAccordion]=useState(true);
    const [allSalesAgent, setAllAgents] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const allProspectStage=[{label:"Casual Inquiry",id:"casualInquiry"},{label:"Qualified",id:"qualified"},{label:"Cold",id:"cold"},{label:"Warm",id:"warm"},{label:"Hot",id:"hot"}, {label:"Waiting List",id:"waitingList"},{label:"Lost",id:"lost"},{label:"Needs Assessment",id:"needsAssessment"}]
    const [allProspectSource, setAllPSource] = useState([]);
   
    useEffect(() => {
      async function getOneData(){
      let res = await prospectService.getOne(props.id);
      if(res.variant === "success"){
      props.setId(res.data._id);
      setImp(res.data.important);
      setInquiryDate(res.data.inquiryDate);
      setFinancialDate(res.data.financialMoveInDate);
      setPhysicalDate(res.data.physicalMoveInDate);
      setSalesAgent(res.data.salesAgent);
      setProspectStage(res.data.prospectStage);
      setProspectScore(res.data.prospectScore);
      setProspectSource(res.data.prospectSource);
      setSubscribe(res.data.marketingStatus);
      setMsg(res.data.message);
      setFN(res.data.firstName);
      setLN(res.data.lastName);
      setDOB(res.data.dateOfBirth);
      setStreet(res.data.streetAddress);
      setUnit(res.data.unit);
      setGender(res.data.gender);
      setHome(res.data.home);
      setOffice(res.data.office);
      setMobile(res.data.phone);
      setEmail(res.data.email);
      setSSNo(res.data.ssNumber);
      setZip(res.data.zipCode);
      if (res.data.city ) setCity({city:res.data.city});
      setState(res.data.state);
      setPAccordion(true);
      snackRef.current.handleSnack(res);
      }else snackRef.current.handleSnack(res);    
     }
     if(props.id){getOneData()}
    }, [props.id])
    
    useEffect(() => {
      setInquiryDate(todayDate())
    }, [])
    
    async function getZIPData() {
      if(zip.length === 5){
        setLoadingCity(true)
        await axios.get(`/api/public/zipToLocation?zipCode=${zip}`).then(res=>{
          if(res.data){
          setAllCity(res.data)
          let obj = allStates.find(o=>o.id ===res.data[0]?.state)
          setState(obj)
          setLoadingCity(false)
          }else snackRef.current.handleSnack({message:"No City Found with this zip code.", variant:"info"});
        }).catch(err=>{
          console.log(err);
          snackRef.current.handleSnack({message:"Plesae enter correct ZIP code.", variant:"error"});
          setZip("");
          setCity(null);
          setAllCity([]);
          setState(null);
          setLoadingCity(false);
        })
      }
    }
    const handleClear =()=>{
      props.setId("");
      setImp(false);
      setInquiryDate("");
      setFinancialDate("");
      setPhysicalDate("");
      setSalesAgent(null);
      setProspectStage(null);
      setProspectScore(null);
      setProspectSource(null);
      setSubscribe(true);
      setMsg("");
      setFN("");
      setLN("");
      setDOB("");
      setStreet("");
      setUnit("");
      setGender("");
      setHome("");
      setOffice("");
      setMobile("");
      setEmail("");
      setSSNo("");
      setZip("");
      setCity(null);
      setAllCity([]);
      setState(null);
      setPAccordion(true);
    }
    useImperativeHandle(ref, () => ({
         handleSubmit: async () => {
           try {
          let prospectData = { _id: props.id,inquiryDate, financialMoveInDate,physicalMoveInDate,salesAgent,prospectStage,prospectScore, marketingStatus:subscribed,prospectSource,message,firstName,lastName,dateOfBirth:DOB,gender,phone:mobile,email,ssNumber, streetAddress:street,unit,home, office, city:city?.city,state,zipCode:zip,important };
          let response;
            response = await prospectService.add(props.id, prospectData);
            if(response.variant === "success"){
              snackRef.current.handleSnack(response);
              handleClear();
            }else snackRef.current.handleSnack(response?.response?.data);            
           } catch (error) {
            console.log(error);
            snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.response.data.message, variant:"error"});
           } 
        },
        handleClear: () => handleClear() 
    }));
    useEffect(() => {
      // Getting all Sales Agent
      async function getLedger(){
        let res = await invoiceService.getLedger(`api/v1/account/ledger/getLedger/agentLedger/dropDown/getAll`);
        if(res.variant === "success"){
          setAllAgents(res.data)
        }else {snackRef.current.handleSnack(res); console.log(res)};    
       }
       getLedger()
     }, [])

     useEffect(() => {
      // Getting all Prospect Source
      async function getPSource(){
        let res = await invoiceService.getLedger(`api/v1/enquiry/prospectSource/getProspectSource/dropDown/getAll`);
        if(res.variant === "success"){
          setAllPSource(res.data)
        }else {snackRef.current.handleSnack(res); console.log(res)};    
       }
       getPSource()
     }, [])

     const handleDelete = async ()=>{
      try {
        let yes = confirm(`Do you really want to Permanently Delete - ${firstName} ${lastName} ?`)
        if(yes){
          let response = await prospectService.deleteLeave(`api/v1/enquiry/prospect/addProspect/deleteOne/${props.id}`);
          if(response.variant === "success"){
            snackRef.current.handleSnack(response);
            handleClear();
          } else snackRef.current.handleSnack(response?.response?.data); 
        }
         } catch (error) {
          console.log(error);
          snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.response.data.message, variant:"error"});
         } 
    }
    
    return <main style={{background:"#fff",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius:"10px",padding:20}}> 
    <Grid sx={{display:"flex",flexDirection:{xs:"column",md:"row"}, justifyContent:"space-between"}}>
    <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6'>Create Prospect</Typography> 
      <ButtonGroup variant="text" aria-label="text button group">
      <Button startIcon={important ? <FcLike /> : <FcLikePlaceholder/>} onClick={()=>setImp(!important)}>{important ? "Important" : "General"}</Button>
      <Button endIcon={<MdDeleteForever />} onClick={()=>handleDelete()} disabled={!props.id} color="error">Delete</Button>
      </ButtonGroup>
    </Grid>
    <Grid container spacing={2}>
    <Grid item xs={12} md={3}>
    <TextField disabled fullWidth label="Assisted Living Retirement Homes" variant="standard" />
    </Grid>
    <Grid item xs={12} md={2}>
    <TextField focused  type='date' value={inquiryDate} onChange={(e)=>setInquiryDate(e.target.value)} fullWidth label="Inquiry Date :" variant="standard" />
    </Grid>
    <Grid item xs={12} md={2}>
    <TextField focused type='date' value={financialMoveInDate} onChange={(e)=>setFinancialDate(e.target.value)} fullWidth label="Financial Move-In Date" variant="standard" />
    </Grid>
    <Grid item xs={12} md={2}>
    <TextField focused type='date' value={physicalMoveInDate} onChange={(e)=>setPhysicalDate(e.target.value)}  fullWidth label="Physical Move-In Date" variant="standard" />
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
        isOptionEqualToValue={(option, value) => option?._id === value?._id}
        options={allSalesAgent}
        value={salesAgent}
        onChange={(e, v) => {
          setSalesAgent(v); 
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option?._id}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} helperText="Master > Ledger > Under Group Agent." label="Sales Agent" variant="standard" />}
      />
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        options={allProspectStage}
        value={prospectStage}
        onChange={(e, v) => {
          setProspectStage(v);
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} label="Prospect Stage" variant="standard" />}
      />
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
       isOptionEqualToValue={(option, value) => option?._id === value?._id}
      value={prospectSource}
      onChange={(e, v) => {
        setProspectSource(v);
      }}
        options={allProspectSource}
        groupBy={(option) => option?.locationType}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option._id}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} label="Prospect Source" helperText="Master > Create Prospect Source" variant="standard" />}
      />
    </Grid>
    <Grid item xs={12} md={3} className='center'>
    <FormControlLabel control={<Rating name="Prospect-Score" precision={0.5} sx={{marginRight:"10px"}} value={prospectScore} onChange={(event, newValue) => {setProspectScore(newValue)}}/>} label="Conversion Probability" />
    </Grid>
    <Grid item xs={12} md={3}>
    <FormControlLabel control={<Switch defaultChecked value={subscribed} onChange={e=>setSubscribe(!subscribed)}/>} label="Subscribe Marketing" />
    </Grid>
    <Grid item xs={12}>
    <TextField label="Story" value={message} inputProps={{maxLength: "4000"}} onChange={e=>setMsg(e.target.value)} placeholder="Type something about the prospect. (If you wish)" fullWidth multiline rows={4} variant="outlined"  />
    </Grid>
  </Grid>
  <Accordion expanded={PAccordion}>
  <AccordionSummary
      expandIcon={<IconButton onClick={()=>setPAccordion(!PAccordion)}> <FcExpand /> </IconButton> }
      aria-controls="ProspectInformation"
      id="ProspectInformation"
    >
      <Typography>Prospect Information</Typography>
    
    </AccordionSummary>
    <AccordionDetails>
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="First Name" value={firstName} onChange={e=>setFN(e.target.value)} inputProps={{ minLength: "2", maxLength: "30" }} placeholder='First Name' variant="standard" />
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="Last Name" value={lastName} onChange={e=>setLN(e.target.value)}  inputProps={{ minLength: "2", maxLength: "30" }} placeholder='Last Name' variant="standard" />
      </Grid>
      <Grid item xs={12} md={3}>
      <Autocomplete
        id="allGenders"
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        options={allGenders}
        onChange={(e, v) => {
          setGender(v);
        }}
        value={gender}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="Gender"/>}
        />
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth focused label="Date of Birth" value={DOB} onChange={e=>setDOB(e.target.value)} type='date' placeholder='DOB' variant="standard" />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField fullWidth label="Street Address" inputProps={{maxLength: "250"}} value={street} onChange={e=>setStreet(e.target.value)} placeholder='Type Street Address' variant="standard" />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField fullWidth label="Unit" inputProps={{maxLength: "150"}} value={unit} onChange={e=>setUnit(e.target.value)} placeholder='Unit' variant="standard" />
      </Grid>
        <Grid item xs={12} md={3}>
            <TextField fullWidth value={home} inputProps={{maxLength: "150"}} onChange={e=>setHome(e.target.value)} label="Home #" placeholder='Home' variant="standard" />
        </Grid>
        <Grid item xs={12} md={3}> 
        <TextField fullWidth label="Office #" inputProps={{maxLength: "150"}} value={office} onChange={e=>setOffice(e.target.value)} placeholder='Office' variant="standard" />
        </Grid>
        <Grid item xs={12} md={3}> 
        <TextField fullWidth label="Mobile No." inputProps={{maxLength: "15"}} value={mobile} onChange={e=>setMobile(e.target.value)} type='number' placeholder='Phone Number' variant="standard" />
        </Grid>
        <Grid item xs={12} md={3}> 
        <TextField fullWidth label="Email" inputProps={{maxLength: "60"}} value={email} onChange={e=>setEmail(e.target.value)} type='email' placeholder='Email' variant="standard" />
        </Grid>
        <Grid item xs={12} md={3}> 
        <TextField fullWidth label="Social Security Number" inputProps={{maxLength: "9"}} value={ssNumber} onChange={e=>setSSNo(e.target.value)} type="number" placeholder='Social Security Number (SSN)' variant="standard" />
        </Grid>
        <Grid item xs={12} md={3}> 
          <TextField fullWidth value={zip} inputProps={{maxLength: "10"}} onChange={e=> {setZip(e.target.value)}} onBlur={()=>getZIPData()} disabled={loadingCity} InputProps= {{
            endAdornment: (
            <InputAdornment position="end">
            {loadingCity ? <CircularProgress size={25}/> : zip?.length > 4 ? <IconButton size="medium" onClick={()=>getZIPData()}><FcSearch/></IconButton> : null}  
            </InputAdornment>
            ),
            }}  label="ZIP Code" type="number"  placeholder="ZIP Code" variant="standard" />
        </Grid> 
            <Grid item xs={12} md={3}>
            <Autocomplete
              id="all-City"
              getOptionLabel={(option) => option.city}
              options={allCity}
              disabled={zip?.length<5}
              onChange={(e, v) => {
                setCity(v);
              }}
              value={city}
              renderInput={(params) => <TextField {...params} fullWidth helperText="Just type ZIP Code" label="City" placeholder="City"/>}
              /> 
            </Grid>
                    <Grid item xs={12} md={3}> 
                      <Autocomplete
                      id="allStates"
                      isOptionEqualToValue={(option, value) => option?.id === value?.id}
                      options={allStates}
                      onChange={(e, v) => {
                        setState(v);
                      }}
                      value={state}
                      disabled
                      renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="State"/>}
                      />
                    </Grid>
    </Grid>
    </AccordionDetails>
  </Accordion>
  <MySnackbar ref={snackRef} />
  </main>;
  });
  
  
export default EntryArea; 