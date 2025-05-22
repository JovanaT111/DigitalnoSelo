import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    CircularProgress, Grid, Typography, Box, Alert, Button
} from '@mui/material';
import DodajKorisnika, { ApplicationUser } from './DodajKorisnika';
import HeroSection from '../HeroSection/HeroSection';

const Korisnici: React.FC = () => {
    const [users, setUsers] = useState<ApplicationUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7249/api/usermanager');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddUser = (newUser: ApplicationUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box padding={3} mt={10}>
        <HeroSection imageSrc="../src/assets/korisnici.jpg" />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                            <Box flex={1} />
                            <Typography variant="h4" align="center" sx={{ flex: 1 }}>
                                Korisnici
                            </Typography>
                            <Box flex={1} display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                    Dodaj korisnika
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Ime i prezime</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <DodajKorisnika
                open={open}
                onClose={handleClose}
                onAddUser={handleAddUser} villages={[]} />
        </Box>
    );
};

export default Korisnici;