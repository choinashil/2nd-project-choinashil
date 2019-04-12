import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 127.027853,
      lat: 37.525883,
      distance: 0
    };
    this.map = null;
  }

  componentWillMount() {
    const { lng, lat } = this.props.userInfo;
    if (lng && lat) {
      this.setState({ lat, lng });
    }
  }

  componentDidMount() {
    const { mapboxgl, turf } = global;
    const { lat, lng } = this.state;

    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 14
    });

    const geojson = {
      "type": "FeatureCollection",
      "features": []
    };

    const linestring = {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": []
      }
    };

    this.map.on('load', () => {
      this.map.addSource('geojson', {
        "type": "geojson",
        "data": geojson
      });

      this.map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojson',
        paint: {
          'circle-radius': 2.5,
          'circle-color': '#f97a35'
        },
        filter: ['in', '$type', 'Point']
      });

      this.map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojson',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#f97a35',
          'line-width': 4
        },
        filter: ['in', '$type', 'LineString']
      });

      this.map.on('click', e => {
        const features = this.map.queryRenderedFeatures(e.point, { layers: ['measure-points'] });

        if (geojson.features.length > 1) geojson.features.pop();

        if (features.length) {
          const id = features[0].properties.id;
          geojson.features = geojson.features.filter(function(point) {
            return point.properties.id !== id;
          });
        } else {
          const point = {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                e.lngLat.lng,
                e.lngLat.lat
              ]
            },
            "properties": {
              "id": String(new Date().getTime())
            }
          };

          geojson.features.push(point);
        }

        if (geojson.features.length > 1) {
          linestring.geometry.coordinates = geojson.features.map(function(point) {
            return point.geometry.coordinates;
          });

          geojson.features.push(linestring);

          const features = [...geojson.features];
          this._getCoordinates(features);

          const distance = turf.lineDistance(linestring).toLocaleString();
          this._getDistance(distance);
        }
        this.map.getSource('geojson').setData(geojson);
      });
    });

    this.map.on('mousemove', e => {
      const features = this.map.queryRenderedFeatures(e.point, { layers: ['measure-points'] });
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : 'crosshair';
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.course.lat !== this.props.course.lat) {
      this.setState({
        lat: this.props.course.lat,
        lng: this.props.course.lng
      }, () => {this._changeLocation()});
    }
  }

  _changeLocation() {
    const { lat, lng } = this.state;
    this.map.flyTo({
      center: [lng, lat],
      zoom: 14
    });
  }

  _getCoordinates(features) {
    const { getCoordinates } = this.props;
    getCoordinates(features);
  }

  _getDistance(distance) {
    const { getDistance } = this.props;
    getDistance(distance);
  }

  render() {
    return (
      <div id='map' />
    );
  }
}

InputMap.propTypes = {
  course: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  getDistance: PropTypes.func.isRequired,
  getCoordinates: PropTypes.func.isRequired
};

export default InputMap;
