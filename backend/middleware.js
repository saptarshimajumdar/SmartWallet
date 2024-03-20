const {jwt_code}= require ('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    const header = req.headers.authorization;
    if( !header || !header.startsWith('Bearer ')){
        res.status(403).json({
            message : "Authorisation failed"
        })
    }else{
        const token = header.split(' ')[1];
        jwt.verify(token, jwt_code,(err,decoded)=>{
            if(err){
                res.status(403).json({
                    message : "Verification failed"
                })
            }else{
                req.userId= decoded.userId;
                console.log("Verification successful");
                next();
            }
        })
    }
} 

module.exports={
    authMiddleware,
}
