let url = 'https://api.wheretheiss.at/v1/satellites/25544';
let lat = document.getElementById("lat");
let lon = document.getElementById("lon");
let ShowLat = document.querySelector(".latitude")
let ShowLon = document.querySelector(".longitude")

var mapOptions = {
    center: [0, 0], 
    zoom: 2, 
  };
  
  var map = L.map('map', mapOptions);
  
  // Add a tile layer to the map 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  }).addTo(map);

    // Make the marker and give it an icon
    const myIcon = L.icon({
      iconUrl : 'https://upload.wikimedia.org/wikipedia/commons/2/27/FP_Satellite_icon.svg',
      iconSize : (50,32),
      iconAnchor : (25,16)
    });

  let marker = L.marker([0, 0], {icon: myIcon}).addTo(map);
  
async function getISS(){
  const response = await fetch(url);
  const data = await response.json();
  const {latitude, longitude} = data;
  
  marker.setLatLng([latitude, longitude]);

  lat.textContent = latitude;
  lon.textContent = longitude;

}

// Get the refresh button element
const refreshButton = document.getElementById('refreshButton');

// Add a click event listener to the refresh button
refreshButton.addEventListener('click', () => {
  // Call the location.reload() method to reload the page
  location.reload();
});

getISS();
initMap();

const rocketContainer = document.querySelector('.rocket-container');

function createRocket() {
  const rocket = document.createElement('div');
  rocket.className = 'rocket-emoji';
  rocket.innerHTML = '&#x1F680;';
  rocket.style.left = `${50 + Math.random() * 10 - 5}%`;
  rocket.style.animationDuration = `${1 + Math.random() * 2}s`;
  rocketContainer.appendChild(rocket);
  setTimeout(() => {
    rocket.remove();
  }, 5000);
}

setInterval(() => {
  createRocket();
}, 2000);




  
