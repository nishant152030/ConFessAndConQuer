const jwt = require("jsonwebtoken")
const User = require('../model/user')
const jwtSecret = '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd';


exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt
  console.log(token)
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" })
      } else {
        if (decodedToken.role !== "admin") {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          res.render("admin");
        }
      }
    })
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" })
  }
}



exports.userAuth = (req, res) => {
    const token = req.cookies.jwt
    console.log(token)
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "Basic") {
            return res.status(401).json({ message: "Not authorized" })
          } else {
            res.render("user");
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }



exports.authenticationAuth=(req,res)=>{
    const token = req.cookies.jwt
    console.log(token)
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role == "Basic" ||decodedToken.role == "Admin" ) {
            res.render("user")
          } else {
            res.render("admin");
          }
        }
      })
    } else {
        res.render("register");
    }
}



