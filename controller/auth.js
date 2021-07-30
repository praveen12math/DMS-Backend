const Student = require('../modal/Student');
const Teacher = require('../modal/Teacher');
var jwt = require('jsonwebtoken') 
var expressJwt = require('express-jwt');
const crypto = require("crypto")

const nodemailer = require("nodemailer")
const sendGridTransport = require("nodemailer-sendgrid-transport")

const  transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: "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"
    }
}))
//const StudentLeave = require('../modal/StudentLeave');



//Student Register
exports.signupStudent = (req,res) => {

    const student = new Student(req.body);

    const {email, rollno, name, password} = req.body;

    if(name === "" || rollno === "" || email === "" || password === ""){
        return res.status(400).json({
            error: "All fields required"
        })
    }

    Student.findOne({email}, (err, user) => {
if(!user){
    
    Student.findOne({rollno}, (error, roll) => {
        if(!roll){
            student.save((err,student) => {
                if(err){
                    return res.status(400).json({
                        err: "Not able to save DB" 
                    })
                }

                transporter.sendMail({
                    to:student.email,
                    from:"dms@mail.io",
                    subject:"Welcome",
                    html:`<h1>Welcome ${student.name} to DMS</h1`
                })
                
                res.json({
                    name : student.name, 
                    email: student.email,
                    id: student._id
                });
            })
        }
        else{
            return res.status(400).json({
                error: "Roll no already present"
            })
        }
    })
}
else{
    return res.status(400).json({
        error: "Email is already present, try with another"
    })
}
    })  
}


//Teacher Register
exports.addTeacher = (req, res) => {

    const User = new Student(req.body);

    const {email, role} = req.body;

    if(email === undefined || role === undefined || email === "" || role === ""){
        return res.status(400).json({
            err: "All fields required"
        })
    }

    Student.findOne({email}, (err, user) => {
if(!user){

            

            User.save((err,user) => {
                if(err){
                    return res.status(400).json({
                        error: err
                    })
                }

                transporter.sendMail({
                    to:user.email,
                    from:"dms@mail.io",
                    subject:"Welcome",
                    html:`<h1>Welcome to DMS. <br>To access your account Please reset your password<br>
                    To reset password click the <a href="http://localhost:3000">link.</a>
                    </h1`
                })
                
                res.json(user);
            })
}
    

else{
    return res.status(400).json({
        err: "Email is already present, try with another"
    })
} 
    })
}

//Sign in Student
exports.signinStudent = (req,res) => {
    const {email,password} = req.body;

    if(email === "" || password === ""){
        return res.status(400).json({
            error: "All field required "
        })
    }

    Student.findOne({email},(err,user) => {
        
                if(err || !user){
                    return res.status(400).json({
                        error: "User doesnt exist"
                    })
                }
                
                if(!user.authenticate(password)){
                    return res.status(400).json({
                        error: "Bad combination of Email & Password"
                    })
                }

           //create token
           const token = jwt.sign({ _id: user._id }, "DMSystem");
           //put token in cookie
           res.cookie("token", token, { expire: new Date() + 10 });
          //send response to front end
          const { _id, name, email, role, rollno, newUser } = user;
          return res.json({ token, user: { _id,name,email,role, rollno, newUser}})                      
    })
}




// Protected Route 
exports.isSignedIn = expressJwt({
    secret: 'DMSystem', 
    userProperty: "auth",
    algorithms: ['sha1', 'RS256', 'HS256'],
}); 




// custom middleware 
exports.isAuthenticated = (req, res, next) => {

    const userVer = jwt.verify(req.headers.authorization.split(" ")[1], "DMSystem")

    let checker = req.auth && userVer._id === req.auth._id; 
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




    //Signout
exports.signout = (req,res)=>{
    res.clearCookie('token'); 
     res.json({
         message : "user is signout"
     });
     };




exports.getAllTeacherName = (req, res) => {
    Student.find({role:1}).exec((err, teacher) => {
        if(err){
            return res.status(400).json({
                err: "Not able to find" 
            })
        }

        let teacherName = []
        teacher.map(name => (
            teacherName.push(name.name)
        ))

        res.json(teacherName);
    })
}


exports.getAllTeacher = (req, res) => {
    Student.find({role:1}).exec((err, teacher) => {
        if(err){
            return res.status(400).json({
                err: "Not able to find" 
            })
        }

        resData = []

        teacher.map(name => (
            resData.push({
                id: name._id,
                name: name.name,
                email: name.email,
                create: name.createdAt
            })
        ))

        res.json(resData)
    })
}


exports.getAllStudent = (req, res) => {
    Student.find({role:0}).exec((err, student) => {
        if(err){
            return res.status(400).json({
                err: "Not able to find" 
            })
        }

        resData = []

        student.map(name => (
            resData.push({
                id: name._id,
                name: name.name,
                email: name.email,
                rollno: name.rollno,
                year: name.year,
                batch: name.batch,
                create: name.createdAt
            })
        ))

        res.json(resData);
    })
}


//DONE Password Recovery

exports.requestPasswordRecovery = (req, res) => {
    const email = req.body.email

    Student.findOne({email: email}).exec((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Something went wrong" 
            })
        }

        if(!user){
            return res.status(400).json({
                err: "User not exist" 
            })
        }

        crypto.randomBytes(32, (err, buffer) => {
            if(err){
                return res.status(400).json({
                    err: "Something went wrong" 
                })
            }

            const token = buffer.toString("hex")

            user.resetCode = token
            user.expireCode = Date.now() + 3600000

            user.save((err, user) => {
                if(err){
                    return res.status(400).json({
                        err: "Something went wrong" 
                    })
                }

                transporter.sendMail({
                    to:user.email,
                    from:"dms@mail.io",
                    subject:"Reset Password",
                    html:`<h1>Password reset click the <a href="https://dmsonline.herokuapp.com/resetPassword/${token}">link</a>.</h1`
                })

                return res.status(200).json({
                    message: "Reset Link Send Successfully"
                })
            })
        })


    })
}


exports.getUserByresetCode = (req, res, next, id) => {
    Student.findOne({resetCode: id}).exec((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Something went wrong" 
            })
        }

        if(!user){
            return res.status(400).json({
                err: "Inavlid link" 
            })
        }

        if(user.expireCode >= Date.now()){
            req.user = user
            next()
        }
        else{
            return res.status(400).json({
                err: "Link expired" 
            })
        }

    })
}


exports.resetPassword = (req, res) => {
    const user = req.user

    user.password = req.body.password
    user.resetCode = null

    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Something went wrong" 
            })
        }

        return res.status(200).json({
            message: "Password reset Success"
        })
    })
}


//DONE  Update Teaher Details

exports.getTeacherById = (req, res, next, id) => {
    Student.findById(id).exec((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Something went wrong" 
            })
        }

        if(!user){
            return res.status(200).json({
                err: "Not found" 
            })
        }

        req.teacher = user
        next()
    })
}

exports.updateTeacherDetails = (req, res) => {
    const {name} = req.body

    const user = req.teacher
    user.updateOne({name: name, newUser:false}).exec((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Something went wrong" 
            })
        }
        res.json(user)
    })
}


//DONE Delete User

exports.deleteUser = (req, res) => {
    const user = req.teacher

    user.remove((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Something went wrong" 
            })
        }
        res.json(user)
    })
}