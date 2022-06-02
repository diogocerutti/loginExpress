const express = require('express');
const router = express.Router();
const passport = require('passport');

/* Rota da página de Login (GET) */
router.get('/', (req, res, next) => {
    if (req.query.fail)
        res.render('login', { message: 'Usuário e/ou senha incorretos!' });
    else
        res.render('login', { message: null });
});

/* Rota da página de Login (POST) */
router.post('/',
    passport.authenticate('local', { 
        successRedirect: '/', 
        failureRedirect: '/login?fail=true' 
    })
);

module.exports = router;