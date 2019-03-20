import React, { Component, Fragment } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import Footer from './Footer';
import './Home.scss';

class Home extends Component {
  componentDidMount() {
    const { closeMenuTab, verifyToken } = this.props;
    closeMenuTab();
    verifyToken();
  }
  
  render() {
    const bgImage = {
      backgroundImage: 'url(https://content.nike.com/content/dam/one-nike/en_us/season-2018-fl/Running/NRC/FA18_071118_RN_Peg_Turbo_Announce_NRC_Desktop_P1.png.transform/full-screen/FA18_071118_RN_Peg_Turbo_Announce_NRC_Desktop_P1.png)'
    };
    const { userName } = this.props.userInfo;

    return ( 
      <Fragment>
      <MenuContainer />
      <div className="Home">
        <div className="Home-header" style={bgImage}>
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
