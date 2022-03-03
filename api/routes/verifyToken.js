//initialise token plugin
const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"];;
    console.log(authHeader);
    if(authHeader){
        
     jwt.verify( authHeader,process.env.JWT_SEC, (err,user)=>{
         if(err) res.status(403).json("Token! is not valid!");
         req.user = user;
         next();
     });
    }else{
        return res.status(401).json("You are not authenticated!");
        console.log(authHeader);
        console.log(user);
    }
}


const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
     if(req.user.id === req.params.id || req.user.isAdmin){
         next()
     }else{
         res.status(403).json("You are not allowed to do that!")
     }   
    });
};


const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
     if(req.user.isAdmin){
         next()
     }else{
         res.status(403).json("You are not allowed to do that!")
     }    
    });
};


module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};