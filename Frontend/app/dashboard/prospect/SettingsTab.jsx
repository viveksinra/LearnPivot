'use client';
import React,{useState,useRef,useEffect} from 'react'
import {Grid, Divider, Typography,TextField, InputAdornment, Button,Alert,AlertTitle,Accordion,AccordionSummary,AccordionDetails,Dialog,DialogContent,ButtonGroup} from '@mui/material/';
import {MdVisibility, MdVisibilityOff, MdSend } from "react-icons/md";
import Autocomplete from '@mui/material/Autocomplete';
import { prospectService } from "../../services";
import { useRouter } from 'next/navigation'
import { FcExpand } from "react-icons/fc";
import { DataGrid } from '@mui/x-data-grid';
import MySnackbar from "../../Components/MySnackbar/MySnackbar";


function SettingsTab({prospectId,residentId}) {
    const router = useRouter();
    const snackRef = useRef();
    const [password, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [showCPas, setShowCPass] = useState(false);
    const [match, setMatch] = useState(true);
    const [deactPass, setDeact] = useState(true);
    const [deactMoveBtn, setDeactMoveBtn] = useState(false);
    const [err, setErr] = useState([]);
    const [community, setCommunity] = useState(null);
    const [floor, setFloor] = useState(null);
    const [room, setRoom] = useState(null);
    const [seat, setSeat] = useState(null);
  
    const [allCommunity, setAllCommunity] = useState([]);
    const [allFloors, setAllFloor] = useState([]);
    const [allRooms, setAllRoom] = useState([]);
    const [allSeats, setAllSeat] = useState([])
    
    const checkMatch =()=>{
        if(password === confirmPass){
          setMatch(true)
        }else {
          setMatch(false)
        }
      }
    const handlePass = async ()=>{
        if(password === confirmPass){
            setShowPass(false);
            setShowCPass(false);
            setDeact(!deactPass);
            if(password !== ""){
              try {
                let res = await prospectService.setPassword((residentId ? residentId : prospectId), {password});
                 if(res.variant === "success"){
                   snackRef.current.handleSnack(res);
                   setDeactMoveBtn(false)
                 }else {
                  setDeactMoveBtn(true)
                  snackRef.current.handleSnack(res);
                    }      
                } catch (error) {
                 console.log(error);
                 snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.res.data.message, variant:"error"});
                } 
            }
        }
    }
    const handleMove = async ()=>{
      let y = confirm("Are you sure to move it as Resident ?")
      if(y===true){
        try {
          let res = await prospectService.moveToResident("api/v1/enquiry/prospect/moveToResidence", (prospectId || residentId), {community,floor,room,seat});
          if(res?.variant === "success"){
            snackRef.current.handleSnack(res); 
            router.push("/dashboard/residents")
          }else if(res?.variant === "missing"){
            setErr(res?.data)
          }else {
            setDeactMoveBtn(true)
            snackRef.current.handleSnack(res); 
            }      
        } catch (error) {
         console.log(error);
         snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.res.data.message, variant:"error"});
        } 
      }
    }

    useEffect(() => {
      async function getData(){
        if(community===null){
          let res = await prospectService.getScheduleLeave("api/v1/main/community/getCommunity/getAll");
          setAllCommunity(res.data);
        }else if (floor === null){ 
          let res = await prospectService.moveToResident("api/v1/main/seat/getSeat/get/floor", "", {communityId:community?._id});
          setAllFloor(res.data)
        } else if (room === null){
          let res = await prospectService.moveToResident("api/v1/main/seat/getSeat/get/room", "", {community, floor});
          setAllRoom(res.data)
        } else if (seat ===null){
          let res = await prospectService.moveToResident("api/v1/main/seat/getSeat/get/seat", "", {community, floor, room});
          setAllSeat(res.data)
        }
     }
     if(prospectId || residentId){getData()}
    }, [prospectId,residentId,community,floor,room, seat])

    useEffect(() => {
      async function getResRoom(){
       let res = await prospectService.getScheduleLeave(`api/v1/residence/leave/getLeave/getRoom/${residentId}`);
       if(res.variant ==="success"){
        setCommunity(res.data.community);
        setFloor(res.data.floor);
        setRoom(res.data.room);
        setSeat(res.data.seat)
       }
      }
      if(residentId){
        getResRoom()
      }
     }, [residentId])

  
  return (
    <main> 
        <Grid container spacing={2} sx={{background: "radial-gradient(circle, rgba(227,232,255,1) 0%, rgba(252,255,249,1) 100%)", borderRadius:5, margin:"10px 0px", paddingBottom:"20px"}}>
            <Grid item xs={12}>
            <Divider> <Typography>Set Password</Typography></Divider>
            <Typography variant='body2' align="center">User Name is your Email or Mobile No.</Typography> 
            </Grid>
            <Grid item xs={0} md={1}/>
            <Grid item xs={12} md={4}>
                <TextField fullWidth value={password} name="password" required disabled={deactPass} type={showPass ? "text" : "password"} InputProps={{ endAdornment: (
                <InputAdornment onClick={()=>setShowPass(!showPass)} position="end">
                {showPass ? <MdVisibilityOff style={{fontSize:24}}/> : <MdVisibility style={{fontSize:24}} />}
                </InputAdornment>),}} onChange={e=>setPass(e.target.value)} label="Set Password" helperText="Follow Strong Password rules" placeholder="Password" variant="outlined" />
            </Grid>
    
            <Grid item xs={12} md={4}> 
                <TextField fullWidth value={confirmPass} name="password" required error={!match} disabled={deactPass} onBlur={checkMatch} type={showCPas ? "text" : "password"} InputProps={{ endAdornment: (
                <InputAdornment onClick={()=>setShowCPass(!showCPas)} position="end">
                {showCPas ? <MdVisibilityOff style={{fontSize:24}}/> : <MdVisibility style={{fontSize:24}} />}
                </InputAdornment>),}} onChange={e=>setConfirmPass(e.target.value)} label="Confirm Password" helperText={match ? "Enter the same Password" :"Password Not Matched"} placeholder="Confirm Password" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={3}>
                <Button variant="outlined" color='secondary' onClick={handlePass} sx={{marginTop:1}} >{deactPass ? "Edit Password" : "Save Password"}</Button>
            </Grid>
            <br/>
        </Grid>

            <Grid container spacing={2} sx={{background: "linear-gradient(56deg, rgba(248,248,255,1) 0%, rgba(240,240,255,1) 58%, rgba(0,212,255,0.17) 100%);", borderRadius:5, margin:"20px 0px"}}>
              <Grid item xs={12}>
              <Divider > <Typography>{residentId ? "Transfer Resident" : "Move to Resident"} </Typography></Divider>
              </Grid>
              <Grid item xs={12} md={3}>
              <Autocomplete
                  isOptionEqualToValue={(option, value) => option?._id === value?._id}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option._id}>
                        {option.communityName}
                      </li>
                    );
                  }}
                  groupBy={(option) => option?.buildingNumber}
                  getOptionLabel={(option) => option.communityName}
                  options={allCommunity}
                  onChange={(e, v) => {
                    setCommunity(v)     
                    setFloor(null);
                    setRoom(null);
                    setSeat(null);
                    setAllFloor([]);
                    setAllRoom([]);
                    setAllSeat([]);
                  }}
                  value={community}
                  renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="Community Name"/>}
                  /> 
              </Grid>
              <Grid item xs={12} md={3}>
              <Autocomplete
                  isOptionEqualToValue={(option, value) => option?._id === value?._id}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option._id}>
                        {option.label}
                      </li>
                    );
                  }}
                  options={allFloors}
                  noOptionsText="Select Community Name"
                  onChange={(e, v) => {
                    setFloor(v);
                    setRoom(null);
                    setSeat(null);
                    setAllRoom([]);
                    setAllSeat([]);
                  }}
                  value={floor}
                  renderInput={(params) => <TextField {...params} variant="standard" helperText="Associated to Community" fullWidth label="Floor Name"/>}
                  /> 
              </Grid>
              <Grid item xs={12} md={3}>
              <Autocomplete
                  isOptionEqualToValue={(option, value) => option?._id === value?._id}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option._id}>
                        {option.label}
                      </li>
                    );
                  }}
                  options={allRooms}
                  noOptionsText="Select Floor Name"
                  onChange={(e, v) => {
                    setRoom(v);
                    setSeat(null);
                    setAllSeat([]);
                  }}
                  value={room}
                  renderInput={(params) => <TextField {...params} variant="standard" helperText="Associated to Room" fullWidth label="Room Number"/>}
                  /> 
              </Grid>
              <Grid item xs={12} md={3}>
              <Autocomplete
                  isOptionEqualToValue={(option, value) => option?._id === value?._id}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option._id}>
                        {option.label}
                      </li>
                    );
                  }}
                  options={allSeats}
                  onChange={(e, v) => {
                    setSeat(v);
                  }}
                  value={seat}
                  renderInput={(params) => <TextField {...params} variant="standard" helperText="Optional"  fullWidth label="Seat No / Bed No."/>}
                  /> 
              </Grid>
              <Grid item xs={12}>
              <center> <Button variant="contained" endIcon={<MdSend/>} disabled={deactMoveBtn} onClick={handleMove} sx={{marginTop:1, color:"#fff"}}>{residentId ? "Transfer Resident" : "Move to Resident"} </Button></center>   
                  <div style={{margin:"20px"}}>
                      {err.length !==0  && <Alert severity="error">
                        <AlertTitle>Can't move to Resident.</AlertTitle>
                        The list of error are given below — <strong>Check it out and Resolve it first!</strong>
                        </Alert> }  
                    <ul style={{listStyleType: "decimal"}}>
                    {err && err.map((e,i)=><li key={i} style={{margin:"20px", color:"#dc00ff"}}>{e?.message} </li>)}
                    </ul>
                  </div>
              </Grid>
              <br/>
            </Grid>
            <ScheduleLeave residentId={residentId}/>
  
            <MySnackbar ref={snackRef} />
    </main>
 
 )
}



function ScheduleLeave({residentId}) {
  const [expandLeave, setEL]=useState(false)
  const [leaveId, setLeaveId] = useState("");
  const [leaveStartDate, setLSD] = useState("");
  const [leaveStartTime, setLST] = useState("");
  const [leaveReason, setLeaveReason] = useState(null);
  const [leaveRemark, setLR]=useState("");
  const [leaveEndDate, setLED]= useState("")
  const [leaveEndTime, setLET] = useState("");
  const [allLeave, setRow] = useState([]);
  const [openLeave, setOpenLeave] = useState(false)
  const [allReasons] = useState([{label:"Casino"},{label:"Health Concerns"},{label:"Home"},{label:"Hospitalization"},{label:"Personal Leave"},{label:"Rehabilitation"},{label:"Vacation"},{label:"Other"}])
  const snackRef = useRef();
  async function getSchLeave(){
    let res = await prospectService.getScheduleLeave(`api/v1/residence/leave/getLeave/getAll/${residentId}`);
    if(res.variant ==="success"){
     setRow(res.data)
    }
   }

  useEffect(() => {
    if(residentId){
     getSchLeave()
    }
   }, [residentId])
   const handleEdit =(d)=>{
    setOpenLeave(true);
    setEL(true)
    setLeaveId(d ? d._id : "");
    setLSD(d ? d.leaveStartDate : "");
    setLST(d ? d.leaveStartTime: "");
    setLeaveReason(d ? d.leaveReason : null);
    setLR(d ? d.leaveRemark : "");
    setLED(d ? d.leaveEndDate : "");
    setLET(d ? d.leaveEndTime: "");
   }
   const deleteLeave = async (id)=>{
    let y = confirm(`Are you sure to Delete this leave ?`)
    if (y) {
      let res = await prospectService.deleteLeave(`/api/v1/residence/leave/addLeave/deleteOne/${id}`);
      console.log(res)
    }
  }
  const columns = [
    {
      field: 'leaveStartDateT',
      headerName: 'Leave Start Date',
      type: 'text',
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: 'leaveStartTime',
      headerName: 'Start Time',
      width: 100,
      editable: false,
      sortable: false,
    },
    {
      field: 'leaveReasonLabel',
      headerName: 'Leave Reason',
      type: 'text',
      width: 160,
      editable: false,
      sortable: false,
      },
    {
      field: 'leaveEndDateT',
      headerName: 'End Date',
      type: 'text',
      width: 130,
      editable: false,
      sortable: false,
    },
    {
      field: 'leaveEndTime',
      headerName: 'End Time',
      type: 'text',
      width: 100,
      editable: false,
      sortable: false,
    },
    {
      field: 'leaveRemark',
      headerName: 'Leave Remark',
      type: 'text',
      width: 250,
      editable: false,
      sortable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      sortable: false,
      renderCell: props=> <ButtonGroup variant="text" aria-label="text button group"> <Button onClick={()=>handleEdit(props?.row)} variant="text">Edit</Button> <Button color="secondary" onClick={()=>deleteLeave(props?.row?._id)} variant="text">Delete</Button></ButtonGroup>,
    },
  ];
 
  const handleLeave = async ()=>{
    try {
      let res = await prospectService.scheduleLeave(`api/v1/residence/leave/addLeave/${leaveId}`, {prospectId:residentId,leaveStartDate,leaveStartTime,leaveReason,leaveRemark,leaveEndDate,leaveEndTime});
      if(res?.variant === "success"){
        setOpenLeave(false)
        setEL(true);
        snackRef.current.handleSnack(res);
        getSchLeave()
      }else {
        alert(res.message)
        snackRef.current.handleSnack(res); 
        }      
    } catch (error) {
     console.log(error);
     setOpenLeave(false)
     snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.res.data.message, variant:"error"});
    } 
  }

  return (
    <Accordion expanded={expandLeave} onChange={()=>setEL(!expandLeave)} disableGutters>
    <AccordionSummary
      expandIcon={<FcExpand />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Schedule Leave</Typography>
      <span style={{flexGrow:0.95}}/>
      <Button onClick={()=>handleEdit()} variant="text">Add New Leave</Button>
    </AccordionSummary>
    <AccordionDetails>
    <Typography color="secondary" style={{fontFamily: 'Courgette'}} gutterBottom variant='h6' align='center'>All Schedule Leave</Typography>
  <DataGrid
    rows={allLeave}
    columns={columns}
    getRowId={(row) => row._id}
    initialState={{
      pagination: {
        paginationModel: {
          pageSize: 10,
        },
      },
    }}
    pageSizeOptions={[10]}
  />
  <Dialog maxWidth="md" onClose={()=>setOpenLeave(false)} open={openLeave}>
  <DialogContent>
  <Grid container spacing={2}>
      <Grid item xs={12} md={2}>
      <TextField focused  type='date' value={leaveStartDate} onChange={(e)=>setLSD(e.target.value)} fullWidth label="On Leave Start Date" variant="standard" />
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField focused  type='time' value={leaveStartTime} onChange={(e)=>setLST(e.target.value)} fullWidth label="On Leave Start Time" variant="standard" />
      </Grid>
      <Grid item xs={12} md={4}>
      <Autocomplete
          isOptionEqualToValue={(option, value) => option?.label === value?.label}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.label}>
                {option.label}
              </li>
            );
          }}
          options={allReasons}
          noOptionsText="Select Reason For Leave"
          onChange={(e, v) => {
            setLeaveReason(v);
          }}
          value={leaveReason}
          renderInput={(params) => <TextField {...params} variant="standard" fullWidth label="Reason for Leave"/>}
          /> 
      </Grid>
       
      <Grid item xs={12} md={2}>
      <TextField focused  type='date' value={leaveEndDate} onChange={(e)=>setLED(e.target.value)} fullWidth label="On Leave End Date" variant="standard" />
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField focused  type='time' value={leaveEndTime} onChange={(e)=>setLET(e.target.value)} fullWidth label="On Leave End Time" variant="standard" />
      </Grid>
      <Grid item xs={12}>
      <TextField  value={leaveRemark} onChange={(e)=>setLR(e.target.value)} fullWidth label="Leave Remarks" placeholder='Type Notes (If Any)' variant="standard" />
      </Grid>
      <Grid item xs={12}>
      <center> <Button variant="contained" endIcon={<MdSend/>} onClick={handleLeave} sx={{marginTop:1, color:"#fff"}}>{leaveId ? "Update Leave" : "Schedule Leave"} </Button></center> 
      </Grid>
     </Grid>
  </DialogContent>
  </Dialog>
     
    </AccordionDetails>
    <MySnackbar ref={snackRef} />
  </Accordion>
  )
}


export default SettingsTab