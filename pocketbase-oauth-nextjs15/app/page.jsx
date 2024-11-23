/* 

Thanks for Using my Template!
Please make sure to read README in order to set this up according to your needs
Made by Skell <3

Consider giving a star :)

*/


export default function Home() {
  return (
    <>
    <center>
      <h2 className='text-xl font-semibold mt-5 mx-5'>Pocketbase OAuth2 Template with Next.JS</h2>
    <hr className="mx-20 mt-5"></hr>
    <p className="mx-8 mt-10">This button is going to transfer the user to the Dashboard. The Login logic will be handled automatically.</p>
      <a href="/dashboard">
      <button className="dashboard-btn mt-5">Go to Dashboard</button>
      </a>
    </center>
    
    </>
  );
}
