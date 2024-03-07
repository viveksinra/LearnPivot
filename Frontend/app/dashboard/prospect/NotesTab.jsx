'use client';
import React,{useState,forwardRef,useImperativeHandle,useEffect,useRef} from 'react'
import {Grid, AppBar,Toolbar,Box,Typography,TextField, Button,Tooltip,ButtonGroup,InputAdornment,CircularProgress} from '@mui/material/';
import {FaUserPlus,FaRegEdit } from "react-icons/fa";
import {FiFileMinus,FiCheck } from "react-icons/fi";
import {FcFullTrash } from "react-icons/fc";
import {BsTable } from "react-icons/bs";
import {ToggleFab} from "./page"
import NoResult from "@/app/Components/NoResult/NoResult";
import { DataGrid } from '@mui/x-data-grid';
import { prospectService } from "../../services";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";


function NotesTab({prospectId}) {
  const [viewTabular,toggleView] = useState(true);
  const [noteId, setNoteId] = useState("")
  const entryRef = useRef();
  return (
    <main style={{marginTop:20}}> 
      {viewTabular ? <SearchTask prospectId={prospectId}  handleEdit={(id)=>{toggleView(false); setNoteId(id)}} />  : <EntryNotes setNoteId={e=>setNoteId(e)} noteId={noteId} prospectId={prospectId}  ref={entryRef}/>}
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0,background:"#d6f9f7"}}>
      <Toolbar variant="dense">
        <span style={{flexGrow:0.2}}/>
        {!viewTabular &&  <Button variant="contained" onClick={()=>entryRef.current.handleClear()} startIcon={<FiFileMinus />} size='small' color="info" >
            Clear
          </Button> }
        <span style={{flexGrow:0.3}}/>
        <Tooltip arrow title={viewTabular ? "Add Contact" : "Show All"}>
        <ToggleFab onClick={()=>toggleView(!viewTabular)} color="secondary" size="medium">
        {viewTabular ?   <FaUserPlus style={{fontSize:24}}/> : <BsTable style={{fontSize:24}}/>}
        </ToggleFab>
        </Tooltip>
          <span style={{flexGrow:0.3}}/>
          {!viewTabular && <Button variant="contained" onClick={() => entryRef.current.handleSubmit()}  startIcon={<FiCheck />} size='small' color="success" >
            {noteId ? "Update" : "Save"}
          </Button>}
      </Toolbar>         
      </AppBar>
       </main>
  )
}



function SearchTask({prospectId, handleEdit}) {
  const [rows, setRow] = useState([]);
  const snackRef = useRef();
  const [loading, setLoading] = useState(false);
  async function fetchAllData() {
    setLoading(true)
    let response = await prospectService.getNote(prospectId, "");
    if(response.variant === "success"){
      setRow(response?.data)
      setLoading(false)
    }else {console.log(response);setLoading(false)}
  }
  useEffect(() => { 
    fetchAllData()
  }, []);
  const handleDelete = async (id)=>{
    let y = confirm("Do you want to delete this note permanently ?")
    if(y){
      let response = await prospectService.deleteLeave(`api/v1/enquiry/note/addNote/deleteOne/${id}`);
      if(response.variant==="success"){
        snackRef.current.handleSnack(response);
        fetchAllData()
      }
    }
  }
const columns = [
  {
    field: 'date',
    headerName: 'Create Date',
    type: 'text',
    width: 150,
    editable: false,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 600,
    editable: false,
  },
  {
    field: 'lastModified',
    headerName: 'Last Modified',
    type: 'text',
    width: 150,
    editable: false,
    },
  
  {
    field: 'action',
    headerName: 'Action',
    width: 180,
    sortable: false,
    renderCell: props=> <ButtonGroup variant="text" aria-label="text button group">
    <Button startIcon={<FcFullTrash/>} color="error" onClick={()=>handleDelete(props?.row?._id)} variant="text">Delete</Button>
    <Button endIcon={<FaRegEdit/>} onClick={()=>handleEdit(props?.row?._id)} variant="text">Edit</Button>
  </ButtonGroup> ,
  },
];
  return (
    <main>
      <Box sx={{background:"#fff",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius:"10px", width: '100%' }}>
      <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>All Notes</Typography>
      {loading ? <div className="center"><CircularProgress size={30}/> </div> : loading === false && rows.length === 0 ? <NoResult label="No Notes Available."/> : <DataGrid
        rows={rows}
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
      />} 
    </Box>
    <MySnackbar ref={snackRef} />
    </main>
  )
}





const EntryNotes = forwardRef((props, ref) => {
  const snackRef = useRef();
  // const [noteId, setId]= useState(props.noteId)
  const [notes, setNotes] = useState("")
  const handleClear = ()=>{
    setNotes("")
    props.setNoteId("")
  }
  useEffect(() => {
    async function getData() {
      try {
        let res = await prospectService.getNote(props.prospectId, props.noteId);
       if(res.variant === "success"){
        setNotes(res.data.notes);
        props.setNoteId(res.data._id)
         snackRef.current.handleSnack(res);
       }else snackRef.current.handleSnack(res);            
      } catch (error) {
       console.log(error);
       snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.res.data.message, variant:"error"});
      } 
    }
    if(props.noteId){getData()}
    
  }, [props.noteId])
  
  useImperativeHandle(ref, () => ({
      handleSubmit: async () => {
         try {
          let notesData = { prospectId:props.prospectId, notes };
          let response = await prospectService.saveNote(props.noteId, notesData);
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
 
return (
<main style={{backgroundColor:"#fff",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius:8,marginBottom:2, padding:"10px"}}>
<Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>Add New Notes</Typography>
  <Grid container spacing={2}>
  <Grid item xs={12} md={12}>
  <TextField label="Notes / Remarks" value={notes} onChange={e=>setNotes(e.target.value)} minRows={6} multiline placeholder='Type Notes (if any)' fullWidth variant="outlined" />   
  </Grid>
  </Grid>
 <MySnackbar ref={snackRef} />
</main>
)
});




export default NotesTab