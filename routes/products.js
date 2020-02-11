const routes = require('express').Router();
const validation = require('../validation');
const db = require('../database/db_products');

routes.get('/getproducts', async (req, res) => {
    try {
        const products = await db.getProducts();
        res.json(products);
    } catch (error) {
        res.json(error);
    }
});

routes.get('/getproduct/:id', async (req, res) => {
    
    const id = req.params.id;
    try {
        const product = await db.getProduct(id);
        if(product) {
            res.json(product);
        }
        else {
            res.json({info : `product with id: ${ id } is not found`});
        }
    } catch (error) {
        res.json(product);
    }
});

routes.post('/addproduct', async (req, res) => {
    const name = req.body.name.toLowerCase();
    const description = req.body.description.toLowerCase();
    const price = req.body.price;

    const { error } = validation.productValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const addproduct = await db.addProduct(name, description, price);
        res.json({info : "insert successfully"});
    } catch (error) {
        res.json(error);
    }
});

routes.delete('/deleteproduct/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleteProduct = await db.deleteProduct(id);

        if(deleteProduct.changes !== 0) {
            res.json({info : "delete successfully"});
        }
        else {
            res.json({info : `product with id: ${ id } is not found`});
        }
        
    } catch (error) {
        res.json(error);
    }
});

routes.put('/updateproduct/:id', async (req, res) => {
    const name = req.body.name.toLowerCase();
    const description = req.body.description.toLowerCase();
    const price = req.body.price;
    const id = req.params.id;

    const { error } = validation.productValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const updateproduct = await db.updateProduct(name, description, price, id);
        if(updateproduct.changes !== 0) {
            res.json({info : "update successfully"});
        }
        else {
            res.json({info : `product with id: ${ id } is not found`});
        }
    } catch (error) {
        
    }
});


module.exports = routes;

