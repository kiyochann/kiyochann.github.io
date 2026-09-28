// ============================================================
//  Portfolio JavaScript - 前田清斗 (kiyo)
// ============================================================

// --- ハンバーガーメニュー (スマホ) ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// --- スクロールで Navbar に影を追加 ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }
});

// --- 動画モーダル ---
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoModalTitle = document.getElementById('videoModalTitle');
const videoModalClose = document.getElementById('videoModalClose');

const openVideoModal = (url, title) => {
  if (!videoModal || !modalVideo) return;
  modalVideo.src = url;
  if (videoModalTitle) videoModalTitle.textContent = title;
  videoModal.classList.add('active');
  modalVideo.play().catch(() => {});
};

const closeVideoModal = () => {
  if (!videoModal || !modalVideo) return;
  videoModal.classList.remove('active');
  modalVideo.pause();
  modalVideo.src = '';
};

document.querySelectorAll('.work-btn-video').forEach(btn => {
  btn.addEventListener('click', () => {
    const videoUrl = btn.getAttribute('data-video');
    const title = btn.getAttribute('data-title') || '実行動画';
    if (videoUrl) {
      openVideoModal(videoUrl, title);
    }
  });
});

if (videoModalClose) {
  videoModalClose.addEventListener('click', closeVideoModal);
}

if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});

// --- スクロールアニメーション (Intersection Observer) ---
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.work-card, .about-card, .section-title, .section-desc');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
});
