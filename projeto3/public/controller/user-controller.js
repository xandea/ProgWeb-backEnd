const DB = require('../model/DB'),
    jwt = require('jsonwebtoken');

exports.postLogin = async (req,res)=>{
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i
    if (req.body.senha!=="" && emailRegex.test(req.body.email)){
        try{
            let value = await DB.buscarUsuario('user', req.body.email, req.body.senha)
            //res.json(value)
            const token = jwt.sign({
                login: req.body.email
            }, 'segredo...');
            //local.setItem('valor',token);
            res.json({ token: token });
            //console.log(value)
            }catch(error){
                console.log(error)
            }  
        }else{
            console.log("erroUsuario")
        }
        //res.end()
}

exports.postRegistro = async (req,res)=>{
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i
    if (req.body.senha!=="" && emailRegex.test(req.body.email)){
        try {           
            value = await DB.cadastrarUsuario('user',req.body.email,req.body.senha);
                //localStorage.setItem('@login/email', email)
                //history.push("/exchange")   
        } 
        catch (error) { 
                console.log(error)  
        }
    }else{
        console.log("email e senha errado")
        }
        //res.end()  
    }

exports.getProtegido = ensureToken, (req,res)=>{
    jwt.verify(req.token, 'segredo...', (err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                text: 'protegido',
                data: data
            });
        }
    });
}    

function ensureToken(req,res,next){
    const bearerHeader = req.header('authorization')
    console.log(bearerHeader)
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
       console.log("erroHeader");
       res.sendStatus(403); 
    }
}    