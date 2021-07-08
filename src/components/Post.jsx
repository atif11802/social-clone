import { Avatar } from '@material-ui/core'
import React from 'react'
import "../styles/Post.css"

const Post = ({post}) => {


   
    return (
        <div className="post">
            <div className="post__left">
            <div className="post__header">
            <Avatar alt={post.data.displayImage} src={post.data.displayImage} />
                <h3>{post.data.userName}</h3>
            </div>
            <div className="post__img">
                <img src={post.data.imageUrl} alt="" />
            </div>
            <h2>{post.data.caption}</h2>


            </div>
         
            
        </div>
    )
}

export default Post
