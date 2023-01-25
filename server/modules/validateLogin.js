const connection=require('./connection');

function validateLogin(req,res,next) {
    let username=req.body.username;
    let password=req.body.password;
    console.log(username , password);
    connection.query(`SELECT users.username,user_passwords.password FROM users JOIN user_passwords ON users.user_id=user_passwords.user_id WHERE users.username = '${username}' AND user_passwords.password = '${password}';`,(err,result)=>{
                        if(err) console.log(err);
                        console.log(result);
                        if(result.length>0){
                            next();
                            return;
                        }
                        res.status(401).send(false);
                     })
}

module.exports = validateLogin;
