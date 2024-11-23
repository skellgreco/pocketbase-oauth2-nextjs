/* 

Thanks for Using my Template!
Please make sure to read README in order to set this up according to your needs
Made by Skell <3

Consider giving a star :)

*/

////////////////////////////////////////////////

/* 

This file handles the signOut logic

*/

// Server Component
'use server';

// Imports
import { cookies } from 'next/headers'

// Default Function
export async function SignOut() {
    // Initialize Cookies
    const cookieStore = await cookies()

    // Deletes authData cookie
    cookieStore.delete('authData')
}