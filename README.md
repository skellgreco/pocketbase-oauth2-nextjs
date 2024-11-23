# 🌷 Pocketbase OAuth2 Template with Next.js
This is a template made by me in order to speed up Pocketbase OAuth implementation while working with Next.js. This is one of the simplest implementations in comparison with other tutorials I've seen here and there, so give it a try if you don't want to make one from scratch!

![image](https://github.com/user-attachments/assets/c04f0ef0-03aa-426f-a8f7-2e607cff7085)



## Get Started
### How to set it up
#### Step #1: Set up Pocketbase
The repository contains 2 folders. `pocketbase` folder contains the executable for Pocketbase. Open it with a terminal and run:
```
./pocketbase serve
```
That will start the Dashboard for your Pocketbase Instance. 

#### Step #2: Set up an authorization method
Open the link of your Pocketbase Dashboard (it should be `http://127.0.0.1:8090/`) and create an admin account. Then go Settings > Authentication > Auth Providers. Then set up an authentication method (please check their documentation). The website will automatically work with any authentication method. **HOWEVER**, if you are not using just Discord Authentication *(which is used on my template)* you have to adjust the HTML of the sign in page in order to display the correct logo on the sign in button

#### Step #4: Setup the Next.js Server Libraries
Perfect! Now Pocketbase is running and is ready to handle authorization data. Now open `pocketbase-oauth-nextjs15` folder. Proceed with running the following command in order to download needed libraries:
```
npm install
```

#### Step #5: Adjust the Code to your needs
In order to make the code work the way you want, you should edit a couple lines.
- In `app/signIn/page.jsx` edit `pocketBaseURL` and `redirectUrl` variables. There are comments on the code in order to understand what to put there.
- In `app/api/oauth2-redirect/route.js` edit `pocketBaseURL` and `redirectUrl` variables. There are comments on the code in order to understand what to put there.

#### Step #6: Start the webserver
Simply run `npm run dev` on your console. The webserver should be up and running on `http://127.0.0.1:8090/`

### How does it work
Once you start your webserver you will see a `Go to Dashboard` button on the main screen. For this tutorial, "Dashboard" serves as the page where the user wants to go and where their data is going to be needed.

![image](https://github.com/user-attachments/assets/53621826-f8cb-40d5-9b72-1cc739c23386)

The webserver will check for an authData cookie. If the cookie does not exist, you will get redirected to `/signIn` where you will see your available sign in methods 

![image](https://github.com/user-attachments/assets/f4aa28fb-f792-46ca-9453-85ecc6210ca0)

*Note: This code is written for Discord Authentication. Please edit your `signIn/page.jsx` in order to display the correct logo on the button in case any other method is being used*

Once you click, you will get redirected to a Discord OAuth2 Page. Once you authorize the app, you will get redirected to `/dashboard` where you will be able to see all your extracted authData in a JSON Form. You can use that data the way you like for your project. On the meantime, an API Call is going to be made and the webserver will save the new data on Pocketbase (if the user is new) and save an authorization cookie as well

**IMPORTANT**: The cookie for authData has a `maxLife` of 3600 seconds (1 hour). Once the cookie expires, the user has to login again. You can adjust this setting on the code!

### About the Code
Once you follow all the steps above your authorization system should work perfectly! In case something doesn't work the way you desire, you can edit the code according to your needs. There are comments everywhere to explain how things work. Feel free to create a pull request if you believe something could be improved

## That's it! 
### 🧡 Made by Skell!
