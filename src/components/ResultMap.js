import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultMap extends Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    const { mapboxgl } = global;
    const { details, baseLat, baseLng } = this.props;
    const { coordinates } = details;

    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

    const geojson = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "properties": {},
          "coordinates": coordinates
        }
      }]
    };

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [baseLng, baseLat],
      zoom: 12
    });

    this.map.on('load', () => {
      this.map.addLayer({
        "id": "LineString",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": geojson
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#f97a35",
          "line-width": 4
        }
      });

      const coordinates = geojson.features[0].geometry.coordinates;

      const bounds = coordinates.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

      this.map.fitBounds(bounds, {
        padding: 30
      });
    });
  }

  render() {
    return (
      <div id='map' />
    );
  }
}

ResultMap.propTypes = {
  baseLat: PropTypes.string.isRequired,
  baseLng: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired
};

export default ResultMap;
