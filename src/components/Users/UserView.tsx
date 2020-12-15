import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserInfoModel, { userInfoFromJson } from '../../models/UserInfoModel'

const UserView = (props: any) => {
  const [userInfo, setUserInfo] = useState<UserInfoModel>();
  const fetchUserInfo = async (username: string) => {
    const response = await fetch(`https://localhost:5001/users/0?username=${username}`)
    if (!response.ok) {
      console.log("could not fetch user info")
    }
    const data = await response.json();
    const info = userInfoFromJson(data)
    setUserInfo(info)
  }

  useEffect(() => {
    fetchUserInfo(props.username)
  }, []);
  return (
    <div className="container">
      <div className="row mt-3 mb-3">
        <h1 className="display-3 pb-5 pt-5" >Hey, {props.username} 🙋🏾‍♀️</h1>
      </div>
      <div className="row mb-1">
        <p className="lead" >Your groups</p>
      </div>
      <div className="row">

        <ul className="list-group list-group-flush col-12">
          {userInfo?.groups.map(g =>
            <li className="list-group-item">
              <Link to={`groups/${g.id}`} >
                <p>{g.name}</p>
              </Link>
            </li>)}
        </ul>
      </div>
    </div>
  )
}

export default UserView;