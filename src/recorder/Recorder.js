import {useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import "./Recorder.css"
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client} from "@aws-sdk/client-s3";
import  Axios from "axios";
import HeaderSignIn from "../header/header";
function  Recorder()
{
  //State value for recorded video default it has been set as demo
  const [videoDetails,setVideoDetails]=useState({
    videoName:"demo"
  });
  const [divSubmit,setDivSubmit]=useState(true);
  const [divUpload,setDivUpload]=useState(true);
  const[enableLoader,setLoader]=useState(true);

  // Upload url
  const awsUploadUrl=process.env.REACT_APP_AWS_UPLOAD_URL;
  //State value for setting directory name to store the recorded video
  const [awsDetails,setAwsDetails]=useState({
    directoryName:''
  })
  // Download button function
  const  downloadRecording = () =>{
    let pathName='';
    if(videoDetails.videoName!=="demo"){
      pathName = videoDetails.videoName;
    }
    try {
          const link = document.createElement("a");
          link.href = mediaBlobUrl;
          link.download = pathName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } 
        catch (err) 
        {
          // console.error(err);
        }
  }
  const handleChange=({target:{value}})=>{
    // console.log(videoDetails)
    setVideoDetails({videoName:value})
    setDivSubmit(true);
    setDivUpload(true);
  }
  const handleSubmit=({target:{value}})=>{
    // console.log(videoDetails);
    setDivSubmit(false);
  }
  const {startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({ screen: true,video: false,audio:false,
        onStop:(url,blob)=>{
          // console.log("On stop recording");
          setDivUpload(true);
          setDivSubmit(true);
          const myFile = new File([blob], "demo.mp4", { type: 'video/mp4' });
          // console.log("myFile",myFile);
          window.video=myFile;
          // console.log(window.video);
          const emailId=localStorage.getItem('emailId');
          // console.log(emailId);
          Axios.post(awsUploadUrl,{emailId:emailId}).then((response)=>{
              // console.log(response.data);
              setAwsDetails({directoryName:response.data});
          })
        }
      });
      const  uploadToDrive=()=>{
        setLoader(false);
          const recordedVideo=window.video
          const creds={
          accessKeyId:process.env.REACT_APP_AWS_ACCESS_ID,
          secretAccessKey:process.env.REACT_APP_AWS_ACCESS_KEY}
          // console.log(videoDetails);
            const target = { Bucket:process.env.REACT_APP_AWS_BUCKET_NAME, Key:`${awsDetails.directoryName}/${videoDetails.videoName}.mp4`, Body: recordedVideo};
            try {
              const parallelUploads3 = new Upload({
              client: new S3Client({ region:process.env.REACT_APP_AWS_REGION,credentials:creds}),
              leavePartsOnError: false, // optional manually handle dropped parts
              params: target,
              });
            parallelUploads3.on("httpUploadProgress", (progress) => {setLoader(true); setDivUpload(false);});
            parallelUploads3.done();
            }
            catch (e) {
            // console.log(e);
            }
        }
      return (<>
      <HeaderSignIn />
        <div>
          <button  className="recorder-Start-Button"  onClick={ startRecording}>START RECORDING</button>
          <button  className="recorder-Stop-Button"  onClick={stopRecording}>STOP RECORDING</button>
          <p className="recorder-Download-Hint1">Before Download Please Enter Your File Name In The Box Given Below</p>
          <button  className="recorder-Download-Button" onClick={downloadRecording}>DOWNLOAD</button>
          <input className="recorder-EditText" type="text" value={videoDetails.videoName} onChange={handleChange}/>
          <button  className="recorder-Submit-Button" onClick={handleSubmit}>SUBMIT</button>
          <div className="submit-span" disabled={divSubmit}>
              <p >Submitted</p>
          </div>
          <button  className="recorder-Upload-Button" onClick={uploadToDrive}>UPLOAD</button>
          <div className="recorder-loader" disabled={enableLoader}>
            <div className="snippet" data-title=".dot-flashing">
              <div className="stage">
                <div className="dot-flashing"></div>
              </div>
            </div>

          </div>
          <div className="upload-span" disabled={divUpload}>
              <p className="uploaded-label">Uploaded</p>
          </div>
          <div className="videoPlayer-div">
            <video  className="videoPlayer" src={mediaBlobUrl} controls autoPlay loop />
          </div>
        </div>
        </>
      );
}

export default Recorder;