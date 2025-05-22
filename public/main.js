const sr=ScrollReveal({
    origin:'top',
    distance:'85px',
    duration:2000,
    reset: true
})
sr.reveal('.column',{})
document.querySelectorAll('a.nav_link').forEach(link => {
  if (link.textContent.trim() === 'Home') {
    link.addEventListener('click', e => {
      e.preventDefault(); // Empêche l'ancre par défaut
      window.location.reload(); // Recharge la page
    });
  }
});
const fakeLabs = [
    { name: "Lab Chahid", lat: 36.589, lon: 2.448 },
    { name: "Laboratoire Medico", lat: 36.58639, lon: 2.43403 },
    { name: "LABORATOIRE KHOURI", lat: 36.460024, lon: 2.853877 }
  ];

  const map = L.map('map').setView([36.59, 2.44], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  const blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  function showNearbyLabs(userLat, userLon) {
    fakeLabs.forEach(lab => {
      const distance = getDistance(userLat, userLon, lab.lat, lab.lon);
      if (distance <= 20) {
        L.marker([lab.lat, lab.lon], { icon: blueIcon }).addTo(map)
          .bindTooltip(`${lab.name} (${distance.toFixed(1)} km)`, {
            permanent: true,
            direction: 'top'
          });
      }
    });
  }

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function showPosition(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    map.setView([userLat, userLon], 15);
    showNearbyLabs(userLat, userLon);
  }

  function handleError(error) {
    alert("Impossible d'obtenir votre position.");
  }

  // Appel automatique dès chargement
  window.onload = () => {
    if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(
  function (position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    // Centrer la carte sur la position de l'utilisateur
    map.setView([userLat, userLng], 13);

    const myIcon = L.icon({
      iconUrl: 'images/mylocation.png',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    // Ajouter le marqueur de la position
    L.marker([userLat, userLng], { icon: myIcon }).addTo(map)
      .bindPopup("Vous êtes ici.").openPopup();

    // ✅ Afficher les labos proches !
    showNearbyLabs(userLat, userLng);
  },
  function (error) {
    console.error("Erreur de géolocalisation :", error.message);
    alert("Impossible de vous localiser. Vérifiez les permissions du navigateur.");
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }
);

} else {
    alert("La géolocalisation n'est pas supportée par ce navigateur.");
}

  };