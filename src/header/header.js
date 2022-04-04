import "./header.css"
import {Link,useNavigate} from "react-router-dom";
function HeaderSignIn(props)
{
    const navigate=useNavigate();
    const signOut=()=>{
        localStorage.clear();
        navigate("/home")
    }
    const name=localStorage.getItem("name");

    return(
    <>
        <div className="signInHeader">
            <div className="signInDiv-icon">
                    <span className="signInIcon">SR</span>
            </div>
            <div className="signInName">
                <h1> Hi {name}</h1>
            </div>
            <div className="signInOptions">
                <Link to ="/recorder">
                    <button className="signInOptionsButton">RECORD</button>
                </Link>
                <Link to="/videoslist">
                    <button className="signInListVideosButton" >MY VIDEOS</button>
                </Link>
                <button className="signInOptionsButton" onClick={signOut}>SIGN OUT</button>
            </div>
        </div>
    </>)
}
export default HeaderSignIn;