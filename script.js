
mapboxgl.accessToken = 'pk.eyJ1IjoiamRjYW1wb2xhcmdvIiwiYSI6ImNreHMzZXh4cTRyOGcydW80aWcyc2ZrMXMifQ.SqgAQ26kdjR4jA4EcGnWCQ';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  // style: 'mapbox://styles/mapbox/light-v11',

  center: [-88.228333, 40.110558], // starting position [lng, lat]
  zoom: 15, // starting zoom
  pitch: 45

});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);

// Define an array to hold all the markers
const markers = [];

// Define a Marker class to encapsulate the functionality for a single marker
class Marker {
  constructor(lngLat, popupContent) {
    this.lngLat = lngLat;
    this.popupContent = popupContent;
    this.marker = new mapboxgl.Marker().setLngLat(lngLat);
    this.popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);
    this.marker.setPopup(this.popup);
    this.marker.getElement().addEventListener('click', () => {
      this.popup.addTo(map);
    });
  }

  // Method for adding the marker to the map
  addToMap(map) {
    this.marker.addTo(map);
  }

  // Method for toggling the marker's popup
  togglePopup() {
    this.marker.togglePopup();
  }
}

// Function for adding a new marker
function addMarker(lngLat, popupContent) {
  const marker = new Marker(lngLat, popupContent);
  markers.push(marker);
  marker.addToMap(map);
}

// Define the popup content for each marker
const popupContent = {
  'marker1': '<h3>Illini Innovations</h3><p>1234 Innovation Drive</p>',
  'marker2': '<h3>Illini Innovations</h3><p>Description of the place goes here.</p><p><a href="https://example.com">Learn more</a></p><ul><li>Similar place 1</li><li>Similar place 2</li><li>Similar place 3</li></ul><button onclick="showStreetView()">Street View</button>',
  'marker3': '<h3>DRES</h3><p>1234 Innovation Drive</p>'
};

map.on('style.load', () => {

  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
    (layer) => layer.type === 'symbol' && layer.layout['text-field']
  ).id;


  // Fullscreen control
  map.addControl(new mapboxgl.FullscreenControl());

  // Add the markers to the map
  addMarker([-88.228333, 40.110558], popupContent['marker1']);
  addMarker([-88.22708440781152, 40.10924072528232], popupContent['marker2']);
  addMarker([-88.242912, 40.1034188], popupContent['marker3']);

  // 3D Feature
  map.addLayer(
    {
      'id': 'add-3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',

        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
      }
    },
    labelLayerId
  );

  // button to let me know the exact coordinates of a point double click copy to clipboard 
  // using this format (88.22986857280245,40.11039652664218)
  map.on('dblclick', function (e) {
    console.log(e.lngLat);
    e.lngLat.wrap();
    var lngLat = e.lngLat.wrap();
    var lng = lngLat.lng;
    var lat = lngLat.lat;
    var lngLatString = "(" + lng + "," + lat + ")";
    console.log(lngLatString);
    navigator.clipboard.writeText(lngLatString);
  });


});
