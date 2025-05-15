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

> *(Add your own screenshot image links or upload them to Cloudinary/imgur and update the URLs)*

[Homepage](https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22mern%20stack%20Project%20(%20blog%20Project%20).png%22%2C%22type%22%3A%22image%2Fpng%22%2C%22signedurl_expire%22%3A%222028-05-14T16%3A16%3A56.165Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2Ffa25dfef155b4095%2Fmern%2520stack%2520Project%2520(%2520blog%2520Project%2520).png%3FExpires%3D1841933816%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3Dcs5UGjnVXlZwev-4PWiM8L3tUq4B2Lv0l-WqH97nTAUrJfJMuRfIK5HSOYXY4Ia2hREivR3x0sk57JlNcOZ7WF8bxYTdzzcYtY0qQAGG~EuuToK5UXsdgzvuf2H1OUCuZXGTrHyCDymQ1RdA1jdACbCFBQ-Z1dF5RGy9Xh06WotxZ7FHSSYO7Vwz-6iM0D-2oFOK8mmp8HbNVfdmK7rl7jiHVAPDYxiArSAu5DcYsO3B~A0KOXg-RstXjD1xAfOSHeTAsvYR-b66PSFoFBCuEnvii6Nc4bQdfqvf2jQqoQoS9vviQNAT8RYinbOm~R-4KIO3xW~IicuXJvP356eyag__%22%7D))  
[Dashboard](https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22dashboard.png%22%2C%22type%22%3A%22image%2Fpng%22%2C%22signedurl_expire%22%3A%222028-05-14T16%3A20%3A31.913Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2Fd23148cc49c24e7d%2Fdashboard.png%3FExpires%3D1841934032%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DNEIg~6megTBYOPPGvhGG8GHaKgAyEgKwLw4GsdclUiCH8~A8mjSjWKxeFCDZfuTvp-yfKjSEieDqT6ourk260GHP4HHxS4JQzEDbnOnt7QEljyxNOVoA2jAO4PR1afr2PU0RPv88T3iCBQ~J9hR39DGNeYmwiG5oo0jcx~~~3XcONQcvy00cm9h9im~k-jwar~vjSF-B0G6vRKXwznwze84h1wcAC82m~nvTc~96FyTxuY7DlgTTOXFWmaIJdHAEhiBWDqP0NrE6elFiXDp0mHYA2F5SOmYr8AXqdi5fxZKrxFJDcFXW-POotw-tH09IRA7ClSSB8lkoNAx2rF32CQ__%22%7D)
[Create Blog](https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22dashboard.png%22%2C%22type%22%3A%22image%2Fpng%22%2C%22signedurl_expire%22%3A%222028-05-14T16%3A18%3A49.535Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2F0b326fa629a14222%2Fdashboard.png%3FExpires%3D1841933930%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DZLIlQ-jCPll5obGy~VlcCI9ODS0tZhWABYTVeN-f6xzwR978fZoukTjuYnPePAgXRfCqLCtqcSIQqog1KjUJMzYIBRGiUj3bII9dvd3QCTqBCj-6wCCGBNa4UUI57sjLByGf44TN~NmZWjZk9RArMlw-zZXDIoXH90UBolANyI0lh0UbYU38HlVfobgGiPq2UOZwIhfQfHTShzrie1fSzeH25kuQyT0Q5yEtlk5~L3EBrvj67aZyOS~42exE4C3IAU4Iyysro4WVBk27X2PtSzN19sm-6-ihzkUPNrga7Te3G2-rKaDKSYQeXP4u9mAGREybTchUTp2nIghtm4RFYQ__%22%7D))

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, React Router, React Toastify, CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **File Uploads:** Cloudinary, Multer
- **Database:** MongoDB Atlas

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




