const JWT=require ("jsonwebtoken");


module.exports =async(req,res,next)=>{
    const token =req.header('x-auth-token');
    if (!token){
        return res.status(400).json({
            "errors":[{
                "msg":"No token found",
            }]
        })
    }
   

  
    try {
        let admin = await JWT.verify(token,"my_secret_key")
        req.admin=admin.username
        next()
    } catch (error) {
        return res.status(400).json({
            "errors":[{
                "msg":"Token invalid",
            }]
        })  
    }
}