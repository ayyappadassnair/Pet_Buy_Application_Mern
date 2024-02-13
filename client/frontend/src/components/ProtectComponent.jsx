import React from 'react';
import { useCookies } from 'react-cookie';
import { Outlet} from 'react-router-dom';
import SignIn from '../pages/SignIn';

const ProtectComponent = () => {
    const [cookies] = useCookies(['access_token']);

    return (
        <>
            {cookies.access_token ? <Outlet /> :<SignIn/>}
        </>
    );
};

export default ProtectComponent;
