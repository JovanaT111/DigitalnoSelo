import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { AuthorizedUser } from '../AuthorizeView';
import LogoutLink from '../LogoutLink';
import { UserContext } from '../AuthorizeView';
import { useNavigate } from 'react-router-dom';
import DodajKorisnika from '../Korisnici/DodajKorisnika.tsx';
import axios from 'axios';
const Header2: React.FC = () => {
    const user: any = useContext(UserContext);
    const role = user?.role;
    const navigate = useNavigate();

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(user);

    const villages: string[] = [];

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`https://localhost:7249/api/usermanager/by-email?email=${encodeURIComponent(user.email)}`);
                setEditingUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        if (user?.email) {
            fetchUser();
        }
    }, [user?.email]);

    function handleOpenEditModal() {
        setEditModalOpen(true);
    }

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleUpdateUser = (updatedUser: any) => {
        setEditModalOpen(false);
        setEditingUser(updatedUser);
    };

    const handleAddUser = (newUser: any) => {
        setEditModalOpen(false);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand onClick={() => navigate('/')} className="d-flex">
                        <img
                            src="../src/assets/logo_digitalno_selo.png"
                            alt="Logo"
                            style={{ height: '40px', objectFit: 'contain' }}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {role === 'Admin' && <Nav.Link style={{ fontWeight: 'bold' }} href="/users">Korisnici</Nav.Link>}
                            {role === 'Admin' && <Nav.Link style={{ fontWeight: 'bold' }} href="/villages">Sela</Nav.Link>}
                            {role === 'Admin' && <Nav.Link style={{ fontWeight: 'bold' }} href="/sifarnici">Administracija</Nav.Link>}
                            {role !== 'Admin' && <Nav.Link style={{ fontWeight: 'bold' }} href="/my-villages">Moja Sela</Nav.Link>}
                            <NavDropdown style={{ fontWeight: 'bold' }} title={<>Zdravo, <AuthorizedUser value="email" /></>} id="user-nav-dropdown" align="end">
                                <NavDropdown.Item as="button" onClick={handleOpenEditModal}>
                                    Profil
                                </NavDropdown.Item>
                                <NavDropdown.Item as="span">
                                    <LogoutLink>Odjava</LogoutLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <DodajKorisnika
                open={editModalOpen}
                onClose={handleCloseEditModal}
                onAddUser={handleAddUser}
                onUpdateUser={handleUpdateUser}
                initialData={editingUser}
                villages={villages}
            />
        </>
    );
};
export default Header2;
