/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import AddNews from './AddNews';
import { useNavigate } from 'react-router-dom';

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
            <h2>Novosti</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
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
                                        objectFit: 'cover',
                                        marginBottom: '1rem',
                                    }}
                                />
                                <h3>{novost.naslov}</h3>
                                <p>
                                    {novost.opis.length > 150 ? `${novost.opis.substring(0, 150)}...` : novost.opis}
                                </p>
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
