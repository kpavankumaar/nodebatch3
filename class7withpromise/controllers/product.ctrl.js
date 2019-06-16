const Product = require('../models/product.model');

var products = [
    { id: 1, brand: 'nokia', model:'x6', price: 300, inStock: true},
    { id: 2, brand: 'sony', model: 'Erricson', price: 800, inStock: true },
    { id: 3, brand: 'samsung', model: 'j7', price: 1000, inStock: true }
]
var  ProductCtrl = {
    get:function (req,res){
        let pageIndex = +req.params.pageIndex || 0;
        let pageSize = +req.params.pageSize || 10; // number of item in a page 
        
        let sort = req.query.sort;
        console.log(pageIndex,pageSize)
        Product.count()
        .exec()
        .then(function(cnt){
            console.log(cnt,pageSize);
            let totalPages = Math.ceil(cnt/pageSize);

            let metaData = {
                count:cnt,
                totalPages:totalPages,
                hasPrevious: pageIndex > 0,
                hasNext: pageIndex < totalPages - 1
            }
            Product.find({},{_v:0})
            .skip(pageIndex * pageSize)
            .limit(pageSize)
            .exec()
            .then(function (product) {
                console.log(product);
                let response = {
                    metaData:metaData,
                    data:product
                }
                res.status(200);
                res.json(product);
            })
            .catch(function (err) {
                res.status(400)
                res.send()
            })
        }) 
    },
    getById: function(req,res){
        console.log(req.params);
        var id = req.params.id;

        Product.findById(id)
        .exec() // promise 
        .then(function(product){
            res.status(200);
            res.json(product);
        })
        .catch(function(){
            res.status(400);
            res.json(data);
        }) 
    },
    save:function(req,res){

        var clientData = req.body;
        // console.log(product,req.body);
        // products.push(product);
        var product = new Product(clientData)
        product.save()
        .then(function(savedProduct){
            res.status(201);// created
            res.send(savedProduct);
        })
        .catch(function(err){
            res.status(500);
            res.send('internal server error');
        })
    },
    delete:function(req,res){
        var id = req.params.id;
        Product.findByIdAndRemove(id)
        .exec()
        .then(function(){
            res.status(204);
            res.send();
        })
        .catch(function(){
            res.status(500);
            res.send("internale server  error ")
        })
    },
    update:function (req,res){
        var product = req.body;
        var id = req.params.id;
        console.log(product, id);
        Product.findByIdAndUpdate(id,{
            $set:{
                brand: req.body.brand,
                model: req.body.model,
                price: req.body.price,
                inStock: req.body.inStock
            }
        })
        .exec()
        .then(function(){
            res.status(200);
            res.send();
        })
        .catch(function(){
            res.status('500');
            res.send('internal server error');
        })
    },
    patch:function(req,res){
        var product = req.body;
        var id = +req.params.id;
        console.log(product,id);
        for(var i = 0 ; i < products.length; i++){
            if(products[i].id === id){
                products[i].brand = product.brand || products[i].brand;
                products[i].model = product.model;
                products[i].price = product.price;
                products[i].inStock = product.inStock;
                res.status(200);
                res.send();
            }
        }
    }
}

module.exports = ProductCtrl;   