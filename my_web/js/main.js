// === 全局配置 ===
const CONFIG = {
  colors: {
    primary: '#EA580C',
    dark: '#1C1917',
    light: '#F9F7F2'
  },
  scrollOffset: 100 // 滚动偏移量
};

// === DOM元素 ===
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// === 滚动监听：高亮当前导航项 ===
function updateActiveNav() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - CONFIG.scrollOffset;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('text-[#EA580C]', 'font-medium');
        navLink.classList.remove('text-[#1C1917]');
      } else {
        navLink.classList.remove('text-[#EA580C]', 'font-medium');
        navLink.classList.add('text-[#1C1917]');
      }
    }
  });
}

// === 平滑滚动 ===
function smoothScrollTo(targetId) {
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 80; // 导航栏高度补偿
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    
    // 移动端点击后关闭菜单
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  }
}

// === 移动端菜单切换 ===
function toggleMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
}

// === 卡片悬浮效果增强 ===
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.card-hover');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    });
  });
}

// === 按钮点击效果 ===
function initButtonEffects() {
  const buttons = document.querySelectorAll('button, .btn-click-effect');
  buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// === Intersection Observer：元素进入视口动画 ===
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // 观察所有带有 animation-trigger 类的元素
  document.querySelectorAll('.animation-trigger').forEach(el => {
    observer.observe(el);
  });
}

// === 导航链接点击事件 ===
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    smoothScrollTo(targetId);
  });
});

// === 移动端菜单按钮事件 ===
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// === 页面滚动事件 ===
window.addEventListener('scroll', () => {
  // 使用 requestAnimationFrame 优化性能
  requestAnimationFrame(updateActiveNav);
});

// === 页面加载初始化 ===
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  initCardHoverEffects();
  initButtonEffects();
  initScrollAnimations();
  
  console.log('🌸 归途网站已加载完成');
});

// === 导航栏滚动效果 ===
let lastScroll = 0;
const navbar = document.querySelector('.sticky-nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (navbar) {
    if (currentScroll <= 0) {
      navbar.classList.remove('shadow-md');
    } else if (currentScroll > lastScroll && currentScroll > 100) {
      // 向下滚动，隐藏导航栏（可选功能，当前保持显示）
      // navbar.classList.add('-translate-y-full');
    } else {
      // 向上滚动
      navbar.classList.add('shadow-md');
    }
  }
  
  lastScroll = currentScroll;
});

// === 辅助工具函数 ===

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}