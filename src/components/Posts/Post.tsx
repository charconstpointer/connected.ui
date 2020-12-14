import { useState } from "react";
import CreateNewPostComment from "../../requests/CreateNewPostComment";
import { isLoggedIn, getToken } from "../../utils/logged";


const Post = (props: any) => {
  const [post, setPost] = useState<string>();
  const handlePostChange = (e: any) => {
    setPost(e.target.value)
  }
  const handleSendPost = async () => {
    const response = await fetch(`https://localhost:5001/groups/${props.groupId}/posts/${props.p.id}/comments`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${getToken()}`
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
          <div className="col-2"> <span className="">{props.p.poster.username}</span>
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
      <div className="container comments shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-12 mb-3">
            <h5>Comments 📖</h5>
          </div>
          <div className="col">
            <ul className="list-group list-group-flush">
              {props.p.comments.map((c: any) => {
                return (
                  <li className="list-group-item" key={props.p.comments.indexOf(c)}>author : {props.p.poster.username} content : {c.content}</li>
                )
              })}
            </ul>
          </div>
        </div>
        {isLoggedIn() ? <div className="row">
          <div className="input-group mt-2 mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text">🤔</span>
            </div>
            <textarea onChange={handlePostChange} placeholder="Your comment" className="form-control " aria-label="With textarea"></textarea>
          </div>
          <button className="btn btn-primary btn-block" onClick={handleSendPost} >Add comment</button>
        </div> : null}
      </div>

    </div >
  )
}

export default Post