// Wait for DOM to be fully loaded - انتظار تحميل DOM بالكامل
window.addEventListener("load", function () {
  // Initialize animations and interactions - تهيئة الرسوم المتحركة والتفاعلات
  initializeAnimations();
      initializeNavigation();
    initializeScrollEffects();
    initializeLanguageToggle();
    initializeThemeToggle();
    initializeLogoClick();
});

// Initialize main animations - تهيئة الرسوم المتحركة الرئيسية
function initializeAnimations() {
  const elem = document.querySelector(".container");
  const imageElem = document.querySelector(".container__image");

  // Add active class for entrance animation - إضافة كلاس نشط لرسوم الدخول
  elem.classList.add("container--isActive");

  // 3D image effect on mouse move - تأثير ثلاثي الأبعاد للصورة عند تحريك الماوس
  imageElem.addEventListener("mousemove", function (event) {
    const xPosition = event.layerX;
    const yPosition = event.layerY;

    imageElem.style.transform = `rotateY(${xPosition / 50}deg) rotateX(${
      -yPosition / 50
    }deg)`;
  });

  // Reset image transform on mouse leave - إعادة تعيين تحويل الصورة عند مغادرة الماوس
  imageElem.addEventListener("mouseleave", function () {
    imageElem.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

// Initialize navigation functionality - تهيئة وظائف التنقل
function initializeNavigation() {
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.querySelector(".nav__menu");
  const navLinks = document.querySelectorAll(".nav__link");

  // Mobile menu toggle - تبديل قائمة الموبايل
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("nav__menu--active");
      navToggle.classList.toggle("nav__toggle--active");
    });
  }

  // Smooth scrolling for navigation links - التمرير السلس لروابط التنقل
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Close mobile menu if open - إغلاق قائمة الموبايل إذا كانت مفتوحة
        navMenu.classList.remove("nav__menu--active");
        navToggle.classList.remove("nav__toggle--active");

        // Smooth scroll to target - التمرير السلس للهدف
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Close mobile menu when clicking outside - إغلاق قائمة الموبايل عند النقر خارجها
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("nav__menu--active");
      navToggle.classList.remove("nav__toggle--active");
    }
  });
}

// Initialize scroll effects - تهيئة تأثيرات التمرير
function initializeScrollEffects() {
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  // Header scroll effect - تأثير تمرير الهيدر
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class for header styling - إضافة/إزالة كلاس التمرير لتنسيق الهيدر
    if (scrollTop > 50) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }

    // Hide/show header on scroll - إخفاء/إظهار الهيدر عند التمرير
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down - التمرير للأسفل
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up - التمرير للأعلى
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Intersection Observer for animations - مراقب التقاطع للرسوم المتحركة
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation - مراقبة العناصر للرسوم المتحركة
  const animateElements = document.querySelectorAll(
    ".about__content, .skills__list, .footer__container"
  );
  animateElements.forEach((el) => observer.observe(el));
}

// Initialize language toggle functionality - تهيئة وظيفة تغيير اللغة
function initializeLanguageToggle() {
  const languageToggle = document.getElementById("languageToggle");
  const languageSpan = languageToggle.querySelector("span");

  // Load saved language preference - تحميل تفضيل اللغة المحفوظ
  const savedLanguage = localStorage.getItem("language") || "ar";
  setLanguage(savedLanguage);

  // Language toggle click event - حدث النقر على زر تغيير اللغة
  languageToggle.addEventListener("click", function () {
    const currentLanguage = document.documentElement.getAttribute("lang");
    const newLanguage = currentLanguage === "ar" ? "en" : "ar";

    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  });
}

// Set language function - دالة تعيين اللغة
function setLanguage(language) {
  const html = document.documentElement;
  const languageSpan = document.querySelector("#languageToggle span");
  const themeIcon = document.getElementById("themeIcon");

  // Set HTML lang attribute - تعيين خاصية lang للـ HTML
  html.setAttribute("lang", language);

  // Set direction based on language - تعيين الاتجاه حسب اللغة
  if (language === "ar") {
    html.setAttribute("dir", "rtl");
    languageSpan.textContent = "EN";
    languageSpan.setAttribute("data-ar", "EN");
    languageSpan.setAttribute("data-en", "EN");
  } else {
    html.setAttribute("dir", "ltr");
    languageSpan.textContent = "عربي";
    languageSpan.setAttribute("data-ar", "عربي");
    languageSpan.setAttribute("data-en", "عربي");
  }

  // Update all translatable elements - تحديث جميع العناصر القابلة للترجمة
  const translatableElements = document.querySelectorAll("[data-ar][data-en]");
  translatableElements.forEach((element) => {
    const text =
      language === "ar"
        ? element.getAttribute("data-ar")
        : element.getAttribute("data-en");
    if (text) {
      // Preserve icons when updating text - الحفاظ على الأيقونات عند تحديث النص
      const icon = element.querySelector('i');
      if (icon) {
        element.innerHTML = icon.outerHTML + ' ' + text;
      } else {
        element.textContent = text;
      }
    }
  });

  // Update button titles - تحديث عناوين الأزرار
  const languageToggle = document.getElementById("languageToggle");
  const themeToggle = document.getElementById("themeToggle");

  if (language === "ar") {
    languageToggle.title = "تغيير اللغة / Change Language";
    themeToggle.title = "تغيير الوضع / Change Theme";
  } else {
    languageToggle.title = "Change Language / تغيير اللغة";
    themeToggle.title = "Change Theme / تغيير الوضع";
  }
}

// Initialize theme toggle functionality - تهيئة وظيفة تغيير الوضع
function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // Load saved theme preference - تحميل تفضيل الوضع المحفوظ
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Theme toggle click event - حدث النقر على زر تغيير الوضع
  themeToggle.addEventListener("click", function () {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Set theme function - دالة تعيين الوضع
function setTheme(theme) {
    const html = document.documentElement;
    const themeIcon = document.getElementById("themeIcon");
    
    // Set theme attribute - تعيين خاصية الوضع
    html.setAttribute("data-theme", theme);
    
    // Update theme icon - تحديث أيقونة الوضع
    if (theme === "dark") {
        themeIcon.className = "fas fa-sun";
    } else {
        themeIcon.className = "fas fa-moon";
    }
}

// Initialize logo click functionality - تهيئة وظيفة النقر على الشعار
function initializeLogoClick() {
    const logoLink = document.getElementById("logoLink");
    
    if (logoLink) {
        logoLink.addEventListener("click", function() {
            // Smooth scroll to top - التمرير السلس إلى أعلى
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            
            // Add click effect - إضافة تأثير النقر
            logoLink.style.transform = "scale(0.95)";
            setTimeout(() => {
                logoLink.style.transform = "scale(1)";
            }, 150);
        });
    }
}

// Add CSS for mobile menu and animations - إضافة CSS لقائمة الموبايل والرسوم المتحركة
const style = document.createElement("style");
style.textContent = `
    .nav__menu--active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        padding: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] .nav__menu--active {
        background: rgba(15, 23, 42, 0.98);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav__toggle--active i {
        transform: rotate(90deg);
    }
    
    .header--scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] .header--scrolled {
        background: rgba(15, 23, 42, 0.98);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill {
        animation-delay: calc(var(--animation-delay, 0) * 0.1s);
    }
    
    .skills__list .skill:nth-child(1) { --animation-delay: 1; }
    .skills__list .skill:nth-child(2) { --animation-delay: 2; }
    .skills__list .skill:nth-child(3) { --animation-delay: 3; }
    .skills__list .skill:nth-child(4) { --animation-delay: 4; }
    .skills__list .skill:nth-child(5) { --animation-delay: 5; }
    .skills__list .skill:nth-child(6) { --animation-delay: 6; }
    .skills__list .skill:nth-child(7) { --animation-delay: 7; }
    .skills__list .skill:nth-child(8) { --animation-delay: 8; }
    .skills__list .skill:nth-child(9) { --animation-delay: 9; }
    
    /* RTL Support - دعم الاتجاه من اليمين لليسار */
    [dir="rtl"] .nav__link::after {
        right: 0;
        left: auto;
    }
    
    [dir="rtl"] .container__textContent {
        padding-right: 2rem;
        padding-left: 0;
    }
    
    [dir="rtl"] .container__text {
        padding-right: 2rem;
        padding-left: 0;
    }
    
    [dir="rtl"] .container__text::before {
        right: 0;
        left: auto;
    }
    
    [dir="rtl"] .about__title::after {
        right: 0;
        left: auto;
    }
    
    [dir="rtl"] .skills__list {
        justify-content: flex-end;
    }
    
    @media (max-width: 768px) {
        [dir="rtl"] .container__textContent {
            padding-right: 0;
        }
        
        [dir="rtl"] .container__text {
            padding-right: 0;
        }
        
        [dir="rtl"] .container__authorData {
            justify-content: flex-end;
        }
        
        [dir="rtl"] .footer__container {
            text-align: right;
        }
        
        [dir="rtl"] .contact__item {
            justify-content: flex-end;
        }
        
        [dir="rtl"] .social__links {
            justify-content: flex-end;
        }
        
        [dir="rtl"] .skills__list {
            align-items: flex-end;
        }
    }
`;

document.head.appendChild(style);
