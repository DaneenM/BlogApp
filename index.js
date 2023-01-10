const Sequelize = require('sequelize');
const { Blog } = require('./models');
const express = require('express');
const app = express()

app.post('/blogs', async (req, res) => {
    // req.body contains an Object with firstName, lastName, email
    const { title, body, travel } = req.body;
    const newBlog = await Blog.create({
        title,
        body,
        travel
    });
    
    // Send back the new user's ID in the response:
    res.json({
        id: newBlog.id
    });
})

app.get('/blogs', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

app.get('/blogs/title', async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: ['title']
    });
    res.json(blogs);
});

app.get('/blogs/:id', async (req, res) => {
    const firstBlog = await Blog.findByPk(req.params.id);
    res.json(firstBlog);
});

app.get('/users/:id', async (req, res) => {
    try{
        const firstBlog = await Blog.findByPk(req.params.id);
        res.json(firstBlog);
    } catch (e) {
        console.log(e);
        res.status(404).json({
            message: 'User not found'
        });
    }
});

app.post('/blogs/search', async (req, res) => {
    const blogs = await Blog.findAll({
        where: {
            title: req.body.term,
        }
    });
    res.json(blogs);
});

app.post('/blogs/search', async (req, res) => {
    const blogs = await Blog.findAll({
        where: {
            [Sequelize.Op.or]: [
                { 
                    title: req.body.term,
                    body: req.body.term,
                    category: req.body.term
                }
            ]
        }
    });
    res.json(blogs);
});

app.post('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    
    // Assuming that `req.body` is limited to
    // the keys firstName, lastName, and email
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id
      }
    });
    
    res.json(updatedBlog);
});

app.delete('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const deletedBlog = await User.destroy({
        where: {
            id
        }
    });
    res.json(deletedBlog);
});