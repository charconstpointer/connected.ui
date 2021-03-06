import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateNewPostComment from "../../requests/CreateNewPostComment";
import { isLoggedIn } from "../../utils/logged";
import { Get as GET, Post as POST } from '../../utils/api'
import { Validator, ValidatorError } from "../../validators/Validator";
import ErrorDisplay from "../Errors/ErrorDisplay";
import PostModel, { postFromJson } from "../../models/PostModel";

const Post = (props: any) => {
  const [post, setPost] = useState<PostModel>();
  const [postMessage, setPostMessage] = useState<string>();
  const handlePostChange = (e: any) => {
    setPostMessage(e.target.value)
  }
  const [errors, setErrors] = useState<any[]>([]);
  const validator = new Validator();
  validator
    .addStep<string>(c => c.length > 0, "comment cannot be null", "comment")
    .addStep<string>(c => c.trim().length > 0, "comment cant be whitespace", "comment")
  useEffect(() => {
    if (post === undefined) {
      setPost(props.p)
    }
  }, []);
  const handleSendPost = async () => {
    const result = validator.validate(postMessage as string);
    if (!result.ok) {
      result.errors.forEach(err => console.error(err.reason))
      setErrors([...errors, ...result.errors.map(e => e.reason)])
      return
    }
    const response = await POST(`https://localhost:5001/groups/${props.groupId}/posts/${props.p.id}/comments`, new CreateNewPostComment(postMessage!))
    if (response.status !== 200) {
      console.error("nope!")
      return
    }
    fetchPost()
    setErrors([])
  }
  const fetchPost = async () => {
    const response = await GET(`https://localhost:5001/groups/${props.groupId}/posts/${props.p.id}`);
    if (!response.ok) {
      console.error("could not fetch post")
      const errMsg = await response.json()
      setErrors([new ValidatorError(false, errMsg.Message, "server")])
    }
    const data = await response.json();
    console.log(data)
    const post = postFromJson(data);
    setPost(post);
  }
  return (
    <div className="container mt-5 shadow p-3 mb-5 bg-white rounded">
      <div className="post shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row d-flex justify-content-between">
          <div className="col">
            <Link to={`/users/${post?.poster.username}`} >{post?.poster.username}</Link>
          </div>
          <div className="col"><span>{post?.postDate.toString().substring(0, 10)}</span></div>
        </div>
        <div className="row">
          <div className="col mt-1 mb-1">
            <span>
              {post?.body}
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
              {post?.comments.map((c: any) => {
                return (
                  <li className="list-group-item" key={post?.comments.indexOf(c)}>
                    <div className="container">
                      <div className="row">
                        {post?.poster.username}
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

      <div className="row mt-1">
        <ErrorDisplay errors={errors} for='server' />
      </div>
    </div >
  )
}

export default Post