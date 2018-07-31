import jwt from "jsonwebtoken";
import config from "../config";
import User from "../sequelize/sequelize";
import bcrypt from 'bcrypt-nodejs';
import express from "express"

const Route = express.Router()


Route.post ('/regist',(req, res) => {
    const username = req.body.username
    const password = req.body.password 

    bcrypt.genSalt(10 , (error ,salt) => {
        if(error) return res.status(500).json({message : "salt create error" , token : null})
        else{
            var hashpw = bcrypt.hashSync(password , salt)
            User.create({
                username : username,
                password : hashpw
            }).then(user => {
                var token = jwt.sign(
                    {
                        username : username
                    }, config.secret , {
                        algorithm : 'HS256',
                        expiresIn : 10000
                    }
                )
                res.status(200).json({message : "User Create" , token : token})
            })
        }
    })

})

Route.post('/login',(req,res) => {
    const username = username
    const password = password

    User.findOne({
        where : {
            username : username
        }
    }).then(result => {
        if(result === null) return res.status(400).json({ message : "User Not Exist" , token : null})
        else {
            const pwvalid = bcrypt.compareSync(password , result.password)
            if(!pwvalid) return res.status(401).json({ message : "Password Not" ,token : null})
            const token = jwt.sign(
                {
                    username : username
                } , config.secret , {
                    algorithm : 'HS256',
                    expiresIn : 10000
                }
            )
            return res.status(204).json({ message : "Login Success" , token : token }) 
        }
    })
})


module.exports = Route
