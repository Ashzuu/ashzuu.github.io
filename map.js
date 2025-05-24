/* reusable helper */
export function initLyonMap (containerId, points, zoom = 13) {
    const map = L.map(containerId, { scrollWheelZoom: false })
        .setView([45.764043, 4.835659], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    points.forEach(p => L.marker(p.coords).addTo(map).bindPopup(p.label));
}