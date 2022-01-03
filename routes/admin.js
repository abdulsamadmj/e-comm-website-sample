var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
const fs=require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products',{admin:true,products})
  })

});

router.get('/add-product',function(req,res){
  res.render('admin/add-product',{admin:true})
})

router.post('/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.image)
  req.body.price=parseInt(req.body.price)
  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.image
    console.log(id)
    image.mv('../E-kart/public/product-images/'+id+'.png',(err,done)=>{
      if(!err){
        res.render('admin/add-product')
      }else{
        console.log(err)
      }
    })
  })

})

router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  let path=('../E-kart/public/product-images/'+proId+'.png')
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    fs.unlinkSync(path)
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{product,admin:true})
})

router.post('/edit-product/:id',(req,res)=>{
  req.body.price=parseInt(req.body.price)
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files != null){
      let image=req.files.image
      image.mv('../E-kart/public/product-images/'+req.params.id+'.png')
    }
  })
})


module.exports = router;
