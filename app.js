import express from "express";
import bodyParser from 'body-parser'
import Auth from "./auth/authenticate";
import Verify from "./auth/verify" 
var app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/auth' , Auth)
app.use('/auth' , Verify)

app.listen(4000 , () => {
    console.log("Token Server Running")
})