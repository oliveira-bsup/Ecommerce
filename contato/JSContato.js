/*******MAPA******/
var map = L.map('map').setView([-29.892002, -51.277140], 13);

//Mapa e Direitos autorais - Maximo de Zoom que o usuario pode dar
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let Bsup = L.marker([-29.892002, -51.277140]).addTo(map).bindPopup('3º B Bup');

