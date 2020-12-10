import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupModel from "../../models/GroupModel";
import PostModel, { postFromJson } from "../../models/PostModel";
import CreateNewPost from '../../requests/CreateNewPost'

import Post from '../Posts/Post'

const Group = () => {
  let params: any = useParams();
  const [group, setGroup] = useState<GroupModel>();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const id = params.id;
  const fetchGroup = async () => {
    const response = await fetch(`https://localhost:5001/groups/${id}`)
    const data = await response.json();
    const posts = data.posts.map((x: any) => postFromJson(x));
    const g = new GroupModel(data.id, data.name, data.tags, posts, []);
    setGroup(g);
  }
  useEffect(() => {
    fetchGroup();
  }, []);
  const [post, setPost] = useState<string>();
  const handlePostChange = (e: any) => {
    setPost(e.target.value)
  }
  const handleSendPost = async () => {
    const response = await fetch(`https://localhost:5001/groups/${group?.id}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(new CreateNewPost(post!))
    })
    if (response.status !== 200) {
      console.error("nope!")
      return
    }
    fetchGroup()
  }
  return (
    <div className="posts" >
      <h1 className="display-3 pb-2 pt-5">{group?.name}</h1>
      {group?.tags.map(t => <span className="badge badge-secondary">{t} </span>)}


      {group?.posts.length === 0 ? <p>no posts</p> : null}
      {group?.posts.map((p: PostModel) => {
        console.log(p)
        return <Post p={p} groupId={group.id} />
      })}
      {/* <input type="text" placeholder="Your post" /> */}
      <div className="input-group mt-2 mb-2">
        <div className="input-group-prepend">
          <span className="input-group-text">📜</span>
        </div>
        <textarea onChange={handlePostChange} className="form-control " aria-label="With textarea"></textarea>
      </div>
      <a href="#" onClick={handleSendPost} className="btn btn-primary btn-block">Add new post 🖋</a>
    </div>
  )
}

export default Group;