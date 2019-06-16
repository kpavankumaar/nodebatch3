const Product = require('../models/product.model');

var products = [
    { id: 1, brand: 'nokia', model:'x6', price: 300, inStock: true},
    { id: 2, brand: 'sony', model: 'Erricson', price: 800, inStock: true },
    { id: 3, brand: 'samsung', model: 'j7', price: 1000, inStock: true }
]
var  ProductCtrl = {
    get:function (req,res){
        Product.find({},function(err,data){
            console.log(data," ******** ",err);
            if(!err){
                res.status(200);
                res.json(data);
            }else{
                res.status(400)
                res.send()
            }
        })
        // res.status(200);
        // res.json(products);
    },
    getById: function(req,res){
        console.log(req.params);
        var id = req.params.id;

        Product.findById(id,function(err,data){
            if(!err){
                res.status(200);
                res.json(data);
            }else{
                res.status(400);
                res.json(data);
            }
        })
        
    },
    save:function(req,res){

        var clientData = req.body;
        // console.log(product,req.body);
        // products.push(product);
        var product = new Product(clientData)
        product.save(function(err,data){
            if(!err){
                res.status(201);// created
                res.send(data);
            }else{  
                res.status(500);
                res.send('internal server error');
            }
        })

        
    },
    delete:function(req,res){
        var id = req.params.id;
        Product.findByIdAndRemove(id,function(err,data){
            if(!err){
                res.status(204);
                res.send();
            }else{
                res.status(500);
                res.send("internale server  error ")

            }
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
        },function(err, data){
            if(!err){
                res.status(200);
                res.send();
            }else{
                res.status('500');
                res.send('internal server error');
            }
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