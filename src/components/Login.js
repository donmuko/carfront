import React, { useState } from "react";
import { SERVER_URL } from "../constants";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Carlist from "./Carlist";

function Login() {
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (Event) => {
        setUser({...user, [Event.target.name] : Event.target.value});
    }

    const login = () => {
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get('Authorization');
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
            else {
                setOpen(true);
            }
        })
        .catch(err => console.error(err))
    }
    if (isAuthenticated) {
        return <Carlist />;
    }
    else {
        return(            
            <div>
                <Stack spacing={2} alignItems={'center'} mt={2}>
                    <TextField
                        name="username"
                        label="Username"
                        onChange={handleChange} />
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        onChange={handleChange} />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={login}>
                            Login
                        </Button>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={() => setOpen(false)}
                        message="Login failed: Check your username and password"
                    />
                </Stack>                
            </div>
        );
    }    
}

export default Login;