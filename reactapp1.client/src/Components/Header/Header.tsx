import React, { useContext } from 'react';
import { AuthorizedUser } from '../AuthorizeView';
import LogoutLink from '../LogoutLink';
import { UserContext } from '../AuthorizeView'; 

const Header: React.FC = () => {
    const user: any = useContext(UserContext); 
    const role = user?.role;
    return (
        <header className="header">
            <div className="logo">
                <img src="../src/assets/logo_digitalno_selo.png" alt="Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="#hero">Početna</a></li>
                    {role === 'Admin' && (
                        <li><a href="/users">Korisnici</a></li>
                    )}
                    {role === 'Admin' && (
                        <li><a href="/villages">Sela</a></li>
                    )}
                    <span><LogoutLink>Odjava, <AuthorizedUser value="email" /></LogoutLink></span>
                </ul>
            </nav>
        </header>
    );
};

export default Header;