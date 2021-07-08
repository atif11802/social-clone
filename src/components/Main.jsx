import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Post from './Post'
import {db} from "../firebase";
import firebase from "firebase"
import Upload from './Upload';
import Profile from './Profile';
import { useSelector } from 'react-redux';
import "../styles/Main.css"
import Chat from './Chat';

function Main() {

    const [posts, setPosts] = useState([
    
    ])
const state = useSelector(state => state)


	useEffect(() => {
     const cleanUp =  db.collection("posts")

     .orderBy("timestamp", "desc")
     .onSnapshot((snapshot) => 
       
            setPosts(snapshot.docs.map(doc =>
          
                (
                {
                    id:doc.id,
                    data:doc.data(),
                }
            )
            
            ))
                )


               

        return ( )=>{
            cleanUp();
        }   
    }, [state])


    
   
console.log(posts)
  

    return (
        <div>
            <Navbar />
            <Profile />
            <Upload />
            
            <div className="main">
                <div className="main__left">
                {posts ? (
						posts.map((post) => (
							<Post
								code={post.id}
								key={post.id}
								post={post}
							/>
						))
					) : (
						""
					)}

                </div>
                <div className="main__right">
                    <Chat />
                </div>

            </div>
            


                
            
           
        </div>
    )
}

export default Main
