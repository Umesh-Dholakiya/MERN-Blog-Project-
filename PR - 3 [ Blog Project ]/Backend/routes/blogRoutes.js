const express = require('express');
const routes = express.Router();
const {
    addBlog,
    deleteBlog,
    viewBlogs,
    blogDetails,  
    updateBlog
} = require('../controller/blogController');
const multer = require('multer');

const storage = multer.diskStorage({});
const blogImage = multer({ storage: storage }).single('image');

routes.post('/addblog', blogImage, addBlog);
routes.get('/viewblog', viewBlogs);
routes.get('/viewblog/:id', blogDetails);  
routes.delete('/deleteblog/:id', deleteBlog);
routes.put('/updateblog/:id', blogImage, updateBlog); 


module.exports = routes;
