# MERN Blog Platform

A full-featured blog application built using the MERN stack (MongoDB, Express, React, Node.js). This platform supports user authentication, content creation, and blog management through a responsive and clean UI.

## 🚀 Features

- ✅ User registration & login (JWT authentication)
- 📝 Create, Read, Update, Delete (CRUD) blog posts
- 🛡️ Protected routes and role-based access
- 🖼️ Image upload via Cloudinary
- 📱 Responsive design
- 🔔 Toast notifications for user actions
- 📂 Dashboard to manage all posts

---

## 📸 Screenshots

[Homepage](https://res.cloudinary.com/djmribqmd/image/upload/v1747326565/Homepage_jgnvve.png) 

[Dashboard](https://res.cloudinary.com/djmribqmd/image/upload/v1747326553/Dashboard_qjlwsb.png)

[Create Blog](https://res.cloudinary.com/djmribqmd/image/upload/v1747326553/Create-Blog_s8r8mp.png)

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Fetch, React Router, React Toastify, CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **File Uploads:** Cloudinary, Multer
- **Database:** MongoDB Compass

---

## 📁 Folder Structure

client/ --> React frontend

server/ --> Node.js + Express backend

README.md --> Project details


---

## ⚙️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/Umesh-Dholakiya/MERN-Blog-Project-.git
cd MERN-Blog-Project-

client : 
cd client
npm install

Server : 
cd server
npm install

Create .env Files :- 

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

start Backend :

cd server
npm run dev

Start Frontend

cd client
npm start


By Author :- 
Umesh Dholakiya




