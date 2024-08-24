import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { LoginPageStyle, NavBarComponentStyle } from '../../PageStyle/pageStyleVariable';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoutFolder from '../../../src/asset/Menusvg/main/logout.png'
import '../NavBar/NavMenu.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';
import axios from 'axios';
import { BaseURL } from '../Masters/masterPagefunctions';



export default function LogOutBox() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const darkModeState = useSelector((state) => state.darkMode)
  const handleLogout = async () => {
    try {
      const access_token = sessionStorage.getItem('token');
      
      // Check if access token exists
      if (!access_token) {
        throw new Error('No access token found');
      }
  
      // Send a POST request with the Bearer token in the headers
      const response = await axios.post(
        `https://userhub.${BaseURL}/api/v1/logout`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // Redirect to home or login page on successful logout
      navigate('/'); 
    } catch (err) {
      console.log("Failed to logout", err);
    }
  };
  

  const style = {
    position: 'absolute',  // Ensure the element is positioned absolutely
    top: '230px',            // Vertically center the element
    right: 0,
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: darkModeState.checkvalue ? dayTheme.masterListRowColor : darkTheme.masterListRowColor,
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };
 

  return (
    <div>
      <Button onClick={handleOpen}><AccountCircleIcon className='mx-3' style={{ color: NavBarComponentStyle.navBarUserColor, width: NavBarComponentStyle.NavBarSearchIconSize, height: NavBarComponentStyle.NavBarSearchIconSize }} /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>
          <Typography className='flex justify-center item-center' id="modal-modal-title" variant="h6" component="h2">
            <img src={logoutFolder} style={{ width: '65px' }} alt="" srcset="" />
          </Typography>
          <div className='text-center font-semibold' sx={{ mt: 2 }}>
            Are you Sure Want To Logout
          </div>
          <div>
            <button className='rounded-xl text-center py-1 my-1 font-semibold logOutbutton' style={{ width: '100%' }} onClick={()=>handleLogout()}>LogOut</button>

            <button className='rounded-xl text-center py-1 my-1 font-semibold logOutbutton' style={{ width: '100%' }} onClick={handleClose} >Cancel</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
