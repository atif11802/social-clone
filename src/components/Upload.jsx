import React, { useState } from 'react';
import "../styles/Upload.css"
import Button from '@material-ui/core/Button';
import {db,storage} from "../firebase"
import firebase from  "firebase";
import { useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";

function Upload() {

    const state = useSelector(state => state)

   
    const [progress,setProgress] = useState(0);

    const [caption , setCaption] = useState('');
    const [image, setImage] = useState(null);

    const handleChange =(e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    
    const submit =()=>{
 
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                //progresss function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
                
            },
            (error)=>{
                //error
                console.log(error);
                alert(error.message);
            },

        ()=>{
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                db.collection('posts').add({
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    caption:caption,
                    imageUrl:url,
                    userName: state.user.displayName,
                    uid:state.user.uid,
                    displayImage:state.user.photoURL,
                })
               
            
            })

        }
        
        
        )

        setProgress(0);
        setCaption('');
         setImage(null);
        
      
    }
    
    
    return (
        <div className="upload">
             <ProgressBar className="upload__bar" completed={progress} />
            <input value={caption} onChange={(e)=>setCaption(e.target.value)} className="upload__input" type="text" placeholder="caption" />
            <div className="upload__file">
            <input  onChange={handleChange} type="file" className="Upload__img" name="img" accept="image/*"/>
            <Button onClick={submit} variant="contained" color="primary">
              Upload
            </Button>

            </div>
            
        </div>
    )
}

export default Upload
