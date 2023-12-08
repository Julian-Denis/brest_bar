import { Bar } from "../types/Bar";

/**
 * Creates and returns a DOM element containing detailed information about a bar.
 * The content is intended to be used in a popup on a map.
 * 
 * @param {Bar} barData - The data object containing information about a bar.
 * @returns {HTMLElement} - A DOM element populated with bar details.
 */

/*
*      /!\ XSS vulnerability /!\
*  This methode avoid xss vulnerability
*  Do not follow the doc on creating a
*  popup content. There is more simpler
*  but less safer.
*/

function createPopupContent(barData: Bar) {
    // Create the main container for the popup content
    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = '#201F23';

    // Create and style the title element
    const title = document.createElement('h3');
    title.style.color = 'white';
    title.style.fontSize = '1rem';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginTop = '12px';
    title.style.marginBottom = '5px';
    title.textContent = barData.name;

    // Create and style the address paragraph
    const address = document.createElement('p');
    address.style.color = 'white';
    address.textContent = `Adresse : ${barData.address}`;

    // Create and style the opening hours section
    const openingHours = document.createElement('p');
    openingHours.style.color = 'white';
    openingHours.textContent = "Horaires d'ouverture :";
    
    // Parse opening hours and append each day's hours
    const hours = JSON.parse(barData.opening_hours);
    for (const day in hours) {
        const dayP = document.createElement('p');
        dayP.style.color = 'white';
        dayP.textContent = `- ${hours[day]}`;
        openingHours.appendChild(dayP);
    }

    // Create and style the rating paragraph
    const rating = document.createElement('p');
    rating.style.color = 'white';
    rating.style.display = "flex";
    const ratingText = document.createElement('span');
    ratingText.textContent = `Note : ${barData.rating} `;
    rating.appendChild(ratingText);

    // Create and append a star SVG for the rating
    const starSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    starSvg.setAttribute("style", "color: #f3da35");
    starSvg.setAttribute("width", "16");
    starSvg.setAttribute("height", "16");
    starSvg.setAttribute("fill", "currentColor");
    starSvg.setAttribute("class", "bi bi-star");
    starSvg.setAttribute("viewBox", "0 0 20 20");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z");
    path.setAttribute("fill", "#f3da35");
    starSvg.appendChild(path);
    rating.appendChild(starSvg);

    // Add total ratings count to the rating element
    const totalRatings = document.createElement('span');
    totalRatings.textContent = ` (${barData.user_ratings_total} avis)`;
    rating.appendChild(totalRatings);

    // Create and style the phone number paragraph
    const international_phone_number = document.createElement('p');
    international_phone_number.style.color = 'white';
    international_phone_number.textContent = `Téléphone : ${barData.international_phone_number}`;

    // Create and style the "Go to" button
    const goToButton = document.createElement('a');
    goToButton.href = barData.maps_url;
    goToButton.textContent = '📍 Y aller';
    goToButton.className = 'bg-violet';
    goToButton.style.display = "block";
    goToButton.style.padding = "0.5rem 1rem 0.5rem 1rem"
    goToButton.style.color = "white"
    goToButton.style.fontWeight = "800";
    goToButton.style.width = "45%"
    goToButton.style.margin = "auto"
    goToButton.style.textAlign = "center"
    goToButton.style.borderRadius = "4px"

    // Append elements to the popup content
    popupContent.appendChild(title);
    popupContent.appendChild(address);
    popupContent.appendChild(openingHours);
    popupContent.appendChild(rating);
    popupContent.appendChild(international_phone_number);

    // Add website link if available
    if (barData.website && barData.website !== "") {
        const website = document.createElement('a');
        website.href = barData.website;
        website.style.color = 'white';
        website.textContent = `🌐 Site Web`;
        website.className = 'bg-violet';
        website.style.display = "block";
        website.style.padding = "0.5rem 1rem 0.5rem 1rem"
        website.style.color = "white"
        website.style.fontWeight = "800";
        website.style.width = "75%"
        website.style.margin = "auto"
        website.style.textAlign = "center"
        website.style.borderRadius = "4px"
        website.style.marginBottom = "5px"
        popupContent.appendChild(website);
    }
    popupContent.appendChild(goToButton);

    return popupContent;
}

export default createPopupContent;
