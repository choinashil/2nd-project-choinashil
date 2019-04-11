import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MenuContainer from '../containers/MenuContainer';
import HeaderContainer from '../containers/HeaderContainer';
import InputMapContainer from '../containers/InputMapContainer';
import './NewCourse.scss';

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
    this._onAddressChange = this._onAddressChange.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputClick = this._onInputClick.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    this.searchBox = new google.maps.places.SearchBox(this.input.current);
    this.searchBoxListener = this.searchBox.addListener('places_changed', this._onPlacesChanged);
  }

  componentWillUnmount() {
    google.maps.event.removeListener(this.searchBoxListener);
  }

  _checkForms() {
    const { distance } = this.props;
    const { title, description } = this.state;

    try {
      if (!title) throw new Error('코스 제목을 입력해주세요');
      if (!description) throw new Error('코스 내용을 입력해주세요');
      if (!distance) throw new Error('코스를 지도 위에 표시해주세요');
      return true;
    } catch (err) {
      alert(err.message);
      return false;
    }
  }

  _onAddressChange(e) {
    if (!e.target.value) {
      this.setState({ lat: 0, lng: 0 });
    }

    this.setState({
      address: e.target.value,
      alertMessage: ''
    });
  }

  _onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
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
      this.setState({ alertMessage: '다시 검색해주세요' });
    }
  }

  async _onSubmit() {
    const { distance, coordinates, userId, userName, history, saveNewCourse, resetCourseHistory } = this.props;
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
        history.push('/');
      }
    }
  }

  render() {
    const { address, title, description, locker, restroom, gourmet } = this.state;
    const { distance } = this.props;

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
                <input
                  type="text"
                  name="title"
                  placeholder="코스 제목"
                  value={title}
                  className="input-title"
                  onChange={this._onInputChange}
                />
              </div>
              <div className="New-course-section-form-searchbox">
                <input
                  type="text"
                  name="search"
                  ref={this.input}
                  placeholder="위치 검색"
                  value={address}
                  onChange={this._onAddressChange}
                  onClick={this._onInputClick}
                />
              </div>
              <div className="New-course-section-form-map">
                <InputMapContainer />
              </div>
              <div className="New-course-section-form-distance">
                <div>거리 {distance}km</div>
              </div>
              <div className="New-course-section-form-description">
                <textarea
                  name="description"
                  placeholder="코스 소개"
                  value={description}
                  onChange={this._onInputChange}
                />
              </div>
              <div className="New-course-section-form-additional">
                <div>
                  <i className="fas fa-shopping-bag"></i>
                  <div>짐보관</div>
                  <input
                    type="text"
                    name="locker"
                    value={locker}
                    onChange={this._onInputChange}
                  />
                </div>
                <div>
                  <i className="fas fa-restroom"></i>
                  <div>화장실</div>
                  <input
                    type="text"
                    name="restroom"
                    value={restroom}
                    onChange={this._onInputChange}
                  />
                </div>
                <div>
                  <i className="fas fa-utensils"></i>
                  <div>주변 맛집</div>
                  <input
                    type="text"
                    name="gourmet"
                    value={gourmet}
                    onChange={this._onInputChange}
                  />
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

NewCourse.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.array).isRequired,
  distance: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  resetCourseHistory: PropTypes.func.isRequired,
  saveNewCourse: PropTypes.func.isRequired,
  setNewLatLng: PropTypes.func.isRequired
};

export default NewCourse;
