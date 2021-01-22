import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupModel from "../../models/GroupModel";
import PostModel, { postFromJson } from "../../models/PostModel";
import CreateNewPost from '../../requests/CreateNewPost'
import { Post as POST } from "../../utils/api";
import Post from '../Posts/Post'
import { Validator, ValidatorError } from '../../validators/Validator'
import { isLoggedIn } from "../../utils/logged";
import ErrorDisplay from "../Errors/ErrorDisplay";

const Group = () => {
  let params: any = useParams();
  const [group, setGroup] = useState<GroupModel>();
  const [errors, setErrors] = useState<any[]>([]);
  const [post, setPost] = useState<string>();

  const id = params.id;

  const fetchGroup = async () => {
    const response = await fetch(`https://localhost:5001/groups/${id}`)
    const data = await response.json();
    const posts = data.posts.map((x: any) => postFromJson(x));
    const g = new GroupModel(data.id, data.name, data.tags, posts, []);
    setGroup(g);
  }

  useEffect(() => {
    console.log(localStorage.getItem("username"))
    fetchGroup();
  }, []);

  const handlePostChange = (e: any) => {
    e.preventDefault();
    setPost(e.target.value)
  }
  const validator = new Validator()
    .addStep<string>(p => p?.trim().length > 0, "post cannot be empty or all whitespace", "text")
  const handleSendPost = async () => {
    const result = validator.validate(post);
    if (!result.ok) {
      setErrors([...errors, ...result.errors.map(e => e)])
      console.log("notookkkk", errors, result);

      return
    }
    const response = await POST(`https://localhost:5001/groups/${group?.id}/posts`, new CreateNewPost(post!))
    if (response.status !== 200) {
      // setErrors([...errors, "Could not send your post 😭"])
      // return
      const errMsg = await response.json()
      setErrors([new ValidatorError(false, errMsg.Message, "server")])
    }
    fetchGroup()
    setErrors([])
  }
  return (
    <div className="container posts" >
      <h1 className="display-3 pb-5 pt-5">{group?.name}</h1>
      {!isLoggedIn() ? <p className="lead mt-3">🙊 You are in read-only mode, login to gain more features</p> : null}
      {group?.tags.map(t => <span className="badge badge-secondary">{t} </span>)}
      {group?.posts.length === 0 ? <p>no posts</p> : null}
      {group?.posts.map((p: PostModel) => {
        console.log(p)
        return <Post p={p} groupId={group.id} />
      })}
      {isLoggedIn() ? <div className="row">
        <div className="input-group mt-2 mb-2">
          <div className="input-group-prepend">
            <span className="input-group-text">📜</span>
          </div>
          <textarea onChange={handlePostChange} className="form-control " aria-label="With textarea"></textarea>
          <ErrorDisplay errors={errors} for='text' />
        </div>
        <button onClick={handleSendPost} className="btn btn-primary btn-block">Add new post 🖋</button>
        <div className="row mt-1">
          <ErrorDisplay errors={errors} for='server' />
        </div>
      </div> : null
      }
    </div>
  )
}

export default Group;