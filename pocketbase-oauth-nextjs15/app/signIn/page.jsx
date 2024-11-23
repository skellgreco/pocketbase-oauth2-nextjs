/* 

Thanks for Using my Template!
Please make sure to read README in order to set this up according to your needs
Made by Skell <3

Consider giving a star :)

*/

'use client';

// Imports
// In this page, we are initializing pocketbase connection directly and not using the external handler
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

// Edit these according to your code
const pocketBaseURL = "http://127.0.0.1:8090" // Adjust to your pocketbase URL
const redirectUrl = 'http://localhost:3000/api/oauth2-redirect'; // Adjust to your API URL. This Current URL works with this template

// Default Export
export default function SignInPage() {

    // Create a State Variable as we are going to dynamically fetch authoriaziation methods
    const [authProviders, setAuthProviders] = useState([]);

    // Make a Pocketbase Connection
    const pb = new PocketBase(pocketBaseURL);

    // Effect used to fetch the providers you've set up in your Pocketbase Dashboard
    useEffect(() => {
        async function fetchAuthProviders() {
            try {
                // Fetch available OAuth2 providers
                const authMethods = await pb.collection('users').listAuthMethods();
                setAuthProviders(authMethods.authProviders || []);
            } catch (error) {
                console.error('Error loading OAuth2 providers:', error);
            }
        }

        fetchAuthProviders();
    }, []); // Run only once on component mount

    // Handler for Login Button
    // Pocketbase requires the provider that is being used to login in the API call. Therefore, we save the provider clicked by the user as a cookie to use later on
    const handleProviderClick = (provider) => {
        const cookieValue = JSON.stringify(provider);
        document.cookie = `provider=${encodeURIComponent(cookieValue)}; Path=/; Max-Age=3600; Secure;`;
    };
    
    // HTML Configuration
    return (
        <div>
            
            <div className='authenticationGrid' >
            <div className='text-3xl text-center font-semibold text-slate-200'>Sign In</div>
            <hr className='mt-5 mb-5 mx-10 mb-12'></hr>
                {authProviders.length > 0 ? (
                    authProviders.map((provider) => (
                        <center key={provider.name}>
                            <a
                            href={`${provider.authUrl}${redirectUrl}`}
                            onClick={() => handleProviderClick(provider)}
                        >
                        <div className='authenticationItem'>
                            
                                <img src='https://cdn.worldvectorlogo.com/logos/discord-6.svg' className='discord-logo'></img>
                                <p className='hidden ml-5 sm:inline'>Login with Discord</p>
                            
                                </div>
                            </a>
                        
                        </center>
                    ))
                ) : (
                    <div className='authenticationItem text-center'>Loading...</div>
                )}
            
            </div>
        </div>
    );
}
