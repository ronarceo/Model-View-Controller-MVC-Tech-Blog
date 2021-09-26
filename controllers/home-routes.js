const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            logged_in: req.session.logged_in,
            posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirects the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});
  


module.exports = router;