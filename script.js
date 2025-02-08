// document.in JavaScript is calling an existing element from the HTML.

document.addEventListener("DOMContentLoaded", function() {
    console.log("Notes from the Radiu3 loaded!");

    // Venue cards: when move the mouse over, the card will slightly
    const venueCards = document.querySelectorAll(".venue-card");
    venueCards.forEach(card => {
        card.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.05)";
            this.style.transition = "transform 0.3s ease-in-out";
        });
        card.addEventListener("mouseout", function () {
            this.classList.remove("shadow-lg");
            this.style.transform = "scale(1)";
        });
    });

});

// Initialize Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoiem9lemh1b2xpIiwiYSI6ImNtNnNjeTBoajA2Z2wyd3BwdzhsM200YjgifQ.kjh3gJE9ldgvkDfFnHKSGQ';

const map = new mapboxgl.Map({
    container: 'map', // ID of the div where the map will be placed
    style: 'mapbox://styles/zoezhuoli/cm6segkif005101qs25x0avo9', // Custom basemap from Mapbox Studio
    center: [-79.3962, 43.6629], // Centered on University of Toronto
    zoom: 12
});

// Ensure the map container has a fixed height
document.getElementById('map').style.height = '500px';
document.getElementById('map').style.width = '100%';

// Add zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl());

// Load Data Layers
map.on('load', function() {
    // Load Point Data (Venues)
    map.addSource('venues', {
        type: 'geojson',
        data: 'geojson_files/Point.geojson'
    });
    map.addLayer({
        id: 'venues-layer',
        type: 'circle',
        source: 'venues',
        paint: {
            'circle-radius': 6,
            'circle-color': '#ffcc00',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000'
        }
    });
    
    // Popup on Click
    map.on('click', 'venues-layer', function(e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties.name;
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<h5>${name}</h5>`)
            .addTo(map);
    });
    
    // Load Line Data (Transit)
    map.addSource('transit', {
        type: 'geojson',
        data: 'geojson_files/LineString.geojson'
    });
    map.addLayer({
        id: 'transit-layer',
        type: 'line',
        source: 'transit',
        paint: {
            'line-width': 2,
            'line-color': '#ff6600'
        }
    });
    
    // Load Polygon Data (Coverage)
    map.addSource('coverage', {
        type: 'geojson',
        data: 'geojson_files/Polygon.geojson'
    });
    map.addLayer({
        id: 'coverage-layer',
        type: 'fill',
        source: 'coverage',
        paint: {
            'fill-color': '#0077b6',
            'fill-opacity': 0.2
        }
    });
});
