import { useState } from "react"
import { useHistory } from "react-router-dom";
import GroupModel from '../models/GroupModel'

const GroupList = (props: any) => {
  const [search, setSearch] = useState("");
  let history = useHistory();
  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }
  const handleJoinGroup = (groupId: number) => {
    history.push(`/groups/${groupId}`)
  }
  return (
    <div className="container">
      <div className="row list-group mt-5 shadow-sm p-3 mb-5 bg-white rounded">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">🔍</span>
          </div>
          <input type="text" className="form-control" onChange={handleSearchChange} placeholder="Search by keywords or tags" aria-label="Search"
            aria-describedby="basic-addon1" />
        </div>

        <ul className="list-group list-group-flush">
          {props.groups.filter((g: GroupModel) => g.name.includes(search)).map((g: GroupModel) => {
            return (
              <li className="list-group-item">
                <p>{g.name}</p>
                <button className="btn btn-primary" onClick={() => handleJoinGroup(g.id)}  >Join group</button>
              </li>
            )
          })}
        </ul>
      </div >
    </div>

  )
}

export default GroupList