import { useState } from "react";
import { Link } from "react-router-dom";
import CreateNewPostComment from "../../requests/CreateNewPostComment";
import { isLoggedIn } from "../../utils/logged";
import { Post as POST } from '../../utils/api'
import { Validator } from "../../validators/Validator";
import ErrorDisplay from "../Errors/ErrorDisplay";

const Post = (props: any) => {
  const [post, setPost] = useState<string>();
  const handlePostChange = (e: any) => {
    setPost(e.target.value)
  }
  const [errors, setErrors] = useState<string[]>([]);
  const validator = new Validator();
  validator
    .addStep<string>(c => c.length > 0, "comment cannot be null")
    .addStep<string>(c => c.trim().length > 0, "comment cant be whitespace")

  const handleSendPost = async () => {
    const result = validator.validate(post as string);
    if (!result.ok) {
      result.errors.forEach(err => console.error(err.reason))
      setErrors([...errors, ...result.errors.map(e => e.reason)])
      return
    }
    const response = await POST(`https://localhost:5001/groups/${props.groupId}/posts/${props.p.id}/comments`, new CreateNewPostComment(post!))
    if (response.status !== 200) {
      console.error("nope!")
      return
    }
    setErrors([])
  }

  return (
    <div className="container mt-5 shadow p-3 mb-5 bg-white rounded">
      <div className="post shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row d-flex justify-content-between">
          <div className="col">
            <Link to={`/users/${props.p.poster.username}`} >{props.p.poster.username}</Link>
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
      <div className="container comments shadow-sm bg-white rounded">
        <div className="row">
          <div className="col-12 mb-3">
            <h5>Comments 📖</h5>
          </div>
          <div className="col">
            <ul className="list-group list-group-flush">
              {props.p.comments.map((c: any) => {
                return (
                  <li className="list-group-item" key={props.p.comments.indexOf(c)}>
                    <div className="container">
                      <div className="row">
                        {props.p.poster.username}
                      </div>
                      <div className="row">
                        {c.content}
                      </div>
                    </div>
                  </li>
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

      <ErrorDisplay errors={errors} />
    </div >
  )
}

export default Post