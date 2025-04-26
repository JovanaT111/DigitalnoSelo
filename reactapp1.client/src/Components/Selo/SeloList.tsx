/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AddSeloModal from './AddSeloModal';
import DeleteSeloModal from './DeleteSeloModal';

interface Selo {
    id: number;
    naziv: string;
    countryId: number;
    cityId: number;
    ovlasceniKorisnik: string;
}

interface DodajSelo {
    naziv: string;
    countryId: number;
    cityId: number;
    ovlasceniKorisnik: string;
}

const SeloList: React.FC = () => {
    const [sela, setSela] = useState<Selo[]>([]);
    const [open, setOpen] = useState(false);
    const [newSelo, setNewSelo] = useState<DodajSelo>({
        naziv: '',
        countryId: 0,
        cityId: 0,
        ovlasceniKorisnik: '',
    });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteSeloId, setDeleteSeloId] = useState<number | null>(null);
    const [countries, setCountries] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [allCities, setAllCities] = useState<any[]>([]);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get('https://localhost:7249/api/Selo/countries')
            .then(response => setCountries(response.data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {
        axios.get('https://localhost:7249/api/Selo/cities')
            .then(response => setAllCities(response.data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {
        if (newSelo.countryId) {
            axios.get(`https://localhost:7249/api/Selo/countries/${newSelo.countryId}/cities`)
                .then(response => setCities(response.data))
                .catch(error => console.error('Error fetching cities:', error));
        }
    }, [newSelo.countryId]);

    useEffect(() => {
        axios.get('https://localhost:7249/api/selo')
            .then(response => setSela(response.data))
            .catch(error => console.error('There was an error fetching the villages!', error));
    }, []);

    // Fetch the country and city names based on their IDs
    const getCountryName = (countryId: number) => {
        const country = countries.find(c => c.id === countryId);
        return country ? country.name : 'N/A';
    };

    const getCityName = (cityId: number) => {
        const city = allCities.find(c => c.id === cityId);
        return city ? city.name : 'N/A';
    };

    const deleteSelo = () => {
        if (deleteSeloId !== null) {
            axios.delete(`https://localhost:7249/api/selo/${deleteSeloId}`)
                .then(() => {
                    setSela(sela.filter(selo => selo.id !== deleteSeloId));
                    setOpenDeleteModal(false);
                    setDeleteSeloId(null);
                })
                .catch(error => {
                    console.error('There was an error deleting the village!', error);
                    setOpenDeleteModal(false);
                });
        }
    };

    const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedCountryId = event.target.value as number;
        setNewSelo({ ...newSelo, countryId: selectedCountryId, cityId: 0 });
    };

    const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedCityId = event.target.value as number;
        setNewSelo({ ...newSelo, cityId: selectedCityId });
    };

    const handleAddSelo = () => {
        axios.post(`https://localhost:7249/api/selo`, newSelo)
            .then(response => {
                setSela([...sela, response.data]);
                setOpen(false);
                setNewSelo({ naziv: '', countryId: 0, cityId: 0, ovlasceniKorisnik: '' });
            })
            .catch(error => console.error('There was an error adding the village!', error));
    };

    const openDeleteConfirmation = (id: number) => {
        setDeleteSeloId(id);
        setOpenDeleteModal(true);
    };

    const closeDeleteConfirmation = () => {
        setOpenDeleteModal(false);
        setDeleteSeloId(null);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Lista Sela</Typography>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Dodaj novo selo</Button>
            </Box>

            {/* Render modals */}
            <AddSeloModal
                open={open}
                onClose={() => setOpen(false)}
                countries={countries}
                cities={cities}
                newSelo={newSelo}
                handleChange={(e) => setNewSelo({ ...newSelo, [e.target.name]: e.target.value })}
                handleCountryChange={handleCountryChange}
                handleCityChange={handleCityChange}
                handleAddSelo={handleAddSelo}
            />

            <DeleteSeloModal
                open={openDeleteModal}
                onClose={closeDeleteConfirmation}
                onDelete={deleteSelo}
            />

            {/* Village Table */}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Naslov</strong></TableCell>
                            <TableCell><strong>Drzava</strong></TableCell>
                            <TableCell><strong>Lokacija</strong></TableCell>
                            <TableCell><strong>Ovlasceni Korisnik</strong></TableCell>
                            <TableCell align="center"><strong>Akcija</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sela.map(selo => (
                            <TableRow key={selo.id}>
                                <TableCell>{selo.naziv}</TableCell>
                                <TableCell>{getCountryName(selo.countryId)}</TableCell>
                                <TableCell>{getCityName(selo.cityId)}</TableCell>
                                <TableCell>{selo.ovlasceniKorisnik}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => navigate(`/view/${selo.id}`)} title="View">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => navigate(`/edit/${selo.id}`)} title="Edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => openDeleteConfirmation(selo.id)} title="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SeloList;
