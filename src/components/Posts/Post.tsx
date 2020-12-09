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
    <div key={props.p.id}>
      <p>Author : {props.p.poster.username}</p>
      <p>Content : {props.p.body}</p>
      <p>Posted at : {props.p.postDate}</p>
      <p>Comments </p>
      <Comment comments={props.p.comments} />
      <input type="text" placeholder="Your post" onChange={handlePostChange} />
      <button onClick={handleSendPost} >Send</button>
    </div >

  )
}

export default Post