const Student = require('../modal/Student');
const Teacher = require('../modal/Teacher');
var jwt = require('jsonwebtoken') 
var expressJwt = require('express-jwt');
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


//Student Leave Request
// exports.studentLeave = (req, res) => {
//     const leave = StudentLeave(req.body)

//     const {name, roll, subject, cordinator, description} = req.body
    
//     if(name === "" || roll === "" || subject === "" || cordinator === "" || description === ""){
//         return res.status(400).json({
//             error: "All field required"
//         })
//     }

//     leave.save((err, leave) => {
//         if(err){
//             return res.status(400).json({
//                 err: "Something went wrong"
//             })
//         }
//         res.json({
//             message: "Application accepted wait for approve"
//         })
//     })
// }


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
          const { _id, name, email, role, rollno } = user;
          return res.json({ token, user: { _id,name,email,role, rollno}})                      
    })
}



//Sign in Teacher
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