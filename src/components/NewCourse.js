import React, { Component, Fragment } from 'react';
import MenuContainer from '../containers/MenuContainer';
import HeaderContainer from '../containers/HeaderContainer';
import InputMapContainer from '../containers/InputMapContainer';
import './NewCourse.scss';

const { mapboxgl } = global;
mapboxgl.accessToken = 'pk.eyJ1IjoibmFzaGlsIiwiYSI6ImNqdGhieGNobzJjeXI0NG9icWl0ejNiaTEifQ.8pUKf_VC-XZNb9tcRxJAsQ';

const { google } = global;

class NewCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      address: '',
      title: '',
      description: '',
      locker: '',
      restroom: '',
      gourmet: '',
      alertMessage: ''
    };
    this.input = React.createRef();
    this._onInputChange = this._onInputChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    const { verifyToken } = this.props;
    verifyToken();
    console.log('new course did mount');

    this.searchBox = new google.maps.places.SearchBox(this.input.current);
    this.searchBoxListener = this.searchBox.addListener('places_changed', this._onPlacesChanged);
    // console.log('--searchBox', this.searchBox);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('new course did update');
  }
  

  componentWillUnmount() {
    google.maps.event.removeListener(this.searchBoxListener);
  }


  _onInputClick() {
    this.input.current.select();
  }

  _onPlacesChanged = () => {
    const places = this.searchBox.getPlaces();
    if (places.length) {
      const lat = places[0].geometry.location.lat();
      const lng = places[0].geometry.location.lng();
      const address = places[0].formatted_address;

      const { setNewLatLng } = this.props;
      setNewLatLng(lat, lng);
      this.setState({ address });
    } else {
      this.setState({
        alertMessage: '다시 검색해주세요'
      });
    }
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

  _checkForms() {
    const { distance } = this.props.course;
    const { title, description } = this.state;
    try {
      if (!title) throw '코스 제목을 입력해주세요';
      if (!description) throw '코스 내용을 입력해주세요';
      if (!distance) throw '코스를 지도 위에 표시해주세요';
      return true;
    } catch(err) {
      alert(err);
      return false;
    }
  }

  _onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  async _onSubmit() {
    const { saveNewCourse, resetCourseHistory } = this.props;
    const { userId, userName } = this.props.userInfo;
    const { distance, coordinates } = this.props.course;
    const allFormsAreFilled = this._checkForms();

    if (allFormsAreFilled) {
      const newCourseInfo = {
        userName,
        distance,
        coordinates,
        ...this.state,
        createdAt: new Date().toISOString()
      };
      const result = await saveNewCourse(userId, newCourseInfo);  
      if (result === 'Saved successfully') {
        await resetCourseHistory();
        alert('새로운 코스가 저장되었습니다!');
        this.props.history.push('/');
      }
    }
  }
  
  render() {
    const { userName } = this.props.userInfo;
    const { address, title, description, locker, restroom, gourmet } = this.state;
    const { distance, coordinates } = this.props.course;

    return ( 
      <Fragment>
      <MenuContainer />
      <div className="New-course">
        <div className="New-course-header">
          <HeaderContainer />
        </div>
        <section className="New-course-section">
          <div className="New-course-section-form">
            <div className="New-course-section-form-title">
              <input type="text" name="title" placeholder="코스 제목" className="input-title" onChange={this._onInputChange} value={title} />
            </div>
            <div className="New-course-section-form-searchbox">
              <input type="text" name="search" ref={this.input} 
                value={address}
                placeholder="위치 검색"
                onChange={this._onAddressChange.bind(this)}
                onClick={this._onInputClick.bind(this)}
              />
            </div>
            <div className="New-course-section-form-map">
              <InputMapContainer />
            </div>
            <div className="New-course-section-form-distance">
              <div>거리 {distance}km</div>
            </div>
            <div className="New-course-section-form-description">
              <textarea name="description" placeholder="코스 소개" onChange={this._onInputChange} value={description} />
            </div>
            <div className="New-course-section-form-additional">
              <div>
                <i className="fas fa-shopping-bag"></i>
                <div>짐보관</div>
                <input type="text" name="locker" onChange={this._onInputChange} value={locker} />
              </div>
              <div>
                <i className="fas fa-restroom"></i>
                <div>화장실</div>
                <input type="text" name="restroom" onChange={this._onInputChange} value={restroom} />
              </div>
              <div>
                <i className="fas fa-utensils"></i>
                <div>주변 맛집</div>
                <input type="text" name="gourmet" onChange={this._onInputChange} value={gourmet} />
              </div>
            </div>
            <button type="submit" onClick={this._onSubmit}>공유</button>
          </div>
        </section>
      </div>
      </Fragment>
    );
  }
}

export default NewCourse;
