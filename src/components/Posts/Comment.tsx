import React from "react";

const Comment = (props: any) => {
  return (
    <div className="comments">
      <h5 className="lead">Comments</h5>
      <ul className="list-group list-group-flush">
        {props.comments.map((c: any) => <li className="list-group-item" key={props.comments.indexOf(c)}>{c.content}</li>)}
      </ul>
    </div>
  )
}

export default Comment;