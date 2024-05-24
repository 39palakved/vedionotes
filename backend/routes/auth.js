const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET ='Palakisagood$girl';
// Route 1:create a user using : POST "/api/auth/createuser" . Doesn't require Auth

router.post('/createuser',[
    body('name','Enter A valid name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','password must be atlest 5 character').isLength({ min: 5 }),
],async(req,res)=>{
  let success=false;
    console.log(req.body);
   /* const user = User(req.body);
    user.save()*/
    //if there are error and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
//check whether the user with this email exist already
try{




let user = await User.findOne({email:req.body.email});

if(user){
  return res.status(400).json({success,error:"sorry a user with this email already exist"})
}
//create a new user
const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password,salt) ;
    user = await User.create({
      name :req.body.name,
      password: secPass,
      email : req.body.email,
   
    });
    const data ={
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
   success=true; 
 res.json({success,authtoken});
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
  }
}
  

    //res.send(res.body);
)
//Route 2: Authenticate a user . No login required
router.post('/login',[
  
  body('email','Enter a valid Email').isEmail(),
  body('password','password cannot be blank')
  
],async(req,res)=>{
 let success=false;
  const errors = validationResult(req);
  //if there are error return bad request
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email , password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      success=false;
      return res.status(400).json({error:"please try to login with correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false;
      return res.status(400).json({success,error:"please try to login with correct credentials"});
      
    }
    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
  success=true;  
 res.json({success,authtoken});
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
//Route 3 : Get loggin user details using :post  here login required
router.post('/getuser',fetchuser,async(req,res)=>{
try{
const userid=req.user.id;
const user = await User.findById(userid).select("-password")
res.send(user);
}
catch(error){
 console.error(error.message);
 res.status(500).send("insternal Server Error");

}
})

module.exports = router