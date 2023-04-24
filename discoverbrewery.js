var mapOptions = {
  center: [37.0902, -95.7129],
  zoom: 4,
};

var map = L.map('map', mapOptions);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

const markerGroup = L.layerGroup().addTo(map);
let highlightedMarker = null; 

async function searchBreweries() {
    const stateInput = document.getElementById('stateInput').value; // Get user input
    const apiUrl = `https://api.openbrewerydb.org/v1/breweries?by_state=${stateInput}`;

  // Create a custom beer icon
  var beerIcon = L.icon({
    iconUrl: 'https://icons.veryicon.com/png/o/object/hand-painted-icons-of-daily-necessities/beer-53.png',
    iconSize: [34, 34],
    iconAnchor: [16, 32],

  });

  // Fetch data from API
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const breweries = await response.json();

    // Get the new search button element
    var newSearchBtn = document.getElementById('newSearchBtn');

    // Clear previous markers
    markerGroup.clearLayers();

    // Loop through breweries data and add markers to map
    breweries.forEach((brewery) => {
      const { latitude, longitude, name, brewery_type, street, city, state, postal_code } = brewery;
      if (latitude && longitude) {
        const marker = L.marker([latitude, longitude], { icon: beerIcon }).addTo(markerGroup);
        marker.bindPopup(`<b>${name}</b><br>Type: ${brewery_type}<br>Address: ${street}, ${city}, ${state} ${postal_code}`);
        marker.on('mouseover', function () {
          marker.openPopup();
        });
        marker.on('mouseout', function () {
          marker.closePopup();
        });
      }
    });

    // Display breweries as list
    let breweriesList = '';
    breweries.forEach((brewery, index) => {
      const { name, brewery_type, street, city, state, postal_code, latitude, longitude } = brewery;
      if (latitude && longitude) {
        breweriesList += `<li class="brewery-item" data-lat="${latitude}" data-lon="${longitude}" onclick="highlightMarker(${index})" onmouseover="changeCursor(event)" onmouseout="resetCursor(event)">
          <span class="brewery-name"><b>${name}</b></span><br>
          <span class="brewery-address">${street}, ${city}, ${state} ${postal_code}</span>
        </li>`;
      }
    });

    document.getElementById('breweriesList').innerHTML = breweriesList;

  } catch (error) {
    console.error(error);
  }
}

// Function to highlight marker on the map when clicking on a list item
function highlightMarker(index) {
  if (highlightedMarker) {
    highlightedMarker.setIcon(beerIcon); // Reset previously highlighted marker
  }
  const breweryItem = document.getElementsByClassName('brewery-item')[index];
  const lat = parseFloat(breweryItem.getAttribute('data-lat'));
  const lon = parseFloat(breweryItem.getAttribute('data-lon'));
  const marker = markerGroup.getLayers().find(layer => layer._latlng.lat === lat && layer._latlng.lng === lon); // Find the marker in the layer group based on latitude and longitude
  if (marker) {
  marker.setIcon(L.icon({ // Set a different icon for the highlighted marker
  iconUrl: 'https://icons.veryicon.com/png/o/object/hand-painted-icons-of-daily-necessities/beer-53.png',
  iconSize: [70, 70],
  iconAnchor: [16, 32],
  }));
  marker.openPopup(); // Open the popup for the highlighted marker
  map.setView([lat, lon], 13); // Set the map view to the highlighted marker with zoom level 13
  highlightedMarker = marker; // Set the highlighted marker as the currently highlighted marker
  }
  }
  
  // Function to change cursor to pointer on list item hover
  function changeCursor(event) {
  event.target.style.cursor = 'pointer';
  }
  
  // Function to reset cursor on list item mouseout
  function resetCursor(event) {
  event.target.style.cursor = 'auto';
  }
  
  // Function to clear search input and reset map
  function newSearch() {
  document.getElementById('stateInput').value = '';
  document.getElementById('breweriesList').innerHTML = '';
  markerGroup.clearLayers();
  if (highlightedMarker) {
  highlightedMarker.setIcon(beerIcon);
  highlightedMarker.closePopup();
  highlightedMarker = null;
  }
  map.setView([37.0902, -95.7129], 4);
  }
