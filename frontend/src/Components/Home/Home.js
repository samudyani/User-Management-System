import React from 'react';
import './Home.css'; 
import Nav from '../Nav/Nav';


function Home() {
  
  return (
    <div>
      <Nav/>
        <div className="home-container">
      <h1 >Welcome to the Tuition Class Management System</h1>
      <br></br>
      <br></br>
      <h2>
        This app is designed to help tuition centers manage student data, track progress, and streamline operations.
      </h2>

      <div className="home-benefits">
        <div className="benefit-box">
          <h3>View All Students</h3>
          <p>
            Easily access and view the complete list of enrolled students. Quickly manage their profiles and track their progress.
          </p>
        </div>
        <div className="benefit-box">
          <h3>Access Parents' Contact</h3>
          <p>
            View parents' contact information alongside student data. Stay connected with parents for updates or emergencies.
          </p>
        </div>
        <div className="benefit-box">
          <h3>Download User Reports</h3>
          <p>
            Download students within the system according to the preferences
          </p>
        </div>
      </div>
    </div>
    </div>
      );
}

export default Home;
