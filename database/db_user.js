const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbOpen = sqlite.open('./database/db_file.db', { Promise });

const getUsers = async () => {
    try {
        const sqlQuery = 'SELECT id, email, password FROM users';
        const db = await dbOpen;
        return db.all(sqlQuery);
    } catch (error) {
        throw new Error(error);
        res.send(error);
    }
}

const getUser = async (id) => {
    const sqlQuery = 'SELECT id, email, password FROM users where id = ?';
    const db = await dbOpen;
    return db.get(sqlQuery, id)
}

const searchUser = async (email) => {
    const sqlQuery = 'SELECT id, email, password FROM users where email = ?';
    const db = await dbOpen;
    return db.get(sqlQuery, email);
}

const addUser = async (email, password) => {
    try {
        const sqlQuery = 'INSERT INTO users (email, password) VALUES (?,?)';
        const db = await dbOpen;
        return db.run(sqlQuery, email, password);
    } catch (error) {
        throw new Error(error);
        res.send(error);
    }
}

const deleteUser = async (id) => {
    try {
        const sqlQuery = 'DELETE from users where id = ?';
        const db = await dbOpen;
        return db.run(sqlQuery, id);
    } catch (error) {
        throw new Error(error);
    }
}

const updateUser = async (email, password, id) => {
    try {
        const sqlQuery = 'UPDATE users SET email = ?, password = ? where id = ?';
        const db = await dbOpen;
        return db.run(sqlQuery, email, password, id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    searchUser: searchUser,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};