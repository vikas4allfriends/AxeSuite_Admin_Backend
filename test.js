
/*with jwt token  */

const express= require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = "secrekey"

app.get('/',(req,res)=>{
  res.json({
    message:'testing  api '
  })
})


app.post('/login',(req,res)=>{
    const user = {
        id:1,
        name:'Pawan',
        email:'test@gmail.com'
    }
    jwt.sign({user},secretKey,{ expiresIn:'300s'},(err,token)=>{
        res.json({
            token
        })
    })
})

app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.send({result:"Invalid Token"})
        }else{
            res.json({
                message:"profile ",
                authData
            })
        }
    })
})

function verifyToken(req,res,next){

    const bearer =req.headers['Authorization'];
    if(typeof bearer !== 'undefined'){
        const bearerhead = bearer.split(' ');
        const token = bearerhead[1];
        req.token = token;
    }else{
        res.send({
            result:'Token is not valid'
        })
    }
}

app.listen(5000,()=>{
  console.log("App is running in port http://localhost:5000");
  
})