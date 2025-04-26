import React from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

interface DeleteSeloModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteSeloModal: React.FC<DeleteSeloModalProps> = ({ open, onClose, onDelete }) => (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="delete-selo-modal"
        aria-describedby="delete-selo-modal-description"
    >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
        }}>
            <Typography variant="h6" gutterBottom>Da li ste sigurni da želite da obrišete ovo selo?</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="error" onClick={onDelete}>
                    Obriši
                </Button>
                <Button variant="outlined" color="primary" onClick={onClose}>
                    Otkazi
                </Button>
            </Box>
        </Box>
    </Modal>
);

export default DeleteSeloModal;
