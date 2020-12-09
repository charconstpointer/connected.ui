const Login = () => {
  return(
    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className="register mt-3 mb-5">
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Login</span>
              </div>
              <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Password</span>
              </div>
              <input type="password" className="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Email</span>
              </div>
              <input type="email" className="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" />
            </div>
            <a href="#" className="btn btn-primary btn-block">Login</a>
          </div>
        </div>
  )
}

export default Login;