var map, myPositionMarker, marker;
var firstTime = true;

const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

const myPositionIcon = L.icon({
    iconUrl: 'images/myPosition.png',

    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [20, 40] // point from which the popup should open relative to the iconAnchor
});

function init() {
    createMap('map');
    
    // registerSW();

    const watchID = navigator.geolocation.watchPosition(success, error, options);
}

function createMap(id) {
    map = L.map(id).setView([0, 0], 1);
    myPositionMarker = L.marker([0, 0], {icon: myPositionIcon}).addTo(map);

    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });

    tiles.addTo(map);

    addPOIs();
}

function addMarker(latitude, longitude, popup) {
    marker = L.marker([latitude, longitude]).addTo(map);

    if(arguments.length > 2) {
        marker.bindPopup(popup).openPopup();
    }
    
    L.circle([latitude, longitude], {
        color: '#4287f5',
        fillColor: '#4287f5',
        fillOpacity: 0.1,
        radius: 100
    }).addTo(map);
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude + ', ' + longitude);

    if(firstTime) {
        map.setView([latitude, longitude], 18);
        firstTime = false;
    }

    myPositionMarker.setLatLng([latitude, longitude]);
    
    showPOI();
}

function error() {
    alert('Attiva la posizione e ricarica la pagina');
}

/*
function registerSW() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
}
*/

// Parte dinamica
function addPOIs() {
    const latitude = 4;
    const longitude = 9;

    addMarker(latitude, longitude, '<b><a style="text-decoration: none;" href="LINKDETTAGLIOPOI">NOMEPOI</a></b><br>');
    map.closePopup();
}

function showPOI() {
    const poiLatitude = 4;
    const poiLongitude = 9;

    map.setView(poiLatitude, poiLongitude);
}