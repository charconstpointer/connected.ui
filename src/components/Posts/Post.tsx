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
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col">
          {props.p.poster.username}
        </div>
        <div className="col-8">
          {props.p.body}
        </div>
        <div className="col-2">
          {props.p.postDate.substring(0, 10)}
        </div>
      </div>
      <Comment comments={props.p.comments} />
      <div className="input-group mt-2 mb-2">
        <div className="input-group-prepend">
          <span className="input-group-text">🤔</span>
        </div>
        <textarea onChange={handlePostChange} placeholder="Your comment" className="form-control " aria-label="With textarea"></textarea>
      </div>
      <button className="btn btn-primary btn-block" onClick={handleSendPost} >Add comment</button>
    </div>
  )
}

export default Post