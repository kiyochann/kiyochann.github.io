// ============================================================
//  Portfolio JavaScript
// ============================================================

// --- ハンバーガーメニュー (スマホ) ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// モバイルメニューのリンクをクリックしたら閉じる
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// --- スクロールで Navbar に影を追加 ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// --- スクロールアニメーション (Intersection Observer) ---
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.work-card, .about-grid, .section-title, .section-desc');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.6s ease forwards';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
};

// --- スキルバーアニメーション ---
const animateSkillBars = () => {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // すでに style で width がセットされているのでアニメーションが走る
        entry.target.style.width = entry.target.style.width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0';
    observer.observe(bar);
    // 少し遅らせて幅を戻す
    setTimeout(() => { bar.style.width = targetWidth; }, 100);
  });
};

// --- ページ読み込み完了後に実行 ---
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  animateSkillBars();
});
