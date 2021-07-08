import { Avatar, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Profile.css";
import {db , storage} from '../firebase';
import firebase from "firebase";

const Profile = () => {
	const state = useSelector((state) => state);
    const [image, setImage] = useState(null);

    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

   
  
       
        const dpchange =(e)=>{
            e.preventDefault();
            
            
                const uploadTask = storage.ref(`dp/${image.name}`).put(image);
                
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        
                    },
                    (error) =>{
                        console.log(error);
                        alert(error.message);
                    },
                    () => {storage
                        .ref("dp")
                        .child(image.name)
                        .getDownloadURL()
                        .then((url) => {

                            const user = firebase.auth().currentUser;
        
                            user.updateProfile({
                             
                              photoURL: url
                            }).then(() => {
                              // Update successful
                              console.log("success")
                              // ...
                            }).catch((error) => {
                              // An error occurred
                              // ...
                              console.log("error")
                            });  
                              
                        });
                        
                    }
                )
            
            
           
            
            setImage(null);
        }
        
    

        

    
    

	return (
		<div className="profile">
			<div className="profile__left">
				<Avatar
					alt={state.user.displayName}
					src={state.user.photoURL}
				/>
				<h1>{state.user.displayName}</h1>
			</div>

			<div className="profile__right">
				<form>
					<p>change profile picture</p>
                    <input  onChange = {handleChange}  type="file"  />
                    {
                        image? <Button onClick={dpchange} type="submit" variant="contained" color="primary">
                        Change DP
                      </Button>:""
                    }
                   
				</form>
			</div>
		</div>
	);
};

export default Profile;
