const UserView = (props: any) => {
  return (
    <div className="container">
      <div className="row mt-3 mb-3">
        <h1 >Hey, {props.username}</h1>
      </div>
      <div className="row mb-1">
        <h2 >How are you? ☃️</h2>
      </div>
    </div>
  )
}

export default UserView;