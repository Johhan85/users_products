const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbOpen = sqlite.open('./database/db_file.db', { Promise });

const getProducts = async () => {
    try {
        const sqlQuery = 'SELECT id, name, description, price FROM products';
        const db = await dbOpen;
        return db.all(sqlQuery);
    } catch (error) {
        throw new Error(error);
    }
}

const getProduct = async (id) => {
    try {
        const sqlQuery = 'SELECT id, name, description, price FROM products where id = ?';
        const db = await dbOpen;
        return db.get(sqlQuery, id);
    } catch (error) {
        throw new Error(error);
    }
}

const addProduct = async (name, description, price) => {
    try {
        const sqlQuery = 'INSERT INTO products (name, description, price) VALUES (?,?,?)';
        const db = await dbOpen;
        return db.run(sqlQuery, name, description, price);
    } catch (error) {
        throw new Error(error);
    }
}

const deleteProduct = async (id) => {
    try {
        const sqlQuery = 'DELETE FROM products where id = ?';
        const db = await dbOpen;
        return db.run(sqlQuery, id);
    } catch (error) {
        throw new Error(error);
    }
}

const updateProduct = async (name, description, price, id) => {
    try {
        const sqlQuery = 'UPDATE products SET name = ?, description = ?, price = ? where id = ?';
        const db = await dbOpen;
        return db.run(sqlQuery, name, description, price, id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getProducts: getProducts,
    getProduct: getProduct,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    updateProduct : updateProduct
}