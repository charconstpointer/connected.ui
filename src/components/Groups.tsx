import React, { useEffect, useState } from "react";
import GroupModel, { fromJson } from "../models/GroupModel";
import CreateNewGroup from '../requests/CreateNewGroup'
import GroupList from './GroupList'

export const Groups = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groups, setGroups] = useState<GroupModel[]>([]);
  const [fetched, setFetched] = useState(false);

  const fetchGroups = async () => {
    console.log('uef')

    const response = await fetch("https://localhost:5001/groups")
    console.log(response);

    const data = await response.json();
    console.log(data);

    const gs = data.map((gr: any) => fromJson(gr))
    setGroups(g => [...gs])
    setFetched(true)
    console.log(groups)
  }
  useEffect(() => {
    fetchGroups()
  }, [])


  const handleGroupNameChange = (ev: any) => {
    setGroupName(ev.target.value);
  }
  const handleDescriptionChange = (ev: any) => {
    setDescription(ev.target.value)
  }
  const handleCreateGroup = async () => {
    console.log(groupName, description)
    const request = new CreateNewGroup(groupName, description);
    const response = await fetch("https://localhost:5001/groups", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(request)
    })

    if (response.status !== 500) {
      fetchGroups()
    }
  }

  return (
    <div>
      {!fetched ?
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div> : groups.length > 0 ?
          <GroupList groups={groups} />
          :
          <p>nope</p>

      }


      <div className="create-group mt-5 shadow-sm p-3 mb-5 bg-white rounded">
        <p className="lead">Nothing that suits your interests? Create your own group!</p>
        <div className="container mb-5 mt-5">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Group name</span>
            </div>
            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={handleGroupNameChange} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
            </div>
            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={handleDescriptionChange} />
          </div>
          <a onClick={handleCreateGroup} className="btn btn-primary btn-block" href="#">Create</a>
        </div>
      </div>
    </div>

  )
}

export default Groups;