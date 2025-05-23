// Curseur personnalisé
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 10 + 'px';
  cursor.style.top = e.clientY - 10 + 'px';
});

// Navigation
const navItems  = document.querySelectorAll('.nav-item');
const sections  = document.querySelectorAll('.section');

/* Smooth scroll to the target section */
function navigateToSection(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

/* Click on bullet or CTA */
navItems.forEach(item=>{
  item.addEventListener('click',()=>navigateToSection(item.dataset.section));
});
document.querySelector('.cta-btn')
    .addEventListener('click',()=>navigateToSection('fete'));

/* ---------- ACTIVE BULLET ON SCROLL ---------- */
const sectionObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      navItems.forEach(bullet=>{
        bullet.classList.toggle('active', bullet.dataset.section === id);
      });
    }
  });
},{threshold:0.6});          /* 60 % of section height in viewport */

sections.forEach(sec=>sectionObserver.observe(sec));

/* ---------- EXISTING ANIMATIONS ---------- */
const revealables = document.querySelectorAll(
    '.light-card, .timeline-item, .innovation-card'
);
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:0.1, rootMargin:'0px 0px -100px 0px'});

revealables.forEach(el=>{
  el.style.opacity   = '0';
  el.style.transform = 'translateY(50px)';
  el.style.transition= 'all .6s ease';
  revealObserver.observe(el);
});

// Floating lights
function createFloatingLight() {
  const light = document.createElement('div');
  light.className = 'floating-light';
  light.style.left = Math.random() * 100 + 'vw';
  light.style.animationDelay = Math.random() * 2 + 's';
  light.style.animationDuration = (8 + Math.random() * 4) + 's';
  document.querySelector('.floating-lights').appendChild(light);

  setTimeout(() => {
    light.remove();
  }, 12000);
}

setInterval(createFloatingLight, 300);

// Tooltips pour la carte
const mapPoints = document.querySelectorAll('.map-point');
const tooltip = document.querySelector('.tooltip');

mapPoints.forEach(point => {
  point.addEventListener('mouseenter', (e) => {
    tooltip.textContent = e.target.dataset.tooltip;
    tooltip.classList.add('show');
  });

  point.addEventListener('mouseleave', () => {
    tooltip.classList.remove('show');
  });

  point.addEventListener('mousemove', (e) => {
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY - 30 + 'px';
  });
});

// Animations au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.light-card, .timeline-item, .innovation-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(50px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Effet parallaxe subtil
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  document.querySelectorAll('.light-card, .innovation-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - cardCenterX) * 0.01;
    const distanceY = (e.clientY - cardCenterY) * 0.01;

    card.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
  });
});

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);
resetInactivityTimer();

// Effets sonores simulés (vibrations tactiles sur mobile)
function hapticFeedback() {
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

document.querySelectorAll('.light-card, .nav-item, .cta-btn').forEach(el => {
  el.addEventListener('click', hapticFeedback);
});