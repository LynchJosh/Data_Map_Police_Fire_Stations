// Creating map object
var myMap = L.map("map", {
    center: [42.3601, -71.0589],
    zoom: 11
  });
  
// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
var hoods = "static/data/Boston_Neighborhoods.geojson";

var police = "static/data/Boston_Police_Stations.geojson";

var fire = "static/data/Fire_Departments.geojson";

// Get our GeoJSON data using d3.json

d3.json(hoods).then(function(data) {
    L.geoJson(data).addTo(myMap);
});



d3.json(police).then(function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        onEachFeature: function(feature,layer){
            layer.bindPopup(feature.properties.NAME);
        }
    }).addTo(myMap);

    }
);



d3.json(fire).then(function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        onEachFeature: function(feature,layer){
            layer.bindPopup(feature.properties.LOCNAME);
        }
    }).addTo(myMap);

    }
);
