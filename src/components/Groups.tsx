import React, { useEffect, useState } from "react";
import GroupModel, { fromJson } from "../models/GroupModel";
import CreateNewGroup from '../requests/CreateNewGroup'
import { Post as POST } from "../utils/api";
import { isLoggedIn } from "../utils/logged";
import { Validator, ValidatorError } from "../validators/Validator";
import ErrorDisplay from "./Errors/ErrorDisplay";


import GroupList from './GroupList'

export const Groups = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groups, setGroups] = useState<GroupModel[]>([]);
  const [fetched, setFetched] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);

  const fetchGroups = async () => {
    const response = await fetch("https://localhost:5001/groups")
    const data = await response.json();
    const gs = data.map((gr: any) => fromJson(gr))
    setGroups(g => [...gs])
    setFetched(true)
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
  const handleTagsChange = (ev: any) => {
    const value = ev.target.value as string;
    const tokens = value.split(",").map(x => x.trim());
    setTags(tokens);
    console.log(tokens)
  }
  const handleCreateGroup = async () => {
    console.log(groupName, description)
    const request = new CreateNewGroup(groupName, description, tags);
    const validator = new Validator();
    validator
      .addStep<CreateNewGroup>(g => g.description.length > 2, "description should be longer than 2 characters", "description")
      .addStep<CreateNewGroup>(g => g.name.length > 2, "name should be longer than 2 characters", "name")
    const validationResult = validator.validate(request);
    if (!validationResult.ok) {
      validationResult.errors.forEach(err => console.error(err.reason))
      setErrors([...errors, ...validationResult.errors.map(e => e)])
      return
    }
    const response = await POST("https://localhost:5001/groups", request);
    if (response.status != 200) {
      const errMsg = await response.json()
      setErrors([new ValidatorError(false, errMsg.Message, "server")])
      return
    }
    setErrors([])
    fetchGroups()
  }

  return (
    <div>
      <h1 className="display-3 pb-5 pt-5">Available groups</h1>
      {!fetched ?
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div> : groups.length > 0 ?
          <GroupList groups={groups} />
          :
          <p>nope</p>
      }

      {isLoggedIn() ? <div className="create-group mt-5 shadow-sm p-3 mb-5 bg-white rounded">
        <p className="lead">Nothing that suits your interests? Create your own group!</p>
        <div className="container mb-5 mt-5">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Group name 💁🏽‍♀️</span>
            </div>
            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={handleGroupNameChange} />
          </div>
          <div className="row mt-1">
            <ErrorDisplay errors={errors} for='name' />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Description 📝</span>
            </div>
            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={handleDescriptionChange} />
          </div>
          <div className="row mt-1">
            <ErrorDisplay errors={errors} for='description' />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Tags 🏷</span>
            </div>
            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={handleTagsChange} />
          </div>
          <div className="row mt-1">
            <ErrorDisplay errors={errors} for='tags' />
          </div>
          <button onClick={handleCreateGroup} className="btn btn-primary btn-block">Create</button>
          <div className="row mt-1">
            <ErrorDisplay errors={errors} for='server' />
          </div>
        </div>
      </div> : null}
    </div>

  )
}

export default Groups;