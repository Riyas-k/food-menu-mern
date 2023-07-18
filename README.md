# food-menu

Food Menu Application
This is a web application built with Node.js and MongoDB for managing a food menu. It allows users to view the menu, sign up and log in as regular users, and log in as an admin to add/edit the menu. Admins can also manage user accounts and promote users to admin status.

Prerequisites
Before running this application, make sure you have the following installed:

Node.js (version X.X.X)
MongoDB (version X.X.X)
Installation
Clone this repository to your local machine.
Navigate to the project's root directory.
Run the following command to install the dependencies:
bash
Copy code
npm install
Configure the environment variables by creating a .env file in the root directory. Add the following variables:
plaintext
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost/food_menu
SESSION_SECRET=your_session_secret
Replace your_session_secret with a secure random string.

Usage
Start the MongoDB server on your local machine.
Run the following command to start the application:
bash
Copy code
npm start
Access the application by visiting http://localhost:3000 in your web browser.
Features
Admin functionality:

Admin login: Visit /admin/login and enter your email and password to log in as an admin.
Manage menu: After logging in as an admin, visit /admin/menu to add/edit the menu.
Manage users: After logging in as an admin, visit /admin/users to view and modify user accounts.
Promote users: As an admin, you can change regular users to admin status.
User functionality:

User signup: Visit /signup to create a new user account.
User login: Visit /login and enter your email and password to log in as a user.
Edit profile: After logging in as a user, visit /profile to edit your profile details.
Folder Structure
php
Copy code
├── controllers/         # Contains route controllers
├── models/              # Contains MongoDB models
├── public/              # Publicly accessible files (stylesheets, scripts, images)
├── routes/              # Contains route definitions
├── views/               # Contains views templates
├── app.js               # Main application file
└── ...
Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
MIT

Acknowledgments
This application was built using Node.js, Express, and MongoDB.
Thanks to the developers of various libraries and frameworks used in this project.
Contact
For any questions or feedback, please contact your-mohammedriyazriyaz04@gmail.com.
