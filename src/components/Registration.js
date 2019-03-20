import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './Registration.scss';

class Home extends Component {  
  render() {

    console.log('Signup props', this.props, 'state', this.state);
    // const { menuTabOpened } = this.props.display;
    // const { userName } = this.props.userInfo;

    return ( 
      <Fragment>
      <div className="Registration">
        <div className="Home-header" style={image}>
          <HeaderContainer />
          <div>
            {userName ? <div className="Home-header-sentence">{userName}님,</div> : null}
            <div className="Home-header-sentence">어디를 달릴까요?</div>
          </div>
        </div>
        <section className="Home-section">
          <form className="Home-section-form">
            <div>위치
              <input type="text" name="location" placeholder="서울시 강남구" className="Home-section-form-location" />
            </div>
            {/* <div>반경
              <input type="range" name="radius" min="1" max="10" step="2" value="5" className="Home-section-form-radius" />
            </div> */}
            <div>거리
              <div className="Home-section-form-distance">
                <div><input type="radio" name="distance" value="short"/>1~4km</div>
                <div><input type="radio" name="distance" value="mid"/>5~9km</div>
                <div><input type="radio" name="distance" value="long"/>10km+</div>
              </div>
            </div>
            <button type="button">검색</button>
          </form>
        </section>
        <Footer />
      </div>
      </Fragment>
    );
  }
}

export default Home;
