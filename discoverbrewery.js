var mapOptions = {
  center: [37.0902, -95.7129],
  zoom: 4,
};

var map = L.map('map', mapOptions);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

const markerGroup = L.layerGroup().addTo(map);
let highlightedMarker = null; 

// Create an audio element for playing music
const audio = new Audio();

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
    
    // Play music from a music API
    playMusic();

  } catch (error) {
    console.error(error);
  }
}

// Function to play music from a music API
function playMusic() {
  // Replace this with your music API URL
  const musicApiUrl = 'https://example.com/api/music';
  // Fetch music data from the music API
  fetch(musicApiUrl)
    .then(response => response.json())
    .then(data => {
      // Extract the music URL from the music API response
      const musicUrl = https://www.youtube.com/watch?v=DB4IIn4m3VU;
// Set the audio source to the music URL
audio.src = musicUrl;
// Play the audio
audio.play();
})
.catch(error => console.error(error));
}

/ Function to highlight a marker on the map and play a sound effect
function highlightMarker(index) {
// Clear previous highlighted marker
if (highlightedMarker) {
highlightedMarker.setIcon(L.icon({
iconUrl: 'https://icons.veryicon.com/png/o/object/hand-painted-icons-of-daily-necessities/beer-53.png',
iconSize: [34, 34],
iconAnchor: [16, 32],
}));
}

// Highlight selected marker
const markers = markerGroup.getLayers();
const selectedMarker = markers[index];
selectedMarker.setIcon(L.icon({
iconUrl: 'https://icons.veryicon.com/png/o/object/hand-painted-icons-of-daily-necessities/beer-selected-53.png',
iconSize: [70, 70],
iconAnchor: [16, 32],
}));
highlightedMarker = selectedMarker;

// Play sound effect
const soundEffect = new Audio('https://www.youtube.com/watch?v=DB4IIn4m3VU'); // Replace this with your sound effect URL
soundEffect.play();
}

// Function to change cursor to pointer when hovering over a brewery item
function changeCursor(event) {
event.target.style.cursor = 'pointer';
}

// Function to reset cursor when hovering out of a brewery item
function resetCursor(event) {
event.target.style.cursor = 'auto';
}
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
