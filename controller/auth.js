const Student = require('../modal/Student');
const Teacher = require('../modal/Teacher');
var jwt = require('jsonwebtoken') 
var expressJwt = require('express-jwt')


exports.signupStudent = (req,res) => {

    const student = new Student(req.body);
    student.save((err,student) =>{
        if(err){
            return res.status(400).json({
                err: "Not able to save DB" 
            })
        }
        res.json({
            name : student.name, 
            email: student.email,
            id: student._id
        });
    })
}

exports.signupTeacher = (req,res) =>{

    const teacher = new Teacher(req.body);
    teacher.save((err,teacher) =>{
        if(err){
            return res.status(400).json({
                err: "Not able to save DB" 
            })
        }
        res.json({
            name : teacher.name, 
            email: teacher.email,
            id: teacher._id
        });
    })
}

exports.signinStudent = (req,res) => {

    const {email,password} = req.body;
    Student.findOne({email,password},(err,user) =>{
        
                if(err){
                    return res.status(400).json({
                        error: "User email doesnt exist in DB"
                    })
                }
                else if(!user) {
               return res.json({"message": "Invalid Credentials"})
                } 
           //create token
           const token = jwt.sign({ _id: user._id }, "DMSystem");
           //put token in cookie
           res.cookie("token", token, { expire: new Date() + 9999 });

          //send response to front end
          const { _id, name, email, role } = user;
          return res.json({ token, user: { _id,name,email,role}})                      
    })
}

exports.signinTeacher = (req,res) =>{

    const {email,password} = req.body;
    Teacher.findOne({email,password},(err,user) =>{
        
                if(err){
                    return res.status(400).json({
                        error: "User email doesnt exist in DB"
                    })
                }
                else if(!user) {
               return res.json({"message": "Invalid Credentials"})
                } 
           //create token
           const token = jwt.sign({ _id: user._id }, "DMSystem");
           //put token in cookie
           res.cookie("token", token, { expire: new Date() + 9999 });

          //send response to front end
          const { _id, name, email, role } = user;
          return res.json({ token, user: { _id,name,email,role}})                      
    })

}

// Protected Route 
exports.isSignedIn= expressJwt({
    secret: 'DMSystem', 
    userProperty: "auth",
    algorithms: ['sha1', 'RS256', 'HS256'],
}); 


// custom middleware 

exports.isAuthenticated = (req,res, next) => {
    let checker= req.profile && req.auth && req.auth && req.profile._id == req.auth._id; 
    if(!checker)  
    {
        return res.status(403).json({
            error: "Access DENied"
        });
    }
    next();
  }; 
  
exports.isAdmin = (req,res, next) => {
    if(req.profile.role===0) 
    {
        return res.status(403).json({
            error: "You are not an Admin Access denied"
        })
    }  
      next();
    };

exports.signout = (req,res)=>{
    res.clearCookie('token'); 
     res.json({
         message : "user is signout"
     });
     };