const express = require('express');
const app = express();
const userRoute = require('./routes/users');
const productRoute = require('./routes/products');

app.use(express.json());

app.use('/users',userRoute);
app.use('/products', productRoute);

app.listen(8080, () => {
console.log('Server is running on port 8080');
});