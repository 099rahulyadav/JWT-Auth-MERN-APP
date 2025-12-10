const {ensureAuthenticated} =require('../Middlewares/Auth');
const {getproduct,createProduct,updateProduct,deleteProduct} = require('../Controllers/ProductController');
const {createProductValidation, updateProductValidation, deleteProductValidation} = require('../Middlewares/ProductValidation');

const router = require('express').Router();

router.get('/',ensureAuthenticated,getproduct);

router.post('/create',ensureAuthenticated,createProductValidation,createProduct);

router.put('/update/:id',ensureAuthenticated,updateProductValidation,updateProduct);

router.delete('/delete/:id',ensureAuthenticated,deleteProductValidation,deleteProduct);


module.exports = router;