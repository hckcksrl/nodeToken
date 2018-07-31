import express from "express";
import jwt from "jsonwebtoken";
import config from "../config";
const Route = express.Route()



Route.post('/verify', (req, res , next) => {
    
    var token = req.headers.authorization.split(' ')[1]
    
    if(!token){
        return res.status(403).json({message : "Token is null"})
    }
    jwt.verify(token , config.secret , (err , decode) => {
        if(err){
            return res.status(401).send("message : authentication error")
        }else{
            next()
        }
    })
})

module.exports = Route