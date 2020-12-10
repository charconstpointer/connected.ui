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
    <div className="container mt-5 shadow p-3 mb-5 bg-white rounded">
      <div className="post mt-5 shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-sm-1"> <span className="">{props.p.poster.username}</span>
          </div>
          <div className="col"><span>{props.p.postDate.substring(0, 10)}</span></div>
        </div>
        <div className="row">
          <div className="col mt-1 mb-1">
            <span>
              {props.p.body}
            </span>
          </div>
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
    </div >
  )
}

export default Post