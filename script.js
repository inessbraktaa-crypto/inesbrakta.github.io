// ============================================================
// 1. HAMBURGER MENU (mobile)
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Fermer le menu quand on clique sur un lien (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ============================================================
// 2. NAV BACKGROUND CHANGE ON SCROLL
// ============================================================
const topNav = document.getElementById('topNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    topNav.classList.add('scrolled');
  } else {
    topNav.classList.remove('scrolled');
  }
});

// ============================================================
// 3. ACTIVE LINK HIGHLIGHT (Scroll Spy)
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let currentSectionId = '';
  const scrollPos = window.scrollY + 120; // décalage pour la nav fixe

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

// Détecter le scroll pour mettre à jour le lien actif
window.addEventListener('scroll', updateActiveLink);

// Appel initial pour définir le bon lien au chargement
window.addEventListener('load', updateActiveLink);

// ============================================================
// 4. PETIT PLUS : effet de survol subtil sur les cartes (déjà en CSS)
//    Rien à ajouter, tout est géré en CSS.
// ============================================================

console.log('🚀 Portfolio Inès Brakta – Navigation dynamique chargée !');
