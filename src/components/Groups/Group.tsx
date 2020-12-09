import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupModel from "../../models/GroupModel";
import UserModel from "../../models/UserModel";

const Group = () => {
  let params: any = useParams();
  const [group, setGroup] = useState<GroupModel>();
  const id = params.id;
  useEffect(() => {
    const fetchGroup = async () => {
      const response = await fetch(`https://localhost:5001/groups/${id}`)
      const data = await response.json();
      const g = new GroupModel(data.id, data.name, data.tags, [], []);
      setGroup(g);
    }
    fetchGroup();
  }, []);
  return (
    <div>
      <h1>{group?.name}</h1>
      <h4>{group?.tags}</h4>

    </div>
    // <div>
    //   <ul className="list-group list-group-flush">
    //     <li className="list-group-item">
    //       <div className="post mb-3" >
    //         <p>Posted at : 2020-12-12 17:23</p>
    //         <div className="comments">
    //           <h5 className="lead">Comments</h5>
    //           <ul className="list-group list-group-flush">
    //             {/* comments */}
    //           </ul>
    //         </div>
    //       </div>
    //     </li>
    //   </ul>

    //   <a href="#collapse1" data-toggle="collapse" className="btn btn-primary btn-block mt-3">Comment</a>
    //   <div id="collapse1" className="input-group mt-3 panel-collapse collapse">
    //     <input type="text" className="form-control" placeholder="Your comment" aria-label="Your comment"
    //       aria-describedby="basic-addon2" />
    //     <div className="input-group-append">
    //       <button className="btn btn-outline-secondary" type="button">Send</button>
    //     </div>
    //   </div>
    // </div>


  )
}

export default Group;