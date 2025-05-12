const express = require('express');
const routes = express.Router();
const {
    addBlog,
    deleteBlog,
    viewBlogs,
    blogDetails,
    updateBlog,
    blogsByCategory,
    likeBlog,
    addComment,
    getComments
} = require('../controller/blogController');

const multer = require('multer');
const storage = multer.diskStorage({});
const blogImage = multer({ storage: storage }).single('image');

// Blog routes
routes.post('/addblog', blogImage, addBlog);
routes.get('/viewblog', viewBlogs);
routes.get('/viewblog/:id', blogDetails);
routes.delete('/deleteblog/:id', deleteBlog);
routes.put('/updateblog/:id', blogImage, updateBlog);
routes.get('/viewblog/category/:categoryName', blogsByCategory);

// Like & Comment (adjusted for frontend)
routes.put('/:id/like', likeBlog);
routes.post('/:id/comment', addComment);
routes.get('/:id/comments', getComments);

module.exports = routes;
