import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Novost {
    id: number;
    naslov: string;
    opis: string;  // HTML content from React-Quill
    slikaUrl?: string;
}

const NovostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [novost, setNovost] = useState<Novost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNovost = async () => {
            try {
                const response = await axios.get(`https://localhost:7249/api/Novosti/single/${id}`);
                setNovost(response.data);
            } catch (error) {
                setError('Failed to load the news article.');
            } finally {
                setLoading(false);
            }
        };
        fetchNovost();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error || !novost) return <p>{error || 'News not found.'}</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h1>{novost.naslov}</h1>
            {novost.slikaUrl && (
                <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                    <img
                        src={`https://localhost:7249${novost.slikaUrl}`}
                        alt={novost.naslov}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '500px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                        }}
                    />
                </div>
            )}

            <div
                dangerouslySetInnerHTML={{ __html: novost.opis }}
                style={{ fontSize: '16px', lineHeight: '1.5' }}
            />
        </div>
    );
};

export default NovostDetails;
