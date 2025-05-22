import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { AuthorizedUser } from '../AuthorizeView';
import LogoutLink from '../LogoutLink';
import { UserContext } from '../AuthorizeView';

const Header2: React.FC = () => {
    const user: any = useContext(UserContext);
    const role = user?.role;
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home" className="d-flex">
                    <img
                        src="../src/assets/logo_digitalno_selo.png"
                        alt="Logo"
                        style={{ height: '40px', objectFit: 'contain' }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {role === 'Admin' && <Nav.Link href="/users">Korisnici</Nav.Link>}
                        {role === 'Admin' && <Nav.Link href="/villages">Sela</Nav.Link>}
                        <NavDropdown title={
                            <>
                                Zdravo, <AuthorizedUser value="email" />
                            </>
                        } id="user-nav-dropdown" align="end">
                            <NavDropdown.Item as="span">
                                <LogoutLink>Odjava</LogoutLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header2;
