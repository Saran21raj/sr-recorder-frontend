/* eslint-disable default-case */
import './SignIn.css';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
const validateEmail =RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

function SignInForm() 
{
    // State Values For Signin values
    const [signInValues,setSignInValues]=useState({
        emailId:'',
        password:''
    })
    // State Values for Signin Errors
    const [signInErrors,setSignInErrors]=useState({
        emailId:' ',
        password:' '
    })
    // State value for Email & password Mismatch
    const [misMatchErr,setMisMatchErr]=useState(true);
    // State value for Checking valid Details
    const [validErr,setValidErr]=useState(true);
    // State value for Emailid not found
    const [notFound,setNotFound]=useState(true);
    // api call url
    const signinurl=process.env.REACT_APP_SIGNIN_URL;
    const navigate=useNavigate();

    const handleChange=({target:{name,value}})=>{
        setMisMatchErr(true);
        setValidErr(true);
        setNotFound(true);
        switch (name){
            case "emailId":{
                if(!validateEmail.test(value))
                {
                    setSignInErrors (prevState=>({...prevState,[name]:"Email id is invalid"}))
                }
                else
                {
                    setSignInErrors (prevState=>({...prevState,[name]:""}))
                }
                break;
            }
            case "password":{
                if(value.length>1&&value.length<5)
                {
                    setSignInErrors (prevState=>({...prevState,[name]:"Password length should be more than 5 characters"}))
                }
                else
                {
                    setSignInErrors (prevState=>({...prevState,[name]:""}))
                }
                break;
            }
        }
        setSignInValues(prevState=>({...prevState,[name]:value}))
    }
    const handleSubmit =(event)=>{
        event.preventDefault();
        if(signInErrors.emailId===""&&signInErrors.password===""){
            //Axios request to Login into the user Account
            Axios.post(signinurl,{
                emailId:signInValues.emailId,
                password:signInValues.password}).then((response)=>{
                    const token=response.data.token;
                    localStorage.setItem('token',token);
                    const firstName=response.data.firstName;
                    const emailId=response.data.emailId;
                    localStorage.setItem('emailId',emailId);
                    localStorage.setItem('name',firstName);
                    // console.log("EmailId",emailId);
                    // console.log(response);
                    // console.log(response.status);
                    //If signin is Successfull then it will Redirect to Recorder main page
                    setSignInValues({emailId:"",password:""})
                    if(response.status===200)
                    {
                        navigate(`/recorder`)
                    }
                    
                }).catch((err)=>{
                    if(err.response.status===403){
                        setMisMatchErr(false);
                    }
                    if(err.response.status===400){
                        setNotFound(false);
                    }
            })
        }
        else
        {
            setValidErr(false);
        }
    };
    return(
    <>
        <div className='signIn-Page'>
            <form >
                <div className='signIn-InputFields-Container'>
                    <p className='valid-Error' disabled={validErr}>Please Enter Valid Details</p>
                    <div className='signIn-InputField'>
                        <label className='signIn-LabelLogin'>EMAIL ID</label>
                        <div className='signin-innerbox'>
                        <input 
                            name="emailId"
                            type="email"
                            placeholder='Email'
                            value={signInValues.emailId}
                            className='signIn-InputField-EditBox'
                            onChange={handleChange}/>
                            <p className='signIn-Errors'>{signInErrors.emailId}</p>
                        </div>
                         
                    </div>
                    <div className='signIn-InputField'>
                        <label className='signIn-LabelLogin'>PASSWORD</label>
                        <div className='signin-innerbox'>
                        <input 
                            name="password"
                            type="password"
                            value={signInValues.password}
                            className='signIn-InputField-EditBox'
                            placeholder='Password'
                            onChange={handleChange}/>
                             <p className='signIn-Errors'>{signInErrors.password}</p>
                        </div>
                    </div>
                    <div className='signIn-Button'>
                        <button className='signIn-Login-Button' onClick={handleSubmit}>SIGN IN</button>
                    </div>
                        <p className='login-Error'disabled={misMatchErr}>Email & PassWord Doesn't Match</p>
                        <p className='email-Error' disabled={notFound}>Email is not registered</p>
                </div>
            </form>
        </div>
    </>
    )
}

export default SignInForm;