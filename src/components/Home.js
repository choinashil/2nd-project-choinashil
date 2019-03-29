import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import Footer from './Footer';
import './Home.scss';

const { google } = global;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: 0,
      lng: 0,
      distance: '',
      alertMessage: ''
    };
    this.input = React.createRef();
  }

  async componentWillMount() {
    console.log('home will mount');
    const { closeMenuTab, askUserLocation } = this.props;
    closeMenuTab();
    askUserLocation();
  }

  componentDidMount() {
    console.log('home did mount');

    this.searchBox = new google.maps.places.SearchBox(this.input.current);
    this.searchBoxListener = this.searchBox.addListener('places_changed', this._onPlacesChanged);    
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('home did update');
  }

  componentWillUnmount() {
    google.maps.event.removeListener(this.searchBoxListener);
  }

  _onPlacesChanged = () => {
    const places = this.searchBox.getPlaces();

    if (places.length) {
      const lat = places[0].geometry.location.lat();
      const lng = places[0].geometry.location.lng();
      const address = places[0].formatted_address;
      console.log('latlng', lat, lng);
  
      this.setState({ 
        address, 
        lat,
        lng,
        alertMessage: ''
      });
    } else {
      this.setState({
        alertMessage: '다시 검색해주세요'
      });
    }
  }

  _onInputEnter(e) {
    if (e.keyCode === 13) {
      console.log('enter');
    }
  }

  
  _onInputClick() {
    this.input.current.select();
  }

  _onAddressChange(e) {
    if (!e.target.value) {
      this.setState({
        lat: 0,
        lng: 0
      });
    } 
    this.setState({ 
      address: e.target.value,
      alertMessage: ''
    });
  }

  async _useCurrentPosition() {

    const { getCurrentAddress } = this.props;
    const { lat, lng, address } = this.props.userInfo;

    if (!address) {
      const address = await getCurrentAddress(lat, lng);
      console.log('after get current address', address);
      this.setState({ 
        address, 
        lat,
        lng,
        alertMessage: ''
      });
    } else {
      this.setState({ 
        address, 
        lat,
        lng,
        alertMessage: ''
      });
    }
  }
  
  _onRadioSelect(e) {
    console.log('e',e.target.value);
    this.setState({ distance: e.target.value });
  }

  async _onSearch() {
    console.log('props', this.props);
    const { searchCourses, history } = this.props;
    const { lat, lng, distance} = this.state;
    console.log('clicked!', lat, lng, distance);  
    const allFormsAreFilled = this._checkForms();
    const api = `/results?lat=${lat}&lon=${lng}`;

    
    if (allFormsAreFilled) {
      // searchCourses(lat, lng, distance);
      distance ? history.push(`${api}&distance=${distance}`) : history.push(api);
    }
  }

  _checkForms() {
    const { lat, lng } = this.state;
    if (!lat || !lng) {
      this.setState({ alertMessage: '위치를 입력해주세요'});
      return false;
    } else {
      return true;
    }
  }

  render() {
    const bgImage = {
      backgroundImage: 'url(https://content.nike.com/content/dam/one-nike/en_us/season-2018-fl/Running/NRC/FA18_071118_RN_Peg_Turbo_Announce_NRC_Desktop_P1.png.transform/full-screen/FA18_071118_RN_Peg_Turbo_Announce_NRC_Desktop_P1.png)'
    };
    const { userName, lat } = this.props.userInfo;
    const { address, alertMessage } = this.state;

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
          <div className="Home-section-form">
            <div className="Home-section-form-location" >
              <div>
                <div>
                  <div>위치</div>
                  { alertMessage ? 
                    <div className="alert">
                      <i className="fas fa-exclamation-triangle"></i>
                      <div>{alertMessage}</div>
                    </div>
                    : null
                  }
                </div>
                { lat ? 
                  <div onClick={this._useCurrentPosition.bind(this)}>
                    <i className="fas fa-map-marker-alt" />
                    <span>현재 위치 사용</span>
                  </div>
                  : null
                }
              </div>
              <input type="text" ref={this.input} name="location" 
                placeholder="위치 검색" 
                onClick={this._onInputClick.bind(this)}
                onChange={this._onAddressChange.bind(this)}
                onKeyDown={this._onInputEnter.bind(this)}
                value={address}
              />
            </div>
            <div>거리
              <div className="Home-section-form-distance">
                <label>
                  <input type="radio" name="distance" value="short"
                    onChange={this._onRadioSelect.bind(this)}
                  />
                    1~4km
                </label>
                <label>
                  <input type="radio" name="distance" value="mid" 
                    onChange={this._onRadioSelect.bind(this)}
                  />
                    5~9km
                </label>
                <label>
                  <input type="radio" name="distance" value="long" 
                    onChange={this._onRadioSelect.bind(this)}
                  />
                    10km+
                </label>
              </div>
            </div>
            <div className="Home-section-form-button">
              <button type="button" onClick={this._onSearch.bind(this)}>검색</button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      </Fragment>
    );
  }
}

export default Home;
