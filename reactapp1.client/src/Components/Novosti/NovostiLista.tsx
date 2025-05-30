﻿import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import AddNews from './AddNews';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../HeroSection/HeroSection';

interface Novost {
    id: number;
    naslov: string;
    opis: string;
}

const NovostiLista: React.FC = () => {
    const [news, setNews] = useState<Novost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { id: routeSeloId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const fetchNews = async () => {
        try {
            const response = await axios.get(`https://localhost:7249/api/Novosti/${routeSeloId}`);
            setNews(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to load news. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [routeSeloId]);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleNewsAdded = () => {
        fetchNews();
        handleCloseModal();
    };

    return (
        <section id="features" className="news">
            <HeroSection imageSrc="../src/assets/aktuelno.jpg" />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : news.length === 0 ? (
                <Box padding={3}>
                    <Typography variant="h4" mt={60} color="textSecondary">
                        Nema novosti za ovo selo.
                    </Typography>
                </Box>
            ) : (
                <div className="news-cards">
                    {news.map((novost) => (
                        <div
                            className="news-card"
                            key={novost.id}
                            onClick={() => navigate(`/new/${novost.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="news-card" key={novost.id}>
                                <img
                                    src={`https://localhost:7249${(novost as any).slikaUrl}`}
                                    alt={novost.naslov}
                                    style={{
                                        width: '100%',
                                        maxHeight: '300px',
                                        minHeight: '300px',
                                        objectFit: 'cover',
                                        marginBottom: '1rem',
                                    }}
                                />
                                <h3>{novost.naslov}</h3>
                                {novost.opis.length > 150 ? (
                                    <div>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: novost.opis.length > 150 ? `${novost.opis.substring(0, 150)}...` : novost.opis,
                                            }}
                                        />
                                        <Button onClick={() => navigate(`/new/${novost.id}`)} variant="text" color="primary">
                                            Pročitaj više
                                        </Button>
                                    </div>
                                ) : (
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: novost.opis.length > 150 ? `${novost.opis.substring(0, 150)}...` : novost.opis,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Dodaj Novost
            </Button>

            <Dialog open={modalOpen} onClose={handleCloseModal}>
                <DialogTitle>Dodaj Novost</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        <AddNews seloId={parseInt(routeSeloId)} onClose={handleCloseModal} onNewsAdded={handleNewsAdded} />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

export default NovostiLista;