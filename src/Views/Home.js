import React from 'react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import Profile from '../components/Profile';
import { useAuth0 } from "@auth0/auth0-react";




function Home() {

    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    if (!isAuthenticated) {
        return (
            <div>
                <LoginButton />
            </div>
        );
    } else {
        return (
            <div>
                <LogoutButton />
                <Profile />
            </div>
        );
    }

}

export default Home;
