const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");

const signup = async(req,res)=>{
    // Implement signup logic here
    try {
        const { username, email, password } = req.body;
        const userEmail =await UserModel.findOne({email})
        if(userEmail){
            return res.status(409)
            .json({message:'User already exists',success:false});
        }
         const userNameExists = await UserModel.findOne({username});
        if(userNameExists){
            return res.status(409)
            .json({message:'Username already taken',success:false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=new UserModel({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(201)
        .json({message:'User registered successfully',success:true});

    } catch (error) {
        return res.status(500)
        .json({message:'Internal Server Error',success:false,error});
    }
};

const login = async(req,res)=>{
    // Implement login logic here
    try {
        const { username, email, password } = req.body;
        const user = await UserModel.findOne({$or: [{ email }, { username }]});
        const ErrorMsg = 'Auth failed: User not found';
        if(!user){
            return res.status(403)
            .json({message:ErrorMsg,success:false});
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(403)
            .json({message:ErrorMsg,success:false});
        }
        const jwtToken= jwt.sign({loginID : user.email ?user.email : user.username , _id:user._id }, process.env.JWT_SECRET, {expiresIn:'24h'});

        return res.status(200)
        .json({message:'Login successfully',success:true ,token:jwtToken, user:{username:user.username,email:user.email}});

    } catch (error) {
        return res.status(500)
        .json({message:'Internal Server Error',success:false,error});
    }
};



module.exports = {
    signup,
    login
}