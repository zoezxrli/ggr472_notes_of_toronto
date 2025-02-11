// Initialize Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoiem9lemh1b2xpIiwiYSI6ImNtNnNjeTBoajA2Z2wyd3BwdzhsM200YjgifQ.kjh3gJE9ldgvkDfFnHKSGQ';

const map = new mapboxgl.Map({
    container: 'map', // ID of the div where the map will be placed
    style: 'mapbox://styles/zoezhuoli/cm6segkif005101qs25x0avo9', // Custom basemap from Mapbox Studio
    center: [-79.3962, 43.6629], // Centered on University of Toronto
    zoom: 12,
    pitch: 45
});

fetch('geojson_files/Point.geojson')
    .then(response => response.json())
    .then(data => {
        console.log("GeoJSON Sample Feature Properties:", data.features[0].properties);
    })

// Load GeoJSON file and add as a layer
fetch('geojson_files/Point.geojson')
    .then(response => response.json())
    .then(data => {
        console.log("Loaded GeoJSON Data:", data); // Debugging check

        map.on('load', () => {
            // 1️. Add GeoJSON Source
            map.addSource('venues', {
                type: 'geojson',
                data: data
            });

            // 2️. Add Symbol Layer to Display Venue Names
            map.addLayer({
                id: 'venue-labels',
                type: 'symbol',
                source: 'venues',
                layout: {
                    'text-field': ['get', 'Name'], // Display name from GeoJSON properties
                    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                    'text-anchor': 'top', // Ensures text is above the point
                    'text-offset': [0, 1.2] // Adjust label positioning
                },
                paint: {
                    'text-color': '#ffffff' // White text for readability
                }
            });
        });
    })
    .catch(error => console.error('Error loading GeoJSON:', error));


const locations = {
    "roy-thomson": { center: [-79.386345, 43.646630], zoom: 14, pitch: 30 },
    "royal-alexandra": { center: [-79.387606, 43.647436], zoom: 14, pitch: 30 },
    "tiff-lightbox": { center: [-79.390547, 43.646714], zoom: 14, pitch: 30 },
    "yuk-yuks": { center: [-79.388271, 43.649779], zoom: 14, pitch: 20 },
    "princess-of-wales": { center: [-79.389248, 43.647064], zoom: 14, pitch: 30 },
    "glenn-gould-studio": { center: [-79.387722, 43.644401], zoom: 14, pitch: 20 },
    "factory-theatre": { center: [-79.402811, 43.645505], zoom: 14, pitch: 20 },
    "meridian-hall": { center: [-79.376015, 43.646654], zoom: 14, pitch: 20 },
    "st-lawrence-centre": { center: [-79.375140, 43.647372], zoom: 14, pitch: 20 },
    "young-peoples-theatre": { center: [-79.368858, 43.650065], zoom: 14, pitch: 20 },
    "tanenbaum-opera": { center: [-79.364435, 43.650922], zoom: 14, pitch: 20 },
    "four-seasons": { center: [-79.385498, 43.650669], zoom: 14, pitch: 20 },
    "paradise-theatre": { center: [-79.430685, 43.661185], zoom: 14, pitch: 20 },
    "the-royal": { center: [-79.414515, 43.655234], zoom: 14, pitch: 20 },
    "tranzac-club": { center: [-79.407529, 43.665223], zoom: 14, pitch: 20 },
    "tarragon-theatre": { center: [-79.412959, 43.674950], zoom: 14, pitch: 20 },
    "caa-theatre": { center: [-79.385461, 43.668098], zoom: 14, pitch: 20 },
    "buddies-in-bad-times": { center: [-79.382991, 43.663209], zoom: 14, pitch: 20 },
    "caa-ed-mirvish": { center: [-79.379577, 43.655233], zoom: 14, pitch: 20 },
    "elgin-winter-garden": { center: [-79.379370, 43.653139], zoom: 14, pitch: 20 },
    "imagine-cinemas": { center: [-79.372479, 43.649527], zoom: 14, pitch: 20 },
    "canadian-stage": { center: [-79.363966, 43.650586], zoom: 14, pitch: 20 },
    "phoenix-concert-theatre": { center: [-79.373936, 43.664608], zoom: 14, pitch: 20 },
    "koerner-hall": { center: [-79.396131, 43.667649], zoom: 14, pitch: 20 },
    "hart-house-theatre": { center: [-79.394339, 43.663714], zoom: 14, pitch: 20 },
    "betty-oliphant-theatre": { center: [-79.377994, 43.664220], zoom: 14, pitch: 20 },
    "annex-theatre": { center: [-79.410922, 43.663348], zoom: 14, pitch: 20 }
};

// Track which section is currently active
let activeSection = 'roy-thomson';

// FUnction to update the active section and fly to the new location
function setActiveSection(sectionId) {
    if (sectionId === activeSection) return;

    console.log(`Switching to: ${sectionId}`); // Debugging log

    if (locations[sectionId]) {
        console.log(`Flying to: ${sectionId}`, locations[sectionId]); // Log location data

        map.flyTo({
            center: locations[sectionId].center,
            zoom: (locations[sectionId].zoom || 14) + 3, // Slight zoom in
            pitch: locations[sectionId].pitch || 30,
            bearing: locations[sectionId].bearing || 0,
            duration: 1500 // Slow animation for better effect
        });
        // After a delay, reset to the normal zoom level
        setTimeout(() => {
            map.flyTo({
                center: locations[sectionId].center,
                zoom: locations[sectionId].zoom || 14,
                pitch: locations[sectionId].pitch || 30,
                bearing: locations[sectionId].bearing || 0,
                duration: 1200
            });
        }, 15000); // Reset after 15 seconds
    } else {
        console.log(`Error: ${sectionId} not found in locations`);
    }

    document.getElementById(sectionId).classList.add('active');
    document.getElementById(activeSection)?.classList.remove('active'); // Remove class safely
    document.getElementById("features").addEventListener("scroll", () => {
        console.log("Scrolling inside Venue section detected!");
    
        for (const sectionId in locations) {
            if (isElementVisible(sectionId)) {
                console.log(`Visible section: ${sectionId}`);
                setActiveSection(sectionId);
                break;
            }
        }
    });

    activeSection = sectionId;
}

// Function to check if a section is visible in the viewport
function isElementVisible(id) {
    const element = document.getElementById(id);
    const container = document.getElementById("features");  //scorll the feature Venue only 
    if (!element) return false; // Prevent errors

    const bounds = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    return (bounds.top < viewportHeight * 0.6) && (bounds.bottom > viewportHeight * 0.2);
}

window.addEventListener("scroll", () => {
    console.log("Scrolling detected!");

    for (const sectionId in locations) {
        if (isElementVisible(sectionId)) {
            console.log(`Visible section detected: ${sectionId}`);
            setActiveSection(sectionId);
            break; // Stop after the first match
        }
    }
});

window.dispatchEvent(new Event('scroll'));