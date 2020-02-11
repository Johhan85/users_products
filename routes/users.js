const routes = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../database/db_user');
const validation = require('../validation');

routes.post('/login', async (req, res) => {
    const { error } = validation.loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await db.searchUser(req.body.email);

    if(!user) {
    return res.json({info : "Email is wrong"});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) {
        return res.json({info : "Password is wrong"});
    }

    res.json({ info : "Successfully logged in" });
});

routes.get('/getusers', async(req, res) => {
    try {
        const users = await db.getUsers();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
});

routes.get('/getuser/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await db.getUser(id);
        if(user) {
            res.json(user);
        }
        else {
            res.json({info : `User with id: ${ id } dont exist`});
        }
    } catch (error) {
        res.json(error);
    }
});

routes.post('/adduser', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { error } = validation.registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const emailExist = await db.searchUser(email);
    if(emailExist) {
        return res.status(400).json({info : `Email ${ email } already exist`});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const adduser = await db.addUser(email, hashedPassword);
        res.json({info : "Insert successfully"});
    } catch (error) {
        res.json(error);
    }
});

routes.delete('/deleteuser/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await db.getUser(id);
        if(user) {
            const deleteUser = await db.deleteUser(id);
            res.json({info : "Delete successfully"});
        }
        else {
            res.json({info : `User with id: ${ id } dont exist`});
        }
    } catch (error) {
        res.json(error);
    }
});

routes.put('/updateuser/:id', async (req, res) => {
    const id = req.params.id;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const findUser = await db.getUser(id);
        if(findUser) {
            const updateUser = await db.updateUser(email, hashedPassword, id);
            res.json({info : "Update successfully"});
        }
        else {
            res.json(error);
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = routes;

