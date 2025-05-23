import { mapPoints, timelineEvents, galleryItems } from './locations.js';

/* --- Burger menu --- */
const burger  = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
burger.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
});

/* --- Timeline injection --- */
const timeline = document.getElementById('timeline');
timelineEvents.forEach(ev => {
  const wrapper = document.createElement('div');
  wrapper.className = 'relative pl-8';
  wrapper.innerHTML = `
    <span class="absolute -left-2 top-2 w-3 h-3 bg-gold rounded-full"></span>
    <h3 class="text-xl font-semibold mb-1">${ev.year} · ${ev.title}</h3>
    <p class="text-gray-300">${ev.text}</p>`;
  timeline.appendChild(wrapper);
});

/* --- Gallery injection + lightbox --- */
const gallery = document.getElementById('gallery');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox hidden';
document.body.appendChild(lightbox);

galleryItems.forEach(item => {
  const fig = document.createElement('figure');
  fig.className = `relative group overflow-hidden rounded-3xl shadow-lg
                   cursor-pointer`;
  fig.innerHTML = `
    <img src="${item.src}" alt="${item.alt}"
         class="w-full h-60 object-cover group-hover:scale-110
                transition duration-500">
    <figcaption
      class="absolute inset-0 bg-night/70 flex items-center justify-center
             opacity-0 group-hover:opacity-100 transition text-center p-4">
      <span class="text-gold font-semibold">${item.alt}</span>
    </figcaption>`;
  fig.addEventListener('click', () => {
    lightbox.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
    lightbox.classList.remove('hidden');
  });
  gallery.appendChild(fig);
});

lightbox.addEventListener('click', () => lightbox.classList.add('hidden'));

/* --- Leaflet map --- */
const map = L.map('lyonMap', { scrollWheelZoom: false })
  .setView([45.7640, 4.8357], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

mapPoints.forEach(pt => {
  L.marker(pt.coords).addTo(map).bindPopup(pt.name);
});

/* --- IntersectionObserver animations --- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('animate-fade-in-up');
  });
},{ threshold: 0.3 });

document.querySelectorAll('[data-animate-on-scroll]').forEach(el => {
  observer.observe(el);
});
