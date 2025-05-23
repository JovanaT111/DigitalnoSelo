import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

interface DodajKorisnikaProps {
    open: boolean;
    onClose: () => void;
    onAddUser: (newUser: ApplicationUser) => void;
    onUpdateUser?: (updatedUser: ApplicationUser) => void;
    initialData?: ApplicationUser | null;
    villages: string[];
}

export interface ApplicationUser {
    id: string;
    firstName: string;
    lastName: string,
    email: string;
    villages: string[];
}

const DodajKorisnika: React.FC<DodajKorisnikaProps> = ({ open, onClose, onAddUser, onUpdateUser, initialData, villages }) => {
    const [newUser, setNewUser] = useState<ApplicationUser>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        villages: [],
    });
    const [users, setUsers] = useState<ApplicationUser[]>([]);

    useEffect(() => {
        if (initialData) {
            setNewUser(initialData);
        } else {
            setNewUser({ id: '', firstName: '', lastName: '', email: '', villages: [] });
        }
    }, [initialData, open]);

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
            toast.success('Korisnik je uspješno dodat!');
        } catch (err) {
            console.error('Failed to add user:', err);
        }
    };

    const handleSave = async () => {
        try {
            if (initialData && onUpdateUser) {
                await axios.put(`https://localhost:7249/api/usermanager/${newUser.id}`, newUser);
                onUpdateUser(newUser);
                toast.success('Korisnik je uspješno ažuriran!');
            } else {
                await axios.post('https://localhost:7249/api/usermanager/register', newUser);
                onAddUser(newUser);
                toast.success('Korisnik je uspješno dodat!');
            }
            onClose();
            setNewUser({ id: '', firstName: '', lastName: '', email: '', villages: [] });
        } catch (err) {
            console.error('Failed to save user:', err);
            toast.error('Greška prilikom spremanja korisnika.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? 'Uredi korisnika' : 'Dodaj korisnika'}</DialogTitle>
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
                        onChange={handleVillageChange}
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
                <Button onClick={onClose} color="primary">Otkaži</Button>
                <Button onClick={handleSave} color="primary">
                    {initialData ? 'Spremi' : 'Dodaj'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DodajKorisnika;