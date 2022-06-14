// import "./login.css";
import { TextField, Button, Alert, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from "../../context/auth";
import { useState } from "react";
import { useNavigate } from "react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFBF57',
    overflowY: 'hidden'
  },

  sign: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: '24px',
    
  },

  text: {
    fontFamily: 'Raleway',
    color: 'rgba(0, 0, 0, 0.49)',
    textAlign: 'center',
    paddingTop: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  texts: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  test: {
    fontFamily: 'Raleway',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: '14px',
lineHeight: '16px',
color: '#212121'
  },
  spa: {
    textDecoration: 'none',
    color: '#FFBF57'
  }
}));
export default function LoginPage(props) {

  const classes = useStyles();
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState(false)
  const { login } = useAuth()

  const navigate = useNavigate()



  const submit = async function (e) {
    setError('')
    if (data.username  && data.password) {
      setLoading(true);
      await login(data)
        .then(() => {
          navigate('/user/dashboard')
        })
        .catch(e => {
          setError(e.message)
        }).finally(()=>{
           setLoading(false)
        })
    } else {
      setError('input All fields')
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  const showPassword = (e)=>{
    console.log('password change---> ',password)
    setPassword(!password)
  }


  return (
    <Grid container sx={{ minHeight: '100vh' }} className={classes.root}>
    <Grid  sx={{px:{xs:3,md:9}, py:1, bgcolor:'#FFFFFF'}} item container  alignContent="center" xs={12}  md={6} >
      <Grid item >
    <Typography variant="h4" className={classes.sign} sx={{my:1}} textAlign="center">
           Log In
         </Typography>
   
   
         {error && (
                 <Alert severity="error">
                   {error}
                 </Alert>
               )}
   
   
         
           <TextField
             id="filled-full-width"
             label="Username"
             name="username"
             onChange={handleChange}
             fullWidth
             margin="normal"
             variant="filled"
           />
            
           <TextField
             id="filled-full-width standard-adornment-password"
             label="Password"
             name="password"
             onChange={handleChange}
             fullWidth
             type={ password ? 'text' : 'password' }
             autoComplete="current-password"
             margin="normal"
             variant="filled"
             InputProps={{
             endAdornment:
               <InputAdornment position="end">
                <Button onClick={showPassword}> Show </Button>
               </InputAdornment>,
           }}
           /> 

          
           
           <Typography variant="h6" className={classes.texts}><Link style={{ textDecoration:'none' }} to='/resetpassword'><span className={classes.spa}>Forgotten Password</span></Link></Typography>
      </Grid>
      <Grid container
             justifyContent="space-evenly"
             alignItems="center" item xs={12} sx={{ mt: 5, }} spacing={4}>
             {loading ? <div className="text-center"> <CircularProgress color="primary" /></div> : <Button onClick={submit} type="submit" variant="contained" style={{ textDecoration: 'none', borderRadius: '16px', width: '250px', height: '60px', backgroundColor: '#FFBF57' }}>Sign In</Button>}
             <Typography variant="h6" className={classes.texts} ><Link style={{ textDecoration:'none' }} to='/'><span className={classes.spa}>Sign Up</span></Link></Typography>
           </Grid>
           
          
   </Grid>
         
   
   <Grid sx={{px:9, py:5, bgcolor:' rgba(243, 243, 243, 0.47)', display:{xs:'none', md:'flex'}}} item container  alignContent="center" justifyContent="space-evenly" direction="column" xs={12}  md={6} >
     
         <Grid container alignItems="center" spacing={2}>
           <Grid item shrink>
           <img src="https://res.cloudinary.com/dremo/image/upload/v1642174583/undraw_smartwatch_re_59lx_2_guakkf.png" alt=""/>
           </Grid>
           <Grid item grow>
             <Typography variant="h5" className={classes.texts}> Start and track your tasks</Typography>
             <Typography variant="h6" className={classes.test}> Start and track your tasks</Typography>
           </Grid>
         </Grid>
   
   
    
         <Grid container alignItems="center" spacing={4} sx={{py:3}}>
           <Grid item shrink>
           <img src="https://res.cloudinary.com/dremo/image/upload/v1642498047/undraw_result_re_uj08_2_oowyaa.png" alt=""/>
           </Grid>
           <Grid item grow>
             <Typography variant="h5" className={classes.texts}>Set timely goals and track their<br /> performance</Typography>
             <Typography variant="h6" className={classes.test}>Set timely goals and track their<br /> performance</Typography>
           </Grid>
         </Grid>
   
         <Grid container alignItems="center" spacing={4} sx={{py:1}}>
           <Grid item shrink>
           <img src="https://res.cloudinary.com/dremo/image/upload/v1642497913/undraw_building_blocks_re_rwls_2_auumtj.png" alt=""/>
           </Grid>
           <Grid item grow>
             <Typography variant="h5" className={classes.texts}>Monitor your team performance from a single<br /> dashboard</Typography>
             <Typography variant="h6" className={classes.test}>Monitor your team performance from a single<br /> dashboard</Typography>
           </Grid>
         </Grid>
   
   
   </Grid>
       
       </Grid>
  )
}