const BlogModel = require('../models/Blog');
const cloudinary = require('cloudinary').v2;


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

module.exports = { addBlog };


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


const updateBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        const { title, description, category, author } = req.body;

        if (req.file) {
            // delete old image
            await cloudinary.uploader.destroy(blog.public_id);
            // upload new image
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

module.exports = {
    addBlog,
    deleteBlog,
    viewBlogs,
    blogDetails,
    updateBlog
};