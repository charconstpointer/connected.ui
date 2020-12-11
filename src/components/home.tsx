import React from 'react';
import Intro from './Intro'
const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <Intro />
      </div>
      <div className="row">
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
    </div>
  )
}

export default Home;