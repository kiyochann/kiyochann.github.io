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

// --- サムネイル内のインライン動画再生 ---
document.querySelectorAll('.play-video-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const videoUrl = btn.getAttribute('data-video');
    const targetId = btn.getAttribute('data-target');
    const targetThumb = document.getElementById(targetId);

    if (targetThumb && videoUrl) {
      targetThumb.innerHTML = `
        <video src="${videoUrl}" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;background:#000;">
          お使いのブラウザは動画再生に対応していません。
        </video>
      `;
    }
  });
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
