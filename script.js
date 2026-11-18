/**
 * Save the Date - Mohammed Anas & Fathimath Shafika
 * Royal Golden Particles, Fullscreen Video Autoplay with Sound,
 * Countdown, Calendar, Directions & Sharing Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Always reset scroll to the first section upon page load / refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

  // Elements
  const video = document.getElementById('weddingVideo');
  const videoSection = document.getElementById('fullscreenVideoSection');
  const smallMuteBtn = document.getElementById('smallMuteBtn');
  const smallMuteIcon = document.getElementById('smallMuteIcon');
  const toast = document.getElementById('toast');
  const entranceOverlay = document.getElementById('entranceOverlay');
  const entranceSealBtn = document.getElementById('entranceSealBtn');
  const coverOpenBtn = document.getElementById('coverOpenBtn');

  // -------------------------------------------------------------------------
  // 0. CREATIVE ROYAL ENTRANCE UNVEIL (Wax Seal Tap & Parting Velvet Gates)
  // -------------------------------------------------------------------------
  let isUnveiled = false;
  const burstParticles = [];

  // Web Audio API Synthesized Royal Crystalline Chime
  function playRoyalChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      // Major harmonic chord progression (E5, G#5, B5, E6)
      const notes = [659.25, 830.61, 987.77, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 1.25);
      });
    } catch (e) {
      // Audio playback silently ignored if blocked by system policy
    }
  }

  function triggerStardustBurst(originX, originY) {
    const burstCount = 75;
    const burstColors = ['#ffffff', '#fff8db', '#fce8a6', '#d4af37', '#e5c158', '#aa771c'];
    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8.5 + 2.5;
      burstParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 1.5,
        gravity: 0.12,
        friction: 0.96,
        radius: Math.random() * 2.8 + 1.2,
        color: burstColors[Math.floor(Math.random() * burstColors.length)],
        alpha: 1,
        decay: Math.random() * 0.016 + 0.01
      });
    }
  }

  function unveilInvitation(clickEvent) {
    if (isUnveiled || !entranceOverlay) return;
    isUnveiled = true;

    // Immediately guarantee scroll is locked at the very top of the page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Trigger golden stardust burst at interaction point
    let clickX = window.innerWidth / 2;
    let clickY = window.innerHeight / 2;
    if (clickEvent && clickEvent.clientX) {
      clickX = clickEvent.clientX;
      clickY = clickEvent.clientY;
    } else if (entranceSealBtn) {
      const rect = entranceSealBtn.getBoundingClientRect();
      clickX = rect.left + rect.width / 2;
      clickY = rect.top + 52;
    }
    triggerStardustBurst(clickX, clickY);

    // Play royal chime
    playRoyalChime();

    // Keep video paused until user clicks Watch Invitation Film or scrolls into it
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    // Trigger visual gate parting
    entranceOverlay.classList.add('unveiling');
    document.body.classList.add('unveiled-ready');

    setTimeout(() => {
      entranceOverlay.classList.add('unveiled');
      document.body.style.overflow = 'auto';

      // Always bring viewport cleanly to the first section (top hero)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const heroSec = document.querySelector('.cinematic-hero-section');
      if (heroSec) {
        heroSec.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }, 1150);
  }

  if (entranceSealBtn) {
    entranceSealBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unveilInvitation(e);
    });
  }

  if (coverOpenBtn) {
    coverOpenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unveilInvitation(e);
    });
  }

  if (entranceOverlay) {
    entranceOverlay.addEventListener('click', (e) => {
      unveilInvitation(e);
    });
  }

  // Also auto-unveil if user scrolls/swipes
  window.addEventListener('wheel', () => {
    if (!isUnveiled) unveilInvitation();
  }, { once: true, passive: true });

  window.addEventListener('touchmove', () => {
    if (!isUnveiled) unveilInvitation();
  }, { once: true, passive: true });

  // -------------------------------------------------------------------------
  // 1. FLOATING GOLDEN STARDUST PARTICLES CANVAS
  // -------------------------------------------------------------------------
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particlesCount = Math.min(Math.floor(window.innerWidth / 12), 45);
    const particles = [];
    const colors = ['#fff2c6', '#dfb75c', '#faecd0', '#d4af37'];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        decay: Math.random() * 0.008 + 0.002
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // 1. Ambient floating particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.alpha += p.decay;

        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.decay = -p.decay;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. High-speed golden stardust burst particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vy += bp.gravity;
        bp.vx *= bp.friction;
        bp.vy *= bp.friction;
        bp.alpha -= bp.decay;

        if (bp.alpha <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
        ctx.fillStyle = bp.color;
        ctx.globalAlpha = Math.max(0, bp.alpha);
        ctx.shadowBlur = 12;
        ctx.shadowColor = bp.color;
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // -------------------------------------------------------------------------
  // 2. SOUND DEFAULT & SCROLL-TRIGGERED AUTOPLAY
  // -------------------------------------------------------------------------
  if (video) {
    video.muted = false; // Default sound enabled
  }

  function updateMuteButtonUI() {
    if (!video || !smallMuteIcon || !smallMuteBtn) return;
    if (video.muted) {
      smallMuteIcon.className = 'fa-solid fa-volume-xmark';
      smallMuteBtn.title = 'Sound is Muted. Click to unmute.';
    } else {
      smallMuteIcon.className = 'fa-solid fa-volume-high';
      smallMuteBtn.title = 'Sound is On. Click to mute.';
    }
  }

  // Register user interaction to unlock audio policy
  function handleInitialUserGesture() {
    if (video && video.muted) {
      video.muted = false;
      updateMuteButtonUI();
    }
  }

  ['scroll', 'wheel', 'touchstart', 'touchend', 'click', 'keydown'].forEach((evt) => {
    window.addEventListener(evt, handleInitialUserGesture, { once: true, passive: true });
  });

  // Small Mute / Unmute Button
  if (smallMuteBtn && video) {
    smallMuteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      updateMuteButtonUI();
      showToast(video.muted ? 'Audio Muted 🔇' : 'Audio On 🔊');
    });
  }

  // Tapping the video also toggles mute / play smoothly
  if (video) {
    video.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        updateMuteButtonUI();
        showToast('Audio On 🔊');
      } else {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }

  // IntersectionObserver: Autoplay only when at least half (55%+) of the video section is in viewport
  if (video && videoSection && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.2, 0.55] // Requires at least half of the section in view
    };

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.55) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                updateMuteButtonUI();
              })
              .catch(() => {
                // If strict unmuted policy blocks, smoothly play muted
                video.muted = true;
                updateMuteButtonUI();
                video.play().catch(() => {});

                const unmuteOnNext = () => {
                  video.muted = false;
                  updateMuteButtonUI();
                  window.removeEventListener('click', unmuteOnNext);
                  window.removeEventListener('touchstart', unmuteOnNext);
                };
                window.addEventListener('click', unmuteOnNext, { once: true });
                window.addEventListener('touchstart', unmuteOnNext, { once: true });
              });
          }
        } else if (entry.intersectionRatio < 0.2) {
          // Pause when scrolled out of view to save battery and network bandwidth
          if (!video.paused) {
            video.pause();
          }
        }
      });
    }, observerOptions);

    videoObserver.observe(videoSection);
  }

  // -------------------------------------------------------------------------
  // 3. COUNTDOWN TIMER (27th December 2026, 05:00 PM IST)
  // -------------------------------------------------------------------------
  const weddingDate = new Date('2026-12-27T17:00:00+05:30').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // -------------------------------------------------------------------------
  // 4. ADD TO CALENDAR (Google Calendar + iCal .ics download)
  // -------------------------------------------------------------------------
  const addToCalBtn = document.getElementById('addToCalBtn');
  const calendarDropdown = document.getElementById('calendarDropdown');
  const googleCalLink = document.getElementById('googleCalLink');
  const appleCalLink = document.getElementById('appleCalLink');

  if (addToCalBtn && calendarDropdown) {
    addToCalBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      calendarDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      calendarDropdown.classList.remove('show');
    });
  }

  if (googleCalLink) {
    const gCalUrl = new URL('https://calendar.google.com/calendar/render');
    gCalUrl.searchParams.set('action', 'TEMPLATE');
    gCalUrl.searchParams.set('text', 'Wedding: Mohammed Anas & Fathimath Shafika');
    gCalUrl.searchParams.set('dates', '20261227T113000Z/20261227T173000Z');
    gCalUrl.searchParams.set(
      'details',
      'Save the Date! Sacred Nikah ceremony at 05:00 PM followed by Wedding Reception.\n\nVenue: The Flora By Sunflower, Madhur, Kasaragod, Kerala - 671124\nGoogle Maps: https://maps.app.goo.gl/Qksm7bKJoUfYUYEu8?g_st=ic'
    );
    gCalUrl.searchParams.set('location', 'The Flora By Sunflower, Madhur, Kasaragod, Kerala 671124');
    googleCalLink.href = gCalUrl.toString();
  }

  if (appleCalLink) {
    appleCalLink.addEventListener('click', (e) => {
      e.preventDefault();
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Save The Date//Mohammed Anas & Fathimath Shafika//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:wedding-anas-shafika-20261227@wedding',
        'DTSTAMP:20261116T000000Z',
        'DTSTART:20261227T113000Z',
        'DTEND:20261227T173000Z',
        'SUMMARY:Wedding of Mohammed Anas & Fathimath Shafika',
        'DESCRIPTION:Sacred Nikah Ceremony at 05:00 PM followed by Wedding Reception.\\nVenue: The Flora By Sunflower\\, Madhur\\, Kasaragod\\, Kerala.\\nMaps: https://maps.app.goo.gl/Qksm7bKJoUfYUYEu8?g_st=ic',
        'LOCATION:The Flora By Sunflower\\, Madhur\\, Kasaragod\\, Kerala - 671124',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Anas_and_Shafika_Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Calendar event downloaded 📅');
    });
  }

  const scrollGuideBtn = document.getElementById('scrollGuideBtn');
  if (scrollGuideBtn && videoSection) {
    scrollGuideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (video) {
        video.muted = false;
        const p = video.play();
        if (p !== undefined) {
          p.catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        }
        updateMuteButtonUI();
      }
      videoSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // -------------------------------------------------------------------------
  // 5. SHARING (Web Share API with Clipboard Fallback)
  // -------------------------------------------------------------------------
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Save the Date | Mohammed Anas & Fathimath Shafika',
        text: 'Save the Date! Mohammed Anas & Fathimath Shafika are getting married on Sunday, 27th December 2026 at The Flora by Sunflower, Madhur, Kasaragod.',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard(window.location.href, 'Invite link copied to clipboard!');
          }
        }
      } else {
        copyToClipboard(window.location.href, 'Invite link copied to clipboard!');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 6. COPY ADDRESS
  // -------------------------------------------------------------------------
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = 'The Flora By Sunflower, Madhur, Kasaragod, Kerala - 671124';
      copyToClipboard(address, 'Address copied to clipboard!');
    });
  }

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopyText(text, successMsg);
      });
    } else {
      fallbackCopyText(text, successMsg);
    }
  }

  function fallbackCopyText(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (e) {
      showToast('Could not copy link');
    }
    document.body.removeChild(textArea);
  }

  // -------------------------------------------------------------------------
  // 7. TOAST HELPER
  // -------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});

// ---------------------------------------------------------------------------
// 8. LIGHTBOX MODAL
// ---------------------------------------------------------------------------
function openLightbox(imgSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && lightboxImg) {
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}
