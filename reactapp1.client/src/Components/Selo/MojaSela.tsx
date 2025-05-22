import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../HeroSection/HeroSection';
import { UserContext } from '../AuthorizeView';

interface Selo {
    id: number;
    naziv: string;
    countryId: number;
    cityId: number;
    ovlasceniKorisnik: string;
}

const SeloList: React.FC = () => {
    const [sela, setSela] = useState<Selo[]>([]);
    const [countries, setCountries] = useState<any[]>([]);
    const [allCities, setAllCities] = useState<any[]>([]);
    const user: any = useContext(UserContext);
    const email = user?.email;

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
        console.log(email);
        axios.post('https://localhost:7249/api/selo/byEmail', { email: email })
            .then(response => setSela(response.data))
            .catch(error => console.error('There was an error fetching the villages!', error));
    }, [email]);

    const getCountryName = (countryId: number) => {
        const country = countries.find(c => c.id === countryId);
        return country ? country.name : 'N/A';
    };

    const getCityName = (cityId: number) => {
        const city = allCities.find(c => c.id === cityId);
        return city ? city.name : 'N/A';
    };

    return (
        <div >
            <HeroSection imageSrc="../src/assets/selo.jpg" />
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3} mt={5}>
                <Box flex={1} />
                <Typography variant="h4" align="center" sx={{ flex: 1 }}>
                    Digitalna Sela
                </Typography>
            </Box>

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