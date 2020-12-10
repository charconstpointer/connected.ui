import React from "react";

const Comment = (props: any) => {
  return (
    <div className="container comments shadow-sm p-3 mb-5 bg-white rounded">
      <div className="row">
        <div className="col">
          <h5>Comments 📖</h5>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {props.comments.map((c: any) => {
          return (
            <li className="list-group-item" key={props.comments.indexOf(c)}>{c.content}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default Comment;