import React, { Component } from 'react';
import './InputMap.scss';
// import { Map } from '../lib/Maps';
// import { ACCESS_TOKEN } from '../config/mapboxToken';

class ResultMap extends Component {
  constructor(props) {
    super(props);  
    this.map = null;
  }

  componentWillMount() {
    console.log('result map will mount');
  }

  componentDidMount() {
    console.log('result map did mount', this.props.results);
    const { mapboxgl } = global;
    const { details, baseLat, baseLng } = this.props.results
    const { coordinates } = details;

    var geojson = {
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

    // mapbox://styles/mapbox/light-v10
    // mapbox://styles/mapbox/streets-v11

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
          "line-color": "#e64141",
          "line-width": 5
        }
      });
       

      
      // Geographic coordinates of the LineString
      var coordinates = geojson.features[0].geometry.coordinates;
      
      // Pass the first coordinates in the LineString to `lngLatBounds` &
      // wrap each coordinate pair in `extend` to include them in the bounds
      // result. A variation of this technique could be applied to zooming
      // to the bounds of multiple Points or Polygon geomteries - it just
      // requires wrapping all the coordinates with the extend method.
      var bounds = coordinates.reduce(function(bounds, coord) {
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

export default ResultMap;
