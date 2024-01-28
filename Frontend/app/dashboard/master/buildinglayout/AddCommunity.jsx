'use client'; 
import React, { useState,useEffect,useRef } from 'react';
import {Grid,IconButton,TextField,Button,CircularProgress, Dialog,DialogTitle,DialogContent,DialogActions,InputAdornment } from '@mui/material/';
import {allStates} from "../../../Components/StaticData";
import {FcSearch} from "react-icons/fc";
import Autocomplete from '@mui/material/Autocomplete';
import MySnackbar from "../../../Components/MySnackbar/MySnackbar";
import { ledgerService } from "../../../services";

import axios from 'axios';

function AddCommunity({comDialog,setComDialog}) {
    const [loadingCom, setLoadingCom] = useState(false);
    const [communityName, setComName]= useState("");
    const [licenseNumber, setLicenseNo] = useState("");
    const [buildingNumber, setBuildingNo] = useState("");
    const [communityMobileNumber, setComMobile] = useState("");
    const [communityAddress, setComAddress] = useState("");
    const [communityZipCode, setComZipCode] = useState("");
    const [loadingComZip,setLoadingComZip] = useState(false)
    const [communityCity, setComCity] = useState(null);
    const [allComCity, setAllConCity] = useState([])
    const [communityState, setComState] = useState("");
    const [licenseeName, setLicenseeName] = useState("");
    const [licenseeMobileNumber, setLicenseeMobile] = useState("");
    const [licenseeAddress, setLicenseeAddress] = useState("");
    const [licenseeZipCode, setLicenseeZip] = useState("");
    const [loadingLicZip, setLoadingLicZip] = useState(false);
    const [licenseeCity, setLicenseeCity] = useState(null);
    const [allLiceCity, setAllLicCity] = useState([]);
    const [licenseeState, setLicenseeState] = useState("");
    const snackRef = useRef();

    async function getZIPData(zipFor) {
        if(zipFor === "community"){
          if(communityZipCode.length > 4){
            setLoadingComZip(true)
            await axios.get(`/api/public/zipToLocation?zipCode=${communityZipCode}`).then(res=>{
              if(res.data){
              setAllConCity(res.data)
              let obj = allStates.find(o=>o.id ===res.data[0]?.state)
              setComState(obj?.label)
              setLoadingComZip(false)
              }else snackRef.current.handleSnack({message:"No City Found with this zip code.", variant:"info"});
            }
            ).catch(err=>{
              console.log(err);
              snackRef.current.handleSnack({message:"Plesae enter correct ZIP code.", variant:"error"});
              setComZipCode("");
              setComCity(null);
              setAllConCity([]);
              setComState("");
              setLoadingComZip(false);
            })
          }

        }else if(zipFor === "licensee"){
          if(licenseeZipCode.length > 4){
            setLoadingLicZip(true)
            await axios.get(`/api/public/zipToLocation?zipCode=${licenseeZipCode}`).then(res=>{
              if(res.data){
              setAllLicCity(res.data)
              let obj = allStates.find(o=>o.id ===res.data[0]?.state)
              setLicenseeState(obj?.label)
              setLoadingLicZip(false)
              }else snackRef.current.handleSnack({message:"No City Found with this zip code.", variant:"info"});
            }).catch(err=>{
              console.log(err);
              snackRef.current.handleSnack({message:"Plesae enter correct ZIP code.", variant:"error"});
              setLicenseeZip("");
              setLicenseeCity(null);
              setAllLicCity([]);
              setLicenseeState("");
              setLoadingLicZip(false);
            })
          }
        }
      }

    const handleClear =(d)=>{
        setLoadingCom(false);
        setComName(d?.communityName ?? "");
        setBuildingNo(d?.buildingNumber ?? "");
        setLicenseNo(d?.licenseNumber ?? "");
        setComMobile(d?.communityMobileNumber ?? "");
        setComAddress(d?.communityAddress ?? "");
        setComZipCode(d?.communityZipCode ?? "");
        setLoadingComZip(false);
        setComCity(d?.communityCity ?? null);
        setAllConCity([]);
        setComState(d?.communityState ?? "");
        setLicenseeName(d?.licenseeName ?? "");
        setLicenseeMobile(d?.licenseeMobileNumber ?? "");
        setLicenseeAddress(d?.licenseeAddress ?? "");
        setLicenseeZip(d?.licenseeZipCode ?? "");
        setLoadingLicZip(false);
        setLicenseeCity(d?.licenseeCity ?? null);
        setAllLicCity([]);
        setLicenseeState(d?.licenseeState ?? "")
    }
       
    useEffect(() => {
        if(comDialog._id){
        handleClear(comDialog)
        }
    }, [comDialog._id])

const handleCommunity = async ()=>{
    let comData = {communityName,licenseNumber,buildingNumber,communityMobileNumber,communityAddress,communityZipCode,communityCity,communityState,licenseeName,licenseeMobileNumber,licenseeAddress,licenseeZipCode,licenseeCity,licenseeState}
    setLoadingCom(true);
    let response = await ledgerService.saveLedger(`api/v1/main/community/addCommunity`, comDialog._id, comData);
    if(response.variant === "success"){
        setLoadingCom(false);
        snackRef.current.handleSnack(response);
        handleClear("")
        setComDialog();
    }else {setLoadingCom(false);console.log(response); snackRef.current.handleSnack(response);}    
}
  return (
    <section>
        <Dialog maxWidth="md" open={comDialog.open}>
        <DialogTitle>Community Details :-</DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "20"}} onChange={e=>setComName(e.target.value)} label="Community Name" value={communityName} variant="standard"  />  
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "20"}} onChange={e=>setLicenseNo(e.target.value)} label="License Number" value={licenseNumber} variant="standard"  />  
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "15"}} onChange={e=>setBuildingNo(e.target.value)} label="Building Number" value={buildingNumber} variant="standard"  />  
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "20"}} type="number" onChange={e=>setComMobile(e.target.value)} label="Community Phone Number" value={communityMobileNumber} variant="standard"  />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "60"}} onChange={e=>setComAddress(e.target.value)} placeholder="Community Address" label="Community Address" value={communityAddress} variant="standard"  />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "6"}} type='number' onChange={e=>setComZipCode(e.target.value)} InputProps= {{
        endAdornment: (
        <InputAdornment position="end">
        {loadingComZip ? <CircularProgress size={25}/> : communityZipCode?.length > 4 ? <IconButton size="medium" onClick={()=>getZIPData("community")}><FcSearch/></IconButton> : null}  
        </InputAdornment>
        ),
        }} label="Community ZIP Code" value={communityZipCode} variant="standard"  />
        </Grid>
        <Grid item xs={12} md={4}>
        <Autocomplete
        getOptionLabel={(option) => option.city ?? option}
        options={allComCity}
        disabled={communityZipCode?.length<5 || loadingComZip}
        onChange={(e, v) => {
        setComCity(v);
        }}
        value={communityCity}
        renderInput={(params) => <TextField {...params} fullWidth helperText={communityState ? communityState : "Just type Community ZIP Code"} label="Community City" placeholder="Community City"/>}
        /> 
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "40"}} placeholder="Contact Person Name" onChange={e=>setLicenseeName(e.target.value)} label="Licensee Name" value={licenseeName} variant="standard"  />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "20"}} type="number" placeholder="Contact Mobile Number" onChange={e=>setLicenseeMobile(e.target.value)} label="Licensee Mobile Number" value={licenseeMobileNumber} variant="standard"  />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "220"}} placeholder="Licensee Address" onChange={e=>setLicenseeAddress(e.target.value)} label="Licensee Address" value={licenseeAddress} variant="standard"  />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" inputProps={{maxLength: "6"}} onChange={e=>setLicenseeZip(e.target.value)} InputProps= {{
        endAdornment: (
        <InputAdornment position="end">
        {loadingLicZip ? <CircularProgress size={25}/> : licenseeZipCode?.length > 4 ? <IconButton size="medium" onClick={()=>getZIPData("licensee")}><FcSearch/></IconButton> : null}  
        </InputAdornment>
        ),
        }} label="Licensee Zip Code" type='number' value={licenseeZipCode} variant="standard"  />
        </Grid>
        <Grid item xs={12} md={4}>
        <Autocomplete
        getOptionLabel={(option) => option.city ?? option}
        options={allLiceCity}
        disabled={licenseeZipCode?.length<5 || loadingLicZip}
        onChange={(e, v) => {
        setLicenseeCity(v);
        }}
        value={licenseeCity}
        renderInput={(params) => <TextField {...params} fullWidth helperText={licenseeState ? licenseeState : "Just type Licensee ZIP Code"} label="Licensee City" placeholder="Licensee City"/>}
        /> 
        </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=> handleClear("")}  color="inherit">Clear</Button><span style={{flexGrow:0.4}}/>
        <Button onClick={()=> {handleClear("");setComDialog()}} color="error">Close</Button><span style={{flexGrow:0.4}}/>
        <Button onClick={()=> handleCommunity()} disabled={loadingCom} variant="contained">{comDialog?._id ? "Update Community" : "Add Community"}</Button>
        </DialogActions>
        </Dialog>
        <MySnackbar ref={snackRef} />
    </section>
  )
}

export default AddCommunity