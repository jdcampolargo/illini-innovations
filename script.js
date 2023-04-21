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



// Add a marker to the map at the specified location
var marker = new mapboxgl.Marker()
    .setLngLat([-88.228333, 40.110558])
    .addTo(map);

// Add a popup to the marker
marker.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>Illini Innovations</h3><p>1234 Innovation Drive</p>'))
    .togglePopup();

// Add a marker to the map at the specified location
var marker = new mapboxgl.Marker()
    .setLngLat([-88.22708440781152, 40.10924072528232])
    .addTo(map);

// Define the content for the popup
var popupContent = '<div class="place-card">' +
    '<h3>Illini Innovations</h3>' +
    '<p>Description of the place goes here.</p>' +
    '<p><a href="https://example.com">Learn more</a></p>' +
    '<ul>' +
    '<li>Similar place 1</li>' +
    '<li>Similar place 2</li>' +
    '<li>Similar place 3</li>' +
    '</ul>' +
    '<button onclick="showStreetView()">Street View</button>' +
    '</div>';

// Create the popup and set its content
var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

// Add an event listener to the marker that opens the popup when clicked
marker.getElement().addEventListener('click', function () {
    popup.addTo(map);
});

// Attach the popup to the marker
marker.setPopup(popup);

// Show the popup when the marker is clicked
marker.togglePopup();

// Function to show the Street View
function showStreetView() {
    // Use the coordinates of the marker to construct the URL for the Street View API
    var streetViewUrl = 'https://www.google.com/maps/@' + marker.getLngLat().lat + ',' + marker.getLngLat().lng + ',15z';
    // Open the Street View URL in a new window
    window.open(streetViewUrl, '_blank');
}




// Add a marker to the map at the specified location
var marker = new mapboxgl.Marker()
    .setLngLat([-88.242912, 40.1034188])
    .addTo(map);

// Add a popup to the marker
marker.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>DRES</h3><p>1234 Innovation Drive</p>'))
    .togglePopup();



map.on('style.load', () => {

    // Insert the layer beneath any symbol layer.
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;

    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
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


// Fullscreen control
map.addControl(new mapboxgl.FullscreenControl());

// Attach a popup to a marker instance
var popup = new mapboxgl.Popup({ offset: 25 }).setText(
    'Illini Innovations'
);

// Create a HTML element for your custom marker
var el = document.createElement('div');
el.id = 'marker';

// Create the custom marker
var marker = new mapboxgl.Marker(el)
    .setLngLat([-88.228333, 40.110558])
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);

// Create a HTML element for your custom marker
var el = document.createElement('div');
el.id = 'marker';


// Show coordinates on click
map.on('click', function (e) {
    var coordinates = e.lngLat;
    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(coordinates.lng + '<br />' + ', ' + coordinates.lat)
        .addTo(map);
});

