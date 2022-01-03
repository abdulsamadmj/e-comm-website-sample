var db=require('../config/connection')
var collections=require('../config/collections')
var objectId=require('mongodb').ObjectId
const { ObjectID } = require('bson')
const { response } = require('../app')

module.exports={
    addProduct:(product,callback)=>{
        db.get().collection('product').insertOne(product).then((data)=>{
            
            callback(data.insertedId)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })

    },
    deleteProduct:(proId)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(proId);
            console.log(objectId(proId));
            db.get().collection(collections.PRODUCT_COLLECTION).remove({_id:ObjectID(proId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                console.log(product);
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},{
                $set:{
                    name:proDetails.name,
                    category:proDetails.category,
                    price:proDetails.price,
                    description:proDetails.description
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}