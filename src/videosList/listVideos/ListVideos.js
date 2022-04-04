import "./ListVideos.css";
import axios from "axios";
import {useState} from "react";
function ListVideos(props){
    const awsDeleteUrl=process.env.REACT_APP_AWS_DELETE_URL;
    const videoLink=()=>{
        const url=process.env.REACT_APP_AWS_VIDEO_OPEN_URL;
        const link=url+props.name.Key;
        window.open(link);
    }
    const [isdeleted,setdeleted]=useState(true);
    const deleteLink=async ()=>{
        axios.delete(awsDeleteUrl,{data: {name:props.name.Key}}).then((response)=>{
            setdeleted(false);
            setTimeout(()=>{let elem= document.getElementById(props.name.Key);
             elem.parentNode.removeChild(elem)},1000)
        }).catch(()=>{
            alert("Internal Error")
              })
    }
    return(
    <>
        <div className="listViewContainer" id={props.name.Key}>
            <button className="list" onClick={videoLink}>{props.name.Key}</button>
            <button className="deleteButton" onClick={deleteLink}>DELETE</button>
            <p className="deleted" disabled={isdeleted} >Video Deleted</p>
        </div>
        
    </>)
}

export default ListVideos;