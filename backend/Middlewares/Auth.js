// file to ensure the user is authenticated

const jwt = require('jsonwebtoken');    


 const ensureAuthenticated = (req, res, next) =>{
    const token = req.header('authorization');    // Token is expected in the 'Authorization' header
    if (!token){
        return res.status(403)
        .json({ message: 'Access Denied. No token provided.' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach decoded user info to request object
    }catch(err){
        return res.status(401)
        .json({ message: 'Invalid token. Wrong or expired token.' });
    }
    next();
};
 
module.exports = {ensureAuthenticated};