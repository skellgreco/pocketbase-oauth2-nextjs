/* 

Thanks for Using my Template!
Please make sure to read README in order to set this up according to your needs
Made by Skell <3

Consider giving a star :)

*/


// Imports
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Import for signOut Logic
import { SignOut } from '../(actions)/signOut'

// Import to Initialize a pocketbase connection
import { initializePocketBase } from '../(actions)/pocketbaseIntialize';

// Main Function
export default async function ProjectsMainPage() {

    // Intialize Cookies
    const cookieStore = await cookies()

    // Check if a cookie with login data exists. If not return "empty"
    const savedAuthData = cookieStore.get('authData')?.value || 'empty';
    
    // Initialize PocketBase Connection from imported function
    const pb = initializePocketBase();

    // Intialize the parsed data later in the code, to avoid issues if there is no cookie available
    let parsedAuthData


    // Redirect the User to the signIn page if there is no cookie available
    if (savedAuthData == 'empty') {
        redirect('/signIn')
    
    // Else parse the saved authenticationn data to extract information later in this page
    } else {
        parsedAuthData = JSON.parse(savedAuthData);
        
        // Page HTML Logic. Simply shows your saved authData. Adjust to your needs
        return (
            <>  
            <center>
                <button onClick={SignOut} className='dashboard-btn mt-10'>Sign Out</button>
            </center>
            
            <br></br><br></br><br></br>
            <div>Data: <br></br>{savedAuthData}</div> 


            </>
        )
    }
    
}