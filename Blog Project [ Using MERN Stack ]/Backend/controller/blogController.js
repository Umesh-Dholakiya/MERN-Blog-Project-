const BlogModel = require('../models/Blog');
const cloudinary = require('cloudinary').v2;

// Add Blog
const addBlog = async (req, res) => {
    try {
        const { title, description, category, author } = req.body;

        if (!title || !description || !category || !author || !req.file) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields including image.",
            });
        }

        const imageUpload = await cloudinary.uploader.upload(req.file.path);

        const blog = new BlogModel({
            title,
            description,
            category,
            author,
            image: imageUpload.secure_url,
            public_id: imageUpload.public_id,
        });

        await blog.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Delete Blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).send({ success: false, message: "Blog not found" });
        }

        await cloudinary.uploader.destroy(blog.public_id);
        await BlogModel.findByIdAndDelete(req.params.id);

        return res.status(200).send({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
};

// View All Blogs
const viewBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find()
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json({ blogs });
    } catch (err) {
        console.error('Failed to fetch blogs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Blog Details
const blogDetails = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id)
            .populate("author", "username email");

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, blog });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching blog", error: err.message });
    }
};

// Update Blog
const updateBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        const { title, description, category, author } = req.body;

        if (req.file) {
            await cloudinary.uploader.destroy(blog.public_id);
            const imageUpload = await cloudinary.uploader.upload(req.file.path);
            blog.image = imageUpload.secure_url;
            blog.public_id = imageUpload.public_id;
        }

        blog.title = title;
        blog.description = description;
        blog.category = category;
        blog.author = author;

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Blogs by Category
const blogsByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;

        const blogs = await BlogModel.find({
            category: { $regex: new RegExp(categoryName, 'i') }
        })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json({ blogs });
    } catch (err) {
        console.error('Failed to fetch blogs by category:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Like Blog
const likeBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        const { userId } = req.body;
        const alreadyLiked = blog.likes.includes(userId);

        if (alreadyLiked) {
            blog.likes = blog.likes.filter(id => id.toString() !== userId);
        } else {
            blog.likes.push(userId);
        }

        await blog.save();
        res.status(200).json({
            success: true,
            message: alreadyLiked ? "Unliked the blog" : "Liked the blog",
            likes: blog.likes.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Add Comment
const addComment = async (req, res) => {
    try {
        const { user, text } = req.body;
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        blog.comments.push({ user, text });

        await blog.save();
        res.status(201).json({ success: true, message: "Comment added", comments: blog.comments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get Comments
const getComments = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id)
            .populate("comments.user", "username email");

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, comments: blog.comments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = {
    addBlog,
    deleteBlog,
    viewBlogs,
    blogDetails,
    updateBlog,
    blogsByCategory,
    likeBlog,
    addComment,
    getComments,
};
