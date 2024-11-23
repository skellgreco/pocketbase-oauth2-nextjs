/* 

Thanks for Using my Template!
Please make sure to read README in order to set this up according to your needs
Made by Skell <3

Consider giving a star :)

*/

////////////////////////////////////////////////

/* 

This file initializes pocketbase connection so it can be used across the whole codespace whenever pocketbase data is needed

*/

// Imports
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';

// Initialize Pocketbase connection
const pb = new PocketBase('http://127.0.0.1:8090'); // Change the URL to your Pocketbase URL
pb.autoCancellation(false); // Disables autoCancellation as it creates errors

// Default Function
export const initializePocketBase = () => {
    // Initialize Cookies
    const cookieStore = cookies();

    // Get the saved authData saved as a cookie after logging in
    const authData = cookieStore.get('authData');

    // If there is authData initialize a Signed in Connection
    if (authData && authData.value) {
        try {
            const parsedAuthData = JSON.parse(decodeURIComponent(authData.value));
            pb.authStore.save(parsedAuthData.token, parsedAuthData.model);
            console.log('PocketBase Auth Initialized:', pb.authStore.isValid);
        
        // If not just throw an error
        } catch (error) {
            console.error('Failed to parse authData:', error);
        }
    } else {
        console.warn('No valid authData found.');
    }


    return pb;
};
