/* 

Thanks for Using my Template!
Please make sure to read README in order to set this up according to your needs
Made by Skell <3

Consider giving a star :)

*/

////////////////////////////////////////////////

/* 

This file handles saving login data to the database and afterwards redirecting the user where they need to go

*/

// Imports
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Edit these according to your code
const pocketBaseURL = "http://127.0.0.1:8090" // Adjust to your pocketbase URL
const redirectUrl = 'http://localhost:3000/api/oauth2-redirect'; // Adjust to your API URL. This Current URL works with this template

// Initialize PocketBase Conntection
const pb = new PocketBase(pocketBaseURL);

// Default GET Function
export async function GET(req) {
    // Initialize Cookies
    const cookieStore = cookies();

    // Capture URL parameters
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state');
    const code = searchParams.get('code');

    // Return an error if the URL is wrong
    if (!state || !code) {
        return new Response('Missing state or code parameters.', { status: 400 });
    }

    // Get provider data from the cookies
    const providerCookie = cookieStore.get('provider');
    if (!providerCookie) {
        return new Response('Provider data not found in cookies.', { status: 400 });
    }
    
    // JSON Parse the provider Cookie
    const provider = JSON.parse(decodeURIComponent(providerCookie.value));

    // Check if the provider cookie matches the current state
    if (provider.state !== state) {
        return new Response("State parameters don't match.", { status: 400 });
    }

    try {
        // Authenticate with PocketBase
        const authData = await pb.collection('users').authWithOAuth2Code(
            provider.name,
            code,
            provider.codeVerifier,
            redirectUrl,
            {
                emailVisibility: false,
            }
        );

        // Set "authData" as a cookie
        const response = new Response(null, { status: 302 });

        // Redirects the user to dashboard
        response.headers.set('Location', '/dashboard');
        response.headers.append(
            'Set-Cookie',
            `authData=${encodeURIComponent(JSON.stringify(authData))}; Path=/; Max-Age=3600; HttpOnly; Secure;`
        );

        return response;

        // Else return an error
    } catch (err) {
        console.error('Authentication error:', err);
        return new Response('Failed to authenticate.', { status: 500 });
    }
}

