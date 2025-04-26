import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Box, Avatar, Typography, TextField, Button, CssBaseline, Grid } from "@mui/material";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberme, setRememberme] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            setError("");
            let loginurl = "";
            if (rememberme === true) loginurl = "/login?useCookies=true";
            else loginurl = "/login?useSessionCookies=true";

            fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((data) => {
                    if (data.ok) {
                        setError("Successful Login.");
                        window.location.href = '/';
                    } else {
                        setError("Error Logging In.");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError("Error Logging in.");
                });
        }
    };

    return (
        <Container maxWidth="xl" sx={{ p: 3, my: 5 }}>
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        alt="Phone"
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>

                        </Avatar>
                        <Typography variant="h5">Login</Typography>
                        <Box sx={{ mt: 1 }}>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />

                                <div>
                                    <input
                                        type="checkbox"
                                        id="rememberme"
                                        name="rememberme"
                                        checked={rememberme}
                                        onChange={handleChange}
                                    />
                                    <span>Remember Me</span>
                                </div>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </form>

                            <Grid container justifyContent={"flex-end"}>
                                <Grid item>
                                    <Link to="/forgotten-password">Zaboravili ste lozinku?</Link>
                                </Grid>
                            </Grid>

                            {error && <p className="error">{error}</p>}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;
