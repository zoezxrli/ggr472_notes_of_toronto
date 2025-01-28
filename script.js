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
