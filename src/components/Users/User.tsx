import { useParams } from "react-router-dom";

const User = (props: any) => {
  const { username } = useParams<any>();

  return (
    <div className="container">
      <div className="row user-info container pb-5 pt-5">
        <img src="../img//avatar.png" alt="" className="avatar rounded-circle img-fluid"></img>
        <h1 className="display-3 col col-lg-2">{username}</h1>
      </div>

      <div className="row description">
        <p className="mt-5 mb-5 lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate voluptatibus
        magnam
        vitae eum
        reprehenderit iusto sapiente veritatis temporibus tempora alias sed eius eos, numquam eaque quo sit,
          ducimus dolorum neque.</p>
      </div>

      <div className="row posts mb-5">
        <div className="col-6">
          <p className="display-4">Last posts</p>
          <ul className="list-group list-group-flush mt-5">
            <li className="post list-group-item">Lorem ipsum, dolor sit amet consectetur </li>
            <li className="post list-group-item">Adipisicing elit. Cupiditate voluptatibus </li>
            <li className="post list-group-item">Reprehenderit iusto sapiente veritatis temporibus </li>
            <li className="post list-group-item">Numquam eaque quo sit </li>
            <li className="post list-group-item">Ducimus dolorum neque </li>
          </ul>
        </div>
        <div className="col-6">
          <div className="user-info">
            <p className="display-4">Contact info</p>
            <ul className="list-group list-group-flush mt-5">
              <li className="list-group-item">
                <span>
                  Registered At
            </span>
                <span>2020-10-10 14:32</span>
              </li>
              <li className="list-group-item">
                <span>
                  Instagram
            </span>
                <span>@foobar</span>
              </li>
              <li className="list-group-item">
                <span>
                  Snapchat
            </span>
                <span>@foobar</span>
              </li>
              <li className="list-group-item">
                <span>
                  TwitchTV
            </span>
                <span>@foobar</span>
              </li>

            </ul>
          </div>
        </div>
      </div>

    </div>

  )
}

export default User;