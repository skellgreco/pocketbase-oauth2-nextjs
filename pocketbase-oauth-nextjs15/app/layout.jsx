/* 

Thanks for Using my Template!
Please make sure to read README in order to set this up according to your needs
Made by Skell <3

Consider giving a star :)

*/

import "./globals.css";

export const metadata = {
  title: "Pocketbase OAuth2 Template",
  description: "Next.js template to work with Pocketbase Oauth2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
