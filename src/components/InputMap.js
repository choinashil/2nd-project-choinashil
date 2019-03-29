import React, { Component } from 'react';
import './InputMap.scss';
import { Map } from '../lib/Maps';

class InputMap extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      lng: 127.027853,
      lat: 37.525883,
      distance: 0
    };
    this.map = null;
    this._getDistance = this._getDistance.bind(this);
    this._getCoordinates = this._getCoordinates.bind(this);
  }

  componentWillMount() {
    console.log('input map will mount');
    const { lng, lat } = this.props.userInfo;
    if (lng && lat) {
      this.setState({ lat, lng });
    } 
  }

  componentDidMount() {
    console.log('input map did mount', this.state.lng, this.state.lat);
    const { lat, lng, distance } = this.state;
    this.map = Map(lng, lat, distance, this._getDistance, this._getCoordinates);
  }

  componentDidUpdate(prevProps) {
    console.log('input map did update before', prevProps.course.lat, prevProps.course.lng);
    console.log('input map did update after', this.props.course.lat, this.props.course.lng);

    if (prevProps.course.lat !== this.props.course.lat) {
      this.setState({ 
        lat: this.props.course.lat, 
        lng: this.props.course.lng
      }, () => {this._changeLocation()});
    }
  }

  _changeLocation() {
    const { lat, lng, distance } = this.state;
    this.map.flyTo({
      center: [lng, lat],
      zoom: 13
    });
  }

  _getDistance(distance) {
    const { getDistance } = this.props;
    getDistance(distance);
  }

  _getCoordinates(features) {
    const { getCoordinates } = this.props;
    getCoordinates(features);
  }

  render() {
    return (
      <div id='map' />
    );
  }
}

export default InputMap;
