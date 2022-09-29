const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try {
        console.log('Auth req received')
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token,"RANDOM_SECRET_STRING");
        const decodedUserId = decodedToken.userId;
        // if(req.body.userId && req.body.userId != userId){
            console.log("DecodedUserID : "+ decodedUserId)
            console.log("Received UserID : "+ req.body.userId)
        if(req.body.userId && req.body.userId == decodedUserId){
            next();
        }else{
            // console.log(req.body.userId);
            // console.log(token);
            throw 'Invalid request';
        }
    } catch (error) {
        console.log('Auth error occured')
        res.status(401).json({
        error: "You are not authorised to access this resource!"
        });
    }
}