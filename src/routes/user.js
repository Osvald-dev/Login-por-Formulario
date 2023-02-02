import express from "express";
const user = express.Router();
import session from 'express-session';

user.get('/login', async(req, res) => {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/login', {status: false})
    }
    
})

user.post('/login', async(req, res) => {
    const {user, pass} = req.body;
  
    if (process.env.DUMMYUSER === user && process.env.DUMMYPASS === pass) {
        req.session.login=true;
        res.redirect('/api/usuario')
    } else {
        req.session.login=false;
        res.redirect('/api/usuario/login')
    }
    
})

user.get('/', async(req, res) => {
    res.render('pages/home', {status: req.session.login})
})

user.get('/logout', async(req, res) => {
    req.session.destroy( (err) => {
        if (err) {
            res.json(err);
        } else {
            res.render('pages/logout', {status: false});
        }
    })
})

export {user};