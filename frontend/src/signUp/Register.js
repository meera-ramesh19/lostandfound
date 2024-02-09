// import React, { useEffect, useState } from 'react';
// import useAuthHooks from '../Hooks/Auth/useAuthHooks';
// import { useNavigate, Link } from 'react-router-dom';
// import './SignUp.css';
// import axios from 'axios';

// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   InputAdornment,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Input,
//   FormHelperText,
//   CssBaseline,
//   Box,
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// import {
//   EmailCheck,
//   PasswordCheck,
//   UserNameCheck,
// } from '../Hooks/Validation/Index';

// function Signup() {
//   const [
//     email,
//     setEmail,
//     emailError,
//     setEmailOnFocus,
//     setEmailOnBlur,
//     emailButtonState,
//   ] = EmailCheck();

//   const [
//     password,
//     setPassword,
//     passwordError,
//     setPasswordOnFocus,
//     setPasswordOnBlur,
//     confirmPassword,
//     setConfirmPassword,
//     passwordButtonState,
//   ] = PasswordCheck();

//   const [
//     username,
//     setUserName,
//     usernameError,
//     setUsernameOnFocus,
//     setUsernameOnBlur,
//     usernameButtonState,
//   ] = UserNameCheck();

//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   async function handleOnSubmit(e) {
//     e.preventDefault();
//     try {
//       let result = await axios.post('/admin/users', {
//         email,
//         password,
//         username,
//       });
//       if (!result) {
//         alert('Sign up was unsuccessfully, Please use a different email.');
//       } else {
//         alert('Congrats! Welcome to the Wavform Family!!');
//         navigate('/login');
//       }
//     } catch (e) {
//       return alert(e);
//     }
//   }

//   return (
//     <div className='signUp'>
//       <Container className='container' component='main' maxWidth='xs'>
//         <CssBaseline />
//         <div className='title'>
//           <Typography variant='h5'>Sign Up Here!!</Typography>
//         </div>
//         <form onSubmit={handleOnSubmit} className='form'>
//           <div className='formField'>
//             <TextField
//               fullWidth
//               id='email'
//               label='Email'
//               variant='outlined'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onFocus={() => setEmailOnFocus(true)}
//               onBlur={() => setEmailOnBlur(true)}
//               helperText={
//                 emailError && (
//                   <span className='errorContainer'>{emailError}</span>
//                 )
//               }
//             />
//           </div>
//           <div className='formField'>
//             <TextField
//               fullWidth
//               id='password'
//               label='Password'
//               variant='outlined'
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onFocus={() => setPasswordOnFocus(true)}
//               onBlur={() => setPasswordOnBlur(true)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position='end'>
//                     <IconButton
//                       onClick={() => setShowPassword(!showPassword)}
//                       edge='end'
//                     >
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               helperText={
//                 passwordError && (
//                   <span className='errorContainer'>{passwordError}</span>
//                 )
//               }
//             />
//           </div>
//           <div className='formField'>
//             <TextField
//               fullWidth
//               id='confirmPassword'
//               label='Confirm Password'
//               variant='outlined'
//               type='password'
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               helperText={
//                 passwordError && (
//                   <span className='errorContainer'>{passwordError}</span>
//                 )
//               }
//             />
//           </div>
//           <div className='formField'>
//             <TextField
//               fullWidth
//               id='username'
//               label='Username'
//               variant='outlined'
//               value={username}
//               onChange={(e) => setUserName(e.target.value)}
//               onFocus={() => setUsernameOnFocus(true)}
//               onBlur={() => setUsernameOnBlur(true)}
//               helperText={
//                 usernameError && (
//                   <span className='errorContainer'>{usernameError}</span>
//                 )
//               }
//             />
//           </div>
//           <div className='formField'>
//             <Button
//               fullWidth
//               variant='contained'
//               color='primary'
//               type='submit'
//               className='formButton'
//               disabled={
//                 emailButtonState || usernameButtonState || passwordButtonState
//               }
//             >
//               Submit
//             </Button>
//           </div>
//         </form>
//         <div className='loginCta'>
//           <Typography variant='body2'>
//             Already Signed up? <Link to='/login'>click here</Link>
//           </Typography>
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default Signup;
