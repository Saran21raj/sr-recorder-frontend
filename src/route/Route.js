import { BrowserRouter,Routes,Route} from "react-router-dom";
import SignInForm from "../signIn/SignIn";
import SignUpForm from "../signUp/SignUp";
import Home from "../intro/home";
import Recorder from "../recorder/Recorder";
import Videoslist from "../videosList/VideosList";

function PrivateRoute({ children }){
    const token=localStorage.getItem("token");
    if(token){
        return children;
    }
    else{
        return (<>
        <h1>PLEASE SIGNIN</h1>
        </>)
    }
}
function RoutingPage(){
    return(<>
    <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<SignUpForm/>}/>
            <Route path="/signin" element={<SignInForm/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/recorder" element={<PrivateRoute> <Recorder/> </PrivateRoute>}/>
            <Route path="/videoslist" element={<PrivateRoute> <Videoslist/> </PrivateRoute>}/>
            <Route path='*' element={<Home/>}/>
        </Routes>
    </BrowserRouter></>)
}

export default RoutingPage;