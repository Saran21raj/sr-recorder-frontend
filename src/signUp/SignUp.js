/* eslint-disable default-case */
import {useState} from 'react';
import './SignUp.css';
import Axios from 'axios';
const validateEmail =RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
function SignUpForm(props){
    // State values of User Details
    const [signUpValues,setSignUpValues]=useState({
        firstName:'',
        lastName:'',
        emailId:'',
        password:''
    })
    // State values of Error Details
    const [signUpErrors,setSignUpErrors]=useState({
        firstName:'',
        emailId:'',
        password:''
    })
    // State value of Email already Exits
    const [emailErr,setEmailErr]=useState(true);
    // State value of checking valid details label
    const[validDetails,setvalidDetails]=useState(true);
    // State value of account created label
    const[isAccountCreated,setAccountCreated]=useState(true);
    // Loader state value
    const[enableLoader,setLoader]=useState(true);
    // Signup url
    const signupurl=process.env.REACT_APP_SIGNUP_URL;

    const handleChange=({target:{name,value}})=>{
      setEmailErr(true);
      setvalidDetails(true);
      setAccountCreated(true);
        switch (name){
            case "firstName":{
                if(value.length<2){
                    setSignUpErrors (prevState=>({...prevState,[name]:"Firstname is required"}))
                }
                else
                {
                    setSignUpErrors (prevState=>({...prevState,[name]:""}))
                }
                break;
            }
            case "emailId":{
                if(!validateEmail.test(value))
                {
                    setSignUpErrors (prevState=>({...prevState,[name]:"Email id is invalid"}))
                }
                else
                {
                    setSignUpErrors (prevState=>({...prevState,[name]:""}))
                }
                break;
            }
            case "password":{
                if(value.length<5)
                {
                    setSignUpErrors (prevState=>({...prevState,[name]:"Password length should be more than 5 characters"}))
                }
                else
                {
                    setSignUpErrors (prevState=>({...prevState,[name]:""}))
                }
                break;
            }
        }
        setSignUpValues(prevState=>({...prevState,[name]:value}))
    }
    const handleSubmit =(event)=>{
        
        setLoader(false);
        event.preventDefault();
        if(signUpErrors.firstName===""&&signUpErrors.emailId===""&&signUpErrors.password==="")
        {
            //Axios request to user signup
            Axios.post(signupurl,{
            firstName:signUpValues.firstName,
            lastName:signUpValues.lastName,
            emailId:signUpValues.emailId,
            password:signUpValues.password}).then((response)=>{
            setSignUpValues({firstName:"",lastName:"",emailId:"",password:""})
            setLoader(true);
            setAccountCreated(false);
            setTimeout(()=>{
                props.change();
            },1500)
            }).catch((err)=>{
                if(err.statuscode===400){
                    setLoader(true);
                    setEmailErr(false);
                }
                
            })
            
        }
        else{
            setLoader(true);
            setvalidDetails(false);
        }
    };
    return(
    <>
        <form>
            <div className='outer-box'>
                <h1 className='signUp-LoginLabel'>CREATE YOUR ACCOUNT</h1>
                <div className='signUp-InputField-Containers'>
                    <div className='div1'>
                    <div className='signUp-InputField'>
                      <div className='signupinner-box'>
                        <label htmlFor="firstName" className='signUp-LabelLogin'>FIRST NAME</label>
                            <input 
                                name="firstName"
                                type="text"
                                id="firstName"
                                value={signUpValues.firstName}
                                className='signUp-InputField-EditBox'
                                onChange={handleChange}/>
                      </div>
                            <p className='signUpErrors'>{signUpErrors.firstName}</p>
                    </div>
                    <div className='signUp-InputField'>
                      <div className='signupinner-box'>
                      <label htmlFor="lastName" className='signUp-LabelLogin'>LAST NAME</label>
                        <input 
                            name="lastName"
                            type="text"
                            id='lastName'
                            value={signUpValues.lastName}
                            className='signUp-InputField-EditBox'
                            onChange={handleChange}/>
                      </div>
                    </div>
                    </div>
                    <div className='div1'>
                    <div className='signUp-InputField'>
                    <div className='signupinner-box'>
                    <label htmlFor="email" className='signUp-LabelLogin'>EMAIL ID</label>
                        <input 
                            name="emailId"
                            type="email"
                            id='email'
                            value={signUpValues.emailId}
                            className='signUp-InputField-EditBox'
                            onChange={handleChange}/>
                    </div>
                    {
                        
                        signUpErrors.emailId.length!==0 ? ( <p className='signUpErrors'>{signUpErrors.emailId}</p>) 
                        :(<p className='signUpErrors' disabled={emailErr}>Emaild already exists</p>)
                    }
                    </div>
                    <div className='signUp-InputField'>
                    <div className='signupinner-box'>
                    <label htmlFor="password" className='signUp-LabelLogin'>PASSWORD</label>
                        <input 
                            name="password"
                            type="password"
                            id="password"
                            value={signUpValues.password}
                            className='signUp-InputField-EditBox'
                            onChange={handleChange}/>
                    </div>
                        <p className='signUpErrors'>{signUpErrors.password}</p>
                    </div>
                    </div>
                    <div className='signup-buttonbox'>
                        <button className='signUpSubmitButton' onClick={handleSubmit}>SIGN UP</button>
                        <div className='signup-loader' disabled={enableLoader}>
                            <div className="snippet" data-title=".dot-flashing">
                                <div className="stage">
                                    <div className="dot-flashingsignup"></div>
                                </div>
                            </div>
                        </div>
                        <p className='signup-uploaded' disabled={isAccountCreated}>Account Created</p>
                    </div>
                        <p className='validdetails' disabled={validDetails}>Please Enter Valid Details</p>
                </div>
            </div>
        </form>
    </>
    )
}

export default SignUpForm;