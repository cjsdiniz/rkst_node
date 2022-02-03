const express= require('express');
const { randomUUID } = require('crypto');
const fs = require('fs')
const app = express();

app.use(express.json());

let products =[];

fs.readFile("products.json","utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
});


// POST (INSERT)
app.post("/products", (req, res) => {

    // const body = req.body;
    const {name, price} = req.body;

    const product = {
        id: randomUUID(),
        name,
        price
    }

    products.push(product);

    // fs.appendFile("products.json",JSON.stringify(products) , (err) => {
    productFile();

   // console.log(body);
    return res.json(products);
})

//GET (READ ALL THE PRODUCTS)
app.get("/products",  (req, res)  => {
    return res.json(products);
    // return res.json({
        //     message: "Products",
        // })
    })

//GET (READ ONE PRODUCT)
app.get("/products/:id",  (req, res)  => {
    const{id}=req.params;
    const product = products.find(product => product.id === id);
    return res.json(product);
})

//PUT (UPDATE ONE PRODUCT)
app.put("/products/:id",  (req, res)  => {
    const{id}=req.params;
    const {name, price} = req.body;
    const productIdx = products.findIndex(product => product.id === id);
products[productIdx] ={
    ...products[productIdx],
    name,
    price
}
    productFile();
    return res.json({message: 'Product changed successfully'});
})

//DELETE ONE PRODUCT
app.delete("/products/:id",  (req, res)  => {
    const{id}=req.params;
    const productIdx = products.findIndex(product => product.id === id);
    products.splice(productIdx, 1);
    productFile();
    return res.json({message: 'Product deleted successfully'});
})


function productFile() {
    fs.writeFile("products.json",JSON.stringify(products) , (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Produto alterado.")
        }
    })

}
app.listen(4002, () => console.log('server running in 4002'));