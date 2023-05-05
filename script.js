
mapboxgl.accessToken = 'pk.eyJ1IjoiamRjYW1wb2xhcmdvIiwiYSI6ImNreHMzZXh4cTRyOGcydW80aWcyc2ZrMXMifQ.SqgAQ26kdjR4jA4EcGnWCQ';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  // style: 'mapbox://styles/mapbox/light-v11',
  attributionControl: false,
  // add created by me to the right bottom corner

  center: [-88.228340, 40.110558], // starting position [lng, lat]
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

// old code
// const popupContent = {
//   'marker1': '<h3>Illini Innovations</h3><p>1234 Innovation Drive</p>',
//   'marker2': '<h3>Illini Innovations</h3><p>Description of the place goes here.</p><p><a href="https://example.com">Learn more</a></p><ul><li>Similar place 1</li><li>Similar place 2</li><li>Similar place 3</li></ul><button onclick="showStreetView()">Street View</button>',
//   'marker3': '<h3>DRES</h3><p>1234 Innovation Drive</p>',
//   'PLATO': '<h3>PLATO</h3><p>1234 Innovation Drive</p>',

// };


// new code easier to add more info about the popup
const popupContent = {
  'marker1': `
    <h3>Illini Innovations</h3>
    <p>1234 Innovation Drive</p>
  `,
  'marker2': `
    <h3>Illini Innovations</h3>
    <p>Description of the place goes here.</p>
    <p><a href="https://example.com">Learn more</a></p>
    <ul>
      <li>Similar place 1</li>
      <li>Similar place 2</li>
      <li>Similar place 3</li>
    </ul>
    <button onclick="showStreetView()">Street View</button>
  `,
  'marker3': `
    <h3>DRES</h3>
    <p>1234 Innovation Drive</p>
  `,
  'PLATO': `
    <h2>PLATO</h2>
    <p>PLATO (Programmed Logic for Automated Teaching Operations) was an innovative computer-based education system developed at the University of Illinois at Urbana-Champaign in the 1960s. It allowed students to interact with course materials on a computer, providing them with immediate feedback and personalized instruction. The system was ahead of its time, and its influence can still be seen today in the widespread use of educational technology in classrooms around the world.</p>    

    <p>If you're interested in learning more about the history of PLATO, you can check out the University of Illinois's online archive:</p>
    <p><a href="https://archives.library.illinois.edu/blog/university-archives/the-history-of-plato-the-worlds-first-computer-based-education-system/">https://archives.library.illinois.edu/blog/university-archives/the-history-of-plato-the-worlds-first-computer-based-education-system/</a></p>
    `,

    'BCL': `
    <h2>Biological Computer Laboratory</h2>
    <p>The Biological Computer Laboratory (BCL) was a research laboratory at the University of Illinois at Urbana-Champaign from 1958 to 1974. It was founded by Heinz von Foerster, a professor of electrical engineering, and funded by the Advanced Research Projects Agency (ARPA), a division of the U.S. Department of Defense. The BCL was a pioneer in the field of cybernetics, which is the study of how systems regulate themselves and communicate with each other. The lab's research focused on the intersection of biology and technology, and it produced many innovations in the fields of artificial intelligence, robotics, and computer science.</p>

    <p> Learn <a href="BCL LINK" target="_blank">more</a>.
    `

};





map.on('mousemove', (e) => {
  document.getElementById('info').innerHTML =
  // `e.point` is the x, y coordinates of the `mousemove` event
  // relative to the top-left corner of the map.
  JSON.stringify(e.point) +
  '<br />' +
  // `e.lngLat` is the longitude, latitude geographical position of the event.
  JSON.stringify(e.lngLat.wrap());
  });


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
  addMarker([-88.22808440781152, 40.10924072528232], popupContent['marker2']);
  addMarker([-88.22609183428881, 40.11211559903376], popupContent['PLATO']);
  addMarker([-88.22609183428881, 40.11211559903380], popupContent['PLATO']);
  addMarker([-88.22609183428881, 40.11211559903237], popupContent['PLATO']);
  addMarker([-88.22609183428881, 40.13], popupContent['PLATO']);
  addMarker([-88.22817558660483, 40.11100133492316], popupContent['BCL']);



 






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

  

});


