import Intro from './Intro'
const Home = () => {
  return(
    <>
    <Intro/>
    <div className="functionality row mt-5 mb-5">
      <div className="func-el col">
        <p className="display-4">👨‍💻</p>
        <p className="display-4">Discover new ideas</p>
      </div>
      <div className="func-el col">
        <p className="display-4">👨‍🏫</p>
        <p className="display-4">Collaborate with your friends</p>
      </div>
      <div className="func-el col">
        <p className="display-4">👩‍🎤</p>
        <p className="display-4">Teach and share your knowledge</p>
      </div>
    </div>
    <div id="demo" className="carousel slide shadow-sm p-3 mb-5 bg-white rounded" data-ride="carousel">
      <ul className="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" className="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul>

      <div className="carousel-inner">
        <div className="func-item carousel-item active">
          <div>
          </div>
        </div>
        <div className="carousel-item">
          <div>
          </div>
        </div>
        <div className="carousel-item">
          <div>
          </div>
        </div>
      </div>

      <a className="carousel-control-prev" href="#demo" data-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </a>
      <a className="carousel-control-next" href="#demo" data-slide="next">
        <span className="carousel-control-next-icon"></span>
      </a>
    </div>
  </>
  )
}

export default Home;