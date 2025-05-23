import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Paper,
    FormControl,
    InputLabel,
} from '@mui/material';
import HeroSection from '../Components/HeroSection/HeroSection';

interface Country {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
    countryId: number;
    countryName: string;
}

interface AddCity {
    id: number;
    name: string;
    countryId: number;
}

const DrzaveGradovi: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<'country' | 'city'>('country');
    const [newCountry, setNewCountry] = useState('');
    const [newCity, setNewCity] = useState({ name: '', countryId: 0 });

    const API_BASE = 'https://localhost:7249/api/selo';

    useEffect(() => {
        fetchCountries();
        fetchCities();
    }, []);

    const fetchCountries = async () => {
        const res = await axios.get<Country[]>(`${API_BASE}/countries`);
        setCountries(res.data);
    };

    const fetchCities = async () => {
        const res = await axios.get<City[]>(`${API_BASE}/cities`);
        setCities(res.data);
    };

    const openDialog = (type: 'country' | 'city') => {
        setDialogType(type);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setNewCountry('');
        setNewCity({ name: '', countryId: 0 });
    };

    const handleAdd = async () => {
        if (dialogType === 'country') {
            if (!newCountry.trim()) return;
            const res = await axios.post(`${API_BASE}/country`, { name: newCountry });
            setCountries([...countries, res.data]);
        } else {
            if (!newCity.name.trim() || newCity.countryId === 0) return;
            const res = await axios.post(`${API_BASE}/city`, {
                name: newCity.name,
                countriesId: newCity.countryId,
            });
            setCities([...cities, res.data]);
        }
        closeDialog();
    };

    return (
        <Box p={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={3}>
                <Box flex={1} display="flex" justifyContent="center">
                    <Typography variant="h4" align="center">Države i Gradovi</Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" onClick={() => openDialog('country')} sx={{ mr: 2 }}>
                        Dodaj Državu
                    </Button>
                    <Button variant="contained" color="success" onClick={() => openDialog('city')}>
                        Dodaj Grad
                    </Button>
                </Box>
            </Box>

            <Box display="flex" gap={4} flexWrap="wrap">
                {/* Tabela država */}
                <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                        Države
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Naziv</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {countries.map((country) => (
                                    <TableRow key={country.id}>
                                        <TableCell>{country.id}</TableCell>
                                        <TableCell>{country.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Tabela gradova */}
                <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                        Gradovi
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Naziv</TableCell>
                                    <TableCell>Država</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cities.map((city) => {
                                    const country = countries.find((c) => c.id === city.countryId);
                                    return (
                                        <TableRow key={city.id}>
                                            <TableCell>{city.id}</TableCell>
                                            <TableCell>{city.name}</TableCell>
                                            <TableCell>{city.countryName || 'Nepoznata'}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>

            {/* Modal */}
            <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle>{dialogType === 'country' ? 'Dodaj Državu' : 'Dodaj Grad'}</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    {dialogType === 'country' ? (
                        <TextField
                            label="Naziv države"
                            fullWidth
                            value={newCountry}
                            onChange={(e) => setNewCountry(e.target.value)}
                        />
                    ) : (
                        <>
                            <TextField
                                label="Naziv grada"
                                fullWidth
                                sx={{ mb: 3 }}
                                value={newCity.name}
                                onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="country-select-label">Država</InputLabel>
                                <Select
                                    labelId="country-select-label"
                                    value={newCity.countryId}
                                    label="Država"
                                    onChange={(e) => setNewCity({ ...newCity, countryId: Number(e.target.value) })}
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Otkaži</Button>
                    <Button onClick={handleAdd} variant="contained" color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DrzaveGradovi;
