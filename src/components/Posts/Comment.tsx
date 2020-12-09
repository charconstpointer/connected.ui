const Comment = (props: any) => {
  return (
    <div>
      <ul>
        {props.comments.map((c: any) => <li key={props.comments.indexOf(c)}>{c.content}</li>)}
      </ul>
    </div>

  )
}

export default Comment;