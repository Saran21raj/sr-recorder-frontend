import HeaderSignIn from "../header/header";
import  Axios from "axios";
import { useEffect, useState } from "react";
import "./VideosList.css"
import ListVideos from "./listVideos/ListVideos";
import Loader from "../loader/Loader"
const awsListUrl=process.env.REACT_APP_AWS_LIST_URL;
function  Videoslist(){
    const [arr,setArr]=useState([]);
    const [isLoading,setLoading]=useState(true);
        useEffect(()=>{
            const emailId=localStorage.getItem("emailId");
            Axios.post(awsListUrl,{emailId:emailId}).then((response)=>{
                setArr(response.data.Contents.splice(1));
                setLoading(false);
            }).catch(()=>{
                <h1>Error Retreiving Videos</h1>
            });
        },[])
    return(
    <>
    <HeaderSignIn/>
    {
        isLoading ?(<Loader/>): arr.length===0 ? <h1>No Videos Found</h1> :(
            <div className="listViewOuterContainer">
                {arr.map((name)=>(<ListVideos name={name}/>))}
            </div>)
    }
    
    
    </>
    )
}

export default Videoslist;