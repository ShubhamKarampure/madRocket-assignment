# Student Management System - React App

This is a simple Student Management System built using React and Firebase. The app includes user authentication, a students' table, and a form to add student information to Firestore. The project follows the requirements outlined in the assignment provided by Team Madrocket.

## Features

1. **Login Page**  
   - Simple login page with Firebase authentication.
   - Uses credentials:
     - **Username**: `admin@123.com`
     - **Password**: `admin@123`

2. **Students Page**  
   - Displays a table with student information:
     - Columns: ID, Name, Class, Section, Roll Number, and Action (with icons for "View", "Edit", and "Delete").
   - An **Add Student** button opens a modal with a form.
   - The student form contains at least **12 fields**, covering various input types (e.g., text, number, email, date).
   - When the form is submitted, the student data is saved in Firestore.

3. **Dashboard Sidebar**
   - **Students Page**: Navigates to the students' table page.
   - **Logout**: Logs out the user and redirects to the login page.

## Setup Instructions

### Prerequisites

- Node.js (version >= 14)
- Firebase account and Firestore database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShubhamKarampure/madRocket-assignment.git
   cd your-repo-name
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project and enable Firebase Authentication and Firestore in the Firebase console.
   - Add your Firebase project configuration to the `firebase.js` file in the `src` directory.

4. Run the app locally:
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).


### Firebase Authentication Credentials

- **Username**: `admin@123.com`
- **Password**: `admin@123`

## Technologies Used

- **React**: Frontend framework for building the UI.
- **Firebase**: Used for user authentication and storing data in Firestore.
- **Material-UI**: UI components and styling framework.
- **React Router**: For page navigation.
- **Formik**: For handling form validation.
