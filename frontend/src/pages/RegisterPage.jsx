import * as React from 'react';
import {useContext} from 'react'
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Stack} from '@mui/material'

import AuthContext from '../context/AuthContext';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { LineAxisOutlined } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function RegisterPage() {

    const navigate = useNavigate()
    let {loginUser} = useContext(AuthContext)

    const [hostForm, setHostForm] = useState(false)
    const [tenantForm, setTenantForm] = useState(false)

    const [image, setImage] = useState(null);

    const imageInput = document.querySelector('#image')

    // const createImage = () => {
    //     let myimage = imageInput.files[0]
    //     console.log(myimage)
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let myimage = imageInput.files[0]
        console.log('My Image is: ', myimage)

        const data = new FormData(event.currentTarget);
        let formData = new FormData()
        formData.append('file', myimage)

        console.log({
        username: data.get('Username'),
        email: data.get('email'),
        password: data.get('password'),
        image: data.get('image'),
        location: data.get('Location'),
        about: data.get('About'),
        neighbourhood: data.get('Neighbourhood'),
        host_verifications: data.get('Host Verifications')
        });
        console.log('Image Up ', data.get('image'))
        // data.delete('image')
        // data.append('image', image)

        if (!(hostForm || tenantForm)) {
            return
        }

        // if (hostForm && tenantForm) {

        // }
        if (tenantForm && !hostForm) {
            console.log('Image ', data.get('image'))
            console.log('Type of Image', typeof data.get('image'))
            let response = await fetch(`http://127.0.0.1:8000/auth/create_tenant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:   JSON.stringify({'username': data.get('Username'), 
                        'password': data.get('password'),
                        'email': data.get('email'),
                        'image': data.get('image'),
                })
            })
            let mydata = await response.json()
            console.log(mydata.user)
            
            

            let newImage = await fetch(`http://127.0.0.1:8000/auth/upload_users_image/${mydata.user.id}`, {
                method: 'POST',
                body: formData
            }).then(res => res.json().catch(error => {console.error(error)}))
            console.log(response.status)
            if (response.status === 201 || response.status === 200) {
                navigate('/')
            }
            
        }   
        else if (hostForm) {
            let response = await fetch(`http://127.0.0.1:8000/auth/create_host_awaiting`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': data.get('Username'),
                    'password': data.get('password'),
                    'email': data.get('email'),
                    // 'file': data.get('image'),
                    'host_location': data.get('Location'),
                    'host_about': data.get('About'),
                    'host_neighbourhood': data.get('Neighbourhood'),
                    'host_verifications': data.get('Host Verifications'),
                    'tenant': tenantForm,
                })
            })
            let d = await response.json()
            let newImage = await fetch(`http://127.0.0.1:8000/auth/upload_host_awaiting_image/${d.host_awaiting_id}`, {
                method: 'POST',
                body: formData
            }).then(res => res.json().catch(error => {console.error(error)}))
            console.log(response.status)
            if (response.status === 201 || response.status === 200) {
                navigate('/')
            }
        }

    };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="Username"
                  label="Username"
                  name="Username"
                  autoComplete="given-username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" component="label">
                        Upload
                        <form method='POST' enctype='multipart/form-data'>

                            <input hidden accept="image/*" multiple type="file" id="image" name="image" label="image"/>
                        </form>
                    </Button>
                </Stack>
              </Grid>
              <Grid item xs={6} onChange={() => setTenantForm(!tenantForm)}>
                <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Tenant<Checkbox/></Typography>
              </Grid>
              <Grid item xs={6} onChange={() => setHostForm(!hostForm)}>
                <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Host<Checkbox/></Typography>
              </Grid>
              
              {hostForm ? <> 
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Location"
                  label="Location"
                  type="Location"
                  id="location"
                  autoComplete="new-location"
                />
              </Grid>
              </> : <></>
              }
              {hostForm ? <> 
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="About"
                  label="About"
                  type="About"
                  id="about"
                  autoComplete="new-about"
                />
              </Grid>
              </> : <></>
              }
              {hostForm ? <> 
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Neighbourhood"
                  label="Neighbourhood"
                  type="Neighbourhood"
                  id="neighbourhood"
                  autoComplete="new-neighbourhood"
                />
              </Grid>
              </> : <></>
              }
              {hostForm ? <> 
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Host Verifications"
                  label="Host Verifications"
                  type="Host Verifications"
                  id="host verifications"
                  autoComplete="new-host verifications"
                />
              </Grid>
              </> : <></>
              }
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}