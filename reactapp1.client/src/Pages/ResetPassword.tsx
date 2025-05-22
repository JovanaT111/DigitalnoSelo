import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Box, Avatar, Typography, TextField, Button, CssBaseline, Grid } from '@mui/material';

interface ResetPasswordRequest {
    email: string;
    resetCode: string;
    newPassword: string;
}

const ResetPassword: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [resetCode, setResetCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        console.log(location.search);
        const emailFromUrl = urlParams.get('email');
        const tokenFromUrl = urlParams.get('token');

        if (emailFromUrl && tokenFromUrl) {
            setEmail(emailFromUrl);
            setResetCode(tokenFromUrl);
        } else {
            setError('Invalid or expired reset link.');
        }
    }, [location.search]);

    const validateForm = (): boolean => {
        if (newPassword !== confirmPassword) {
            setError("Lozinke se ne slažu.");
            return false;
        }
        if (newPassword.length < 6) {
            setError("Lozinka mora imati najmanje 6 karaktera.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);

        const requestData: ResetPasswordRequest = {
            email,
            resetCode,
            newPassword,
        };

        try {
            const response = await fetch('https://localhost:7249/api/usermanager/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'Failed to reset password');
            } else {
                navigate('/login');
            }
        } catch (err) {
            setError('An error occurred while resetting the password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.light' }} />
                <Typography variant="h5">Reset Your Password</Typography>
                <Box sx={{ mt: 1 }}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Adresa"
                            name="email"
                            value={email}
                            disabled
                            autoFocus
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            id="newPassword"
                            label="Nova lozinka"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            id="confirmPassword"
                            label="Potvrdi lozinku"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={() => navigate('/login')}>Nazad na Login</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPassword;