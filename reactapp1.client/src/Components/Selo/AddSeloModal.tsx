/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, TextField, FormControl, InputLabel, MenuItem, Select, DialogActions } from '@mui/material';
import { DodajSelo } from './SeloList';
import axios from 'axios';

interface AddSeloModalProps {
    open: boolean;
    onClose: () => void;
    countries: any[];
    cities: any[];
    newSelo: DodajSelo;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCountryChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    handleCityChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    handleAddSelo: () => void;
}

const AddSeloModal: React.FC<AddSeloModalProps> = ({
    open,
    onClose,
    countries,
    cities,
    newSelo,
    handleChange,
    handleCountryChange,
    handleCityChange,
    handleAddSelo
}) => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Fetch users from the API
        axios.get('https://localhost:7249/api/usermanager')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-selo-modal"
            aria-describedby="add-selo-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4
            }}>
                <Typography variant="h6" gutterBottom>Dodaj novo selo</Typography>
                <TextField
                    fullWidth
                    label="Naslov"
                    name="naziv"
                    value={newSelo.naziv}
                    onChange={handleChange}
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Država</InputLabel>
                    <Select
                        value={newSelo.country}
                        name="country"
                        onChange={handleCountryChange}
                    >
                        {countries.map(country => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Lokacija</InputLabel>
                    <Select
                        value={newSelo.city}
                        name="city"
                        onChange={handleCityChange}
                    >
                        {cities.map(city => (
                            <MenuItem key={city.id} value={city.id}>
                                {city.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Dropdown for "Ovlasceni Korisnik" */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Ovlašćeni Korisnik</InputLabel>
                    <Select
                        value={newSelo.ovlasceniKorisnik}
                        name="ovlasceniKorisnik"
                        onChange={handleChange}
                    >
                        {users.map(user => (
                            <MenuItem key={user.id} value={user.email}>
                                {user.email}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Otkaži
                    </Button>
                    <Button onClick={handleAddSelo} color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
            </Box>
        </Modal>
    );
};

export default AddSeloModal;