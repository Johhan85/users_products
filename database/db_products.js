const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbOpen = sqlite.open('./database/db_file.db', { Promise });

const getProducts = async () => {
    try {
        const sqlQuery = 'SELECT products.id, products.name, products.description, category.category, products.price' 
        + ' FROM products INNER JOIN category ON products.category_id = category.id;';
        const db = await dbOpen;
        return db.all(sqlQuery);
    } catch (error) {
        throw new Error(error);
    }
}

const getProduct = async (id) => {
    try {
        const sqlQuery = 'SELECT products.id, products.name, products.description, category.category, products.price' 
        + ' FROM products INNER JOIN category ON products.category_id = category.id where products.id = ?;';
        const db = await dbOpen;
        return db.get(sqlQuery, id);
    } catch (error) {
        throw new Error(error);
    }
}

const addProduct = async (name, description, category_id, price) => {
    try {
        const sqlQuery = 'INSERT INTO products (name, description, category_id, price) VALUES (?,?,?,?)';
        const db = await dbOpen;
        return db.run(sqlQuery, name, description, category_id, price);
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

const updateProduct = async (name, description, category_id, price, id) => {
    try {
        const sqlQuery = 'UPDATE products SET name = ?, description = ?, category_id = ?, price = ? where id = ?';
        const db = await dbOpen;
        return db.run(sqlQuery, name, description, category_id , price, id);
    } catch (error) {
        throw new Error(error);
    }
}

const searchProdByCat = async (category) => {
    try {
        const sqlQuery = 'SELECT products.id, products.name, products.description, category.category, products.price' 
                            + ' FROM products INNER JOIN category' 
                                +' ON products.category_id = category.id'
                                    +' WHERE category.category = ?';
        const db = await dbOpen;
        return db.all(sqlQuery, category);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getProducts: getProducts,
    getProduct: getProduct,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    updateProduct : updateProduct,
    searchProdByCat : searchProdByCat
}