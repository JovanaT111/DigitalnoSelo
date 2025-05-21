import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Input, Typography, Grid, Container, Snackbar } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddNews: React.FC<{ seloId: number, onClose: () => void, onNewsAdded: () => void }> = ({ seloId, onClose, onNewsAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [document, setDocument] = useState<File | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Novost.Naslov', title);
        formData.append('Novost.Opis', description);
        if (photo) formData.append('Slika', photo);
        if (document) formData.append('Dokument', document);

        try {
            const response = await axios.post(`https://localhost:7249/api/Novosti/${seloId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log('Novost dodana:', response.data);
            setOpenSnackbar(true);
            setTimeout(() => {
                onNewsAdded();
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Greška prilikom dodavanja novosti', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ padding: '2rem', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Dodaj Novost
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Naslov"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            modules={{
                                toolbar: [
                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['bold', 'italic', 'underline'],
                                    ['link'],
                                    [{ 'align': [] }],
                                    ['image'],
                                    ['blockquote', 'code-block']
                                ],
                            }}
                            placeholder="Unesite opis novosti..."
                            style={{
                                height: '200px',  
                                width: '100%',
                                overflowY: 'auto',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Input
                            type="file"
                            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
                            inputProps={{ accept: 'image/*' }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Input
                            type="file"
                            onChange={(e) => setDocument(e.target.files ? e.target.files[0] : null)}
                            inputProps={{ accept: '.pdf,.doc,.docx' }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Dodaj Novost
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}  // Auto hide after 2 seconds
                onClose={() => setOpenSnackbar(false)}
                message="Novost uspješno dodana!"
            />
        </Container>
    );
};

export default AddNews;
