import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

interface DodajKorisnikaProps {
    open: boolean;
    onClose: () => void;
    onAddUser: (newUser: ApplicationUser) => void;
    villages: string[]; // Assuming villages are passed as props
}

export interface ApplicationUser {
    id: string;
    firstName: string;
    lastName: string,
    email: string;
    villages: string[]; // Assign multiple villages to a user
}

const DodajKorisnika: React.FC<DodajKorisnikaProps> = ({ open, onClose, onAddUser, villages }) => {
    const [newUser, setNewUser] = useState<ApplicationUser>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        villages: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleVillageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            villages: event.target.value as string[],
        }));
    };

    const handleAddUser = async () => {
        try {
            
            await axios.post('https://localhost:7249/api/usermanager/register', newUser);
            onAddUser(newUser);
            setNewUser({ id: '', firstName: '', lastName: '', email: '', villages: [] }); 
            onClose(); 
        } catch (err) {
            console.error('Failed to add user:', err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Dodaj korisnika</DialogTitle>
            <DialogContent>
                <TextField
                    label="Ime"
                    name="firstName"
                    value={newUser.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Prezime"
                    name="lastName"
                    value={newUser.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={newUser.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Pridruzena Sela</InputLabel>
                    <Select
                        multiple
                        value={newUser.villages}
                        label="Pridružena Sela"
                    >
                        {villages.map((village) => (
                            <MenuItem key={village} value={village}>
                                {village}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Otkazi
                </Button>
                <Button onClick={handleAddUser} color="primary">
                    Dodaj
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DodajKorisnika;
