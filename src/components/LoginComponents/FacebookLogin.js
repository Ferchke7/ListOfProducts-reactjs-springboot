import React from 'react';
import axios from 'axios';

const FacebookLogin = () => {
    const handleFacebookLogin = async () => {
        try {
            const response = await axios.get('/api/oauth2/authorization/facebook');
            // Handle the response, maybe redirect or display messages
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            <p>Login</p>
            {/*<button onClick={handleFacebookLogin}>Login with Facebook</button>*/}
        </div>
    );
};

export default FacebookLogin;