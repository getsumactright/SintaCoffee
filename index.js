/* Sinta Coffee Co. JS Rebuild */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loader = document.getElementById('loader');
  const introVideo = document.getElementById('introVideo');
  const progressBar = document.getElementById('progressBar');
  const soundToggle = document.getElementById('soundToggle');
  const skipBtn = document.getElementById('skipBtn');
  const revealContainer = document.getElementById('revealContainer');
  const replayIntroBtn = document.getElementById('replayIntroBtn');

  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  const mascotWidget = document.getElementById('mascotWidget');
  const mascotBubble = document.getElementById('mascotBubble');
  const mascotBubbleText = document.getElementById('mascotBubbleText');
  const bubbleClose = document.getElementById('bubbleClose');
  const notificationDot = mascotWidget.querySelector('.notification-dot');

  const packageButtons = document.querySelectorAll('[data-package]');
  const packageSelect = document.getElementById('package');
  const quoteForm = document.getElementById('quoteForm');
  const formSuccess = document.getElementById('formSuccess');

  const galleryTrack = document.querySelector('.gallery-track');

  let hasExited = false;
  const EXIT_LEAD_S = 1.1; // Dissolve 1.1s before video ends to avoid frozen frame

  // --- 1. Video Loader Logic ---

  function initVideoLoader() {
    if (!loader || !introVideo) {
      // Fallback if elements don't exist
      if (revealContainer) {
        revealContainer.style.display = 'block';
        revealContainer.classList.add('revealed');
      }
      return;
    }

    // Set video src dynamically based on screen width
    const isMobile = window.innerWidth <= 768;
    introVideo.src = isMobile 
      ? 'assets/CouplewithCoffee_Animation_mobile.m4v' 
      : 'assets/CouplewithCoffee_Animation.mp4';
    introVideo.preload = 'auto';

    // Scroll lock during loader
    document.body.style.overflow = 'hidden';

    // Try playing video with sound first
    introVideo.muted = false;
    const playPromise = introVideo.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updateSoundToggleLabel(false);
        })
        .catch(() => {
          // Autoplay with sound blocked, fallback to muted autoplay
          introVideo.muted = true;
          updateSoundToggleLabel(true);
          introVideo.play().catch(err => {
            console.warn('Video failed to play entirely:', err);
            startExit(); // exit if video block is total
          });
        });
    }

    // Trigger title & layout animations inside loader
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loader.classList.add('entered');
      });
    });

    // Time update for progress bar and early exit crossfade
    introVideo.addEventListener('timeupdate', () => {
      if (!introVideo.duration) return;
      const progress = introVideo.currentTime / introVideo.duration;
      progressBar.style.width = Math.min(100, Math.round(progress * 100)) + '%';

      // Start the dissolve overlay early before video fully freezes
      if (introVideo.duration - introVideo.currentTime <= EXIT_LEAD_S) {
        startExit();
      }
    });

    introVideo.addEventListener('ended', startExit);
    skipBtn.addEventListener('click', startExit);
    soundToggle.addEventListener('click', toggleSound);

    if (replayIntroBtn) {
      replayIntroBtn.addEventListener('click', replayIntro);
    }
  }

  function startExit() {
    if (hasExited) return;
    hasExited = true;

    // Fade out overlay
    loader.classList.add('fade-out');

    // Reveal main page container
    revealContainer.style.display = 'block';
    // Force reflow
    void revealContainer.offsetHeight;
    revealContainer.classList.add('revealed');

    // Restore page scroll
    document.body.style.overflow = '';

    // Hide loader overlay completely after transition completes (1.3s)
    setTimeout(() => {
      loader.style.display = 'none';
      introVideo.pause();
    }, 1300);
  }

  function toggleSound() {
    if (!introVideo) return;
    introVideo.muted = !introVideo.muted;
    updateSoundToggleLabel(introVideo.muted);
  }

  function updateSoundToggleLabel(isMuted) {
    if (!soundToggle) return;
    soundToggle.textContent = isMuted ? 'SOUND ON' : 'MUTE';
  }

  function replayIntro() {
    hasExited = false;

    // Lock scrolling
    document.body.style.overflow = 'hidden';

    // Reset loader display & transitions
    loader.style.display = 'block';
    loader.classList.remove('fade-out', 'entered');
    progressBar.style.width = '0%';

    // Hide main page container
    revealContainer.classList.remove('revealed');
    setTimeout(() => {
      revealContainer.style.display = 'none';
    }, 500);

    // Force reflow and restart loader
    void loader.offsetHeight;
    loader.classList.add('entered');

    // Ensure video src is loaded (if replaying)
    if (!introVideo.src || introVideo.src === '' || !introVideo.getAttribute('src')) {
      const isMobile = window.innerWidth <= 768;
      introVideo.src = isMobile 
        ? 'assets/CouplewithCoffee_Animation_mobile.m4v' 
        : 'assets/CouplewithCoffee_Animation.mp4';
      introVideo.preload = 'auto';
    }

    introVideo.currentTime = 0;
    introVideo.muted = false; // user clicked so sound is allowed
    updateSoundToggleLabel(false);

    introVideo.play().catch(() => {
      introVideo.muted = true;
      updateSoundToggleLabel(true);
      introVideo.play().catch(() => { });
    });
  }

  // Run video loader initialization
  initVideoLoader();


  // --- 2. Mobile Menu Toggle ---
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);

        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }


  // --- 3. Infinite Gallery Duplication ---
  if (galleryTrack) {
    const slides = Array.from(galleryTrack.children);
    // Duplicate slides to allow smooth loop scroll
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      galleryTrack.appendChild(clone);
    });
  }


  // --- 4. Package Auto-Selection ---
  packageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const pkgName = button.getAttribute('data-package');
      if (pkgName && packageSelect) {
        packageSelect.value = pkgName;
      }
    });
  });


  // --- 5. Quote Form Submission ---
  if (quoteForm && formSuccess) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Perform simple check
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      if (name && email) {
        // Show success block
        formSuccess.style.display = 'block';
        quoteForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }
    });
  }


  // --- 6. Mascot Speech Bubble Dialog System ---
  const dialogs = [
    "Hi! We're Maeme and Benicia. Ready to elevate your event with handcrafted coffee? Click me to learn more!",
    "Sinta means beloved in Tagalog. We created Sinta Coffee to bring that feeling of warmth and care to every guest.",
    "We have 20+ years of coffee industry experience. From custom signature lattes to smooth matcha, we handle everything.",
    "We serve Solano County, Napa Valley, Sacramento, and the Bay Area. We bring our full mobile espresso bar directly to you!",
    "Ready to get started? Select a package and send us a quote request below!"
  ];

  let currentDialogIdx = 0;

  function showBubble() {
    mascotBubble.classList.add('show');
    if (notificationDot) {
      notificationDot.style.display = 'none'; // hide dot on interaction
    }
  }

  function hideBubble(e) {
    if (e) e.stopPropagation();
    mascotBubble.classList.remove('show');
  }

  if (mascotWidget && mascotBubble && mascotBubbleText && bubbleClose) {
    // Open bubble automatically 4 seconds after page is revealed
    const autoShowTimer = setTimeout(() => {
      if (hasExited) {
        showBubble();
      }
    }, 5500);

    mascotWidget.addEventListener('click', (e) => {
      // If user clicked the close button, don't open/cycle bubble
      if (e.target.closest('#bubbleClose')) return;

      // Cycle dialogue on successive clicks
      if (mascotBubble.classList.contains('show')) {
        currentDialogIdx = (currentDialogIdx + 1) % dialogs.length;
        mascotBubbleText.textContent = dialogs[currentDialogIdx];
      } else {
        showBubble();
      }
    });

    bubbleClose.addEventListener('click', hideBubble);

    // Close bubble if clicked outside widget
    document.addEventListener('click', (e) => {
      if (!mascotWidget.contains(e.target)) {
        hideBubble();
      }
    });
  }
});
