
const ProductModel = require("../Models/Product");

const getProducts = async(req,res)=>{
    try{
        const products = await ProductModel.find({});
        return res.status(200)
        .json({message:'Products fetched successfully',success:true,products});
    }catch(error){
        return res.status(500)
        .json({message:'Internal Server Error',success:false,error});
    }
}

const createProduct = async(req,res)=>{
    try{
        const {name,description,price}=req.body;
        const newProduct =new ProductModel({name,description,price});
        await newProduct.save();
        return res.status(200)
        .json({message:'Product created successfully',success:true,product:newProduct});
    }catch(error){
        return res.status(500)
        .json({message:'Internal Server Error',success:false,error});
    }
}

const updateProduct = async(req,res)=>{
    try{
        const {id}=req.params;
        const updates=req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(id,updates,{new:true});
        if(!updatedProduct){
            return res.status(404)
            .json({message:'Product not found ',success:false});
        }
        return res.status(200)
        .json({message:'Product updated successfully',success:true,product:updatedProduct});
    }catch(error){
        return res.status(500)
        .json({message:'Internal Server Error',success:false,error});
    }
}


const deleteProduct = async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404)
            .json({message:'Product not found',success:false});     
        }
        return res.status(200)
        .json({message:'Product deleted successfully',success:true});
    }catch(error){
        return res.status(500)
        .json({message:'Internal Server Error',success:false,error});
    }
}   


module.exports={
    getproduct:getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}   
