import React from "react"
import Group from '../models/Group'
const GroupList = (props: any) => {

    return (
        <div className="list-group mt-5 shadow-sm p-3 mb-5 bg-white rounded">

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">🔍</span>
                </div>
                <input type="text" className="form-control" placeholder="Search by keywords or tags" aria-label="Search"
                    aria-describedby="basic-addon1" />
            </div>

            <ul className="groups-list">
                {props.groups[0].map((g: Group) => {
                    return <li><a href="#collapse1" key={g.id} className="list-group-item list-group-item-action">{g.name}<span className="badge badge-success">3 Online</span></a></li>
                })}
                {/* <li><a href="#collapse1" data-toggle="collapse" className="list-group-item list-group-item-action">Niderlandzki ster ⚓<span className="badge badge-success">3 Online</span></a></li>
                <li><a href="#collapse1" data-toggle="collapse" className="list-group-item list-group-item-action">dotnet folks 🖥<span className="badge badge-success">23 Online</span></a></li>
                <li><a href="#collapse1" data-toggle="collapse" className="list-group-item list-group-item-action">PHP therapy group 🏥<span className="badge badge-success">33 Online</span></a></li> */}
            </ul>


            <div id="collapse3" className="panel-collapse collapse list-group-item">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><a href="./user.html">User #1</a></li>
                    <li className="list-group-item"><a href="./user.html">User #2</a></li>
                    <li className="list-group-item"><a href="./user.html">User #3</a></li>
                    <li className="list-group-item"><a href="./user.html">User #4</a></li>
                    <li className="list-group-item"><a href="./user.html">User #5</a></li>
                    <li className="list-group-item"><a href="./user.html">User #6</a></li>
                    <li className="list-group-item"><a href="./user.html">User #7</a></li>
                    <a className="btn btn-primary" href="./group.html">Join group</a>
                </ul>
            </div>
            <ul className="pagination mt-3 " >
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
        </div >
    )
}

export default GroupList