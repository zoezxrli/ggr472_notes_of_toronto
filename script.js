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
document.getElementById('map').style.height = '800px';
document.getElementById('map').style.width = '100%';

// Add zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl());

// Define chapters and their coordinates
const chapters = {
    'roy-thomson': { center: [-79.38634548440412, 43.646630818470754], zoom: 15, pitch: 45 },
    'royal-alexandra': { center: [-79.38760602474734, 43.64743625069116], zoom: 15, pitch: 45 },
    'tiff-lightbox': { center: [-79.39054710347382, 43.646714189853185], zoom: 15, pitch: 45 },
    'princess-of-wales': { center: [-79.38924826297568, 43.64706437993695], zoom: 15, pitch: 45 },
    'glenn-gould': { center: [-79.3877223311102, 43.644401787854804], zoom: 15, pitch: 45 }
};

let activeChapter = 'roy-thomson';
function setActiveChapter(chapter) {
    if (chapter === activeChapter) return;
    map.flyTo(chapters[chapter]);
    document.getElementById(chapter).classList.add('active');
    document.getElementById(activeChapter).classList.remove('active');
    activeChapter = chapter;
}

function isElementOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

// On every scroll event, check which element is on screen
window.onscroll = () => {
    for (const chapter in chapters) {
        if (isElementOnScreen(chapter)) {
            setActiveChapter(chapter);
            break;
        }
    }
};

