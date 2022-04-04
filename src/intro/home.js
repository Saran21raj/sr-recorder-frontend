import "./home.css";
import SignInForm from "../signIn/SignIn";
import SignUpForm from "../signUp/SignUp";
import {useState} from "react";
function Home() {
    const [signUpPage,setsignUpPage]=useState(true);
    const [hasPressed,setpressed]=useState(true);
    const toSignUp=()=>{
        setpressed(false);
    }
    const toSignIn=()=>{
        setpressed(false);
        setsignUpPage(false);

    }
    return ( <>
    <div className="homeouter-box">
        <div className = "homeinner-box" >
            {
                hasPressed ? (<div className="homecolour-box" id="colour">
                <span className="logo">SR</span>
                <p className="sr-label">SCREEN RECORDER</p>
                <p className="login-label">"Login To Start Recording"</p>
                <div className="accountbutton">
                    <button  className="signup-button" onClick={toSignUp}>CREATE ACCOUNT</button>
                    <button className="signup-button" onClick={toSignIn}>SIGN IN</button>
                </div>
            </div>):(<div className="homeaccount-box"> {signUpPage ? <SignUpForm change={toSignIn}/>:<SignInForm/>}</div>)
            }
        </div>
    </div>

        </>)
    }

    export default Home;