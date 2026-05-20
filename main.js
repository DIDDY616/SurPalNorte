/* ==========================================
   Pal' Sur del Norte — Scripts
   ========================================== */

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((el) => {
      if (el.isIntersecting) el.target.classList.add('v');
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll('.rv').forEach((el) => observer.observe(el));

// Carousel factory
function createSlider(trackId) {
  let pos = 0;
  const track = document.getElementById(trackId);
  if (!track) return () => {};
  const items = track.children;

  return function (dir) {
    const gap = parseInt(getComputedStyle(track).gap) || 20;
    const itemWidth = items[0].offsetWidth + gap;
    const maxScroll = items.length * itemWidth - track.offsetWidth;
    pos = Math.max(0, Math.min(pos + dir * itemWidth, maxScroll));
    Array.from(items).forEach((item) => {
      item.style.transform = `translateX(-${pos}px)`;
    });
  };
}

// Initialize carousels
const slideT = createSlider('tTrack');
const slideGal = createSlider('galTrack');

// Expose to HTML onclick handlers
window.slideT = slideT;
window.slideGal = slideGal;