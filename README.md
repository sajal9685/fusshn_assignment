# EchoPass - Concert Booking Application

[Live Demo](https://bookingapp-f6150.web.app/)

  | | Overview

EchoPass is a modern, user-friendly concert booking web application designed to help users easily browse, filter, and book tickets for their favorite concerts. Built with React, Vite, Firebase Realtime Database, and Firebase Authentication, EchoPass offers a seamless experience from discovering concerts to managing bookings.

  | | Features

-  Browse Concerts : View a list of upcoming concerts with detailed information including artist name, date, venue, and ticket availability.
-  Search & Filter : Filter concerts by artist or date to quickly find events of interest.
-  User Authentication : Secure sign up and sign in powered by Firebase Authentication.
-  Book Tickets : Users can book tickets directly through the platform.
-  User Profile : Registered users can view and manage their bookings in their profile.
-  Admin Controls : Admin users can add, update, and delete concerts and manage bookings.
-  Responsive Design : Mobile-friendly UI built with Tailwind CSS to provide a smooth experience on all devices.
-  Real-time Updates : Concert and booking data update in real-time using Firebase Realtime Database.

  | | Technologies Used

-  React  - Frontend UI library
-  Vite  - Fast frontend build tool
-  Firebase  
  - Authentication (Email/password)
  - Realtime Database for storing concerts, users, and bookings
  - Hosting for deployment
-  Tailwind CSS  - Utility-first CSS framework for styling
-  React Router  - Client-side routing

  | | Project Structure

/src
/components      # Reusable React components (Navbar, Footer, ConcertDetails, etc.)
/pages           # Page-level components (Home, Profile, SignIn, Admin Dashboard, etc.)
/assets          # Images, SVG icons, and other static assets
/firebase        # Firebase config and utility functions
App.jsx          # Main app component with routing
main.jsx         # Entry point for React + Vite

  | | Setup & Installation

1.  Clone the repository 
     bash
   git clone https://github.com/sajal9685/fusshn_assignment.git
   cd echo-pass
    

2.  Install dependencies 

     bash
   npm install
     

3.  Configure Firebase 

   * Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   * Enable Authentication (Email/Password)
   * Create a Realtime Database and set rules accordingly
   * Obtain your Firebase config and add it to   .env   file in the root:

       
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_DATABASE_URL=your_database_url
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
       

4.  Run locally 

     bash
   npm run dev
     

5.  Build for production 

     bash
   npm run build
     

6.  Deploy to Firebase Hosting 

     bash
   firebase deploy
     

---

  | | Usage

* Visit the [Live Site](https://bookingapp-f6150.web.app/)
* Sign up or log in to book concert tickets.
* Explore concerts and filter by your favorite artists.
* View booking history and manage your profile.
* Admin users can manage concerts and bookings from the admin dashboard.


  | | Contact

Created by Sajal Chaturvedi - feel free to contact me at [chaturvedisajal51@gmail.com](mailto:chaturvedisajal51@gmail.com)


Enjoy booking your favorite concerts with EchoPass!

