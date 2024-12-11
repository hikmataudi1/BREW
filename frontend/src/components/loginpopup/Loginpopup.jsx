import React, { useEffect, useState } from 'react'
import './Loginpopup.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import {auth,provider,fireStore} from '../../../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import { addDoc, collection } from "@firebase/firestore";
import {toast} from 'react-toastify'
const Loginpopup = ({setShowLogin,setShowLoginButton,setLoggedin,url}) => {
 
  const [email,setEmail]=useState(localStorage.getItem("email")||"")
  const [name,setName]=useState(localStorage.getItem('name')||"")

  useEffect(()=>{
    if(localStorage.getItem("email") && localStorage.getItem("name")){
      setShowLogin(false)
      setShowLoginButton(false)
      setLoggedin(true)
    }
  },[])

  const sendEmail = async (email, name) => {
    try {
      const response = await axios.post(
        `${url}/api/user/ebookmail`,
        { email, name },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data.message);
      toast.success('Email sent successfully!')
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('There was an issue sending the email. Please try again later.');
    }
  }

  const signInWithGoogle =async ()=>{
    try{
      const response = await signInWithPopup(auth,provider)
      const ref = collection(fireStore,"clients")
      const clientData={
        name:response.user.displayName
        ,email:response.user.email
      }

      await addDoc(ref,clientData)

      setName(response.user.displayName)
      setEmail(response.user.email)
    
      localStorage.setItem("name", response.user.displayName)
      localStorage.setItem("email", response.user.email)
      alert("Signed in successfully")

      await sendEmail(response.user.email,response.user.displayName)

      setShowLogin(false)
      setShowLoginButton(false)  
    
    } catch(error){
      console.error("Error signing in:", error);
      alert("There was an error signing in, please refresh and try again.");
    }
  }
  return (
    <div className='login-popup'>
        <div className="login-popup-container">
            <div className="login-popup-title">
                <h2>Login </h2>
                <img src={assets.cross_icon} alt="" onClick={()=>setShowLogin(false)} />
            </div>
            <div className="google-signin-form">
                    <h2>Sign in to get your free coffee guide and receive all updates </h2>
                    <button className='signin' onClick={signInWithGoogle}>Sign in with google</button>
                    <br/><br/>
                </div>
        </div>
    </div>
  )
}

export default Loginpopup