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
    <div>
      <h1>{group?.name}</h1>
      <h4>{group?.tags}</h4>
      <p>Posts</p>
      {group?.posts.map((p: PostModel) => {
        console.log(p)
        return <Post p={p} groupId={group.id} />
      })}
      <input type="text" placeholder="Your post" onChange={handlePostChange} />
      <button onClick={handleSendPost} >Send</button>
    </div>
  )
}

export default Group;