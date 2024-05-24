import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Siggnup = (props) => {
  const [credentials , setCredentails] = useState({ name:"" ,email:"", password:"",cpassword:"" })
  const nevigate = useNavigate();
  const handleSubmit = async(e) =>{
    e.preventDefault();
   const  {name,email,password} = credentials;
    const response =await fetch("api/auth/createuser", {
      
      method:'POST',
      headers:{
          'Content-Type' : 'application/json'
         
      },
      body: JSON.stringify({name,email,password})
    });
  
  
    const json = await response.json()
    console.log(json);
    
        //save the authtoken and redirect
        if(json.success){
        localStorage.setItem('token',json.authtoken);
        nevigate("Loggin");

        }
        else{
          alert("User With this Email already exist");
        }
   
   }
   const onChange =(e)=>{
    setCredentails({...credentials,[e.target.name] : e.target.value})
   }
  return (
    <div className='container'>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>

  </div>
  <div classname="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name ="email" onChange={onChange} aria-describedby="emailHelp"/>
   
  </div>
  <div classname="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name ="password" onChange={onChange} id="password"/>
  </div>
  <div classname="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name ="cpassword" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
  
}

export default Siggnup
