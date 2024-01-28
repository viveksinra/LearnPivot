"use client";
import MainContext from '../Context/MainContext';
import { useState,Suspense,useContext } from "react";
import "./headerStyle.css";
import {Container,Box,CssBaseline, Hidden,AppBar,Toolbar, useScrollTrigger,SwipeableDrawer } from '@mui/material/';
import Link from 'next/link';
import { FcMenu,FcPhone } from 'react-icons/fc';
import MyDrawer from "../Drawer/MyDrawer";
import Loading from "../Loading/Loading";

const Header = ( { children,window }) => {
  const [openDrawer, setDrawer]=useState(false);
  const handleDrawer=()=>{
    setDrawer(!openDrawer)
  }
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Box sx={{ display:'flex', backgroundColor:"#fff"}}>
       <CssBaseline />
       <AppBar component="nav" elevation={0} sx={{backgroundColor:"#fff",maxHeight:"118px"}}>
   
         <Toolbar disableGutters>
        <div id={trigger ? "headerCompress" : "topHeader"}>
            <Container id="navContainer" >
              <Hidden mdUp> 
              <FcMenu style={{fontSize:25}} onClick={handleDrawer}/>
              <div style={{flexGrow:1}}/>
              </Hidden>
              <Link href="/">
                <img src="https://res.cloudinary.com/qualifier/image/upload/v1706185907/Logo/chelmsford-high-resolution-logo_vc9ewh.svg" alt="Chelmsford" id={trigger ? "OasisLogoComp" : "OasisLogo"} />
              </Link>
              <div style={{flexGrow:1}}/>
              <Hidden mdDown>
              <ul>
                <li id="about" ><Link href="/about">About us</Link>
                <div id="dropdownAbout" className='dropdownMenu'>
               <Link href="/about">Chelmsford Gateway</Link>
               <Link href="/about/gallery">Gallery</Link>
               <Link target='_blank' href="https://www.facebook.com/oasismanors">Our Facebook Page</Link>
               <Link href="/about/resources">Resources</Link>
               <Link href="/amenities">Amenities</Link>
                <Link href="/lifestyle/care">Care</Link>
                <Link href="/lifestyle/cuisine">Cuisine</Link>
                  <Link href="/lifestyle">Joy in Living</Link>
                <Link href="/lifestyle/events">Events</Link>
                </div>
                  </li>
      
                  <li><Link href="/contact">Contact</Link> </li>
              </ul> 
              </Hidden>
              {/* {state?.isAuthenticated ?  <Link href="/dashboard"><Button color="secondary" startIcon={<Avatar alt={state.name}  src={authService.getLoggedInUser()?.userImage ?? "https://res.cloudinary.com/oasismanors/image/upload/v1687519053/user_myqgmv.png"}/>}>Dashboard</Button> </Link> :  <Link href="/login"> <Button startIcon={<FaUserCircle />}>Login</Button></Link>  } */}
              </Container>    
              </div>
        </Toolbar>
      </AppBar>

       
   
    
    <Suspense fallback={<Loading />}>
    <SwipeableDrawer open={openDrawer} onClose={handleDrawer} onOpen={handleDrawer} variant="temporary" ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}> 
      <MyDrawer handleDrawer={()=>handleDrawer()}/>
    </SwipeableDrawer>
    </Suspense>
    <Box component="main" sx={{ marginTop:"60px",width:"100%" }}>
        <Toolbar disableGutters/>
        { children }
      </Box>
    </Box>
  )
}


export default Header