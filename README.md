README
Train World is a full-stack web application built using a Flask API backend and a React frontend. The application has three models: User, Train, and Ticket, with the following relationships:

One-to-many relationship between User and Ticket. Each User can have many Tickets, but each Ticket can only have one User.
One-to-many relationship between Train and Ticket. Each Train can have many Tickets, but each Ticket can only be associated with one Train.
Many-to-many relationship between User and Train, using the Ticket association table. Each User can be associated with many Trains through their Tickets, and each Train can be associated with many Users through their Tickets.
Running the application
To run the application, use the following commands:

css
Copy code
pip install -r requirements.txt && npm install --prefix client && npm run build --prefix client
gunicorn --chdir server app:app

To view the website, enter trainworld.onrender.com

Backend
The backend provides full CRUD actions for the Train and Ticket models, and minimum of create and read actions for the User model. The application uses Flask to implement the backend.

Frontend
The frontend uses React to implement the client-side of the application. The application provides a Login & Signup feature, with hashed passwords for secure authentication. It uses Formik to handle input forms and validation, with at least one data type and string/number format validation.

The application also uses React Router to provide three different client-side routes, with a navigation bar for easy navigation. The client and server communicate using fetch().

Deployment
To deploy the application, follow the instructions for your preferred hosting platform, making sure to set the appropriate environment variables and dependencies.
