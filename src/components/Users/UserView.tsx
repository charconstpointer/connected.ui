const UserView = (props: any) => {
  return (
    <div className="container">
      <div className="row">
        <p>Hi {props.username}</p>
      </div>
      <div className="row">
        <p>How are you?</p>
      </div>
    </div>
  )
}

export default UserView;