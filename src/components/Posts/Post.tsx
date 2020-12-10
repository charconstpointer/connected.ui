import React from "react";
import { useState } from "react";
import CreateNewPostComment from "../../requests/CreateNewPostComment";
import Comment from './Comment'

const Post = (props: any) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(token!?.length > 0);
  const [post, setPost] = useState<string>();
  const handlePostChange = (e: any) => {
    setPost(e.target.value)
  }
  const handleSendPost = async () => {
    console.log("post")
    const response = await fetch(`https://localhost:5001/groups/${props.groupId}/posts/${props.p.id}/comments`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(new CreateNewPostComment(post!))
    })
    if (response.status !== 200) {
      console.error("nope!")
      return
    }

  }
  return (
    <div className="post mt-2 mb-2" key={props.p.id}>
      <p>Author : {props.p.poster.username}</p>
      <p>Content : {props.p.body}</p>
      <p>Posted at : {props.p.postDate}</p>
      <Comment comments={props.p.comments} />
      <div className="input-group mt-2 mb-2">
        <div className="input-group-prepend">
          <span className="input-group-text">🤔</span>
        </div>
        <textarea onChange={handlePostChange} placeholder="Your comment" className="form-control " aria-label="With textarea"></textarea>
      </div>
      {/* <input type="text" placeholder="Your post" onChange={handlePostChange} /> */}
      <button className="btn btn-primary btn-block" onClick={handleSendPost} >Add comment</button>
    </div >

  )
}

export default Post