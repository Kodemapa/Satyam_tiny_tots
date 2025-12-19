// Initialize AOS if available (guarded)
if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
  AOS.init();
}
// mark body so CSS can enable JS-only effects without hiding content for no-JS users
if (document && document.body) document.body.classList.add('js-enabled');

// Initialize Swiper only when the library exists
if (typeof Swiper !== 'undefined') {
  new Swiper('.top-block__slider', {
    effect: 'fade',
    loop: true,
    autoplay: {
      delay: 4000,
    }
  });
}


// --- Hero parallax & gentle motion ---
(function(){
  const comp = document.querySelector('.composition-area');
  const diamond = document.querySelector('.diamond-box');
  const title = document.querySelector('.hero-title');
  if(!comp || !diamond || !title) return;

  comp.addEventListener('mousemove', (e) => {
    const rect = comp.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // small translate to create parallax illusion
    diamond.style.transform = `rotate(45deg) translate(${x * 8}px, ${y * 8}px) scale(1.02)`;
    title.style.transform = `translate(${x * -10}px, ${y * -6}px)`;
    title.style.filter = `drop-shadow(${x * -8}px ${y * 4}px 10px rgba(0,0,0,0.08))`;
  });

  comp.addEventListener('mouseleave', () => {
    diamond.style.transform = 'rotate(45deg)';
    title.style.transform = '';
    title.style.filter = '';
  });

  // touch parallax for mobile - lightweight
  comp.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    if(!touch) return;
    const rect = comp.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    diamond.style.transform = `rotate(45deg) translate(${x * 6}px, ${y * 6}px) scale(1.02)`;
    title.style.transform = `translate(${x * -8}px, ${y * -5}px)`;
  }, { passive: true });

  comp.addEventListener('touchend', () => {
    diamond.style.transform = 'rotate(45deg)';
    title.style.transform = '';
  });

  // subtle idle float for the composition
  let angle = 0;
  setInterval(() => {
    angle += 0.4;
    diamond.style.boxShadow = `0 24px 50px rgba(0,0,0,${0.09 + Math.sin(angle * Math.PI/180) * 0.02})`;
  }, 1200);

  // --- Complex section reveal + staggered list animation (mobile friendly) ---
  const complexSection = document.querySelector('.complex-section');
  const complexList = document.querySelector('.complex-list-group');
  if (complexSection && complexList) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          complexList.classList.add('in-view');
          // pulse the decorator once for emphasis
          const circle = complexSection.querySelector('.complex-decor-circle-green');
          if (circle) {
            circle.classList.add('pulse-once');
            setTimeout(()=>circle.classList.remove('pulse-once'), 1400);
          }
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.22 });
    obs.observe(complexSection);
  }

  // Mission section reveal + play pulse
  (function(){
    const missionSection = document.querySelector('.mission-section');
    if(!missionSection) return;
    const mObs = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if(entry.isIntersecting){
          missionSection.classList.add('in-view');
          const playBtn = missionSection.querySelector('.play-btn-circle');
          if(playBtn) playBtn.classList.add('pulse-play');
          mObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    mObs.observe(missionSection);
  })();

})();
