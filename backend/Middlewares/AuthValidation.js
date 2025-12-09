const Joi = require("joi")


const signupValidation= (req, res, next)=>{
    const schema=Joi.object({
        username:Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(40).required()
    });

    const {error}= schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad Request",
            error: error.details[0].message,  // more readable
            detailedError: error
});
    }
    next();
}
const loginValidation= (req, res, next)=>{
    const schema=Joi.object({
        username:Joi.string().min(4).max(50).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(30).required()
    }).xor('username', 'email');    // At least one of userName or email is required ('xor condition')

    const {error}= schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad Request",
            error: error.details[0].message,  // more readable
            detailedError: error});
    }
    next();
}


module.exports={
    signupValidation,
    loginValidation
}   
