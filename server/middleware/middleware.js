const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
    console.log(req.url.split("?")[0])

      if (req.url.split("?")[0] === "/users/signup/byemail" || req.url.split("?")[0] === "/users/login/byemail"){ next()}else{
      
      const token =  req.headers.authorization.split(" ")[1];
     
      
      if (token && String(token) !== "null"){
          console.log(token)
          if(jwt.verify(token, process.env.JWT_KEY)){
              req.decode = jwt.decode(token)
              console.log(req.decode)
              
            next();
          }else{
              res.status(403).json({message: "token not authorized"})
          }
      }else{
          res.status(403).json({message: "No token, not authorized"})
      }}

};

const generateToken = (name, email, id) => {
  console.log(name, email, id);
  const token = jwt.sign(
    { name: name, email: email, id: id },
    process.env.JWT_KEY,
    {
      expiresIn: "1day",
    }
  );
  return token;
};

module.exports = { generateToken, authorize };
