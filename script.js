(() => {
  const body = document.body;
  const eye = document.getElementById('eyeImage');
  const tear = document.getElementById('tearImage');
  const landing = document.getElementById('landing');
  const trigger = document.getElementById('menuTrigger');
  const overlay = document.getElementById('menuOverlay');
  const close = document.getElementById('menuClose');

  /*
    IMAGE-DRIVEN ANIMATION
    Replace only these image files in /assets and the sequence still works.
    Recommended transparent PNG/WebP dimensions: eye 1200x600, tear 300x800.
  */
  const frames = {
    moon: 'assets/moon.png',
    eyeOpen: 'assets/eye_open.png',
    eyeHalf: 'assets/eye_half.png',
    eyeClosed: 'assets/eye_closed.png',
    tear1: 'assets/tear_01.png',
    tear2: 'assets/tear_02.png',
    tear3: 'assets/tear_03.png',
    tear4: 'assets/tear_04.png'
  };

  function swap(img, src){ img.src = src; }

  function runSequence(){
    body.classList.add('sequence');

    setTimeout(() => swap(eye, frames.eyeOpen), 1200);
    setTimeout(() => swap(eye, frames.eyeHalf), 4550);
    setTimeout(() => swap(eye, frames.eyeClosed), 5350);

    setTimeout(() => { swap(tear, frames.tear1); tear.style.opacity = '1'; }, 5500);
    setTimeout(() => swap(tear, frames.tear2), 5850);
    setTimeout(() => swap(tear, frames.tear3), 6200);
    setTimeout(() => swap(tear, frames.tear4), 6550);

    // The missing part in the previous version:
    // after the eye closes, automatically move to the archive.
    setTimeout(() => {
      body.classList.add('finished');
      document.getElementById('archive').scrollIntoView({behavior:'smooth', block:'start'});
    }, 7600);
  }

  window.addEventListener('load', () => setTimeout(runSequence, 400), {once:true});

  function openMenu(){
    overlay.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeMenu(){
    overlay.classList.remove('open');
    document.body.style.overflow='';
  }
  trigger.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.addEventListener('click', e => { if(e.target === overlay) closeMenu(); });
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });

  // If user manually returns to the landing section, keep the closed-eye landing state.
  let leftOnce = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.target === landing && entry.isIntersecting && body.classList.contains('finished')){
        leftOnce = true;
        swap(eye, frames.eyeClosed);
        tear.style.opacity = '0';
      }
    });
  }, {threshold:.55});
  observer.observe(landing);
})();
