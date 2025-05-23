import React, { ChangeEvent, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    Divider,
    InputAdornment,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface VillageProfileProps {
    editMode: boolean;
}

const SeloProfil: React.FC<VillageProfileProps> = ({
    editMode
}) => {
    const [selectedSelo, setSelectedSelo] = useState<any | null>(null);
    const [images, setImages] = useState<any[]>([]);
    const { id: routeSeloId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        axios.get(`https://localhost:7249/api/Selo/${routeSeloId}`)
            .then(response => setSelectedSelo(response.data))
            .catch(error => console.error('Error fetching selo:', error));

        axios.get(`https://localhost:7249/api/Selo/${routeSeloId}/images`)
            .then(response => setImages(response.data))
            .catch(error => console.error('Error fetching selo images:', error));
    }, [routeSeloId]);

    if (!selectedSelo) {
        return <Typography>Loading...</Typography>;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedSelo((prev: any) => ({
            ...prev,
            [name]: value,
            socialLinks: {
                ...prev?.socialLinks,
                [name]: name === 'facebook' || name === 'instagram' ? value : prev?.socialLinks?.[name]
            }
        }));
    };

    const handleProfileUpdate = async () => {
        try {
            if (editMode) {
                await axios.put(`https://localhost:7249/api/Selo/${routeSeloId}`, selectedSelo);
                toast.success('Selo je uspješno izmjenjeno!');
            } else {
                window.history.back();
            }
        } catch (error) {
            console.error('Greška prilikom ažuriranja profila sela:', error);
            alert('Došlo je do greške prilikom ažuriranja profila.');
        }
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files?.[0];
        if (file && routeSeloId !== undefined && routeSeloId !== null) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('seloId', routeSeloId.toString());

            try {
                await axios.post(`https://localhost:7249/api/Selo/selo/${routeSeloId}/uploadLogo`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert(`${type} uploaded successfully!`);
                window.location.reload();
            } catch (error) {
                console.error(`Error uploading ${type}:`, error);
                alert(`Failed to upload ${type}.`);
            }
        }
    };

    const handleFilesUpload = async (e: ChangeEvent<HTMLInputElement>, type: string) => {
        const files = e.target.files;
        if (files) {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('files', file); // Append the file
            });

            try {
                await axios.post(
                    `https://localhost:7249/api/Selo/selo/${routeSeloId}/uploadPhotos`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                alert(`${type} uploaded successfully!`);
                window.location.reload();
            } catch (error) {
                console.error(`Error uploading ${type}:`, error);
                alert(`Failed to upload ${type}.`);
            }
        }
    };

    const handleDocumentsUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('files', file);
            });

            try {
                await axios.post(
                    `https://localhost:7249/api/Selo/selo/${routeSeloId}/uploadDocuments`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                alert('Documents uploaded successfully!');
                window.location.reload();
            } catch (error) {
                console.error('Error uploading documents:', error);
                alert('Failed to upload documents.');
            }
        }
    };

    const handleDeleteImage = async (imgToDelete: { id: any; }) => {
        try {
            await axios.delete(`https://localhost:7249/api/selo/${routeSeloId}/images/${imgToDelete.id}`);
            setImages(prev => prev.filter(img => img !== imgToDelete));
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete image", error);
        }
    };


    return (
        <Box sx={{ width: '100vw', minHeight: '100vh', padding: 10, margin: 0 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', flex: 1 }}>
                    {editMode ? 'Izmijeni profil sela' : 'Profil sela'}
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to={`/news/${routeSeloId}`}
                    sx={{ ml: 2 }}
                >
                    Idi na novosti
                </Button>
            </Box>

            <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Opšte informacije" />
                <Tab label="Lokacija" />
                <Tab label="Poljoprivreda & Turizam" />
                <Tab label="Društvene mreže" />
                <Tab label="Stepen razvijenosti" />
                <Tab label="Logo" />
                <Tab label="Slike" />
                <Tab label="Dokumenti" />
            </Tabs>

            {tabIndex === 0 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Opšte informacije</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Naziv"
                                            name="naziv"
                                            value={selectedSelo?.naziv || ''}
                                            disabled={!editMode}
                                            onChange={handleChange}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Ovlašćeni korisnik"
                                            name="ovlasceniKorisnik"
                                            value={selectedSelo?.ovlasceniKorisnik || ''}
                                            disabled
                                            onChange={handleChange}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={<span>Površina (km<sup>2</sup>)</span>}
                                            name="povrsina"
                                            value={selectedSelo?.povrsina || ''}
                                            disabled={!editMode}
                                            onChange={handleChange}
                                            margin="normal"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Broj stanovnika"
                                            name="brojStanovnika"
                                            value={selectedSelo?.brojStanovnika || ''}
                                            disabled={!editMode}
                                            onChange={handleChange}
                                            margin="normal"
                                            type="number"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Box textAlign="center">
                                        <Typography variant="subtitle1" gutterBottom>
                                            QR kod
                                        </Typography>
                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=https://localhost:5173/view/${routeSeloId}&size=150x150`} alt="QR" />                                        
                                    </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {tabIndex === 1 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Lokacija</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Latitude"
                                    name="lat"
                                    value={selectedSelo?.lat || ''}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    margin="normal"
                                    type="number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">°</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Longitude"
                                    name="lng"
                                    value={selectedSelo?.lng || ''}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    margin="normal"
                                    type="number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">°</InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {tabIndex === 2 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Poljoprivreda & Turizam</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Specijalizacija poljoprivrede"
                                    name="specijalizacijaPoljoprivrednogSektora"
                                    value={selectedSelo?.specijalizacijaPoljoprivrednogSektora || ''}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Potencijal agroturizma"
                                    name="potencijalAgroturizma"
                                    value={selectedSelo?.potencijalAgroturizma || ''}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {tabIndex === 3 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Društvene mreže</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Facebook link"
                                    name="facebookLink"
                                    value={selectedSelo?.facebookLink || ''}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Instagram link"
                                    name="facebookLink"
                                    value={selectedSelo?.instagramLink || ''}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {tabIndex === 4 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Stepen razvijenosti</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Zaostajanje"
                                    name="zaostajanje"
                                    value={selectedSelo?.zaostajanje || ''}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Razvoj/Napredovanje"
                                    name="razvojNapredovanje"
                                    value={selectedSelo?.razvojNapredovanje || ''}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Prosperitet"
                                    name="prosperitet"
                                    value={selectedSelo?.prosperitet || ''}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {tabIndex === 5 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Logo</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {images.length > 0 && images.some(img => img.isLogo) ? (
                                    <img
                                        src={`https://localhost:7249/uploads/${images.find(img => img.isLogo)?.path.split('/').pop()}`}
                                        alt="Logo"
                                        width={200}
                                    />
                                ) : (
                                    <Typography variant="body2" color="textSecondary">No logo available</Typography>
                                )}

                                {editMode && !images.some(img => img.isLogo) && (
                                    <Button variant="contained" component="label">
                                        Upload Logo
                                        <input type="file" hidden onChange={(e) => handleFileUpload(e, 'Logo')} />
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {tabIndex === 6 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Slike</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {editMode && (
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{ mb: 2 }}
                                        disabled={images.filter(img => !img.isLogo && !img.isFile).length >= 5}
                                    >
                                        Upload Photos
                                        <input type="file" hidden multiple onChange={(e) => handleFilesUpload(e, 'photos')} />
                                    </Button>
                                )}

                                <Grid container spacing={2}>
                                    {images
                                        .filter(img => !img.isLogo && !img.isFile)
                                        .map((img, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index} sx={{ position: 'relative' }}>
                                                {editMode && (
                                                    <Button
                                                        onClick={() => handleDeleteImage(img)}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 8,
                                                            right: 8,
                                                            minWidth: 'unset',
                                                            padding: '4px',
                                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                                            zIndex: 1,
                                                        }}
                                                    >
                                                        ❌
                                                    </Button>
                                                )}
                                                <Box
                                                    component="img"
                                                    src={`https://localhost:7249/uploads/${img.path.split('/').pop()}`}
                                                    alt={`Selo Photo ${index + 1}`}
                                                    sx={{
                                                        width: '100%',
                                                        height: 200,
                                                        objectFit: 'cover',
                                                        borderRadius: 2,
                                                    }}
                                                />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {tabIndex === 7 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Dokumenti</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {editMode && (
                                    <Button variant="contained" component="label" disabled={images
                                        .filter((doc) => doc.isFile).length >= 5}>
                                        Upload Document
                                        <input type="file" hidden multiple onChange={(e) => handleDocumentsUpload(e)} />
                                    </Button>
                                )}

                                <List>
                                    {images
                                        .filter((doc) => doc.isFile)
                                        .map((doc, index) => {
                                            const fileName = doc.path.split(/[/\\]/).pop();
                                            const fileUrl = `https://localhost:7249/uploads/documents/${fileName}`;
                                            return (
                                                <ListItem key={index} divider>
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                component="a"
                                                                href={fileUrl}
                                                                download={doc.name}
                                                                sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer' }}
                                                            >
                                                                {fileName}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Button
                                                        variant="outlined"
                                                        component="a"
                                                        href={fileUrl}
                                                        download={doc.name}
                                                    >
                                                        Download
                                                    </Button>
                                                </ListItem>
                                            );
                                        })}
                                </List>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleProfileUpdate}>
                    {editMode ? 'Sačuvaj' : 'Zatvori'}
                </Button>
                {editMode && (
                    <Button
                        variant="outlined"
                        onClick={() => {
                            navigate(-1);
                        }}
                        sx={{ ml: 2 }}
                    >
                        Nazad
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default SeloProfil;
