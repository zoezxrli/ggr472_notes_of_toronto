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
    zoom: 12,
    pitch: 45
});

const locations = {
    'roy-thomson': {
        center: [-79.38634548440412, 43.646630818470754],
        zoom: 14,
        pitch: 30
    },
    'royal-alexandra': {
        center: [-79.38760602474734, 43.64743625069116],
        zoom: 14,
        pitch: 30
    },
    'tiff-lightbox': {
        center: [-79.39054710347382, 43.646714189853185],
        zoom: 14,
        pitch: 30
    }
};

let activeSection = 'roy-thomson';

function setActiveSection(sectionId) {
    if (sectionId === activeSection) return;

    map.flyTo(locations[sectionId]);

    document.getElementById(sectionId).classList.add('active');
    document.getElementById(activeSection).classList.remove('active');

    activeSection = sectionId;
}

function isElementVisible(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

// Event Listener: Update the map view when scrolling
window.onscroll = () => {
    for (const sectionId in locations) {
        if (isElementVisible(sectionId)) {
            setActiveSection(sectionId);
            break;
        }
    }
};

