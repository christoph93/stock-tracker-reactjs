import React from 'react';
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
                This is the Home page. You are not logged in.             
            </div>
        );
    } else {
        return (
            <div>                
                This is the Home page. You are logged in.
            </div>
        );
    }

}

export default Home;
