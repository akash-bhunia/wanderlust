document.addEventListener("DOMContentLoaded", () => {
    if (!mapLocation) return;

    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Nominatim API endpoint
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapLocation)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                alert("Location not found!");
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            // Create Leaflet map
            const map = L.map('map').setView([lat, lon], 13);

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Add marker
            L.marker([lat, lon]).addTo(map)
                .bindPopup(mapLocation)
                .openPopup()
                .on('markgeocode', function(e) {
                    var bbox = e.geocode.bbox;
                    var poly = L.polygon([
                        bbox.getSouthEast(),
                        bbox.getNorthEast(),
                        bbox.getNorthWest(),
                        bbox.getSouthWest()
                    ]).addTo(map);

                    map.fitBounds(poly.getBounds());
                })
                .addTo(map);
            })
        .catch(error => {
            console.error("Geocoding error:", error);
        });
});
