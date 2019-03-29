import { mapboxAccessToken } from '../config/mapboxToken';

export const Map = (longitude, latitude, distance, getDistance, getCoordinates) => {
    const { mapboxgl, turf } = global;

    mapboxgl.accessToken = mapboxAccessToken;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 13
    });
    
    // mapbox://styles/mapbox/dark-v10

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
    
    map.on('load', () => {
      map.addSource('geojson', {
        "type": "geojson",
        "data": geojson
      });

      map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojson',
        paint: {
          'circle-radius': 3,
          'circle-color': '#000'
        },
        filter: ['in', '$type', 'Point']
      });

      map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojson',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#000',
          'line-width': 2.5
        },
        filter: ['in', '$type', 'LineString']
      });

      
      
      map.on('click', e => {

        const features = map.queryRenderedFeatures(e.point, { layers: ['measure-points'] });

        // Remove the linestring from the group
        // So we can redraw it based on the points collection
        if (geojson.features.length > 1) geojson.features.pop();
        
        // Clear the Distance container to populate it with a new value
        // distanceContainer.innerHTML = '';
        
        // If a feature was clicked, remove it from the map
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
          getCoordinates(features);
          
          // Populate the distanceContainer with total distance
          distance = turf.lineDistance(linestring).toLocaleString();

          getDistance(distance);
        }
        map.getSource('geojson').setData(geojson);
      });

    });
    
    map.on('mousemove', function (e) {
      const features = map.queryRenderedFeatures(e.point, { layers: ['measure-points'] });
      // UI indicator for clicking/hovering a point on the map
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : 'crosshair';
    });

    return map;
};
