🏡 StayHub – A Modern Accommodation Listing Platform

StayHub is a full-stack accommodation listing platform inspired by Airbnb.
Users can create, edit, delete, and view property listings.
It includes authentication, image upload, and review management — built with Node.js, Express, MongoDB, EJS, Cloudinary & Render.

🚀 Features
🎫 Listings Management

Add new listings with images, price & location

Edit or delete your own listings

View all listings with clean UI

Individual listing detail page

🧑‍💻 User Authentication

Secure signup/login using Passport.js

Users can only edit/delete their own listings

Session-based authentication

🖼 Image Upload

Upload listing images using Cloudinary

Multer + Cloudinary storage support

Edit listing images

⭐ Reviews System

Users can add reviews

Delete their own reviews

Average rating display

🌐 Deployment Ready

Backend deployed on Render

Image storage on Cloudinary

Connected with MongoDB Atlas

🛠 Tech Stack
Frontend

EJS Templates

Bootstrap / Custom CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

Passport.js

Multer Storage Cloudinary

Express Session

Cloud & Hosting

Cloudinary (Image Uploads)

MongoDB Atlas

Render (Deployment)

📂 Folder Structure
StayHub/
│── Backend/
│   │── models/
│   │── routes/
│   │── public/
│   │── utils/
│   │── views/
│   │── app.js (or server.js)
│   │── .env (ignored)
│   │── package.json
│
│── README.md

🔐 Environment Variables (.env example)

Create a .env inside Backend/:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MONGO_ATLAS_URL=your_mongo_connection_url
SECRET=your_session_secret


⚠️ .env file should never be pushed to GitHub.

▶️ How to Run Locally
1️⃣ Clone the Repo
git clone https://github.com/devansh-codes614/StayHub.git

2️⃣ Install Dependencies
cd StayHub
npm install

3️⃣ Start the Application
node app.js

4️⃣ Visit in Browser
http://localhost:8080

🌍 Deployment Info (Optional)

Backend deployed on Render

Static assets served from /public

Cloudinary used for all image uploads

🧑‍🎨 Screenshots (Add if you want)

You can add:

Home page screenshot

Listing page screenshot

Detail page screenshot

Create/Edit listing form

🤝 Contributions

Contributions, issues, and feature requests are welcome!

📜 License

This project is open-source.

👨‍💻 Author

Devansh Tripathi
GitHub: https://github.com/devansh-codes614
