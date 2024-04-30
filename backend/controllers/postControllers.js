require('dotenv').config();
const db = require('../config/dbconfig.js');

const getPosts = async (req, res) => {
    const posts = await db('posts').select('*');
    
    res.status(200).send(posts);
}

const editPost = async (req, res) => {
    const { post_id } = req.params;
    const updates = req.body;

    const post = {
        post_id: post_id,
        title: updates.title,
        content: updates.content,
        picture: updates.image,
        date: updates.date,
    }

    try {
        const updated = await db('posts').where({post_id}).update(post);
        if (updated) {
            res.status(200).send({ message: 'Post updated successfully' });
        } else {
            res.status(404).send({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating post', error });
    }
};

const getPost = async (req, res) => {
    const { post_id } = req.params;
    const posts = await db('posts').where({post_id});

    try {
        if (posts) {
            res.status(200).send( posts );
        } else {
            res.status(404).send({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating post', error });
    }
};

const deletePost = async (req, res) => {
    const { post_id } = req.params;
    
    try {
        const deleted = await db('posts').where({post_id}).del();
        if (deleted) {
            res.status(200).send({ message: 'Post deleted successfully' });
        } else {
            res.status(404).send({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error deleting post', error });
    }
};

const createPost = async (req, res) => {
    const { title, content, image, date } = req.body; // Assume posts have title, content, and picture attributes
    
    try {
        await db('posts').insert({
            title,
            content,
            'picture': image,
            date
        })

        res.status(201).send({ message: 'Post created successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Error creating post', error });
    }
};

module.exports = {
    getPosts,
    editPost,
    deletePost,
    createPost,
    getPost
}
