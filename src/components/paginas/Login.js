import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'

import { Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import { AccountCircle, LockRounded } from '@material-ui/icons'
import axios from 'axios'
import Cookies from 'universal-cookie'

import Luv from '../../assets/img/luv.jpg'
import logo from '../../assets/img/logo.jpg'

const API_LOGIN = 'http://3.133.175.35/pruebas/login.php';
const cookie = new Cookies();

function Login(props){

    const {  setlogin, history } = props
    
    console.log(props);

    const [usuario, setusuario] = useState('');
    const [password, setpassword] = useState('');

    const Validacion = async () => {

        let validate = new FormData()
        validate.append("usuario", usuario)
        validate.append("password", password)
        const rest = await axios.post(API_LOGIN, validate)
        if (rest.data) {
            if(window.confirm("Hola Listo Para Trabajar ")){
                const respuesta = rest.data;
                cookie.set("usuario", respuesta, { path:"/"});
                history.push("/")
                setlogin(true)
            }
        } else {
            alert("no hay usuario con esos datos")
        }
    }


    return (
        <>
            <Grid container style={{ minHeight: '100vh' }} >
                <Grid item xs={12} sm={6}>
                    <img src={Luv} alt="Fondo"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Grid>
                <Grid container item xs={12} sm={6}
                    alignItems="center"
                    direction="column"
                    justify="space-between"
                    style={{ padding: 10 }} >
                    <div />
                    <div style={{
                        display: 'flex', flexDirection: 'column',
                        maxWidth: 400,
                        minWidth: 300,
                    }} >
                        <Grid container justify='center'>
                            <img src={logo} alt="Logo"
                                width={200} />
                        </Grid>
                        <TextField label="Usuario" margin="normal" InputProps={{ startAdornment: <InputAdornment><AccountCircle /></InputAdornment> }}
                            onChange={(e) => setusuario(e.target.value)}
                        />
                        <TextField label="Password" margin="normal" type="password" InputProps={{ startAdornment: <InputAdornment><LockRounded /></InputAdornment> }}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <div style={{ height: 20 }} />
                           <Button color="primary" variant="contained" onClick={()=>Validacion()}>
                             Log in
                           </Button> 
                    </div>
                    <div/>
                </Grid>

            </Grid>

        </>
    );
}

export default withRouter(Login);