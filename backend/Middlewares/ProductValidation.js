const Joi = require("joi")

const createProductValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().positive().required(),
        description: Joi.string().max(500).optional()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad Request",
                error: error.details[0].message,  // more readable
                detailedError: error
            });
    }
    next();
};

const updateProductValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).optional(),
        price: Joi.number().positive().optional(),
        description: Joi.string().max(500).optional()
    }).or('name', 'price', 'description'); // At least one field must be provided for update    
    const { error } = schema.validate(req.body);    
    if (error) {
        return res.status(400)
            .json({ message: "Bad Request",
                error: error.details[0].message,  // more readable
                detailedError: error
            });
    }
    next();
    }

const deleteProductValidation = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().hex().length(24).required() // Assuming MongoDB ObjectId
    }); 
    const { error } = schema.validate(req.params);
    if (error) {    
        return res.status(400)
            .json({ message: "Bad Request",
                error: error.details[0].message,  // more readable
                detailedError: error
            });
    }
    next();    
    }

module.exports={
    createProductValidation,
    updateProductValidation,
    deleteProductValidation
}   