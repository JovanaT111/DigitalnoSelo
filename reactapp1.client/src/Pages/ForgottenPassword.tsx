/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Container, Box, Avatar, Typography, TextField, Button, CssBaseline, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ForgottenPassword() {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address.");
        } else {
            setError("");
            axios
                .post('https://localhost:7249/api/usermanager/forgot-password', { email })
                .then((response) => {
                    if (response.status === 200) {
                        setMessage("A password reset link has been sent to your email.");

                        // Redirect after 3 seconds
                        setTimeout(() => {
                            navigate('/login');
                        }, 3000);
                    } else {
                        setError("Error sending reset link. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError("Error sending reset link. Please try again.");
                });
        }
    };

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}></Avatar>
                <Typography variant="h5">Forgotten Password</Typography>
                <Box sx={{ mt: 1 }}>
                    <form onSubmit={handlePasswordReset}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            autoFocus
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            type="submit"
                        >
                            Reset Password
                        </Button>
                    </form>

                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Link to="/login">Back to Login</Link>
                        </Grid>
                    </Grid>

                    {message && <p className="message" style={{ color: 'green' }}>{message}</p>}
                    {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                </Box>
            </Box>
        </Container>
    );
}

export default ForgottenPassword;
