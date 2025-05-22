import { Outlet } from 'react-router-dom';
import Header2 from './Components/Header/Header2';
import AuthorizeView from './Components/AuthorizeView';

const Layout = () => {
    return (
        <>
            <AuthorizeView>
                <Header2 />
                <Outlet />
            </AuthorizeView>
        </>
    );
};

export default Layout;