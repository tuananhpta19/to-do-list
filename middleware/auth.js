const e = require("express");
var userSerive = require("../services/userServices");
var jwt = require("jsonwebtoken")
async function checkUser(req, res, next){
    var user = await userSerive.checkUser(req.body.email);
    if(!user){
        req.user = 1;
       next();
    }else{
        return res.json({
            status: 400,
            message: 'Tai khoan da ton taij vui long tao tai khoan khac'
        })
    }

}

async function checkAuth(req, res, next){
    var token = req.body.token;
    var decodeUser = jwt.verify(token, process.env.JWT_SECRET);
    var user = await userSerive.checkId(decodeUser._id);
    if(user){
        req.user = user;
        next();
    }else{
        return res.json({
            status: 400,
            message: 'Vui long dang nhap'
        })
    }
}

function checkAdmin(req, res, next){
    if(req.user.role === "admin"){
        next()
    }else{
        return res.json({
            status: 400,
            message: 'ban khong co quyen'
        })
    }
}

module.exports = {
    checkUser,
    checkAuth,
    checkAdmin
}